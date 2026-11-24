# ihsanmuh — Personal Website

Personal portfolio and engineering blog of **Muhammad Ihsan**, a software engineer in Jakarta building full-stack web applications across the React and TypeScript ecosystem.

## Features

- **Editorial Design (Light & Dark):** Warm monochrome paper canvas in Light Mode and deep obsidian in Dark Mode (`next-themes`, system-aware).
- **MDX Blog:** Articles with Shiki syntax highlighting (`rehype-pretty-code`), reading-time estimation, table of contents, view counts, and likes stored in PostgreSQL.
- **Projects Showcase:** Database-backed project catalog (`Prisma` + PostgreSQL) with category filtering and tech stack chips.
- **Command Palette (`⌘K`):** Quick navigation and search across pages, articles, and projects.
- **SEO & Syndication:** Dynamic Open Graph images (`/api/og`), JSON-LD structured data, automatic RSS feed (`/rss.xml`), and sitemap generation (`next-sitemap`).

## Tech Stack

### Core

- **Framework:** [Next.js](https://nextjs.org/) 16 (Pages Router) + [React](https://react.dev/) 19
- **Language:** [TypeScript](https://www.typescriptlang.org/) 5 (strict mode)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) 3 with RGB CSS custom property tokens
- **Database:** [Prisma](https://www.prisma.io/) 5 + PostgreSQL
- **Server State:** [TanStack Query](https://tanstack.com/query/latest) v4

### Content & UI

- **Content:** [MDX](https://mdxjs.com/) via `next-mdx-remote` + `gray-matter`
- **Syntax Highlighting:** [Shiki](https://shiki.style/) + `rehype-pretty-code`
- **Typography:** `Plus Jakarta Sans` + `JetBrains Mono` via `next/font/google`
- **Motion & Icons:** [Motion](https://motion.dev/), [Lucide React](https://lucide.dev/), `react-icons`, `@radix-ui/react-tooltip`
- **Themes:** [next-themes](https://github.com/pacocoursey/next-themes)

### Tooling & Quality

- **Lint & Format:** ESLint (with `simple-import-sort` & `unused-imports`) + Prettier
- **Testing:** [Vitest](https://vitest.dev/) 4 + React Testing Library
- **Git Hooks:** Husky + `lint-staged` + Commitlint (Conventional Commits)
- **Bundle Analysis:** `@next/bundle-analyzer`

## Prerequisites

- **Node.js:** v20.x or higher (Docker uses Node 20 Alpine; CI uses Node 22.x)
- **Package Manager:** Yarn 4.12.0 (managed via Corepack / `packageManager` field)
- **Database:** PostgreSQL instance
- **Docker** (optional): For containerized builds and server deployment

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ihsnmuh/ihsanmuh.git
cd ihsanmuh
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Required environment variables (validated at build time by `checkEnvVars.ts`):

- `NEXT_PUBLIC_ROOT` — Root URL of the site
- `NEXT_PUBLIC_URL` — Public domain (e.g., `ihsanmuh.com`)
- `NEXT_PUBLIC_API` — API base URL
- `NEXT_PUBLIC_API_PROJECT` — Projects API endpoint
- `DATABASE_URL` — PostgreSQL connection string

See [`.env.example`](.env.example) for the full template (including optional integrations).

### 4. Set up the database

```bash
# Generate Prisma client
yarn generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed projects from prisma/project.json
npx prisma db seed
```

### 5. Start the development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Docker & Deployment

All Docker configuration files live in `docker/`:

| File                                    | Purpose                                         |
| --------------------------------------- | ----------------------------------------------- |
| `docker/Dockerfile`                     | Multi-stage production build (Node 20 Alpine)   |
| `docker/docker-compose.server.yml`      | Server deployment with existing host PostgreSQL |
| `docker/docker-compose.server-full.yml` | Server deployment with PostgreSQL in Docker     |
| `docker/.dockerignore`                  | Docker build context exclusions                 |

Build and run the production image locally:

```bash
# Build production Docker image
yarn docker:build

# Run container (uses .env)
yarn docker:run
```

In CI/CD:

- `.github/workflows/prod-ci.yml` runs formatting, lint, and type checks on pushes/PRs, then builds and pushes the Docker image to Docker Hub on `master`.
- `.github/workflows/prod-cd.yml` triggers after `Build App` succeeds on `master`, pulls the new image on the server, runs `prisma migrate deploy` + `prisma db seed`, and restarts the container.

## Available Scripts

### Development & Build

- `yarn dev` — Start development server at `http://localhost:3000`
- `yarn build` — Production build (`next build` + RSS feed + sitemap)
- `yarn build:analyze` — Production build with bundle analyzer
- `yarn start` — Start production server

### Code Quality

- `yarn lint` — Run ESLint on `src/`
- `yarn lint:fix` — Auto-fix ESLint issues and run Prettier
- `yarn format` — Format all files with Prettier
- `yarn format:check` — Verify Prettier formatting
- `yarn typecheck` — Run `tsc --noEmit`

### Testing

- `yarn test` — Run Vitest in watch mode (`yarn test --run` for single run)
- `yarn test:ui` — Run Vitest interactive UI
- `yarn test:coverage` — Generate coverage report

### Database

- `yarn generate` — Generate Prisma client
- `npx prisma migrate dev` — Create and apply migrations
- `npx prisma studio` — Open Prisma Studio GUI
- `npx prisma db seed` — Seed database from `prisma/project.json`

## Project Structure

```text
ihsanmuh/
├── src/
│   ├── __tests__/          # Vitest unit & helper tests mirroring src/
│   ├── components/         # UI components (Atoms / Molecules / Organism)
│   ├── constant/           # Static site data, experiences, principles, query keys
│   ├── containers/         # Page-level compositions (home, blog, about, project, layout)
│   ├── contents/           # MDX blog posts
│   ├── helpers/            # Hooks and pure utility helpers
│   ├── lib/                # Prisma singleton, MDX loader, structured data, cn()
│   ├── pages/              # Next.js Pages Router views & API routes (src/pages/api/*)
│   ├── queries/            # TanStack Query key/fn configurations
│   ├── services/           # API fetch wrappers
│   ├── styles/             # Global CSS & semantic color tokens
│   └── types/              # Shared TypeScript interfaces and types
├── docker/                 # Production Dockerfile & server Compose configs
├── prisma/                 # schema.prisma, migrations/, project.json, seed.ts
├── public/                 # Static assets, images, favicons
└── scripts/                # Build scripts (RSS generation)
```

Path alias `@/*` maps to `src/*`.

## Conventions & Documentation

- **Design System:** See [`DESIGN.md`](DESIGN.md) and [`CONTEXT.md`](CONTEXT.md) for color tokens, typography, and layout rules.
- **Agent & Contributor Guidelines:** See [`AGENTS.md`](AGENTS.md) for coding standards, import sorting, and workflow rules.
- **Git Hooks (Husky):**
  - `pre-commit`: runs `yarn format` and `yarn lint-staged` (Prettier on staged files)
  - `commit-msg`: enforces [Conventional Commits](https://www.conventionalcommits.org/) via Commitlint
  - `pre-push`: runs `yarn build`

## License

This project is private and not licensed for public use. All rights reserved.
