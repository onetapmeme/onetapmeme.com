import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, X, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LAUNCH_CONFIG, getTimeUntilLaunch } from '@/config/launch';
import { Button } from '@/components/ui/button';

const PreLaunchBanner = () => {
  const { t } = useTranslation();
  const [timeRemaining, setTimeRemaining] = useState(getTimeUntilLaunch());
  const [isVisible, setIsVisible] = useState(!LAUNCH_CONFIG.isLaunched);

  useEffect(() => {
    // Hide banner if already launched
    if (LAUNCH_CONFIG.isLaunched) {
      setIsVisible(false);
      return;
    }

    // Update countdown every second
    const interval = setInterval(() => {
      const time = getTimeUntilLaunch();
      setTimeRemaining(time);
      
      // Hide banner when launch time is reached
      if (!time) {
        setIsVisible(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Don't render if launched or manually closed
  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary via-primary-glow to-primary backdrop-blur-sm border-b border-primary/30"
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Left: Icon + Message */}
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                <Rocket className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <p className="text-sm font-bold text-white">
                  {t('preLaunch.title')}
                </p>
                <p className="text-xs text-white/80 hidden sm:block">
                  {t('preLaunch.subtitle')}
                </p>
              </div>
            </div>

            {/* Center: Countdown */}
            {timeRemaining && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-white/80" />
                <div className="flex gap-1 sm:gap-2 text-white font-mono">
                  <CountdownUnit value={timeRemaining.days} label={t('preLaunch.days')} />
                  <span className="text-white/60">:</span>
                  <CountdownUnit value={timeRemaining.hours} label={t('preLaunch.hours')} />
                  <span className="text-white/60">:</span>
                  <CountdownUnit value={timeRemaining.minutes} label={t('preLaunch.minutes')} />
                  <span className="text-white/60 hidden sm:inline">:</span>
                  <CountdownUnit 
                    value={timeRemaining.seconds} 
                    label={t('preLaunch.seconds')} 
                    className="hidden sm:flex"
                  />
                </div>
              </div>
            )}

            {/* Right: CTA + Close */}
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs"
                onClick={() => {
                  // Scroll to newsletter or waitlist section
                  const element = document.getElementById('community');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t('preLaunch.joinWaitlist')}
              </Button>
              <button
                onClick={() => setIsVisible(false)}
                className="p-1 rounded hover:bg-white/10 transition-colors"
                aria-label="Close banner"
              >
                <X className="w-4 h-4 text-white/60 hover:text-white" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

interface CountdownUnitProps {
  value: number;
  label: string;
  className?: string;
}

const CountdownUnit = ({ value, label, className = '' }: CountdownUnitProps) => (
  <div className={`flex flex-col items-center ${className}`}>
    <motion.span 
      key={value}
      initial={{ scale: 1.2, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-lg sm:text-xl font-bold leading-none"
    >
      {String(value).padStart(2, '0')}
    </motion.span>
    <span className="text-[8px] sm:text-[10px] text-white/60 uppercase leading-none mt-0.5">
      {label}
    </span>
  </div>
);

export default PreLaunchBanner;
