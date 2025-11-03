-- Create referrals table for tracking referral system
CREATE TABLE public.referrals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_wallet TEXT NOT NULL,
  referred_wallet TEXT NOT NULL,
  referral_code TEXT NOT NULL,
  volume_generated NUMERIC DEFAULT 0,
  rewards_earned NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(referrer_wallet, referred_wallet)
);

-- Create index for faster lookups
CREATE INDEX idx_referrals_referrer ON public.referrals(referrer_wallet);
CREATE INDEX idx_referrals_code ON public.referrals(referral_code);

-- Enable RLS
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view referrals (for leaderboard)
CREATE POLICY "Anyone can view referrals"
ON public.referrals
FOR SELECT
USING (true);

-- Users can insert referrals
CREATE POLICY "Anyone can create referrals"
ON public.referrals
FOR INSERT
WITH CHECK (true);

-- Create wallet_stats table for tracking portfolio data
CREATE TABLE public.wallet_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  wallet_address TEXT NOT NULL UNIQUE,
  total_volume NUMERIC DEFAULT 0,
  first_tx_date TIMESTAMP WITH TIME ZONE,
  last_tx_date TIMESTAMP WITH TIME ZONE,
  transaction_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.wallet_stats ENABLE ROW LEVEL SECURITY;

-- Anyone can view stats (for social proof)
CREATE POLICY "Anyone can view wallet stats"
ON public.wallet_stats
FOR SELECT
USING (true);

-- Anyone can insert/update their wallet stats
CREATE POLICY "Anyone can manage wallet stats"
ON public.wallet_stats
FOR ALL
USING (true)
WITH CHECK (true);

-- Trigger for updated_at
CREATE TRIGGER update_wallet_stats_updated_at
BEFORE UPDATE ON public.wallet_stats
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();