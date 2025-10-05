import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Shuffle, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import logoImage from "@/assets/onetap_new_logo.png";
import zeldaSword from "@/assets/meme-accessories/zelda-sword.png";
import marioMushroom from "@/assets/meme-accessories/mario-mushroom.png";
import marioMushroom2 from "@/assets/meme-accessories/mario-mushroom-2.png";
import gtaCash from "@/assets/meme-accessories/gta-cash.png";
import gtaMuscle from "@/assets/meme-accessories/gta-muscle.png";

interface Accessory {
  image: string;
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
  { image: zeldaSword, name: "Master Sword", position: { x: 20, y: 20 }, size: 100, rotation: -15 },
  { image: marioMushroom, name: "Mario Mushroom", position: { x: 80, y: 30 }, size: 80 },
  { image: marioMushroom2, name: "Power Mushroom", position: { x: 15, y: 60 }, size: 70, rotation: -20 },
  { image: gtaCash, name: "GTA Cash", position: { x: 70, y: 70 }, size: 90, rotation: 10 },
  { image: gtaMuscle, name: "GTA Muscle", position: { x: 30, y: 75 }, size: 85 },
];

const backgrounds: Background[] = [
  { name: "Dust II", gradient: "linear-gradient(135deg, #D4A574 0%, #8B6F47 50%, #5C4A3A 100%)" },
  { name: "Inferno", gradient: "linear-gradient(135deg, #E8B17B 0%, #C8955F 50%, #8B5A2B 100%)" },
  { name: "Mirage", gradient: "linear-gradient(135deg, #E6D5B8 0%, #B89968 50%, #8B7355 100%)" },
  { name: "Nuke", gradient: "linear-gradient(135deg, #7A8B99 0%, #4A5F6D 50%, #2C3E50 100%)" },
  { name: "Vertigo", gradient: "linear-gradient(135deg, #5A6C7D 0%, #34495E 50%, #2C3E50 100%)" },
  { name: "Cache", gradient: "linear-gradient(135deg, #CCCCCC 0%, #999999 50%, #666666 100%)" },
];

const MemeSection = () => {
  const { t } = useTranslation();
  const [selectedAccessories, setSelectedAccessories] = useState<number[]>([]);
  const [selectedBackground, setSelectedBackground] = useState<number>(0);
  const memeRef = useRef<HTMLDivElement>(null);

  const randomizeMeme = () => {
    const randomAccessoryCount = Math.floor(Math.random() * 3) + 2;
    const randomAccessories: number[] = [];
    while (randomAccessories.length < randomAccessoryCount) {
      const randomIndex = Math.floor(Math.random() * accessories.length);
      if (!randomAccessories.includes(randomIndex)) {
        randomAccessories.push(randomIndex);
      }
    }
    setSelectedAccessories(randomAccessories);
    setSelectedBackground(Math.floor(Math.random() * backgrounds.length));
    toast.success(t('memes.randomized'));
  };

  const downloadMeme = async () => {
    if (!memeRef.current) return;

    try {
      const canvas = await html2canvas(memeRef.current, {
        backgroundColor: null,
        scale: 3,
        useCORS: true,
        allowTaint: true,
        logging: false,
      });

      const link = document.createElement("a");
      link.download = `onetap-meme-${Date.now()}.png`;
      link.href = canvas.toDataURL("image/png", 1.0);
      link.click();

      toast.success(t('memes.downloaded'));
    } catch (error) {
      console.error("Download error:", error);
      toast.error(t('memes.downloadError'));
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
            {t('memes.title')}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            {t('memes.subtitle')}
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
                  <img
                    key={accessoryIndex}
                    src={accessory.image}
                    alt={accessory.name}
                    className="absolute drop-shadow-2xl animate-float pointer-events-none"
                    style={{
                      left: `${accessory.position.x}%`,
                      top: `${accessory.position.y}%`,
                      transform: `translate(-50%, -50%) rotate(${accessory.rotation || 0}deg)`,
                      width: `${accessory.size}px`,
                      height: `${accessory.size}px`,
                      objectFit: "contain",
                      animationDelay: `${accessoryIndex * 0.2}s`,
                    }}
                  />
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-4 md:mt-6">
              <Button onClick={randomizeMeme} variant="outline" className="flex-1 text-sm md:text-base">
                <Shuffle className="w-4 h-4 mr-2" />
                {t('memes.randomize')}
              </Button>
              <Button onClick={downloadMeme} variant="hero" className="flex-1 text-sm md:text-base">
                <Download className="w-4 h-4 mr-2" />
                {t('memes.download')}
              </Button>
            </div>
          </Card>

          {/* Customization Panel */}
          <div className="space-y-4 md:space-y-6">
            {/* Background Selection */}
            <Card className="p-4 md:p-6 bg-card/50 backdrop-blur-sm border-primary/30">
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-foreground">{t('memes.backgrounds')}</h3>
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
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4 text-foreground">{t('memes.accessories')}</h3>
              <div className="grid grid-cols-5 gap-2 md:gap-3">
                {accessories.map((accessory, index) => (
                  <button
                    key={index}
                    onClick={() => toggleAccessory(index)}
                    className={`aspect-square flex items-center justify-center rounded-lg transition-all duration-300 p-2 ${
                      selectedAccessories.includes(index)
                        ? "bg-primary/20 ring-2 ring-primary scale-110"
                        : "bg-background/50 hover:bg-background/80 hover:scale-105"
                    }`}
                    title={accessory.name}
                  >
                    <img 
                      src={accessory.image} 
                      alt={accessory.name}
                      className="w-full h-full object-contain"
                    />
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
