import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./i18n/config";

// Preview-safe Service Worker handling
const host = window.location.hostname;
const isLovablePreview = host.endsWith('lovableproject.com') || host.endsWith('lovable.app');

if (isLovablePreview) {
  // Ensure no SW interferes with the embedded preview
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((regs) => regs.forEach((r) => r.unregister())).catch(() => {});
  }
  if (typeof caches !== 'undefined') {
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k)))).catch(() => {});
  }
} else if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  // Manual PWA registration only on non-preview domains
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
