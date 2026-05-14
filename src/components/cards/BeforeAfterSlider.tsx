import { useRef, useState, useCallback } from "react";
import { GripVertical } from "lucide-react";

interface Props {
  before: string;
  after: string;
  alt?: string;
}

const BeforeAfterSlider = ({ before, after, alt = "Avant / Après restauration" }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

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
    <div
      ref={containerRef}
      className="relative w-full aspect-[3/4] overflow-hidden rounded-lg border border-border bg-muted select-none touch-none"
      onPointerMove={onPointerMove}
    >
      <img src={after} alt={`${alt} — après`} className="absolute inset-0 w-full h-full object-cover" />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pos}%` }}
      >
        <img
          src={before}
          alt={`${alt} — avant`}
          className="absolute inset-0 h-full object-cover"
          style={{ width: `${(100 / pos) * 100}%`, maxWidth: "none" }}
        />
        <span className="absolute top-3 left-3 bg-foreground/80 text-background text-xs font-bold px-2 py-1 rounded">
          AVANT
        </span>
      </div>
      <span className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">
        APRÈS
      </span>
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-accent shadow-lg"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
      >
        <button
          type="button"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          aria-label="Glisser pour comparer"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-xl cursor-ew-resize hover:scale-110 transition"
        >
          <GripVertical className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
