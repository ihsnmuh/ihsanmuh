# Docker Setup for Ihsan Muh's Personal Website

This directory contains all Docker configuration files for running the application in containerized environments.

## Files Overview

- **Dockerfile** - Multi-stage production build optimized for minimal image size
- **Dockerfile.dev** - Development build with hot reload support
- **docker-compose.yml** - Development environment (app + PostgreSQL)
- **docker-compose.prod.yml** - Production-like environment for testing
- **.env.example** - Template for environment variables
- **.dockerignore** - Files excluded from Docker builds

## Quick Start

### Development

1. **Copy environment template:**

   ```bash
   cp docker/.env.example .env
   ```

2. **Start the development environment:**

   ```bash
   yarn docker:dev:build
   ```

3. **Access the application:**
   - App: http://localhost:3000
   - Database: localhost:5432

### Production Testing

```bash
# Build and start production environment
yarn docker:prod:build

# Access at http://localhost:3001
```

## Architecture

### Development Setup

The development Docker Compose includes:

- **PostgreSQL 15 Alpine** - Lightweight database
  - Port: 5432
  - Database: ihsanmuh_dev
  - Credentials: postgres/postgres (change in production!)
- **Next.js App (Dev Mode)** - Development server with hot reload
  - Port: 3000
  - Auto-generates Prisma client
  - Auto-runs migrations on startup
  - Volume-mounted for live code changes

### Production Setup

The production Docker Compose includes:

- **PostgreSQL 15 Alpine** - Separate production database
  - Port: 5433 (different port to avoid conflicts)
  - Database: ihsanmuh_prod
- **Next.js App (Standalone)** - Optimized production build
  - Port: 3001
  - Multi-stage build (~150MB image)
  - Health checks enabled
  - Runs as non-root user

## Common Commands

### Starting/Stopping

```bash
# Development
yarn docker:dev              # Start
yarn docker:dev:build        # Rebuild and start
yarn docker:dev:down         # Stop
yarn docker:dev:clean        # Stop and remove volumes

# Production
yarn docker:prod             # Start
yarn docker:prod:build       # Rebuild and start
yarn docker:prod:down        # Stop
```

### Database Operations

```bash
# Run migrations
docker-compose -f docker/docker-compose.yml exec app yarn prisma migrate dev

# Open Prisma Studio
docker-compose -f docker/docker-compose.yml exec app yarn prisma studio

# Seed database
docker-compose -f docker/docker-compose.yml exec app npx prisma db seed

# Access PostgreSQL directly
docker-compose -f docker/docker-compose.yml exec postgres psql -U postgres -d ihsanmuh_dev
```

### Debugging

```bash
# View logs
docker-compose -f docker/docker-compose.yml logs -f app
docker-compose -f docker/docker-compose.yml logs -f postgres

# Shell into app container
docker-compose -f docker/docker-compose.yml exec app sh

# Check health
curl http://localhost:3000/api/health
```

## Environment Variables

Required environment variables (see `.env.example`):

```env
# Database
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/ihsanmuh_dev
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=ihsanmuh_dev

# Application
NEXT_PUBLIC_ROOT=http://localhost:3000
NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_API=http://localhost:3000/api
NEXT_PUBLIC_API_PROJECT=ihsanmuh

# Node
NODE_ENV=development
```

**Note:** Update `.env` with your actual values. Never commit real credentials!

## Troubleshooting

### Port Already in Use

```bash
# Check what's using the port
lsof -i :3000
lsof -i :5432

# Stop the conflicting service or change ports in docker-compose.yml
```

### Database Connection Refused

```bash
# Wait for database health check
docker-compose -f docker/docker-compose.yml logs postgres

# Verify DATABASE_URL matches docker-compose.yml configuration
```

### Prisma Client Not Generated

```bash
# Manually generate inside container
docker-compose -f docker/docker-compose.yml exec app yarn generate
```

### Hot Reload Not Working

```bash
# Rebuild without cache
docker-compose -f docker/docker-compose.yml build --no-cache app

# Verify volume mounts in docker-compose.yml
```

### Clear Everything and Start Fresh

```bash
# Stop containers, remove volumes, and rebuild
yarn docker:dev:clean
docker system prune -a
yarn docker:dev:build
```

## Image Optimization

The production Dockerfile uses multi-stage builds:

1. **Base** - Node 18 Alpine + Yarn 4
2. **Dependencies** - Install all dependencies
3. **Builder** - Generate Prisma client + build Next.js
4. **Runner** - Minimal runtime image (~150MB)

Benefits:

- Small image size
- Security (non-root user)
- Fast deployments
- Layer caching for quick rebuilds

## Security Notes

1. **Non-root user:** Production container runs as `nextjs` user (UID 1001)
2. **Environment variables:** Never commit `.env` files
3. **Database credentials:** Change default passwords in production
4. **Health checks:** Enabled for monitoring container health
5. **Network isolation:** Containers communicate via Docker network

## Performance Tips

1. **Build caching:** Docker caches layers for faster rebuilds
2. **Volume mounts:** Dev mode uses volumes for instant file sync
3. **Multi-stage builds:** Production image only includes runtime dependencies
4. **Alpine images:** Minimal base images reduce size and attack surface

## CI/CD Integration

Example GitHub Actions workflow:

```yaml
- name: Build Docker image
  run: docker build -f docker/Dockerfile -t ihsanmuh:${{ github.sha }} .

- name: Run tests in container
  run: docker run ihsanmuh:${{ github.sha }} yarn test

- name: Push to registry
  run: docker push ihsanmuh:${{ github.sha }}
```

## Additional Resources

- [Next.js Docker Documentation](https://nextjs.org/docs/deployment#docker-image)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Prisma in Docker](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel#docker)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
