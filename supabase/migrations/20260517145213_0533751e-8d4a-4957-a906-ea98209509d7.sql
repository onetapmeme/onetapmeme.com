-- Add insurance metadata columns to dossiers
ALTER TABLE public.dossiers
  ADD COLUMN IF NOT EXISTS declared_value_cents integer,
  ADD COLUMN IF NOT EXISTS insurance_tier text,
  ADD COLUMN IF NOT EXISTS insurance_cents integer,
  ADD COLUMN IF NOT EXISTS insurance_cap_cents integer,
  ADD COLUMN IF NOT EXISTS insurance_multi_leg boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS shipping_carrier text;

-- Replace create_dossier RPC to accept insurance metadata
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
  photos_param jsonb,
  declared_value_cents_param integer DEFAULT NULL,
  insurance_tier_param text DEFAULT NULL,
  insurance_cents_param integer DEFAULT NULL,
  insurance_cap_cents_param integer DEFAULT NULL,
  insurance_multi_leg_param boolean DEFAULT false,
  shipping_carrier_param text DEFAULT NULL
)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
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
    card_name, tcg, estimated_value, cares, defects, photos,
    declared_value_cents, insurance_tier, insurance_cents,
    insurance_cap_cents, insurance_multi_leg, shipping_carrier
  ) VALUES (
    new_ref, email_param, name_param, auth.uid(),
    pack_param, pack_label_param, pack_price_param,
    card_name_param, tcg_param, estimated_value_param,
    COALESCE(cares_param, '[]'::jsonb), defects_param,
    COALESCE(photos_param, '[]'::jsonb),
    declared_value_cents_param, insurance_tier_param, insurance_cents_param,
    insurance_cap_cents_param, COALESCE(insurance_multi_leg_param, false), shipping_carrier_param
  );

  RETURN new_ref;
END;
$function$;