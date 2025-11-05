-- Fix security warnings by setting search_path

-- Drop and recreate calculate_level with proper search_path
DROP FUNCTION IF EXISTS calculate_level(INTEGER);

CREATE OR REPLACE FUNCTION public.calculate_level(xp INTEGER)
RETURNS INTEGER
LANGUAGE plpgsql
IMMUTABLE
SET search_path = public
AS $$
BEGIN
  -- Level = floor(sqrt(xp / 100)) + 1
  RETURN FLOOR(SQRT(xp::FLOAT / 100.0)) + 1;
END;
$$;

-- Drop and recreate update_user_level with proper search_path
DROP FUNCTION IF EXISTS update_user_level() CASCADE;

CREATE OR REPLACE FUNCTION public.update_user_level()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.level = calculate_level(NEW.total_xp);
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate the trigger
DROP TRIGGER IF EXISTS update_level_trigger ON public.user_xp;

CREATE TRIGGER update_level_trigger
BEFORE UPDATE OF total_xp ON public.user_xp
FOR EACH ROW
EXECUTE FUNCTION update_user_level();