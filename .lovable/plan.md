## Goal
Ship the Card Surgery customer + admin experience to production quality: pixel-perfect responsive, real Stripe payments after admin validation, branded email link, FR/EN switcher with geo-detect, and a fuller admin control center.

## Phasing

I'll deliver in 5 phases, each independently shippable. You can stop after any phase.

---

### Phase 1 — Tracking + workflow data model (foundation for everything)

The current `dossiers.status` enum doesn't match your 5 stages and `ref` is `CS-XXXXXX`. I'll align both.

**Schema migration:**
- New status enum values (mapped from old):
  - `request_sent` (Demande envoyée) — replaces `pending_review`
  - `diagnostic_in_progress` (Diagnostic en cours) — new transition state
  - `awaiting_payment` (Prêt pour paiement) — replaces `approved`
  - `surgery_in_progress` (Chirurgie en cours) — replaces `paid`
  - `shipped` (Expédiée) — replaces `completed`
  - Keep `rejected`
- Tracking ref format: `CS-2026-XXXX` (4 hex chars, collision-checked in `create_dossier`)
- Add `return_tracking_number text`, `return_carrier text`, `payment_link_url text`, `payment_link_expires_at timestamptz`, `paid_at timestamptz`, `validated_at timestamptz` to `dossiers`
- New SECURITY DEFINER RPCs: `admin_validate_dossier(ref, notes)` → sets `awaiting_payment`, generates payment link, triggers email; `admin_mark_shipped(ref, tracking, carrier)`; `admin_update_pricing(ref, pack_price_cents, insurance_cents)` for custom cases

---

### Phase 2 — Stripe checkout + branded email

**Stripe (Lovable-managed seamless):**
- Enable Lovable Payments → Stripe. Requires Pro plan. Test mode immediately, real money after you verify your business.
- One product per pack: `clean` (19€), `pro` (39€), `full` (95€). Insurance is added as a separate line item with the per-dossier amount (multi-leg doubled for Full Surgery).
- Edge function `create-dossier-checkout(ref)` — admin-only or signed-token-only call → returns Stripe Checkout URL valid 7 days, stores on dossier.
- Webhook `stripe-webhook` → on `checkout.session.completed` for dossier ref: set status → `surgery_in_progress`, fill `paid_at`, unlock shipping instructions page.

**Email (Lovable Emails on your domain):**
- Set up email domain `cardsurgery.com` (you'll add DNS records — Lovable provisions automatically).
- Auth email templates (signup, password reset, magic link) re-skinned in your brand.
- Transactional email `dossier-awaiting-payment` triggered by `admin_validate_dossier` → contains pack summary, declared value, insurance breakdown, **secure Stripe link**, and shipping instructions teaser.
- Second transactional `dossier-shipped` triggered on `admin_mark_shipped` with carrier + tracking link.

---

### Phase 3 — Auth + RBAC + customer dashboard

**Already partly built:** `Auth.tsx`, Google OAuth, `has_role` SECURITY DEFINER, admin email `contact@cardsurgery.com`. I'll finish the loop:

- Navbar: add minimalist **Connexion / Mon compte** button. When logged in → avatar dropdown with `/my-dossiers`, sign-out, and if admin → `/admin`.
- `/my-dossiers` page — list of the user's dossiers grouped by status with timeline component (5 steps), photos preview, pay-now CTA when `awaiting_payment`, shipping instructions when `surgery_in_progress`, return tracking when `shipped`.
- Route guards: redirect-to-/auth on protected pages, admin-only guard on `/admin/*`.
- On signup/login, auto-attach orphan dossiers (where `user_id IS NULL AND email = user.email`) via SECURITY DEFINER `claim_dossiers_by_email()`.

---

### Phase 4 — Admin control center

Extend existing `AdminDossiers`:
- Filter chips by the 5 statuses + search by ref/email
- Row actions: **Valider l'intervention** → opens dialog (review photos, override pack price + insurance, set notes) → calls `admin_validate_dossier` → email goes out automatically
- Row actions for `surgery_in_progress`: **Marquer expédiée** → tracking number + carrier dropdown (La Poste / Chronopost / Mondial Relay) → email
- Quick stats header: counts per status, total revenue this month (from `paid_at` + `pack_price`)
- Audit log writes through existing `log_admin_action` on every state change

---

### Phase 5 — i18n shell + responsive polish

**i18n (engine only, strings deferred):**
- `react-i18next` + `i18next-browser-languagedetector`
- Detection order: `localStorage` → navigator language → fallback `en`
- IP geo via Cloudflare's `CF-IPCountry` request (works on cardsurgery.lovable.app + custom domain) through a tiny `/api/geo` edge function, used only when no localStorage value exists
- Default FR for FR/BE/CH/LU/MC/CA-QC, EN otherwise
- Navbar switcher (FR/EN) writing to `localStorage.cs_lang`
- One namespace `common.json` seeded with current FR strings + machine-translated EN placeholders, then I migrate Hero/Navbar/Footer/Pricing/Diagnostic/Tracking/Payment/FAQ as a starter
- `<HtmlLangSync/>` + dynamic `<title>`/`<meta description>` via react-helmet-async per page

**Responsive polish (customer funnel + admin):**
- Replace ad-hoc `px-*` with a `container-page` utility (max-w-6xl, fluid `px-4 sm:px-6 lg:px-8`)
- Fluid type scale via `clamp()` for h1/h2/h3 in `index.css`
- Audit Hero, Pricing/Forfaits cards, Diagnostic stepper, Tracking timeline, Payment summary, FAQ accordion, Navbar (mobile sheet), Footer, AdminHub/Dossiers tables (horizontal scroll wrappers + responsive cards on mobile)
- 44px min tap targets, no horizontal overflow (`overflow-x-hidden` on `body`), safe-area insets on iOS

---

## Technical notes

- **Stripe is Lovable-managed seamless** — no `STRIPE_SECRET_KEY` needed from you; Lovable provisions it. Pro plan required; if you're not on Pro yet you'll be prompted during enable.
- **Email domain**: I'll trigger the Lovable Emails setup dialog for `cardsurgery.com`. You'll click through, add NS records at your registrar (or accept the in-Lovable DNS if the domain was bought through Lovable), and the rest is automatic.
- **No breaking changes to existing dossiers**: the migration maps old statuses to new ones in a `CASE`, and old `CS-XXXXXX` refs continue to work alongside new `CS-2026-XXXX` ones.
- **i18n strings are deferred**: the engine lands now; I migrate the customer-funnel strings as part of Phase 5 but the rest of the site stays in its current FR copy until you ask for the EN pass.

## Open question before I start Phase 2

Are you on a **Lovable Pro plan**? Lovable-managed Stripe requires Pro. If not, I'll do Phase 1 + 3 + 4 + 5 first and you can flip Stripe on later — the `awaiting_payment` flow will use a placeholder link until then.
