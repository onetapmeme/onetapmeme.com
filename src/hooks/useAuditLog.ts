import { supabase } from '@/integrations/supabase/client';

interface AuditLogParams {
  action: string;
  resourceType: string;
  resourceId?: string;
  targetUserId?: string;
  details?: Record<string, any>;
}

export const useAuditLog = () => {
  const logAction = async ({
    action,
    resourceType,
    resourceId,
    targetUserId,
    details,
  }: AuditLogParams): Promise<boolean> => {
    try {
      const { error } = await supabase.rpc('log_admin_action', {
        action_param: action,
        resource_type_param: resourceType,
        resource_id_param: resourceId || null,
        target_user_id_param: targetUserId || null,
        ip_address_param: null, // Could be obtained from a server-side function if needed
        user_agent_param: navigator.userAgent,
        details_param: details || null,
      });

      if (error) {
        console.error('Failed to log admin action:', error);
        return false;
      }

      return true;
    } catch (err) {
      console.error('Audit log error:', err);
      return false;
    }
  };

  return { logAction };
};

// Action constants for consistent logging
export const AUDIT_ACTIONS = {
  VIEW: 'VIEW',
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  DELETE: 'DELETE',
  EXPORT: 'EXPORT',
  ACCESS: 'ACCESS',
} as const;

export const RESOURCE_TYPES = {
  LAUNCH_CONFIG: 'launch_config',
  USER_DATA: 'user_data',
  USER_ROLES: 'user_roles',
  AUDIT_LOGS: 'audit_logs',
  PLAYER_PROGRESS: 'player_progress',
  MEMES: 'memes',
  REFERRALS: 'referrals',
} as const;
