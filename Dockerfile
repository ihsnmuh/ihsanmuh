# -----------------------------
# 1. Install dependencies only
# -----------------------------
FROM node:18-slim AS deps

WORKDIR /app

# Install necessary tools and enable Yarn with stable settings
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    && corepack enable \
    && yarn config set network-timeout 300000 \
    && yarn config set network-concurrency 1 \
    && rm -rf /var/lib/apt/lists/*

# Copy dependency manifests
COPY package.json yarn.lock ./

# Install dependencies with caching and verbose logging
RUN --mount=type=cache,target=/root/.yarn \
    --mount=type=cache,target=/app/node_modules \
    yarn install --frozen-lockfile --network-timeout 600000

# ----------------------------------
# 2. Build the app with standalone
# ----------------------------------
FROM node:18-slim AS builder

WORKDIR /app

# Install required packages for build
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# Copy .env file created from GitHub Actions or build context
COPY .env .env

# Set environment variable to indicate build context
ENV DOCKER_BUILD=true

# Copy dependencies and source files
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client and build application
RUN yarn prisma generate
RUN yarn build

# ------------------------------------
# 3. Production image for deployment
# ------------------------------------
FROM node:18-slim AS runner

WORKDIR /app

# Install OpenSSL required by Prisma at runtime
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    && rm -rf /var/lib/apt/lists/*

# Copy built app from builder stage
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# Copy .env for runtime config
COPY --from=builder /app/.env .env

EXPOSE 3000

CMD ["node", "server.js"]
