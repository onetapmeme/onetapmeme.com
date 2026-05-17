ALTER TABLE public.dossiers
  ADD COLUMN IF NOT EXISTS stripe_session_id text,
  ADD COLUMN IF NOT EXISTS insurance_tier_index smallint,
  ADD COLUMN IF NOT EXISTS insurance_quantity smallint NOT NULL DEFAULT 1;

CREATE INDEX IF NOT EXISTS dossiers_stripe_session_idx ON public.dossiers(stripe_session_id);

CREATE OR REPLACE FUNCTION public.confirm_dossier_payment(
  ref_param text,
  stripe_session_id_param text DEFAULT NULL
)
RETURNS public.dossiers
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE
  result public.dossiers;
  current public.dossiers;
BEGIN
  SELECT * INTO current FROM public.dossiers WHERE ref = upper(trim(ref_param));
  IF current IS NULL THEN RAISE EXCEPTION 'Dossier not found'; END IF;

  -- Idempotency: same session already recorded => return current row unchanged
  IF current.stripe_session_id IS NOT NULL
     AND stripe_session_id_param IS NOT NULL
     AND current.stripe_session_id = stripe_session_id_param THEN
    RETURN current;
  END IF;

  IF current.status NOT IN ('approved'::public.dossier_status, 'received'::public.dossier_status) THEN
    -- Already paid or further along: just persist the session id (best effort) and return
    IF stripe_session_id_param IS NOT NULL AND current.stripe_session_id IS NULL THEN
      UPDATE public.dossiers SET stripe_session_id = stripe_session_id_param, updated_at = now()
       WHERE ref = current.ref RETURNING * INTO result;
      RETURN result;
    END IF;
    RETURN current;
  END IF;

  UPDATE public.dossiers
     SET status = 'paid'::public.dossier_status,
         paid_at = now(),
         stripe_session_id = COALESCE(stripe_session_id_param, stripe_session_id),
         updated_at = now()
   WHERE ref = current.ref
   RETURNING * INTO result;
  RETURN result;
END;
$$;