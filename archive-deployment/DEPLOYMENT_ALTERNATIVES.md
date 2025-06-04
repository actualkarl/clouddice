# Cloud Dice - Alternative Deployment Options

## 1. Railway (Recommended - Easy & Free Tier)
Railway offers a generous free tier and handles monorepos well.

### Setup:
1. Go to [railway.app](https://railway.app)
2. Connect GitHub repo
3. Create two services:
   - Backend: Set root directory to `/server`
   - Frontend: Set root directory to `/client`
4. Railway auto-detects Node.js apps

### Pros:
- Better monorepo support than Render
- Automatic HTTPS
- WebSocket support
- $5 free credit monthly

## 2. Vercel (Frontend) + Railway/Render (Backend)
Split deployment across platforms:

### Frontend on Vercel:
```bash
cd client
npm i -g vercel
vercel
```

### Backend stays on Render/Railway

### Pros:
- Vercel excels at static sites
- Unlimited bandwidth for frontend
- Easy environment variables

## 3. Fly.io (Docker-based)
Uses existing Docker setup:

```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Deploy
fly launch
fly deploy
```

### Pros:
- Free tier includes 3 shared VMs
- WebSocket support
- Global deployment

## 4. Netlify (Frontend) + Heroku (Backend)
Traditional split:

### Frontend:
```bash
cd client
npm run build
# Drag dist folder to netlify.com
```

### Backend:
- Use Heroku free alternatives (Render, Railway)

## 5. Replit
Zero-config option:

1. Import from GitHub
2. Replit auto-detects setup
3. Free hosting with limitations

### Pros:
- No configuration needed
- Live coding environment
- Always-on available (paid)

## 6. Local Solution - Ngrok
For testing/demos:

```bash
# Terminal 1: Run backend
cd server && npm run dev

# Terminal 2: Run frontend  
cd client && npm run dev

# Terminal 3: Expose to internet
ngrok http 3001
```

## Quick Docker Fix for Any Platform

Create a simple deployment script:

```dockerfile
# deploy.Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN cd server && npm install && npm run build
EXPOSE 10000
CMD ["node", "server/dist/index.js"]
```

Then deploy frontend separately as static site.

## Recommended Approach

1. **Railway** - Easiest monorepo support
2. **Vercel + Railway** - Best performance split
3. **Docker on Fly.io** - Most control

All options support WebSockets and have free tiers.