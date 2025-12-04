import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Card } from '@/components/ui/card';
import { Shield, Lock, CheckCircle, ExternalLink, FileText, Users, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useTranslation } from 'react-i18next';

const Security = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t } = useTranslation();

  const securityFeatures = [
    {
      icon: Shield,
      title: t('security.features.audit.title'),
      description: t('security.features.audit.description'),
      status: 'pending',
    },
    {
      icon: Lock,
      title: t('security.features.lpLocked.title'),
      description: t('security.features.lpLocked.description'),
      status: 'active',
    },
    {
      icon: CheckCircle,
      title: t('security.features.verified.title'),
      description: t('security.features.verified.description'),
      status: 'active',
    },
    {
      icon: Users,
      title: t('security.features.multiSig.title'),
      description: t('security.features.multiSig.description'),
      status: 'active',
    },
  ];

  const auditDetails = {
    company: t('security.auditReport.company'),
    date: t('security.auditReport.date'),
    scope: t('security.auditReport.scope'),
    findings: {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
    },
    score: t('security.auditReport.scoreTBA'),
  };

  return (
    <div className="min-h-screen bg-background">
      <LanguageSwitcher />
      <Navbar />
      
      <div className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            ref={ref}
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Shield className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-foreground">
              {t('security.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('security.subtitle')}
            </p>
          </motion.div>

          {/* Security Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {securityFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              >
                <Card className="glass-effect p-6 rounded-2xl border-primary/20 hover:border-primary/40 transition-all duration-500">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${
                      feature.status === 'active' 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-accent/10 text-accent'
                    } flex items-center justify-center flex-shrink-0`}>
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground mb-3">
                        {feature.description}
                      </p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        feature.status === 'active'
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-accent/10 text-accent'
                      }`}>
                        {feature.status === 'active' ? t('security.statusActive') : t('security.statusPlanned')}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Audit Report Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Card className="glass-effect p-8 rounded-2xl border-primary/20 mb-16">
              <div className="flex items-center gap-4 mb-8">
                <FileText className="w-10 h-10 text-primary" />
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    {t('security.auditReport.title')}
                  </h2>
                  <p className="text-muted-foreground">
                    {auditDetails.company} • {auditDetails.date}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-bold text-foreground mb-4">{t('security.auditReport.scopeTitle')}</h3>
                  <p className="text-muted-foreground">{auditDetails.scope}</p>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-4">{t('security.auditReport.scoreTitle')}</h3>
                  <p className="text-3xl font-bold text-primary">{auditDetails.score}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-red-500/10 text-center">
                  <p className="text-2xl font-bold text-red-500">
                    {auditDetails.findings.critical}
                  </p>
                  <p className="text-sm text-muted-foreground">{t('security.auditReport.critical')}</p>
                </div>
                <div className="p-4 rounded-xl bg-orange-500/10 text-center">
                  <p className="text-2xl font-bold text-orange-500">
                    {auditDetails.findings.high}
                  </p>
                  <p className="text-sm text-muted-foreground">{t('security.auditReport.high')}</p>
                </div>
                <div className="p-4 rounded-xl bg-yellow-500/10 text-center">
                  <p className="text-2xl font-bold text-yellow-500">
                    {auditDetails.findings.medium}
                  </p>
                  <p className="text-sm text-muted-foreground">{t('security.auditReport.medium')}</p>
                </div>
                <div className="p-4 rounded-xl bg-blue-500/10 text-center">
                  <p className="text-2xl font-bold text-blue-500">
                    {auditDetails.findings.low}
                  </p>
                  <p className="text-sm text-muted-foreground">{t('security.auditReport.low')}</p>
                </div>
              </div>

              <Button
                variant="outline"
                className="gap-2"
                disabled
              >
                <FileText className="w-4 h-4" />
                {t('security.auditReport.downloadButton')}
                <ExternalLink className="w-4 h-4" />
              </Button>
            </Card>
          </motion.div>

          {/* Contract Verification */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <Card className="glass-effect p-8 rounded-2xl border-primary/20 mb-16">
              <h2 className="text-2xl font-bold mb-6 text-foreground">
                {t('security.contractVerification.title')}
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-background/50">
                  <div>
                    <p className="font-semibold text-foreground">{t('security.contractVerification.baseNetwork')}</p>
                    <p className="text-sm text-muted-foreground font-mono">
                      {t('security.contractVerification.comingSoon')}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    <ExternalLink className="w-4 h-4" />
                    {t('security.contractVerification.viewOnBaseScan')}
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-background/50">
                  <div>
                    <p className="font-semibold text-foreground">{t('security.contractVerification.lpLock')}</p>
                    <p className="text-sm text-muted-foreground">
                      {t('security.contractVerification.lpLockDescription')}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    <Lock className="w-4 h-4" />
                    {t('security.contractVerification.viewLockProof')}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Bug Bounty Program */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Card className="glass-effect p-8 rounded-2xl border-accent/20">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-10 h-10 text-accent flex-shrink-0" />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4 text-foreground">
                    {t('security.bugBounty.title')}
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {t('security.bugBounty.description')}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-background/50 text-center">
                      <p className="text-2xl font-bold text-primary mb-1">$500</p>
                      <p className="text-sm text-muted-foreground">{t('security.bugBounty.lowSeverity')}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-background/50 text-center">
                      <p className="text-2xl font-bold text-primary mb-1">$2,500</p>
                      <p className="text-sm text-muted-foreground">{t('security.bugBounty.mediumSeverity')}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-background/50 text-center">
                      <p className="text-2xl font-bold text-primary mb-1">$10,000</p>
                      <p className="text-sm text-muted-foreground">{t('security.bugBounty.criticalSeverity')}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => window.location.href = 'mailto:security@onetapmeme.com'}
                  >
                    <AlertTriangle className="w-4 h-4" />
                    {t('security.bugBounty.reportButton')}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Security;