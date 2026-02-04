# Project Improvements (Task List)

Checklist of the next technical upgrades to improve stability, maintainability, and performance.

## P0 (Should Do Next)

- [x] Fix Tailwind animation config usage

  - `tailwind.config.js`: remove invalid `motion-reduce:animate-none` usage inside `theme.extend.animation`
  - Prefer: keep keyframes/animation values clean, apply `motion-reduce:animate-none` as a class (or rely on `prefers-reduced-motion` CSS in `src/styles/base.css`)

- [x] Clean up current ESLint warnings (reduce noise / prevent bugs)
  - `src/components/Molecules/card/ExperienceCard.tsx`: unused `id`
  - `src/containers/blog/index.tsx`: missing deps in `useEffect`, unused `handleSearch`
  - `src/helpers/useIntersectionObserver.ts`: missing deps (`setActiveId`)
  - `src/services/projectList.ts`: `console` warning

## P1 (Strong Improvements)

- [x] Add a TypeScript typecheck script + use it in CI

  - `package.json`: add `typecheck` script (`tsc -p tsconfig.json --noEmit`)
  - `.github/workflows/*`: run `yarn format:check`, `yarn lint`, `yarn typecheck` before `yarn build`

- [ ] Reduce Next.js page data payload for blog detail pages
  - Build currently warns: `/blog/[slug]` data exceeds 128 kB
  - Reduce props to only what the page needs (avoid shipping large MDX/theme blobs when possible)

## P2 (Nice-to-Have / Hardening)

- [x] API route error shape hardening

  - `src/pages/api/projects.ts`: avoid `res.status(500).json(error)` (raw error)
  - Return stable shape: `{ code, message }`, log server-side details safely

- [x] Fix Prisma seed async behavior

  - `prisma/seed.ts`: avoid `forEach(async ...)` (not awaited)
  - Use `for...of` + `await` or `createMany`

- [ ] Update Browserslist DB (dev hygiene)
  - Run: `npx update-browserslist-db@latest`

## Security Note

- [ ] Revoke/rotate OAuth credentials if an `oauth-callback` URL with `code/state` was shared
  - Treat that code as compromised; rotate secrets/tokens in provider console
