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

  return null;
};

export default LiveMarketCap;
