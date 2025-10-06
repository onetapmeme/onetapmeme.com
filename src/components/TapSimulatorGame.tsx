import { useState, useEffect } from "react";
import { Trophy, Sparkles, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface Rank {
  name: string;
  threshold: number;
  color: string;
  drop: {
    name: string;
    icon: string;
    rarity: string;
  };
}

const ranks: Rank[] = [
  { 
    name: "Silver I", 
    threshold: 0, 
    color: "text-gray-400",
    drop: { name: "$ONETAP Coin", icon: "🪙", rarity: "Common" }
  },
  { 
    name: "Silver Elite", 
    threshold: 5000, 
    color: "text-gray-300",
    drop: { name: "Silver Karambit", icon: "🔪", rarity: "Uncommon" }
  },
  { 
    name: "Gold Nova", 
    threshold: 10000, 
    color: "text-yellow-500",
    drop: { name: "Gold AWP", icon: "🎯", rarity: "Rare" }
  },
  { 
    name: "Master Guardian", 
    threshold: 20000, 
    color: "text-yellow-400",
    drop: { name: "Guardian M4A1-S", icon: "🔫", rarity: "Epic" }
  },
  { 
    name: "Legendary Eagle", 
    threshold: 30000, 
    color: "text-orange-500",
    drop: { name: "Eagle AK-47", icon: "⚡", rarity: "Legendary" }
  },
  { 
    name: "Supreme", 
    threshold: 50000, 
    color: "text-red-500",
    drop: { name: "Supreme Dragon Lore", icon: "🐉", rarity: "Mythic" }
  },
  { 
    name: "Global Elite", 
    threshold: 100000, 
    color: "text-purple-500",
    drop: { name: "OneTap Memecoin NFT", icon: "💎", rarity: "Legendary+" }
  }
];

const TapSimulatorGame = () => {
  const { t } = useTranslation();
  const [xp, setXp] = useState(0);
  const [currentRankIndex, setCurrentRankIndex] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [showDrop, setShowDrop] = useState(false);
  const [newDrop, setNewDrop] = useState<Rank["drop"] | null>(null);
  const [clickAnimation, setClickAnimation] = useState(false);

  const currentRank = ranks[currentRankIndex];
  const nextRank = ranks[currentRankIndex + 1];
  const progress = nextRank 
    ? ((xp - currentRank.threshold) / (nextRank.threshold - currentRank.threshold)) * 100 
    : 100;

  useEffect(() => {
    if (nextRank && xp >= nextRank.threshold) {
      setCurrentRankIndex(prev => prev + 1);
      setNewDrop(nextRank.drop);
      setShowDrop(true);
      setTimeout(() => setShowDrop(false), 3000);
    }
  }, [xp, nextRank]);

  const handleClick = () => {
    const xpGain = Math.floor(Math.random() * 50) + 10;
    setXp(prev => prev + xpGain);
    setClicks(prev => prev + 1);
    setClickAnimation(true);
    setTimeout(() => setClickAnimation(false), 100);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Rank & Progress */}
      <div className="bg-card/40 backdrop-blur-md border-2 border-primary/30 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Trophy className={`w-5 h-5 ${currentRank.color}`} />
            <span className={`font-bold ${currentRank.color}`}>{currentRank.name}</span>
          </div>
          <span className="text-xs text-muted-foreground">{clicks} clicks</span>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{xp} XP</span>
            {nextRank && <span>{nextRank.threshold} XP</span>}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {nextRank && (
          <div className="mt-2 text-xs text-center text-muted-foreground">
            Next: <span className={nextRank.color}>{nextRank.name}</span>
          </div>
        )}
      </div>

      {/* Click Button */}
      <Button
        onClick={handleClick}
        size="lg"
        className={`w-full h-24 text-2xl font-bold bg-gradient-accent hover:shadow-glow-primary transition-all relative overflow-hidden ${
          clickAnimation ? 'scale-95' : 'scale-100'
        }`}
      >
        <Sparkles className="w-6 h-6 absolute top-2 left-2 animate-pulse" />
        <span>TAP TO EARN</span>
        <TrendingUp className="w-6 h-6 absolute bottom-2 right-2 animate-bounce" />
      </Button>

      {/* Drop Notification */}
      {showDrop && newDrop && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-scale-in">
          <div className="bg-gradient-to-br from-primary via-secondary to-accent p-6 rounded-2xl border-4 border-yellow-400 shadow-[0_0_50px_rgba(255,215,0,0.8)] text-center">
            <div className="text-6xl mb-2 animate-bounce">{newDrop.icon}</div>
            <div className="text-yellow-400 font-bold text-sm mb-1">{newDrop.rarity}</div>
            <div className="text-white font-black text-xl">{newDrop.name}</div>
            <div className="text-white/80 text-xs mt-2">RANK UP!</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TapSimulatorGame;
