# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY client/package*.json ./client/
COPY shared/ ./shared/

# Install dependencies
RUN cd client && npm ci

# Copy source code
COPY client/ ./client/

# Build the application
RUN cd client && npm run build

# Production stage
FROM nginx:alpine AS production

# Copy built app to nginx directory
COPY --from=build /app/client/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY client/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
