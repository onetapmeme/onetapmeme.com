import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingXPProps {
  x: number;
  y: number;
  value: number;
  id: number;
}

interface FloatingXPItem {
  id: number;
  x: number;
  y: number;
  value: number;
}

const FloatingXPParticle = ({ x, y, value, id }: FloatingXPProps) => {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 1, y: 0, scale: 1 }}
      animate={{ 
        opacity: 0, 
        y: -80,
        scale: 1.5
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="fixed pointer-events-none z-50 font-bold text-2xl"
      style={{
        left: x,
        top: y,
        textShadow: '0 0 10px currentColor, 0 0 20px currentColor',
      }}
    >
      <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
        +{value} XP
      </span>
    </motion.div>
  );
};

export const useFloatingXP = () => {
  const [particles, setParticles] = useState<FloatingXPItem[]>([]);
  const [particleId, setParticleId] = useState(0);

  const addParticle = (x: number, y: number, value: number) => {
    const id = particleId;
    setParticleId(prev => prev + 1);
    setParticles(prev => [...prev, { id, x, y, value }]);

    // Remove particle after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== id));
    }, 1300);
  };

  const FloatingXPContainer = () => (
    <AnimatePresence>
      {particles.map(particle => (
        <FloatingXPParticle key={particle.id} {...particle} />
      ))}
    </AnimatePresence>
  );

  return { addParticle, FloatingXPContainer };
};
