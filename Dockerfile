# 1. Install dependencies only when needed
FROM node:18-slim AS deps

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 2. Build the app with standalone output
FROM node:18-slim AS builder
WORKDIR /app

# Create .env file first before copying source code
ARG ENV_CONTENT
RUN echo "$ENV_CONTENT" | base64 -d > .env

# Set Docker build environment variable
ENV DOCKER_BUILD=true

# Copy dependencies and source code
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn prisma generate
RUN yarn build

# 3. Production image, copy only necessary files
FROM node:18-slim AS runner
WORKDIR /app

# Install OpenSSL if you use Prisma
RUN apt-get update && apt-get install -y openssl

# Copy the standalone output and static files
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# Copy .env file to production
COPY --from=builder /app/.env .env

EXPOSE 3000

CMD ["node", "server.js"]
