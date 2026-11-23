# ADR 0002: Migration to Say Briefly (Creative Agency Sketchbook on Cream Paper)

- **Status**: Accepted
- **Date**: 2026-08-19
- **Deciders**: Muhammad Ihsan, AI Assistant

## Context

The site specification was updated to adopt the **Say Briefly — Style Reference** (`DESIGN.md`), a creative studio sketchbook visual identity built around warm Cream Paper (`#fcfaf5`), Forest Ink (`#1a3300`), Highlighter Yellow (`#ffe95c`), Bricolage Grotesque display typography, and pastel sticky-note cards.

## Decision

We adopt the Say Briefly design system across all pages and global components:

1. **Cream Light Mode Lock**: Lock the application canvas to Cream Paper `#fcfaf5` to maintain the physical moodboard aesthetic.
2. **Typography Engine**:
   - `Bricolage Grotesque` 800 for display headlines (positive tracking +0.04-0.05em).
   - `Inter` for body copy, buttons, and subheadings.
   - `Roboto Mono` for technical micro-labels and badges.
3. **Floating Pill Nav**: Replace full-width header with a 16px radius floating pill navbar with a Pencil Gray hairline border, custom logo mark (40x40 `#ffe95c` square + monogram + wordmark), and 6px CTA button.
4. **Editorial Highlighter & Sticky Note Surfaces**:
   - `.highlight-marker` class for rectangular yellow marker washes behind key terms.
   - Pastel sticky note surfaces (`Mint #d5f5c2`, `Teal #a8e5e5`, `Blush #f6d0ff`, `Terracotta #cb5521`) for cards with 12px radii.

## Consequences

- Global CSS (`globals.css`) and Tailwind config (`tailwind.config.js`) will define explicit tokens for `--color-forest-ink`, `--color-highlighter-yellow`, `--color-cream-paper`, etc.
- All cards, headers, footers, buttons, and page containers will be refactored to use the new tokens and radii (6px buttons, 12px cards, 16px nav).
