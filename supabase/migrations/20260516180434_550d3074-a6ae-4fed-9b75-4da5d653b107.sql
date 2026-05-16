
-- Enum for dossier status
DO $$ BEGIN
  CREATE TYPE public.dossier_status AS ENUM (
    'pending_review','approved','rejected','paid','received','in_surgery','shipped'
  );
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Table
CREATE TABLE IF NOT EXISTS public.dossiers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ref text UNIQUE NOT NULL,
  email text NOT NULL,
  name text NOT NULL,
  user_id uuid,
  pack text NOT NULL,
  pack_label text NOT NULL,
  pack_price text NOT NULL,
  card_name text,
  tcg text,
  estimated_value text,
  cares jsonb NOT NULL DEFAULT '[]'::jsonb,
  defects text,
  photos jsonb NOT NULL DEFAULT '[]'::jsonb,
  status public.dossier_status NOT NULL DEFAULT 'pending_review',
  admin_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS dossiers_email_idx ON public.dossiers(email);
CREATE INDEX IF NOT EXISTS dossiers_user_idx ON public.dossiers(user_id);
CREATE INDEX IF NOT EXISTS dossiers_status_idx ON public.dossiers(status);

ALTER TABLE public.dossiers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users view own dossiers" ON public.dossiers;
CREATE POLICY "Users view own dossiers" ON public.dossiers FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins view all dossiers" ON public.dossiers;
CREATE POLICY "Admins view all dossiers" ON public.dossiers FOR SELECT
  TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins manage dossiers" ON public.dossiers;
CREATE POLICY "Admins manage dossiers" ON public.dossiers FOR UPDATE
  TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
DROP TRIGGER IF EXISTS trg_dossiers_updated_at ON public.dossiers;
CREATE TRIGGER trg_dossiers_updated_at BEFORE UPDATE ON public.dossiers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Public lookup by reference
CREATE OR REPLACE FUNCTION public.get_dossier_by_ref(ref_param text)
RETURNS public.dossiers
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT * FROM public.dossiers WHERE ref = upper(trim(ref_param)) LIMIT 1;
$$;

-- Create dossier (public, rate-limited)
CREATE OR REPLACE FUNCTION public.create_dossier(
  email_param text,
  name_param text,
  pack_param text,
  pack_label_param text,
  pack_price_param text,
  card_name_param text,
  tcg_param text,
  estimated_value_param text,
  cares_param jsonb,
  defects_param text,
  photos_param jsonb
) RETURNS text
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  new_ref text;
  rate_count integer;
BEGIN
  IF email_param IS NULL OR email_param !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email';
  END IF;
  IF length(coalesce(name_param,'')) < 2 OR length(name_param) > 120 THEN
    RAISE EXCEPTION 'Invalid name';
  END IF;
  IF pack_param NOT IN ('clean','pro','full') THEN
    RAISE EXCEPTION 'Invalid pack';
  END IF;

  SELECT count(*) INTO rate_count FROM public.dossiers
    WHERE email = email_param AND created_at > now() - interval '1 hour';
  IF rate_count >= 5 THEN
    RAISE EXCEPTION 'Rate limit exceeded';
  END IF;

  LOOP
    new_ref := 'CS-' || upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6));
    EXIT WHEN NOT EXISTS (SELECT 1 FROM public.dossiers WHERE ref = new_ref);
  END LOOP;

  INSERT INTO public.dossiers(
    ref, email, name, user_id, pack, pack_label, pack_price,
    card_name, tcg, estimated_value, cares, defects, photos
  ) VALUES (
    new_ref, email_param, name_param, auth.uid(),
    pack_param, pack_label_param, pack_price_param,
    card_name_param, tcg_param, estimated_value_param,
    COALESCE(cares_param, '[]'::jsonb), defects_param,
    COALESCE(photos_param, '[]'::jsonb)
  );

  RETURN new_ref;
END;
$$;

-- Admin status update
CREATE OR REPLACE FUNCTION public.admin_update_dossier_status(
  ref_param text,
  status_param public.dossier_status,
  notes_param text DEFAULT NULL
) RETURNS public.dossiers
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  result public.dossiers;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  UPDATE public.dossiers
    SET status = status_param,
        admin_notes = COALESCE(notes_param, admin_notes),
        updated_at = now()
   WHERE ref = upper(trim(ref_param))
   RETURNING * INTO result;
  RETURN result;
END;
$$;

-- Admin list (paginated)
CREATE OR REPLACE FUNCTION public.admin_list_dossiers(status_filter text DEFAULT NULL)
RETURNS SETOF public.dossiers
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  RETURN QUERY
    SELECT * FROM public.dossiers
    WHERE status_filter IS NULL OR status::text = status_filter
    ORDER BY created_at DESC
    LIMIT 500;
END;
$$;

-- Customer marks dossier as paid (only when approved)
CREATE OR REPLACE FUNCTION public.confirm_dossier_payment(ref_param text)
RETURNS public.dossiers
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  result public.dossiers;
  current public.dossiers;
BEGIN
  SELECT * INTO current FROM public.dossiers WHERE ref = upper(trim(ref_param));
  IF current IS NULL THEN RAISE EXCEPTION 'Dossier not found'; END IF;
  IF current.status <> 'approved' THEN
    RAISE EXCEPTION 'Payment is only available once the diagnostic is approved';
  END IF;
  UPDATE public.dossiers SET status = 'paid', updated_at = now()
    WHERE ref = current.ref RETURNING * INTO result;
  RETURN result;
END;
$$;

-- Storage bucket for customer photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('dossier-photos','dossier-photos', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public read dossier photos" ON storage.objects;
CREATE POLICY "Public read dossier photos" ON storage.objects FOR SELECT
  USING (bucket_id = 'dossier-photos');

DROP POLICY IF EXISTS "Anyone can upload dossier photos" ON storage.objects;
CREATE POLICY "Anyone can upload dossier photos" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'dossier-photos');
