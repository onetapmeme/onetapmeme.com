## Problème

Sur format téléphone (≤390px), plusieurs boutons CTA débordent du viewport — typiquement le bouton "Débuter une opération de restauration" sur la page Enter, qui combine `text-xl` + `px-12` + texte long FR, sans contrainte de largeur ni wrapping.

## Cause

Trois patterns problématiques sont utilisés sur les CTA principaux :
1. Padding horizontal fixe trop large (`px-12`) sans variante mobile.
2. `whitespace-nowrap` implicite du composant `Button` shadcn — le texte ne peut pas wrapper.
3. Pas de `max-width` ni `w-full` sur mobile pour contraindre la largeur au container.

## Fichiers à corriger

1. **`src/pages/Enter.tsx`** (ligne 89-103) — bouton "Débuter une opération de restauration"
   - Passer le wrapper de `flex justify-center px-4` à un container avec `max-w-md mx-auto` pour borner la largeur.
   - Bouton : `w-full sm:w-auto`, padding responsive `px-6 sm:px-12`, autoriser le wrap (`whitespace-normal` + `h-auto py-4 sm:py-6`), `text-base sm:text-lg md:text-xl`, `leading-tight`, et `text-center`.

2. **`src/components/Hero.tsx`** (lignes 198 & 211) — déjà `w-full sm:w-auto` mais `whitespace-nowrap` du Button empêche le wrap quand le texte FR est long. Ajouter `whitespace-normal h-auto leading-tight` et réduire le padding mobile (`px-6 sm:px-8 md:px-12`).

3. **Audit ciblé des autres CTA** principaux susceptibles de déborder (recherche rapide `px-10|px-12|text-xl.*Button|text-2xl.*Button` dans `src/pages` et `src/components`), correction au cas par cas avec le même pattern :
   - `w-full sm:w-auto` quand le bouton est un CTA pleine largeur,
   - `whitespace-normal h-auto leading-tight text-center`,
   - padding responsive `px-6 sm:px-10`.

4. **Pas de modification globale** du composant `src/components/ui/button.tsx` — `whitespace-nowrap` reste le défaut shadcn (utile pour 95% des boutons compacts). On override localement sur les CTA hero/long-text uniquement.

## Vérification

- Définir le preview en mobile (390×844) et screenshot Enter + Home après modification.
- Vérifier que les boutons restent dans le viewport et que le texte FR (le plus long des 5 langues) ne déborde plus.

## Hors scope

- Refonte du composant Button.
- Changement de copy/traductions pour raccourcir les textes.
