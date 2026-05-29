# Scroll Lock Audit — Root Cause & Fix

## Root cause (the smoking gun)

Two compounding issues are trapping the viewport on desktop:

### 1. `Enter.tsx` mutates `document.body.style.overflow = "hidden"` (splash route `/`)
`src/pages/Enter.tsx` lines 17-18 set `body.style.overflow = "hidden"` on mount and restore it via cleanup. Under React 18 **StrictMode** (active in `src/main.tsx`), every effect runs **mount → unmount → mount** in development. The captured `prevOverflow` closure can desync, and any unmount path other than the planned `navigate('/home')` (e.g. fast-refresh, HMR, or the StrictMode double-invoke) leaves `body { overflow: hidden }` as an **inline style**, which beats every CSS rule afterwards. Once the user lands on `/home`, the body is permanently locked.

### 2. `index.css` puts `overflow-x: hidden` on the **`html`** element
`src/index.css` lines ~106-110:
```css
html, body { overflow-x: hidden; max-width: 100vw; }
```
When `overflow-x: hidden` is set on `<html>`, the browser promotes both `html` and `body` to scroll containers and the vertical scroll context becomes ambiguous. Combined with the later `@media (min-width: 1024px) { html, body { overflow-y: auto } }` defensive rule, Chrome/Firefox on desktop can fail to attach wheel events to either container, producing the exact "wheel does nothing" symptom the user reports. The `@media` band-aid added in the previous chantier doesn't actually unblock this — it just masks intent.

`#root` already uses `overflow-x: clip` correctly (line ~115), which is the modern, scroll-safe equivalent.

No Radix Dialog/Sheet is left open by default; `Navbar.tsx` Sheet and `PrivacyDisclaimerModal` are controlled and close cleanly. No smooth-scroll library (Lenis/Locomotive) is installed. The single real hijacker is the body inline style above.

## Fix

### File 1 — `src/index.css`
- **Remove** `overflow-x: hidden` from the `html, body` rule.
- **Replace with** `overflow-x: clip` on **body only** (and keep `max-width: 100vw` on body). `clip` prevents horizontal wobble without creating a scroll container, so vertical wheel/trackpad/keyboard events flow naturally to `<html>`.
- **Delete** the now-redundant `@media (min-width: 1024px) { html, body { overflow-y: auto; touch-action: auto } }` block — it was a workaround for the bug we're removing.
- Keep `#root { overflow-x: clip; max-width: 100vw }` as-is.
- Keep `body { overscroll-behavior-y: none }` (prevents pull-to-refresh bounce, not scroll).

### File 2 — `src/pages/Enter.tsx`
- **Stop mutating `document.body.style.overflow`** entirely. The splash is `fixed inset-0 z-[9999]` and covers the viewport visually, so locking body scroll is cosmetic at best and dangerous in StrictMode/HMR.
- Remove the `prevOverflow` capture, the `body.style.overflow = "hidden"` assignment, and both cleanup restores.
- Keep all other behavior (timers, audio chime, navigate, reduced-motion path) unchanged.

### File 3 — verification only, no edit
- `Navbar.tsx` mobile Sheet, `PrivacyDisclaimerModal`, `CookieBanner` — confirmed controlled, no default-open state, Radix handles its own scroll-lock cleanup. No changes required.

## Multi-device verification matrix

After the patch, manually verify in the preview:
- **Desktop (1752×1306, current viewport)**: mouse wheel + trackpad two-finger + Arrow/Page Down keys all scroll `/home` smoothly top → footer.
- **Tablet (820×1180, portrait & landscape)**: swipe-up scrolls without horizontal drift; section padding rhythm preserved.
- **Mobile (390×844)**: touch-scroll fluid on `/home`, `/diagnostic` wizard steps, and `/booking` — no accidental lock when opening/closing the Navbar Sheet or `PrivacyDisclaimerModal`.
- **Splash `/`**: still visually covers the viewport during the 2.2s in + 0.8s out animation; navigation to `/home` works; no leftover inline `body` style after transition.

## Summary for the report

The scroll axis was being hijacked by **two layered offenders**:
1. `src/index.css` — `overflow-x: hidden` on `<html>` (architecturally wrong; should be `overflow-x: clip` on `<body>` only).
2. `src/pages/Enter.tsx` — inline `document.body.style.overflow = "hidden"` leaking past StrictMode/HMR unmounts.

Both are removed; horizontal wobble protection is preserved via `overflow-x: clip` on body + `#root`.
