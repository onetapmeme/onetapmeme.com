
-- Backfill legacy rows to the new names.
UPDATE public.dossiers SET status = 'requested'        WHERE status = 'pending_review';
UPDATE public.dossiers SET status = 'payment_required' WHERE status = 'approved';

ALTER TABLE public.dossiers ALTER COLUMN status SET DEFAULT 'requested'::public.dossier_status;

CREATE OR REPLACE FUNCTION public.admin_validate_dossier(
  ref_param text,
  notes_param text DEFAULT NULL,
  override_pack_price_param text DEFAULT NULL,
  override_insurance_cents_param integer DEFAULT NULL
)
RETURNS public.dossiers
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  r public.dossiers;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Forbidden';
  END IF;

  UPDATE public.dossiers
     SET status = 'payment_required'::public.dossier_status,
         validated_at = now(),
         admin_notes = COALESCE(notes_param, admin_notes),
         pack_price = COALESCE(override_pack_price_param, pack_price),
         insurance_cents = COALESCE(override_insurance_cents_param, insurance_cents),
         updated_at = now()
   WHERE ref = ref_param
   RETURNING * INTO r;

  IF r.ref IS NULL THEN
    RAISE EXCEPTION 'Dossier % introuvable', ref_param;
  END IF;
  RETURN r;
END;
$$;

CREATE OR REPLACE FUNCTION public.confirm_dossier_payment(
  ref_param text,
  stripe_session_id_param text DEFAULT NULL
)
RETURNS public.dossiers
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  cur public.dossiers;
  r   public.dossiers;
BEGIN
  SELECT * INTO cur FROM public.dossiers WHERE ref = ref_param FOR UPDATE;
  IF cur.ref IS NULL THEN
    RAISE EXCEPTION 'Dossier % introuvable', ref_param;
  END IF;

  IF cur.status NOT IN ('payment_required'::public.dossier_status, 'received'::public.dossier_status) THEN
    UPDATE public.dossiers
       SET stripe_session_id = COALESCE(stripe_session_id_param, stripe_session_id),
           updated_at = now()
     WHERE ref = ref_param
     RETURNING * INTO r;
    RETURN r;
  END IF;

  UPDATE public.dossiers
     SET status = 'paid'::public.dossier_status,
         paid_at = now(),
         stripe_session_id = COALESCE(stripe_session_id_param, stripe_session_id),
         updated_at = now()
   WHERE ref = ref_param
   RETURNING * INTO r;
  RETURN r;
END;
$$;

ALTER TABLE public.dossiers REPLICA IDENTITY FULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_publication_tables
     WHERE pubname = 'supabase_realtime' AND schemaname = 'public' AND tablename = 'dossiers'
  ) THEN
    EXECUTE 'ALTER PUBLICATION supabase_realtime ADD TABLE public.dossiers';
  END IF;
END $$;
