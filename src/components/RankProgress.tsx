import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface Rank {
  name: string;
  min_xp: number;
  icon: string;
  color: string;
  rank_index: number;
}

interface RankProgressProps {
  userId?: string;
  currentXP?: number;
  currentRankIndex?: number;
}

const RankProgress = ({ userId, currentXP = 0, currentRankIndex = 0 }: RankProgressProps) => {
  const [ranks, setRanks] = useState<Rank[]>([]);
  const [currentRank, setCurrentRank] = useState<Rank | null>(null);
  const [nextRank, setNextRank] = useState<Rank | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    fetchRanks();
  }, []);

  useEffect(() => {
    if (ranks.length > 0) {
      calculateProgress();
    }
  }, [ranks, currentXP, currentRankIndex]);

  const fetchRanks = async () => {
    const { data, error } = await supabase
      .from('ranks')
      .select('*')
      .order('rank_index', { ascending: true });

    if (!error && data) {
      setRanks(data);
    }
  };

  const calculateProgress = () => {
    const current = ranks.find(r => r.rank_index === currentRankIndex);
    const next = ranks.find(r => r.rank_index === currentRankIndex + 1);

    setCurrentRank(current || null);
    setNextRank(next || null);

    if (current && next) {
      const xpInCurrentRank = currentXP - current.min_xp;
      const xpNeededForNext = next.min_xp - current.min_xp;
      const progressPercent = Math.min(100, (xpInCurrentRank / xpNeededForNext) * 100);
      setProgress(progressPercent);
    } else if (current && !next) {
      setProgress(100);
    }
  };

  if (!currentRank) return null;

  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div 
            className="text-4xl p-3 rounded-full"
            style={{ backgroundColor: currentRank.color + '20' }}
          >
            {currentRank.icon}
          </div>
          <div>
            <h3 className="font-bold text-xl" style={{ color: currentRank.color }}>
              {currentRank.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {currentXP.toLocaleString()} XP
            </p>
          </div>
        </div>

        {nextRank && (
          <div className="text-right">
            <Badge variant="outline" className="mb-1">
              Next: {nextRank.icon} {nextRank.name}
            </Badge>
            <p className="text-xs text-muted-foreground">
              {nextRank.min_xp.toLocaleString()} XP
            </p>
          </div>
        )}
      </div>

      {nextRank && (
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress to next rank</span>
            <span className="font-semibold text-primary">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
          <p className="text-xs text-muted-foreground mt-2">
            {(nextRank.min_xp - currentXP).toLocaleString()} XP remaining
          </p>
        </div>
      )}

      {!nextRank && (
        <div className="text-center py-4">
          <p className="text-lg font-bold text-primary">🎉 Maximum Rank Achieved! 🎉</p>
          <p className="text-sm text-muted-foreground">You've reached the legendary status!</p>
        </div>
      )}

      <div className="mt-6 pt-4 border-t">
        <h4 className="text-sm font-semibold mb-3">All Ranks</h4>
        <div className="flex flex-wrap gap-2">
          {ranks.map((rank) => (
            <Badge
              key={rank.rank_index}
              variant={rank.rank_index === currentRankIndex ? 'default' : 'outline'}
              className={rank.rank_index <= currentRankIndex ? '' : 'opacity-40'}
              style={rank.rank_index === currentRankIndex ? { backgroundColor: rank.color } : {}}
            >
              {rank.icon} {rank.name}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default RankProgress;
