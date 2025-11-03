import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Card } from '@/components/ui/card';
import { Shield, Lock, CheckCircle, ExternalLink, FileText, Users, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Security = () => {
  const { ref, isVisible } = useScrollAnimation();

  const securityFeatures = [
    {
      icon: Shield,
      title: 'Smart Contract Audit',
      description: 'Comprehensive security audit by Hacken (planned Q1 2025)',
      status: 'pending',
    },
    {
      icon: Lock,
      title: 'Liquidity Locked',
      description: '85% LP locked for 6 months via Team Finance',
      status: 'active',
    },
    {
      icon: CheckCircle,
      title: 'Verified Contract',
      description: 'Contract verified on BaseScan',
      status: 'active',
    },
    {
      icon: Users,
      title: 'Multi-Sig Wallet',
      description: '3/5 multi-signature for treasury management',
      status: 'active',
    },
  ];

  const auditDetails = {
    company: 'Hacken (Planned)',
    date: 'Q1 2025',
    scope: 'Smart Contract + Frontend Security',
    findings: {
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
    },
    score: 'TBA',
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
              Security & Audit
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your security is our priority. Full transparency on audits, locks, and smart contract verification.
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
                        {feature.status === 'active' ? '✓ Active' : '⏳ Planned'}
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
                    Audit Report
                  </h2>
                  <p className="text-muted-foreground">
                    {auditDetails.company} • {auditDetails.date}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-bold text-foreground mb-4">Audit Scope</h3>
                  <p className="text-muted-foreground">{auditDetails.scope}</p>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-4">Security Score</h3>
                  <p className="text-3xl font-bold text-primary">{auditDetails.score}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 rounded-xl bg-red-500/10 text-center">
                  <p className="text-2xl font-bold text-red-500">
                    {auditDetails.findings.critical}
                  </p>
                  <p className="text-sm text-muted-foreground">Critical</p>
                </div>
                <div className="p-4 rounded-xl bg-orange-500/10 text-center">
                  <p className="text-2xl font-bold text-orange-500">
                    {auditDetails.findings.high}
                  </p>
                  <p className="text-sm text-muted-foreground">High</p>
                </div>
                <div className="p-4 rounded-xl bg-yellow-500/10 text-center">
                  <p className="text-2xl font-bold text-yellow-500">
                    {auditDetails.findings.medium}
                  </p>
                  <p className="text-sm text-muted-foreground">Medium</p>
                </div>
                <div className="p-4 rounded-xl bg-blue-500/10 text-center">
                  <p className="text-2xl font-bold text-blue-500">
                    {auditDetails.findings.low}
                  </p>
                  <p className="text-sm text-muted-foreground">Low</p>
                </div>
              </div>

              <Button
                variant="outline"
                className="gap-2"
                disabled
              >
                <FileText className="w-4 h-4" />
                Download Full Report (Coming Soon)
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
                Contract Verification
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-background/50">
                  <div>
                    <p className="font-semibold text-foreground">Base Network Contract</p>
                    <p className="text-sm text-muted-foreground font-mono">
                      0x...Coming Soon
                    </p>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    <ExternalLink className="w-4 h-4" />
                    View on BaseScan
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 rounded-xl bg-background/50">
                  <div>
                    <p className="font-semibold text-foreground">LP Lock Contract</p>
                    <p className="text-sm text-muted-foreground">
                      6-month lock via Team Finance
                    </p>
                  </div>
                  <Button variant="outline" size="sm" disabled>
                    <Lock className="w-4 h-4" />
                    View Lock Proof
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
                    Bug Bounty Program
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Found a vulnerability? We reward responsible disclosure. Report security issues directly to our team.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="p-4 rounded-xl bg-background/50 text-center">
                      <p className="text-2xl font-bold text-primary mb-1">$500</p>
                      <p className="text-sm text-muted-foreground">Low Severity</p>
                    </div>
                    <div className="p-4 rounded-xl bg-background/50 text-center">
                      <p className="text-2xl font-bold text-primary mb-1">$2,500</p>
                      <p className="text-sm text-muted-foreground">Medium Severity</p>
                    </div>
                    <div className="p-4 rounded-xl bg-background/50 text-center">
                      <p className="text-2xl font-bold text-primary mb-1">$10,000</p>
                      <p className="text-sm text-muted-foreground">Critical</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => window.location.href = 'mailto:security@onetapmeme.com'}
                  >
                    <AlertTriangle className="w-4 h-4" />
                    Report Vulnerability
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