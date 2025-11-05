import { useState, useEffect } from "react";
import { ShoppingCart, TrendingUp, TrendingDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const StickyBuyButton = () => {
  const navigate = useNavigate();
  const [price, setPrice] = useState(0.00042);
  const [priceChange, setPriceChange] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Simulate price updates (replace with real API)
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 0.00001;
      setPrice(prev => Math.max(0.00001, prev + change));
      setPriceChange(change);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleBuyClick = () => {
    navigate('/home#swap');
    setTimeout(() => {
      document.getElementById('swap')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-6 z-50"
        >
          <Button
            onClick={handleBuyClick}
            size="lg"
            className="relative overflow-hidden shadow-2xl group h-16 px-6"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))',
              boxShadow: '0 0 40px rgba(var(--primary-rgb), 0.5)',
            }}
          >
            <motion.div
              animate={{
                scale: priceChange !== 0 ? [1, 1.2, 1] : 1,
              }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-white/10"
            />
            <div className="relative flex items-center gap-3">
              <ShoppingCart className="w-6 h-6" />
              <div className="flex flex-col items-start">
                <span className="text-sm font-bold uppercase tracking-wider">Buy $ONETAP</span>
                <div className="flex items-center gap-1 text-xs">
                  <span className="font-mono">${price.toFixed(5)}</span>
                  {priceChange > 0 ? (
                    <TrendingUp className="w-3 h-3 text-green-400" />
                  ) : priceChange < 0 ? (
                    <TrendingDown className="w-3 h-3 text-red-400" />
                  ) : null}
                </div>
              </div>
            </div>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyBuyButton;
