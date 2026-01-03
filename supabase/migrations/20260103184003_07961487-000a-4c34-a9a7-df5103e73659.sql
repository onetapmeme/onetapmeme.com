-- Create notification subscriptions table for push notifications
CREATE TABLE public.notification_subscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  endpoint TEXT NOT NULL UNIQUE,
  p256dh_key TEXT NOT NULL,
  auth_key TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create notification preferences table
CREATE TABLE public.notification_preferences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subscription_id UUID NOT NULL REFERENCES public.notification_subscriptions(id) ON DELETE CASCADE,
  price_alerts BOOLEAN DEFAULT true,
  announcements BOOLEAN DEFAULT true,
  airdrop_alerts BOOLEAN DEFAULT true,
  whale_alerts BOOLEAN DEFAULT true,
  price_threshold_up NUMERIC DEFAULT 10,
  price_threshold_down NUMERIC DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT notification_preferences_subscription_id_key UNIQUE (subscription_id)
);

-- Create notifications log table
CREATE TABLE public.notifications_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  subscription_id UUID REFERENCES public.notification_subscriptions(id) ON DELETE SET NULL,
  notification_type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  data JSONB,
  sent_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  delivered BOOLEAN DEFAULT false,
  error_message TEXT
);

-- Enable RLS
ALTER TABLE public.notification_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies for notification_subscriptions (public for anonymous subscriptions)
CREATE POLICY "Anyone can subscribe to notifications"
  ON public.notification_subscriptions
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view subscriptions"
  ON public.notification_subscriptions
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update their subscription"
  ON public.notification_subscriptions
  FOR UPDATE
  USING (true);

CREATE POLICY "Anyone can delete their subscription"
  ON public.notification_subscriptions
  FOR DELETE
  USING (true);

-- RLS Policies for notification_preferences
CREATE POLICY "Anyone can insert preferences"
  ON public.notification_preferences
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view preferences"
  ON public.notification_preferences
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can update preferences"
  ON public.notification_preferences
  FOR UPDATE
  USING (true);

-- RLS Policies for notifications_log
CREATE POLICY "Anyone can view notification logs"
  ON public.notifications_log
  FOR SELECT
  USING (true);

CREATE POLICY "System can insert logs"
  ON public.notifications_log
  FOR INSERT
  WITH CHECK (true);

-- Create indexes
CREATE INDEX idx_notification_subscriptions_user ON public.notification_subscriptions(user_id);
CREATE INDEX idx_notification_subscriptions_endpoint ON public.notification_subscriptions(endpoint);
CREATE INDEX idx_notification_preferences_subscription ON public.notification_preferences(subscription_id);
CREATE INDEX idx_notifications_log_type ON public.notifications_log(notification_type);
CREATE INDEX idx_notifications_log_sent ON public.notifications_log(sent_at);

-- Function to subscribe to push notifications
CREATE OR REPLACE FUNCTION public.subscribe_to_notifications(
  endpoint_param TEXT,
  p256dh_key_param TEXT,
  auth_key_param TEXT,
  price_alerts_param BOOLEAN DEFAULT true,
  announcements_param BOOLEAN DEFAULT true,
  airdrop_alerts_param BOOLEAN DEFAULT true,
  whale_alerts_param BOOLEAN DEFAULT true
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  sub_id UUID;
BEGIN
  -- Insert or update subscription
  INSERT INTO notification_subscriptions (endpoint, p256dh_key, auth_key, user_id, updated_at)
  VALUES (endpoint_param, p256dh_key_param, auth_key_param, auth.uid(), now())
  ON CONFLICT (endpoint) 
  DO UPDATE SET 
    p256dh_key = EXCLUDED.p256dh_key,
    auth_key = EXCLUDED.auth_key,
    updated_at = now()
  RETURNING id INTO sub_id;
  
  -- Insert or update preferences
  INSERT INTO notification_preferences (subscription_id, price_alerts, announcements, airdrop_alerts, whale_alerts)
  VALUES (sub_id, price_alerts_param, announcements_param, airdrop_alerts_param, whale_alerts_param)
  ON CONFLICT (subscription_id) 
  DO UPDATE SET
    price_alerts = EXCLUDED.price_alerts,
    announcements = EXCLUDED.announcements,
    airdrop_alerts = EXCLUDED.airdrop_alerts,
    whale_alerts = EXCLUDED.whale_alerts,
    updated_at = now();
    
  RETURN sub_id;
END;
$$;