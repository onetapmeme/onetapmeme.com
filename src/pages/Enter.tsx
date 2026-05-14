import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logoImage from "@/assets/cardsurgery-logo.png";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { copy, pickLang } from "@/components/cards/copy";

const Enter = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const lang = pickLang(i18n.language);
  const t = (k: keyof typeof copy) => copy[k][lang];
  const [isClicked, setIsClicked] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/explosion.wav");
    audioRef.current.preload = "auto";
  }, []);

  const handleClick = () => {
    if (isClicked) return;
    setIsClicked(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
    setTimeout(() => navigate("/home"), 600);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="language-switcher">
        <LanguageSwitcher />
      </div>

      <div
        onClick={handleClick}
        className={`min-h-screen relative cursor-pointer transition-all duration-500 ${
          isClicked ? "opacity-0 scale-110" : ""
        }`}
      >
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[1400px] h-[700px] bg-primary/20 rounded-full blur-[200px] opacity-50" />
          <div className="absolute top-1/4 left-1/3 w-[800px] h-[600px] bg-primary/15 rounded-full blur-[180px] opacity-40" />
        </div>

        <div className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 border-t-4 border-l-4 border-primary/30 animate-pulse z-10" />
        <div
          className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 border-b-4 border-r-4 border-primary/30 animate-pulse z-10"
          style={{ animationDelay: "0.5s" }}
        />

        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 pt-20 pb-32">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
            <img
              src={logoImage}
              alt="1Tap"
              className="relative w-32 h-32 md:w-44 md:h-44 object-contain drop-shadow-[0_0_40px_hsla(210,100%,55%,0.8)]"
            />
          </div>

          <div className="text-center max-w-2xl">
            <p className="uppercase tracking-widest text-xs md:text-sm text-primary mb-4 font-semibold">
              {t("heroEyebrow")}
            </p>
            <h1
              className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6"
              style={{
                background:
                  "linear-gradient(90deg, hsl(210,100%,55%) 0%, hsl(25,100%,55%) 50%, hsl(210,100%,55%) 100%)",
                backgroundSize: "300% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "gradient-flow 10s linear infinite",
              }}
            >
              {t("heroTitle")}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              {t("heroSubtitle")}
            </p>
          </div>
        </div>

        <div className="fixed bottom-8 left-0 right-0 z-30 flex justify-center px-4">
          <Button
            size="lg"
            className="text-lg md:text-xl py-6 px-12 rounded-full font-bold animate-pulse"
            style={{
              background:
                "linear-gradient(135deg, hsl(210,100%,60%), hsl(210,100%,50%))",
              boxShadow: "0 0 50px hsla(210,100%,55%,0.5)",
            }}
          >
            <Sparkles className="w-5 h-5 mr-2" />
            {t("heroCtaPrimary")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Enter;
