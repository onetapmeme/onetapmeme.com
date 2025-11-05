import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, ThumbsUp, Eye, Share2, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface MemeWithVotes {
  id: string;
  image_url: string;
  template_name: string;
  views: number;
  shares: number;
  created_at: string;
  user_id: string;
  vote_count: number;
  user_voted: boolean;
}

export const MemeLeaderboard = () => {
  const [memes, setMemes] = useState<MemeWithVotes[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'votes' | 'views' | 'shares'>('votes');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    loadLeaderboard();
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserId(session?.user?.id || null);
    });
  }, [filter]);

  const loadLeaderboard = async () => {
    try {
      setLoading(true);

      // Get current user
      const { data: { session } } = await supabase.auth.getSession();
      const currentUserId = session?.user?.id;

      // Fetch memes with vote counts
      const { data, error } = await supabase
        .from('memes')
        .select(`
          *,
          meme_votes(count)
        `)
        .order(filter === 'votes' ? 'meme_votes(count)' : filter, { ascending: false })
        .limit(20);

      if (error) throw error;

      // Get user votes if logged in
      let userVotes: Set<string> = new Set();
      if (currentUserId) {
        const { data: votes } = await supabase
          .from('meme_votes')
          .select('meme_id')
          .eq('user_id', currentUserId);
        
        if (votes) {
          userVotes = new Set(votes.map(v => v.meme_id));
        }
      }

      // Process memes data
      const processedMemes: MemeWithVotes[] = data?.map(meme => ({
        ...meme,
        vote_count: Array.isArray(meme.meme_votes) ? meme.meme_votes.length : 0,
        user_voted: userVotes.has(meme.id)
      })) || [];

      setMemes(processedMemes);
    } catch (error) {
      console.error('Error loading leaderboard:', error);
      toast.error('Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (memeId: string) => {
    if (!userId) {
      toast.error('Please sign in to vote');
      return;
    }

    const meme = memes.find(m => m.id === memeId);
    if (!meme) return;

    try {
      if (meme.user_voted) {
        // Remove vote
        await supabase
          .from('meme_votes')
          .delete()
          .eq('meme_id', memeId)
          .eq('user_id', userId);
        
        toast.success('Vote removed');
      } else {
        // Add vote
        const { error } = await supabase
          .from('meme_votes')
          .insert({ meme_id: memeId, user_id: userId });

        if (error) throw error;
        
        // Award XP to meme creator
        await supabase.rpc('increment_user_xp', {
          user_id_param: meme.user_id,
          xp_amount: 5
        });

        toast.success('+5 XP awarded to creator! 🎯');
      }

      loadLeaderboard();
    } catch (error: any) {
      console.error('Error voting:', error);
      toast.error(error.message || 'Failed to vote');
    }
  };

  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Trophy className="w-8 h-8 text-primary animate-pulse" />
          <div>
            <h3 className="text-2xl font-orbitron font-bold text-primary">Meme Leaderboard</h3>
            <p className="text-sm text-muted-foreground">Top viral creations</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant={filter === 'votes' ? 'default' : 'outline'}
            onClick={() => setFilter('votes')}
            className="text-xs"
          >
            <ThumbsUp className="w-3 h-3 mr-1" />
            Votes
          </Button>
          <Button
            size="sm"
            variant={filter === 'views' ? 'default' : 'outline'}
            onClick={() => setFilter('views')}
            className="text-xs"
          >
            <Eye className="w-3 h-3 mr-1" />
            Views
          </Button>
          <Button
            size="sm"
            variant={filter === 'shares' ? 'default' : 'outline'}
            onClick={() => setFilter('shares')}
            className="text-xs"
          >
            <Share2 className="w-3 h-3 mr-1" />
            Shares
          </Button>
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        <div className="space-y-3 max-h-[600px] overflow-y-auto scrollbar-thin">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
              <p className="text-sm text-muted-foreground mt-3">Loading leaderboard...</p>
            </div>
          ) : memes.length === 0 ? (
            <div className="text-center py-12">
              <Award className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">No memes yet. Be the first! 🚀</p>
            </div>
          ) : (
            memes.map((meme, index) => (
              <motion.div
                key={meme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-4 p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
                  {index === 0 && (
                    <Trophy className="w-8 h-8 text-yellow-500 animate-pulse" />
                  )}
                  {index === 1 && (
                    <Trophy className="w-7 h-7 text-gray-400" />
                  )}
                  {index === 2 && (
                    <Trophy className="w-6 h-6 text-orange-600" />
                  )}
                  {index > 2 && (
                    <span className="text-lg font-bold text-muted-foreground">#{index + 1}</span>
                  )}
                </div>

                <img
                  src={meme.image_url}
                  alt={meme.template_name || 'Meme'}
                  className="w-16 h-16 rounded object-cover border-2 border-primary/30 group-hover:border-primary/60 transition-all"
                />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">
                    {meme.template_name || 'Custom Meme'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(meme.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold">{meme.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Share2 className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold">{meme.shares}</span>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant={meme.user_voted ? 'default' : 'outline'}
                  onClick={() => handleVote(meme.id)}
                  className="flex items-center gap-1"
                >
                  <ThumbsUp className={`w-4 h-4 ${meme.user_voted ? 'fill-current' : ''}`} />
                  <span className="font-bold">{meme.vote_count}</span>
                </Button>
              </motion.div>
            ))
          )}
        </div>
      </AnimatePresence>
    </Card>
  );
};
