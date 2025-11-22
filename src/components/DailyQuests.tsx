import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Trophy, CheckCircle2, Gift } from 'lucide-react';

interface Quest {
  id: string;
  title: string;
  description: string;
  requirement_type: string;
  requirement_value: number;
  xp_reward: number;
  icon: string;
}

interface QuestProgress {
  quest_id: string;
  progress: number;
  completed: boolean;
  claimed: boolean;
}

const DailyQuests = () => {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [questProgress, setQuestProgress] = useState<Record<string, QuestProgress>>({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadUserAndQuests = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      // Load quests
      const { data: questsData } = await supabase
        .from('daily_quests')
        .select('*')
        .order('xp_reward', { ascending: false });

      if (questsData) {
        setQuests(questsData);
      }

      // Load user progress if logged in
      if (user) {
        const { data: progressData } = await supabase
          .from('user_quest_progress')
          .select('*')
          .eq('user_id', user.id)
          .eq('quest_date', new Date().toISOString().split('T')[0]);

        if (progressData) {
          const progressMap: Record<string, QuestProgress> = {};
          progressData.forEach((p: any) => {
            progressMap[p.quest_id] = {
              quest_id: p.quest_id,
              progress: p.progress,
              completed: p.completed,
              claimed: p.claimed
            };
          });
          setQuestProgress(progressMap);
        }

        // Auto-complete login quest
        await completeLoginQuest(user.id, questsData);
      }

      setLoading(false);
    };

    loadUserAndQuests();
  }, []);

  const completeLoginQuest = async (userId: string, questsData: Quest[]) => {
    const loginQuest = questsData?.find(q => q.requirement_type === 'login');
    if (!loginQuest) return;

    const { data: existingProgress } = await supabase
      .from('user_quest_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('quest_id', loginQuest.id)
      .eq('quest_date', new Date().toISOString().split('T')[0])
      .maybeSingle();

    if (!existingProgress) {
      await supabase.from('user_quest_progress').insert({
        user_id: userId,
        quest_id: loginQuest.id,
        progress: 1,
        completed: true,
        quest_date: new Date().toISOString().split('T')[0]
      });

      setQuestProgress(prev => ({
        ...prev,
        [loginQuest.id]: { quest_id: loginQuest.id, progress: 1, completed: true, claimed: false }
      }));
    }
  };

  const claimReward = async (quest: Quest) => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please login to claim rewards",
        variant: "destructive"
      });
      return;
    }

    const progress = questProgress[quest.id];
    if (!progress?.completed || progress.claimed) return;

    // Update quest as claimed
    const { error } = await supabase
      .from('user_quest_progress')
      .update({ claimed: true })
      .eq('user_id', user.id)
      .eq('quest_id', quest.id)
      .eq('quest_date', new Date().toISOString().split('T')[0]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to claim reward",
        variant: "destructive"
      });
      return;
    }

    // Award XP
    await supabase.rpc('increment_user_xp', {
      user_id_param: user.id,
      xp_amount: quest.xp_reward
    });

    setQuestProgress(prev => ({
      ...prev,
      [quest.id]: { ...prev[quest.id], claimed: true }
    }));

    toast({
      title: "🎉 Reward Claimed!",
      description: `You earned ${quest.xp_reward} XP!`,
      className: "bg-primary text-primary-foreground"
    });
  };

  const getProgressPercentage = (quest: Quest) => {
    const progress = questProgress[quest.id];
    if (!progress) return 0;
    return Math.min((progress.progress / quest.requirement_value) * 100, 100);
  };

  const getQuestStatus = (quest: Quest) => {
    const progress = questProgress[quest.id];
    if (!progress) return { text: 'Not Started', color: 'text-muted-foreground' };
    if (progress.claimed) return { text: 'Claimed', color: 'text-green-400' };
    if (progress.completed) return { text: 'Ready to Claim!', color: 'text-primary' };
    return { text: `${progress.progress}/${quest.requirement_value}`, color: 'text-blue-400' };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 mb-4"
        >
          <Trophy className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold">Daily Quests</h2>
        </motion.div>
        <p className="text-muted-foreground">Complete quests to earn bonus XP</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {quests.map((quest, index) => {
          const progress = questProgress[quest.id];
          const status = getQuestStatus(quest);
          const progressPercentage = getProgressPercentage(quest);

          return (
            <motion.div
              key={quest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 glass-effect border-primary/20 hover:border-primary/40 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{quest.icon}</span>
                    <div>
                      <h3 className="font-bold text-lg">{quest.title}</h3>
                      <p className="text-sm text-muted-foreground">{quest.description}</p>
                    </div>
                  </div>
                  {progress?.completed && (
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className={status.color}>{status.text}</span>
                    <span className="text-primary font-semibold">+{quest.xp_reward} XP</span>
                  </div>

                  <Progress value={progressPercentage} className="h-2" />

                  {progress?.completed && !progress.claimed && (
                    <Button
                      onClick={() => claimReward(quest)}
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      <Gift className="w-4 h-4 mr-2" />
                      Claim Reward
                    </Button>
                  )}

                  {progress?.claimed && (
                    <Button disabled className="w-full">
                      Claimed ✓
                    </Button>
                  )}

                  {!user && (
                    <Button
                      onClick={() => window.location.href = '/auth'}
                      variant="outline"
                      className="w-full"
                    >
                      Login to Start
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyQuests;
