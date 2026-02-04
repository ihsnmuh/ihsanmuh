# Design / UX Improvements (Task List)

Checklist of design-focused improvements to make the UI feel more polished, accessible, and consistent.

## Accessibility + Interaction Polish

- [x] Add consistent focus-visible styles for all interactive elements (links/buttons), especially icon-only controls.
  - Files touched: `src/components/Molecules/ThemSwicher/index.tsx`, `src/containers/layout/Header.tsx`, `src/containers/layout/Footer.tsx`, `src/components/Atoms/links/*`
- [x] Move `aria-label` to the clickable element (`<a>/<Link>/<button>`), not the SVG icon component.
  - Files touched: `src/containers/layout/Header.tsx`, `src/containers/layout/Footer.tsx`
- [x] Add a "Skip to content" link and ensure main content has a stable target.
  - Files touched: `src/containers/layout/Header.tsx`, `src/containers/layout/Layout.tsx`

## Motion + Reduced Motion

- [x] Honor `prefers-reduced-motion` for smooth scroll and any repeated/ambient animations.
  - Files touched: `src/styles/base.css`, `tailwind.config.js`

## Typography + Readability

- [x] Improve font loading behavior: changed `font-display: optional` to `font-display: swap` for Inter.
  - File touched: `src/styles/base.css`
- [x] Improve heading wrapping to avoid awkward line breaks with `text-balance` utility.
  - Files touched: `src/styles/base.css` (.h0, .h1, .h2, .h3, .h4 classes)

## Layout + Navigation Feel

- [x] Increase hit-area for top nav items (padding on the link itself; active state as a consistent pill/underline).
  - File touched: `src/containers/layout/Header.tsx`
- [x] Ensure long labels don't overflow with `min-w-0` and wrapped flex rows.
  - Files touched: `src/containers/layout/Header.tsx`

## Visual Bugs / Cleanup

- [x] Fix CSS typo `twvas` -> `canvas` in the global media reset.
  - File touched: `src/styles/globals.css`

## Quick Verification

- [x] Keyboard-only pass: Tab through header/nav/theme switcher/footer icons; focus ring always visible.
- [x] Mobile pass: tap targets feel comfortable; header remains usable when scrolled.
- [x] Reduced-motion pass: smooth scroll/animations are reduced when OS setting enabled.

## Summary

All design/UX improvements have been implemented:

- Better accessibility with skip link, proper focus states, and aria-label placement
- Improved font loading with `font-display: swap`
- Better heading typography with `text-balance`
- Reduced motion support for accessibility
- Larger hit areas for navigation items
- Fixed CSS typo
