
ALTER TYPE public.dossier_status ADD VALUE IF NOT EXISTS 'requested';
ALTER TYPE public.dossier_status ADD VALUE IF NOT EXISTS 'payment_required';
ALTER TYPE public.dossier_status ADD VALUE IF NOT EXISTS 'quality_control';
