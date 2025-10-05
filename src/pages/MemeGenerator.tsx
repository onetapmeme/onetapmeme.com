import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Download, Shuffle } from "lucide-react";
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

const MemeGenerator = () => {
  const navigate = useNavigate();
  const memeRef = useRef<HTMLDivElement>(null);
  const [selectedAccessories, setSelectedAccessories] = useState<number[]>([]);
  const [selectedBackground, setSelectedBackground] = useState(0);

  const randomizeMeme = () => {
    const numAccessories = Math.floor(Math.random() * 4) + 2;
    const randomAccessories = Array.from(
      { length: numAccessories },
      () => Math.floor(Math.random() * accessories.length)
    );
    setSelectedAccessories(randomAccessories);
    setSelectedBackground(Math.floor(Math.random() * backgrounds.length));
    toast.success("Meme randomized! 🎲");
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

      toast.success("Meme downloaded! 🎉");
    } catch (error) {
      toast.error("Failed to download meme");
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
          Back to Home
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-gold bg-clip-text text-transparent">
            RANDOM TAP MEME
          </h1>
          <p className="text-muted-foreground text-lg">
            Generate unique $ONETAP memes with gaming references
          </p>
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
                const accessory = accessories[accessoryIndex];
                return (
                  <div
                    key={i}
                    className="absolute text-6xl drop-shadow-lg animate-float"
                    style={{
                      left: `${accessory.position.x}%`,
                      top: `${accessory.position.y}%`,
                      fontSize: `${accessory.size}px`,
                      transform: `translate(-50%, -50%) rotate(${accessory.rotation || 0}deg)`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  >
                    {accessory.emoji}
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
                Randomize
              </Button>
              <Button
                onClick={downloadMeme}
                className="flex-1"
                variant="secondary"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </Card>

          {/* Controls */}
          <div className="space-y-6">
            {/* Background Selection */}
            <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
              <h3 className="text-xl font-bold mb-4 text-primary">Backgrounds</h3>
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
              <h3 className="text-xl font-bold mb-4 text-primary">Accessories</h3>
              <div className="grid grid-cols-4 gap-3 max-h-96 overflow-y-auto">
                {accessories.map((accessory, index) => (
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
                    className={`aspect-square rounded-lg flex items-center justify-center text-4xl transition-all duration-300 ${
                      selectedAccessories.includes(index)
                        ? "bg-primary/20 ring-2 ring-primary scale-110"
                        : "bg-muted/50 hover:bg-muted"
                    }`}
                    title={accessory.name}
                  >
                    {accessory.emoji}
                  </button>
                ))}
              </div>
            </Card>

            {/* Instructions */}
            <Card className="p-6 bg-card/50 backdrop-blur border-primary/20">
              <h3 className="text-xl font-bold mb-3 text-primary">How to use</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Click "Randomize" for a random meme</li>
                <li>• Select backgrounds and accessories manually</li>
                <li>• Click "Download" to save your meme</li>
                <li>• Share on social media with #ONETAP</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeGenerator;
