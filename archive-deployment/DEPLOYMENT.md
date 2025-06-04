# Cloud Dice - Deployment Guide

## Quick Deploy to Free Hosting

### Backend - Deploy to Render.com

1. **Prepare server for production:**
```bash
cd server
npm run build
```

2. **Create a start script in server/package.json:**
```json
"scripts": {
  "start": "node dist/server/src/index.js",
  "build": "tsc"
}
```

3. **Sign up at [render.com](https://render.com)**

4. **Create New Web Service:**
   - Connect GitHub/GitLab or upload code
   - Root Directory: `server`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Choose FREE tier

5. **Copy your server URL** (like `https://clouddice-server.onrender.com`)

### Frontend - Deploy to Vercel

1. **Update client to use production server:**
```bash
# In client directory, create .env.production
echo "VITE_SERVER_URL=https://your-server.onrender.com" > .env.production
```

2. **Build the client:**
```bash
cd client
npm run build
```

3. **Deploy to Vercel:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - What's your project name? clouddice
# - Which directory? ./dist
# - Want to override settings? No
```

4. **Your app is live!** Share the Vercel URL with friends.

## Alternative: All-in-One with Glitch

1. Go to [glitch.com](https://glitch.com)
2. Create new project → Import from GitHub
3. Your app gets a URL like `https://clouddice.glitch.me`

## Environment Variables Setup

### For Development:
```bash
# client/.env
VITE_SERVER_URL=http://localhost:3001
```

### For Production:
```bash
# client/.env.production
VITE_SERVER_URL=https://your-server-url.onrender.com
```

## Update CORS for Production

In `server/src/index.ts`, add your production URLs:
```typescript
const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://your-app.vercel.app",
      "https://your-custom-domain.com"
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});
```

## Share with Friends

Once deployed, just share your frontend URL:
- Vercel: `https://clouddice.vercel.app`
- Netlify: `https://clouddice.netlify.app`
- Custom domain: `https://dice.yourdomain.com`

Friends can join instantly - no installation needed!