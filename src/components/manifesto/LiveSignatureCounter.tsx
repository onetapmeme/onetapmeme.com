import { motion, AnimatePresence } from "framer-motion";

interface LiveSignatureCounterProps {
  count: number;
  loading: boolean;
}

export const LiveSignatureCounter = ({ count, loading }: LiveSignatureCounterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="bg-primary/10 border-2 border-primary/30 rounded-xl px-8 py-6 backdrop-blur-md relative overflow-hidden group hover:border-primary/50 transition-all duration-300">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Live indicator */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-red-500"
          />
          <span className="text-xs font-orbitron text-red-500 uppercase tracking-wider">
            Live
          </span>
        </div>

        <div className="relative z-10 text-center space-y-2">
          {/* Counter number */}
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-6xl font-orbitron font-bold text-primary"
              >
                ...
              </motion.div>
            ) : (
              <motion.div
                key={count}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="text-6xl font-orbitron font-bold text-primary"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(22,163,224,0.6))'
                }}
              >
                {count.toLocaleString()}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Label */}
          <p className="text-sm uppercase tracking-widest text-muted-foreground font-rajdhani">
            1Tappers Have Already Signed
          </p>
        </div>

        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary/40" />
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-primary/40" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-primary/40" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary/40" />
      </div>
    </motion.div>
  );
};
