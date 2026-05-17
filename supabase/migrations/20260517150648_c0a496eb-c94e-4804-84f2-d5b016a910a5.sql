-- 1. New dossier columns
ALTER TABLE public.dossiers
  ADD COLUMN IF NOT EXISTS validated_at timestamptz,
  ADD COLUMN IF NOT EXISTS paid_at timestamptz,
  ADD COLUMN IF NOT EXISTS payment_link_url text,
  ADD COLUMN IF NOT EXISTS payment_link_expires_at timestamptz,
  ADD COLUMN IF NOT EXISTS return_carrier text,
  ADD COLUMN IF NOT EXISTS return_tracking_number text;

-- 2. Drop old create_dossier signatures so we can replace ref format
DROP FUNCTION IF EXISTS public.create_dossier(text, text, text, text, text, text, text, text, jsonb, text, jsonb);
DROP FUNCTION IF EXISTS public.create_dossier(text, text, text, text, text, text, text, text, jsonb, text, jsonb, integer, text, integer, integer, boolean, text);

-- 3. Recreate create_dossier with CS-2026-XXXX format
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
AS $$
DECLARE
  new_ref text;
  rate_count integer;
  year_part text := to_char(now(), 'YYYY');
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
    new_ref := 'CS-' || year_part || '-' || upper(substr(md5(random()::text || clock_timestamp()::text), 1, 4));
    EXIT WHEN NOT EXISTS (SELECT 1 FROM public.dossiers WHERE ref = new_ref);
  END LOOP;

  INSERT INTO public.dossiers(
    ref, email, name, user_id, pack, pack_label, pack_price,
    card_name, tcg, estimated_value, cares, defects, photos,
    declared_value_cents, insurance_tier, insurance_cents,
    insurance_cap_cents, insurance_multi_leg, shipping_carrier, status
  ) VALUES (
    new_ref, email_param, name_param, auth.uid(),
    pack_param, pack_label_param, pack_price_param,
    card_name_param, tcg_param, estimated_value_param,
    COALESCE(cares_param, '[]'::jsonb), defects_param,
    COALESCE(photos_param, '[]'::jsonb),
    declared_value_cents_param, insurance_tier_param, insurance_cents_param,
    insurance_cap_cents_param, COALESCE(insurance_multi_leg_param, false), shipping_carrier_param,
    'pending_review'::public.dossier_status
  );

  RETURN new_ref;
END;
$$;

-- 4. Admin validate (request_sent / diagnostic -> awaiting_payment)
CREATE OR REPLACE FUNCTION public.admin_validate_dossier(
  ref_param text,
  notes_param text DEFAULT NULL,
  override_pack_price_param text DEFAULT NULL,
  override_insurance_cents_param integer DEFAULT NULL
)
RETURNS public.dossiers
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  result public.dossiers;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  UPDATE public.dossiers
    SET status = 'approved'::public.dossier_status,
        validated_at = now(),
        admin_notes = COALESCE(notes_param, admin_notes),
        pack_price = COALESCE(override_pack_price_param, pack_price),
        insurance_cents = COALESCE(override_insurance_cents_param, insurance_cents),
        updated_at = now()
   WHERE ref = upper(trim(ref_param))
   RETURNING * INTO result;

  IF result IS NULL THEN RAISE EXCEPTION 'Dossier not found'; END IF;
  RETURN result;
END;
$$;

-- 5. Admin reject
CREATE OR REPLACE FUNCTION public.admin_reject_dossier(ref_param text, notes_param text)
RETURNS public.dossiers
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE result public.dossiers;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  UPDATE public.dossiers
     SET status = 'rejected'::public.dossier_status,
         admin_notes = COALESCE(notes_param, admin_notes),
         updated_at = now()
   WHERE ref = upper(trim(ref_param))
   RETURNING * INTO result;
  IF result IS NULL THEN RAISE EXCEPTION 'Dossier not found'; END IF;
  RETURN result;
END;
$$;

-- 6. Admin mark received (begin diagnostic)
CREATE OR REPLACE FUNCTION public.admin_mark_received(ref_param text)
RETURNS public.dossiers
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE result public.dossiers;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  UPDATE public.dossiers
     SET status = 'received'::public.dossier_status, updated_at = now()
   WHERE ref = upper(trim(ref_param))
   RETURNING * INTO result;
  IF result IS NULL THEN RAISE EXCEPTION 'Dossier not found'; END IF;
  RETURN result;
END;
$$;

-- 7. Admin mark in surgery
CREATE OR REPLACE FUNCTION public.admin_mark_in_surgery(ref_param text)
RETURNS public.dossiers
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE result public.dossiers;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  UPDATE public.dossiers
     SET status = 'in_surgery'::public.dossier_status, updated_at = now()
   WHERE ref = upper(trim(ref_param)) AND status = 'paid'::public.dossier_status
   RETURNING * INTO result;
  IF result IS NULL THEN RAISE EXCEPTION 'Dossier must be paid first'; END IF;
  RETURN result;
END;
$$;

-- 8. Admin mark shipped with carrier + tracking
CREATE OR REPLACE FUNCTION public.admin_mark_shipped(
  ref_param text,
  carrier_param text,
  tracking_param text
)
RETURNS public.dossiers
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE result public.dossiers;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  IF length(coalesce(tracking_param,'')) < 4 THEN
    RAISE EXCEPTION 'Tracking number required';
  END IF;
  UPDATE public.dossiers
     SET status = 'shipped'::public.dossier_status,
         return_carrier = carrier_param,
         return_tracking_number = tracking_param,
         updated_at = now()
   WHERE ref = upper(trim(ref_param))
   RETURNING * INTO result;
  IF result IS NULL THEN RAISE EXCEPTION 'Dossier not found'; END IF;
  RETURN result;
END;
$$;

-- 9. Set payment link (called by checkout edge function)
CREATE OR REPLACE FUNCTION public.set_dossier_payment_link(
  ref_param text,
  url_param text,
  expires_param timestamptz
)
RETURNS public.dossiers
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE result public.dossiers;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::app_role) THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  UPDATE public.dossiers
     SET payment_link_url = url_param,
         payment_link_expires_at = expires_param,
         updated_at = now()
   WHERE ref = upper(trim(ref_param))
   RETURNING * INTO result;
  IF result IS NULL THEN RAISE EXCEPTION 'Dossier not found'; END IF;
  RETURN result;
END;
$$;

-- 10. Confirm payment (called by stripe webhook via service role, or admin)
CREATE OR REPLACE FUNCTION public.confirm_dossier_payment(ref_param text)
RETURNS public.dossiers
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE
  result public.dossiers;
  current public.dossiers;
BEGIN
  SELECT * INTO current FROM public.dossiers WHERE ref = upper(trim(ref_param));
  IF current IS NULL THEN RAISE EXCEPTION 'Dossier not found'; END IF;
  IF current.status NOT IN ('approved'::public.dossier_status, 'received'::public.dossier_status) THEN
    RAISE EXCEPTION 'Dossier not in payable state';
  END IF;
  UPDATE public.dossiers
     SET status = 'paid'::public.dossier_status,
         paid_at = now(),
         updated_at = now()
   WHERE ref = current.ref
   RETURNING * INTO result;
  RETURN result;
END;
$$;

-- 11. Auto-claim guest dossiers on sign-in
CREATE OR REPLACE FUNCTION public.claim_dossiers_by_email()
RETURNS integer
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE
  uid uuid := auth.uid();
  email_addr text;
  claimed integer;
BEGIN
  IF uid IS NULL THEN RAISE EXCEPTION 'Unauthorized'; END IF;
  SELECT email INTO email_addr FROM auth.users WHERE id = uid;
  IF email_addr IS NULL THEN RETURN 0; END IF;

  UPDATE public.dossiers
     SET user_id = uid, updated_at = now()
   WHERE user_id IS NULL AND lower(email) = lower(email_addr);
  GET DIAGNOSTICS claimed = ROW_COUNT;
  RETURN claimed;
END;
$$;