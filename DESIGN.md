# ihsanmuh Design Direction — Editorial Minimalism

> Calm, content-first personal portfolio pairing editorial serif typography with warm monochrome surfaces, generous whitespace, and seamless Light & Dark mode support.

**Theme:** Dual Mode (`light` + `dark`, system-aware via `next-themes`)

**Accent Rule:** Primary CTAs are high-contrast monochrome (`--rgb-cta`). A single Editorial Blue accent (`--rgb-accent`) is reserved for links, hover accents, and focus indicators.

---

## Tokens — Colors

Defined as RGB channels in [src/styles/globals.css](file:///Users/a2304/Documents/personal/ihsanmuh/src/styles/globals.css) and mapped in [tailwind.config.js](file:///Users/a2304/Documents/personal/ihsanmuh/tailwind.config.js).

| Token                                       | Light Mode | Dark Mode | Role                                           |
| ------------------------------------------- | ---------- | --------- | ---------------------------------------------- |
| `canvas` (`--rgb-canvas`)                   | `#FAF9F6`  | `#0E0E10` | Page background canvas                         |
| `surface` (`--rgb-surface`)                 | `#FFFFFF`  | `#16161A` | Primary card, modal, and input surface         |
| `subtle` (`--rgb-subtle`)                   | `#F2F0EB`  | `#1F1F24` | Badges, `<kbd>`, hover washes, secondary pills |
| `hover` (`--rgb-hover`)                     | `#EBE8E1`  | `#2A2A31` | Active/hover fill on subtle elements           |
| `ink` (`--rgb-ink`)                         | `#18181B`  | `#F4F4F0` | Headings, primary labels, high-emphasis text   |
| `body` (`--rgb-body`)                       | `#57534E`  | `#A1A1AA` | Standard body prose and descriptions           |
| `muted` (`--rgb-muted`)                     | `#78716C`  | `#71717A` | Dates, reading time, metadata, secondary icons |
| `hairline` (`--rgb-hairline`)               | `#E7E5E0`  | `#26262C` | 1px dividers and card borders                  |
| `hairline-strong` (`--rgb-hairline-strong`) | `#D6D3CD`  | `#383840` | Hover borders and outlined buttons             |
| `cta` (`--rgb-cta`)                         | `#2F80FA`  | `#F5B942` | Primary button fill                            |
| `cta-fg` (`--rgb-cta-fg`)                   | `#FFFFFF`  | `#0E0E10` | Primary button label                           |
| `accent` (`--rgb-accent`)                   | `#2F80FA`  | `#F5B942` | Logo, links, eyebrows, active states, focus    |
| `accent-soft` (`--rgb-accent-soft`)         | `#EBF3FF`  | `#382A0E` | Selection, active nav, subtle icon/badge wash  |

---

## Tokens — Typography

Loaded via `next/font/google` in [src/containers/layout/Layout.tsx](file:///Users/a2304/Documents/personal/ihsanmuh/src/containers/layout/Layout.tsx) and exposed globally on `:root`:

- **Primary Sans (`font-primary` / `font-sans`)**: `Plus Jakarta Sans` (400, 500, 600, 700, 800) — All headings, navigation, body copy, descriptions, and UI controls.
- **Monospace (`font-mono`)**: `JetBrains Mono` (400, 500) — Section eyebrows, dates, reading time, keyboard shortcuts (`⌘K`, `/`), and code blocks.

---

## Layout & Spacing Rules

- **Main container**: `max-w-4xl mx-auto px-5 sm:px-6` with generous top/bottom breathing room (`pt-24 sm:pt-28 pb-20`).
- **Article prose**: Constrained to `68ch` with `line-height: 1.75` for comfortable long-form reading.
- **No faux-OS chrome**: Content flows directly on the page canvas without window frames or traffic-light dots.
- **Motion**: Subtle fade-up reveals (`12px` Y-offset, `cubic-bezier(0.16, 1, 0.3, 1)`) and crisp `active:scale-[0.98]` button feedback, respecting `prefers-reduced-motion`.
