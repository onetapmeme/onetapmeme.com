import { useEffect, useState, useRef } from "react";
import { Sparkles, X } from "lucide-react";
import { Button } from "./ui/button";

interface Drop {
  name: string;
  icon: string;
  rarity: string;
  type: 'accessory' | 'background';
}

interface DropRouletteProps {
  drop: Drop;
  onClose: () => void;
}

const DropRoulette = ({ drop, onClose }: DropRouletteProps) => {
  const [isSpinning, setIsSpinning] = useState(true);
  const [spinOffset, setSpinOffset] = useState(0);
  const [showDrop, setShowDrop] = useState(false);
  const musicMainRef = useRef<HTMLAudioElement | null>(null);
  const musicEpicRef = useRef<HTMLAudioElement | null>(null);
  
  // Générer une liste d'items aléatoires pour l'effet de roulette
  const generateRouletteItems = () => {
    const allDrops = [
      { name: "MP7 Skull", icon: "🔫", rarity: "Common" },
      { name: "UMP Blaze", icon: "🔥", rarity: "Common" },
      { name: "M4A1 Beast", icon: "🎯", rarity: "Uncommon" },
      { name: "Dust II", icon: "🏜️", rarity: "Uncommon" },
      { name: "AWP Dragon", icon: "🐉", rarity: "Rare" },
      { name: "Nuke", icon: "☢️", rarity: "Rare" },
      { name: "Karambit", icon: "🗡️", rarity: "Epic" },
      { name: "AK-47 Gold", icon: "👑", rarity: "Epic" },
      { name: "Vice City", icon: "🌆", rarity: "Epic" },
      { name: "AWP Asiimov", icon: "⚡", rarity: "Epic" },
      { name: "Karambit Fade", icon: "💎", rarity: "Legendary" },
      { name: "Hyrule", icon: "🗡️", rarity: "Legendary" },
      { name: "AK Pink", icon: "💗", rarity: "Legendary" },
      { name: "Karambit Doppler", icon: "🌈", rarity: "Legendary+" },
      { name: "Mario World", icon: "🍄", rarity: "Legendary+" },
      { name: "AWP Fade", icon: "🌟", rarity: "Mythic" },
      { name: "Terrorist Elite", icon: "💀", rarity: "Mythic" },
      { name: "CS:GO Logo", icon: "🎖️", rarity: "Mythic" },
    ];

    // Créer une liste de 30 items aléatoires, avec le drop gagné à la fin
    const items = [];
    for (let i = 0; i < 29; i++) {
      const randomDrop = allDrops[Math.floor(Math.random() * allDrops.length)];
      items.push(randomDrop);
    }
    // Ajouter le vrai drop à la position 25 (il sera centré après l'animation)
    items.splice(25, 0, { ...drop, icon: drop.icon.includes('.png') ? '🎁' : drop.icon });
    
    return items;
  };

  const [rouletteItems] = useState(generateRouletteItems());

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common": return "from-gray-500 to-gray-700";
      case "Uncommon": return "from-green-500 to-green-700";
      case "Rare": return "from-blue-500 to-blue-700";
      case "Epic": return "from-purple-500 to-purple-700";
      case "Legendary": return "from-orange-500 to-orange-700";
      case "Legendary+": return "from-red-500 to-red-700";
      case "Mythic": return "from-yellow-500 to-yellow-700";
      default: return "from-gray-500 to-gray-700";
    }
  };

  useEffect(() => {
    // Jouer le son principal pendant la roulette
    musicMainRef.current = new Audio('/sounds/music_main.wav');
    musicMainRef.current.volume = 0.6;
    musicMainRef.current.play().catch(console.error);

    // Animation de la roulette
    let currentOffset = 0;
    const targetOffset = 25 * 120; // Position du vrai drop (25 * hauteur d'item)
    const duration = 4000; // 4 secondes
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing cubic out pour ralentir progressivement
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      currentOffset = easeOutCubic * targetOffset;
      
      setSpinOffset(currentOffset);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsSpinning(false);
        
        // Arrêter le son principal et jouer le son épique
        if (musicMainRef.current) {
          musicMainRef.current.pause();
          musicMainRef.current.currentTime = 0;
        }
        
        musicEpicRef.current = new Audio('/sounds/music_epic.wav');
        musicEpicRef.current.volume = 0.7;
        musicEpicRef.current.play().catch(console.error);
        
        // Afficher l'animation de drop
        setTimeout(() => setShowDrop(true), 100);
      }
    };

    animate();

    // Cleanup
    return () => {
      if (musicMainRef.current) {
        musicMainRef.current.pause();
        musicMainRef.current.currentTime = 0;
      }
      if (musicEpicRef.current) {
        musicEpicRef.current.pause();
        musicEpicRef.current.currentTime = 0;
      }
    };
  }, []);

  const handleClose = () => {
    // Arrêter tous les sons
    if (musicMainRef.current) {
      musicMainRef.current.pause();
      musicMainRef.current.currentTime = 0;
    }
    if (musicEpicRef.current) {
      musicEpicRef.current.pause();
      musicEpicRef.current.currentTime = 0;
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md mx-4">
        {/* Close button */}
        {!isSpinning && (
          <Button
            onClick={handleClose}
            size="icon"
            variant="ghost"
            className="absolute -top-12 right-0 text-white hover:bg-white/10"
          >
            <X className="w-6 h-6" />
          </Button>
        )}

        {/* Roulette container */}
        <div className="relative bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-xl rounded-2xl border-4 border-primary/50 shadow-[0_0_60px_rgba(var(--primary-rgb),0.6)] overflow-hidden">
          {/* Title */}
          <div className="bg-gradient-primary text-center py-4 border-b-4 border-primary/50">
            <h2 className="text-2xl font-black text-white flex items-center justify-center gap-2">
              <Sparkles className="w-6 h-6 animate-pulse" />
              RANK UP DROP!
              <Sparkles className="w-6 h-6 animate-pulse" />
            </h2>
          </div>

          {/* Roulette viewport */}
          <div className="relative h-[360px] overflow-hidden">
            {/* Selection indicator */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[120px] border-y-4 border-yellow-400 bg-yellow-400/10 pointer-events-none z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent animate-pulse" />
            </div>

            {/* Top gradient fade */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-background to-transparent z-[5] pointer-events-none" />
            
            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-[5] pointer-events-none" />

            {/* Roulette items */}
            <div
              className="flex flex-col items-center py-[120px] transition-transform"
              style={{
                transform: `translateY(-${spinOffset}px)`,
                transitionDuration: '0ms'
              }}
            >
              {rouletteItems.map((item, index) => (
                <div
                  key={index}
                  className={`w-full h-[120px] flex flex-col items-center justify-center border-b border-border/20 bg-gradient-to-br ${getRarityColor(item.rarity)} bg-opacity-20 backdrop-blur-sm`}
                >
                  <div className="text-6xl mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                    {item.icon}
                  </div>
                  <div className="text-white font-bold text-sm px-4 text-center line-clamp-1">
                    {item.name}
                  </div>
                  <div className="text-white/70 text-xs font-semibold">
                    {item.rarity}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom section */}
          {!isSpinning && (
            <div className="bg-gradient-accent text-center py-6 border-t-4 border-primary/50 animate-fade-in">
              <div className="text-yellow-400 font-bold text-lg mb-1 animate-pulse">
                🎉 CONGRATULATIONS! 🎉
              </div>
              <div 
                className={`text-white font-black text-2xl mb-2 transition-all duration-500 ${
                  showDrop ? 'animate-drop-bounce' : 'opacity-0 scale-50'
                }`}
              >
                {drop.name}
              </div>
              <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${getRarityColor(drop.rarity)} text-white font-bold text-sm transition-all duration-500 ${
                showDrop ? 'animate-drop-bounce' : 'opacity-0 scale-50'
              }`}>
                {drop.rarity}
              </div>
              <div className="mt-4">
                <Button
                  onClick={handleClose}
                  size="lg"
                  className="bg-gradient-primary hover:shadow-glow-primary font-black"
                >
                  COLLECT REWARD
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropRoulette;
