# Docker Setup for Ihsan Muh's Personal Website

This directory contains Docker configuration for building, running locally, and deploying the application.

## Files Overview

| File                             | Purpose                                                    |
| -------------------------------- | ---------------------------------------------------------- |
| `Dockerfile`                     | Multi-stage production build (used by CI and local builds) |
| `docker-compose.local.yml`       | Local development (build + PostgreSQL + auto seed)         |
| `docker-compose.server.yml`      | Server deployment with existing PostgreSQL on host         |
| `docker-compose.server-full.yml` | Server deployment with PostgreSQL in Docker                |
| `.env.example`                   | Template for environment variables                         |
| `.dockerignore`                  | Files excluded from Docker builds                          |

## How It Works

```
Push to master → CI: lint + build image + push to Docker Hub → CD: SSH → docker pull + compose up
```

1. **CI** builds the Docker image from `Dockerfile` and pushes it to Docker Hub
2. **CD** SSHes into the server, pulls the latest image, runs migrations, and restarts

The server only needs Docker -- no Node.js, yarn, PM2, or git.

## Local Development

Run the full app locally with PostgreSQL using Docker:

```bash
# Start everything (build image + PostgreSQL + migrate + seed)
yarn docker:up

# View app logs
yarn docker:logs

# Access the app at http://localhost:3000

# Stop containers
yarn docker:down

# Stop and remove database data
yarn docker:clean
```

What happens on `yarn docker:up`:

```
1. PostgreSQL starts → waits until healthy
2. migrate service → runs prisma migrate deploy + db seed
3. migrate exits → app starts with seeded database
```

### Build and run manually (without compose)

```bash
# Build the image
yarn docker:build

# Run the container (connects to your local PostgreSQL)
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
2. Create the app directory:

   ```bash
   mkdir -p /var/www/fe-app/ihsanmuh
   cd /var/www/fe-app/ihsanmuh
   ```

3. Choose your compose file and copy it to the server as `docker-compose.yml`:

### Option A: Existing PostgreSQL on host (`docker-compose.server.yml`)

Use this if PostgreSQL is already installed on the server.

- Uses `network_mode: host` so the container can reach `localhost` on the server
- No port mapping needed (app listens directly on host port 3000)

`.env` on server:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/ihsanmuh_prod
NEXT_PUBLIC_ROOT=https://yourdomain.com
NEXT_PUBLIC_URL=yourdomain.com
NEXT_PUBLIC_API=https://yourdomain.com/api
NEXT_PUBLIC_API_PROJECT=/projects
```

### Option B: Full Docker with PostgreSQL (`docker-compose.server-full.yml`)

Use this if you want everything in Docker, no PostgreSQL installed on the server.

- PostgreSQL runs as a Docker service
- App connects via Docker network using `postgres` as hostname
- Database data persisted in a Docker volume

`.env` on server:

```env
DATABASE_URL=postgresql://postgres:yourpassword@postgres:5432/ihsanmuh_prod
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
POSTGRES_DB=ihsanmuh_prod
NEXT_PUBLIC_ROOT=https://yourdomain.com
NEXT_PUBLIC_URL=yourdomain.com
NEXT_PUBLIC_API=https://yourdomain.com/api
NEXT_PUBLIC_API_PROJECT=/projects
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
docker builder prune -f
yarn docker:up
```

### Database Empty (no projects)

The local compose runs migrations and seeds automatically. If projects are still empty:

```bash
docker exec -it ihsanmuh-app node node_modules/prisma/build/index.js db seed
```

## Known Issues & Solutions

| Issue                        | Solution                                       |
| ---------------------------- | ---------------------------------------------- |
| Prisma OpenSSL error         | Already fixed -- OpenSSL included in image     |
| Node.js version warning      | Already fixed -- using Node 20 Alpine          |
| Port already in use          | Stop conflicting service or change port        |
| PostgreSQL version mismatch  | `yarn docker:clean` to remove old volume       |
| `NEXT_PUBLIC_*` wrong values | Rebuild image -- these are baked at build time |

## Additional Resources

- [Next.js Docker Documentation](https://nextjs.org/docs/deployment#docker-image)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Prisma in Docker](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel#docker)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
