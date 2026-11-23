# ADR 0001: Adoption of Organic Editorial / Swiss Craft Design System

- **Status**: Accepted
- **Date**: 2026-08-19
- **Deciders**: Muhammad Ihsan, AI Assistant

## Context

The personal website `ihsanmuh` previously used a mix of traditional portfolio components and subtle AI-typical visuals (such as gradient background glows, multi-accent badges, and standard card containers). To distinguish the site as a top-tier software engineer portfolio, we needed a clear visual direction that avoids AI template cliches and highlights human craft, readability, and engineering rigor.

## Decision

We adopt the **Organic Editorial / Swiss Craft** design direction across the codebase, governed by the following rules:

1. **Anti-AI-Cliche Discipline**: Strict banning of text header gradients, mouse-tracking spotlight glows, neon border gradients, pulsing dots, blurred mesh backgrounds, and purple/cyan glow blobs.
2. **Color Calibration & Lock**: Solid neutral base (Slate/Zinc) with a single locked accent color (Deep Emerald `#10b981`). Accent color consistency is locked across all sections of a page.
3. **Typography System**: High-contrast sans-serif display typography for headlines (`Geist Display` / `Cabinet Grotesk`), clean readable sans for body text (`Geist` / `Inter`), and monospace for technical labels & metrics (`Geist Mono` / `JetBrains Mono`).
4. **Layout & Motion Dials**: Set `DESIGN_VARIANCE: 8` (asymmetric bento grids & layout family diversity), `MOTION_INTENSITY: 5` (tactile spring physics, no frame-dropping scroll listeners), and `VISUAL_DENSITY: 4` (spacious layout with maximum 4 text elements in Hero).

## Consequences

- All existing components in `src/components/Organism/Home/` will be refactored to align with these tokens.
- Layout sections must vary family layout (bento grid, split-screen, horizontal/vertical rhythm) to prevent monotonous grid repetition.
- Dark mode and light mode must both maintain strict WCAG AA contrast for text, buttons, and form controls.
