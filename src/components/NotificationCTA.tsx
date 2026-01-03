import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, BellRing, TrendingUp, Zap, Gift, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePushNotifications } from '@/hooks/usePushNotifications';

const NotificationCTA = () => {
  const { isSupported, isSubscribed, isLoading, subscribe } = usePushNotifications();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubscribe = async () => {
    const success = await subscribe();
    if (success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  if (!isSupported) return null;

  if (isSubscribed || showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl p-8 glass-effect border border-accent/30"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10" />
        
        <div className="relative text-center space-y-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            className="w-16 h-16 mx-auto rounded-full bg-accent/20 flex items-center justify-center"
          >
            <Check className="w-8 h-8 text-accent" />
          </motion.div>
          
          <h3 className="text-2xl font-bold text-foreground">You're All Set! 🎉</h3>
          <p className="text-muted-foreground">
            You'll receive instant alerts for price changes, announcements, and exclusive drops.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-2xl p-8 glass-effect border border-primary/30"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/20 blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-accent/20 blur-3xl"
        />
      </div>

      <div className="relative grid md:grid-cols-2 gap-8 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <BellRing className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm font-medium text-primary">Stay Ahead</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Never Miss a <span className="text-primary">Price Alert</span>
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Get instant notifications for market movements, exclusive announcements, and whale activity. Be the first to know!
          </p>

          <Button
            onClick={handleSubscribe}
            disabled={isLoading}
            size="lg"
            className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent hover:opacity-90 px-8"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Bell className="w-5 h-5" />
                  </motion.div>
                  Enabling...
                </>
              ) : (
                <>
                  <Bell className="w-5 h-5 group-hover:animate-bounce" />
                  Enable Notifications
                </>
              )}
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </Button>
        </div>

        {/* Right Content - Features */}
        <div className="space-y-4">
          <NotificationFeature
            icon={<TrendingUp className="w-5 h-5" />}
            title="Price Alerts"
            description="Real-time notifications when price moves ±10%"
            color="text-primary"
            delay={0}
          />
          <NotificationFeature
            icon={<Zap className="w-5 h-5" />}
            title="Whale Tracking"
            description="Know when big wallets buy or sell"
            color="text-yellow-500"
            delay={0.1}
          />
          <NotificationFeature
            icon={<Gift className="w-5 h-5" />}
            title="Airdrop Alerts"
            description="Never miss an airdrop claim window"
            color="text-accent"
            delay={0.2}
          />
        </div>
      </div>
    </motion.div>
  );
};

interface NotificationFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  delay: number;
}

const NotificationFeature = ({ icon, title, description, color, delay }: NotificationFeatureProps) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="flex items-start gap-4 p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 transition-colors"
  >
    <div className={`p-2 rounded-lg bg-background ${color}`}>
      {icon}
    </div>
    <div>
      <h4 className="font-semibold text-foreground">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </motion.div>
);

export default NotificationCTA;
