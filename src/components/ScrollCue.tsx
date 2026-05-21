import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

/**
 * Subtle scroll invitation at the bottom of the hero.
 */
const ScrollCue = ({ targetId = "about" }: { targetId?: string }) => {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={handleClick}
      aria-label="Faire défiler"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/70 hover:text-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-full p-2"
    >
      <span className="text-[10px] uppercase tracking-[0.25em] font-medium">
        Scroll
      </span>
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
      >
        <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
      </motion.div>
    </motion.button>
  );
};

export default ScrollCue;
