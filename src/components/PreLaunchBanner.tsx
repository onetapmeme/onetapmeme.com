import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, X, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getLaunchConfig, getTimeUntilLaunch } from '@/config/launch';
import { Button } from '@/components/ui/button';
const PreLaunchBanner = () => {
  const {
    t
  } = useTranslation();
  const [timeRemaining, setTimeRemaining] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const updateCountdown = async () => {
      const config = await getLaunchConfig();

      // Hide banner if already launched
      if (config.isLaunched) {
        setIsVisible(false);
        return;
      }

      // Get initial time
      const time = await getTimeUntilLaunch();
      setTimeRemaining(time);
    };

    // Initial update
    updateCountdown();

    // Update countdown every second
    const interval = setInterval(async () => {
      const config = await getLaunchConfig();
      if (config.isLaunched) {
        setIsVisible(false);
        clearInterval(interval);
        return;
      }
      const time = await getTimeUntilLaunch();
      setTimeRemaining(time);

      // Hide banner when launch time is reached
      if (!time) {
        setIsVisible(false);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Don't render if launched or manually closed
  if (!isVisible) return null;
  return <AnimatePresence>
      <motion.div initial={{
      y: -100,
      opacity: 0
    }} animate={{
      y: 0,
      opacity: 1
    }} exit={{
      y: -100,
      opacity: 0
    }} transition={{
      duration: 0.5,
      ease: "easeOut"
    }} className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary via-primary-glow to-primary backdrop-blur-sm border-b border-primary/30">
        <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
            {/* Left: Icon + Message */}
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <motion.div animate={{
              rotate: [0, -10, 10, -10, 0],
              scale: [1, 1.1, 1]
            }} transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3
            }}>
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </motion.div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white">
                  {t('preLaunch.title')}
                </p>
                <p className="text-[10px] sm:text-xs text-white/80 hidden md:block">
                  {t('preLaunch.subtitle')}
                </p>
              </div>
            </div>

            {/* Center: Countdown */}
            {timeRemaining && <div className="flex items-center gap-1 sm:gap-2">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-white/80" />
                <div className="flex gap-1 text-white font-mono text-xs sm:text-base">
                  <CountdownUnit value={timeRemaining.days} label={t('preLaunch.days')} />
                  <span className="text-white/60">:</span>
                  <CountdownUnit value={timeRemaining.hours} label={t('preLaunch.hours')} />
                  <span className="text-white/60 hidden sm:inline">:</span>
                  <CountdownUnit value={timeRemaining.minutes} label={t('preLaunch.minutes')} className="hidden sm:flex" />
                  <span className="text-white/60 hidden md:inline">:</span>
                  <CountdownUnit value={timeRemaining.seconds} label={t('preLaunch.seconds')} className="hidden md:flex" />
                </div>
              </div>}

            {/* Right: CTA + Close */}
            <div className="flex items-center gap-2">
              
              <button onClick={() => setIsVisible(false)} className="p-1.5 sm:p-1 rounded hover:bg-white/10 transition-colors" aria-label="Close banner">
                <X className="w-5 h-5 sm:w-4 sm:h-4 text-white/60 hover:text-white" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>;
};
interface CountdownUnitProps {
  value: number;
  label: string;
  className?: string;
}
const CountdownUnit = ({
  value,
  label,
  className = ''
}: CountdownUnitProps) => <div className={`flex flex-col items-center ${className}`}>
    <motion.span key={value} initial={{
    scale: 1.2,
    opacity: 0
  }} animate={{
    scale: 1,
    opacity: 1
  }} className="text-sm sm:text-lg md:text-xl font-bold leading-none">
      {String(value).padStart(2, '0')}
    </motion.span>
    <span className="text-[9px] sm:text-[10px] text-white/60 uppercase leading-none mt-0.5">
      {label}
    </span>
  </div>;
export default PreLaunchBanner;