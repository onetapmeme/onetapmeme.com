## Problem

On mobile (390px), the hero CTA "Débuter une opération de restauration" overflows: text is clipped at edges (the "D" and "N" touch screen borders) because the button uses fixed `text-lg px-8 py-6` with `whitespace-nowrap` (shadcn Button default) and the icons consume horizontal space.

## Fix

Edit `src/components/cards/CardHome.tsx` (lines 138-150) only — apply the same mobile-safe pattern already used for other CTAs in the project:

1. Wrap button container with `w-full max-w-md mx-auto px-4` so it never touches the viewport edge.
2. Button class changes:
   - `w-full sm:w-auto` (full width on mobile, auto on desktop)
   - Responsive padding: `px-5 sm:px-8 py-4 sm:py-6`
   - Responsive text size: `text-base sm:text-lg`
   - `whitespace-normal h-auto leading-tight text-center` (allow wrapping)
   - `max-w-full`
3. Add `shrink-0` to both icons so they don't compress the text.

No copy changes, no logic changes, no other components touched.
