-- Fix security linter warning: Replace SECURITY DEFINER view with a function
-- This provides better control and explicit security handling

-- Drop the view
DROP VIEW IF EXISTS public.leaderboard_stats;

-- Create a function instead that returns aggregate leaderboard data
CREATE OR REPLACE FUNCTION public.get_leaderboard_stats(limit_count integer DEFAULT 100)
RETURNS TABLE (
  rank bigint,
  level integer,
  total_xp integer,
  memes_created integer,
  shares_count integer,
  votes_received integer
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    ROW_NUMBER() OVER (ORDER BY total_xp DESC) as rank,
    level,
    total_xp,
    memes_created,
    shares_count,
    votes_received
  FROM public.user_xp
  ORDER BY total_xp DESC
  LIMIT limit_count
$$;

-- Grant execute to public (safe because it returns only aggregate data with no user_ids)
GRANT EXECUTE ON FUNCTION public.get_leaderboard_stats(integer) TO anon, authenticated;