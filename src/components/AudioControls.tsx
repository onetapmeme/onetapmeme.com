import { useState, useEffect } from "react";
import { Volume2, VolumeX, Volume1 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AudioControlsProps {
  className?: string;
}

const AudioControls = ({ className = "" }: AudioControlsProps) => {
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(70);

  // Load saved settings
  useEffect(() => {
    const savedVolume = localStorage.getItem("onetap_volume");
    const savedMuted = localStorage.getItem("onetap_muted");
    
    if (savedVolume) {
      setVolume(parseInt(savedVolume));
    }
    if (savedMuted === "true") {
      setIsMuted(true);
    }
  }, []);

  // Save settings
  useEffect(() => {
    localStorage.setItem("onetap_volume", volume.toString());
    localStorage.setItem("onetap_muted", isMuted.toString());
    
    // Apply to all audio elements
    const audioElements = document.querySelectorAll("audio");
    audioElements.forEach((audio) => {
      audio.volume = isMuted ? 0 : volume / 100;
    });
  }, [volume, isMuted]);

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (volume === 0) {
        setVolume(previousVolume || 70);
      }
    } else {
      setIsMuted(true);
      setPreviousVolume(volume);
    }
  };

  const handleVolumeChange = (newValue: number[]) => {
    const newVolume = newValue[0];
    setVolume(newVolume);
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return VolumeX;
    if (volume < 50) return Volume1;
    return Volume2;
  };

  const VolumeIcon = getVolumeIcon();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative group"
            aria-label="Volume controls"
          >
            <VolumeIcon className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4" align="end">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">Volume</span>
              <span className="text-xs text-muted-foreground">{isMuted ? "Muted" : `${volume}%`}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                className="shrink-0"
              >
                <VolumeIcon className="w-4 h-4" />
              </Button>
              
              <Slider
                value={[volume]}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="flex-1"
                disabled={isMuted}
              />
            </div>

            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">
                🎧 Best experience with sound on
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AudioControls;
