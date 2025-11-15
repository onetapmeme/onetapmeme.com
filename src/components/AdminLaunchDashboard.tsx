import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, Shield } from 'lucide-react';
import { clearConfigCache } from '@/config/launch';
import { z } from 'zod';

// URL validation schema
const urlSchema = z.string().trim().url("Invalid URL format").max(500, "URL must be less than 500 characters");

const launchConfigSchema = z.object({
  contract_address: z.string().trim()
    .min(1, "Contract address is required")
    .max(100, "Contract address must be less than 100 characters")
    .regex(/^(0x)?[0-9a-fA-F]+$/, "Invalid contract address format"),
  buy_link: urlSchema,
  chart_link: urlSchema,
  audit_report_url: z.string().trim().url("Invalid URL format").max(500, "URL must be less than 500 characters").nullable(),
  lp_lock_url: urlSchema,
  lp_platform: z.string().trim().min(1, "LP platform is required").max(100),
  lp_amount: z.string().trim().min(1, "LP amount is required").max(50),
  audit_auditor: z.string().trim().max(100, "Auditor name must be less than 100 characters").nullable(),
  audit_score: z.string().trim().max(20, "Audit score must be less than 20 characters").nullable(),
  audit_date: z.string().nullable(),
});

interface LaunchConfigData {
  id: string;
  is_launched: boolean;
  launch_date: string;
  contract_address: string;
  buy_link: string;
  chart_link: string;
  audit_completed: boolean;
  audit_auditor: string | null;
  audit_score: string | null;
  audit_report_url: string | null;
  audit_date: string | null;
  lp_locked: boolean;
  lp_platform: string;
  lp_lock_url: string;
  lp_amount: string;
  lp_unlock_date: string | null;
}

export default function AdminLaunchDashboard() {
  const [config, setConfig] = useState<LaunchConfigData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('launch_config')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;
      setConfig(data);
    } catch (error) {
      console.error('Error fetching config:', error);
      toast({
        title: "Error",
        description: "Failed to load launch configuration",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!config) return;

    // Validate all URL and text inputs before saving
    try {
      launchConfigSchema.parse({
        contract_address: config.contract_address,
        buy_link: config.buy_link,
        chart_link: config.chart_link,
        audit_report_url: config.audit_report_url || null,
        lp_lock_url: config.lp_lock_url,
        lp_platform: config.lp_platform,
        lp_amount: config.lp_amount,
        audit_auditor: config.audit_auditor || null,
        audit_score: config.audit_score || null,
        audit_date: config.audit_date || null,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: error.errors[0].message,
          variant: "destructive",
        });
        return;
      }
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from('launch_config')
        .update({
          is_launched: config.is_launched,
          launch_date: config.launch_date,
          contract_address: config.contract_address.trim(),
          buy_link: config.buy_link.trim(),
          chart_link: config.chart_link.trim(),
          audit_completed: config.audit_completed,
          audit_auditor: config.audit_auditor?.trim() || null,
          audit_score: config.audit_score?.trim() || null,
          audit_report_url: config.audit_report_url?.trim() || null,
          audit_date: config.audit_date,
          lp_locked: config.lp_locked,
          lp_platform: config.lp_platform.trim(),
          lp_lock_url: config.lp_lock_url.trim(),
          lp_amount: config.lp_amount.trim(),
          lp_unlock_date: config.lp_unlock_date,
          updated_by: (await supabase.auth.getUser()).data.user?.id,
        })
        .eq('id', config.id);

      if (error) throw error;

      // Clear the cache so the config is refreshed everywhere
      clearConfigCache();

      toast({
        title: "Success",
        description: "Launch configuration updated successfully",
      });
    } catch (error) {
      console.error('Error saving config:', error);
      toast({
        title: "Error",
        description: "Failed to save launch configuration",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const updateField = (field: keyof LaunchConfigData, value: any) => {
    if (!config) return;
    setConfig({ ...config, [field]: value });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!config) {
    return (
      <div className="text-center text-muted-foreground">
        No launch configuration found
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Launch Configuration</h1>
          <p className="text-muted-foreground">Manage your token launch settings</p>
        </div>
      </div>

      {/* Launch Status */}
      <Card>
        <CardHeader>
          <CardTitle>🚀 Launch Status</CardTitle>
          <CardDescription>Control the main launch state</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="is-launched" className="text-lg font-semibold">
                Token Launched
              </Label>
              <p className="text-sm text-muted-foreground">
                {config.is_launched ? 'Token is LIVE' : 'Pre-launch mode'}
              </p>
            </div>
            <Switch
              id="is-launched"
              checked={config.is_launched}
              onCheckedChange={(checked) => updateField('is_launched', checked)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="launch-date">Launch Date (UTC)</Label>
            <Input
              id="launch-date"
              type="datetime-local"
              value={config.launch_date.slice(0, 16)}
              onChange={(e) => updateField('launch_date', e.target.value + ':00Z')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Contract & Links */}
      <Card>
        <CardHeader>
          <CardTitle>📝 Contract & Trading Links</CardTitle>
          <CardDescription>Token contract and exchange links</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contract">Contract Address</Label>
            <Input
              id="contract"
              value={config.contract_address}
              onChange={(e) => updateField('contract_address', e.target.value)}
              placeholder="0x..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="buy-link">Buy Link (Uniswap)</Label>
            <Input
              id="buy-link"
              value={config.buy_link}
              onChange={(e) => updateField('buy_link', e.target.value)}
              placeholder="https://app.uniswap.org/..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="chart-link">Chart Link (DexScreener)</Label>
            <Input
              id="chart-link"
              value={config.chart_link}
              onChange={(e) => updateField('chart_link', e.target.value)}
              placeholder="https://dexscreener.com/..."
            />
          </div>
        </CardContent>
      </Card>

      {/* Audit Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>🛡️ Audit Configuration</CardTitle>
          <CardDescription>Security audit details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="audit-completed">Audit Completed</Label>
            <Switch
              id="audit-completed"
              checked={config.audit_completed}
              onCheckedChange={(checked) => updateField('audit_completed', checked)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="auditor">Auditor Name</Label>
            <Input
              id="auditor"
              value={config.audit_auditor || ''}
              onChange={(e) => updateField('audit_auditor', e.target.value || null)}
              placeholder="e.g., CertiK, Solidproof"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="audit-score">Audit Score</Label>
            <Input
              id="audit-score"
              value={config.audit_score || ''}
              onChange={(e) => updateField('audit_score', e.target.value || null)}
              placeholder="e.g., 96/100"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="audit-report">Report URL</Label>
            <Input
              id="audit-report"
              value={config.audit_report_url || ''}
              onChange={(e) => updateField('audit_report_url', e.target.value || null)}
              placeholder="ipfs://... or https://..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="audit-date">Audit Date</Label>
            <Input
              id="audit-date"
              type="date"
              value={config.audit_date || ''}
              onChange={(e) => updateField('audit_date', e.target.value || null)}
            />
          </div>
        </CardContent>
      </Card>

      {/* LP Lock Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>🔒 Liquidity Pool Lock</CardTitle>
          <CardDescription>LP lock proof details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="lp-locked">LP Locked</Label>
            <Switch
              id="lp-locked"
              checked={config.lp_locked}
              onCheckedChange={(checked) => updateField('lp_locked', checked)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lp-platform">Lock Platform</Label>
            <Input
              id="lp-platform"
              value={config.lp_platform}
              onChange={(e) => updateField('lp_platform', e.target.value)}
              placeholder="e.g., Team.Finance, Unicrypt"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lp-lock-url">Lock Proof URL</Label>
            <Input
              id="lp-lock-url"
              value={config.lp_lock_url}
              onChange={(e) => updateField('lp_lock_url', e.target.value)}
              placeholder="https://..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lp-amount">Amount Locked</Label>
            <Input
              id="lp-amount"
              value={config.lp_amount}
              onChange={(e) => updateField('lp_amount', e.target.value)}
              placeholder="e.g., 95%"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lp-unlock-date">Unlock Date (UTC)</Label>
            <Input
              id="lp-unlock-date"
              type="datetime-local"
              value={config.lp_unlock_date ? config.lp_unlock_date.slice(0, 16) : ''}
              onChange={(e) => updateField('lp_unlock_date', e.target.value ? e.target.value + ':00Z' : null)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSave} 
          disabled={saving}
          size="lg"
          className="gap-2"
        >
          {saving ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Configuration
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
