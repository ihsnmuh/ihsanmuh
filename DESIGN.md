# ihsanmuh Design Direction — Editorial Minimalism

> Calm, content-first personal portfolio pairing geometric sans & monospace typography with warm monochrome surfaces, generous whitespace, and seamless Light & Dark mode support.

**Theme:** Dual Mode (`light` + `dark`, system-aware via `next-themes`)

**Accent Rule:** Brand Blue (`#1A63D8`) in Light Mode and Warm Golden Yellow (`#F5B942`) in Dark Mode power primary CTAs (`--rgb-cta`) and editorial accents (`--rgb-accent`) — logo, links, section eyebrows, active states, and focus rings — calibrated for WCAG AA+ contrast.

---

## Tokens — Colors

Defined as RGB channels in [`src/styles/globals.css`](src/styles/globals.css) and mapped in [`tailwind.config.js`](tailwind.config.js).

| Token                                       | Light Mode | Dark Mode | Role                                           |
| ------------------------------------------- | ---------- | --------- | ---------------------------------------------- |
| `canvas` (`--rgb-canvas`)                   | `#FAF9F6`  | `#0E0E10` | Page background canvas                         |
| `surface` (`--rgb-surface`)                 | `#FFFFFF`  | `#16161A` | Primary card, modal, and input surface         |
| `subtle` (`--rgb-subtle`)                   | `#F2F0EB`  | `#1F1F24` | Badges, `<kbd>`, hover washes, card mats       |
| `hover` (`--rgb-hover`)                     | `#EBE8E1`  | `#2A2A31` | Active/hover fill on subtle elements           |
| `ink` (`--rgb-ink`)                         | `#18181B`  | `#F4F4F0` | Headings, primary labels, high-emphasis text   |
| `body` (`--rgb-body`)                       | `#57534E`  | `#A1A1AA` | Standard body prose and descriptions           |
| `muted` (`--rgb-muted`)                     | `#69635E`  | `#9494A0` | Dates, reading time, metadata, secondary icons |
| `hairline` (`--rgb-hairline`)               | `#E7E5E0`  | `#26262C` | 1px dividers and card borders                  |
| `hairline-strong` (`--rgb-hairline-strong`) | `#D6D3CD`  | `#383840` | Hover borders, outlined buttons, card outlines |
| `cta` (`--rgb-cta`)                         | `#1A63D8`  | `#F5B942` | Primary button fill                            |
| `cta-hover` (`--rgb-cta-hover`)             | `#1552B8`  | `#FBCE6B` | Primary button hover fill                      |
| `cta-fg` (`--rgb-cta-fg`)                   | `#FFFFFF`  | `#0E0E10` | Primary button label                           |
| `accent` (`--rgb-accent`)                   | `#1A63D8`  | `#F5B942` | Logo, links, eyebrows, active states, focus    |
| `accent-hover` (`--rgb-accent-hover`)       | `#1552B8`  | `#FBCE6B` | Link and accent hover state                    |
| `accent-soft` (`--rgb-accent-soft`)         | `#EBF3FF`  | `#382A0E` | Selection, active nav, subtle icon/badge wash  |

---

## Tokens — Typography

Loaded via `next/font/google` in [`src/containers/layout/Layout.tsx`](src/containers/layout/Layout.tsx) and exposed globally on `:root`:

- **Primary Sans (`font-primary` / `font-sans`)**: `Plus Jakarta Sans` (400, 500, 600, 700, 800) — All headings, navigation, body copy, descriptions, and UI controls.
- **Monospace (`font-mono`)**: `JetBrains Mono` (400, 500) — Section eyebrows, dates, reading time, tech stack chips, keyboard shortcuts (`⌘K`, `/`), and code blocks.

---

## Layout & Spacing Rules

- **Main container**: `max-w-4xl mx-auto px-5 sm:px-6` with generous top/bottom breathing room (`pt-24 sm:pt-28 pb-20`).
- **Article prose**: Constrained to `68ch` with `line-height: 1.75` for comfortable long-form reading.
- **Project cards**: Inset thumbnail frame on `bg-subtle`, full-bleed footer strip (`bg-subtle/75`) with `rounded-md` mono stack chips, and subtle light-mode paper shadow (`dark:shadow-none`) for clear separation from `#FAF9F6`.
- **No faux-OS chrome**: Content flows directly on the page canvas without window frames or traffic-light dots.
- **Motion**: Subtle fade-up reveals (`12px` Y-offset, `cubic-bezier(0.16, 1, 0.3, 1)`) and crisp `active:scale-[0.98]` button feedback, respecting `prefers-reduced-motion`.
