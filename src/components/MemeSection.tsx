import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Shuffle, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import logoImage from "@/assets/onetap_new_logo.png";

interface Accessory {
  emoji: string;
  name: string;
  position: { x: number; y: number };
  size: number;
  rotation?: number;
}

interface Background {
  name: string;
  gradient: string;
}

const accessories: Accessory[] = [
  { emoji: "🗡️", name: "Master Sword", position: { x: 20, y: 20 }, size: 60 },
  { emoji: "🍄", name: "Mario Mushroom", position: { x: 80, y: 30 }, size: 50 },
  { emoji: "💰", name: "GTA Cash", position: { x: 70, y: 70 }, size: 55 },
  { emoji: "🔫", name: "CS:GO Knife", position: { x: 30, y: 75 }, size: 50, rotation: -15 },
  { emoji: "🎮", name: "Controller", position: { x: 50, y: 15 }, size: 45 },
  { emoji: "👾", name: "Space Invader", position: { x: 15, y: 60 }, size: 40 },
  { emoji: "🏆", name: "Trophy", position: { x: 85, y: 80 }, size: 50 },
  { emoji: "⚡", name: "Lightning", position: { x: 40, y: 40 }, size: 55 },
  { emoji: "💎", name: "Diamond", position: { x: 60, y: 85 }, size: 45 },
  { emoji: "🚀", name: "Rocket", position: { x: 25, y: 35 }, size: 50, rotation: 45 },
];

const backgrounds: Background[] = [
  { name: "CS:GO Dust II", gradient: "linear-gradient(135deg, #D4A574 0%, #8B6F47 100%)" },
  { name: "Zelda Hyrule", gradient: "linear-gradient(135deg, #4A8B3C 0%, #2C5F2D 100%)" },
  { name: "GTA Vice City", gradient: "linear-gradient(135deg, #FF6B9D 0%, #C06C84 100%)" },
  { name: "Fortnite Storm", gradient: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)" },
  { name: "Minecraft Grass", gradient: "linear-gradient(135deg, #7EC850 0%, #629632 100%)" },
  { name: "Portal Aperture", gradient: "linear-gradient(135deg, #FFFFFF 0%, #E5E5E5 100%)" },
];

const MemeSection = () => {
  const [selectedAccessories, setSelectedAccessories] = useState<number[]>([]);
  const [selectedBackground, setSelectedBackground] = useState<number>(0);
  const memeRef = useRef<HTMLDivElement>(null);

  const randomizeMeme = () => {
    const randomAccessoryCount = Math.floor(Math.random() * 4) + 2;
    const randomAccessories: number[] = [];
    while (randomAccessories.length < randomAccessoryCount) {
      const randomIndex = Math.floor(Math.random() * accessories.length);
      if (!randomAccessories.includes(randomIndex)) {
        randomAccessories.push(randomIndex);
      }
    }
    setSelectedAccessories(randomAccessories);
    setSelectedBackground(Math.floor(Math.random() * backgrounds.length));
    toast.success("Meme randomisé !");
  };

  const downloadMeme = async () => {
    if (!memeRef.current) return;

    try {
      const canvas = await html2canvas(memeRef.current, {
        backgroundColor: null,
        scale: 2,
      });

      const link = document.createElement("a");
      link.download = "onetap-meme.png";
      link.href = canvas.toDataURL();
      link.click();

      toast.success("Meme téléchargé !");
    } catch (error) {
      toast.error("Erreur lors du téléchargement");
    }
  };

  const toggleAccessory = (index: number) => {
    setSelectedAccessories((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section id="meme-generator" className="py-12 md:py-20 px-4 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 md:mb-12 animate-pixel-fade">
          <ImageIcon className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 text-primary" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
            Générateur de Memes $ONETAP
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Créez vos propres memes personnalisés avec le logo $ONETAP et partagez-les avec la communauté !
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Meme Preview */}
          <Card className="p-4 md:p-8 bg-card/50 backdrop-blur-sm border-primary/30">
            <div
              ref={memeRef}
              className="relative w-full aspect-square rounded-lg overflow-hidden shadow-2xl"
              style={{ background: backgrounds[selectedBackground].gradient }}
            >
              {/* Logo centered */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <img
                  src={logoImage}
                  alt="OneTap Logo"
                  className="max-w-[70%] max-h-[70%] object-contain drop-shadow-2xl"
                />
              </div>

              {/* Accessories */}
              {selectedAccessories.map((accessoryIndex) => {
                const accessory = accessories[accessoryIndex];
                return (
                  <div
                    key={accessoryIndex}
                    className="absolute text-4xl drop-shadow-lg animate-float"
                    style={{
                      left: `${accessory.position.x}%`,
                      top: `${accessory.position.y}%`,
                      transform: `translate(-50%, -50%) rotate(${accessory.rotation || 0}deg)`,
                      fontSize: `${accessory.size}px`,
                      animationDelay: `${accessoryIndex * 0.2}s`,
                    }}
                  >
                    {accessory.emoji}
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-4 md:mt-6">
              <Button onClick={randomizeMeme} variant="outline" className="flex-1 text-sm md:text-base">
                <Shuffle className="w-4 h-4 mr-2" />
                Randomiser
              </Button>
              <Button onClick={downloadMeme} variant="hero" className="flex-1 text-sm md:text-base">
                <Download className="w-4 h-4 mr-2" />
                Télécharger
              </Button>
            </div>
          </Card>

          {/* Customization Panel */}
          <div className="space-y-4 md:space-y-6">
            {/* Background Selection */}
            <Card className="p-4 md:p-6 bg-card/50 backdrop-blur-sm border-primary/30">
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-foreground">Arrière-plans</h3>
              <div className="grid grid-cols-3 gap-2 md:gap-3">
                {backgrounds.map((bg, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedBackground(index)}
                    className={`h-16 md:h-20 rounded-lg transition-all duration-300 ${
                      selectedBackground === index
                        ? "ring-2 md:ring-4 ring-primary scale-105"
                        : "hover:scale-105 opacity-70 hover:opacity-100"
                    }`}
                    style={{ background: bg.gradient }}
                    title={bg.name}
                  />
                ))}
              </div>
            </Card>

            {/* Accessory Selection */}
            <Card className="p-4 md:p-6 bg-card/50 backdrop-blur-sm border-primary/30">
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-foreground">Accessoires</h3>
              <div className="grid grid-cols-5 gap-2 md:gap-3">
                {accessories.map((accessory, index) => (
                  <button
                    key={index}
                    onClick={() => toggleAccessory(index)}
                    className={`text-2xl md:text-4xl aspect-square flex items-center justify-center rounded-lg transition-all duration-300 ${
                      selectedAccessories.includes(index)
                        ? "bg-primary/20 ring-2 ring-primary scale-110"
                        : "bg-background/50 hover:bg-background/80 hover:scale-105"
                    }`}
                    title={accessory.name}
                  >
                    {accessory.emoji}
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemeSection;
