import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import tap2enterImage from "@/assets/tap2enter.png";
import { Crosshair } from "lucide-react";

const Enter = () => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rippleIdRef = useRef(0);

  useEffect(() => {
    // Preload audio
    audioRef.current = new Audio("/sounds/explosion.wav");
    audioRef.current.preload = "auto";
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isClicked) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Add ripple effect
    setRipples((prev) => [...(prev || []), { x, y, id: rippleIdRef.current++ }]);

    setIsClicked(true);

    // Play explosion sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(console.error);
    }

    // Navigate after animation
    setTimeout(() => {
      navigate("/home");
    }, 1200);
  };

  return (
    <div
      onClick={handleClick}
      className={`min-h-screen bg-background relative overflow-hidden cursor-pointer group ${
        isClicked ? "animate-pulse-glow" : ""
      }`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${tap2enterImage})`,
          filter: isClicked ? "brightness(1.5) contrast(1.2)" : "brightness(1)",
          transform: isClicked ? "scale(1.1)" : "scale(1)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40"></div>
      </div>

      {/* Click Ripples */}
      {ripples?.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="w-4 h-4 bg-secondary rounded-full animate-[ping_1s_ease-out] opacity-75"></div>
          <div className="w-8 h-8 bg-primary rounded-full animate-[ping_1.5s_ease-out] opacity-50 absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4"></div>
        </div>
      ))}

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-float opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Center Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
        {/* Click Indicator */}
        <div
          className={`transition-all duration-500 ${
            isClicked ? "opacity-0 scale-150" : "opacity-100 scale-100"
          }`}
        >
          <div className="relative">
            {/* Pulsing Ring */}
            <div className="absolute -inset-20 border-4 border-primary rounded-full animate-[ping_2s_ease-in-out_infinite] opacity-30"></div>
            <div className="absolute -inset-16 border-2 border-secondary rounded-full animate-[ping_2.5s_ease-in-out_infinite] opacity-20"></div>

            {/* Main Icon */}
            <div className="relative bg-card/80 backdrop-blur-md border-4 border-primary rounded-full p-8 shadow-glow-cyan group-hover:scale-110 transition-transform duration-300">
              <Crosshair className="w-16 h-16 text-primary animate-pulse-glow" />
            </div>
          </div>

          {/* Text */}
          <div className="mt-12 text-center space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-accent bg-clip-text text-transparent drop-shadow-lg animate-pulse-glow">
              TAP TO ENTER
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 font-mono">
              Click anywhere to begin
            </p>
          </div>

          {/* Animated Arrow */}
          <div className="mt-8 flex justify-center">
            <div className="animate-bounce">
              <div className="w-8 h-8 border-b-4 border-r-4 border-primary transform rotate-45"></div>
            </div>
          </div>
        </div>

        {/* Flash Effect on Click */}
        {isClicked && (
          <div className="fixed inset-0 bg-white animate-[fade-out_0.5s_ease-out] pointer-events-none" />
        )}
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-sm text-muted-foreground/60 font-mono animate-pulse">
          🎮 Sound On for Best Experience
        </p>
      </div>
    </div>
  );
};

export default Enter;
