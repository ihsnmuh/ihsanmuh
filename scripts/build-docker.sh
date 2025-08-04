#!/bin/bash

# Docker build script for multi-platform builds
# Usage: ./scripts/build-docker.sh [yarn|npm] [tag]

set -e

# Default values
PACKAGE_MANAGER=${1:-yarn}
TAG=${2:-latest}
IMAGE_NAME="ihsanmuh"

echo "Building Docker image with $PACKAGE_MANAGER package manager..."
echo "Tag: $TAG"

# Set up Docker Buildx if not already set
docker buildx create --use --name multi-platform-builder || true

# Build based on package manager choice
if [ "$PACKAGE_MANAGER" = "npm" ]; then
    echo "Using npm-based Dockerfile..."
    docker buildx build \
        --platform linux/amd64,linux/arm64 \
        --file Dockerfile.npm \
        --tag $IMAGE_NAME:$TAG \
        --cache-from type=local,src=/tmp/.buildx-cache \
        --cache-to type=local,dest=/tmp/.buildx-cache-new,mode=max \
        .
else
    echo "Using yarn-based Dockerfile..."
    docker buildx build \
        --platform linux/amd64,linux/arm64 \
        --tag $IMAGE_NAME:$TAG \
        --cache-from type=local,src=/tmp/.buildx-cache \
        --cache-to type=local,dest=/tmp/.buildx-cache-new,mode=max \
        .
fi

# Move cache
rm -rf /tmp/.buildx-cache
mv /tmp/.buildx-cache-new /tmp/.buildx-cache

echo "Build completed successfully!"
echo "Image: $IMAGE_NAME:$TAG"
echo "Platforms: linux/amd64, linux/arm64" 