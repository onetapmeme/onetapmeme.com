import { useTranslation } from 'react-i18next';
import { PieChart, Lock, Flame, Users, Copy, ExternalLink, Shield, TrendingDown, Coins } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const Tokenomics = () => {
  const { t } = useTranslation();

  const distribution = [
    { label: t('tokenomics.fairLaunch'), percentage: 100, icon: Users, color: "text-primary" },
  ];

  const contractAddress = "0x0000000000000000000000000000000000000000";
  const dexScreenerUrl = "https://dexscreener.com/base/onetap";

  const copyContract = () => {
    navigator.clipboard.writeText(contractAddress);
    toast.success(t('tokenomics.contractCopied'));
  };

  const advancedFeatures = [
    {
      icon: Shield,
      title: t('tokenomics.antiWhale'),
      description: t('tokenomics.antiWhaleText'),
      color: "text-green-500"
    },
    {
      icon: TrendingDown,
      title: t('tokenomics.burnMechanism'),
      description: t('tokenomics.burnMechanismText'),
      color: "text-orange-500"
    },
    {
      icon: Coins,
      title: t('tokenomics.rewards'),
      description: t('tokenomics.rewardsText'),
      color: "text-yellow-500"
    }
  ];

  return (
    <section id="tokenomics" className="py-20 md:py-32 px-4 bg-gradient-to-br from-card/50 via-secondary/5 to-card/50 section-slide-up">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16 animate-pixel-fade">
          <Coins className="w-16 h-16 mx-auto mb-6 text-secondary icon-float icon-glow" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-gold bg-clip-text text-transparent">
            {t('tokenomics.title')}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto px-4">
            {t('tokenomics.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start max-w-6xl mx-auto mb-12">
          {/* Token Info */}
          <div className="space-y-4 md:space-y-6">
            <Card className="p-4 md:p-6 bg-card border-2 border-primary/30">
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
                <Lock className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground">{t('tokenomics.totalSupply')}</h3>
                  <p className="text-2xl md:text-3xl font-bold text-primary">100,000,000</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 md:p-6 bg-card border-2 border-primary/30">
              <div className="mb-3 md:mb-4">
                <h3 className="text-base md:text-lg font-bold text-foreground mb-2">{t('tokenomics.network')}</h3>
                <p className="text-xl md:text-2xl font-bold text-primary">Base</p>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-foreground mb-2">{t('tokenomics.symbol')}</h3>
                <p className="text-xl md:text-2xl font-bold text-primary">$ONETAP</p>
              </div>
            </Card>

            <Card className="p-4 md:p-6 bg-card border-2 border-secondary/30">
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-foreground flex items-center gap-2">
                <Flame className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
                {t('tokenomics.tax')}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm md:text-base text-muted-foreground">{t('tokenomics.transactionTax')}</span>
                  <span className="text-lg md:text-xl font-bold text-secondary">3%</span>
                </div>
                <div className="text-xs md:text-sm text-muted-foreground space-y-1 mt-3 pt-3 border-t border-border">
                  <div className="flex justify-between">
                    <span>{t('tokenomics.development')}</span>
                    <span>1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('tokenomics.marketing')}</span>
                    <span>1%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('tokenomics.liquidity')}</span>
                    <span>1%</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contract Address */}
            <Card className="p-4 md:p-6 bg-card border-2 border-primary/30">
              <h3 className="text-base md:text-lg font-bold text-foreground mb-3">{t('tokenomics.contract')}</h3>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 bg-muted/50 px-3 py-2 rounded-lg overflow-hidden">
                  <code className="text-xs md:text-sm text-foreground truncate block">{contractAddress}</code>
                </div>
                <Button
                  onClick={copyContract}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Copy className="w-4 h-4" />
                  {t('tokenomics.copyContract')}
                </Button>
              </div>
              <Button
                asChild
                variant="default"
                className="w-full mt-3 bg-gradient-accent"
              >
                <a href={dexScreenerUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                  <ExternalLink className="w-4 h-4" />
                  {t('tokenomics.chart')}
                </a>
              </Button>
            </Card>

            <div className="p-3 md:p-4 bg-muted/30 border border-border rounded-lg">
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                <Lock className="w-3 h-3 md:w-4 md:h-4 inline mr-2" />
                {t('tokenomics.note')}
              </p>
            </div>
          </div>

          {/* Distribution */}
          <div className="space-y-4 md:space-y-6">
            {distribution.map((item, i) => (
              <Card
                key={i}
                className="p-4 md:p-6 bg-card border-2 border-primary/20 hover:border-primary transition-all duration-300 animate-pixel-fade"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-2 md:mb-3">
                  <div className="flex items-center gap-2 md:gap-3">
                    <item.icon className={`w-6 h-6 md:w-8 md:h-8 ${item.color}`} />
                    <span className="text-base md:text-lg font-bold text-foreground">{item.label}</span>
                  </div>
                  <span className="text-xl md:text-2xl font-bold text-primary">{item.percentage}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 md:h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-accent rounded-full transition-all duration-1000"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </Card>
            ))}

            {/* Advanced Features */}
            <Card className="p-5 md:p-6 bg-card/50 backdrop-blur-sm border-2 border-primary/30">
              <h3 className="text-lg md:text-xl font-bold mb-4 text-foreground">{t('tokenomics.features')}</h3>
              <div className="space-y-4">
                {advancedFeatures.map((feature, i) => (
                  <div key={i} className="flex gap-3">
                    <feature.icon className={`w-6 h-6 ${feature.color} flex-shrink-0 mt-0.5`} />
                    <div>
                      <h4 className="font-bold text-sm md:text-base text-foreground mb-1">{feature.title}</h4>
                      <p className="text-xs md:text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
