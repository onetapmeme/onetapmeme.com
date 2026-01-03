import { useState, useEffect } from "react";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getLaunchConfig } from "@/config/launch";

interface TokenData {
  marketCap: number | null;
  priceUsd: string | null;
  priceChange24h: number | null;
  volume24h: number | null;
  liquidity: number | null;
  holders: number | null;
}

const LiveMarketCap = () => {
  const [tokenData, setTokenData] = useState<TokenData>({
    marketCap: null,
    priceUsd: null,
    priceChange24h: null,
    volume24h: null,
    liquidity: null,
    holders: null,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isLaunched, setIsLaunched] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const config = await getLaunchConfig();
      setIsLaunched(config.isLaunched);

      if (!config.isLaunched) {
        setIsLoading(false);
        return;
      }

      try {
        // DexScreener API for Base network
        const response = await fetch(
          `https://api.dexscreener.com/latest/dex/tokens/${config.contractAddress}`
        );

        if (response.ok) {
          const data = await response.json();
          if (data.pairs && data.pairs[0]) {
            const pair = data.pairs[0];
            setTokenData({
              marketCap: pair.marketCap || pair.fdv || null,
              priceUsd: pair.priceUsd || null,
              priceChange24h: pair.priceChange?.h24 || null,
              volume24h: pair.volume?.h24 || null,
              liquidity: pair.liquidity?.usd || null,
              holders: null, // DexScreener doesn't provide holders
            });
            setLastUpdate(new Date());
          }
        }
      } catch (error) {
        console.error("Error fetching market data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30s

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (value: number, decimals = 2) => {
    if (value >= 1000000000) {
      return `$${(value / 1000000000).toFixed(decimals)}B`;
    }
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(decimals)}M`;
    }
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(decimals)}K`;
    }
    return `$${value.toFixed(decimals)}`;
  };

  // Pre-launch state
  if (!isLaunched) {
    return (
      <div className="w-full py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect rounded-2xl p-6 border border-primary/30"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Activity className="w-6 h-6 text-primary animate-pulse" />
              <h3 className="text-xl font-bold">Live Stats Coming Soon</h3>
            </div>
            <p className="text-center text-muted-foreground">
              Real-time market data will be available after launch
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  const stats = [
    {
      icon: DollarSign,
      label: "Market Cap",
      value: tokenData.marketCap ? formatNumber(tokenData.marketCap) : "---",
      color: "text-green-400",
    },
    {
      icon: TrendingUp,
      label: "24h Change",
      value: tokenData.priceChange24h
        ? `${tokenData.priceChange24h > 0 ? "+" : ""}${tokenData.priceChange24h.toFixed(2)}%`
        : "---",
      color:
        tokenData.priceChange24h && tokenData.priceChange24h > 0
          ? "text-green-400"
          : "text-red-400",
    },
    {
      icon: Activity,
      label: "24h Volume",
      value: tokenData.volume24h ? formatNumber(tokenData.volume24h) : "---",
      color: "text-blue-400",
    },
    {
      icon: Users,
      label: "Liquidity",
      value: tokenData.liquidity ? formatNumber(tokenData.liquidity) : "---",
      color: "text-purple-400",
    },
  ];

  return (
    <div className="w-full py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-2xl p-6 border border-primary/30 overflow-hidden relative"
        >
          {/* Live indicator */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-xs text-muted-foreground">LIVE</span>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold">Live Market Data</h3>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-4 bg-muted rounded w-20 mb-2"></div>
                  <div className="h-8 bg-muted rounded w-24"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <AnimatePresence mode="wait">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-background/50 rounded-xl p-4 border border-border/50"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                      <span className="text-sm text-muted-foreground">
                        {stat.label}
                      </span>
                    </div>
                    <motion.p
                      key={stat.value}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-xl md:text-2xl font-bold ${stat.color}`}
                    >
                      {stat.value}
                    </motion.p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Price display */}
          {tokenData.priceUsd && (
            <div className="mt-6 pt-4 border-t border-border/30 flex items-center justify-between">
              <span className="text-muted-foreground">Current Price</span>
              <span className="text-2xl font-bold text-primary">
                ${parseFloat(tokenData.priceUsd).toFixed(8)}
              </span>
            </div>
          )}

          {/* Last update time */}
          {lastUpdate && (
            <div className="mt-4 text-center text-xs text-muted-foreground">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default LiveMarketCap;
