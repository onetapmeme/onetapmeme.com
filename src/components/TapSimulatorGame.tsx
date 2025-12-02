import { useState, useEffect, useRef } from "react";
import { Trophy, Sparkles, TrendingUp, LogIn, Save, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { z } from "zod";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import DropRoulette from "./DropRoulette";
import { useFloatingXP } from "./FloatingXP";

interface Rank {
  name: string;
  nameFr: string;
  threshold: number;
  color: string;
  drop: {
    name: string;
    icon: string;
    rarity: string;
    type: 'accessory' | 'background';
  };
}

const ranks: Rank[] = [
  { name: "SILVER I", nameFr: "ARGENT I", threshold: 0, color: "text-gray-400", drop: { name: "MP7 Skull", icon: "csgo-mp7.png", rarity: "Common", type: "accessory" } },
  { name: "SILVER II", nameFr: "ARGENT II", threshold: 500, color: "text-gray-400", drop: { name: "UMP Blaze", icon: "csgo-ump.png", rarity: "Common", type: "accessory" } },
  { name: "SILVER III", nameFr: "ARGENT III", threshold: 1000, color: "text-gray-400", drop: { name: "M4A1 Hyper Beast", icon: "csgo-m4a1.png", rarity: "Uncommon", type: "accessory" } },
  { name: "SILVER IV", nameFr: "ARGENT IV", threshold: 1500, color: "text-gray-400", drop: { name: "Dust II Background", icon: "dust2", rarity: "Uncommon", type: "background" } },
  { name: "SILVER ELITE", nameFr: "ARGENT ÉLITE", threshold: 2000, color: "text-gray-300", drop: { name: "AWP Dragon Lore", icon: "csgo-awp-dragon.png", rarity: "Rare", type: "accessory" } },
  { name: "SILVER ELITE MASTER", nameFr: "MAÎTRE ARGENT ÉLITE", threshold: 3000, color: "text-gray-300", drop: { name: "Nuke Background", icon: "nuke", rarity: "Rare", type: "background" } },
  { name: "GOLD NOVA I", nameFr: "NOVA OR I", threshold: 5000, color: "text-yellow-400", drop: { name: "Karambit Vanilla", icon: "csgo-karambit.png", rarity: "Epic", type: "accessory" } },
  { name: "GOLD NOVA II", nameFr: "NOVA OR II", threshold: 7000, color: "text-yellow-400", drop: { name: "AK-47 Gold", icon: "csgo-ak47-gold.png", rarity: "Epic", type: "accessory" } },
  { name: "GOLD NOVA III", nameFr: "NOVA OR III", threshold: 10000, color: "text-yellow-400", drop: { name: "Vice City Background", icon: "vice", rarity: "Epic", type: "background" } },
  { name: "GOLD NOVA MASTER", nameFr: "MAÎTRE NOVA OR", threshold: 13000, color: "text-yellow-500", drop: { name: "AWP Asiimov", icon: "csgo-awp-asiimov.png", rarity: "Epic", type: "accessory" } },
  { name: "MASTER GUARDIAN I", nameFr: "MAÎTRE GARDIEN I", threshold: 16000, color: "text-orange-400", drop: { name: "Karambit Fade", icon: "csgo-karambit-fade.png", rarity: "Legendary", type: "accessory" } },
  { name: "MASTER GUARDIAN II", nameFr: "MAÎTRE GARDIEN II", threshold: 20000, color: "text-orange-400", drop: { name: "Hyrule Background", icon: "hyrule", rarity: "Legendary", type: "background" } },
  { name: "MASTER GUARDIAN ELITE", nameFr: "MAÎTRE GARDIEN ÉLITE", threshold: 25000, color: "text-orange-500", drop: { name: "AK-47 Pink DDPAT", icon: "csgo-ak47-pink.png", rarity: "Legendary", type: "accessory" } },
  { name: "DISTINGUISHED MASTER GUARDIAN", nameFr: "MAÎTRE GARDIEN DISTINGUÉ", threshold: 30000, color: "text-orange-600", drop: { name: "Karambit Doppler", icon: "csgo-karambit-rainbow.png", rarity: "Legendary+", type: "accessory" } },
  { name: "LEGENDARY EAGLE", nameFr: "AIGLE LÉGENDAIRE", threshold: 40000, color: "text-blue-400", drop: { name: "Mario World Background", icon: "mario", rarity: "Legendary+", type: "background" } },
  { name: "LEGENDARY EAGLE MASTER", nameFr: "MAÎTRE AIGLE LÉGENDAIRE", threshold: 55000, color: "text-blue-500", drop: { name: "AWP Fade", icon: "csgo-awp.png", rarity: "Mythic", type: "accessory" } },
  { name: "SUPREME MASTER FIRST CLASS", nameFr: "MAÎTRE SUPRÊME PREMIÈRE CLASSE", threshold: 70000, color: "text-purple-400", drop: { name: "Terrorist Elite", icon: "csgo-terrorist.png", rarity: "Mythic", type: "accessory" } },
  { name: "THE GLOBAL ELITE", nameFr: "ÉLITE MONDIALE", threshold: 100000, color: "text-purple-500", drop: { name: "Elite Badge", icon: "csgo-logo.png", rarity: "Mythic", type: "accessory" } }
];

// Validation schemas for security
const progressSchema = z.object({
  xp: z.number().int().min(0).max(10000000),
  clicks: z.number().int().min(0).max(100000000),
  current_rank_index: z.number().int().min(0).max(ranks.length - 1)
});

const dropSchema = z.object({
  drop_name: z.string().min(1).max(200),
  drop_icon: z.string().min(1).max(200),
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
  const { addParticle, FloatingXPContainer } = useFloatingXP();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [xp, setXp] = useState(0);
  const [currentRankIndex, setCurrentRankIndex] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [showDrop, setShowDrop] = useState(false);
  const [newDrop, setNewDrop] = useState<Rank["drop"] | null>(null);
  const [clickAnimation, setClickAnimation] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [recentDrops, setRecentDrops] = useState<any[]>([]);

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
      }, 5000); // Auto-save after 5 seconds of inactivity (reduced DB load)

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
      
      // Load recent drops
      const { data: drops } = await supabase
        .from('player_inventory')
        .select('*')
        .eq('user_id', userId)
        .order('collected_at', { ascending: false })
        .limit(6);
      
      if (drops) {
        setRecentDrops(drops);
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
          title: t('game.validationFailed'),
          description: t('game.invalidData'),
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
        title: t('game.saveFailed'),
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
      
      // Reload recent drops
      if (user) {
        const { data: drops } = await supabase
          .from('player_inventory')
          .select('*')
          .eq('user_id', user.id)
          .order('collected_at', { ascending: false })
          .limit(6);
        
        if (drops) {
          setRecentDrops(drops);
        }
      }
      
      toast({
        title: t('game.newDrop'),
        description: `${drop.icon} ${drop.name} ${t('game.addedToInventory')}`,
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
      
      // Confetti celebration on rank up
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FF6347', '#FF1493']
      });
      
      toast({
        title: `🎉 ${t('game.rankUp')}`,
        description: `${t('game.youReached')} ${nextRank.name}!`,
        duration: 5000,
      });
      
      // Save drop to inventory if user is logged in
      if (user) {
        saveDrop(nextRank.drop, nextRank.name);
      }
    }
  }, [xp, nextRank]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Rate limiting: max 10 clicks per second (100ms between clicks)
    const now = Date.now();
    if (now - lastClickTime < 100) {
      return; // Silently ignore clicks that are too fast
    }
    setLastClickTime(now);
    
    const xpGain = Math.floor(Math.random() * 5) + 10;
    setXp(prev => prev + xpGain);
    setClicks(prev => prev + 1);
    setClickAnimation(true);
    setTimeout(() => setClickAnimation(false), 150);
    
    // Add floating XP particle at click position
    addParticle(e.clientX, e.clientY, xpGain);
    
    // Random drop chance (every click has a chance)
    const dropChance = Math.random();
    if (dropChance < 0.01 && user) { // 1% chance per click for extra drops
      const randomDrop = ranks[Math.floor(Math.random() * ranks.length)].drop;
      toast({
        title: `💎 ${t('game.bonusDrop')}`,
        description: `${t('game.youFound')} ${randomDrop.name}!`,
      });
      saveDrop(randomDrop, "Bonus");
    }
  };

  const displayRankName = i18n.language === 'fr' ? currentRank.nameFr : currentRank.name;
  const nextRankName = nextRank ? (i18n.language === 'fr' ? nextRank.nameFr : nextRank.name) : null;

  return (
    <>
      <FloatingXPContainer />
      <div className="w-full max-w-md mx-auto">
      {/* Auth Status & Save */}
      {!user && (
        <div className="bg-card/40 backdrop-blur-md border-2 border-yellow-500/50 rounded-xl p-3 mb-4 text-center">
          <p className="text-xs text-muted-foreground mb-2">⚠️ {t('game.progressNotSaved')}</p>
          <Link to="/auth">
            <Button size="sm" variant="outline" className="w-full">
              <LogIn className="w-4 h-4 mr-2" />
              {t('game.signInToSave')}
            </Button>
          </Link>
        </div>
      )}

      {user && (
        <div className="flex items-center justify-between bg-card/40 backdrop-blur-md border-2 border-green-500/30 rounded-xl p-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-muted-foreground">{t('game.signedIn')}</span>
          </div>
          <div className="flex items-center gap-2">
            {saving && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Save className="w-3 h-3 animate-pulse" />
                {t('game.saving')}
              </div>
            )}
            <Link to="/profile">
              <Button size="sm" variant="outline">
                <User className="w-3 h-3 mr-1" />
                {t('game.profile')}
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
        <span className="text-xs text-muted-foreground">{clicks} {t('game.clicks')}</span>
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
            {t('game.next')}: <span className={nextRank.color}>{nextRankName}</span>
          </div>
        )}
      </div>

      {/* Click Button */}
      <Button
        ref={buttonRef}
        onClick={handleClick}
        size="lg"
        disabled={showDrop}
        className={`w-full h-24 text-2xl font-bold bg-gradient-accent hover:shadow-glow-primary transition-all duration-150 relative overflow-hidden active:scale-90 ${
          clickAnimation ? 'scale-95 shadow-[0_0_30px_rgba(255,165,0,0.8)]' : 'scale-100'
        }`}
      >
        <Sparkles className="w-6 h-6 absolute top-2 left-2 animate-pulse" />
        <span className="drop-shadow-[0_2px_10px_rgba(255,255,255,0.5)]">
          {showDrop ? t('game.dropInProgress') : t('game.tapToEarn')}
        </span>
        <TrendingUp className="w-6 h-6 absolute bottom-2 right-2 animate-bounce" />
      </Button>

      {/* Drop Roulette */}
      {showDrop && newDrop && (
        <DropRoulette 
          drop={newDrop}
          onClose={() => setShowDrop(false)}
        />
      )}

      {/* Recent Drops Inventory */}
      {user && recentDrops.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">{t('game.recentDrops')}</h3>
            <Link to="/inventory">
              <Button variant="ghost" size="sm" className="text-xs">
                {t('game.viewAll')} →
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {recentDrops.map((item) => {
              const rarityColors: Record<string, string> = {
                "Common": "border-gray-500/50 bg-gray-500/10",
                "Uncommon": "border-green-500/50 bg-green-500/10",
                "Rare": "border-blue-500/50 bg-blue-500/10",
                "Epic": "border-purple-500/50 bg-purple-500/10",
                "Legendary": "border-yellow-500/50 bg-yellow-500/10",
                "Legendary+": "border-orange-500/50 bg-orange-500/10",
                "Mythic": "border-red-500/50 bg-red-500/10"
              };
              
              return (
                <div
                  key={item.id}
                  className={`relative aspect-square rounded-lg border-2 ${rarityColors[item.drop_rarity] || "border-border"} backdrop-blur-sm p-2 flex flex-col items-center justify-center`}
                >
                  <span className="text-2xl mb-1">
                    {item.drop_icon.endsWith('.png') ? '🎮' : item.drop_icon}
                  </span>
                  <span className="text-[10px] text-center text-muted-foreground line-clamp-1">
                    {item.drop_name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default TapSimulatorGame;
