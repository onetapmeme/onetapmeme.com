import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "@/assets/cardsurgery-logo.png";

const PREFERS_REDUCED_MOTION =
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const Enter = () => {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"in" | "out">("in");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playedRef = useRef(false);

  useEffect(() => {
    // Lock body scroll while overlay is visible.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Preload chime; bind to first user interaction if autoplay is blocked.
    audioRef.current = new Audio("/sounds/enter.wav");
    audioRef.current.preload = "auto";
    audioRef.current.volume = 0.5;

    const tryPlay = () => {
      if (playedRef.current || !audioRef.current) return;
      playedRef.current = true;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        /* autoplay blocked — silently ignore */
      });
    };

    const onFirstInteract = () => tryPlay();
    window.addEventListener("pointerdown", onFirstInteract, { once: true });
    window.addEventListener("keydown", onFirstInteract, { once: true });

    if (PREFERS_REDUCED_MOTION) {
      const t = window.setTimeout(() => navigate("/home", { replace: true }), 400);
      return () => {
        window.clearTimeout(t);
        document.body.style.overflow = prevOverflow;
        window.removeEventListener("pointerdown", onFirstInteract);
        window.removeEventListener("keydown", onFirstInteract);
      };
    }

    const chimeTimer = window.setTimeout(tryPlay, 2200);
    const fadeTimer = window.setTimeout(() => setPhase("out"), 2200);
    const navTimer = window.setTimeout(
      () => navigate("/home", { replace: true }),
      2200 + 800,
    );

    return () => {
      window.clearTimeout(chimeTimer);
      window.clearTimeout(fadeTimer);
      window.clearTimeout(navTimer);
      window.removeEventListener("pointerdown", onFirstInteract);
      window.removeEventListener("keydown", onFirstInteract);
      document.body.style.overflow = prevOverflow;
    };
  }, [navigate]);

  return (
    <div
      aria-hidden={phase === "out"}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
      style={{
        transition:
          "opacity 800ms cubic-bezier(0.16,1,0.3,1), transform 800ms cubic-bezier(0.16,1,0.3,1)",
        opacity: phase === "out" ? 0 : 1,
        transform: phase === "out" ? "translateY(-20px)" : "translateY(0)",
        pointerEvents: phase === "out" ? "none" : "auto",
      }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-accent/15 rounded-full blur-[200px] opacity-60" />
        <div className="absolute -top-32 left-1/3 w-[800px] h-[600px] bg-primary/10 rounded-full blur-[180px] opacity-50" />
      </div>

      <div
        className="relative flex flex-col items-center"
        style={{
          transition:
            "opacity 1400ms cubic-bezier(0.16,1,0.3,1), transform 1400ms cubic-bezier(0.16,1,0.3,1)",
          opacity: phase === "in" ? 1 : 1,
          transform: "scale(1)",
          animation: PREFERS_REDUCED_MOTION
            ? undefined
            : "splash-logo-in 1400ms cubic-bezier(0.16,1,0.3,1) both",
        }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-accent/20 blur-3xl rounded-full" />
          <img
            src={logoImage}
            alt="CardSurgery"
            className="relative w-32 h-32 md:w-44 md:h-44 object-contain drop-shadow-[0_0_40px_hsla(22,55%,55%,0.55)]"
          />
        </div>
        <p
          className="mt-6 text-xs md:text-sm uppercase font-semibold text-accent"
          style={{ letterSpacing: "0.28em" }}
        >
          Card<span className="text-foreground">Surgery</span>
        </p>
      </div>

      <style>{`
        @keyframes splash-logo-in {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Enter;
