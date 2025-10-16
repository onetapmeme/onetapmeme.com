import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, Zap, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface Player {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  csgoRank: string;
  change: number;
}

const LeaderboardV7 = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [timeFilter, setTimeFilter] = useState<'24h' | '7d' | 'all'>('24h');

  // Mock data - remplacer par vraies données
  const topPlayers: Player[] = [
    { rank: 1, name: 'ShadowTapper', avatar: '🎯', xp: 1250000, csgoRank: 'Global Elite', change: 2 },
    { rank: 2, name: 'OneTapKing', avatar: '👑', xp: 1180000, csgoRank: 'Supreme', change: -1 },
    { rank: 3, name: 'ClickMaster', avatar: '⚡', xp: 1050000, csgoRank: 'LEM', change: 1 },
    { rank: 4, name: 'TapWizard', avatar: '🔥', xp: 980000, csgoRank: 'DMG', change: 0 },
    { rank: 5, name: 'FastFingers', avatar: '💎', xp: 890000, csgoRank: 'MGE', change: 3 },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Medal className="w-6 h-6 text-orange-400" />;
      default:
        return <Trophy className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
      case 2:
        return 'from-gray-400/20 to-gray-500/20 border-gray-400/30';
      case 3:
        return 'from-orange-400/20 to-orange-500/20 border-orange-400/30';
      default:
        return 'from-card to-background border-border/50';
    }
  };

  return (
    <section
      id="leaderboard"
      ref={ref}
      className="py-20 md:py-32 px-4 relative overflow-hidden"
    >
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Trophy className="w-16 h-16 mx-auto mb-6 text-primary animate-glow" />
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Global Leaderboard
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Compete with tappers worldwide and climb to the top
          </p>
        </motion.div>

        {/* Time Filter */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs value={timeFilter} onValueChange={(v) => setTimeFilter(v as any)} className="w-auto">
            <TabsList className="bg-card/50">
              <TabsTrigger value="24h">24h</TabsTrigger>
              <TabsTrigger value="7d">7 Days</TabsTrigger>
              <TabsTrigger value="all">All Time</TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Leaderboard List */}
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {topPlayers.map((player, i) => (
            <motion.div
              key={player.rank}
              initial={{ opacity: 0, x: -40 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
            >
              <Card
                className={`p-4 md:p-6 glass-effect-v7 bg-gradient-to-r ${getRankColor(
                  player.rank
                )} hover-lift group`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-card/50">
                    {getRankIcon(player.rank)}
                  </div>

                  {/* Avatar */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent text-2xl">
                    {player.avatar}
                  </div>

                  {/* Player Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-bold text-foreground">{player.name}</h3>
                      {player.change !== 0 && (
                        <div
                          className={`flex items-center gap-1 text-xs font-medium ${
                            player.change > 0 ? 'text-green-400' : 'text-red-400'
                          }`}
                        >
                          <TrendingUp
                            className={`w-3 h-3 ${player.change < 0 ? 'rotate-180' : ''}`}
                          />
                          {Math.abs(player.change)}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{player.csgoRank}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <div className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-primary" />
                        <span className="text-sm font-medium text-foreground">
                          {player.xp.toLocaleString()} XP
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <Button
                    size="sm"
                    variant="outline"
                    className="hidden md:flex border-border/50 hover:border-primary/50"
                  >
                    View Profile
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <Button variant="outline" size="lg" className="border-border/50 hover:border-primary/50">
            Load More
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default LeaderboardV7;
