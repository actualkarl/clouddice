# Dockerfile deployment option for Render
FROM node:18-alpine AS base

WORKDIR /app

# Copy root package.json for workspace setup
COPY package*.json ./

# Copy and install server dependencies
COPY server/package*.json ./server/
COPY shared/ ./shared/
RUN cd server && npm ci --only=production

# Build stage
FROM base AS build
RUN cd server && npm ci
COPY server/ ./server/
RUN cd server && npm run build

# Copy and build client
COPY client/package*.json ./client/
RUN cd client && npm ci
COPY client/ ./client/
RUN cd client && npm run build

# Production stage  
FROM node:18-alpine AS production
WORKDIR /app

# Install nginx for serving static files
RUN apk add --no-cache nginx

# Copy server build
COPY --from=build /app/server/dist ./server/dist
COPY --from=build /app/server/package*.json ./server/
COPY --from=build /app/shared ./shared

# Copy client build
COPY --from=build /app/client/dist ./client/dist
COPY client/nginx.conf /etc/nginx/http.d/default.conf

# Install server dependencies
RUN cd server && npm ci --only=production

# Setup nginx for client
RUN mkdir -p /var/log/nginx && \
    mkdir -p /var/lib/nginx/tmp && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /var/lib/nginx

# Create startup script
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'nginx &' >> /app/start.sh && \
    echo 'cd /app/server && node dist/index.js' >> /app/start.sh && \
    chmod +x /app/start.sh

EXPOSE 3001 80

CMD ["/app/start.sh"]
