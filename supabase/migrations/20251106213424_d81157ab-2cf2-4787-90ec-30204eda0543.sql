-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create launch_config table
CREATE TABLE public.launch_config (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    is_launched BOOLEAN NOT NULL DEFAULT false,
    launch_date TIMESTAMP WITH TIME ZONE NOT NULL,
    contract_address TEXT NOT NULL,
    buy_link TEXT NOT NULL,
    chart_link TEXT NOT NULL,
    
    -- Audit configuration
    audit_completed BOOLEAN NOT NULL DEFAULT false,
    audit_auditor TEXT,
    audit_score TEXT,
    audit_report_url TEXT,
    audit_date TEXT,
    
    -- LP Lock configuration
    lp_locked BOOLEAN NOT NULL DEFAULT false,
    lp_platform TEXT NOT NULL,
    lp_lock_url TEXT NOT NULL,
    lp_amount TEXT NOT NULL,
    lp_unlock_date TIMESTAMP WITH TIME ZONE,
    
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on launch_config
ALTER TABLE public.launch_config ENABLE ROW LEVEL SECURITY;

-- RLS policies for launch_config
CREATE POLICY "Anyone can view launch config"
ON public.launch_config
FOR SELECT
TO authenticated, anon
USING (true);

CREATE POLICY "Only admins can update launch config"
ON public.launch_config
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Insert default launch config
INSERT INTO public.launch_config (
    is_launched,
    launch_date,
    contract_address,
    buy_link,
    chart_link,
    audit_completed,
    lp_locked,
    lp_platform,
    lp_lock_url,
    lp_amount
) VALUES (
    false,
    '2025-01-20T14:00:00Z',
    '0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8',
    'https://app.uniswap.org/#/swap?outputCurrency=0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8&chain=base',
    'https://dexscreener.com/base/0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8',
    false,
    false,
    'Team.Finance',
    'https://www.team.finance/view-coin/0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8?name=ONETAP&symbol=ONETAP',
    '95%'
);

-- Create trigger to update updated_at
CREATE TRIGGER update_launch_config_updated_at
BEFORE UPDATE ON public.launch_config
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();