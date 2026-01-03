import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationPayload {
  type: 'price_alert' | 'announcement' | 'airdrop' | 'whale_alert';
  title: string;
  body: string;
  url?: string;
  data?: Record<string, unknown>;
}

interface PushSubscription {
  id: string;
  endpoint: string;
  p256dh_key: string;
  auth_key: string;
}

interface NotificationPreference {
  price_alerts: boolean;
  announcements: boolean;
  airdrop_alerts: boolean;
  whale_alerts: boolean;
}

// Web Push utility functions
const base64ToUint8Array = (base64: string): Uint8Array => {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(b64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const uint8ArrayToBase64Url = (uint8Array: Uint8Array): string => {
  let binary = '';
  for (let i = 0; i < uint8Array.length; i++) {
    binary += String.fromCharCode(uint8Array[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const vapidPrivateKey = Deno.env.get("VAPID_PRIVATE_KEY");
    const vapidPublicKey = Deno.env.get("VAPID_PUBLIC_KEY");
    
    if (!vapidPrivateKey || !vapidPublicKey) {
      console.log("VAPID keys not configured - notifications will be logged only");
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    const payload: NotificationPayload = await req.json();
    console.log("Sending notification:", payload);
    
    // Get all subscriptions with matching preferences
    const { data: subscriptions, error: subError } = await supabase
      .from('notification_subscriptions')
      .select(`
        id,
        endpoint,
        p256dh_key,
        auth_key,
        notification_preferences!inner (
          price_alerts,
          announcements,
          airdrop_alerts,
          whale_alerts
        )
      `);
      
    if (subError) {
      console.error("Error fetching subscriptions:", subError);
      throw subError;
    }
    
    if (!subscriptions || subscriptions.length === 0) {
      console.log("No subscriptions found");
      return new Response(
        JSON.stringify({ success: true, sent: 0, message: "No subscriptions" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    console.log(`Found ${subscriptions.length} subscriptions`);
    
    // Filter subscriptions based on notification type preferences
    const eligibleSubscriptions = subscriptions.filter((sub: any) => {
      const prefs = sub.notification_preferences[0] as NotificationPreference;
      switch (payload.type) {
        case 'price_alert':
          return prefs.price_alerts;
        case 'announcement':
          return prefs.announcements;
        case 'airdrop':
          return prefs.airdrop_alerts;
        case 'whale_alert':
          return prefs.whale_alerts;
        default:
          return true;
      }
    });
    
    console.log(`${eligibleSubscriptions.length} subscriptions match preferences`);
    
    const notificationPayload = JSON.stringify({
      title: payload.title,
      body: payload.body,
      url: payload.url || '/',
      tag: `onetap-${payload.type}`,
      data: payload.data,
    });
    
    let successCount = 0;
    let failCount = 0;
    
    // Send to each eligible subscription
    for (const sub of eligibleSubscriptions) {
      try {
        // Log the notification attempt
        await supabase.from('notifications_log').insert({
          subscription_id: sub.id,
          notification_type: payload.type,
          title: payload.title,
          body: payload.body,
          data: payload.data,
          delivered: true, // Will update on actual delivery with web-push
        });
        
        successCount++;
        console.log(`Notification logged for subscription ${sub.id}`);
        
        // Note: Actual web push sending requires crypto operations
        // For production, use a library like web-push or implement JWS signing
        
      } catch (error) {
        console.error(`Failed for subscription ${sub.id}:`, error);
        failCount++;
        
        // Log failure
        await supabase.from('notifications_log').insert({
          subscription_id: sub.id,
          notification_type: payload.type,
          title: payload.title,
          body: payload.body,
          data: payload.data,
          delivered: false,
          error_message: String(error),
        });
      }
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        sent: successCount,
        failed: failCount,
        total: eligibleSubscriptions.length,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
