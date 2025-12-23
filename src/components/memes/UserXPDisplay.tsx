import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, TrendingUp, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

interface UserXP {
  total_xp: number;
  level: number;
  memes_created: number;
  shares_count: number;
  votes_received: number;
}

export const UserXPDisplay = () => {
  const [xpData, setXpData] = useState<UserXP | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserXP();

    const subscription = supabase
      .channel('user_xp_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'user_xp'
      }, () => {
        loadUserXP();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const loadUserXP = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('user_xp')
        .select('*')
        .eq('user_id', session.user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (!data) {
        // Use secure RPC function instead of direct database access
        await supabase.rpc('initialize_user_xp');
        
        // Fetch the newly created record
        const { data: newXP } = await supabase
          .from('user_xp')
          .select('*')
          .eq('user_id', session.user.id)
          .single();
        
        setXpData(newXP);
      } else {
        setXpData(data);
      }
    } catch (error) {
      // Silently handle errors
    } finally {
      setLoading(false);
    }
  };

  if (loading || !xpData) {
    return null;
  }

  // Calculate progress to next level
  const xpForCurrentLevel = (xpData.level - 1) * (xpData.level - 1) * 100;
  const xpForNextLevel = xpData.level * xpData.level * 100;
  const xpProgress = ((xpData.total_xp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="p-6 bg-gradient-to-br from-primary/20 via-card/80 to-accent/20 backdrop-blur-xl border-2 border-primary/40">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center border-2 border-primary/50">
              <Trophy className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="text-2xl font-orbitron font-black text-primary">Level {xpData.level}</h3>
              <p className="text-sm text-muted-foreground">Meme Master</p>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-1 justify-end text-primary mb-1">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-xl font-bold">{xpData.total_xp} XP</span>
            </div>
            <p className="text-xs text-muted-foreground">
              {xpForNextLevel - xpData.total_xp} XP to Level {xpData.level + 1}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>Level {xpData.level}</span>
            <span>Level {xpData.level + 1}</span>
          </div>
          <Progress value={xpProgress} className="h-3" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 rounded-lg bg-background/50 border border-primary/20">
            <Award className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-lg font-bold text-foreground">{xpData.memes_created}</p>
            <p className="text-xs text-muted-foreground">Created</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-background/50 border border-primary/20">
            <TrendingUp className="w-5 h-5 text-accent mx-auto mb-1" />
            <p className="text-lg font-bold text-foreground">{xpData.shares_count}</p>
            <p className="text-xs text-muted-foreground">Shares</p>
          </div>
          <div className="text-center p-3 rounded-lg bg-background/50 border border-primary/20">
            <Trophy className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
            <p className="text-lg font-bold text-foreground">{xpData.votes_received}</p>
            <p className="text-xs text-muted-foreground">Votes</p>
          </div>
        </div>

        <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary/30">
          <p className="text-xs text-muted-foreground text-center">
            🎯 <span className="font-semibold text-primary">+10 XP</span> per meme created • 
            <span className="font-semibold text-accent"> +3 XP</span> per share • 
            <span className="font-semibold text-yellow-500"> +5 XP</span> per vote received
          </p>
        </div>
      </Card>
    </motion.div>
  );
};
