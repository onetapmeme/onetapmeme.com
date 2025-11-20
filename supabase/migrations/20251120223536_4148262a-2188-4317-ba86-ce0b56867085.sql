-- Add verification fields to manifesto_signatures
ALTER TABLE public.manifesto_signatures 
ADD COLUMN IF NOT EXISTS verified boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS verification_token text,
ADD COLUMN IF NOT EXISTS token_expires_at timestamp with time zone;

-- Create index for faster token lookups
CREATE INDEX IF NOT EXISTS idx_manifesto_signatures_verification_token 
ON public.manifesto_signatures(verification_token);

-- Create index for cleanup of expired tokens
CREATE INDEX IF NOT EXISTS idx_manifesto_signatures_token_expires_at 
ON public.manifesto_signatures(token_expires_at);

-- Function to cleanup expired unverified signatures (run periodically)
CREATE OR REPLACE FUNCTION cleanup_expired_manifesto_tokens()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM public.manifesto_signatures
  WHERE verified = false 
    AND token_expires_at < now()
    AND token_expires_at IS NOT NULL;
END;
$$;