# Docker Setup for Ihsan Muh's Personal Website

This directory contains Docker configuration for building and deploying the application.

## Files Overview

- **Dockerfile** - Multi-stage production build (used by CI to build the image)
- **docker-compose.server.yml** - Server deployment compose (pull image from Docker Hub)
- **.env.example** - Template for environment variables
- **.dockerignore** - Files excluded from Docker builds

## How It Works

```
Push to master → CI: lint + build image + push to Docker Hub → CD: SSH → docker pull + compose up
```

1. **CI** builds the Docker image from `Dockerfile` and pushes it to Docker Hub
2. **CD** SSHes into the server, pulls the latest image, runs migrations, and restarts

The server only needs Docker -- no Node.js, yarn, PM2, or git.

## Local Usage

Build and run the production image locally:

```bash
# Build the image
yarn docker:build

# Run the container
yarn docker:run
```

## Image Optimization

The Dockerfile uses multi-stage builds:

1. **Base** - Node 20 Alpine + Yarn 4
2. **Dependencies** - Install all dependencies
3. **Builder** - Generate Prisma client + build Next.js
4. **Runner** - Minimal runtime image (~110 MB)

Benefits:

- Small image size (~110 MB)
- Security (non-root user `nextjs:1001`)
- Fast deployments (just pull + restart)
- Layer caching for quick rebuilds

## CI/CD Integration

### CI Workflow (`.github/workflows/prod-ci.yml`)

On every push:

1. Lint, format check, type check
2. On `master` only: build Docker image and push to Docker Hub

Tags pushed:

- `<username>/ihsanmuh-web:latest`
- `<username>/ihsanmuh-web:<commit-sha>`

### CD Workflow (`.github/workflows/prod-cd.yml`)

After CI succeeds on `master`:

1. SSH into production server
2. `docker compose pull` - pull latest image
3. Run Prisma migrations
4. `docker compose up -d` - restart with new image
5. Verify health check
6. Cleanup old images

### Required GitHub Secrets

| Secret               | Purpose                        |
| -------------------- | ------------------------------ |
| `DOCKERHUB_USERNAME` | Docker Hub login               |
| `DOCKERHUB_TOKEN`    | Docker Hub access token        |
| `ENV_PROD`           | .env contents for Docker build |
| `HOST`               | Production server IP           |
| `USERNAME`           | SSH username                   |
| `PRIVATE_KEY`        | SSH private key                |

## Server Setup

One-time setup on the production server:

1. Install Docker + Docker Compose
2. Create the app directory and compose file:

   ```bash
   mkdir -p /var/www/fe-app/ihsanmuh
   # Copy docker-compose.server.yml to the server as docker-compose.yml
   ```

3. Create `.env` with production values:

   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/ihsanmuh_prod
   NEXT_PUBLIC_ROOT=https://yourdomain.com
   NEXT_PUBLIC_URL=https://yourdomain.com
   NEXT_PUBLIC_API=https://yourdomain.com/api
   NEXT_PUBLIC_API_PROJECT=ihsanmuh
   ```

After setup, deployments happen automatically via the CI/CD pipeline.

## Troubleshooting

### Port Already in Use

```bash
lsof -i :3000
kill -9 <PID>
```

### Check Container Health

```bash
curl http://localhost:3000/api/health
docker compose logs --tail=50 app
```

### Rebuild Without Cache

```bash
docker build --no-cache -f docker/Dockerfile -t ihsanmuh:latest .
```

## Known Issues & Solutions

| Issue                   | Solution                                   |
| ----------------------- | ------------------------------------------ |
| Prisma OpenSSL error    | Already fixed -- OpenSSL included in image |
| Node.js version warning | Already fixed -- using Node 20 Alpine      |
| Port already in use     | Stop conflicting service or change port    |

## Additional Resources

- [Next.js Docker Documentation](https://nextjs.org/docs/deployment#docker-image)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Prisma in Docker](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel#docker)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
