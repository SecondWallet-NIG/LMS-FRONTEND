# ---- Base Builder Stage -----
FROM node:20-alpine AS builder

ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_PUSHER_KEY
ARG NEXT_PUBLIC_PUSHER_CLUSTER

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_PUSHER_KEY=$NEXT_PUBLIC_PUSHER_KEY
ENV NEXT_PUBLIC_PUSHER_CLUSTER=$NEXT_PUBLIC_PUSHER_CLUSTER

WORKDIR /app

# Copy lockfile + manifest first (better caching)
COPY package.json package-lock.json ./

# Install all deps (incl. devDependencies) required for `next build` lint/typecheck.
# Do not set NODE_ENV=production here — it skips devDependencies and breaks CI builds.
RUN npm ci

# Copy rest of the source
COPY . .

# Build the app
RUN npm run build


# ---- Runner Stage -----
FROM node:20-alpine AS runner

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
