# Use official Node.js runtime as base image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server/package*.json ./server/
COPY shared/ ./shared/

# Install dependencies
RUN cd server && npm ci --only=production

# Development stage
FROM base AS development
RUN cd server && npm ci
COPY server/ ./server/
EXPOSE 3001
CMD ["npm", "run", "dev", "--prefix", "server"]

# Build stage
FROM base AS build
RUN cd server && npm ci
COPY server/ ./server/
RUN cd server && npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app

# Copy only necessary files
COPY --from=build /app/server/dist ./server/dist
COPY --from=build /app/server/package*.json ./server/
COPY --from=build /app/shared ./shared

# Install only production dependencies
RUN cd server && npm ci --only=production && npm cache clean --force

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001
USER nodejs

EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3001/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

CMD ["node", "server/dist/index.js"]
