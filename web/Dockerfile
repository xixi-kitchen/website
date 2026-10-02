# 腾讯云 / 自建服务器：Next.js standalone
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG BUILD_STANDALONE=true
ARG NEXT_PUBLIC_IS_CHINA_SERVER=true
ARG NEXT_PUBLIC_ICP_NUMBER
ARG NEXT_PUBLIC_PSB_NUMBER
ARG NEXT_PUBLIC_PSB_CODE
ENV BUILD_STANDALONE=$BUILD_STANDALONE
ENV NEXT_PUBLIC_IS_CHINA_SERVER=$NEXT_PUBLIC_IS_CHINA_SERVER
ENV NEXT_PUBLIC_ICP_NUMBER=$NEXT_PUBLIC_ICP_NUMBER
ENV NEXT_PUBLIC_PSB_NUMBER=$NEXT_PUBLIC_PSB_NUMBER
ENV NEXT_PUBLIC_PSB_CODE=$NEXT_PUBLIC_PSB_CODE
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
