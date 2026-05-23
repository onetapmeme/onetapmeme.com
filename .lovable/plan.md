
# Audit QA — CardSurgery (état actuel)

## Note globale : **8.4 / 10**

Le site est déjà très soigné (navbar pill, hero clamp, grain, scroll progress, slider Lugia stable). Il reste des micro-défauts qui empêchent un véritable 10/10 façon Apple / horlogerie de luxe.

### Tableau des défauts détectés

| Composant / Page | Défaut détecté | Sévérité |
|---|---|---|
| `CardHome` HERO | Mix de paddings horizontaux : hero en `px-5`, autres sections en `px-4`, footer en `px-4` → casse la grille verticale | Medium |
| `CardHome` HERO | 2 badges (`heroBadgeWarranty/Insured`) + 1 badge "saved" empilés sur 3 lignes → bloc dense sur mobile 390-414px | Medium |
| `CardHome` ABOUT/PROCESS/TRUST | Titres `text-3xl md:text-5xl` sans `clamp()` → saut typographique brut entre 640 et 768px | Medium |
| `BeforeAfterSlider` | Bordure `border-border` + `rounded-lg` (8px) alors que toutes les cards utilisent `rounded-2xl/3xl` → incohérence radius | Medium |
| `BeforeAfterSlider` | Labels AVANT/APRÈS en `rounded` (4px) génériques, pas de glass-effect, pas de tracking → look Bootstrap | Medium |
| `BeforeAfterSlider` | Poignée 40px = sous le seuil tactile 44px d'Apple HIG | Medium |
| `BeforeAfterSlider` | Pas de hint visuel d'interactivité au repos (aucune pulsation, aucun "← →") | Low |
| `Footer` | `px-4` rigide, colonnes `gap-8` cramées sur tablette 768px, logo `h-16` disproportionné vs texte | Medium |
| `Footer` | Email `contact@card_surgery.com` (underscore) ≠ `contact@cardsurgery.com` utilisé dans le hero → **incohérence de marque** | Critical |
| `Footer` | `drop-shadow` bleu `hsla(210,100%,55%)` sur le logo alors que la marque est cuivre `hsl(22,55%,55%)` | Medium |
| `Navbar` | Plus de `safe-top` sur `<header>` mais `ScrollProgress` (top:0) passe sous la notch iOS | Low |
| Global | `section { padding: py-20 md:py-32 }` répété 6× → devrait être tokenisé | Low |
| Global | Pas de `scroll-margin-top` sur les sections ciblées par `#about/#process/#contact` → ancre cachée derrière la navbar fixe | Medium |
| Global | `html { scroll-padding-top: 100px }` codé en dur, ne suit pas la navbar dynamique (56/64/80px) | Low |

---

## Axes architecturaux d'amélioration

1. **Rythme horizontal unifié** : token `.section-x` = `px-5 sm:px-6 lg:px-8` appliqué à TOUTES les sections (hero, about, process, trust, before/after, contact, footer). Plus aucun `px-4` orphelin.
2. **Lockout horizontal absolu** : `html, body, #root { overflow-x: clip; max-width: 100vw }` déjà présent → ajouter `min-width: 0` sur les grids et `break-words` sur les emails/URLs.
3. **Typographie fluide partout** : remplacer `text-3xl md:text-5xl` par `clamp(1.875rem, 4.5vw, 3rem)` sur les H2, idem H3.
4. **Slider Lugia premium** : `rounded-2xl`, labels en `glass-effect` + `tracking-[0.2em]` + `uppercase`, poignée 48px avec halo pulsant, ring `ring-1 ring-border/60`. **Mapping AVANT/APRÈS conservé strictement** (file 2 = avant gauche, file 1 = après droite — déjà OK dans le code).
5. **Footer cohérent marque** : email unifié `contact@cardsurgery.com`, `drop-shadow` cuivre `hsla(22,55%,55%,0.3)`, logo `h-12`, colonnes `gap-10 md:gap-8`.
6. **Ancres respectées** : `[id]{scroll-margin-top: 6rem}` global, et `ScrollProgress` avec `top: env(safe-area-inset-top)`.

---

## Plan d'exécution (1 passe, frontend only)

### Bloc A — `src/index.css`
- Ajouter `[id] { scroll-margin-top: 6rem }`
- Ajouter utilitaire `.section-x { @apply px-5 sm:px-6 lg:px-8 }`
- Ajouter utilitaire `.h2-fluid { font-size: clamp(1.875rem, 4.5vw, 3rem); line-height: 1.1; letter-spacing: -0.015em }`
- Renforcer lockout : `#root { min-width: 0 }`

### Bloc B — `src/components/cards/CardHome.tsx`
- Remplacer tous les `px-4` / `px-5 sm:px-6` de section par `section-x`
- Remplacer les H2 par `className="h2-fluid font-bold mb-4"`
- Fusionner les 2 badges de garantie sur une ligne avec séparateur `•` pour gagner en respiration
- Ajouter `id` cibles intactes

### Bloc C — `src/components/cards/BeforeAfterSlider.tsx`
- Container : `rounded-2xl ring-1 ring-border/60 shadow-[0_10px_40px_-12px_hsla(20,35%,16%,0.18)]`
- Labels AVANT/APRÈS : `glass-effect uppercase tracking-[0.18em] text-[10px] font-bold px-2.5 py-1 rounded-full` (AVANT gauche, APRÈS droite — **mapping inchangé**)
- Poignée : 48×48, halo pulsant `animate-pulse` au repos uniquement, `cursor-ew-resize`
- Conserver 100% la logique de pointer/preload/aspect-ratio

### Bloc D — `src/components/Footer.tsx`
- Email → `contact@cardsurgery.com` (×3 occurrences)
- `drop-shadow` logo → cuivre `hsla(22,55%,55%,0.35)`
- `px-4` → `section-x`, logo `h-12`, ajout `break-words` sur email
- Grid `gap-10 md:gap-8` pour respirer sur tablette

### Bloc E — `src/components/ScrollProgress.tsx`
- `top: env(safe-area-inset-top)` pour respecter la notch (vérification rapide du composant)

### Garde-fou — Lugia #113
- Aucune modification de `lugiaAvant`/`lugiaApres` imports
- Mapping conservé : `before={lugiaAvant}` (gauche/AVANT), `after={lugiaApres}` (droite/APRÈS)
- Description clinique intacte (texte, ordre, structure des `<ol>`)

### Vérification post-refactor
- Screenshot mobile 390×844 + 414×896 du hero, slider, footer
- Vérifier absence de scroll horizontal
- Vérifier ancres `#about/#process/#contact` avec offset correct
