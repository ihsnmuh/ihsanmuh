# Ihsanmuh Website

Personal portfolio website showing projects, articles, and personal stories of Muhammad Ihsan (Software Engineer, 4+ years experience).

## Design System & Ubiquitous Language (Editorial Minimalism)

**Minimalist & Editorial Persona**:
A calm, content-first editorial portfolio built around warm monochrome surfaces, generous macro-whitespace, crisp 1px hairline borders, and strong serif/sans typographic contrast. Supports **Dual Mode (Light & Dark)** automatically following the visitor's system preference with a header theme toggle.

**Theme Engine**:
`next-themes` with `attribute="class"`, `defaultTheme="system"`, and `enableSystem`. All Tailwind semantic color tokens map to RGB CSS custom properties (`:root` for Light Mode, `.dark` for Dark Mode).

**Surface Stack & Colors**:

- Canvas (`bg-canvas`): Warm Alabaster `#FAF9F6` (Light) / Deep Obsidian `#0E0E10` (Dark).
- Surface (`bg-surface`): Pure White `#FFFFFF` (Light) / Charcoal Surface `#16161A` (Dark).
- Subtle (`bg-subtle`): Warm Stone `#F2F0EB` (Light) / Muted Obsidian `#1F1F24` (Dark).
- Hairline (`border-hairline`): `#E7E5E0` (Light) / `#26262C` (Dark).

**Text & Ink Hierarchy**:

- Primary Ink (`text-ink`): `#18181B` (Light) / `#F4F4F0` (Dark).
- Body Prose (`text-body`): `#57534E` (Light) / `#A1A1AA` (Dark).
- Muted / Metadata (`text-muted`): `#78716C` (Light) / `#71717A` (Dark).

**Actions & Accents**:

- Primary CTA (`bg-cta` / `text-cta-fg`): Brand Blue `#2F80FA` with white text in Light Mode; Warm Golden Yellow `#F5B942` with dark `#0E0E10` text in Dark Mode.
- Theme Accent (`text-accent` / `bg-accent-soft`): Brand Blue `#2F80FA` (Light) / Warm Golden Yellow `#F5B942` (Dark), used across the logo, active nav, section eyebrows, links, icons, and focus rings.

**Typography**:

- Primary Sans (`font-primary` / `font-sans`): `Plus Jakarta Sans` (400, 500, 600, 700, 800) for all headings, body copy, navigation, and UI controls.
- Monospace (`font-mono`): `JetBrains Mono` (400, 500) for code blocks, keyboard shortcuts, and short metadata.

**Shapes & Elevation**:

- Cards & Containers: `rounded-lg` (10px) with 1px `border-hairline`.
- Buttons & Inputs: `rounded-md` (8px), flat with subtle `active:scale-[0.98]`.
- Tag Pills: `rounded-full` with subtle background and border.
