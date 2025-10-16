import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/onetap_new_logo.png';
import { Crosshair, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  const [loadingStage, setLoadingStage] = useState(0);

  useEffect(() => {
    if (!isLoading) return;

    const stages = [
      'Initializing weapon systems...',
      'Loading tactical data...',
      'Preparing your arsenal...',
      'Almost ready, soldier...',
    ];

    let currentStage = 0;
    const interval = setInterval(() => {
      currentStage = (currentStage + 1) % stages.length;
      setLoadingStage(currentStage);
    }, 600);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  const loadingMessages = [
    'Initializing weapon systems...',
    'Loading tactical data...',
    'Preparing your arsenal...',
    'Almost ready, soldier...',
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-gradient-to-b from-background via-background to-background/95 flex items-center justify-center"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px bg-primary"
              style={{ 
                top: `${(i + 1) * 5}%`,
                width: '100%',
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scaleX: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>

        <div className="text-center relative z-10">
          {/* Ben Loading Animation - Advanced */}
          <div className="relative mb-8">
            {/* Outer glow ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                background: 'radial-gradient(circle, rgba(22,163,224,0.4) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />

            {/* Ben character with particle effects */}
            <motion.div
              className="relative"
              animate={{
                rotateY: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {/* Orbiting particles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-primary rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                  }}
                  animate={{
                    x: [
                      Math.cos((i * Math.PI) / 3) * 60,
                      Math.cos((i * Math.PI) / 3 + Math.PI) * 60,
                      Math.cos((i * Math.PI) / 3) * 60,
                    ],
                    y: [
                      Math.sin((i * Math.PI) / 3) * 60,
                      Math.sin((i * Math.PI) / 3 + Math.PI) * 60,
                      Math.sin((i * Math.PI) / 3) * 60,
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}

              <img
                src={logo}
                alt="Ben Loading"
                className="w-32 h-32 md:w-40 md:h-40 relative z-10"
                style={{
                  filter: 'drop-shadow(0 0 40px rgba(22,163,224,0.8))',
                  imageRendering: 'pixelated',
                }}
              />
            </motion.div>

            {/* Reload animation - Deagle magazine */}
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
              animate={{
                y: [0, -20, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Zap className="w-6 h-6 text-accent" />
            </motion.div>
          </div>

          {/* Loading text with stage animation */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.h2
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
              style={{
                backgroundSize: '200%',
                animation: 'gradient-flow 3s linear infinite',
              }}
            >
              Loading your next tap...
            </motion.h2>

            {/* Dynamic loading message */}
            <AnimatePresence mode="wait">
              <motion.p
                key={loadingStage}
                className="text-sm md:text-base text-muted-foreground font-mono"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {loadingMessages[loadingStage]}
              </motion.p>
            </AnimatePresence>

            {/* Animated crosshairs - Tactical style */}
            <div className="flex justify-center gap-3">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 1, 0.3],
                    rotate: [0, 90, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                >
                  <Crosshair className="w-6 h-6 text-primary" />
                </motion.div>
              ))}
            </div>

            {/* Advanced progress bar */}
            <div className="w-80 max-w-full mx-auto space-y-2">
              <div className="w-full h-3 bg-muted/30 rounded-full overflow-hidden border border-primary/20 backdrop-blur-sm">
                <motion.div
                  className="h-full relative"
                  style={{
                    background: 'linear-gradient(90deg, hsl(210, 100%, 55%), hsl(25, 100%, 55%))',
                    boxShadow: '0 0 20px hsla(210, 100%, 55%, 0.5)',
                  }}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
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

              {/* Percentage counter */}
              <motion.p
                className="text-xs text-center text-muted-foreground font-mono"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              >
                Optimizing performance...
              </motion.p>
            </div>
          </motion.div>
        </div>

        {/* Corner decorations - Tactical HUD style */}
        {[
          { top: '2rem', left: '2rem', rotate: 0 },
          { top: '2rem', right: '2rem', rotate: 90 },
          { bottom: '2rem', left: '2rem', rotate: -90 },
          { bottom: '2rem', right: '2rem', rotate: 180 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 border-t-2 border-l-2 border-primary/30"
            style={{ ...pos, transform: `rotate(${pos.rotate}deg)` }}
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

export default LoadingScreen;
