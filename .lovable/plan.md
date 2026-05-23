## Objectif
1. Réparer le sélecteur de langue dans le sidebar mobile.
2. Ajouter **DE** comme langue prioritaire (FR/EN/DE en avant, ES/RU/ZH conservés en fallback).
3. Auto-détection IP + persistance, SEO synchro.
4. Révision copy premium FR/EN/DE (homepage, nav, footer, Lugia #113, dashboard admin, emails transactionnels).
5. Aucune régression visuelle, lockout `overflow-x: clip`.

---

## 1. Bug fix — Mobile sidebar language switcher

**Fichier :** `src/components/Navbar.tsx` + `src/components/LanguageSwitcher.tsx`

Problème : le `DropdownMenu` Radix dans le `SheetContent` est tronqué / mal aligné sur mobile (z-index, container du portail, hit target trop petit).

Correctifs :
- Dans le bloc mobile du `Sheet`, remplacer le `LanguageSwitcher` actuel par une rangée de **boutons-pills** (FR / EN / DE + un sous-menu "Autres") avec drapeau + code, full-width, hauteur ≥ 44 px (Apple HIG touch target).
- Variante : si on garde le dropdown, forcer `DropdownMenuContent` avec `sideOffset={8}`, `align="start"`, `className="z-[110] w-[calc(100vw-3rem)]"` pour qu'il ne soit ni rogné ni derrière le sheet.
- Style cohérent avec la version desktop (border `border-accent/40`, `rounded-full`, hover `bg-accent/10`, `tracking-[0.08em]`).
- Active state = anneau copper + bullet point.

---

## 2. Architecture localisation FR/EN/DE (avec fallback ES/RU/ZH)

### 2.1 `src/i18n/locales/de.json`
- Création d'un fichier `de.json` complet à partir de `en.json` (~942 lignes) traduit en allemand premium (ton : *Chirurgische Präzision, Werterhalt, Absolute Zuverlässigkeit*).
- Vocabulaire : *Kartenrestaurierung, Mikropräzise Reinigung, Holografischer Glanzbereich, Sammlerwert, Klinische Wiederherstellung*.

### 2.2 `src/i18n/config.ts`
- Importer `de` et l'ajouter aux `resources`.
- Ordre : FR/EN/DE prioritaires, ES/RU/ZH en fallback secondaire.

### 2.3 `src/utils/ipGeolocation.ts`
- Étendre la détection : ajouter `GERMAN_COUNTRIES = { DE, AT, LI, CH (zones DE) }`.
- Logique : FR-zone → `fr` ; DE-zone → `de` ; sinon `en`.
- Persistance `localStorage['1tap-language']` inchangée — override manuel prioritaire.
- Type retour : `'fr' | 'en' | 'de' | null`.

### 2.4 `src/components/cards/copy.ts`
- Élargir `Lang` à `"fr" | "en" | "de" | "es" | "ru" | "zh"`.
- `SUPPORTED` ordre : `["fr","en","de","es","ru","zh"]`.
- Ajouter clé `de` sur **chaque** entrée du `copy` object (~110 clés). Ton premium allemand.

### 2.5 `src/components/LanguageSwitcher.tsx`
- Ajouter `{ code:'de', flag:'🇩🇪', name:'Deutsch' }` dans la liste, positionné en 3ᵉ après FR/EN.
- Mettre FR/EN/DE en haut, séparateur, puis ES/RU/ZH en bas (groupe "More languages").

### 2.6 `src/components/SEOHead.tsx`
- Ajouter `de` aux `languages` du `hreflang`.
- Ajouter titres et descriptions DE :
  - Title : `CardSurgery – Chirurgische Kartenrestaurierung`
  - Description : `CardSurgery restauriert Sammlerkarten mit chirurgischer Präzision. Werterhalt für Premium-Sammler, absolute Zuverlässigkeit.`
- Map `og:locale` : `de` → `de_DE`.
- HTML `lang` attribute déjà géré via `i18n.on('languageChanged')`.

### 2.7 `src/components/RouteSEO.tsx`
- Vérifier que les titres par route sont traduits via i18n (passer en clés `t('seo.home.title')` etc., avec fallback EN).

---

## 3. Copy review premium

### 3.1 Lugia Légende #113
Mise à jour dans le composant qui contient la description (à localiser via `rg "Lugia"`), exposé via 3 clés :
- `lugiaCaption.fr` : *Nettoyage Micro-Précis et Polissage de la zone éclairée centrale.*
- `lugiaCaption.en` : *Micro-Precision Cleaning and Technical Polishing of the central highlighted holo area.*
- `lugiaCaption.de` : *Mikropräzise Reinigung und technisches Polieren des zentralen holografischen Glanzbereichs.*

Mapping AVANT/APRÈS préservé (Fichier 2 = AVANT à gauche, Fichier 1 = APRÈS à droite). Aucun changement de logique du slider.

### 3.2 Passe rédactionnelle
Cibles, par ordre de priorité :
1. **copy.ts** — FR/EN/DE : Hero, About, Process, Pricing, Footer, CTA. Élimination des tournures littérales, alignement sur le ton brand.
2. **locales JSON** — `fr.json`, `en.json`, `de.json` : nav, formulaires, toasts, erreurs.
3. **Dashboard admin** — `src/pages/Admin*.tsx`, labels et toasts (vérifier que rien n'est en dur).
4. **Emails transactionnels** — `supabase/functions/send-dossier-email/`, templates HTML : ajouter détection langue (FR/EN/DE) via param `lang` et 3 versions du sujet + corps. Si pas de templates React Email scaffold, on garde le HTML inline mais on l'internationalise.

### 3.3 Glossaire FR / EN / DE
Aligné dans un commentaire en tête de `copy.ts` :

| FR | EN | DE |
|---|---|---|
| Restauration clinique | Clinical restoration | Klinische Wiederherstellung |
| Précision chirurgicale | Surgical precision | Chirurgische Präzision |
| Préservation de la valeur | Asset preservation | Werterhalt |
| Infirmier en chirurgie | Surgical nurse | OP-Pfleger |
| Polissage technique | Technical polishing | Technisches Polieren |

---

## 4. Visual lockout
- Vérifier que `html, body, #root { overflow-x: clip; max-width: 100vw }` est toujours en place dans `index.css` (posé à la passe précédente).
- Tester sur 390×844 et 414×896 : pas de scroll horizontal, switcher mobile centré, dropdown visible en entier.

---

## 5. Vérification
- Démarrer le preview, basculer FR → EN → DE depuis le sidebar mobile, vérifier que les copys changent partout.
- Recharger : la langue choisie persiste.
- Screenshot mobile du sidebar ouvert avec dropdown actif.
- `console.log` IP geolocation : afficher la langue détectée.

---

## Fichiers touchés (estimation)

```text
NEW   src/i18n/locales/de.json
EDIT  src/i18n/config.ts
EDIT  src/utils/ipGeolocation.ts
EDIT  src/components/cards/copy.ts            (+ DE sur toutes les clés)
EDIT  src/components/LanguageSwitcher.tsx     (réordo + DE)
EDIT  src/components/Navbar.tsx               (fix mobile switcher)
EDIT  src/components/SEOHead.tsx              (DE titles/desc/hreflang)
EDIT  src/components/RouteSEO.tsx             (i18n des titres)
EDIT  composant Lugia                         (3 captions)
EDIT  supabase/functions/send-dossier-email/  (i18n DE)
```

## Détails techniques

- **Type Lang** : étendu mais `pickLang` continue à fallback vers `fr` si code inconnu.
- **i18next** : `fallbackLng: ['en','fr']` pour que DE manquant retombe sur EN.
- **Persistance** : clé `localStorage['1tap-language']`, override absolu sur géoloc.
- **Touch target mobile** : min 44×44 px (`h-11`), espacement `gap-2`.
- **Z-index** : `DropdownMenuContent` à `z-[110]` (au-dessus du `SheetContent` à `z-[100]`).
- **Aucun changement DB**, aucune migration.
