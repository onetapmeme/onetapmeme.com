import { useTranslation } from 'react-i18next';
import { PieChart, Lock, Flame, Users, Copy, ExternalLink, Shield, TrendingDown, Coins } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import TokenDistribution from "@/components/TokenDistribution";
import TokenomicsChart from "@/components/TokenomicsChart";

const Tokenomics = () => {
  const { t } = useTranslation();
  const { ref, isRevealed } = useScrollReveal();

  const contractAddress = "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8";
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
      color: "text-primary"
    },
    {
      icon: TrendingDown,
      title: t('tokenomics.burnMechanism'),
      description: t('tokenomics.burnMechanismText'),
      color: "text-accent"
    },
    {
      icon: Coins,
      title: t('tokenomics.rewards'),
      description: t('tokenomics.rewardsText'),
      color: "text-primary"
    }
  ];

  return (
    <section 
      id="tokenomics" 
      ref={ref}
      className={`py-12 md:py-32 px-4 relative overflow-hidden reveal-on-scroll ${isRevealed ? 'revealed' : ''}`}
    >
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-12 md:mb-16 animate-pixel-fade">
          <Coins className="w-16 h-16 mx-auto mb-6 text-primary icon-float icon-glow" />
          <h2 
            className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6"
            style={{
              background: 'linear-gradient(90deg, hsl(210, 100%, 55%) 0%, hsl(25, 100%, 55%) 16.66%, hsl(210, 100%, 55%) 33.33%, hsl(25, 100%, 55%) 50%, hsl(210, 100%, 55%) 66.66%, hsl(25, 100%, 55%) 83.33%, hsl(210, 100%, 55%) 100%)',
              backgroundSize: '300% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradient-flow 10s linear infinite',
            }}
          >
            {t('tokenomics.title')}
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-3xl mx-auto px-4 leading-relaxed">
            {t('tokenomics.subtitle')}
          </p>
        </div>

        {/* Token Allocation Chart - Above Everything */}
        <div className="mb-12 max-w-3xl mx-auto">
          <TokenomicsChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start max-w-6xl mx-auto mb-12">
          {/* Token Info */}
          <div className="space-y-4 md:space-y-6">
            <Card className="p-6 md:p-8 glass-effect border-2 border-primary/30 hover:border-primary/50 transition-all duration-500 group">
              <div className="flex items-center gap-3 md:gap-4">
                <Lock className="w-6 h-6 md:w-8 md:h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">{t('tokenomics.totalSupply')}</h3>
                  <p className="text-3xl md:text-4xl font-bold text-primary">100,000,000</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 md:p-8 glass-effect border-2 border-primary/30 hover:border-primary/50 transition-all duration-500">
              <div className="mb-4 md:mb-6">
                <h3 className="text-base md:text-lg font-bold text-muted-foreground mb-2">{t('tokenomics.network')}</h3>
                <p className="text-2xl md:text-3xl font-bold text-primary">Base</p>
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold text-muted-foreground mb-2">{t('tokenomics.symbol')}</h3>
                <p className="text-2xl md:text-3xl font-bold text-primary">$1TAP</p>
              </div>
            </Card>

            <Card className="p-6 md:p-8 glass-effect border-2 border-accent/30 hover:border-accent/50 transition-all duration-500">
              <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-foreground flex items-center gap-2">
                <Flame className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                {t('tokenomics.tax')}
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm md:text-base text-muted-foreground">{t('tokenomics.transactionTax')}</span>
                  <span className="text-2xl md:text-3xl font-bold text-accent">3%</span>
                </div>
                <div className="text-xs md:text-sm text-muted-foreground space-y-2 mt-4 pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span>{t('tokenomics.development')}</span>
                    <span className="text-base font-semibold text-foreground">1%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{t('tokenomics.marketing')}</span>
                    <span className="text-base font-semibold text-foreground">1%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{t('tokenomics.liquidity')}</span>
                    <span className="text-base font-semibold text-foreground">1%</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4 md:p-6 glass-effect border-2 border-primary/30 hover:border-primary/50 transition-all duration-500">
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-foreground flex items-center gap-2">
                <Lock className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                Security & Transparency
              </h3>
              <div className="space-y-3 text-xs md:text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <div>
                    <p className="font-semibold text-foreground">LP Locked 6 Months</p>
                    <p className="text-muted-foreground">Liquidity pool secured until May 1, 2026</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <div>
                    <p className="font-semibold text-foreground">Contract Verified</p>
                    <p className="text-muted-foreground">Publicly auditable on BaseScan</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <div>
                    <p className="font-semibold text-foreground">Multi-Sig Wallet</p>
                    <p className="text-muted-foreground">2/3 signatures required for dev/marketing funds</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <div>
                    <p className="font-semibold text-foreground">Timelock Protection</p>
                    <p className="text-muted-foreground">Reserved tokens locked with transparent release schedule</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">✓</span>
                  <div>
                    <p className="font-semibold text-foreground">Renounced Functions</p>
                    <p className="text-muted-foreground">No mint, no blacklist, taxes immutable</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contract Address */}
            <Card className="p-6 md:p-8 glass-effect border-2 border-primary/30 hover:border-primary/50 transition-all duration-500">
              <h3 className="text-base md:text-lg font-bold text-foreground mb-4">{t('tokenomics.contract')}</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 bg-muted/50 px-4 py-3 rounded-lg overflow-hidden">
                  <code className="text-xs md:text-sm text-foreground truncate block">{contractAddress}</code>
                </div>
                <Button
                  onClick={copyContract}
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2 hover:bg-primary/10 transition-all duration-300"
                >
                  <Copy className="w-4 h-4" />
                  {t('tokenomics.copyContract')}
                </Button>
              </div>
              <Button
                asChild
                variant="default"
                size="lg"
                className="w-full mt-4 text-lg py-6 rounded-full transition-all duration-500"
                style={{
                  background: 'linear-gradient(135deg, hsl(210, 100%, 55%), hsl(25, 100%, 55%))',
                  boxShadow: '0 0 30px hsla(210, 100%, 55%, 0.3)',
                }}
              >
                <a 
                  href={dexScreenerUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-center gap-2"
                  onMouseEnter={(e) => {
                    e.currentTarget.parentElement!.style.boxShadow = '0 0 50px hsla(210, 100%, 55%, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.parentElement!.style.boxShadow = '0 0 30px hsla(210, 100%, 55%, 0.3)';
                  }}
                >
                  <ExternalLink className="w-5 h-5" />
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
            <TokenDistribution />

            {/* Advanced Features */}
            <Card className="p-6 md:p-8 glass-effect border-2 border-primary/30 hover:border-primary/50 transition-all duration-500">
              <h3 className="text-lg md:text-xl font-bold mb-6 text-foreground">{t('tokenomics.features')}</h3>
              <div className="space-y-5">
                {advancedFeatures.map((feature, i) => (
                  <div key={i} className="flex gap-4 group hover:translate-x-2 transition-transform duration-300">
                    <feature.icon className={`w-7 h-7 ${feature.color} flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300`} />
                    <div>
                      <h4 className="font-bold text-sm md:text-base text-foreground mb-1.5">{feature.title}</h4>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
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
