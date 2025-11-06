import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Trophy, Medal, Award, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

interface LeaderboardEntry {
  user_id: string;
  xp: number;
  clicks: number;
  current_rank_index: number;
}

const TapLeaderboard = () => {
  const { t } = useTranslation();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();

    // Refresh leaderboard every 30 seconds
    const interval = setInterval(fetchLeaderboard, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('player_progress')
        .select('user_id, xp, clicks, current_rank_index')
        .order('xp', { ascending: false })
        .limit(10);

      if (error) throw error;
      setLeaderboard(data || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (position: number) => {
    switch (position) {
      case 0:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-sm font-bold text-muted-foreground">#{position + 1}</span>;
    }
  };

  const formatUserId = (userId: string) => {
    return `${userId.slice(0, 4)}...${userId.slice(-4)}`;
  };

  if (loading) {
    return (
      <Card className="glass-effect p-6 border-2 border-primary/30">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass-effect p-6 border-2 border-primary/30 hover:border-primary/50 transition-all duration-500">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-bold">{t('leaderboard.title')}</h3>
      </div>

      {leaderboard.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">{t('leaderboard.noData')}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {leaderboard.map((entry, index) => (
            <motion.div
              key={entry.user_id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              {/* Rank Icon */}
              <div className="flex-shrink-0">
                {getRankIcon(index)}
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">
                  {formatUserId(entry.user_id)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {entry.clicks.toLocaleString()} {t('leaderboard.clicks')}
                </p>
              </div>

              {/* XP */}
              <div className="text-right">
                <p className="font-bold text-primary">{entry.xp.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{t('leaderboard.xp')}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-border text-center">
        <p className="text-xs text-muted-foreground">
          {t('leaderboard.updateInfo')}
        </p>
      </div>
    </Card>
  );
};

export default TapLeaderboard;
