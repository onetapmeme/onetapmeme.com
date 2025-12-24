-- Fix 1: Hash verification tokens in manifesto_signatures
-- Create extension for hashing if not exists
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Drop existing function first (it returns uuid, we need to return text for the plain token)
DROP FUNCTION IF EXISTS public.sign_manifesto_secure(text);

-- Create new sign function that returns the plain token (hashed version stored in DB)
CREATE FUNCTION public.sign_manifesto_secure(email_param text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  rate_limit_count integer;
  result_id uuid;
  verification_token_plain text;
  verification_token_hashed text;
BEGIN
  -- Validate email format
  IF email_param !~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  -- Check rate limit (3 signups per hour per email to prevent abuse)
  SELECT COUNT(*) INTO rate_limit_count
  FROM manifesto_signatures
  WHERE created_at > NOW() - INTERVAL '1 hour'
    AND email = email_param;
  
  IF rate_limit_count >= 3 THEN
    RAISE EXCEPTION 'Rate limit exceeded. Please try again later.';
  END IF;
  
  -- Check if email already exists and is verified
  IF EXISTS (SELECT 1 FROM manifesto_signatures WHERE email = email_param AND verified = true) THEN
    RAISE EXCEPTION 'Email already signed the manifesto';
  END IF;
  
  -- Delete any unverified entries for this email (allow retry)
  DELETE FROM manifesto_signatures WHERE email = email_param AND verified = false;
  
  -- Generate a plain token for email (user will receive this)
  verification_token_plain := gen_random_uuid()::text;
  -- Hash the token for storage (we store only the hash)
  verification_token_hashed := encode(digest(verification_token_plain, 'sha256'), 'hex');
  
  -- Insert new signature with hashed token
  INSERT INTO manifesto_signatures (email, verification_token, token_expires_at, verified)
  VALUES (email_param, verification_token_hashed, NOW() + INTERVAL '24 hours', false)
  RETURNING id INTO result_id;
  
  -- Return the PLAIN token (not hashed) - this goes to the user via email
  RETURN verification_token_plain;
END;
$$;

-- Create verification function to check against hashed tokens
CREATE OR REPLACE FUNCTION public.verify_manifesto_signature(token_param text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  token_hashed text;
  sig_id uuid;
BEGIN
  -- Hash the incoming token to compare with stored hash
  token_hashed := encode(digest(token_param, 'sha256'), 'hex');
  
  -- Find the signature with matching hashed token
  SELECT id INTO sig_id
  FROM manifesto_signatures
  WHERE verification_token = token_hashed
    AND verified = false
    AND token_expires_at > NOW();
  
  IF sig_id IS NULL THEN
    RETURN false;
  END IF;
  
  -- Mark as verified and clear the token
  UPDATE manifesto_signatures
  SET verified = true,
      verification_token = NULL,
      token_expires_at = NULL,
      signed_at = NOW()
  WHERE id = sig_id;
  
  RETURN true;
END;
$$;

-- Fix 2: Add UPDATE policy for player_progress
CREATE POLICY "Users can update their own progress"
ON public.player_progress
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Grant execute on functions
GRANT EXECUTE ON FUNCTION public.sign_manifesto_secure(text) TO anon;
GRANT EXECUTE ON FUNCTION public.sign_manifesto_secure(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.verify_manifesto_signature(text) TO anon;
GRANT EXECUTE ON FUNCTION public.verify_manifesto_signature(text) TO authenticated;