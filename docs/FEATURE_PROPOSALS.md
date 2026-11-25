# Feature Proposals & Roadmap Review

> Product and engineering evaluation of candidate features for **ihsanmuh.com**, weighed against the site's **Editorial Minimalism** design language ([`DESIGN.md`](../DESIGN.md)), current technical stack ([`AGENTS.md`](../AGENTS.md)), and active career positioning.

---

## 1. Context & Evaluation Criteria

The site already covers the core fundamentals well:

- **Editorial Minimalism UI** with system-aware Light/Dark mode, `Plus Jakarta Sans` + `JetBrains Mono`, and WCAG AA+ contrast tokens.
- **Global Command Palette (`⌘K`)** searching across routes, blog posts, and projects (`src/components/Molecules/CommandPalette.tsx`).
- **MDX Blog Engine** with `rehype-pretty-code` / `shiki`, sticky desktop & mobile Table of Contents, reading progress bar, RSS feed, sitemap, and dynamic Open Graph images (`/api/og`).
- **PostgreSQL + Prisma Engagement** tracking per-post views (`PostViews`) and likes (`PostLikes`).
- **Filterable Project Showcase** backed by Prisma (`Projects`) and TanStack Query.

Every new feature below is evaluated against three constraints:

1. **Signal over noise:** Does it help hiring managers, tech leads, or peers understand how Ihsan thinks and builds?
2. **Design Restraint:** Does it feel native to the calm, warm-monochrome editorial layout without introducing visual clutter?
3. **Maintenance Cost:** Can one person keep it accurate and alive alongside a full-time engineering role?

---

## 2. Quick Comparison Matrix

| #   | Feature                                  | Category          | Effort | Portfolio Signal | Ongoing Maintenance | Priority |
| --- | ---------------------------------------- | ----------------- | ------ | ---------------- | ------------------- | -------- |
| 1   | Project Case Studies (`/project/[slug]`) | Career & Craft    | Medium | Very High        | Low (per project)   | **P1**   |
| 2   | Short Notes / Snippets (`/notes`)        | Writing & SEO     | Small  | High             | Low (bite-sized)    | **P1**   |
| 3   | Print-Ready Web Resume (`/resume`)       | Career & Utility  | Small  | High             | Very Low            | **P1**   |
| 4   | UI & Craft Lab (`/lab`)                  | Frontend Craft    | Medium | Very High        | Medium              | **P2**   |
| 5   | Interactive MDX Components               | Reader Experience | Small  | High             | Low (opt-in)        | **P2**   |
| 6   | GitHub Discussions via Giscus            | Community         | Small  | Medium           | Near Zero           | **P2**   |
| 7   | Public `/stats` Dashboard                | Transparency      | Small  | Medium           | Zero (automated)    | **P3**   |
| 8   | `/now` & `/uses` Pages                   | Personal Context  | Small  | Low–Medium       | Low (quarterly)     | **P3**   |

---

## 3. Detailed Feature Proposals

### 3.1 Project Case Studies (`/project/[slug]`)

**Current state:** `ProjectCard` and `ShowcaseProjectCard` truncate descriptions to three lines (`line-clamp-3`) and send visitors straight to an external live URL or GitHub repo. For enterprise, internal, or pre-launch work (e.g., BRI Universal Biller or Female Daily internal platforms), external links either cannot be shared publicly or fail to show architectural ownership.

**Proposal:** Add optional MDX-backed detail pages at `/project/[slug]` for selected flagship projects. Projects without a case study keep their current direct-link behavior; projects with a case study open a structured narrative (_Context & Problem → Architecture & Design System → Key Trade-offs → Measurable Impact_), while still exposing Live Site and GitHub buttons in the header.

- **Pros:**
  - Highest-leverage upgrade for senior/mid-to-senior engineering interviews; demonstrates system thinking, trade-off analysis, and business impact rather than just screenshots.
  - Solves the "private repo / internal dashboard" problem cleanly through architecture diagrams and redacted UI walkthroughs.
  - Reuses the existing `next-mdx-remote` + `shiki` pipeline, TOC components, and `/api/og` generator.
- **Cons:**
  - Writing 2–3 strong case studies requires real upfront reflection and editing time.
  - If only one project has a case study and ten do not, inconsistent click targets on project cards can feel confusing unless clearly indicated (e.g., a dedicated `"Read case study →"` action).

---

### 3.2 Short Notes / Engineering Snippets (`/notes`)

**Current state:** `/blog` is structured around full-length articles with hero images, reading time, and multi-section TOCs. That high bar creates friction when sharing quick lessons from day-to-day work.

**Proposal:** Introduce a lightweight `/notes` stream (or a `"Notes"` tab alongside `"Articles"`) for 100–300 word entries—TypeScript patterns, Prisma gotchas, CSS/Tailwind fixes, Docker snippets, or TILs—requiring no cover image.

- **Pros:**
  - Dramatically lowers publishing friction, keeping the site visibly active every few weeks.
  - Captures high-intent long-tail search traffic from developers searching exact error messages or implementation patterns.
  - Integrates naturally into `CommandPalette` (`⌘K`) as a fast personal reference library.
- **Cons:**
  - Splits writing across two formats; without clear editorial boundaries ("when is something a Note vs. a Blog Post?"), categorization can blur.
  - Too many ultra-short or unpolished notes can dilute perceived writing quality if mixed directly into the main homepage feed without separate styling.

---

### 3.3 Print-Ready Web Resume (`/resume`)

**Current state:** Career history, impact highlights, tech stack, and education already live as structured TypeScript constants in `src/constant/experience.ts` and `src/containers/about/index.tsx`, while recruiters still regularly ask for a clean PDF resume.

**Proposal:** Create a dedicated `/resume` route sourced from the same structured experience data, styled with `@media print` rules (clean A4/Letter pagination, hidden site chrome, crisp typography) plus a `"Print / Save PDF"` button and a `⌘K` Command Palette action.

- **Pros:**
  - Single source of truth—updating experience in code updates both `/about` and `/resume` simultaneously.
  - Gives recruiters and hiring managers instant, friction-free access from `/about` and `CommandPalette`.
  - `@media print` craftsmanship is a subtle, memorable frontend touch.
- **Cons:**
  - Browser print engines (Chrome vs. Safari vs. Firefox) handle page breaks and margins slightly differently and require careful cross-browser testing.
  - Strict ATS (Applicant Tracking System) parsers sometimes prefer a static, pre-exported PDF over browser-printed HTML; pairing `/resume` with a static `/resume.pdf` fallback may still be worthwhile.

---

### 3.4 Interactive UI & Craft Lab (`/lab`)

**Current state:** `src/pages/component/index.tsx` exists as an internal kitchen-sink reference page, and `/about` highlights experience translating Figma design systems into reusable code—yet visitors have no curated place to experience that UI craft firsthand.

**Proposal:** Evolve `/component` into a curated `/lab` page featuring small, self-contained interactive UI studies: micro-interactions (`motion/react`), accessible Radix primitives, custom hooks, state-driven animations, and design-token playgrounds, each with a concise caption and source link.

- **Pros:**
  - Follows "show, don't tell"—proves design-engineering sensitivity and React 19 / TypeScript fluency in seconds.
  - Fits the Editorial Minimalism aesthetic nicely when presented on clean `bg-surface` specimen stages with `border-hairline` frames.
  - Provides a sandbox to prototype ideas without cluttering production pages.
- **Cons:**
  - Interactive demos can quietly increase client JS bundle size if not isolated via `next/dynamic` or per-card lazy loading.
  - Half-finished experiments age poorly; every specimen needs keyboard accessibility, mobile responsiveness, and dual-theme polish before shipping.

---

### 3.5 Interactive MDX Callouts & Live Demos in Blog Posts

**Current state:** Blog posts render static Markdown + syntax-highlighted code blocks via `next-mdx-remote` (`src/containers/blog/detail.tsx`).

**Proposal:** Expand the custom MDX component map with 2–3 reusable editorial primitives: structured callout boxes (`Note`, `Warning`, `Tip`), before/after comparison toggles, and lightweight interactive state widgets embedded inline in technical articles.

- **Pros:**
  - Elevates technical articles from standard tutorials to memorable, Josh-Comeau/Emil-Kowalski-style interactive explanations.
  - Zero impact on older posts—strictly opt-in per MDX file.
  - Leverages `next-mdx-remote`, which is already installed and configured.
- **Cons:**
  - Passing heavy custom components into `MDXRemote` without lazy loading adds hydration overhead to every blog post page.
  - Custom JSX inside `.mdx` files makes raw content slightly less portable if migrating to a pure-Markdown platform later.

---

### 3.6 GitHub-Backed Article Discussions (Giscus)

**Current state:** The end of each article (`src/containers/blog/detail.tsx`) offers a `LikeButton` and `Copy link` action, with no way for readers to ask follow-up questions or share corrections directly on the page.

**Proposal:** Add lazy-loaded **Giscus** comments (powered by GitHub Discussions) below the article engagement card, synced dynamically with `next-themes` (`light` / `dark`).

- **Pros:**
  - Zero database schema changes, zero custom auth, and zero spam-moderation burden—GitHub handles identity and moderation.
  - Theme switching hooks cleanly into `resolvedTheme` from `next-themes`.
  - Readers can also comment directly from the GitHub Discussions tab.
- **Cons:**
  - Requires readers to have a GitHub account (fine for an engineering audience, restrictive for non-developers).
  - An empty comment box on every post can make low-traffic articles feel quiet until an audience builds up (mitigated by rendering comments behind a `"Load discussion"` disclosure or lazy intersection observer).
  - Embeds a third-party iframe script on blog detail pages.

---

### 3.7 Public `/stats` Dashboard

**Current state:** `prisma/schema.prisma` already tracks `PostViews` and `PostLikes`, and `/api/stats` aggregates metrics on the backend.

**Proposal:** Build a clean editorial `/stats` page showcasing aggregate blog views, total likes, most-read articles, total published words/posts, and cached GitHub contribution/repository metrics using `JetBrains Mono` `tabular-nums` cards.

- **Pros:**
  - Makes visible use of the PostgreSQL + Prisma + TanStack Query backend architecture already running in Docker.
  - Acts as a natural discovery funnel toward the highest-performing articles.
  - Fully automated once built—zero manual upkeep.
- **Cons:**
  - Early-stage or modest view counts can unintentionally work against social proof if displayed too prominently.
  - Calling external APIs (like GitHub) requires proper server-side caching (`Cache-Control` / stale-while-revalidate) to avoid rate limits and slow TTFB.

---

### 3.8 `/now` and `/uses` Pages

**Current state:** `/about` covers career bio, impact highlights, experience, stack, and education, but stays relatively static over time.

**Proposal:** Add two classic indie-web editorial pages linked from the Footer and `CommandPalette`:

- **`/now`** — What Ihsan is currently building at work, learning, and reading right now (with a `"Last updated"` timestamp).
- **`/uses`** — Daily hardware, editor/terminal config, fonts, and developer workflow tools.

- **Pros:**
  - Very fast to implement (pure static/MDX prose) and fits the warm editorial aesthetic effortlessly.
  - Adds human personality that helps interviewers connect beyond bullet-point credentials.
- **Cons:**
  - A `/now` page with a `"Last updated"` date from 14 months ago signals neglect—it requires a habit of updating at least once per quarter.
  - Lower direct hiring impact compared to Project Case Studies or Technical Writing, so it should not sit in the primary top navbar.

---

## 4. Explicit Anti-Goals (What Not to Add)

To protect the site's **Editorial Minimalism** identity (`DESIGN.md`) and Lighthouse performance scores, the following common portfolio features are intentionally **not** recommended:

| Feature                            | Why to Avoid                                                                                                        |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Floating AI "Ask My CV" Bot**    | Visual clutter, ongoing LLM API/abuse risk, and worse signal-to-noise than a crisp `/about` + `/resume` + `⌘K`.     |
| **Newsletter Pop-ups / Modals**    | Breaks calm reading flow; RSS (`/rss.xml`) or a quiet inline footer link is far more respectful if ever needed.     |
| **Persistent Spotify / Music Bar** | Distracts from typography and adds constant third-party polling for minimal professional value.                     |
| **Heavy WebGL / Scroll-Jacking**   | Conflicts with `prefers-reduced-motion`, hurts mobile battery/LCP, and clashes with existing subtle canvas touches. |
| **Custom Anonymous Guestbook**     | High moderation/spam surface on PostgreSQL without meaningful professional return.                                  |

---

## 5. Suggested Rollout Sequence

If approved after review, shipping in small independent phases avoids scope creep:

1. **Phase 1 — High Career Leverage:** Project Case Studies (`/project/[slug]`) for 2 flagship projects + Print-Ready `/resume` (with static PDF fallback).
2. **Phase 2 — Publishing Momentum:** Short Notes (`/notes`) + reusable MDX Callout components (`Note` / `Tip` / `Warning`).
3. **Phase 3 — Craft & Polish:** Curated `/lab` showcase (evolving `/component`) + optional `/now` or `/stats` linked quietly in the footer and `⌘K`.
