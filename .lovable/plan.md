# Production Finalization Plan — 6 Chantiers

## Chantier 1 — Fix email template resolution

**File:** `supabase/functions/trigger-dossier-email/index.ts`

Replace the dynamic `templateName = \`dossier-${kind}\`` fallback (in the `else` branch of the `admin-new` check) with a lookup against the existing `KIND_TO_TEMPLATE` map:

```ts
templateName = KIND_TO_TEMPLATE[kind];
if (!templateName) throw new Error(`No template mapped for kind: ${kind}`);
```

This unblocks `payment-required`, `in-surgery`, `quality-control` which don't follow the `dossier-<kind>` naming.

---

## Chantier 2 — Multilingual email routing

### 2a. DB migration
- Add `locale text not null default 'fr'` to `public.dossiers`.
- Update RPC `create_dossier` signature to accept `locale_param text default 'fr'` and persist it.

### 2b. Frontend capture
- `src/lib/dossiers.ts → createDossierRemote`: accept `locale`, pass to RPC.
- `src/pages/Diagnostic.tsx` (submission site): pass `i18n.language` at submit time.

### 2c. Localized templates
- Extend each transactional template under `supabase/functions/_shared/transactional-email-templates/` with a `STRINGS` table keyed by locale (`fr`, `en`, `de`, `es`, `ru`, `zh`, `pt`, `ja`) covering title/body/footer copy.
- Convert `subject` to a function `(d) => STRINGS[d.locale ?? 'fr'].subject`.
- Each component reads `locale` from props and selects the right STRINGS bucket; defaults to `fr` when missing.

### 2d. Edge function
- `trigger-dossier-email/index.ts`: include `locale` in the `select(...)` from `dossiers`, then pass it into `templateData`.

---

## Chantier 3 — "Remise en main propre (Strasbourg)" shipping method

### 3a. Shipping option model
- Add constant `SHIPPING_OPTIONS` in `src/lib/dossiers.ts` (or new `src/lib/shipping.ts`) including:
  - `hand_delivery_strasbourg` → label "Remise en main propre (Strasbourg)", priceCents `0`, area `Strasbourg`.
  - existing carrier options preserved.
- Persist via existing `shipping_carrier` column (string key) — no schema change needed.

### 3b. UI
- Diagnostic / checkout form: add a card/radio for the Strasbourg option, with helper copy ("Aucun frais de port — rendez-vous fixé par e-mail après paiement.").
- Skip shipping-fee calculation when `hand_delivery_strasbourg` is selected.

### 3c. Stripe checkout
- `supabase/functions/create-dossier-checkout/index.ts`: 
  - When `shipping_carrier === 'hand_delivery_strasbourg'`, set `shipping = 0`, attach `metadata: { delivery_type: 'hand_delivery_strasbourg', area: 'Strasbourg' }` on Checkout Session and PaymentIntent.

### 3d. Post-payment email
- Update `dossier-paid` template to branch on `deliveryType === 'hand_delivery_strasbourg'`: replace shipping instructions with a Strasbourg pickup block + booking CTA (mailto / `/booking`).
- Edge function passes `deliveryType` from row into `templateData`.

---

## Chantier 4 — i18n audit & dynamic date formatting

### 4a. String sweep
- Grep target dirs (`src/pages`, `src/components`) for residual French/English literals not wrapped in `t(...)`. Focus areas: `Tracking.tsx`, `AdminDossiers.tsx`, `Footer.tsx` copy, `Diagnostic.tsx` validation messages, status badges, toast messages.
- Add missing keys under a new `dossier.*` and `shipping.*` namespace in all 8 locale files (`fr/en/de/es/ru/zh/pt/ja`).

### 4b. Dynamic dates
- Ban hardcoded month arrays. Introduce `src/lib/datetime.ts` helper:
  ```ts
  export const formatDate = (d: Date | string, locale: string) =>
    new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(d));
  ```
- Replace usages in `Tracking.tsx`, `MyDossiers.tsx`, `AdminDossiers.tsx`, `AdminBookings.tsx`, `Booking.tsx` calendar header, etc.

---

## Chantier 5 — Admin manual status override + auto-trigger

### 5a. Admin UI
- `src/pages/AdminDossiers.tsx`: add a `Select` per row exposing all 7 `DossierStatus` values + `rejected`. On change call `adminUpdateStatus(ref, newStatus, notes)`.
- Keep existing validate / shipped action buttons as quick paths; the dropdown is the universal override.

### 5b. DB trigger → edge function
- New migration: `AFTER UPDATE OF status ON public.dossiers` trigger that, when `OLD.status IS DISTINCT FROM NEW.status`, calls `net.http_post` to `trigger-dossier-email` with `{ ref, kind }` derived from `NEW.status` via a `status_to_email_kind()` SQL helper.
- Service-role JWT stored in Vault as `dossier_email_service_role_key` (mirrors existing email-queue pattern). Migration provisions the Vault secret + DB function.
- Removes need for client-side `sendDossierEmail` calls (kept as fallback but no longer required).

### 5c. Stripe webhook path
- Confirm `confirm_dossier_payment` RPC sets status to `paid`; the new trigger then dispatches the `paid` email automatically using stored `locale`.

---

## Chantier 6 — Build, deploy, diagnostic

- Type-check: ensure no TS errors after dossier/locale prop threading.
- Deploy edge functions: `trigger-dossier-email`, `create-dossier-checkout`, `send-transactional-email` (template registry change).
- Quick smoke list to verify:
  1. Submit FR dossier → admin-new email FR + customer requested FR.
  2. Admin flips status to `payment_required` via dropdown → DB trigger fires → customer gets FR `payment-required` mail.
  3. Strasbourg option → Stripe shows €0 shipping, paid mail shows pickup block.
  4. EN dossier → all subsequent state emails in EN.

---

## Technical notes

- `KIND_TO_TEMPLATE` already exists in `trigger-dossier-email/index.ts`; only the resolution line needs to change.
- Locale enum kept as free `text` to allow future locales without migration.
- DB trigger uses `pg_net` (already enabled in project) — no new extension required.
- Footer layout untouched per instructions.
- No changes to splash/Enter audio (already removed).

## Files touched (planned)

- `supabase/functions/trigger-dossier-email/index.ts`
- `supabase/functions/create-dossier-checkout/index.ts`
- `supabase/functions/_shared/transactional-email-templates/*.tsx` (locale strings)
- `src/lib/dossiers.ts`, `src/lib/datetime.ts` (new), `src/lib/shipping.ts` (new)
- `src/pages/Diagnostic.tsx`, `src/pages/Tracking.tsx`, `src/pages/MyDossiers.tsx`, `src/pages/AdminDossiers.tsx`, `src/pages/AdminBookings.tsx`, `src/pages/Booking.tsx`
- `src/i18n/locales/*.json` (8 files)
- New migrations: add `locale` column + status-change trigger + Vault secret
