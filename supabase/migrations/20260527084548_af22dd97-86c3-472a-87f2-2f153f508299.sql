
-- 1. notification_subscriptions: lock to owner
DROP POLICY IF EXISTS "Anyone can view subscriptions" ON public.notification_subscriptions;
DROP POLICY IF EXISTS "Anyone can subscribe to notifications" ON public.notification_subscriptions;
DROP POLICY IF EXISTS "Anyone can update their subscription" ON public.notification_subscriptions;
DROP POLICY IF EXISTS "Anyone can delete their subscription" ON public.notification_subscriptions;

CREATE POLICY "Owners view their subscriptions"
  ON public.notification_subscriptions FOR SELECT TO authenticated
  USING (auth.uid() = user_id);
CREATE POLICY "Owners update their subscriptions"
  ON public.notification_subscriptions FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Owners delete their subscriptions"
  ON public.notification_subscriptions FOR DELETE TO authenticated
  USING (auth.uid() = user_id);
-- INSERT only via SECURITY DEFINER RPC subscribe_to_notifications; no direct policy needed

-- 2. notification_preferences: scoped by subscription ownership
DROP POLICY IF EXISTS "Anyone can view preferences" ON public.notification_preferences;
DROP POLICY IF EXISTS "Anyone can insert preferences" ON public.notification_preferences;
DROP POLICY IF EXISTS "Anyone can update preferences" ON public.notification_preferences;

CREATE POLICY "Owners view their preferences"
  ON public.notification_preferences FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.notification_subscriptions s
                 WHERE s.id = notification_preferences.subscription_id
                   AND s.user_id = auth.uid()));
CREATE POLICY "Owners update their preferences"
  ON public.notification_preferences FOR UPDATE TO authenticated
  USING (EXISTS (SELECT 1 FROM public.notification_subscriptions s
                 WHERE s.id = notification_preferences.subscription_id
                   AND s.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.notification_subscriptions s
                      WHERE s.id = notification_preferences.subscription_id
                        AND s.user_id = auth.uid()));

-- 3. notifications_log: service_role only
DROP POLICY IF EXISTS "Anyone can view notification logs" ON public.notifications_log;
DROP POLICY IF EXISTS "System can insert logs" ON public.notifications_log;
CREATE POLICY "Service role manages logs"
  ON public.notifications_log FOR ALL TO public
  USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

-- 4. user_achievements: drop user INSERT (grants must come from server)
DROP POLICY IF EXISTS "Users can insert their own achievements" ON public.user_achievements;

-- 5. Realtime: remove manifesto_signatures from publication
ALTER PUBLICATION supabase_realtime DROP TABLE public.manifesto_signatures;

-- 6. Storage: revoke broad listing on dossier-photos
DROP POLICY IF EXISTS "Public read dossier photos" ON storage.objects;
-- Keep INSERT (anonymous diagnostic submissions). Bucket stays public so direct UUID URLs work.

-- 7. Fix function search_path on email queue helpers
ALTER FUNCTION public.enqueue_email(text, jsonb) SET search_path = public;
ALTER FUNCTION public.read_email_batch(text, integer, integer) SET search_path = public;
ALTER FUNCTION public.delete_email(text, bigint) SET search_path = public;
ALTER FUNCTION public.move_to_dlq(text, text, bigint, jsonb) SET search_path = public;

-- 8. Revoke EXECUTE on admin-only SECURITY DEFINER functions from anon/authenticated
REVOKE EXECUTE ON FUNCTION public.admin_list_dossiers(text) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.admin_update_dossier_status(text, dossier_status, text) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.admin_validate_dossier(text, text, text, integer) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.admin_reject_dossier(text, text) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.admin_mark_received(text) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.admin_mark_in_surgery(text) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.admin_mark_shipped(text, text, text) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.set_dossier_payment_link(text, text, timestamptz) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.log_admin_action(text, text, text, uuid, text, text, jsonb) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.delete_email(text, bigint) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.confirm_dossier_payment(text) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.confirm_dossier_payment(text, text) FROM anon, public;
