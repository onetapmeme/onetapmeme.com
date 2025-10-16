import { motion } from 'framer-motion';
import { Target, Clock, Gift, Sparkles, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Challenge {
  id: string;
  icon: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  reward: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  completed: boolean;
}

const DailyChallengesV7 = () => {
  const { ref, isVisible } = useScrollAnimation();

  const challenges: Challenge[] = [
    {
      id: '1',
      icon: '🎯',
      title: 'Headshot Spree',
      description: 'Tap 100 times in under 30 seconds',
      progress: 45,
      total: 100,
      reward: '+500 XP',
      rarity: 'Rare',
      completed: false,
    },
    {
      id: '2',
      icon: '⚡',
      title: 'Speed Demon',
      description: 'Achieve 50 taps in 10 seconds',
      progress: 50,
      total: 50,
      reward: '+1000 XP',
      rarity: 'Epic',
      completed: true,
    },
    {
      id: '3',
      icon: '🔥',
      title: 'Combo Master',
      description: 'Maintain a 50x combo without breaking',
      progress: 28,
      total: 50,
      reward: 'Legendary Drop',
      rarity: 'Legendary',
      completed: false,
    },
    {
      id: '4',
      icon: '💎',
      title: 'Daily Grind',
      description: 'Complete 5 tap sessions today',
      progress: 3,
      total: 5,
      reward: '+250 XP',
      rarity: 'Common',
      completed: false,
    },
  ];

  const getRarityColor = (rarity: Challenge['rarity']) => {
    switch (rarity) {
      case 'Common':
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
      case 'Rare':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Epic':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Legendary':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    }
  };

  return (
    <section
      ref={ref}
      className="py-16 px-4 relative overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Target className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h3 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
            Daily Challenges
          </h3>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Resets in 18h 24m</span>
          </div>
        </motion.div>

        {/* Challenges Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {challenges.map((challenge, i) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            >
              <Card
                className={`p-5 glass-effect-v7 border-border/50 hover-lift relative overflow-hidden ${
                  challenge.completed ? 'opacity-75' : ''
                }`}
              >
                {challenge.completed && (
                  <div className="absolute top-3 right-3">
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  </div>
                )}

                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-2xl flex-shrink-0">
                    {challenge.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-lg font-bold text-foreground">{challenge.title}</h4>
                        <Badge className={`text-xs ${getRarityColor(challenge.rarity)}`}>
                          {challenge.rarity}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                    </div>

                    {/* Progress */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {challenge.progress} / {challenge.total}
                        </span>
                        <span className="font-medium text-foreground">
                          {Math.round((challenge.progress / challenge.total) * 100)}%
                        </span>
                      </div>
                      <Progress
                        value={(challenge.progress / challenge.total) * 100}
                        className="h-2"
                      />
                    </div>

                    {/* Reward */}
                    <div className="flex items-center gap-2 pt-2">
                      <Gift className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">{challenge.reward}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Info notice */}
        <motion.div
          className="mt-8 p-4 glass-effect-v7 rounded-xl border border-primary/20 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Complete challenges to earn bonus XP and unlock exclusive drops. New challenges available daily!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DailyChallengesV7;
