# 1. Install dependencies only when needed
FROM node:18-alpine AS deps

RUN apk add --no-cache libc6-compat openssl openssl-dev

WORKDIR /ihsanmuh-web
COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn cache clean
RUN yarn install

# 2. Build the app
FROM node:18-alpine AS builder
WORKDIR /ihsanmuh-web
COPY --from=deps /ihsanmuh-web/node_modules ./node_modules
COPY . .

# Run Prisma commands
RUN yarn prisma generate
RUN yarn prisma migrate deploy
RUN yarn prisma db seed
RUN yarn prisma db push

RUN yarn build

# 3. Run the app  
FROM node:18-alpine AS runner
WORKDIR /ihsanmuh-web

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder --chown=nextjs:nodejs /ihsanmuh-web/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /ihsanmuh-web/next.config.js ./
COPY --from=builder --chown=nextjs:nodejs /ihsanmuh-web/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /ihsanmuh-web/src ./src
COPY --from=builder --chown=nextjs:nodejs /ihsanmuh-web/public ./public
COPY --from=builder --chown=nextjs:nodejs /ihsanmuh-web/checkEnvVars.ts ./checkEnvVars.ts
COPY --from=builder --chown=nextjs:nodejs /ihsanmuh-web/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /ihsanmuh-web/.env.dev ./.env

USER nextjs

EXPOSE 3000

CMD ["yarn", "start"]