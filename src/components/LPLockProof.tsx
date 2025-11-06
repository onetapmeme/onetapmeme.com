import { motion } from 'framer-motion';
import { Lock, ExternalLink, Calendar, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { LAUNCH_CONFIG } from '@/config/launch';

interface LPLockProofProps {
  className?: string;
}

const LPLockProof = ({ className = '' }: LPLockProofProps) => {
  const { t } = useTranslation();
  const [timeRemaining, setTimeRemaining] = useState('');

  // Get LP lock data from launch config
  const lockData = {
    platform: LAUNCH_CONFIG.lpLock.platform,
    lockUrl: LAUNCH_CONFIG.lpLock.lockUrl,
    amount: LAUNCH_CONFIG.lpLock.amount,
    unlockDate: LAUNCH_CONFIG.lpLock.unlockDate 
      ? new Date(LAUNCH_CONFIG.lpLock.unlockDate)
      : new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // Default: 6 months from now
    verified: LAUNCH_CONFIG.lpLock.locked,
  };

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const diff = lockData.unlockDate.getTime() - now.getTime();
      
      if (diff <= 0) {
        setTimeRemaining(t('lpLock.unlocked'));
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      
      setTimeRemaining(`${days}d ${hours}h`);
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [lockData.unlockDate, t]);

  return (
    <Card className={`glass-effect p-6 border-2 border-primary/30 hover:border-primary/50 transition-all duration-500 ${className}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start gap-4">
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="p-3 rounded-full bg-blue-500/10"
          >
            <Lock className="w-8 h-8 text-blue-500" />
          </motion.div>

          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
              {t('lpLock.title')}
              {lockData.verified && (
                <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full">
                  ✓ {t('lpLock.verified')}
                </span>
              )}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t('lpLock.description')}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <TrendingUp className="w-4 h-4" />
              <span>{t('lpLock.amountLocked')}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{lockData.amount}</p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground text-xs">
              <Calendar className="w-4 h-4" />
              <span>{t('lpLock.timeRemaining')}</span>
            </div>
            <p className="text-2xl font-bold text-primary">{timeRemaining}</p>
          </div>
        </div>

        {/* Platform Info */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
          <div>
            <p className="text-xs text-muted-foreground mb-1">{t('lpLock.platform')}</p>
            <p className="font-semibold text-foreground">{lockData.platform}</p>
          </div>
          <a
            href={lockData.lockUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors text-sm font-semibold"
          >
            {t('lpLock.viewProof')}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Unlock Date */}
        <div className="text-center pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            {t('lpLock.unlockDate')}: <span className="font-semibold text-foreground">
              {lockData.unlockDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default LPLockProof;
