-- ============================================
-- PHASE 1: FIX CRITICAL RLS VULNERABILITIES
-- ============================================

-- 1. FIX manifesto_signatures - Restrict email visibility to admins only
-- Current: Anyone can view all email addresses
-- New: Only admins can view signatures
DROP POLICY IF EXISTS "Anyone can view signatures" ON public.manifesto_signatures;

CREATE POLICY "Only admins can view signatures" 
ON public.manifesto_signatures 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- 2. FIX referrals - Restrict to user-scoped access only
-- Current: Anyone can view all wallet addresses and financial data
-- New: Users can only see their own referral data
DROP POLICY IF EXISTS "Anyone can view referrals" ON public.referrals;

CREATE POLICY "Users can view their own referrals as referrer" 
ON public.referrals 
FOR SELECT 
USING (auth.uid()::text = referrer_wallet OR auth.uid()::text = referred_wallet);

CREATE POLICY "Admins can view all referrals" 
ON public.referrals 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- 3. FIX wallet_stats - Replace dangerous "ALL" policy with user-scoped policies
-- Current: Anyone can view and modify any user's financial data
-- New: Users can only access their own wallet stats
DROP POLICY IF EXISTS "Anyone can manage wallet stats" ON public.wallet_stats;
DROP POLICY IF EXISTS "Anyone can view wallet stats" ON public.wallet_stats;

CREATE POLICY "Users can view their own wallet stats" 
ON public.wallet_stats 
FOR SELECT 
USING (auth.uid()::text = wallet_address);

CREATE POLICY "Users can insert their own wallet stats" 
ON public.wallet_stats 
FOR INSERT 
WITH CHECK (auth.uid()::text = wallet_address);

CREATE POLICY "Users can update their own wallet stats" 
ON public.wallet_stats 
FOR UPDATE 
USING (auth.uid()::text = wallet_address);

CREATE POLICY "Users can delete their own wallet stats" 
ON public.wallet_stats 
FOR DELETE 
USING (auth.uid()::text = wallet_address);

CREATE POLICY "Admins can view all wallet stats" 
ON public.wallet_stats 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- 4. FIX user_xp - Restrict public viewing, allow only own data or aggregate leaderboard
-- Current: Anyone can scrape all user activity patterns
-- New: Users see only their own XP, public sees only aggregate/anonymous data
DROP POLICY IF EXISTS "XP is viewable by everyone" ON public.user_xp;

CREATE POLICY "Users can view their own XP" 
ON public.user_xp 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all XP data" 
ON public.user_xp 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- 5. FIX meme_votes - Restrict voting data to own votes only
-- Current: Anyone can analyze all user voting patterns
-- New: Users see only their own votes
DROP POLICY IF EXISTS "Votes are viewable by everyone" ON public.meme_votes;

CREATE POLICY "Users can view their own votes" 
ON public.meme_votes 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all votes" 
ON public.meme_votes 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create public leaderboard view for safe aggregate data (no user_ids exposed)
CREATE OR REPLACE VIEW public.leaderboard_stats AS
SELECT 
  ROW_NUMBER() OVER (ORDER BY total_xp DESC) as rank,
  level,
  total_xp,
  memes_created,
  shares_count,
  votes_received
FROM public.user_xp
ORDER BY total_xp DESC
LIMIT 100;

-- Allow public access to aggregate leaderboard (no user_ids)
GRANT SELECT ON public.leaderboard_stats TO anon, authenticated;

-- Create function to get total vote count for a meme (aggregate only)
CREATE OR REPLACE FUNCTION public.get_meme_vote_count(meme_id_param uuid)
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(*)::integer
  FROM public.meme_votes
  WHERE meme_id = meme_id_param
$$;

-- Create function to check if current user voted on a meme
CREATE OR REPLACE FUNCTION public.user_voted_on_meme(meme_id_param uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.meme_votes
    WHERE meme_id = meme_id_param
      AND user_id = auth.uid()
  )
$$;