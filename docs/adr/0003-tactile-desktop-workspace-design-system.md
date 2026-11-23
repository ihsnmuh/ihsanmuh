# ADR 0003: Migration to PostHog Tactile Desktop Workspace Design System

- **Status**: Accepted
- **Date**: 2026-08-28
- **Deciders**: Muhammad Ihsan, Antigravity AI

## Context

The site's visual identity has been overhauled to adopt the **PostHog Tactile Desktop Workspace** reference documented in [DESIGN.md](file:///Users/a2304/Documents/personal/ihsanmuh/DESIGN.md). The goal is to move from a generic card layout to a warm, physical desktop operating system workspace where interface elements are printed paper artifacts pinned to a corkboard/desk surface.

## Decision

We adopt the full PostHog Tactile Desktop Workspace design system across all pages and global components:

1. **Sandy Desk Canvas Lock**:
   - The root page canvas is locked to Sandy Desk (`#e1d7c2`).
   - Surfaces stack upward: Sandy Desk (`#e1d7c2`) → Pale Stone (`#e5e7e0`) → Soft Linen (`#eeefe9`) → Cream Paper (`#fdfdf8`) → Paper White (`#ffffff`).
2. **Application Window Signature Container**:
   - Primary content areas are framed within an Application Window container (max-width `958px`, `rounded-[6px]`, `1px solid #bfc1b7` hairline border, no drop shadows).
   - Window headers feature frosted glass blur, contextual filename indicator (`home.mdx`, `about.mdx`, `blog.mdx`, `projects.json`), and window control dots.
3. **Typography Engine**:
   - `Inter Tight` (Open Runde substitute) for primary brand headlines and body with tight `-0.025em` tracking on heading sizes.
   - `IBM Plex Sans` for secondary UI controls, navigation items, buttons, and form labels.
   - `Source Code Pro` / `ui-monospace` for code blocks, terminal components, and keyboard shortcuts.
4. **Shapes & Radii**:
   - 4px (`rounded-[4px]`) strictly applied across cards, buttons, and inputs.
   - 6px (`rounded-[6px]`) for application windows.
   - 9999px (`rounded-full`) reserved exclusively for Tag Pills / status chips.
5. **Color & Action Tokens**:
   - Primary Ink: Deep Moss (`#23251d`).
   - Body Prose: Olive Char (`#4d4f46`).
   - Primary CTA: Amber Glow (`#eb9d2a`) with hover `#cd8407` and pressed `#b17816`.
   - Secondary Outlined CTA: Burnished Gold (`#b17816`) border.
   - Active Navigation & Live Links: Signal Blue (`#2f80fa`).

## Consequences

- Tailwind configuration (`tailwind.config.js`) and global styles (`globals.css`) are updated with the exact token map and typography variables.
- All containers (Home, Blog, Project, About, Hobbies, Layout, Header, Footer) and UI components (Cards, Buttons, Pills, Links) are refactored to conform to the 4px radii, Sandy Desk canvas, Application Window framing, and PostHog color palette.
