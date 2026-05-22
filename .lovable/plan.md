# Fix : navbar décalée vers le bas sur mobile

## Cause
Dans `src/components/Navbar.tsx`, le `<header>` (pilule flottante à hauteur fixe `h-14`/`h-16`) reçoit la classe `safe-top`, qui ajoute un `padding-top: env(safe-area-inset-top)` (~44px sur iPhone à encoche). Comme la hauteur du header est fixée, ce padding pousse le logo et le bouton menu vers le bas, hors de l'axe central de la pilule.

## Correction
1. Retirer `safe-top` de l'élément `<header>`.
2. Remplacer le `top-3` statique par un offset qui respecte la safe-area iOS via style inline :
   `style={{ top: 'calc(env(safe-area-inset-top) + 0.75rem)' }}`
   (et conserver le `transitionTimingFunction` existant dans le même `style`).
3. Vérifier que `flex items-center` reste sur le `<nav>` interne pour garantir le centrage vertical du logo, des liens et du bouton menu.
4. Re-tester en viewport 390/414px : logo, wordmark et hamburger doivent être parfaitement centrés verticalement dans la pilule, sans débordement.

## Fichier impacté
- `src/components/Navbar.tsx` (uniquement le `<header>` racine)

Aucun autre composant ni style global n'est modifié.
