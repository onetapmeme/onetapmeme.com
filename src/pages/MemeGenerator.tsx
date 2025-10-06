import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Download, Shuffle, Package } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import logoImage from "@/assets/onetap_new_logo.png";
import TapSimulatorGame from "@/components/TapSimulatorGame";
import { supabase } from "@/integrations/supabase/client";

// Import gaming accessories assets
import csgoAK47Gold from "@/assets/meme-accessories/csgo-ak47-gold.png";
import csgoAK47Pink from "@/assets/meme-accessories/csgo-ak47-pink.png";
import csgoAWPAsiimov from "@/assets/meme-accessories/csgo-awp-asiimov.png";
import csgoAWPDragon from "@/assets/meme-accessories/csgo-awp-dragon.png";
import csgoAWP from "@/assets/meme-accessories/csgo-awp.png";
import csgoKarambitFade from "@/assets/meme-accessories/csgo-karambit-fade.png";
import csgoKarambitRainbow from "@/assets/meme-accessories/csgo-karambit-rainbow.png";
import csgoKarambit from "@/assets/meme-accessories/csgo-karambit.png";
import csgoLogo from "@/assets/meme-accessories/csgo-logo.png";
import csgoM4A1 from "@/assets/meme-accessories/csgo-m4a1.png";
import csgoMP7 from "@/assets/meme-accessories/csgo-mp7.png";
import csgoTerrorist from "@/assets/meme-accessories/csgo-terrorist.png";
import csgoUMP from "@/assets/meme-accessories/csgo-ump.png";

interface Accessory {
  emoji?: string;
  image?: string;
  name: string;
  position: { x: number; y: number };
  size: number;
  rotation?: number;
  isUnlocked?: boolean;
  rarity?: string;
}

interface Background {
  name: string;
  gradient: string;
}

const accessories: Accessory[] = [
  { emoji: "🗡️", name: "Master Sword", position: { x: 15, y: 30 }, size: 60, rotation: -45 },
  { emoji: "🍄", name: "Mario Mushroom", position: { x: 70, y: 20 }, size: 50 },
  { emoji: "👑", name: "Zelda Crown", position: { x: 40, y: 10 }, size: 55 },
  { emoji: "💎", name: "Minecraft Diamond", position: { x: 75, y: 60 }, size: 45 },
  { emoji: "🎮", name: "Controller", position: { x: 20, y: 70 }, size: 50 },
  { emoji: "⚔️", name: "CS:GO Knife", position: { x: 80, y: 40 }, size: 55, rotation: 45 },
  { emoji: "💰", name: "GTA Cash", position: { x: 10, y: 50 }, size: 50 },
  { emoji: "🏎️", name: "GTA Car", position: { x: 65, y: 75 }, size: 60 },
  { emoji: "🔫", name: "Golden Gun", position: { x: 25, y: 15 }, size: 50, rotation: -30 },
  { emoji: "🎯", name: "Target", position: { x: 85, y: 25 }, size: 45 },
  { emoji: "🌟", name: "Mario Star", position: { x: 50, y: 5 }, size: 40 },
  { emoji: "🔥", name: "Fire", position: { x: 15, y: 80 }, size: 50 },
  { emoji: "⚡", name: "Lightning", position: { x: 75, y: 10 }, size: 45 },
  { emoji: "👾", name: "Retro Alien", position: { x: 35, y: 75 }, size: 50 },
  { emoji: "🎲", name: "Dice", position: { x: 85, y: 70 }, size: 45 },
];

const backgrounds: Background[] = [
  { name: "CS:GO Dust II", gradient: "linear-gradient(135deg, #d4a574 0%, #8b6f47 100%)" },
  { name: "CS:GO Nuke", gradient: "linear-gradient(135deg, #4a5568 0%, #2d3748 100%)" },
  { name: "GTA Vice", gradient: "linear-gradient(135deg, #ff0080 0%, #7928ca 50%, #ff0080 100%)" },
  { name: "Zelda Hyrule", gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)" },
  { name: "Mario World", gradient: "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)" },
  { name: "Retrowave", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)" },
];

// Asset mapping for drops
const assetMap: Record<string, string> = {
  "csgo-ak47-gold.png": csgoAK47Gold,
  "csgo-ak47-pink.png": csgoAK47Pink,
  "csgo-awp-asiimov.png": csgoAWPAsiimov,
  "csgo-awp-dragon.png": csgoAWPDragon,
  "csgo-awp.png": csgoAWP,
  "csgo-karambit-fade.png": csgoKarambitFade,
  "csgo-karambit-rainbow.png": csgoKarambitRainbow,
  "csgo-karambit.png": csgoKarambit,
  "csgo-logo.png": csgoLogo,
  "csgo-m4a1.png": csgoM4A1,
  "csgo-mp7.png": csgoMP7,
  "csgo-terrorist.png": csgoTerrorist,
  "csgo-ump.png": csgoUMP,
};

const MemeGenerator = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const memeRef = useRef<HTMLDivElement>(null);
  const [selectedAccessories, setSelectedAccessories] = useState<number[]>([]);
  const [selectedBackground, setSelectedBackground] = useState(0);
  const [allAccessories, setAllAccessories] = useState<Accessory[]>(accessories);
  const [user, setUser] = useState<any>(null);

  // Load user and inventory
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadInventory(session.user.id);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadInventory(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadInventory = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('player_inventory')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;

      if (data && data.length > 0) {
        // Convert inventory drops to accessories
        const unlockedAccessories: Accessory[] = data.map((item) => {
          const asset = assetMap[item.drop_icon];
          return {
            name: item.drop_name,
            image: asset,
            emoji: asset ? undefined : "🎁",
            position: { x: 50, y: 50 },
            size: 80,
            isUnlocked: true,
            rarity: item.drop_rarity,
          };
        });

        // Merge with default accessories
        setAllAccessories([...accessories, ...unlockedAccessories]);
        toast.success(`${unlockedAccessories.length} ${t('memes.dropsLoaded')}`);
      }
    } catch (error: any) {
      console.error('Error loading inventory:', error);
    }
  };

  const randomizeMeme = () => {
    const numAccessories = Math.floor(Math.random() * 4) + 2;
    const randomAccessories = Array.from(
      { length: numAccessories },
      () => Math.floor(Math.random() * allAccessories.length)
    );
    setSelectedAccessories(randomAccessories);
    setSelectedBackground(Math.floor(Math.random() * backgrounds.length));
    toast.success(t('memes.randomized'));
  };

  const downloadMeme = async () => {
    if (!memeRef.current) return;

    try {
      const canvas = await html2canvas(memeRef.current, {
        backgroundColor: null,
        scale: 2,
      });

      const link = document.createElement("a");
      link.download = `onetap-meme-${Date.now()}.png`;
      link.href = canvas.toDataURL();
      link.click();

      toast.success(t('memes.downloaded'));
    } catch (error) {
      toast.error(t('memes.downloadError'));
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="outline"
          onClick={() => navigate("/home")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('memes.backHome')}
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-gold bg-clip-text text-transparent">
            {t('memes.title')}
          </h1>
          <p className="text-muted-foreground text-lg">
            {t('memes.subtitle')}
          </p>
          {user && (
            <p className="text-sm text-primary mt-2">
              <Package className="inline w-4 h-4 mr-1" />
              {t('memes.inventoryConnected')}
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Meme Canvas */}
          <Card className="p-8 bg-card/50 backdrop-blur border-primary/20">
            <div
              ref={memeRef}
              className="relative w-full aspect-square rounded-lg overflow-hidden transition-all duration-300"
              style={{ background: backgrounds[selectedBackground].gradient }}
            >
              {/* Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={logoImage}
                  alt="OneTap Logo"
                  className="w-3/5 h-3/5 object-contain drop-shadow-2xl"
                />
              </div>

              {/* Accessories */}
              {selectedAccessories.map((accessoryIndex, i) => {
                const accessory = allAccessories[accessoryIndex];
                return (
                  <div
                    key={i}
                    className="absolute drop-shadow-lg animate-float"
                    style={{
                      left: `${accessory.position.x}%`,
                      top: `${accessory.position.y}%`,
                      width: `${accessory.size}px`,
                      height: `${accessory.size}px`,
                      transform: `translate(-50%, -50%) rotate(${accessory.rotation || 0}deg)`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  >
                    {accessory.image ? (
                      <img 
                        src={accessory.image} 
                        alt={accessory.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <span className="text-6xl">{accessory.emoji}</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <Button
                onClick={randomizeMeme}
                className="flex-1"
                variant="default"
              >
                <Shuffle className="mr-2 h-4 w-4" />
                {t('memes.randomize')}
              </Button>
              <Button
                onClick={downloadMeme}
                className="flex-1"
                variant="secondary"
              >
                <Download className="mr-2 h-4 w-4" />
                {t('memes.download')}
              </Button>
            </div>
          </Card>

          {/* Controls */}
          <div className="space-y-6">
            {/* Background Selection */}
            <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
              <h3 className="text-xl font-bold mb-4 text-primary">{t('memes.backgrounds')}</h3>
              <div className="grid grid-cols-2 gap-3">
                {backgrounds.map((bg, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedBackground(index)}
                    className={`h-20 rounded-lg transition-all duration-300 ${
                      selectedBackground === index
                        ? "ring-2 ring-primary shadow-glow-primary scale-105"
                        : "opacity-70 hover:opacity-100"
                    }`}
                    style={{ background: bg.gradient }}
                  >
                    <span className="text-xs font-medium text-white drop-shadow-lg">
                      {bg.name}
                    </span>
                  </button>
                ))}
              </div>
            </Card>

            {/* Accessories Selection */}
            <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
              <h3 className="text-xl font-bold mb-4 text-primary">{t('memes.accessories')}</h3>
              <div className="grid grid-cols-4 gap-3 max-h-96 overflow-y-auto scrollbar-thin">
                {allAccessories.map((accessory, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (selectedAccessories.includes(index)) {
                        setSelectedAccessories(
                          selectedAccessories.filter((i) => i !== index)
                        );
                      } else {
                        setSelectedAccessories([...selectedAccessories, index]);
                      }
                    }}
                    className={`aspect-square rounded-lg flex items-center justify-center transition-all duration-300 relative ${
                      selectedAccessories.includes(index)
                        ? "bg-primary/20 ring-2 ring-primary scale-110"
                        : "bg-muted/50 hover:bg-muted"
                    }`}
                    title={accessory.name}
                  >
                    {accessory.image ? (
                      <img 
                        src={accessory.image} 
                        alt={accessory.name}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <span className="text-4xl">{accessory.emoji}</span>
                    )}
                    {accessory.isUnlocked && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" title={t('memes.unlocked')} />
                    )}
                  </button>
                ))}
              </div>
            </Card>

            {/* Instructions */}
            <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
              <h3 className="text-xl font-bold mb-3 text-primary">{t('memes.howToUse')}</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• {t('memes.instruction1')}</li>
                <li>• {t('memes.instruction2')}</li>
                <li>• {t('memes.instruction3')}</li>
                <li>• {t('memes.instruction4')}</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Tap to Earn Game */}
        <div className="mt-12 max-w-4xl mx-auto">
          <TapSimulatorGame />
        </div>
      </div>
    </div>
  );
};

export default MemeGenerator;
