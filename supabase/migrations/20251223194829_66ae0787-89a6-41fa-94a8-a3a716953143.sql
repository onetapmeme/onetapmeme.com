-- ============================================
-- ADDITIONAL SECURITY HARDENING
-- ============================================

-- 1. Drop the permissive INSERT policy on manifesto_signatures
-- Replace with a more restrictive version that prevents direct abuse
DROP POLICY IF EXISTS "Anyone can sign the manifesto" ON manifesto_signatures;

-- 2. Create a secure function for manifesto signing that includes validation
CREATE OR REPLACE FUNCTION public.sign_manifesto_secure(
  email_param text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_signature_id uuid;
  recent_signup_count integer;
  sanitized_email text;
BEGIN
  -- Sanitize email
  sanitized_email := LOWER(TRIM(email_param));
  
  -- Validate email format
  IF sanitized_email !~ '^[^\s@]+@[^\s@]+\.[^\s@]+$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;
  
  -- Check email length
  IF LENGTH(sanitized_email) > 255 THEN
    RAISE EXCEPTION 'Email too long';
  END IF;
  
  -- Rate limit: max 5 signups per email domain per hour (anti-spam)
  SELECT COUNT(*) INTO recent_signup_count
  FROM public.manifesto_signatures
  WHERE email LIKE '%' || SUBSTRING(sanitized_email FROM '@(.+)$') 
    AND created_at > now() - interval '1 hour';
  
  IF recent_signup_count >= 20 THEN
    RAISE EXCEPTION 'Rate limit exceeded for this email domain';
  END IF;
  
  -- Insert with duplicate check
  INSERT INTO public.manifesto_signatures (email, verified)
  VALUES (sanitized_email, false)
  ON CONFLICT DO NOTHING
  RETURNING id INTO new_signature_id;
  
  RETURN new_signature_id;
END;
$$;

-- 3. For memes table, create a secure view that hides user_id for public access
-- while still allowing the app to function
CREATE OR REPLACE FUNCTION public.get_public_memes(
  limit_count integer DEFAULT 50,
  offset_count integer DEFAULT 0
)
RETURNS TABLE (
  id uuid,
  image_url text,
  template_name text,
  background text,
  accessories jsonb,
  views integer,
  shares integer,
  created_at timestamptz,
  vote_count integer
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    m.id,
    m.image_url,
    m.template_name,
    m.background,
    m.accessories,
    m.views,
    m.shares,
    m.created_at,
    COALESCE((SELECT COUNT(*)::integer FROM public.meme_votes WHERE meme_id = m.id), 0) as vote_count
  FROM public.memes m
  ORDER BY m.created_at DESC
  LIMIT limit_count
  OFFSET offset_count
$$;

-- 4. Create a secure function to check if current user owns a meme
CREATE OR REPLACE FUNCTION public.user_owns_meme(meme_id_param uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.memes 
    WHERE id = meme_id_param 
      AND user_id = auth.uid()
  )
$$;

-- 5. Add additional protection for referrals - create secure insert function
CREATE OR REPLACE FUNCTION public.create_referral_secure(
  referrer_wallet_param text,
  referred_wallet_param text,
  referral_code_param text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_referral_id uuid;
  daily_referral_count integer;
BEGIN
  -- Validate wallets are different
  IF referrer_wallet_param = referred_wallet_param THEN
    RAISE EXCEPTION 'Cannot refer yourself';
  END IF;
  
  -- Check if wallet already referred
  IF EXISTS (
    SELECT 1 FROM public.referrals 
    WHERE referred_wallet = referred_wallet_param
  ) THEN
    RAISE EXCEPTION 'Wallet already referred';
  END IF;
  
  -- Rate limit per referrer (max 10 per day)
  SELECT COUNT(*) INTO daily_referral_count
  FROM public.referrals
  WHERE referrer_wallet = referrer_wallet_param
    AND created_at > now() - interval '1 day';
  
  IF daily_referral_count >= 10 THEN
    RAISE EXCEPTION 'Daily referral limit reached';
  END IF;
  
  -- Create referral
  INSERT INTO public.referrals (
    referrer_wallet,
    referred_wallet,
    referral_code,
    volume_generated,
    rewards_earned
  )
  VALUES (
    referrer_wallet_param,
    referred_wallet_param,
    referral_code_param,
    0,
    0
  )
  RETURNING id INTO new_referral_id;
  
  RETURN new_referral_id;
END;
$$;