import { useEffect, useState } from "react";

const KEY = "cardsurgery_saved_count";
const EVENT = "cardsurgery:saved-count-changed";
const BASE = 127;

function read(): number {
  if (typeof window === "undefined") return BASE;
  const raw = localStorage.getItem(KEY);
  const n = raw ? parseInt(raw, 10) : NaN;
  return Number.isFinite(n) && n >= BASE ? n : BASE;
}

export function incrementSavedCards(by = 1) {
  if (typeof window === "undefined") return;
  const next = read() + by;
  localStorage.setItem(KEY, String(next));
  window.dispatchEvent(new CustomEvent(EVENT, { detail: next }));
}

export function useSavedCardsCounter() {
  const [count, setCount] = useState<number>(() => read());

  useEffect(() => {
    const onChange = () => setCount(read());
    window.addEventListener(EVENT, onChange);
    window.addEventListener("storage", onChange);
    return () => {
      window.removeEventListener(EVENT, onChange);
      window.removeEventListener("storage", onChange);
    };
  }, []);

  return count;
}
