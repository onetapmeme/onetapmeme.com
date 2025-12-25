-- Create audit log table for tracking admin access to sensitive data
CREATE TABLE public.admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID NOT NULL,
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id TEXT,
  target_user_id UUID,
  ip_address TEXT,
  user_agent TEXT,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs"
ON public.admin_audit_logs
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create index for efficient querying
CREATE INDEX idx_audit_logs_admin_user_id ON public.admin_audit_logs(admin_user_id);
CREATE INDEX idx_audit_logs_created_at ON public.admin_audit_logs(created_at DESC);
CREATE INDEX idx_audit_logs_resource_type ON public.admin_audit_logs(resource_type);
CREATE INDEX idx_audit_logs_target_user_id ON public.admin_audit_logs(target_user_id);

-- Create function to log admin actions (bypasses RLS for insert)
CREATE OR REPLACE FUNCTION public.log_admin_action(
  action_param TEXT,
  resource_type_param TEXT,
  resource_id_param TEXT DEFAULT NULL,
  target_user_id_param UUID DEFAULT NULL,
  ip_address_param TEXT DEFAULT NULL,
  user_agent_param TEXT DEFAULT NULL,
  details_param JSONB DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_user_id UUID := auth.uid();
  new_log_id UUID;
BEGIN
  -- Verify caller is an admin
  IF NOT public.has_role(current_user_id, 'admin') THEN
    RAISE EXCEPTION 'Unauthorized: Admin role required';
  END IF;
  
  -- Insert audit log
  INSERT INTO public.admin_audit_logs (
    admin_user_id,
    action,
    resource_type,
    resource_id,
    target_user_id,
    ip_address,
    user_agent,
    details
  )
  VALUES (
    current_user_id,
    action_param,
    resource_type_param,
    resource_id_param,
    target_user_id_param,
    ip_address_param,
    user_agent_param,
    details_param
  )
  RETURNING id INTO new_log_id;
  
  RETURN new_log_id;
END;
$$;