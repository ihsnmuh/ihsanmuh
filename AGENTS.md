# Agent Guidelines (Repo: ihsanmuh)

This repo is a Next.js 16 + TypeScript personal site with Tailwind CSS, MDX content, and Prisma (Postgres).
Supports both local development and Docker-based development.
No Cursor rules (`.cursor/rules/`, `.cursorrules`) or Copilot rules (`.github/copilot-instructions.md`) exist.

## Quick Commands

- Install: `yarn`
- Dev server: `yarn dev` (http://localhost:3000)
- Production build: `yarn build` (runs `next build` + `generate-rss` + `next-sitemap`)
- Start built app: `yarn start`
- Lint: `yarn lint` (runs `eslint src/`)
- Lint + auto-fix: `yarn lint:fix`
- Format: `yarn format` (Prettier write)
- Format check: `yarn format:check`
- Type check: `yarn typecheck` (runs `tsc --noEmit`)
- Prisma client: `yarn generate`

### Docker Commands

- Build image locally: `yarn docker:build`
- Run container locally: `yarn docker:run`
- CI/CD builds and pushes to Docker Hub automatically on `master`
- See `docker/README.md` for detailed Docker documentation

## Tests (Vitest)

- Run all tests: `yarn test`
- Run a single test file: `yarn vitest src/__tests__/helpers/formatDate.test.ts`
- Run tests matching a name: `yarn vitest -t "should format date"`
- Interactive UI: `yarn test:ui`
- Coverage: `yarn test:coverage`
- Config: `vitest.config.ts` (globals: true, environment: jsdom, setup: `vitest.setup.ts`)
- Test files live in `src/__tests__/` mirroring the `src/` structure.
- Uses `@testing-library/react` + `@testing-library/jest-dom` for component tests.

## Environment Variables

- Builds fail early if required env vars are missing (see `checkEnvVars.ts`).
- Required: `NEXT_PUBLIC_ROOT`, `NEXT_PUBLIC_URL`, `NEXT_PUBLIC_API`, `NEXT_PUBLIC_API_PROJECT`, `DATABASE_URL`
- Template: `.env.example`
- CI/Prod: GitHub workflow writes `.env` from `secrets.ENV_PROD` then runs `yarn build`.
- Never commit real secrets; update `.env.example` when adding vars.

## Node / Package Manager

- Package manager: Yarn 4.12.0 (`.yarnrc.yml` uses `node-modules` linker)
- CI: Node 22.x with corepack enabled
- Docker: Node 20.x Alpine
- Local pin: `.npmrc` specifies `v18.18.2`

## Lint / Format Details

### Lint

- Primary: `yarn lint` (ESLint on `src/`)
- Fix: `yarn lint:fix`
- Lint a single file: `yarn eslint src/pages/index.tsx`
- Config: `.eslintrc.js`
- Key rules: `no-console` warn, `unused-imports/no-unused-imports` warn, `simple-import-sort/imports` with grouped ordering
- Prefix intentionally-unused args/vars with `_`

### Format

- Format all: `yarn format`
- Check: `yarn format:check`
- Single file: `yarn prettier --write src/lib/utils.ts`
- Config: `.prettierrc.js` (single quotes incl JSX, semicolons, tabWidth 2)

### TypeScript

- Strict mode enabled with `noUncheckedIndexedAccess` and `noFallthroughCasesInSwitch`.
- Type check: `yarn typecheck`

## Prisma / Database

- Generate client: `yarn generate`
- Migrate: `npx prisma migrate dev`
- Studio: `npx prisma studio`
- Seed: `npx prisma db seed`
- Schema: `prisma/schema.prisma` (Models: `Projects`, `PostViews`)

## Git Hooks / CI

Husky hooks (`.husky/`):

- **pre-commit:** `yarn lint-staged` (runs Prettier on staged `*.{js,jsx,ts,tsx,html,css,json}`)
- **commit-msg:** commitlint (conventional commits)
- **pre-push:** `yarn build`
- Commitlint types: `feat`, `fix`, `docs`, `chore`, `style`, `refactor`, `ci`, `test`, `revert`, `perf`, `vercel`

CI pipeline (`.github/workflows/prod-ci.yml`): format:check, lint, typecheck, then Docker build+push on master.

## Project Structure

- `src/pages/*` -- Next.js pages + API routes (`src/pages/api/*`)
- `src/components/*` -- UI components (Atoms / Molecules / Organism)
- `src/containers/*` -- Page-level compositions (home, blog, about, project, layout)
- `src/lib/*` -- Core utilities (prisma client, MDX server helpers, utils, structured data)
- `src/helpers/*` -- Reusable hooks and pure helpers (formatDate, readingTime, etc.)
- `src/services/*` -- API fetch wrappers
- `src/queries/*` -- TanStack Query configurations (queryKey + queryFn)
- `src/constant/*` -- Static data and query key constants
- `src/contents/*` -- MDX blog posts and project data
- `src/types/*` -- Shared TypeScript types and interfaces
- `src/__tests__/*` -- Vitest test files mirroring src/ structure

## Code Style Guidelines

### Imports

- Use absolute imports via the path alias `@/*` (maps to `src/*`).
- Keep imports sorted; `simple-import-sort` enforces this grouping order:
  1. External packages
  2. CSS imports
  3. `@/lib`, `@/hooks`
  4. `@/data`
  5. `@/components`, `@/container`
  6. `@/store`
  7. Other `@/` paths
  8. Relative paths
  9. `@/types`

### Formatting

- Follow Prettier output; do not micro-style.
- Keep JSX readable; prefer early returns over nested branches.
- Use `cn()` from `src/lib/utils.ts` for conditional Tailwind class merging.

### Types

- TypeScript strict mode is on; avoid `any` unless truly unavoidable.
- Prefer typed function boundaries for exported helpers.
- Convention: prefix interfaces with `I` (e.g., `IProject`), type aliases with `T` (e.g., `TPosts`).
- For React props: use `type` for props/union shapes, `interface` for extendable objects.
- Match nearby file conventions when editing existing code.

### Naming

- React components: `PascalCase` (files match component name).
- Hooks: `useSomething` (e.g., `useViewCounter`, `useHeadingData`).
- Variables/functions: `camelCase`.
- Constants: `SCREAMING_SNAKE_CASE`.
- Prisma models/fields: match schema naming; avoid renaming DB-facing fields.

### Error Handling

- API routes (`src/pages/api/*`):
  - Validate/normalize query params (see `src/pages/api/projects.ts`).
  - Return stable error shape `{ message, code }` instead of raw thrown objects.
  - Avoid leaking sensitive error details.
- Server-side utilities: surface actionable errors with context.

### React / Next.js Patterns

- Use `next/dynamic` for heavy components (e.g., ThemeSwitcher in Header).
- Use `next/font` for font loading (Inter + Poppins configured in Layout).
- Use `React.forwardRef` for link/button wrapper components.
- Prefer shared link components in `src/components/Atoms/links/*` (UnstyledLink handles external links with `target="_blank"` + `rel="noopener noreferrer"`).
- Use TanStack Query v4 for server-state; query configs live in `src/queries/`.

### Prisma Client Usage

- Use the singleton from `src/lib/prisma.ts` (prevents connection exhaustion in dev).
- Disconnect in scripts (see `prisma/seed.ts`).

## When Editing

- Keep changes focused; avoid drive-by refactors.
- Run `yarn format && yarn lint` before considering work done.
- If you touch DB/schema: run `yarn generate` and create migrations with `npx prisma migrate dev`.
- Add comments only for function/component documentation, not inline explanations.
