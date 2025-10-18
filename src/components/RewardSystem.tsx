import { motion } from 'framer-motion';
import { Trophy, Sparkles, Gift, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useTranslation } from 'react-i18next';

const RewardSystem = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();

  const rewardTypes = [
    {
      icon: Trophy,
      name: t('rewards.goldDrop'),
      description: t('rewards.goldDropDesc'),
      rarity: 'Legendary',
      color: 'from-yellow-500 to-orange-500',
      glow: 'shadow-[0_0_40px_rgba(234,179,8,0.5)]',
    },
    {
      icon: Sparkles,
      name: t('rewards.memeDrop'),
      description: t('rewards.memeDropDesc'),
      rarity: 'Epic',
      color: 'from-purple-500 to-pink-500',
      glow: 'shadow-[0_0_40px_rgba(168,85,247,0.5)]',
    },
    {
      icon: Gift,
      name: t('rewards.communityDrop'),
      description: t('rewards.communityDropDesc'),
      rarity: 'Rare',
      color: 'from-blue-500 to-cyan-500',
      glow: 'shadow-[0_0_40px_rgba(59,130,246,0.5)]',
    },
    {
      icon: Zap,
      name: t('rewards.eventDrop'),
      description: t('rewards.eventDropDesc'),
      rarity: 'Limited',
      color: 'from-green-500 to-emerald-500',
      glow: 'shadow-[0_0_40px_rgba(34,197,94,0.5)]',
    },
  ];

  return (
    <section
      id="rewards"
      ref={ref}
      className="py-20 md:py-32 px-4 relative overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Trophy className="w-16 h-16 mx-auto mb-6 text-primary" style={{ filter: 'drop-shadow(0 0 30px currentColor)' }} />
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            {t('rewards.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('rewards.subtitle')}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Currently in Development</span>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {rewardTypes.map((reward, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
            >
              <Card className={`glass-effect p-8 rounded-3xl border-2 border-primary/20 hover:border-primary/40 transition-all duration-500 group h-full ${reward.glow} hover:scale-105`}>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${reward.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <reward.icon className="w-8 h-8 text-white" />
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-2xl font-bold text-foreground">{reward.name}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${reward.color} text-white`}>
                    {reward.rarity}
                  </span>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {reward.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Development Notice */}
        <motion.div
          className="mt-12 p-6 glass-effect rounded-2xl border border-primary/20 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <Sparkles className="w-8 h-8 mx-auto mb-4 text-accent animate-pulse" />
          <p className="text-muted-foreground">
            <strong className="text-foreground">{t('rewards.devNotice')}</strong><br />
            {t('rewards.devNoticeDesc')}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default RewardSystem;
