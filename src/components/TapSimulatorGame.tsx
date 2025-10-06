import { useState, useEffect } from "react";
import { Trophy, Sparkles, TrendingUp, LogIn, Save, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Rank {
  name: string;
  nameFr: string;
  threshold: number;
  color: string;
  drop: {
    name: string;
    icon: string;
    rarity: string;
  };
}

const ranks: Rank[] = [
  { name: "SILVER 1", nameFr: "ARGENT 1", threshold: 0, color: "text-gray-400", drop: { name: "$ONETAP Starter", icon: "🪙", rarity: "Common" } },
  { name: "SILVER 2", nameFr: "ARGENT 2", threshold: 1000, color: "text-gray-400", drop: { name: "Silver Box", icon: "📦", rarity: "Common" } },
  { name: "SILVER 3", nameFr: "ARGENT 3", threshold: 2000, color: "text-gray-400", drop: { name: "Silver Coin", icon: "🥈", rarity: "Common" } },
  { name: "SILVER 4", nameFr: "ARGENT 4", threshold: 3000, color: "text-gray-400", drop: { name: "Silver Case", icon: "💼", rarity: "Common" } },
  { name: "SILVER ELITE", nameFr: "ARGENT ÉLITE", threshold: 5000, color: "text-gray-300", drop: { name: "Silver Karambit", icon: "🔪", rarity: "Uncommon" } },
  { name: "SILVER ELITE MASTER", nameFr: "MAÎTRE ARGENT ÉLITE", threshold: 7000, color: "text-gray-200", drop: { name: "Elite Badge", icon: "🎖️", rarity: "Uncommon" } },
  { name: "GOLD NOVA 1", nameFr: "NOVA D'OR 1", threshold: 10000, color: "text-yellow-600", drop: { name: "Gold AWP", icon: "🎯", rarity: "Rare" } },
  { name: "GOLD NOVA 2", nameFr: "NOVA D'OR 2", threshold: 12000, color: "text-yellow-600", drop: { name: "Gold M4A4", icon: "🔫", rarity: "Rare" } },
  { name: "GOLD NOVA 3", nameFr: "NOVA D'OR 3", threshold: 14000, color: "text-yellow-500", drop: { name: "Gold AK-47", icon: "⚔️", rarity: "Rare" } },
  { name: "GOLD NOVA MASTER", nameFr: "MAÎTRE NOVA D'OR", threshold: 17000, color: "text-yellow-400", drop: { name: "Nova Crown", icon: "👑", rarity: "Epic" } },
  { name: "MASTER GUARDIAN 1", nameFr: "MAÎTRE GARDIEN 1", threshold: 20000, color: "text-yellow-300", drop: { name: "Guardian M4A1-S", icon: "🛡️", rarity: "Epic" } },
  { name: "MASTER GUARDIAN 2", nameFr: "MAÎTRE GARDIEN 2", threshold: 23000, color: "text-yellow-300", drop: { name: "Guardian Shield", icon: "🔰", rarity: "Epic" } },
  { name: "MASTER GUARDIAN ELITE", nameFr: "MAÎTRE GARDIEN ÉLITE", threshold: 26000, color: "text-orange-400", drop: { name: "Elite AWP Dragon", icon: "🐲", rarity: "Epic" } },
  { name: "DISTINGUISHED MASTER GUARDIAN", nameFr: "MAÎTRE GARDIEN DISTINGUÉ", threshold: 30000, color: "text-orange-500", drop: { name: "Distinguished Knife", icon: "🗡️", rarity: "Legendary" } },
  { name: "LEGENDARY EAGLE", nameFr: "AIGLE LÉGENDAIRE", threshold: 35000, color: "text-orange-600", drop: { name: "Eagle AK-47 Fire", icon: "⚡", rarity: "Legendary" } },
  { name: "LEGENDARY EAGLE MASTER", nameFr: "MAÎTRE AIGLE LÉGENDAIRE", threshold: 40000, color: "text-red-500", drop: { name: "Master Eagle Wings", icon: "🦅", rarity: "Legendary" } },
  { name: "SUPREME MASTER FIRST CLASS", nameFr: "MAÎTRE SUPRÊME PREMIÈRE CLASSE", threshold: 50000, color: "text-red-600", drop: { name: "Supreme Dragon Lore", icon: "🐉", rarity: "Mythic" } },
  { name: "THE GLOBAL ELITE", nameFr: "ÉLITE MONDIALE", threshold: 100000, color: "text-purple-500", drop: { name: "OneTap Memecoin NFT", icon: "💎", rarity: "Legendary+" } }
];

// Validation schemas for security
const progressSchema = z.object({
  xp: z.number().int().min(0).max(10000000),
  clicks: z.number().int().min(0).max(100000000),
  current_rank_index: z.number().int().min(0).max(ranks.length - 1)
});

const dropSchema = z.object({
  drop_name: z.string().min(1).max(200),
  drop_icon: z.string().min(1).max(10),
  drop_rarity: z.string().min(1).max(50),
  rank_name: z.string().min(1).max(100)
});

// Color tiers after Global Elite
const getColorTier = (xp: number) => {
  if (xp >= 30000) return { name: "GOLD TIER", color: "text-yellow-400", emoji: "🏆" };
  if (xp >= 25000) return { name: "RED TIER", color: "text-red-500", emoji: "🔴" };
  if (xp >= 20000) return { name: "PINK TIER", color: "text-pink-500", emoji: "💗" };
  if (xp >= 15000) return { name: "PURPLE TIER", color: "text-purple-500", emoji: "🟣" };
  if (xp >= 10000) return { name: "BLUE TIER", color: "text-blue-500", emoji: "🔵" };
  if (xp >= 5000) return { name: "LIGHT BLUE TIER", color: "text-cyan-400", emoji: "💠" };
  return { name: "GREY TIER", color: "text-gray-400", emoji: "⚪" };
};

const TapSimulatorGame = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const [xp, setXp] = useState(0);
  const [currentRankIndex, setCurrentRankIndex] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [showDrop, setShowDrop] = useState(false);
  const [newDrop, setNewDrop] = useState<Rank["drop"] | null>(null);
  const [clickAnimation, setClickAnimation] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  const currentRank = ranks[currentRankIndex];
  const nextRank = ranks[currentRankIndex + 1];
  const colorTier = currentRankIndex === ranks.length - 1 ? getColorTier(xp - currentRank.threshold) : null;
  
  const progress = nextRank 
    ? ((xp - currentRank.threshold) / (nextRank.threshold - currentRank.threshold)) * 100 
    : 100;

  // Load user session and progress
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProgress(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadProgress(session.user.id);
      } else {
        // Reset progress if logged out
        setXp(0);
        setClicks(0);
        setCurrentRankIndex(0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Auto-save progress when user is logged in
  useEffect(() => {
    if (user && xp > 0) {
      const saveTimeout = setTimeout(() => {
        saveProgress();
      }, 2000); // Auto-save after 2 seconds of inactivity

      return () => clearTimeout(saveTimeout);
    }
  }, [user, xp, clicks, currentRankIndex]);

  const loadProgress = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('player_progress')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setXp(data.xp);
        setClicks(data.clicks);
        setCurrentRankIndex(data.current_rank_index);
      }
    } catch (error: any) {
      console.error('Error loading progress:', error);
    }
  };

  const saveProgress = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      // Validate progress data before saving
      const validation = progressSchema.safeParse({
        xp,
        clicks,
        current_rank_index: currentRankIndex
      });

      if (!validation.success) {
        console.error('Invalid progress data:', validation.error);
        toast({
          title: "Validation failed",
          description: "Unable to save progress due to invalid data",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('player_progress')
        .upsert({
          user_id: user.id,
          ...validation.data,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;
    } catch (error: any) {
      console.error('Error saving progress:', error);
      toast({
        title: "Save failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const saveDrop = async (drop: Rank["drop"], rankName: string) => {
    if (!user) return;
    
    try {
      // Validate drop data before saving
      const validation = dropSchema.safeParse({
        drop_name: drop.name,
        drop_icon: drop.icon,
        drop_rarity: drop.rarity,
        rank_name: rankName
      });

      if (!validation.success) {
        console.error('Invalid drop data:', validation.error);
        return;
      }

      const { error } = await supabase
        .from('player_inventory')
        .insert({
          user_id: user.id,
          drop_name: validation.data.drop_name,
          drop_icon: validation.data.drop_icon,
          drop_rarity: validation.data.drop_rarity,
          rank_name: validation.data.rank_name
        });

      if (error) throw error;
      
      toast({
        title: "New Drop!",
        description: `${drop.icon} ${drop.name} added to your inventory!`,
      });
    } catch (error: any) {
      console.error('Error saving drop:', error);
    }
  };

  useEffect(() => {
    if (nextRank && xp >= nextRank.threshold) {
      const newRankIndex = currentRankIndex + 1;
      setCurrentRankIndex(newRankIndex);
      setNewDrop(nextRank.drop);
      setShowDrop(true);
      setTimeout(() => setShowDrop(false), 3000);
      
      // Save drop to inventory if user is logged in
      if (user) {
        saveDrop(nextRank.drop, nextRank.name);
      }
    }
  }, [xp, nextRank]);

  const handleClick = () => {
    const xpGain = Math.floor(Math.random() * 50) + 10;
    setXp(prev => prev + xpGain);
    setClicks(prev => prev + 1);
    setClickAnimation(true);
    setTimeout(() => setClickAnimation(false), 100);
  };

  const displayRankName = i18n.language === 'fr' ? currentRank.nameFr : currentRank.name;
  const nextRankName = nextRank ? (i18n.language === 'fr' ? nextRank.nameFr : nextRank.name) : null;

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Auth Status & Save */}
      {!user && (
        <div className="bg-card/40 backdrop-blur-md border-2 border-yellow-500/50 rounded-xl p-3 mb-4 text-center">
          <p className="text-xs text-muted-foreground mb-2">⚠️ Progress not saved - Sign in to save your rank!</p>
          <Link to="/auth">
            <Button size="sm" variant="outline" className="w-full">
              <LogIn className="w-4 h-4 mr-2" />
              Sign In to Save Progress
            </Button>
          </Link>
        </div>
      )}

      {user && (
        <div className="flex items-center justify-between bg-card/40 backdrop-blur-md border-2 border-green-500/30 rounded-xl p-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Signed in</span>
          </div>
          <div className="flex items-center gap-2">
            {saving && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Save className="w-3 h-3 animate-pulse" />
                Saving...
              </div>
            )}
            <Link to="/profile">
              <Button size="sm" variant="outline">
                <User className="w-3 h-3 mr-1" />
                Profile
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* Rank & Progress */}
      <div className="bg-card/40 backdrop-blur-md border-2 border-primary/30 rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Trophy className={`w-5 h-5 ${currentRank.color}`} />
            <span className={`font-bold text-sm ${currentRank.color}`}>{displayRankName}</span>
          </div>
          <span className="text-xs text-muted-foreground">{clicks} clicks</span>
        </div>

        {/* Color Tier Display (after Global Elite) */}
        {colorTier && (
          <div className="mb-2 text-center">
            <span className={`text-xs font-bold ${colorTier.color}`}>
              {colorTier.emoji} {colorTier.name}
            </span>
          </div>
        )}
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{xp} XP</span>
            {nextRank && <span>{nextRank.threshold} XP</span>}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {nextRank && (
          <div className="mt-2 text-xs text-center text-muted-foreground">
            Next: <span className={nextRank.color}>{nextRankName}</span>
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
