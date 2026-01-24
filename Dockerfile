# ---- Base Builder Stage -----
FROM node:20-alpine AS builder

ARG NEXT_PUBLIC_API_URL

WORKDIR /app


# Copy lockfile + manifest first (better caching)
COPY package.json /

# Install dependencies
RUN npm install 

# Copy rest of the source
COPY . .

# Build the app
RUN npm run build


# ---- Runner Stage -----
FROM node:20-alpine AS runner

ENV NODE_ENV=production

WORKDIR /app

RUN npm install

# Copy only necessary build artifacts
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]