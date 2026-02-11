# Agent Guidelines (Repo: ihsanmuh)

This repo is a Next.js 16 + TypeScript personal site with Tailwind CSS, MDX content, and Prisma (Postgres).
Supports both local development and Docker-based development.
There are no Cursor rules in `.cursor/rules/` or `.cursorrules`, and no Copilot rules in `.github/copilot-instructions.md`.

## Quick Commands

- Install: `yarn`
- Dev server: `yarn dev` (http://localhost:3000)
- Production build: `yarn build`
- Start built app: `yarn start`
- Lint: `yarn lint` (runs `next lint`)
- Lint + auto-fix: `yarn lint:fix` (eslint fixes + format)
- Format: `yarn format` (Prettier write)
- Format check: `yarn format:check`
- Prisma client: `yarn generate`

### Docker Commands

- Build image locally: `yarn docker:build`
- Run container locally: `yarn docker:run`
- CI/CD builds and pushes to Docker Hub automatically on `master`
- See `docker/README.md` for detailed Docker documentation

## Environment Variables

- Builds fail early if required env vars are missing (see `checkEnvVars.ts`).
- Required: `NEXT_PUBLIC_ROOT`, `NEXT_PUBLIC_URL`, `NEXT_PUBLIC_API`, `NEXT_PUBLIC_API_PROJECT`, `DATABASE_URL`
- Template: `.env.example`
- CI/Prod: GitHub workflow writes `.env` from `secrets.ENV_PROD` then runs `yarn build`.
- Never commit real secrets; update `.env.example` when adding vars.

## Node / Package Manager

- Package manager: Yarn (see `yarn.lock`, `.yarnrc.yml` uses `node-modules` linker)
- Node: 18.x in CI; local version pinned in `.npmrc` as `v18.18.2`
- Docker: Node 20.x Alpine (required for Next.js 16)

## Lint / Format Details

### Lint

- Primary: `yarn lint` (Next.js ESLint)
- Fix: `yarn lint:fix`
- Lint a single file:
  - `yarn eslint src/pages/index.tsx`
  - `yarn eslint src --max-warnings=0`
- Rules: `.eslintrc.js` (notable: `no-console` warn; `unused-imports`; `simple-import-sort` groups)
- `no-console`: warn (avoid console in production paths; use sparingly)
- Prefix intentionally-unused args/vars with `_`

### Format

- Format all: `yarn format`
- Check formatting: `yarn format:check`
- Format one file: `yarn prettier --write src/lib/utils.ts`
- Prettier: `.prettierrc.js` (single quotes incl JSX; semicolons; tabWidth 2)

### TypeScript

- Strict TypeScript is enabled (see `tsconfig.json`).
- Type-check (no script provided):
  - `npx tsc -p tsconfig.json --noEmit`

## Tests

- No test runner is configured (no `test` script; no `*.test.*`/`*.spec.*`/`__tests__`).
- If adding tests, document single-test commands (examples):
  - Jest: `yarn jest path/to/file.test.ts` or `yarn jest -t "test name"`
  - Vitest: `yarn vitest path/to/file.test.ts` or `yarn vitest -t "test name"`

## Prisma / Database

- Generate client: `yarn generate`
- Common local workflows (run manually as needed):
  - Migrate: `npx prisma migrate dev`
  - Studio: `npx prisma studio`
  - Seed (configured in `package.json`): `npx prisma db seed`
    Prisma schema: `prisma/schema.prisma`

## Git Hooks / CI Expectations

Husky hooks (see `.husky/`):

- pre-commit: `yarn format` + `yarn lint` + `yarn lint-staged`
- commit-msg: commitlint (conventional commits)
- pre-push: `yarn build`
- Lint-staged: Prettier on `**/*.{js,jsx,ts,tsx,html,css,json}`
- Commitlint types (see `commitlint.config.js`): `feat`, `fix`, `docs`, `chore`, `style`, `refactor`, `ci`, `test`, `revert`, `perf`, `vercel`

## Project Structure (High Level)

- `src/pages/*`: Next.js pages + API routes (`src/pages/api/*`)
- `src/components/*`: UI building blocks (Atoms/Molecules/Organism)
- `src/containers/*`: page-level compositions
- `src/lib/*`, `src/helpers/*`, `src/contents/*`, `prisma/*`

## Code Style Guidelines

### Imports

- Use absolute imports via the TS path alias: `@/*` (maps to `src/*`).
- Keep imports sorted; do not hand-fight the linter.
- Import group rules are enforced by `simple-import-sort` (see `.eslintrc.js`).

### Formatting

- Follow Prettier output; do not micro-style.
- Keep JSX readable; prefer early returns over nested branches.
- Use `cn()` from `src/lib/utils.ts` for conditional Tailwind class merging.

### Types

- TypeScript strict mode is on; avoid `any` unless truly unavoidable.
- Prefer typed function boundaries for exported helpers.
- For React props:
  - Use `type` for props/union-heavy shapes.
  - Use `interface` for extendable/public object shapes.
  - Match nearby file conventions when editing existing code.

### Naming

- React components: `PascalCase` (files generally match component name).
- Hooks: `useSomething`.
- Variables/functions: `camelCase`.
- Constants: `SCREAMING_SNAKE_CASE`.
- Prisma models/fields: match schema naming; avoid renaming DB-facing fields casually.

### Error Handling

- API routes (`src/pages/api/*`):
  - Validate/normalize query params (see `src/pages/api/projects.ts`).
  - Prefer returning a stable error shape (message/code) instead of raw thrown objects.
  - Avoid leaking sensitive error details.
- Server-side utilities: surface actionable errors; include context.

### React / Next.js Patterns

- Use `next/dynamic` for large layout pieces where appropriate (see `src/containers/layout/Layout.tsx`).
- Use `next/font` for font loading where configured.
- For links:
  - Prefer the shared link components in `src/components/Atoms/links/*`.
  - External links should set `target="_blank"` + `rel="noopener noreferrer"` (handled by `UnstyledLink`).

### Prisma Client Usage

- Use the singleton pattern from `src/lib/prisma.ts` (prevents exhausting connections in dev).
- Disconnect in scripts (see `prisma/seed.ts`).

## When Editing

- Keep changes focused; avoid drive-by refactors.
- Run: `yarn format && yarn lint` before considering work done.
- If you touch DB/schema: run `yarn generate` and update migrations appropriately.
