# Full 8-Language Localization Pass (FR/EN/DE/ES/RU/ZH/PT/JA)

## 1. Engine — add PT + JA

- **`src/i18n/locales/pt.json`** + **`src/i18n/locales/ja.json`** (new): mirror `en.json` structure with the provided translations injected for all keys touched below; remaining keys fall back to EN via i18next.
- **`src/i18n/config.ts`**: import `pt` + `ja`, register in `resources`, extend `supportedLangs` to `['fr','en','de','es','ru','zh','pt','ja']`.
- **`src/utils/ipGeolocation.ts`**: add detection — PT/BR/AO/MZ → `pt`; JP → `ja`. Existing FR/DE logic preserved.
- **`src/components/LanguageSwitcher.tsx`**: add `{pt, 🇵🇹, Português}` + `{ja, 🇯🇵, 日本語}` to SECONDARY list (or promote per spec). Keep PRIMARY = FR/EN/DE.
- **`src/components/Navbar.tsx`** mobile pill grid: keep FR/EN/DE pills; the `<LanguageSwitcher inline />` below already exposes the other 5.

## 2. Footer — fully dynamic (`src/components/Footer.tsx`)

Replace every hardcoded FR string with `t()` keys. New namespace `footer.*`:

- `footer.cols.services` / `cols.brand` / `cols.legal` — column headers
- `footer.tagline` — brand italic line
- `footer.subTagline` — line below
- `footer.services.pricing|gallery|diagnostic|booking|tracking`
- `footer.company.about|process|faq|contact`
- `footer.legal.notice|terms|privacy|disclaimer`
- `footer.copyright` — with `{{year}}` interpolation

All 8 languages populated using the exact strings from the brief.

## 3. Navbar / Account / CTA

- **`src/components/Navbar.tsx`**: replace hardcoded `"Connexion"`, `"Mes dossiers"`, `"Admin"`, `"Déconnexion"`, `"Language"` with `t('nav.account.*')` keys. Add 8-lang values.
- **Final CTA block** (locate in `src/components/cards/CardHome.tsx` — likely `ctaFinalTitle` / `ctaFinalSub` in `copy.ts`): extend `copy.ts` `Lang` type to include `pt|ja`, add translations for the final CTA heading + subtext, plus all other keys (fallback = EN string where not specified by user).

## 4. Mid-page content (`src/components/cards/CardHome.tsx` + `copy.ts`)

Add/replace keys with full 8-lang coverage (EN fallback for unspecified langs):

- `productsRefTitle` — "PRODUITS RÉFÉRENCÉS" → 8 langs
- `certTrainingTitle` — "CERTIFICATIONS & FORMATIONS"
- `productsRefSub` — "Gamme professionnelle…"
- `certTrainingSub` — "Maîtrise validée par Rocket Collect"
- `testimonialsTitle` — "Ils nous ont confié leurs cartes"
- `testimonialsSub` — "Avis vérifiés…"
- `instagramTitle` — "Le Lab sur Instagram"
- `beforeAfterLabel` — "Avant / Après"

## 5. Before/After Slider Badges (`src/components/cards/BeforeAfterSlider.tsx`)

- Replace hardcoded "AVANT" / "APRÈS" with `t('slider.before')` / `t('slider.after')`.
- 8 languages per spec (BEFORE/AFTER, VORHER/NACHHER, ANTES/DESPUÉS, ДО/ПОСЛЕ, 修复前/修复后, ANTES/DEPOIS, 修復前/修復後).
- Preserve Lugia #113 mapping: File 1 = AFTER (right), File 2 = AVANT (left). No logic change, only label source.

## 6. Visual lockout

- Verify `src/index.css` still has `html, body, #root { overflow-x: clip; max-width: 100vw }`.
- Test long DE/RU strings in footer columns — add `break-words` / `hyphens-auto` on column headers if needed.

## Files touched

NEW: `src/i18n/locales/pt.json`, `src/i18n/locales/ja.json`
EDIT: `src/i18n/config.ts`, `src/utils/ipGeolocation.ts`, `src/components/LanguageSwitcher.tsx`, `src/components/Footer.tsx`, `src/components/Navbar.tsx`, `src/components/cards/copy.ts`, `src/components/cards/CardHome.tsx`, `src/components/cards/BeforeAfterSlider.tsx`, `src/i18n/locales/{fr,en,de,es,ru,zh}.json` (add `footer.*` + `nav.account.*` namespaces).

## Out of scope (will use EN fallback)

Strings in admin dashboards, edge function emails, and ancillary pages not listed in the brief. i18next fallback chain (EN → FR) keeps them readable until a future pass.
