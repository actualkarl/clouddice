# 🐳 Cloud Dice - Docker Deployment Guide

Docker provides consistent environments, easier deployment, and better scalability for your Cloud Dice application.

## 📦 **Docker Files Overview**

### **Created Files:**
- 🐳 `Dockerfile` - Single container for full app (Render)
- 🔧 `server/Dockerfile` - Multi-stage server container
- 🌐 `client/Dockerfile` - Nginx-served client container  
- 🚀 `docker-compose.yml` - Development environment
- 🏭 `docker-compose.prod.yml` - Production environment
- 🚫 `.dockerignore` files - Optimize build contexts

## 🛠️ **Development with Docker**

### **Quick Start:**
```bash
# Start development environment
docker-compose up

# Or run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

**Access:**
- 🌐 **Frontend:** http://localhost:5173
- 🔧 **Backend:** http://localhost:3001

### **Development Features:**
- 🔄 **Hot reload** for both client and server
- 📁 **Volume mounts** for live code changes
- 🔗 **Automatic service linking**
- 🚀 **Consistent environment** across team

### **Individual Services:**
```bash
# Build specific service
docker-compose build server
docker-compose build client

# Run only server
docker-compose up server

# Rebuild and start
docker-compose up --build
```

## 🏭 **Production Deployment**

### **Local Production Testing:**
```bash
# Start production environment
docker-compose -f docker-compose.prod.yml up

# With SSL proxy (optional)
docker-compose -f docker-compose.prod.yml --profile with-ssl up
```

**Access:**
- 🌐 **Frontend:** http://localhost:80
- 🔧 **Backend:** http://localhost:3001
- 🔒 **With SSL:** https://localhost:443

### **Production Features:**
- 🏃‍♂️ **Optimized builds** with multi-stage Dockerfiles
- 🏥 **Health checks** for both services
- 🔒 **Security headers** via nginx
- 📦 **Minimal image sizes** using Alpine Linux
- 🔄 **Auto-restart** policies

## ☁️ **Cloud Deployment Options**

### **Option 1: Render.com (Recommended)**

#### **A. Separate Services (Current setup):**
```yaml
# render.yaml already configured
# Deploy both services separately
```

**Benefits:**
- ✅ Free tier friendly
- ✅ Independent scaling
- ✅ Better resource utilization

#### **B. Single Docker Container:**
```bash
# Update render.yaml to use Docker option
# Uncomment Docker service, comment separate services
```

**Benefits:**
- ✅ Simplified deployment
- ✅ Single container management
- ⚠️ Uses more resources

### **Option 2: Digital Ocean App Platform**
```bash
# Create app.yaml
git push origin main
# Connect repository in DO dashboard
```

### **Option 3: Railway**
```bash
# Install Railway CLI
railway login
railway deploy
```

### **Option 4: Fly.io**
```bash
# Install flyctl
fly deploy
```

## 🚀 **Deployment Commands**

### **Build Images:**
```bash
# Development
docker-compose build

# Production
docker-compose -f docker-compose.prod.yml build

# Specific service
docker build -f server/Dockerfile -t clouddice-server .
docker build -f client/Dockerfile -t clouddice-client .
```

### **Push to Registry:**
```bash
# Tag images
docker tag clouddice-server:latest your-registry/clouddice-server:latest
docker tag clouddice-client:latest your-registry/clouddice-client:latest

# Push to registry
docker push your-registry/clouddice-server:latest
docker push your-registry/clouddice-client:latest
```

### **Deploy to Production:**
```bash
# Pull and run latest images
docker-compose -f docker-compose.prod.yml pull
docker-compose -f docker-compose.prod.yml up -d
```

## 🔧 **Configuration**

### **Environment Variables:**

#### **Development (.env):**
```bash
# Server
NODE_ENV=development
PORT=3001

# Client  
VITE_SERVER_URL=http://localhost:3001
```

#### **Production:**
```bash
# Server
NODE_ENV=production
PORT=3001

# Client
VITE_SERVER_URL=https://your-server-url.com
```

### **Docker Compose Overrides:**
```bash
# Create docker-compose.override.yml for local customizations
# This file is automatically used and should be gitignored
```

## 📊 **Monitoring & Health Checks**

### **Health Endpoints:**
- 🏥 **Server Health:** `GET /health`
- 📊 **Server Status:** `GET /` (shows connected users)

### **Docker Health Commands:**
```bash
# Check container health
docker-compose ps

# View health check logs
docker inspect clouddice-server-prod | grep Health -A 10

# Manual health check
curl http://localhost:3001/health
```

## 🐛 **Troubleshooting**

### **Common Issues:**

#### **Build Failures:**
```bash
# Clear Docker cache
docker system prune -f

# Rebuild without cache
docker-compose build --no-cache

# Check build logs
docker-compose logs server
```

#### **Network Issues:**
```bash
# Inspect networks
docker network ls
docker network inspect clouddice_clouddice-network

# Test connectivity
docker-compose exec server ping client
```

#### **Permission Issues:**
```bash
# Fix ownership (Linux/Mac)
sudo chown -R $USER:$USER .

# Check container user
docker-compose exec server whoami
```

#### **Port Conflicts:**
```bash
# Check what's using ports
lsof -i :3001
lsof -i :5173

# Kill processes
sudo kill -9 $(lsof -t -i:3001)
```

### **Debug Commands:**
```bash
# Shell into containers
docker-compose exec server sh
docker-compose exec client sh

# View container logs
docker-compose logs -f server
docker-compose logs -f client

# Inspect container
docker inspect clouddice-server-dev
```

## 📈 **Performance Optimization**

### **Image Size Optimization:**
- ✅ **Multi-stage builds** reduce final image size
- ✅ **Alpine Linux** base images are minimal
- ✅ **npm ci --only=production** installs only runtime deps
- ✅ **.dockerignore** excludes unnecessary files

### **Build Speed:**
```bash
# Use build cache
docker-compose build

# Parallel builds
docker-compose build --parallel

# Specific service only
docker-compose build server
```

### **Runtime Performance:**
- 🚀 **nginx** serves static files efficiently
- 💾 **Health checks** ensure service availability
- 🔄 **Restart policies** handle failures gracefully

## 🔒 **Security Best Practices**

### **Container Security:**
- ✅ **Non-root user** in production containers
- ✅ **Minimal base images** (Alpine)
- ✅ **Security headers** via nginx
- ✅ **Read-only file systems** where possible

### **Network Security:**
```bash
# Use internal networks
# Expose only necessary ports
# Configure proper CORS origins
```

## 🎯 **Next Steps**

1. **Development:** Use `docker-compose up` for local development
2. **Testing:** Use `docker-compose -f docker-compose.prod.yml up` for production testing
3. **Deploy:** Choose your preferred cloud platform and deploy
4. **Monitor:** Set up logging and monitoring in production
5. **Scale:** Add load balancers and multiple instances as needed

Your Cloud Dice app is now fully containerized and ready for any deployment scenario! 🎲
