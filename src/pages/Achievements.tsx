import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Lock, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xp_reward: number;
  rarity: string;
  category: string;
  requirement_type: string;
  requirement_value: number;
  unlocked?: boolean;
  unlocked_at?: string;
  progress?: number;
}

const Achievements = () => {
  const { t } = useTranslation();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      fetchAchievements(user.id);
    } else {
      fetchAchievements(null);
    }
  };

  const fetchAchievements = async (userId: string | null) => {
    try {
      const { data: achievementsData, error: achievementsError } = await supabase
        .from('achievements')
        .select('*')
        .order('requirement_value', { ascending: true });

      if (achievementsError) throw achievementsError;

      if (userId) {
        const { data: userAchievements } = await supabase
          .from('user_achievements')
          .select('achievement_id, unlocked_at')
          .eq('user_id', userId);

        const { data: progress } = await supabase
          .from('player_progress')
          .select('xp, clicks')
          .eq('user_id', userId)
          .single();

        const unlockedMap = new Map(userAchievements?.map(ua => [ua.achievement_id, ua.unlocked_at]) || []);

        const enriched = achievementsData?.map(ach => {
          const unlocked = unlockedMap.has(ach.id);
          let currentProgress = 0;
          
          if (progress) {
            if (ach.requirement_type === 'clicks') {
              currentProgress = Math.min(100, (progress.clicks / ach.requirement_value) * 100);
            } else if (ach.requirement_type === 'xp') {
              currentProgress = Math.min(100, (progress.xp / ach.requirement_value) * 100);
            }
          }

          return {
            ...ach,
            unlocked,
            unlocked_at: unlockedMap.get(ach.id),
            progress: unlocked ? 100 : currentProgress,
          };
        }) || [];

        setAchievements(enriched);
      } else {
        setAchievements(achievementsData || []);
      }
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRarityColor = (rarity: string) => {
    const colors = {
      common: 'bg-gray-500/20 text-gray-300',
      uncommon: 'bg-green-500/20 text-green-400',
      rare: 'bg-blue-500/20 text-blue-400',
      epic: 'bg-purple-500/20 text-purple-400',
      legendary: 'bg-orange-500/20 text-orange-400',
    };
    return colors[rarity as keyof typeof colors] || colors.common;
  };

  return (
    <div className="min-h-screen bg-background">
      <LanguageSwitcher />
      <Navbar />
      
      <div className="pt-20 md:pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
              🏅 Achievements
            </h1>
            <p className="text-muted-foreground text-lg">
              Unlock achievements to earn bonus XP
            </p>
          </div>

          {!user && (
            <div className="max-w-2xl mx-auto mb-8 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-center">
              <p className="text-yellow-400">
                🔒 Sign in to track your achievement progress
              </p>
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {achievements.map((achievement) => (
                <Card 
                  key={achievement.id} 
                  className={`p-6 transition-all ${
                    achievement.unlocked 
                      ? 'hover:shadow-lg hover:scale-105' 
                      : 'opacity-60 grayscale'
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="text-4xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-lg">{achievement.name}</h3>
                        {achievement.unlocked && (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        )}
                        {!achievement.unlocked && !user && (
                          <Lock className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <Badge className={getRarityColor(achievement.rarity)}>
                        {achievement.rarity}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {achievement.description}
                  </p>

                  {user && !achievement.unlocked && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>{Math.round(achievement.progress || 0)}%</span>
                      </div>
                      <Progress value={achievement.progress || 0} className="h-2" />
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Requirement: {achievement.requirement_value.toLocaleString()} {achievement.requirement_type}
                    </span>
                    <Badge variant="outline" className="text-primary">
                      +{achievement.xp_reward} XP
                    </Badge>
                  </div>

                  {achievement.unlocked && achievement.unlocked_at && (
                    <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                      Unlocked: {new Date(achievement.unlocked_at).toLocaleDateString()}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Achievements;
