# Ihsanmuh Website

Personal portfolio website and engineering blog of **Muhammad Ihsan**, a software engineer in Jakarta with 4+ years of experience building full-stack web applications across the React and TypeScript ecosystem.

## Design System & Ubiquitous Language (Editorial Minimalism)

**Minimalist & Editorial Persona**:
A calm, content-first editorial portfolio built around warm monochrome surfaces, generous macro-whitespace, crisp 1px hairline borders, and clean sans/monospace typographic contrast. Supports **Dual Mode (Light & Dark)** automatically following the visitor's system preference with a header theme toggle.

**Theme Engine**:
`next-themes` with `attribute="class"`, `defaultTheme="system"`, and `enableSystem`. All Tailwind semantic color tokens map to RGB CSS custom properties (`:root` for Light Mode, `.dark` for Dark Mode) in `src/styles/globals.css`.

**Surface Stack & Colors**:

- Canvas (`bg-canvas`): Warm Alabaster `#FAF9F6` (Light) / Deep Obsidian `#0E0E10` (Dark).
- Surface (`bg-surface`): Pure White `#FFFFFF` (Light) / Charcoal Surface `#16161A` (Dark).
- Subtle (`bg-subtle`): Warm Stone `#F2F0EB` (Light) / Muted Obsidian `#1F1F24` (Dark).
- Hairline (`border-hairline`): `#E7E5E0` (Light) / `#26262C` (Dark).
- Strong Hairline (`border-hairline-strong`): `#D6D3CD` (Light) / `#383840` (Dark).

**Text & Ink Hierarchy**:

- Primary Ink (`text-ink`): `#18181B` (Light) / `#F4F4F0` (Dark).
- Body Prose (`text-body`): `#57534E` (Light) / `#A1A1AA` (Dark).
- Muted / Metadata (`text-muted`): `#69635E` (Light) / `#9494A0` (Dark) — calibrated for WCAG AA+ contrast.

**Actions & Accents**:

- Primary CTA (`bg-cta` / `text-cta-fg`): Brand Blue `#1A63D8` (hover `#1552B8`) with white text in Light Mode; Warm Golden Yellow `#F5B942` (hover `#FBCE6B`) with dark `#0E0E10` text in Dark Mode.
- Theme Accent (`text-accent` / `bg-accent-soft`): Brand Blue `#1A63D8` / `#EBF3FF` (Light) and Warm Golden Yellow `#F5B942` / `#382A0E` (Dark), used across the logo, active nav, section eyebrows, links, icons, and focus rings.

**Typography**:

- Primary Sans (`font-primary` / `font-sans`): `Plus Jakarta Sans` (400, 500, 600, 700, 800) for headings, body copy, navigation, and UI controls.
- Monospace (`font-mono`): `JetBrains Mono` (400, 500) for code blocks, section eyebrows, keyboard shortcuts, tech stack chips, and short metadata.

**Shapes & Elevation**:

- Cards & Containers: `rounded-lg` with 1px `border-hairline` (and subtle paper elevation shadow on Light Mode project cards to separate cleanly from the warm canvas).
- Buttons & Inputs: `rounded-md`, flat with subtle `active:scale-[0.98]`.
- Tech Stack Chips: `rounded-md` mono chips with `border-hairline` (`HeroTech`, `GroupedTechStack`, `StackPills`).
- Blog Tag & Status Pills: `rounded-full` with subtle background and border.
