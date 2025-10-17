import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import benSpritesheet from '@/assets/ben-spritesheet.png';

interface LoadingScreenV2Props {
  isLoading: boolean;
}

const LoadingScreenV2 = ({ isLoading }: LoadingScreenV2Props) => {
  const [loadingStage, setLoadingStage] = useState('Loading precision...');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const stages = [
      'Loading precision...',
      'Optimizing your aim...',
      'Syncing ammunition...',
      'Target acquired...',
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      currentStage = (currentStage + 1) % stages.length;
      setLoadingStage(stages[currentStage]);
    }, 800);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            background: 'linear-gradient(180deg, hsl(220, 25%, 6%) 0%, hsl(210, 100%, 10%) 50%, hsl(220, 25%, 6%) 100%)',
          }}
        >
          {/* Grid background */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage: 'linear-gradient(hsl(210, 100%, 55%) 1px, transparent 1px), linear-gradient(90deg, hsl(210, 100%, 55%) 1px, transparent 1px)',
                backgroundSize: '50px 50px',
              }}
            />
          </div>

          {/* Central content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Ben character with idle animation */}
            <motion.div
              className="relative"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {/* Outer glow */}
              <motion.div
                className="absolute inset-0 bg-primary/30 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />

              {/* Ben sprite (neutral/idle) */}
              <div
                className="relative w-32 h-32 rounded-full border-4 border-primary/50 bg-card/80 backdrop-blur-sm shadow-2xl"
                style={{
                  backgroundImage: `url(${benSpritesheet})`,
                  backgroundSize: '384px 384px',
                  backgroundPosition: '0px 0px', // Neutral sprite (top-left)
                  backgroundRepeat: 'no-repeat',
                  imageRendering: 'pixelated',
                  boxShadow: '0 0 40px hsla(210, 100%, 55%, 0.5)',
                }}
              />
            </motion.div>

            {/* Loading text */}
            <motion.div
              key={loadingStage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-2xl md:text-3xl font-bold text-foreground text-center px-4"
            >
              {loadingStage}
            </motion.div>

            {/* Progress bar */}
            <div className="w-64 md:w-80 h-2 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm border border-primary/20">
              <motion.div
                className="h-full rounded-full relative overflow-hidden"
                style={{
                  background: 'linear-gradient(90deg, hsl(210, 100%, 55%), hsl(25, 100%, 55%))',
                }}
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3 }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 opacity-50"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)',
                  }}
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </motion.div>
            </div>

            {/* Tactical corners */}
            <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-primary/30" />
            <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-primary/30" />
            <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-primary/30" />
            <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-primary/30" />
          </div>

          {/* Crosshair decoration */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute top-0 left-1/2 w-[2px] h-8 bg-primary/20 -translate-x-1/2" />
            <div className="absolute bottom-0 left-1/2 w-[2px] h-8 bg-primary/20 -translate-x-1/2" />
            <div className="absolute left-0 top-1/2 h-[2px] w-8 bg-primary/20 -translate-y-1/2" />
            <div className="absolute right-0 top-1/2 h-[2px] w-8 bg-primary/20 -translate-y-1/2" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreenV2;
