import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BellRing, X, TrendingUp, Megaphone, Gift, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { usePushNotifications, NotificationPreferences } from '@/hooks/usePushNotifications';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isSupported,
    isSubscribed,
    isLoading,
    preferences,
    subscribe,
    unsubscribe,
    updatePreferences,
  } = usePushNotifications();

  const handleToggle = async () => {
    if (isSubscribed) {
      await unsubscribe();
    } else {
      await subscribe();
    }
  };

  const handlePreferenceChange = async (key: keyof NotificationPreferences, value: boolean) => {
    const newPrefs = { ...preferences, [key]: value };
    await updatePreferences(newPrefs);
  };

  if (!isSupported) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Bell Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 rounded-full glass-effect border border-primary/20 hover:border-primary/40 transition-all group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isSubscribed ? (
          <BellRing className="w-5 h-5 text-primary animate-pulse" />
        ) : (
          <Bell className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        )}
        
        {isSubscribed && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"
          />
        )}
      </motion.button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-14 w-80 glass-effect rounded-xl border border-primary/20 overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-border/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <BellRing className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Notifications</h3>
                  <p className="text-xs text-muted-foreground">
                    {isSubscribed ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4">
              {!isSubscribed ? (
                <>
                  <p className="text-sm text-muted-foreground">
                    Stay updated with real-time price alerts, announcements, and exclusive drops!
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-foreground/80">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span>Price movement alerts</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground/80">
                      <Megaphone className="w-4 h-4 text-accent" />
                      <span>Important announcements</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground/80">
                      <Gift className="w-4 h-4 text-green-500" />
                      <span>Airdrop notifications</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground/80">
                      <Wallet className="w-4 h-4 text-yellow-500" />
                      <span>Whale activity alerts</span>
                    </div>
                  </div>

                  <Button
                    onClick={handleToggle}
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                  >
                    {isLoading ? 'Enabling...' : '🔔 Enable Notifications'}
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-3">
                    {/* Price Alerts */}
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <div>
                          <p className="text-sm font-medium">Price Alerts</p>
                          <p className="text-xs text-muted-foreground">±10% movements</p>
                        </div>
                      </div>
                      <Switch
                        checked={preferences.priceAlerts}
                        onCheckedChange={(v) => handlePreferenceChange('priceAlerts', v)}
                        disabled={isLoading}
                      />
                    </div>

                    {/* Announcements */}
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <Megaphone className="w-4 h-4 text-accent" />
                        <div>
                          <p className="text-sm font-medium">Announcements</p>
                          <p className="text-xs text-muted-foreground">Team updates</p>
                        </div>
                      </div>
                      <Switch
                        checked={preferences.announcements}
                        onCheckedChange={(v) => handlePreferenceChange('announcements', v)}
                        disabled={isLoading}
                      />
                    </div>

                    {/* Airdrop Alerts */}
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <Gift className="w-4 h-4 text-green-500" />
                        <div>
                          <p className="text-sm font-medium">Airdrop Alerts</p>
                          <p className="text-xs text-muted-foreground">Claim notifications</p>
                        </div>
                      </div>
                      <Switch
                        checked={preferences.airdropAlerts}
                        onCheckedChange={(v) => handlePreferenceChange('airdropAlerts', v)}
                        disabled={isLoading}
                      />
                    </div>

                    {/* Whale Alerts */}
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <Wallet className="w-4 h-4 text-yellow-500" />
                        <div>
                          <p className="text-sm font-medium">Whale Alerts</p>
                          <p className="text-xs text-muted-foreground">Large transactions</p>
                        </div>
                      </div>
                      <Switch
                        checked={preferences.whaleAlerts}
                        onCheckedChange={(v) => handlePreferenceChange('whaleAlerts', v)}
                        disabled={isLoading}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleToggle}
                    disabled={isLoading}
                    variant="outline"
                    className="w-full border-destructive/50 text-destructive hover:bg-destructive/10"
                  >
                    {isLoading ? 'Disabling...' : 'Disable Notifications'}
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
