import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LeaderboardEntry {
  user_id: string;
  xp: number;
  clicks: number;
  current_rank_index: number;
  rank_name?: string;
  rank_icon?: string;
  rank_color?: string;
}

const Leaderboard = () => {
  const { t } = useTranslation();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data: progressData, error: progressError } = await supabase
        .from('player_progress')
        .select('user_id, xp, clicks, current_rank_index')
        .order('xp', { ascending: false })
        .limit(100);

      if (progressError) throw progressError;

      const { data: ranksData, error: ranksError } = await supabase
        .from('ranks')
        .select('rank_index, name, icon, color');

      if (ranksError) throw ranksError;

      const ranksMap = new Map(ranksData?.map(r => [r.rank_index, r]) || []);

      const enrichedData = progressData?.map(entry => {
        const rank = ranksMap.get(entry.current_rank_index);
        return {
          ...entry,
          rank_name: rank?.name,
          rank_icon: rank?.icon,
          rank_color: rank?.color,
        };
      }) || [];

      setLeaderboard(enrichedData);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMedalIcon = (position: number) => {
    if (position === 0) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (position === 1) return <Medal className="w-6 h-6 text-gray-400" />;
    if (position === 2) return <Award className="w-6 h-6 text-amber-700" />;
    return <span className="text-lg font-bold text-muted-foreground">#{position + 1}</span>;
  };

  return (
    <div className="min-h-screen bg-background">
      <LanguageSwitcher />
      <Navbar />
      
      <div className="pt-20 md:pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
              🏆 Leaderboard
            </h1>
            <p className="text-muted-foreground text-lg">
              Top players ranked by XP
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-4">
              {leaderboard.map((entry, index) => (
                <Card key={entry.user_id} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 flex justify-center">
                      {getMedalIcon(index)}
                    </div>
                    
                    <Avatar className="w-12 h-12 border-2" style={{ borderColor: entry.rank_color }}>
                      <div className="w-full h-full flex items-center justify-center text-2xl bg-gradient-to-br from-primary/20 to-primary-glow/20">
                        {entry.rank_icon || '🎯'}
                      </div>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold truncate">Player {entry.user_id.slice(0, 8)}</span>
                        {entry.rank_name && (
                          <Badge variant="secondary" style={{ backgroundColor: entry.rank_color + '20', color: entry.rank_color }}>
                            {entry.rank_icon} {entry.rank_name}
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {entry.clicks.toLocaleString()} clicks
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {entry.xp.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">XP</div>
                    </div>
                  </div>
                </Card>
              ))}

              {leaderboard.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No players yet. Be the first to start playing!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Leaderboard;
