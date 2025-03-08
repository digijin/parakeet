# Build stage for Next.js
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app

# Install PocketBase
RUN wget https://github.com/pocketbase/pocketbase/releases/download/v0.25.6/pocketbase_0.25.6_linux_amd64.zip \
    && unzip pocketbase_0.25.6_linux_amd64.zip \
    && rm pocketbase_0.25.6_linux_amd64.zip \
    && chmod +x /app/pocketbase

# Copy Next.js build
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Copy start script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Create volume for PocketBase data
VOLUME /app/pb_data

EXPOSE 3000 8090
ENTRYPOINT ["docker-entrypoint.sh"] 