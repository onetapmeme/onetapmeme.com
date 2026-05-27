## Part A — Payment & Case-Handling Architecture Audit

### Current blueprint (what is actually deployed)

```
Diagnostic (anonymous OK)
  └─► RPC create_dossier  →  dossiers row, status = pending_review
                              ref = CS-YYYY-XXXX
                              email "dossier-received" + admin alert sent

Admin validates dossier
  └─► RPC admin_validate_dossier → status = approved
                                   (pack_price, insurance_cents stored)

User account / Tracking screen ("Diagnostic validé – paiement requis")
  └─► /payment?ref=CS-…  →  src/pages/Payment.tsx
        └─► <StripeDossierCheckout>  (embedded iframe)
              └─► edge fn create-dossier-checkout
                    • Resolves Stripe price via lookup_keys
                      (pack_clean | pack_pro | pack_full +
                       insurance_tier_1…5)
                    • Builds line_items server-side from dossier row
                    • stripe.checkout.sessions.create
                        ui_mode:"embedded_page"
                        metadata:{ dossierRef, insuranceTierIndex, qty }
                    • Returns clientSecret

User pays inside iframe → Stripe → return_url
  └─► /checkout/return?ref=…&session_id=…
        • Polls dossier every 2 s up to 30 s
        • Stripe sends webhook in parallel

Stripe webhook (verified, HMAC SHA-256)
  └─► edge fn payments-webhook?env=sandbox|live
        • checkout.session.completed / async_payment_succeeded
        • Reads metadata.dossierRef
        • RPC confirm_dossier_payment(ref, session_id)
             status → paid, paid_at = now, stripe_session_id stored
             idempotent on session_id
```

### Operational status matrix

| Component | Status | Stack |
| --- | --- | --- |
| Secure payment gateway connection | 100 % production ready (sandbox today, live keys auto-on at publish) | Stripe via Lovable connector gateway, `_shared/stripe.ts`, embedded checkout, `STRIPE_SANDBOX_API_KEY` / `STRIPE_LIVE_API_KEY` secrets present |
| Dynamic order total passing | 100 % — **server-authoritative** | Edge fn re-reads dossier-derived lookup_keys (`pack_*`, `insurance_tier_*`); amounts come from Stripe Prices, never from the client |
| Real-time payment validation | 100 % (sandbox) | `checkout.session.completed` + `payment_status === "paid"` gate |
| Secure webhook for state updates | 100 % | `payments-webhook` deployed, `verify_jwt=false`, HMAC-verified against `PAYMENTS_SANDBOX_WEBHOOK_SECRET` / `PAYMENTS_LIVE_WEBHOOK_SECRET`, env routed via `?env=` |
| Post-payment DB record update | 100 % | SECURITY DEFINER `confirm_dossier_payment(ref, session_id)` flips `approved/received → paid`, idempotent |
| Post-payment email notification | **Partially wired — bug** | Customer "Paiement reçu" template exists (`dossier-paid.tsx`) but the **webhook never sends it**. Only the dev-only `fakePay()` button triggers `sendDossierEmail(ref,"paid")`. Real Stripe payments leave the customer without a paid-confirmation email. |
| Stripe products in dashboard | **Unknown — must verify** | Code expects 8 lookup_keys: `pack_clean`, `pack_pro`, `pack_full`, `insurance_tier_1..5`. If any are missing the edge fn throws `"Pack price not found in Stripe"`. |

### Required to go live

1. Verify all 8 Stripe products/prices exist with the exact `lookup_key` values above. If not, create them via `payments--batch_create_product` (one-time, sandbox; auto-mirrored to live at publish).
2. Add the missing **paid-email dispatch inside the webhook** (single insert into the queue). No frontend change needed.
3. Add `dossier-received` admin/customer fallback inside the webhook for `async_payment_succeeded` paths (already covered, just confirm logs).
4. `RESEND_API_KEY` is set ✓; `STRIPE_*_WEBHOOK_SECRET` set ✓; webhook URL is auto-registered by Lovable Payments — nothing to configure manually.
5. At publish, Lovable swaps to `pk_live_*` + `STRIPE_LIVE_API_KEY` automatically.

### Build-mode fixes (Part A)

1. **`supabase/functions/payments-webhook/index.ts`** — after the successful `confirm_dossier_payment` RPC, enqueue the customer `dossier-paid` email (idempotency key `dossier-paid-<ref>-<sessionId>`) by inserting into `pgmq` via the `enqueue_email` RPC. No retries needed — the queue + suppression handles delivery.
2. **`src/pages/Payment.tsx`** — keep the embedded checkout, remove the dead `fakePay()` button path (it was only used as a sandbox shortcut and now competes with the real flow).
3. **One-time script (build mode)** — call `payments--batch_create_product` to ensure `pack_clean / pack_pro / pack_full / insurance_tier_1..5` exist with the correct EUR amounts (pull amounts from `service_pricing` + `grading_pricing` tables already in DB). Tax code `txcd_20030000` (physical services) for packs, `txcd_99999999` for insurance lines.

---

## Part B — UI/UX optimization pass (5 chantiers)

### Chantier 1 — Footer: mobile compact accordion + 2-col fallback
- File: `src/components/Footer.tsx`.
- Below `md`, render the three link blocks (Services / CardSurgery / Légal & Contact) as a Radix `Accordion` (single-collapse, `+` icon rotates to `×`).
- Above `md`, keep the current 4-column grid.
- Move the brand/tagline above the accordion on mobile, contact + socials in a permanent (non-accordion) block.
- Copyright + non-affiliation line: `mt-8 pt-6 border-t text-[11px] opacity-60`.

### Chantier 2 — Spacing harmonization + safe-scroll
- File: `src/index.css`.
  - Replace the `section { @apply py-10 }` mobile override with a unified token: `section { @apply py-12 md:py-16; }`.
  - Add `:root { --nav-h: 5rem; }` and bump to `5.5rem` when scrolled.
  - Update `[id] { scroll-margin-top: var(--nav-h); }` and `html { scroll-padding-top: var(--nav-h); }`.
- Files with hero/title wrappers (`Hero.tsx`, page `<main>` wrappers in `Pricing.tsx`, `Diagnostic.tsx`, `Booking.tsx`, `Tracking.tsx`, `FAQ.tsx`, `Gallery.tsx`): replace ad-hoc `pt-28` / `pt-32` with `pt-[calc(var(--nav-h)+1.5rem)]`.

### Chantier 3 — Slider badges + Instagram tiles
- `src/components/cards/BeforeAfterSlider.tsx`:
  - Both badges → `glass-effect bg-black/35 backdrop-blur-md text-white border border-white/15 shadow-[0_2px_10px_rgba(0,0,0,0.35)]`, keep tracking and size.
  - Keep accent ring on the AFTER badge via a thin `ring-1 ring-accent/40`.
- `src/components/MediaSection.tsx` (Instagram grid):
  - Each tile: `rounded-2xl ring-1 ring-border/60 shadow-[0_6px_18px_-10px_hsla(20,35%,16%,0.25)] overflow-hidden transition-transform duration-300 hover:scale-[1.02]`.
  - Empty/skeleton tiles get a faint diagonal gradient + 1 px inset border instead of flat gray.

### Chantier 4 — Mobile sidebar language router cleanup
- File: `src/components/Navbar.tsx` (Sheet content).
- Delete the 3-flag mini-grid AND the separate `<LanguageSwitcher inline />` from the sidebar.
- Replace with a single 4×2 grid of text-only locale buttons: `FR · EN · DE · ES · RU · ZH · PT · JA`.
- Active state: filled accent, others outlined. On click → `i18n.changeLanguage(code)` and close the sheet. (i18next-browser-languagedetector already persists to localStorage.)
- The desktop `<LanguageSwitcher inline />` in the header stays untouched.

### Chantier 5 — Desktop floating navbar + mouse-wheel fix
- File: `src/index.css`.
  - The only `overflow-y: hidden` rules are scoped to `html, body { overflow-x: hidden }` (X only) and the `.glossy-btn { overflow: hidden }` inside the button — neither blocks wheel scroll. The likely culprit is page-level wrappers using `h-screen overflow-hidden`. Audit `Index.tsx`, `Hero.tsx`, `LoadingScreen.tsx`, `LoadingScreenV2.tsx` and remove any persistent `overflow-hidden` on the outermost desktop wrapper. Confirm `body { overscroll-behavior-y: none }` stays (it does NOT block wheel scroll, only rubber-band).
- File: `src/components/Navbar.tsx`.
  - Desktop (`lg` and up): keep the floating capsule shape, but restructure into a strict 3-column grid `[logo | nav | cta+lang]` so the centre nav stays perfectly centred regardless of CTA width:
    - Left: logo + word-mark.
    - Centre: NAV_ITEMS (`Services · Galerie · Diagnostic · Réservation · Suivi · FAQ`), gap-1, pill hover.
    - Right: `LanguageSwitcher` (compact) + gradient CTA "Débuter une opération de restauration" (`glossy-btn rounded-full`).
  - Reveal the CTA at `lg+` (not only `2xl`) — current `hidden 2xl:inline-flex` is what makes the bar look empty/decentered on most desktops.
  - Capsule background: `bg-background/65 backdrop-blur-2xl border border-border/60 rounded-full shadow-[0_8px_30px_-12px_hsla(20,35%,16%,0.18)]`.

### Cross-cutting guarantees
- `max-width: 100vw; overflow-x: hidden` already present on `html, body, #root` — keep.
- All animated transitions use the existing `cubic-bezier(0.22, 1, 0.36, 1)` token (`.ease-apple`) at `duration-300`.

### Technical notes (non-user-facing)
- No DB migration needed; only an optional one-time Stripe product sync via `payments--batch_create_product`.
- No new edge functions; modify `payments-webhook` only.
- No new translation keys for the navbar language grid (locale codes are universal); existing keys cover footer accordion headers.
- Out of scope: receipt PDF redesign, Stripe go-live KYC walkthrough, swapping Stripe for another PSP.
