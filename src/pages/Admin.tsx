import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminLaunchDashboard from '@/components/AdminLaunchDashboard';
import { Loader2, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuditLog, AUDIT_ACTIONS, RESOURCE_TYPES } from '@/hooks/useAuditLog';

export default function Admin() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { logAction } = useAuditLog();

  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate('/auth');
        return;
      }

      setUser(user);

      // Check if user has admin role
      const { data: roles, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .single();

      if (error || !roles) {
        setIsAdmin(false);
      } else {
        setIsAdmin(true);
        
        // Log successful admin panel access
        await logAction({
          action: AUDIT_ACTIONS.ACCESS,
          resourceType: 'admin_panel',
          details: { 
            page: 'admin_dashboard',
            timestamp: new Date().toISOString(),
          },
        });
      }
    } catch (error) {
      console.error('Error checking admin access:', error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 container mx-auto px-4">
          <div className="max-w-md mx-auto text-center py-16">
            <ShieldAlert className="w-16 h-16 text-destructive mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
            <p className="text-muted-foreground mb-8">
              You don't have permission to access this page. Admin privileges are required.
            </p>
            <div className="space-x-4">
              <Button onClick={() => navigate('/')} variant="outline">
                Go Home
              </Button>
              {!user && (
                <Button onClick={() => navigate('/auth')}>
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 container mx-auto px-4">
        <AdminLaunchDashboard />
      </div>
      <Footer />
    </div>
  );
}
