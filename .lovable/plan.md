# Production-Launch Sweep — 7 Chantiers (CardSurgery)

Tight, surgical pass. Scope is the CardSurgery customer journey (Home, Diagnostic, Tracking, Payment, AdminDossiers) plus the email + Stripe glue. Legacy 1TAP gaming pages (Token, Crafting, Inventory, Achievements, Security, Tap*, Drop*, etc.) are **out of scope** for the blue purge — they are not linked from CardSurgery nav and rewriting them risks breaking unrelated views.

---

## CHANTIER 0 — Splash overlay (already in place, audio removal handled in §7)

`src/pages/Enter.tsx` already implements the curtain: `fixed inset-0 z-[9999] bg-background`, 1400 ms logo fade/scale-in, 2200 ms hold, 800 ms `opacity 0` + `translateY(-20px)` fade-out, then `navigate('/home', { replace: true })`. Body scroll lock was correctly removed in the previous scroll-fix pass. **No structural change needed** — only the audio block is being removed (§7).

## CHANTIER 1 — CTA harmonization (scoped to CardSurgery surfaces)

Audit and harmonize only the CardSurgery-facing components/pages:

- `src/pages/Tracking.tsx` line 81 — "Rechercher" button uses `bg-accent hover:bg-accent/90`; swap to `glossy-btn text-accent-foreground border-0`.
- `src/pages/AdminDossiers.tsx` line 37 — `paid: "bg-blue-500/20 text-blue-700 dark:text-blue-300"` → `bg-accent/15 text-accent`. Same file: check for any other hex/blue badges and route them through the accent token.
- `src/pages/AdminBookings.tsx` line 22 — `confirmed: "bg-blue-500/20 ..."` → `bg-accent/15 text-accent`.
- `src/components/PaymentTestModeBanner.tsx`, `src/pages/Payment.tsx`, `src/pages/Diagnostic.tsx`, `src/pages/Booking.tsx`, `src/pages/Pricing.tsx`, `src/pages/MyDossiers.tsx`, `src/pages/Gallery.tsx`, `src/pages/FAQ.tsx`, `src/components/cards/CardHome.tsx`, `src/components/cards/FAQAssistant.tsx`, `src/components/Footer.tsx`, `src/components/Navbar.tsx` — verify primary CTAs already use `glossy-btn`; replace any stray `bg-accent` / `bg-primary` solid CTAs.

Legacy 1TAP gaming files keep their existing palette (not user-facing on the CardSurgery site).

## CHANTIER 2 — Floating navbar + desktop scroll

Both already shipped in the previous turn (`Navbar.tsx` floating capsule with `1fr_auto_1fr` grid, `glossy-btn` desktop CTA, language strip pinned to bottom of mobile sheet; `index.css` scroll lock removed, body `overflow-x: clip`). **No change** — verification only.

## CHANTIER 3 — Footer mobile 2-col grid + slider badges + sidebar locales

- `src/components/Footer.tsx` — mobile (<768 px) currently uses Accordion. Replace the `<div className="md:hidden">` accordion block with a **2-column grid** (`grid grid-cols-2 gap-x-6 gap-y-8 text-sm`): col 1 = Services + Brand links stacked; col 2 = Legal links + contact email + social icons. Keep the brand block above and the copyright strip below unchanged.
- Slider badges (`BeforeAfterSlider.tsx`) and sidebar locales strip — already shipped in the previous turn.

## CHANTIER 4 — 7-state tracking engine + realtime dashboard

### 4a. Database migration (single migration)

Existing enum `dossier_status` has: `pending_review, approved, rejected, paid, received, in_surgery, shipped`. Target set: `requested, received, payment_required, paid, in_surgery, quality_control, shipped` (+ keep `rejected`).

Approach — non-destructive enum extension, then data backfill, then RPC update:

1. `ALTER TYPE public.dossier_status ADD VALUE IF NOT EXISTS 'requested';`
2. `ALTER TYPE public.dossier_status ADD VALUE IF NOT EXISTS 'payment_required';`
3. `ALTER TYPE public.dossier_status ADD VALUE IF NOT EXISTS 'quality_control';`
   *(Enum `ADD VALUE` must run outside a txn block, so the migration tool emits each statement separately.)*
4. Backfill: `UPDATE public.dossiers SET status = 'requested' WHERE status = 'pending_review';` and `... SET status = 'payment_required' WHERE status = 'approved';`.
5. `ALTER TABLE public.dossiers ALTER COLUMN status SET DEFAULT 'requested'::dossier_status;`
6. Update `create_dossier` (insert default), `admin_validate_dossier` (target = `payment_required` instead of `approved`), and `confirm_dossier_payment` (guard now `current.status NOT IN ('payment_required','received')`). Keep old values readable but no new writes.
7. Add `public.dossiers` to `supabase_realtime` publication and set `REPLICA IDENTITY FULL` so customer dashboards receive live status updates.

### 4b. Frontend types & UI

- `src/lib/dossiers.ts` — `DossierStatus` becomes `"requested" | "received" | "payment_required" | "paid" | "in_surgery" | "quality_control" | "shipped" | "rejected"`. Update `STATUS_LABEL_FR`, `STATUS_STEP_INDEX` (linear 0…6), `WORKFLOW_STEPS`. Extend `sendDossierEmail` kind union to the full new set.
- `src/pages/Tracking.tsx` — rebuild `STAGES` to the 7 stages with luxury icons (`FileText, PackageCheck, CreditCard, ShieldCheck, Scissors, Sparkles, Truck`). Replace the deprecated `status === "approved"` and `status === "pending_review"` branches with `payment_required` / `requested` equivalents. Subscribe via `supabase.channel('dossier-' + ref).on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'dossiers', filter: 'ref=eq.' + ref }, ...)` to re-render on admin status mutations.
- `src/pages/MyDossiers.tsx` — already reads from `STATUS_LABEL_FR/WORKFLOW_STEPS`, so it picks up the new labels for free.
- `src/pages/AdminDossiers.tsx` — extend the status `<Select>` and the colour map with `requested`, `payment_required`, `quality_control`. Wire each transition to fire its email kind (see §5).

## CHANTIER 5 — Transactional emails across every transition

### 5a. New / renamed templates

Under `supabase/functions/_shared/transactional-email-templates/`:

- Rename intent of `dossier-approved.tsx` → keep the file as legacy and add a new **`dossier-payment-required.tsx`** with FR copy: *"Votre diagnostic est disponible. Connectez-vous à votre espace pour valider l'opération et procéder au paiement sécurisé."* + CTA button to `/payment?ref=…`.
- New **`dossier-in-surgery.tsx`** — *"Vos cartes sont actuellement entre les mains de nos experts sous hotte à flux laminaire."*
- New **`dossier-quality-control.tsx`** — *"Opération terminée avec succès. Vos cartes passent l'étape du contrôle qualité final."*
- Tighten copy on existing `dossier-received.tsx` to the brief's exact text.
- All templates inherit the bronze/cream visual identity (Playfair heading, Inter body, `#FDFBF7` bg, copper button) used by existing templates.
- Update `registry.ts` to export all six customer templates + admin-new.

### 5b. Edge function

`supabase/functions/trigger-dossier-email/index.ts` — extend `ALLOWED_KINDS` and `ADMIN_ONLY_KINDS` to the new kinds (`payment-required`, `in-surgery`, `quality-control`, plus existing `received/paid/rejected/shipped`). `admin-new` keeps its anonymous-but-fresh+dedupe guard. Switch template-name lookup to map kind → template (`payment-required` → `dossier-payment-required`, etc.).

### 5c. Wiring

- `src/pages/Diagnostic.tsx` already fires `received` + `admin-new` on submission. Update the first kind to **`received`** content matches "Vos cartes sont bien arrivées au laboratoire" only when status really becomes `received`; on `requested` we send an intake confirmation (new kind `requested` → reuse `dossier-received` body adapted, OR add a `dossier-requested.tsx`). Decision: add **`dossier-requested.tsx`** with the intake copy + tracking ref, and trigger it from the Diagnostic submit flow. `received` is then fired by admin when the parcel physically arrives.
- `src/pages/AdminDossiers.tsx` — when the admin changes status, automatically map → email kind:
  ```
  requested        → dossier-requested
  received         → dossier-received
  payment_required → dossier-payment-required   (also via adminValidateDossier)
  paid             → dossier-paid               (also fired by Stripe webhook)
  in_surgery       → dossier-in-surgery
  quality_control  → dossier-quality-control
  shipped          → dossier-shipped            (also via adminMarkShipped)
  rejected         → dossier-rejected
  ```
- `supabase/functions/payments-webhook/index.ts` — already sends `dossier-paid`. No change.

## CHANTIER 6 — Stripe live bridge

Already implemented: `create-dossier-checkout` reads price server-side from the dossier row via RPC, creates embedded checkout session with `metadata.dossierRef`, returns `client_secret`. `payments-webhook` verifies signature, calls `confirm_dossier_payment` RPC, sends `dossier-paid` email. `verify_jwt = false` already set in `supabase/config.toml`. **No code change**.

### Live-launch env checklist (already configured via Lovable Cloud; verify before go-live)

| Variable | Where | Source |
|---|---|---|
| `STRIPE_SANDBOX_API_KEY` | Edge function secrets | auto by Lovable Cloud (sandbox) |
| `STRIPE_LIVE_API_KEY` | Edge function secrets | written after Stripe go-live claim |
| `PAYMENTS_SANDBOX_WEBHOOK_SECRET` | Edge function secrets | auto |
| `PAYMENTS_LIVE_WEBHOOK_SECRET` | Edge function secrets | auto after go-live |
| `VITE_PAYMENTS_CLIENT_TOKEN` | `.env.production` | `pk_live_…` written by go-live |
| `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` / `SUPABASE_ANON_KEY` | injected | already present |
| `RESEND_API_KEY` | n/a | not used — emails go through Lovable Cloud's transactional infra |

Action required from the user before launch: complete the **Stripe go-live** flow in the Lovable Cloud panel so the live keys + live webhook are provisioned.

## CHANTIER 7 — Remove intro sound

`src/pages/Enter.tsx` — delete `audioRef`, `playedRef`, the `new Audio(...)` block, the `tryPlay` function, the `pointerdown`/`keydown` listeners, and the `chimeTimer`. Keep the `fadeTimer` and `navTimer`. The splash remains silent.

---

## Files touched

- `src/pages/Enter.tsx` (§7)
- `src/pages/Tracking.tsx` (§1, §4b)
- `src/pages/AdminDossiers.tsx` (§1, §4b, §5c)
- `src/pages/AdminBookings.tsx` (§1)
- `src/pages/Diagnostic.tsx` (§5c)
- `src/lib/dossiers.ts` (§4b, §5b)
- `src/components/Footer.tsx` (§3)
- `supabase/functions/trigger-dossier-email/index.ts` (§5b)
- `supabase/functions/_shared/transactional-email-templates/registry.ts` (§5a)
- New: `dossier-requested.tsx`, `dossier-payment-required.tsx`, `dossier-in-surgery.tsx`, `dossier-quality-control.tsx`
- 1 database migration (§4a)

## Verification

1. Submit a dossier as an anonymous visitor → confirm `dossier-requested` (customer) + `admin-new-dossier` (admin) hit `email_send_log`, status = `requested`.
2. From `/admin/dossiers`, walk a dossier `received → payment_required → paid (via Stripe test card 4242…) → in_surgery → quality_control → shipped`. Each transition: customer email lands and `/tracking?ref=…` stepper updates in real time (open second tab, watch it change without reload).
3. Mobile footer (390×844) shows the new 2-col grid; desktop (≥1024 px) unchanged.
4. Splash on `/` plays silently, fades out cleanly to `/home`, body scroll restored.
