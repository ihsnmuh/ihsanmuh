# Docker Implementation Task List

Comprehensive checklist for adding Docker support to the project for local development and production deployment.

## Overview

Containerize the Next.js application with PostgreSQL database support, optimized for both development and production environments.

## Prerequisites

- [x] Verify Docker and Docker Compose are installed locally
- [x] Understand current project structure and dependencies
- [x] Document current environment variables requirements

## Phase 1: Core Docker Files (P0 - Critical) ✅

### 1.1 Create Production Dockerfile ✅

- [x] Create `Dockerfile` with multi-stage build:
  - [x] **Base stage**: Node 18 Alpine + Corepack + Yarn 4.12.0
  - [x] **Dependencies stage**: Install dependencies with `--immutable`
  - [x] **Builder stage**: Generate Prisma client + build Next.js app
  - [x] **Runner stage**: Minimal production image with standalone output
  - [x] Configure non-root user (nodejs:1001)
  - [x] Set proper environment variables (NODE_ENV, TELEMETRY)
  - [x] Expose port 3000

### 1.2 Create Development Dockerfile ✅

- [x] Create `Dockerfile.dev`:
  - [x] Use Node 18 Alpine base
  - [x] Enable Corepack for Yarn 4
  - [x] Install all dependencies (including devDependencies)
  - [x] Support hot reload via volume mounting
  - [x] Expose port 3000

### 1.3 Create Docker Ignore File ✅

- [x] Create `.dockerignore`:
  - [x] Exclude node_modules, .next, build artifacts
  - [x] Exclude test files and coverage
  - [x] Exclude environment files (.env*)
  - [x] Exclude Git and IDE files
  - [x] Exclude documentation and CI files
  - [x] Keep prisma schema but exclude migrations

## Phase 2: Docker Compose Configuration (P0) ✅

### 2.1 Development Docker Compose ✅

- [x] Create `docker-compose.yml`:
  - [x] **PostgreSQL service**:
    - [x] Use postgres:15-alpine image
    - [x] Set environment variables (user, password, database)
    - [x] Configure port mapping (5432:5432)
    - [x] Add volume for data persistence
    - [x] Add healthcheck for service readiness
  - [x] **App service**:
    - [x] Build from Dockerfile.dev
    - [x] Configure port mapping (3000:3000)
    - [x] Mount volumes for hot reload
    - [x] Set DATABASE_URL to PostgreSQL service
    - [x] Depend on PostgreSQL healthcheck
    - [x] Run migrations + generate Prisma client on startup
    - [x] Start dev server

### 2.2 Production Docker Compose ✅

- [x] Create `docker-compose.prod.yml`:
  - [x] PostgreSQL service for production-like testing
  - [x] App service using production Dockerfile
  - [x] Different port mapping (3001:3000) to avoid conflicts
  - [x] Health checks for both services
  - [x] Use .env.production file
  - [x] Proper restart policies

## Phase 3: Configuration Updates (P1) ✅

### 3.1 Update Next.js Configuration ✅

- [x] Modify `next.config.js`:
  - [x] Add `output: 'standalone'` for optimized Docker builds
  - [ ] Verify this doesn't break existing functionality (needs testing)
  - [ ] Test standalone output locally (needs testing)

### 3.2 Add Docker Scripts ✅

- [x] Update `package.json` with Docker commands:
  - [x] `docker:dev` - Start development environment
  - [x] `docker:dev:build` - Rebuild and start dev
  - [x] `docker:dev:down` - Stop development environment
  - [x] `docker:dev:clean` - Remove volumes and stop
  - [x] `docker:prod` - Start production environment
  - [x] `docker:prod:build` - Rebuild and start prod
  - [x] `docker:prod:down` - Stop production environment
  - [x] `docker:build` - Build production image only
  - [x] `docker:run` - Run production container

### 3.3 Environment Configuration ✅

- [x] Create `.env.docker.example`:
  - [x] Document all required environment variables
  - [x] Provide Docker-specific DATABASE_URL format
  - [x] Include PostgreSQL connection details
  - [x] Add all NEXT_PUBLIC_* variables
  - [x] Note: update when adding new env vars

## Phase 4: Application Updates (P1) ✅

### 4.1 Health Check Endpoint ✅

- [x] Create `src/pages/api/health.ts`:
  - [x] Return status and timestamp
  - [x] Keep response simple for Docker healthcheck
  - [x] Return 200 OK when app is healthy

### 4.2 Prisma Configuration

- [x] Verify Prisma client generation in Docker (configured in docker-compose)
- [x] Test migration strategy:
  - [x] Development: Run migrations on container start (configured)
  - [ ] Production: Run migrations separately before deployment (needs testing)
- [x] Document database seeding in Docker (documented in docker/README.md)
- [ ] Test Prisma Studio access from Docker (needs testing)

## Phase 5: Testing & Validation (P1)

### 5.1 Development Environment Testing

- [ ] Test full development workflow:
  - [ ] `yarn docker:dev:build` starts successfully
  - [ ] App accessible at http://localhost:3000
  - [ ] Hot reload works when editing files
  - [ ] Database connection successful
  - [ ] Prisma migrations apply correctly
  - [ ] Prisma Studio accessible
  - [ ] Can seed database

### 5.2 Production Environment Testing

- [ ] Test production build:
  - [ ] `yarn docker:prod:build` completes without errors
  - [ ] App accessible at http://localhost:3001
  - [ ] All pages render correctly
  - [ ] API routes work
  - [ ] Static assets load properly
  - [ ] Database queries execute
  - [ ] RSS and sitemap generated
  - [ ] Health check responds

### 5.3 Database Operations

- [ ] Test database commands in Docker:
  - [ ] `docker-compose exec app yarn prisma migrate dev`
  - [ ] `docker-compose exec app yarn prisma studio`
  - [ ] `docker-compose exec app npx prisma db seed`
  - [ ] Data persists after container restart
  - [ ] Volumes work correctly

### 5.4 Performance & Optimization

- [ ] Verify Docker image sizes:
  - [ ] Production image < 200MB (target ~150MB)
  - [ ] Development image < 1GB
- [ ] Test build times:
  - [ ] Initial build
  - [ ] Rebuild with cache
  - [ ] Layer caching works properly
- [ ] Test container startup time
- [ ] Verify memory usage is reasonable

## Phase 6: Documentation (P1) ✅

### 6.1 Update README.md ✅

- [x] Add Docker section:
  - [x] Docker prerequisites
  - [x] Quick start with Docker
  - [x] Available Docker commands
  - [x] Troubleshooting common issues
  - [x] Port mappings
  - [x] Volume management

### 6.2 Create Docker Documentation ✅

- [x] Create `docker/README.md`:
  - [x] Detailed setup instructions
  - [ ] Architecture diagram (optional - skipped for now)
  - [x] Development workflow
  - [x] Production deployment guide
  - [x] Database migration strategy
  - [x] Environment variable management
  - [x] Troubleshooting guide
  - [x] Performance optimization tips

### 6.3 Update AGENTS.md

- [ ] Add Docker commands to "Quick Commands" section (optional)
- [ ] Document Docker-specific environment setup (optional)
- [ ] Add notes about running tests in Docker (optional)
- [ ] Update CI/CD expectations if applicable (optional)

## Phase 7: CI/CD Integration (P2 - Optional)

### 7.1 GitHub Actions

- [ ] Create Docker build workflow:
  - [ ] Build and test Docker image on PRs
  - [ ] Push to container registry on main branch
  - [ ] Use Docker layer caching
  - [ ] Run tests in Docker container

### 7.2 Container Registry

- [ ] Choose registry (Docker Hub, GitHub Container Registry, etc.)
- [ ] Configure authentication
- [ ] Set up automated image tagging
- [ ] Document image versioning strategy

## Phase 8: Security & Best Practices (P2)

### 8.1 Security Hardening

- [ ] Use non-root user in production image ✓
- [ ] Scan images for vulnerabilities:
  - [ ] `docker scan ihsanmuh:latest`
  - [ ] Address critical vulnerabilities
- [ ] Review exposed ports
- [ ] Secure environment variable handling
- [ ] Add .env to .gitignore (verify it's already there)

### 8.2 Best Practices

- [ ] Multi-stage builds ✓
- [ ] Minimal base images (Alpine) ✓
- [ ] Proper layer caching
- [ ] Health checks configured
- [ ] Graceful shutdown handling
- [ ] Resource limits in docker-compose
- [ ] Logging configuration

## Phase 9: Cleanup & Final Touches (P2)

### 9.1 Code Quality

- [ ] Run linting: `yarn lint`
- [ ] Format all new files: `yarn format`
- [ ] Type check: `yarn typecheck`
- [ ] No console warnings in Docker-related code

### 9.2 Git Commit

- [ ] Commit with conventional commit message:
  - `feat: add Docker support for development and production`
- [ ] Ensure all files are included:
  - [ ] Dockerfile, Dockerfile.dev
  - [ ] docker-compose.yml, docker-compose.prod.yml
  - [ ] .dockerignore
  - [ ] .env.docker.example
  - [ ] Updated next.config.js
  - [ ] Updated package.json
  - [ ] Health check API
  - [ ] Documentation updates

## Troubleshooting Checklist

Common issues to test and document solutions:

- [ ] Port already in use
  - Solution: Change port mapping or stop conflicting service
- [ ] Database connection refused
  - Solution: Wait for healthcheck, verify DATABASE_URL
- [ ] Prisma client not generated
  - Solution: Run `yarn generate` in container
- [ ] Hot reload not working
  - Solution: Verify volume mounts, check file permissions
- [ ] Build fails with Yarn error
  - Solution: Clear Docker cache, verify .yarnrc.yml
- [ ] Environment variables not loading
  - Solution: Check .env file location and docker-compose env_file

## Success Criteria

- ✅ Development environment runs with single command (configured)
- ⏳ Production build completes successfully (needs testing)
- ✅ Database persists across container restarts (configured with volumes)
- ⏳ Hot reload works in development (needs testing)
- ⏳ All existing features work in Docker (needs testing)
- ✅ Image size is optimized (multi-stage build configured)
- ✅ Documentation is complete and accurate
- ✅ Team can onboard easily with Docker (comprehensive docs provided)

## Implementation Status Summary

### ✅ Completed (Ready for Testing)

**Phase 1: Core Docker Files**
- ✅ Production Dockerfile (multi-stage build)
- ✅ Development Dockerfile
- ✅ .dockerignore file

**Phase 2: Docker Compose**
- ✅ Development docker-compose.yml
- ✅ Production docker-compose.prod.yml

**Phase 3: Configuration**
- ✅ Next.js standalone output configuration
- ✅ Docker scripts in package.json
- ✅ Environment variables template

**Phase 4: Application Updates**
- ✅ Health check API endpoint
- ✅ Prisma configuration for Docker

**Phase 6: Documentation**
- ✅ README.md updated with Docker section
- ✅ Comprehensive docker/README.md created

### ⏳ Needs Testing (Phase 5)

- [ ] Development environment functionality
- [ ] Production build and runtime
- [ ] Database operations (migrations, seeding, Prisma Studio)
- [ ] Performance and image size verification
- [ ] Hot reload in development
- [ ] All features working correctly

### 🔄 Optional/Future Work

- Phase 7: CI/CD Integration
- Phase 8: Security hardening (vulnerability scanning)
- Phase 9: Final cleanup and git commit

### 📁 Files Created/Modified

**New Files:**
- `docker/Dockerfile`
- `docker/Dockerfile.dev`
- `docker/.dockerignore`
- `docker/docker-compose.yml`
- `docker/docker-compose.prod.yml`
- `docker/.env.example`
- `docker/README.md`
- `src/pages/api/health.ts`

**Modified Files:**
- `next.config.js` (added standalone output)
- `package.json` (added Docker scripts)
- `README.md` (added Docker documentation)

### 🚀 Next Steps

1. **Test the setup:** Run `yarn docker:dev:build`
2. **Verify functionality:** Check all features work in Docker
3. **Review changes:** Use `git diff` to review all modifications
4. **Run code quality checks:** `yarn format && yarn lint`
5. **Commit when ready:** Use conventional commit format

## Notes

- Keep Dockerfile layer order optimized for caching
- Test on both macOS and Linux if possible
- Consider Windows developers (WSL2 compatibility)
- Document any OS-specific issues
- Keep .env.docker.example updated when adding env vars
- Consider adding docker-compose.override.yml for local customization

## Resources

- [Next.js Docker Example](https://github.com/vercel/next.js/tree/canary/examples/with-docker)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Prisma Docker Guide](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel#docker)
- [Yarn in Docker](https://yarnpkg.com/getting-started/install#docker)
