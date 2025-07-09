# 1. Install dependencies only when needed
FROM node:18-slim AS deps

RUN apt-get update && apt-get install -y openssl

WORKDIR /ihsanmuh
COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn cache clean
RUN yarn install

# 2. Build the app
FROM node:18-slim AS builder
WORKDIR /ihsanmuh

# Install OpenSSL in builder stage
RUN apt-get update && apt-get install -y openssl

COPY --from=deps /ihsanmuh/node_modules ./node_modules
COPY . .

# Run Prisma commands
RUN yarn prisma generate
# Note: migrate deploy, db seed, and db push require DATABASE_URL at runtime, not build time
# These should be run when the container starts, not during build

RUN yarn build

# 3. Run the app  
FROM node:18-slim AS runner
WORKDIR /ihsanmuh

# Install OpenSSL in runner stage
RUN apt-get update && apt-get install -y openssl

RUN groupadd -g 1001 nodejs
RUN useradd -u 1001 -g nodejs -s /bin/bash -m nextjs

COPY --from=builder --chown=nextjs:nodejs /ihsanmuh/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /ihsanmuh/next.config.js ./
COPY --from=builder --chown=nextjs:nodejs /ihsanmuh/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /ihsanmuh/src ./src
COPY --from=builder --chown=nextjs:nodejs /ihsanmuh/public ./public
COPY --from=builder --chown=nextjs:nodejs /ihsanmuh/checkEnvVars.ts ./checkEnvVars.ts
COPY --from=builder --chown=nextjs:nodejs /ihsanmuh/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /ihsanmuh/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /ihsanmuh/.env ./.env

USER nextjs

EXPOSE 3000

CMD ["yarn", "start"]
