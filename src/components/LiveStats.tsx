import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Droplets, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useTranslation } from 'react-i18next';

const LiveStats = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();
  const [stats, setStats] = useState({
    marketCap: 'TBA',
    holders: 'Growing',
    liquidity: 'Locked 6mo',
    volume24h: 'Coming Soon',
  });

  // TradingView widget setup
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          autosize: true,
          symbol: "BASE:ONETAP",
          interval: "D",
          timezone: "Etc/UTC",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          container_id: "tradingview_chart",
          hide_top_toolbar: false,
          hide_legend: false,
          save_image: false,
        });
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Placeholder for future API integration
  useEffect(() => {
    const updateStats = () => {
      // TODO: Integrate with DexScreener or Base API
      // For now, using placeholders
      setStats({
        marketCap: 'TBA',
        holders: 'Growing',
        liquidity: 'Locked 6mo',
        volume24h: 'Coming Soon',
      });
    };

    updateStats();
    const interval = setInterval(updateStats, 30000); // Update every 30s

    return () => clearInterval(interval);
  }, []);

  const statsData = [
    {
      icon: TrendingUp,
      label: t('liveStats.marketCap') || 'Market Cap',
      value: stats.marketCap,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: Users,
      label: t('liveStats.holders') || 'Holders',
      value: stats.holders,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      icon: Droplets,
      label: t('liveStats.liquidity') || 'Liquidity',
      value: stats.liquidity,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      icon: Activity,
      label: t('liveStats.volume24h') || '24h Volume',
      value: stats.volume24h,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
  ];

  return (
    <section
      id="live-stats"
      ref={ref}
      className="py-10 md:py-24 px-4 relative overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Activity className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-primary animate-pulse" />
          <h2 
            className="text-3xl md:text-5xl font-bold mb-4"
            style={{
              background: 'linear-gradient(90deg, hsl(210, 100%, 55%) 0%, hsl(25, 100%, 55%) 16.66%, hsl(210, 100%, 55%) 33.33%, hsl(25, 100%, 55%) 50%, hsl(210, 100%, 55%) 66.66%, hsl(25, 100%, 55%) 83.33%, hsl(210, 100%, 55%) 100%)',
              backgroundSize: '300% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradient-flow 10s linear infinite',
            }}
          >
            {t('liveStats.title') || '$1TAP LIVE STATS'}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('liveStats.subtitle') || 'Real-time market data • Updates every 30s'}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {statsData.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
            >
              <Card className="glass-effect p-6 rounded-2xl border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-500 group">
                <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                  {stat.label}
                </p>
                <motion.p
                  className="text-2xl md:text-3xl font-bold text-foreground"
                  key={stat.value}
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {stat.value}
                </motion.p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* TradingView Chart */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Card className="glass-effect p-6 rounded-2xl border-primary/20">
            <h3 className="text-xl font-bold mb-4 text-center">
              {t('liveStats.priceChart') || 'Live Price Chart'}
            </h3>
            <div id="tradingview_chart" style={{ height: '500px' }}></div>
          </Card>
        </motion.div>

        {/* Coming Soon Notice */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p className="text-sm text-muted-foreground italic">
            {t('liveStats.notice') || '📊 Live data integration coming soon after token launch'}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveStats;
