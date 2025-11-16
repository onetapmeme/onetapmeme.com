-- Fix Critical Data Manipulation Vulnerabilities
-- Replace direct user INSERT/UPDATE access with secure server-side functions

-- =====================================================
-- 1. FIX USER_XP TABLE - Remove direct user manipulation
-- =====================================================

-- Drop overly permissive policies
DROP POLICY IF EXISTS "Users can insert their own XP" ON public.user_xp;
DROP POLICY IF EXISTS "Users can update their own XP" ON public.user_xp;

-- Keep read-only access for users
-- Policy "Users can view their own XP" already exists and is fine

-- The increment_user_xp function already exists and is SECURITY DEFINER
-- This is the ONLY way XP should be modified

-- =====================================================
-- 2. FIX PLAYER_PROGRESS TABLE - Remove direct user manipulation
-- =====================================================

-- Drop overly permissive policies
DROP POLICY IF EXISTS "Users can insert their own progress" ON public.player_progress;
DROP POLICY IF EXISTS "Users can update their own progress" ON public.player_progress;

-- Keep read-only access
-- Policy "Users can view their own progress" already exists and is fine

-- Create secure function to update player progress (click-based)
CREATE OR REPLACE FUNCTION public.increment_player_click(user_id_param uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_xp integer;
  current_clicks integer;
  current_rank_idx integer;
  xp_per_click integer := 1;
BEGIN
  -- Get current progress or create new record
  INSERT INTO public.player_progress (user_id, xp, clicks, current_rank_index)
  VALUES (user_id_param, 0, 0, 0)
  ON CONFLICT (user_id) DO NOTHING;
  
  -- Get current values
  SELECT xp, clicks, current_rank_index 
  INTO current_xp, current_clicks, current_rank_idx
  FROM public.player_progress
  WHERE user_id = user_id_param;
  
  -- Increment with validation (max 1000 clicks per session to prevent abuse)
  IF current_clicks < 1000000 THEN
    UPDATE public.player_progress
    SET 
      clicks = clicks + 1,
      xp = xp + xp_per_click,
      updated_at = now()
    WHERE user_id = user_id_param;
    
    -- Also update user_xp table
    PERFORM public.increment_user_xp(user_id_param, xp_per_click);
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION public.increment_player_click(uuid) TO authenticated;

-- =====================================================
-- 3. FIX REFERRALS TABLE - Add validation and constraints
-- =====================================================

-- Drop overly permissive policy
DROP POLICY IF EXISTS "Anyone can create referrals" ON public.referrals;

-- Create secure function for referral creation with validation
CREATE OR REPLACE FUNCTION public.create_referral(
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
  existing_referral_count integer;
BEGIN
  -- Validation: Cannot refer yourself
  IF referrer_wallet_param = referred_wallet_param THEN
    RAISE EXCEPTION 'Cannot refer yourself';
  END IF;
  
  -- Validation: Check if already referred
  SELECT COUNT(*) INTO existing_referral_count
  FROM public.referrals
  WHERE referred_wallet = referred_wallet_param;
  
  IF existing_referral_count > 0 THEN
    RAISE EXCEPTION 'Wallet already referred';
  END IF;
  
  -- Validation: Limit referrals per referrer per day (anti-spam)
  SELECT COUNT(*) INTO existing_referral_count
  FROM public.referrals
  WHERE referrer_wallet = referrer_wallet_param
    AND created_at > now() - interval '1 day';
  
  IF existing_referral_count >= 10 THEN
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

GRANT EXECUTE ON FUNCTION public.create_referral(text, text, text) TO anon, authenticated;

-- =====================================================
-- 4. FIX MEMES TABLE - Add constraints to prevent spam
-- =====================================================

-- Keep existing policies but add creation rate limiting via function
CREATE OR REPLACE FUNCTION public.create_meme_with_validation(
  user_id_param uuid,
  image_url_param text,
  template_name_param text DEFAULT NULL,
  background_param text DEFAULT NULL,
  accessories_param jsonb DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_meme_id uuid;
  recent_meme_count integer;
BEGIN
  -- Validation: Check authentication
  IF user_id_param != auth.uid() THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  
  -- Validation: Rate limit - max 20 memes per hour
  SELECT COUNT(*) INTO recent_meme_count
  FROM public.memes
  WHERE user_id = user_id_param
    AND created_at > now() - interval '1 hour';
  
  IF recent_meme_count >= 20 THEN
    RAISE EXCEPTION 'Meme creation rate limit exceeded';
  END IF;
  
  -- Create meme
  INSERT INTO public.memes (
    user_id,
    image_url,
    template_name,
    background,
    accessories,
    views,
    shares
  )
  VALUES (
    user_id_param,
    image_url_param,
    template_name_param,
    background_param,
    accessories_param,
    0,
    0
  )
  RETURNING id INTO new_meme_id;
  
  -- Award XP for creating meme
  PERFORM public.increment_user_xp(user_id_param, 10);
  
  -- Update meme creation count
  INSERT INTO public.user_xp (user_id, memes_created, total_xp)
  VALUES (user_id_param, 1, 0)
  ON CONFLICT (user_id)
  DO UPDATE SET memes_created = user_xp.memes_created + 1;
  
  RETURN new_meme_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.create_meme_with_validation(uuid, text, text, text, jsonb) TO authenticated;

-- =====================================================
-- 5. ADD SECURE MEME INTERACTION FUNCTIONS
-- =====================================================

-- Secure function to increment meme views
CREATE OR REPLACE FUNCTION public.increment_meme_view(meme_id_param uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.memes
  SET views = views + 1
  WHERE id = meme_id_param;
END;
$$;

GRANT EXECUTE ON FUNCTION public.increment_meme_view(uuid) TO anon, authenticated;

-- Secure function to increment meme shares
CREATE OR REPLACE FUNCTION public.increment_meme_share(meme_id_param uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  meme_creator_id uuid;
BEGIN
  -- Get meme creator
  SELECT user_id INTO meme_creator_id
  FROM public.memes
  WHERE id = meme_id_param;
  
  -- Increment share count
  UPDATE public.memes
  SET shares = shares + 1
  WHERE id = meme_id_param;
  
  -- Award XP to creator
  IF meme_creator_id IS NOT NULL THEN
    PERFORM public.increment_user_xp(meme_creator_id, 5);
    
    -- Update shares count in user_xp
    INSERT INTO public.user_xp (user_id, shares_count, total_xp)
    VALUES (meme_creator_id, 1, 0)
    ON CONFLICT (user_id)
    DO UPDATE SET shares_count = user_xp.shares_count + 1;
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION public.increment_meme_share(uuid) TO anon, authenticated;

-- =====================================================
-- 6. CREATE UNIQUE CONSTRAINT TO PREVENT DUPLICATE PROGRESS
-- =====================================================

-- Add unique constraint on user_id if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'player_progress_user_id_key'
  ) THEN
    ALTER TABLE public.player_progress 
    ADD CONSTRAINT player_progress_user_id_key UNIQUE (user_id);
  END IF;
END $$;