-- Function to increment user XP
CREATE OR REPLACE FUNCTION public.increment_user_xp(
  user_id_param UUID,
  xp_amount INTEGER
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_xp (user_id, total_xp)
  VALUES (user_id_param, xp_amount)
  ON CONFLICT (user_id)
  DO UPDATE SET
    total_xp = user_xp.total_xp + xp_amount,
    updated_at = now();
END;
$$;