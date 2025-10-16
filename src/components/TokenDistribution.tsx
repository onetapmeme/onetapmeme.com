import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Users, Droplets, TrendingUp, Shield, Trophy } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TokenDistribution = () => {
  const { t } = useTranslation();

  const distribution = [
    {
      category: 'Community / Circulation',
      percentage: 70,
      amount: '70,000,000',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      notes: 'Open distribution, airdrops, public',
    },
    {
      category: 'Liquidity Pool (Locked)',
      percentage: 10,
      amount: '10,000,000',
      icon: Droplets,
      color: 'from-primary to-accent',
      notes: 'Locked 6 months',
    },
    {
      category: 'Marketing & Partnerships',
      percentage: 8,
      amount: '8,000,000',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500',
      notes: 'Gradual vesting release',
    },
    {
      category: 'Team / Founder',
      percentage: 5,
      amount: '5,000,000',
      icon: Shield,
      color: 'from-yellow-500 to-orange-500',
      notes: 'Transparent wallet proof',
    },
    {
      category: 'Treasury / Rewards / Staking',
      percentage: 7,
      amount: '7,000,000',
      icon: Trophy,
      color: 'from-green-500 to-emerald-500',
      notes: 'Managed for events & bounties',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
          {t('tokenomics.equilibratedLaunch') || 'Equilibrated Launch'}
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t('tokenomics.equilibratedDesc') || 'Balanced distribution designed to support community, liquidity, and long-term growth.'}
        </p>
      </div>

      <div className="space-y-4">
        {distribution.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Card className="glass-effect p-5 border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 group">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-bold text-foreground">{item.category}</h4>
                    <span className="text-2xl font-bold text-primary">{item.percentage}%</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {item.amount} tokens
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${item.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                      />
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground italic mt-2">
                    {item.notes}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* LP Lock Notice */}
      <Card className="glass-effect p-6 border-2 border-primary/30 bg-primary/5">
        <div className="flex items-center gap-3">
          <Droplets className="w-6 h-6 text-primary flex-shrink-0" />
          <div>
            <h4 className="font-bold text-foreground mb-1">
              {t('tokenomics.lpLocked') || 'LP Locked 6 Months'}
            </h4>
            <p className="text-sm text-muted-foreground">
              {t('tokenomics.lpLockedDesc') || 'Liquidity pool secured until'} {new Date(Date.now() + 180*24*60*60*1000).toLocaleDateString()}
            </p>
          </div>
        </div>
      </Card>

      {/* Burn Mechanism Notice */}
      <Card className="glass-effect p-6 border-2 border-accent/30 bg-accent/5">
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6 text-accent flex-shrink-0" />
          <div>
            <h4 className="font-bold text-foreground mb-1">
              {t('tokenomics.burnMechanism') || 'Burn Mechanism Active'}
            </h4>
            <p className="text-sm text-muted-foreground">
              {t('tokenomics.burnMechanismDesc') || 'Deflationary supply through periodic automatic burns'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TokenDistribution;
