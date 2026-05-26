## Architecture Audit — Onboarding, Diagnostic & Email Flows

### 1. Functional vs Mockup Status

| Component | Status | Tech / Missing Bridges |
| :--- | :--- | :--- |
| Database Record Creation | 100% Functional | Supabase RPC `create_dossier` → table `dossiers`. Generates `CS-YYYY-XXXX` ref, RLS + rate-limit OK. |
| User Case Tracking UI | 100% Functional | `MyDossiers.tsx` + `Tracking.tsx` read `dossiers` via `listMyDossiers` / `get_dossier_by_ref`. Timeline reflects DB status. |
| Customer Email Dispatches | Partially Wired (broken in prod) | Edge fn `send-dossier-email` exists, called from `Diagnostic.tsx:185`, `Payment.tsx:57`, `AdminDossiers.tsx`. Uses **Resend `onboarding@resend.dev` in sandbox** → 400 unless recipient = `contactonetapmeme@gmail.com`. No verified domain. |
| Admin Notification Emails | Visual Mockup Only | No code path emails the lab inbox on insert. `send-dossier-email` only sends to `dossier.email` (the customer). No DB webhook, no second `to:` on creation. |
| Mobile Gallery Image Upload | Partially Wired | `Diagnostic.tsx:73` has `accept="image/..."` but no `capture` attribute and the upload tile may swallow the click. Native picker works on most devices but lacks an explicit "Photo Library" path on iOS/Android. |
| Mobile Wizard Scroll | Bug | `next()`/`prev()` mutate `step` without scrolling — the new step renders below the previous (taller) one, so the viewport stays at the bottom of the form. No `scrollTo` on step change. |

---

### 2. Fix Plan

#### A. Email system — migrate to Lovable Emails (recommended)

Resend is blocked by sandbox. Rather than ask the user to buy/verify a domain on Resend, switch to the built-in Lovable Emails infrastructure (uses a delegated `notify.cardsurgery.com` subdomain, no external account, automatic queue + retries).

Steps the agent will perform once approved:
1. Check current email-domain status; if none configured, open the email-domain setup dialog so the user delegates DNS once.
2. Run `setup_email_infra` then `scaffold_transactional_email` (creates queue tables, `send-transactional-email` edge fn, unsubscribe + suppression).
3. Create 6 React-Email templates under `supabase/functions/_shared/transactional-email-templates/`:
   - `dossier-received` (customer)
   - `dossier-approved` (customer + payment link)
   - `dossier-rejected` (customer)
   - `dossier-paid` (customer + shipping instructions)
   - `dossier-shipped` (customer + return tracking)
   - `admin-new-dossier` (lab inbox — new submission alert with photos URLs + ref)
4. Register them in `registry.ts`; deploy.
5. Replace `sendDossierEmail` in `src/lib/dossiers.ts` so it invokes `send-transactional-email` with the right `templateName` + `templateData` + idempotent key `dossier-<kind>-<ref>`.
6. In `Diagnostic.tsx` after `createDossierRemote`, fire **two** invocations: customer `dossier-received` AND `admin-new-dossier` (recipient = `ADMIN_NOTIFICATION_EMAIL` constant, default `contact@cardsurgery.com`).
7. Keep the old `send-dossier-email` edge fn in repo for one cycle but unused (safe rollback). Remove after confirmation.

Localized subjects/body in FR/EN/DE (other 5 languages fall back to EN) using the existing `tr()` helper pattern.

#### B. Mobile scroll-to-top in wizard

Edit `src/pages/Diagnostic.tsx`:
- Add `const formRef = useRef<HTMLDivElement>(null)` on the wizard card.
- In a `useEffect([step])`, call `formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })` with a small `requestAnimationFrame` to wait for the new step's DOM.

#### C. Native photo library on mobile

In the photo-upload tile (`Diagnostic.tsx` step 3, around line 73):
- Keep `accept="image/*"` (broaden from the current explicit MIME list — iOS Safari is picky).
- Do NOT set `capture` globally (that forces the camera on Android). Instead provide two buttons:
  - "Prendre une photo" → input with `capture="environment"`
  - "Choisir depuis la galerie" → input with `accept="image/*"` only
- Ensure the hidden `<input>` is not wrapped in a `<button>` (prevents double-click cancel on iOS) — use a `<label htmlFor>` pattern.

---

### 3. Files Touched

- NEW: `supabase/functions/_shared/transactional-email-templates/{dossier-received,dossier-approved,dossier-rejected,dossier-paid,dossier-shipped,admin-new-dossier}.tsx` + updated `registry.ts`
- EDIT: `src/lib/dossiers.ts` — rewrite `sendDossierEmail` to call `send-transactional-email`; add `notifyAdminNewDossier(ref)` helper
- EDIT: `src/pages/Diagnostic.tsx` — admin notify on create, scroll-to-top on step change, dual photo input (camera vs gallery)
- DEPLOY: `send-transactional-email`, `handle-email-unsubscribe`, `handle-email-suppression`, `process-email-queue`
- Old `supabase/functions/send-dossier-email/index.ts` — left in place, unused

---

### 4. Out of Scope (this pass)

- Stripe webhook hardening
- Admin dashboard UI refactor
- Migrating already-localized non-email surfaces

After approval I'll run the email-domain status check first; if no domain exists I'll surface the setup dialog before proceeding to scaffolding and code edits.