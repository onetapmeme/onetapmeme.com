import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// VAPID public key - in production, generate your own at https://vapidkeys.com/
const VAPID_PUBLIC_KEY = 'BNsNp93p06D7OvIo2IVjIZ4R1ysVMgFJBCJhHg8zLCi-dGN9a8wR7K7wCqN7NJDwB_1nVz9SaYJVpqxZ8VvR6X4';

export interface NotificationPreferences {
  priceAlerts: boolean;
  announcements: boolean;
  airdropAlerts: boolean;
  whaleAlerts: boolean;
}

export const usePushNotifications = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    priceAlerts: true,
    announcements: true,
    airdropAlerts: true,
    whaleAlerts: true,
  });

  // Check if push notifications are supported
  useEffect(() => {
    const checkSupport = async () => {
      const supported = 'serviceWorker' in navigator && 'PushManager' in window;
      setIsSupported(supported);
      
      if (supported) {
        // Check if already subscribed
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        setIsSubscribed(!!subscription);
        
        if (subscription) {
          // Fetch preferences from database
          const { data } = await supabase
            .from('notification_subscriptions')
            .select('id, notification_preferences(*)')
            .eq('endpoint', subscription.endpoint)
            .single();
            
          if (data) {
            setSubscriptionId(data.id);
            const prefs = (data as any).notification_preferences?.[0];
            if (prefs) {
              setPreferences({
                priceAlerts: prefs.price_alerts,
                announcements: prefs.announcements,
                airdropAlerts: prefs.airdrop_alerts,
                whaleAlerts: prefs.whale_alerts,
              });
            }
          }
        }
      }
    };
    
    checkSupport();
  }, []);

  const urlBase64ToUint8Array = (base64String: string): ArrayBuffer => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray.buffer as ArrayBuffer;
  };

  const subscribe = useCallback(async (prefs: NotificationPreferences = preferences) => {
    if (!isSupported) {
      toast.error('Push notifications are not supported in your browser');
      return false;
    }
    
    setIsLoading(true);
    
    try {
      // Request notification permission
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        toast.error('Notification permission denied');
        setIsLoading(false);
        return false;
      }
      
      // Register service worker if not already registered
      const registration = await navigator.serviceWorker.register('/sw.js');
      await navigator.serviceWorker.ready;
      
      // Subscribe to push notifications
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
      
      const subscriptionJson = subscription.toJSON();
      
      // Save to database using RPC function
      const { data, error } = await supabase.rpc('subscribe_to_notifications', {
        endpoint_param: subscriptionJson.endpoint!,
        p256dh_key_param: subscriptionJson.keys!.p256dh,
        auth_key_param: subscriptionJson.keys!.auth,
        price_alerts_param: prefs.priceAlerts,
        announcements_param: prefs.announcements,
        airdrop_alerts_param: prefs.airdropAlerts,
        whale_alerts_param: prefs.whaleAlerts,
      });
      
      if (error) throw error;
      
      setSubscriptionId(data);
      setIsSubscribed(true);
      setPreferences(prefs);
      toast.success('🔔 Notifications enabled! You\'ll receive price alerts and announcements.');
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Failed to subscribe:', error);
      toast.error('Failed to enable notifications');
      setIsLoading(false);
      return false;
    }
  }, [isSupported, preferences]);

  const unsubscribe = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      
      if (subscription) {
        await subscription.unsubscribe();
        
        // Remove from database
        await supabase
          .from('notification_subscriptions')
          .delete()
          .eq('endpoint', subscription.endpoint);
      }
      
      setIsSubscribed(false);
      setSubscriptionId(null);
      toast.success('Notifications disabled');
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Failed to unsubscribe:', error);
      toast.error('Failed to disable notifications');
      setIsLoading(false);
      return false;
    }
  }, []);

  const updatePreferences = useCallback(async (newPrefs: NotificationPreferences) => {
    if (!subscriptionId) return false;
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('notification_preferences')
        .update({
          price_alerts: newPrefs.priceAlerts,
          announcements: newPrefs.announcements,
          airdrop_alerts: newPrefs.airdropAlerts,
          whale_alerts: newPrefs.whaleAlerts,
          updated_at: new Date().toISOString(),
        })
        .eq('subscription_id', subscriptionId);
        
      if (error) throw error;
      
      setPreferences(newPrefs);
      toast.success('Preferences updated');
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error('Failed to update preferences:', error);
      toast.error('Failed to update preferences');
      setIsLoading(false);
      return false;
    }
  }, [subscriptionId]);

  return {
    isSupported,
    isSubscribed,
    isLoading,
    preferences,
    subscribe,
    unsubscribe,
    updatePreferences,
  };
};
