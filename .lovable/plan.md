## Scope clarifications (please confirm)

A few items in the brief don't map cleanly to the current code. I want to flag them before touching files:

1. **`/` is already a splash (`src/pages/Enter.tsx`)** — a manual click-to-enter screen that plays `/sounds/enter.wav` then navigates to `/home`. Chantier 0 asks for an **auto-dismissing** splash with a 2200 ms timer + fade/slide-out. I will refactor `Enter.tsx` into the described auto-dismiss overlay (no double splash). The "bind sound to first interaction" rule will be respected: we'll attempt `audio.play()` once, and if the browser blocks it, attach a one-shot `pointerdown` listener — no console errors either way.

2. **`src/components/Hero.tsx` is the legacy 1TAP token hero** with a saturated blue CTA. It is **not rendered on `/home`** — `/home` uses `src/components/cards/CardHome.tsx` (already on the copper/bronze `glossy-btn`). So Chantier 1 on the active home is essentially already done. I'll:
   - Audit `CardHome.tsx` + `Navbar.tsx` mobile CTAs and confirm every primary action uses `glossy-btn` (copper/bronze gradient).
   - Leave `Hero.tsx` alone (it's dead on the production routes) unless you want it cleaned up too — say the word and I'll do it.

3. **Sidebar locale grid is already 4×2 with all 8 locales** (`fr en de es ru zh pt ja`). Chantier 5 asks for a horizontal text array with dividers — I'll convert the existing grid to that single-row `FR | EN | DE | …` strip.

4. **⚠️ Regression to fix from the previous security pass** — the recent hardening made `trigger-dossier-email` require an **admin JWT** for the `admin-new` kind. But `notifyAdminNewDossier()` is called from the **public, anonymous** diagnostic submission flow, so admin notifications now 401-fail. Fix: keep `admin-new` callable without a JWT, but lock it down by requiring the dossier to be < 5 minutes old (single-shot post-creation notification) and per-ref dedupe — no admin spoofing possible. Customer-status kinds (`approved/rejected/paid/shipped`) stay admin-only.

If any of the above is wrong, tell me before I implement.

---

## Implementation plan

### Chantier 0 — Auto-dismissing splash on `/`
- **File:** `src/pages/Enter.tsx` (refactor existing splash, do NOT add a second overlay).
- Replace click-to-enter with a programmatic overlay: `fixed inset-0 z-[9999] bg-[#FDFBF7]`.
- Logo: opacity 0→1, scale 0.95→1, 1400 ms `cubic-bezier(0.16,1,0.3,1)`.
- At 2200 ms: attempt to play `/sounds/enter.wav` (volume 0.5). If `play()` rejects (autoplay policy), attach a one-shot `pointerdown`/`keydown` listener and silently drop the error so the console stays clean.
- Fade-out: opacity→0 + `translate-y-[-20px]` over 800 ms, then `navigate('/home', { replace: true })`.
- Lock `body.overflow = 'hidden'` during the animation, restore on unmount.
- Respect `prefers-reduced-motion`: skip animation, navigate after 400 ms.

### Chantier 1 — Kill saturated blue on active home CTAs
- Audit `src/components/cards/CardHome.tsx` for any non-`glossy-btn` primaries → swap to `glossy-btn`.
- Sweep `Navbar.tsx` mobile menu CTA: already `glossy-btn`, verify text contrast.
- Skip `src/components/Hero.tsx` (legacy 1TAP, not mounted on `/home`).

### Chantier 2 — Floating capsule navbar + desktop scroll recovery
- **File:** `src/components/Navbar.tsx`
  - Tighten the desktop (`lg:`) layout to the exact 3-column floating capsule: `fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-6xl z-50 bg-background/80 backdrop-blur-md border border-accent/10 shadow-lg rounded-full px-8 py-3` (mapped to design tokens — no raw `#FDFBF7` / `#A3704C`).
  - Symmetric grid: `lg:grid-cols-[1fr_auto_1fr]` so logo (left), nav links (centered), CTA + lang + avatar (right) are perfectly balanced.
  - Keep the existing scroll-shrink behavior on the same capsule.
- **File:** `src/index.css`
  - Audit `html, body, #root` rules. `overflow-x: hidden` is set globally (fine for horizontal lockout). Add a `@media (min-width:1024px) { html, body { overflow-y: auto; touch-action: auto; } }` guard to make sure no library or theme accidentally clamps desktop vertical scroll, and verify nothing sets `overflow: hidden` on `<html>`/`<body>` at desktop widths.

### Chantier 3 — Mobile footer compactness
- **File:** `src/components/Footer.tsx`
  - Mobile already uses Radix accordions (good). Polish:
    - Convert the always-visible mobile contact/socials block into a clean separated row with `border-t border-border/40 mt-4 pt-4`.
    - Bottom legal/copyright: `mt-8 pt-6 border-t border-border text-center text-xs opacity-60 font-light tracking-wide` (already close — finalize spacing).
  - Optionally add a compact 2-col grid fallback for very small viewports where users prefer no accordions — keep accordions as the default per existing pattern unless you want the grid swap.

### Chantier 4 — Slider badges + Instagram tiles refinement
- **File:** `src/components/cards/BeforeAfterSlider.tsx`
  - Replace existing AVANT/APRÈS badges with: `bg-black/35 backdrop-blur-[6px] border border-white/15 text-white tracking-widest text-xs px-3 py-1.5 rounded-md font-medium shadow-md`.
- **File:** `src/components/cards/SocialProof.tsx`
  - IG tiles: add `ring-1 ring-inset ring-white/10` + `shadow-[0_6px_20px_-12px_hsla(20,35%,16%,0.35)]` + already has `hover:scale-[1.02] transition-transform duration-300`. Confirm and tighten.

### Chantier 5 — Mobile drawer language router
- **File:** `src/components/Navbar.tsx`
  - Replace the 4×2 locale grid with a single horizontal strip pinned to the bottom of the `SheetContent`:
    ```
    <div className="mt-auto pt-6 border-t border-border/60">
      <div className="flex items-center justify-center gap-0 text-[11px] uppercase tracking-[0.2em] font-semibold">
        {SIDEBAR_LOCALES.map((code, i) => (
          <>
            <button … className={active ? 'text-accent' : 'text-foreground/60 hover:text-foreground'}>{code}</button>
            {i < last && <span className="px-2 text-border">|</span>}
          </>
        ))}
      </div>
    </div>
    ```
  - Convert `SheetContent` children to `flex flex-col h-full` so `mt-auto` pins the language strip to the bottom.
  - Remove any leftover flag/`LanguageSwitcher` instances inside the sheet (none currently — confirm during edit).

### Extra architecture
- `[id] { scroll-margin-top: var(--nav-h) }` is already in `index.css` — verify `--nav-h` matches the new capsule height (top offset 24 px + capsule ~64 px → set `--nav-h: 6.5rem` on `lg`).
- `max-width: 100vw` + `overflow-x: hidden` already enforced on `html, body, #root` — no change needed.
- Section vertical rhythm: `section { @apply py-12 md:py-16 }` already standardized. Keep.

### Security regression fix (admin-new email)
- **File:** `supabase/functions/trigger-dossier-email/index.ts`
  - Remove `admin-new` from `ADMIN_ONLY_KINDS`.
  - Add a guard: for `kind === 'admin-new'`, fetch the dossier and require `created_at > now() - 5 minutes` AND no prior admin-new send (track via an in-memory per-ref dedupe with a 1-hour TTL, plus the existing per-IP rate limit). Anyone forging it later or repeatedly is blocked.
  - Customer kinds (`approved/rejected/paid/shipped`) remain admin-JWT only.
- Redeploy `trigger-dossier-email`.

### Verification
1. Submit a dossier from the public diagnostic flow as an anonymous visitor.
2. Confirm in `email_send_log` two rows appear: `dossier-received` (customer) and `admin-new-dossier` (admin).
3. Re-attempt `admin-new` from outside the 5-minute window → expect 403.
4. Re-attempt `approved` without an admin JWT → expect 401/403.
5. Manually scroll the desktop preview with mousewheel/trackpad to confirm Chantier 2 scroll recovery.
6. Inspect splash on `/` in a fresh tab: animation timing, console clean of autoplay errors, body scroll restored after unmount.

---

## Technical notes (for reference)

- All raw hex literals from the brief (`#FDFBF7`, `#A3704C`) will be mapped to existing HSL tokens (`background`, `accent/10`) to keep theming consistent — no inline hex in components.
- No new dependencies. No schema changes. No migration needed for the email-trigger fix (logic-only inside the edge function).
- Files touched: `src/pages/Enter.tsx`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `src/components/cards/CardHome.tsx`, `src/components/cards/BeforeAfterSlider.tsx`, `src/components/cards/SocialProof.tsx`, `src/index.css`, `supabase/functions/trigger-dossier-email/index.ts`.
