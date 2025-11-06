import { useTranslation } from 'react-i18next';
import { Copy, ExternalLink, Lock, Shield, FileText, TrendingUp, Code, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import LPLockProof from "@/components/LPLockProof";
import AuditBadge from "@/components/AuditBadge";

const Token = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { ref, isRevealed } = useScrollReveal();

  const contractAddress = "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8";
  
  const links = [
    {
      icon: Code,
      title: t('token.contract'),
      description: t('token.contractDesc'),
      href: `https://basescan.org/address/${contractAddress}`,
      color: "text-primary"
    },
    {
      icon: TrendingUp,
      title: t('token.buy'),
      description: t('token.buyDesc'),
      href: "https://app.uniswap.org/#/swap?outputCurrency=" + contractAddress,
      color: "text-accent"
    },
    {
      icon: Activity,
      title: t('token.chart'),
      description: t('token.chartDesc'),
      href: "https://dexscreener.com/base/" + contractAddress,
      color: "text-primary"
    },
    {
      icon: Lock,
      title: t('token.lpLock'),
      description: t('token.lpLockDesc'),
      href: "https://www.team.finance/view-coin/" + contractAddress + "?name=ONETAP&symbol=ONETAP",
      color: "text-accent"
    },
    {
      icon: Shield,
      title: t('token.audit'),
      description: t('token.auditDesc'),
      href: "/legal-notice#audit",
      color: "text-primary"
    }
  ];

  const copyContract = () => {
    navigator.clipboard.writeText(contractAddress);
    toast.success(t('tokenomics.contractCopied'));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Button
          onClick={() => navigate('/home')}
          variant="outline"
          className="mb-8"
        >
          ← {t('common.backToHome')}
        </Button>
      </div>

      <section 
        ref={ref}
        className={`py-20 px-4 reveal-on-scroll ${isRevealed ? 'revealed' : ''}`}
      >
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <Code className="w-20 h-20 mx-auto mb-6 text-primary icon-float icon-glow" />
            <h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              style={{
                background: 'linear-gradient(90deg, hsl(210, 100%, 55%) 0%, hsl(25, 100%, 55%) 50%, hsl(210, 100%, 55%) 100%)',
                backgroundSize: '200% 100%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                animation: 'gradient-flow 5s linear infinite',
              }}
            >
              {t('token.title')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('token.subtitle')}
            </p>
          </div>

          {/* Contract Address */}
          <Card className="p-8 glass-effect border-2 border-primary/30 hover:border-primary/50 transition-all duration-500 mb-8">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Code className="w-5 h-5 text-primary" />
              {t('token.contractAddress')}
            </h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 bg-muted/50 px-4 py-3 rounded-lg overflow-hidden">
                <code className="text-sm text-foreground break-all">{contractAddress}</code>
              </div>
              <Button
                onClick={copyContract}
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                {t('tokenomics.copyContract')}
              </Button>
            </div>
          </Card>

          {/* LP Lock Proof */}
          <LPLockProof className="mb-8" />

          {/* Audit Badge */}
          <AuditBadge variant="card" className="mb-8" />

          {/* Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {links.map((link, index) => (
              <Card 
                key={index}
                className="p-6 glass-effect border-2 border-primary/30 hover:border-primary/50 transition-all duration-500 group"
              >
                <a
                  href={link.href}
                  target={link.href.startsWith('http') ? "_blank" : undefined}
                  rel={link.href.startsWith('http') ? "noopener noreferrer" : undefined}
                  className="block"
                >
                  <div className="flex items-start gap-4">
                    <link.icon className={`w-8 h-8 ${link.color} flex-shrink-0 group-hover:scale-110 transition-transform duration-300`} />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                        {link.title}
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {link.description}
                      </p>
                    </div>
                  </div>
                </a>
              </Card>
            ))}
          </div>

          {/* Security Notice */}
          <Card className="mt-8 p-6 bg-muted/30 border border-border">
            <div className="flex items-start gap-3">
              <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-foreground mb-2">{t('token.securityNotice')}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t('token.securityNoticeText')}
                </p>
              </div>
            </div>
          </Card>

          {/* Disclaimer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-muted-foreground/80 italic max-w-2xl mx-auto">
              {t('token.disclaimer')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Token;
