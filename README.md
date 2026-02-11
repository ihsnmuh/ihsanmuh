# Ihsan Muh's Personal Website

Welcome to my digital garden 🌱 - A place where I share my thoughts, experiences, and journey in technology and beyond.

## About This Site

This is my personal corner of the internet, built with modern web technologies and a passion for clean, efficient code. Here, I share my insights, projects, and the occasional tech tutorial. The site is designed to be fast, accessible, and a pleasure to read.

## Features

- 📝 **Blog**: Articles about technology, development, and personal experiences
- 🎯 **Projects**: Showcase of my work and side projects
- 🎨 **Modern Design**: Clean, responsive interface with dark mode support
- ⚡ **Performance**: Built for speed and optimal user experience
- 📱 **Mobile First**: Perfect experience across all devices
- 🔍 **SEO Optimized**: Automatic sitemap and RSS feed generation

## Tech Stack

### Core

- **Framework**: [Next.js](https://nextjs.org/) 16 - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) 5 - Type-safe development
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 3 - Utility-first CSS framework
- **Database**: [Prisma](https://www.prisma.io/) 5 + PostgreSQL - Type-safe database ORM
- **State Management**: [TanStack Query](https://tanstack.com/query/latest) v4 - Server state management

### Content & Media

- **Content**: [MDX](https://mdxjs.com/) via next-mdx-remote - Enhanced markdown with React components
- **Syntax Highlighting**: [Shiki](https://shiki.matsu.io/) + rehype-pretty-code
- **Animations**: [Motion](https://motion.dev/) - Smooth, performant animations
- **Icons**: [Lucide React](https://lucide.dev/) + React Icons
- **Themes**: [next-themes](https://github.com/pacocoursey/next-themes) - Dark mode support

### Developer Experience

- 🛠 **Code Quality**: ESLint + Prettier for consistent code style
- 🔍 **Type Safety**: Strict TypeScript configuration
- 🧪 **Testing**: [Vitest](https://vitest.dev/) + React Testing Library
- 📦 **Git Hooks**: Husky + lint-staged + Commitlint
- 🚀 **Fast Development**: Hot reloading and efficient build process
- 📊 **Bundle Analysis**: Next.js Bundle Analyzer for optimization insights

## Prerequisites

- **Node.js**: v18.18.2 or higher (v18.x recommended)
- **Package Manager**: Yarn 4.12.0 (automatically used via `packageManager` field)
- **Database**: PostgreSQL instance (for Prisma)
- **Docker** (optional): For containerized development and deployment

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd ihsanmuh
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Set up environment variables

```bash
# Create your own .env based on .env.example
cp .env.example .env
```

Required environment variables:

- `NEXT_PUBLIC_ROOT` - Root URL of the site
- `NEXT_PUBLIC_URL` - Public URL
- `NEXT_PUBLIC_API` - API endpoint
- `NEXT_PUBLIC_API_PROJECT` - API project identifier
- `DATABASE_URL` - PostgreSQL connection string

See `.env.example` for the complete list.

### 4. Set up the database

```bash
# Generate Prisma client
yarn generate

# Run database migrations (if needed)
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

### 5. Start the development server

```bash
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the site running locally!

## Docker Setup (Alternative)

If you prefer running the app with Docker instead of installing Node.js locally:

### Quick Start with Docker

```bash
# Make sure .env is configured (see step 3 above)

# Start everything (build image + PostgreSQL + auto migrate + seed)
yarn docker:up

# Access the app at http://localhost:3000

# View logs
yarn docker:logs

# Stop containers
yarn docker:down

# Stop and remove database data (clean slate)
yarn docker:clean
```

The Docker setup includes:

- **PostgreSQL database** (automatically configured)
- **Automatic Prisma migrations and seeding**
- **Volume persistence** for database data
- **Health checks** for all services

### Build and Run Manually

```bash
# Build the production Docker image
yarn docker:build

# Run the container (connects to your own PostgreSQL)
yarn docker:run
```

### Docker Files

All Docker-related files are organized in the `docker/` folder:

| File                                    | Purpose                                            |
| --------------------------------------- | -------------------------------------------------- |
| `docker/Dockerfile`                     | Multi-stage production build                       |
| `docker/docker-compose.local.yml`       | Local development (build + PostgreSQL + auto seed) |
| `docker/docker-compose.server.yml`      | Server deployment with existing host PostgreSQL    |
| `docker/docker-compose.server-full.yml` | Server deployment with PostgreSQL in Docker        |
| `docker/.env.example`                   | Environment variables template                     |

See [`docker/README.md`](docker/README.md) for detailed Docker documentation, CI/CD integration, and server setup guides.

## Available Scripts

### Development

- `yarn dev` - Start development server at http://localhost:3000
- `yarn build` - Build for production (includes RSS + sitemap generation)
- `yarn build:analyze` - Build with bundle size analysis
- `yarn start` - Start production server

### Code Quality

- `yarn lint` - Run ESLint on src/
- `yarn lint:fix` - Fix ESLint issues and format code
- `yarn format` - Format all files with Prettier
- `yarn format:check` - Check code formatting without changes
- `yarn typecheck` - Run TypeScript type checking

### Testing

- `yarn test` - Run tests with Vitest
- `yarn test:ui` - Run tests with Vitest UI
- `yarn test:coverage` - Run tests with coverage report

### Database

- `yarn generate` - Generate Prisma client
- `npx prisma migrate dev` - Create and apply migrations
- `npx prisma studio` - Open Prisma Studio GUI
- `npx prisma db seed` - Seed the database

### Docker

- `yarn docker:up` - Start local environment (build + PostgreSQL + migrate + seed)
- `yarn docker:down` - Stop containers
- `yarn docker:clean` - Stop and remove volumes (clean slate)
- `yarn docker:logs` - View app container logs
- `yarn docker:build` - Build production Docker image
- `yarn docker:run` - Run production container

## Project Structure

```
ihsanmuh/
├── src/
│   ├── components/         # Reusable UI components (Atoms/Molecules/Organism)
│   ├── containers/         # Page-level compositions
│   ├── contents/           # Blog posts and MDX content
│   ├── constant/           # Site configuration and constants
│   ├── helpers/            # Utility functions
│   ├── lib/                # Core functionality (Prisma client, utils)
│   ├── pages/              # Next.js pages and API routes
│   │   └── api/            # API endpoints
│   ├── queries/            # TanStack Query hooks
│   ├── services/           # External API services
│   ├── styles/             # Global styles
│   └── types/              # TypeScript type definitions
├── docker/                 # Docker configuration files
│   ├── Dockerfile          # Multi-stage production build
│   ├── docker-compose.local.yml    # Local dev (app + PostgreSQL)
│   ├── docker-compose.server.yml   # Server deploy (host DB)
│   └── docker-compose.server-full.yml # Server deploy (Docker DB)
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Database seeding script
├── public/                 # Static assets
└── scripts/                # Build and utility scripts
```

### Import Aliases

The project uses TypeScript path aliases for cleaner imports:

```typescript
import { Component } from '@/components/Component';
import { helper } from '@/helpers/utils';
```

The `@/*` alias maps to `src/*`.

## Code Style & Conventions

This project enforces strict code quality standards:

### Formatting

- **Prettier**: Automatic code formatting (single quotes, semicolons, 2-space tabs)
- **ESLint**: Linting with auto-sort imports and unused import detection
- All code must pass `yarn format:check` and `yarn lint`

### Commits

The project uses [Conventional Commits](https://www.conventionalcommits.org/) enforced by Commitlint:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Test updates
- `chore:` - Maintenance tasks
- `ci:` - CI/CD changes
- `perf:` - Performance improvements
- `revert:` - Revert previous changes

### Git Hooks

Husky enforces quality at commit time:

- **pre-commit**: Runs Prettier and ESLint on staged files via lint-staged
- **commit-msg**: Validates commit message format
- **pre-push**: Runs production build to catch errors

### TypeScript

- Strict mode enabled
- Avoid `any` types
- Prefix unused variables with `_`
- Use `type` for props/unions, `interface` for extendable objects

## Contributing

While this is a personal project, contributions follow these guidelines:

1. Fork and create a feature branch
2. Follow the code style conventions above
3. Write meaningful commit messages
4. Ensure all checks pass: `yarn typecheck && yarn lint && yarn test`
5. Submit a pull request

## License

This project is private and not licensed for public use. All rights reserved.

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
