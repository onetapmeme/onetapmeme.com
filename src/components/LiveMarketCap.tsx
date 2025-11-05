import { useState, useEffect } from "react";
import { TrendingUp, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

const LiveMarketCap = () => {
  const [marketCap, setMarketCap] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMarketCap = async () => {
      try {
        // DexScreener API for Base network
        const response = await fetch(
          'https://api.dexscreener.com/latest/dex/tokens/0xYourTokenAddressHere'
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.pairs && data.pairs[0]) {
            const mcap = data.pairs[0].marketCap;
            setMarketCap(mcap);
          }
        }
      } catch (error) {
        console.error('Error fetching market cap:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketCap();
    const interval = setInterval(fetchMarketCap, 60000); // Update every 60s

    return () => clearInterval(interval);
  }, []);

  const formatMarketCap = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`;
    }
    return `$${value.toFixed(0)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/30 shadow-glow-primary"
    >
      <DollarSign className="w-5 h-5 text-primary animate-pulse" />
      <div className="flex flex-col items-start">
        <span className="text-xs text-muted-foreground uppercase tracking-wide">Market Cap</span>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">
            {isLoading ? "Loading..." : marketCap ? formatMarketCap(marketCap) : "TBA"}
          </span>
          {marketCap && <TrendingUp className="w-4 h-4 text-green-500" />}
        </div>
      </div>
    </motion.div>
  );
};

export default LiveMarketCap;
