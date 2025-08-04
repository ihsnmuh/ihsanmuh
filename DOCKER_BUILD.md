# Docker Build Documentation

## Overview

This project supports multi-platform Docker builds for both Linux (AMD64/ARM64) and macOS compatibility.

## Build Options

### 1. Yarn-based Build (Default)

- Uses `Dockerfile` with Yarn package manager
- Optimized for better caching and dependency management
- Includes network timeout configurations to handle CI/CD issues

### 2. NPM-based Build (Alternative)

- Uses `Dockerfile.npm` with NPM package manager
- More reliable for multi-platform builds
- Better network handling in CI/CD environments

## Local Build

### Using the build script:

```bash
# Build with yarn (default)
./scripts/build-docker.sh

# Build with npm
./scripts/build-docker.sh npm

# Build with custom tag
./scripts/build-docker.sh yarn v1.0.0
```

### Manual build:

```bash
# Yarn-based build
docker buildx build --platform linux/amd64,linux/arm64 -t ihsanmuh:latest .

# NPM-based build
docker buildx build --platform linux/amd64,linux/arm64 -f Dockerfile.npm -t ihsanmuh:latest .
```

## CI/CD Workflows

### Main Workflow (`prod-ci.yml`)

- Triggers on version tags (`v*`)
- Uses yarn-based Dockerfile
- Includes GitHub Actions cache for faster builds
- Supports both AMD64 and ARM64 platforms

### Alternative Workflow (`prod-ci-npm.yml`)

- Manual trigger option with npm preference
- Fallback option if yarn builds fail
- Same multi-platform support

## Troubleshooting

### Network Timeout Issues

If you encounter network timeout errors during builds:

1. **Use NPM-based build:**

   ```bash
   ./scripts/build-docker.sh npm
   ```

2. **Increase network timeouts in Dockerfile:**

   - Yarn: `--network-timeout 300000`
   - NPM: `fetch-timeout 300000`

3. **Use local cache:**
   ```bash
   docker buildx build --cache-from type=local,src=/tmp/.buildx-cache .
   ```

### Platform-specific Issues

- ARM64 builds may take longer due to emulation
- Ensure Docker Buildx is properly configured
- Use `--platform` flag to specify target platforms

## Environment Variables

Make sure to set the following secrets in your GitHub repository:

- `DOCKER_USERNAME`: Your Docker Hub username
- `DOCKER_PASSWORD`: Your Docker Hub password/token
- `ENV_CONTENT`: Your application environment variables

## Build Optimization

### Caching Strategy

- Uses GitHub Actions cache for CI/CD builds
- Local cache for development builds
- Layer caching for faster rebuilds

### Multi-stage Build

1. **Dependencies stage**: Install packages
2. **Builder stage**: Build the application
3. **Runner stage**: Production-ready image

### Security

- Non-root user execution
- Minimal base images
- Regular security updates
