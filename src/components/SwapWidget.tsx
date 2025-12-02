import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Repeat, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const SwapWidget = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load 1inch widget script
    const script = document.createElement('script');
    script.src = 'https://widget.1inch.io/v1.0/widget.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.OneInchWidget && widgetRef.current) {
        window.OneInchWidget.render(widgetRef.current, {
          tokenAddress: '0x...', // TODO: Replace with actual $1TAP contract address
          colorScheme: 'dark',
          chainId: 8453, // Base Network
          theme: 'dark',
          width: '100%',
          height: '600px',
        });
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <section ref={ref} className="py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Repeat className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-6 text-primary animate-pulse" />
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
            {t('swap.title')}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t('swap.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Swap Widget */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="glass-effect p-6 rounded-2xl border-primary/20">
              <div ref={widgetRef} className="min-h-[600px] flex items-center justify-center">
                {/* Placeholder until widget loads */}
                <div className="text-center">
                  <Repeat className="w-16 h-16 mx-auto mb-4 text-primary animate-spin" />
                  <p className="text-muted-foreground">{t('swap.loading')}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {t('swap.contractNotice')}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Info Sidebar */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="glass-effect p-6 rounded-2xl border-primary/20">
              <h3 className="text-xl font-bold mb-4 text-foreground">
                {t('swap.howToBuy')}
              </h3>
              <ol className="space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </span>
                  <span>{t('swap.step1')}</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </span>
                  <span>{t('swap.step2')}</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </span>
                  <span>{t('swap.step3')}</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 font-bold">
                    4
                  </span>
                  <span>{t('swap.step4')}</span>
                </li>
              </ol>
            </Card>

            <Card className="glass-effect p-6 rounded-2xl border-primary/20">
              <h3 className="text-xl font-bold mb-4 text-foreground">
                {t('swap.tradingStats')}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{t('swap.slippage')}</span>
                  <span className="text-sm font-semibold text-foreground">0.5%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{t('swap.network')}</span>
                  <span className="text-sm font-semibold text-foreground">Base</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{t('swap.gasFee')}</span>
                  <span className="text-sm font-semibold text-foreground">~$0.01</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">{t('swap.tax')}</span>
                  <span className="text-sm font-semibold text-green-500">0% / 0%</span>
                </div>
              </div>
            </Card>

            <Card className="glass-effect p-6 rounded-2xl border-accent/20 bg-accent/5">
              <h3 className="text-lg font-bold mb-2 text-foreground">
                {t('swap.tradeOnUniswap')}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {t('swap.uniswapDesc')}
              </p>
              <a
                href="https://app.uniswap.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-semibold"
              >
                {t('swap.openUniswap')}
                <ExternalLink className="w-4 h-4" />
              </a>
            </Card>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-xs text-muted-foreground italic">
            ⚠️ {t('swap.disclaimer')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Type declaration for 1inch widget
declare global {
  interface Window {
    OneInchWidget?: any;
  }
}

export default SwapWidget;