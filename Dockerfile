# 1. Install dependencies only when needed
FROM node:18-slim AS deps

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# 2. Build the app with standalone output
FROM node:18-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN yarn build

# 3. Production image, copy only necessary files
FROM node:18-slim AS runner
WORKDIR /app

# Install OpenSSL if you use Prisma
RUN apt-get update && apt-get install -y openssl

# Copy .env if needed
COPY .env .env

# Copy the standalone output and static files
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000

CMD ["node", "server.js"]
