import { useEffect, useRef, useState, useCallback } from "react";
import { GripVertical, Loader2 } from "lucide-react";

interface Props {
  before: string;
  after: string;
  alt?: string;
}

const BeforeAfterSlider = ({ before, after, alt = "Avant / Après restauration" }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [loaded, setLoaded] = useState(false);
  const dragging = useRef(false);

  // Preload both images before reveal to avoid flashes / layout shifts
  useEffect(() => {
    let cancelled = false;
    const preload = (src: string) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = src;
      });
    Promise.all([preload(before), preload(after)]).then(() => {
      if (!cancelled) setLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, [before, after]);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    updateFromClientX(e.clientX);
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  return (
    <div className="w-full max-w-full overflow-hidden">
      <div
        ref={containerRef}
        className="relative w-full max-w-full aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-border/60 bg-muted select-none touch-none shadow-[0_10px_40px_-12px_hsla(20,35%,16%,0.22)]"
        onPointerMove={onPointerMove}
      >
        {!loaded && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-muted">
            <div className="absolute inset-0 bg-gradient-to-br from-muted via-background/40 to-muted animate-pulse" />
            <Loader2 className="relative w-8 h-8 text-primary animate-spin" />
          </div>
        )}

        <img
          src={after}
          alt={`${alt} — après`}
          loading="eager"
          decoding="async"
          draggable={false}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${pos}%` }}
        >
          <img
            src={before}
            alt={`${alt} — avant`}
            loading="eager"
            decoding="async"
            draggable={false}
            className={`absolute inset-0 h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
            style={{ width: `${(100 / Math.max(pos, 0.0001)) * 100}%`, maxWidth: "none" }}
          />
          <span className="absolute top-3 left-3 glass-effect uppercase tracking-[0.18em] text-[10px] font-bold px-2.5 py-1 rounded-full text-foreground/90 border border-border/60">
            Avant
          </span>
        </div>
        <span className="absolute top-3 right-3 uppercase tracking-[0.18em] text-[10px] font-bold px-2.5 py-1 rounded-full bg-accent/90 text-accent-foreground border border-accent/40 backdrop-blur-md shadow-[0_4px_14px_-4px_hsla(22,55%,40%,0.45)]">
          Après
        </span>

        {loaded && (
          <div
            className="absolute top-0 bottom-0 w-px bg-accent/90 shadow-[0_0_12px_hsla(22,55%,55%,0.6)] pointer-events-none"
            style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
          >
            <button
              type="button"
              onPointerDown={onPointerDown}
              onPointerUp={onPointerUp}
              aria-label="Glisser pour comparer"
              className="pointer-events-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-[0_8px_24px_-6px_hsla(22,55%,40%,0.55)] ring-4 ring-background/70 cursor-ew-resize hover:scale-110 active:scale-95 transition-transform duration-200"
              style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
            >
              <span className="absolute inset-0 rounded-full bg-accent/40 animate-ping" aria-hidden />
              <GripVertical className="relative w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
