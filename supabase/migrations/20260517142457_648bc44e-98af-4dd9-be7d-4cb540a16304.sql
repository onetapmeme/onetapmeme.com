-- ============ Booking slots ============
CREATE TABLE public.booking_slots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ref text NOT NULL UNIQUE,
  user_id uuid,
  name text NOT NULL,
  email text NOT NULL,
  booking_date date NOT NULL,
  booking_time text NOT NULL,
  dossier_ref text,
  status text NOT NULL DEFAULT 'confirmed',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (booking_date, booking_time)
);

ALTER TABLE public.booking_slots ENABLE ROW LEVEL SECURITY;

-- Anyone can see which (date, time) slots are taken — only date+time exposed via the function below.
CREATE POLICY "Users view own bookings" ON public.booking_slots
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Admins view all bookings" ON public.booking_slots
  FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins manage bookings" ON public.booking_slots
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER booking_slots_updated_at
  BEFORE UPDATE ON public.booking_slots
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Public function: list taken (date, time) without exposing PII
CREATE OR REPLACE FUNCTION public.list_taken_slots(from_date date, to_date date)
RETURNS TABLE (booking_date date, booking_time text)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT booking_date, booking_time FROM public.booking_slots
  WHERE booking_date BETWEEN from_date AND to_date
    AND status <> 'cancelled';
$$;

-- Public function: create a booking with validation + rate limiting
CREATE OR REPLACE FUNCTION public.create_booking_slot(
  name_param text, email_param text,
  booking_date_param date, booking_time_param text,
  dossier_ref_param text DEFAULT NULL
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
  IF booking_date_param < CURRENT_DATE THEN
    RAISE EXCEPTION 'Date must be in the future';
  END IF;
  IF booking_time_param !~ '^([0-1][0-9]|2[0-3]):[0-5][0-9]$' THEN
    RAISE EXCEPTION 'Invalid time';
  END IF;

  SELECT count(*) INTO rate_count FROM public.booking_slots
    WHERE email = email_param AND created_at > now() - interval '1 hour';
  IF rate_count >= 5 THEN
    RAISE EXCEPTION 'Rate limit exceeded';
  END IF;

  IF EXISTS (
    SELECT 1 FROM public.booking_slots
    WHERE booking_date = booking_date_param
      AND booking_time = booking_time_param
      AND status <> 'cancelled'
  ) THEN
    RAISE EXCEPTION 'Slot already taken';
  END IF;

  LOOP
    new_ref := 'BK-' || upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6));
    EXIT WHEN NOT EXISTS (SELECT 1 FROM public.booking_slots WHERE ref = new_ref);
  END LOOP;

  INSERT INTO public.booking_slots(ref, user_id, name, email, booking_date, booking_time, dossier_ref)
  VALUES (new_ref, auth.uid(), name_param, email_param, booking_date_param, booking_time_param, dossier_ref_param);

  RETURN new_ref;
END;
$$;

-- ============ Service pricing ============
CREATE TABLE public.service_pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pack_key text NOT NULL UNIQUE,
  label text NOT NULL,
  price_cents integer NOT NULL,
  turnaround_days integer,
  description text,
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  sort_order integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.service_pricing ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active pricing" ON public.service_pricing
  FOR SELECT TO anon, authenticated USING (is_active = true OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins manage pricing" ON public.service_pricing
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER service_pricing_updated_at
  BEFORE UPDATE ON public.service_pricing
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ Grading pricing ============
CREATE TABLE public.grading_pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  partner text NOT NULL,
  tier_label text NOT NULL,
  min_value_cents integer NOT NULL DEFAULT 0,
  max_value_cents integer,
  price_cents integer NOT NULL,
  turnaround_days integer,
  is_active boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.grading_pricing ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active grading pricing" ON public.grading_pricing
  FOR SELECT TO anon, authenticated USING (is_active = true OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins manage grading pricing" ON public.grading_pricing
  FOR ALL TO authenticated
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER grading_pricing_updated_at
  BEFORE UPDATE ON public.grading_pricing
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ Seed pricing data ============
INSERT INTO public.service_pricing (pack_key, label, price_cents, turnaround_days, description, features, sort_order) VALUES
  ('clean', 'Surface Clean & Polish', 1900, 7, 'Nettoyage de surface + micro-polish, retour assuré.',
    '["Diagnostic offert","Micro-polish surface","Toploader scellé","Retour suivi & assuré"]'::jsonb, 1),
  ('pro', 'Professional Restoration', 3900, 12, 'Nettoyage approfondi + redressage léger + assurance haute valeur.',
    '["Diagnostic offert","Nettoyage approfondi","Redressage thermique léger","Assurance cartes haute valeur","Toploader premium"]'::jsonb, 2),
  ('full', 'Full Surgery', 9500, 21, 'Chirurgie complète + dépôt grading partenaire au choix.',
    '["Diagnostic offert","Restauration complète","Dépôt grading PCA/CCC/Collect Aura","Assurance dynamique selon valeur","Fast Track 48h disponible","Certificat numérique"]'::jsonb, 3);

INSERT INTO public.grading_pricing (partner, tier_label, min_value_cents, max_value_cents, price_cents, turnaround_days, sort_order) VALUES
  ('PCA', 'Standard (< 300 €)', 0, 30000, 1900, 45, 1),
  ('PCA', 'Premium (300–1 500 €)', 30000, 150000, 3500, 30, 2),
  ('PCA', 'Luxe (1 500 €+)', 150000, NULL, 7500, 20, 3),
  ('CCC', 'Eco (< 500 €)', 0, 50000, 1500, 35, 4),
  ('CCC', 'Standard (500 €+)', 50000, NULL, 2900, 25, 5),
  ('Collect Aura', 'Signature (< 1 000 €)', 0, 100000, 2900, 20, 6),
  ('Collect Aura', 'Prestige (1 000 €+)', 100000, NULL, 5900, 15, 7);