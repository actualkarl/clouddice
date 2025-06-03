# 🐳 Quick Docker Setup

This script helps you get Cloud Dice running with Docker quickly.

## Prerequisites
- Docker Desktop installed
- Git repository cloned

## Quick Start Commands

### Development
```bash
# Start development environment
npm run docker:dev

# Start with fresh build
npm run docker:dev:build

# Stop development environment
npm run docker:dev:down
```

### Production Testing
```bash
# Start production environment locally
npm run docker:prod

# Start with fresh build
npm run docker:prod:build

# Stop production environment
npm run docker:prod:down
```

### Maintenance
```bash
# Clean up containers and images
npm run docker:clean

# Just build images
npm run docker:build
```

## Access Points

### Development Mode:
- 🌐 **Frontend:** http://localhost:5173
- 🔧 **Backend:** http://localhost:3001
- 🔄 **Hot reload enabled**

### Production Mode:
- 🌐 **Frontend:** http://localhost:80
- 🔧 **Backend:** http://localhost:3001
- 🏥 **Health checks enabled**

## Troubleshooting

### Port Conflicts:
```bash
# Check what's using the ports
# Windows:
netstat -ano | findstr :3001
netstat -ano | findstr :5173

# Mac/Linux:
lsof -i :3001
lsof -i :5173
```

### Clean Slate:
```bash
# Complete cleanup and restart
npm run docker:clean
npm run docker:dev:build
```

### View Logs:
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f server
docker-compose logs -f client
```

## Next Steps

1. **Development:** Use `npm run docker:dev` for daily development
2. **Testing:** Use `npm run docker:prod` before deploying
3. **Deploy:** Follow DOCKER_GUIDE.md for cloud deployment
4. **Monitor:** Check health endpoints and logs regularly

Happy coding! 🎲
