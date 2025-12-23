-- ============================================
-- CRITICAL SECURITY FIX: Client-side game state manipulation
-- ============================================

-- Drop permissive INSERT/UPDATE policies that allow client-side manipulation
DROP POLICY IF EXISTS "Users can insert their own progress" ON player_progress;
DROP POLICY IF EXISTS "Users can update their own progress" ON player_progress;
DROP POLICY IF EXISTS "Users can insert into their own inventory" ON player_inventory;
DROP POLICY IF EXISTS "Users can update their own inventory" ON player_inventory;
DROP POLICY IF EXISTS "Users can insert their own quest progress" ON user_quest_progress;
DROP POLICY IF EXISTS "Users can update their own quest progress" ON user_quest_progress;
DROP POLICY IF EXISTS "Users can insert their own XP" ON user_xp;
DROP POLICY IF EXISTS "Users can update their own XP" ON user_xp;

-- ============================================
-- SECURITY DEFINER FUNCTION: Save player progress (secure)
-- ============================================
CREATE OR REPLACE FUNCTION public.save_player_progress(
  xp_increment integer DEFAULT 0,
  clicks_increment integer DEFAULT 1,
  new_rank_index integer DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_user_id uuid := auth.uid();
  current_xp integer;
  current_clicks integer;
  current_rank integer;
  max_xp_per_save integer := 50; -- Max XP gain per save (anti-cheat)
  max_clicks_per_save integer := 100; -- Max clicks per save (anti-cheat)
BEGIN
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  
  -- Clamp values to prevent abuse
  xp_increment := LEAST(xp_increment, max_xp_per_save);
  xp_increment := GREATEST(xp_increment, 0);
  clicks_increment := LEAST(clicks_increment, max_clicks_per_save);
  clicks_increment := GREATEST(clicks_increment, 0);
  
  -- Get or create player progress
  INSERT INTO public.player_progress (user_id, xp, clicks, current_rank_index)
  VALUES (current_user_id, xp_increment, clicks_increment, COALESCE(new_rank_index, 0))
  ON CONFLICT (user_id) DO UPDATE SET
    xp = player_progress.xp + xp_increment,
    clicks = player_progress.clicks + clicks_increment,
    current_rank_index = COALESCE(new_rank_index, player_progress.current_rank_index),
    updated_at = now();
  
  -- Also sync XP to user_xp table
  PERFORM public.increment_user_xp(current_user_id, xp_increment);
END;
$$;

-- ============================================
-- SECURITY DEFINER FUNCTION: Add item to inventory (secure)
-- ============================================
CREATE OR REPLACE FUNCTION public.add_inventory_item(
  drop_name_param text,
  drop_icon_param text,
  drop_rarity_param text,
  rank_name_param text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_user_id uuid := auth.uid();
  new_item_id uuid;
  recent_drop_count integer;
  allowed_rarities text[] := ARRAY['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary', 'Legendary+', 'Mythic'];
BEGIN
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  
  -- Validate rarity
  IF NOT (drop_rarity_param = ANY(allowed_rarities)) THEN
    RAISE EXCEPTION 'Invalid rarity';
  END IF;
  
  -- Rate limit: max 10 drops per hour
  SELECT COUNT(*) INTO recent_drop_count
  FROM public.player_inventory
  WHERE user_id = current_user_id
    AND collected_at > now() - interval '1 hour';
  
  IF recent_drop_count >= 10 THEN
    RAISE EXCEPTION 'Drop rate limit exceeded';
  END IF;
  
  -- Anti-cheat: Restrict high-rarity drops
  IF drop_rarity_param IN ('Legendary', 'Legendary+', 'Mythic') THEN
    -- Check if user has earned this through gameplay (has enough XP)
    IF NOT EXISTS (
      SELECT 1 FROM public.player_progress 
      WHERE user_id = current_user_id 
      AND xp >= 15000
    ) THEN
      -- For high-tier drops, user must have significant XP
      IF drop_rarity_param IN ('Mythic') AND NOT EXISTS (
        SELECT 1 FROM public.player_progress 
        WHERE user_id = current_user_id 
        AND xp >= 50000
      ) THEN
        RAISE EXCEPTION 'Insufficient progress for this rarity';
      END IF;
    END IF;
  END IF;
  
  -- Insert the item
  INSERT INTO public.player_inventory (
    user_id,
    drop_name,
    drop_icon,
    drop_rarity,
    rank_name,
    is_equipped
  )
  VALUES (
    current_user_id,
    drop_name_param,
    drop_icon_param,
    drop_rarity_param,
    rank_name_param,
    false
  )
  RETURNING id INTO new_item_id;
  
  RETURN new_item_id;
END;
$$;

-- ============================================
-- SECURITY DEFINER FUNCTION: Complete daily quest (secure)
-- ============================================
CREATE OR REPLACE FUNCTION public.complete_daily_quest(
  quest_id_param uuid,
  progress_value integer DEFAULT 1
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_user_id uuid := auth.uid();
  quest_record record;
  existing_progress record;
  is_completed boolean := false;
BEGIN
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  
  -- Get quest details
  SELECT * INTO quest_record
  FROM public.daily_quests
  WHERE id = quest_id_param;
  
  IF quest_record IS NULL THEN
    RAISE EXCEPTION 'Quest not found';
  END IF;
  
  -- Get existing progress
  SELECT * INTO existing_progress
  FROM public.user_quest_progress
  WHERE user_id = current_user_id
    AND quest_id = quest_id_param
    AND quest_date = CURRENT_DATE;
  
  -- Check if login quest (auto-complete)
  IF quest_record.requirement_type = 'login' THEN
    progress_value := 1;
    is_completed := true;
  ELSE
    -- Validate progress increment (max 10 per call)
    progress_value := LEAST(progress_value, 10);
    progress_value := GREATEST(progress_value, 1);
  END IF;
  
  IF existing_progress IS NULL THEN
    -- Create new progress
    INSERT INTO public.user_quest_progress (
      user_id,
      quest_id,
      progress,
      completed,
      quest_date
    )
    VALUES (
      current_user_id,
      quest_id_param,
      progress_value,
      is_completed OR (progress_value >= quest_record.requirement_value),
      CURRENT_DATE
    );
  ELSE
    -- Update existing progress
    UPDATE public.user_quest_progress
    SET 
      progress = LEAST(existing_progress.progress + progress_value, quest_record.requirement_value),
      completed = existing_progress.completed OR (existing_progress.progress + progress_value >= quest_record.requirement_value),
      updated_at = now()
    WHERE user_id = current_user_id
      AND quest_id = quest_id_param
      AND quest_date = CURRENT_DATE;
  END IF;
  
  RETURN true;
END;
$$;

-- ============================================
-- SECURITY DEFINER FUNCTION: Claim quest reward (secure)
-- ============================================
CREATE OR REPLACE FUNCTION public.claim_quest_reward(
  quest_id_param uuid
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_user_id uuid := auth.uid();
  quest_record record;
  progress_record record;
  xp_reward integer;
BEGIN
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  
  -- Get quest details
  SELECT * INTO quest_record
  FROM public.daily_quests
  WHERE id = quest_id_param;
  
  IF quest_record IS NULL THEN
    RAISE EXCEPTION 'Quest not found';
  END IF;
  
  -- Get progress
  SELECT * INTO progress_record
  FROM public.user_quest_progress
  WHERE user_id = current_user_id
    AND quest_id = quest_id_param
    AND quest_date = CURRENT_DATE;
  
  IF progress_record IS NULL THEN
    RAISE EXCEPTION 'Quest not started';
  END IF;
  
  IF NOT progress_record.completed THEN
    RAISE EXCEPTION 'Quest not completed';
  END IF;
  
  IF progress_record.claimed THEN
    RAISE EXCEPTION 'Reward already claimed';
  END IF;
  
  -- Mark as claimed
  UPDATE public.user_quest_progress
  SET claimed = true, updated_at = now()
  WHERE user_id = current_user_id
    AND quest_id = quest_id_param
    AND quest_date = CURRENT_DATE;
  
  -- Award XP
  xp_reward := quest_record.xp_reward;
  PERFORM public.increment_user_xp(current_user_id, xp_reward);
  
  RETURN xp_reward;
END;
$$;

-- ============================================
-- SECURITY DEFINER FUNCTION: Initialize user XP (secure)
-- ============================================
CREATE OR REPLACE FUNCTION public.initialize_user_xp()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_user_id uuid := auth.uid();
BEGIN
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;
  
  -- Create initial XP record if doesn't exist
  INSERT INTO public.user_xp (user_id, total_xp, level)
  VALUES (current_user_id, 0, 1)
  ON CONFLICT (user_id) DO NOTHING;
END;
$$;