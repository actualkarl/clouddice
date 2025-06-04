# Cloud Dice - Render Deployment Guide

## 🚀 Quick Deploy to Render.com (Recommended)

### Prerequisites
- GitHub repository with your code
- Render.com account (free)

### Step 1: Prepare Your Code

✅ **Already Fixed:**
- Server package.json start script corrected
- CORS configuration updated for production
- render.yaml configured for both backend and frontend
- TypeScript build configuration fixed

### Step 2: Deploy to Render

#### Option A: Using render.yaml (Recommended)

1. **Push code to GitHub:**
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

2. **Create Render services:**
   - Go to [render.com](https://render.com) and sign in
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Select the `clouddice` repository
   - Render will automatically detect the `render.yaml` and create both services

3. **Your services will be:**
   - Backend: `https://clouddice-server.onrender.com`
   - Frontend: `https://clouddice-frontend.onrender.com`

#### Option B: Manual Setup

**Backend (Web Service):**
1. New → Web Service → Connect GitHub
2. Select your repository
3. Settings:
   - **Name:** `clouddice-server`
   - **Environment:** Node
   - **Build Command:** `cd server && npm install && npm run build`
   - **Start Command:** `cd server && npm run start`
   - **Environment Variables:**
     - `NODE_ENV` = `production`

**Frontend (Static Site):**
1. New → Static Site → Connect GitHub
2. Select your repository
3. Settings:
   - **Name:** `clouddice-frontend`
   - **Build Command:** `cd client && npm install && npm run build`
   - **Publish Directory:** `client/dist`
   - **Environment Variables:**
     - `VITE_SERVER_URL` = `https://clouddice-server.onrender.com`

### Step 3: Verify Deployment

1. **Check backend:** Visit `https://clouddice-server.onrender.com`
   - Should show "Cannot GET /" (this is normal for Socket.io server)

2. **Check frontend:** Visit `https://clouddice-frontend.onrender.com`
   - Should load the dice rolling interface

3. **Test functionality:**
   - Enter a nickname and join
   - Roll dice and verify real-time updates work

### Step 4: Custom Domain (Optional)

1. In Render dashboard → Settings → Custom Domains
2. Add your domain (e.g., `dice.yourdomain.com`)
3. Update CORS in server if using custom domain

## 🔧 Troubleshooting

### Common Issues:

**1. Build Fails:**
- Check build logs in Render dashboard
- Ensure all dependencies are in package.json

**2. CORS Errors:**
- Verify frontend URL is in server CORS configuration
- Check environment variables are set correctly

**3. Socket.io Connection Issues:**
- Ensure WebSocket support is enabled (Render supports this)
- Check server logs for connection errors

**4. Environment Variables:**
- Frontend: `VITE_SERVER_URL` must point to backend URL
- Backend: `PORT` is automatically set by Render

### Logs & Debugging:
- Check deployment logs in Render dashboard
- Use browser dev tools to inspect network requests
- Server logs show real-time connection info

## 🌐 Alternative: Vercel + Render

**Backend:** Deploy to Render (as above)
**Frontend:** Deploy to Vercel:

1. Install Vercel CLI: `npm i -g vercel`
2. In client directory: `vercel`
3. Set environment variable: `VITE_SERVER_URL=https://clouddice-server.onrender.com`

## 📱 Share Your App

Once deployed, share your frontend URL:
- **Render:** `https://clouddice-frontend.onrender.com`
- **Custom:** `https://yourdomain.com`

Friends can join instantly - no installation needed!

## 💡 Pro Tips

1. **Free Tier Limitations:**
   - Services sleep after 15 minutes of inactivity
   - First load after sleep takes ~30 seconds

2. **Performance:**
   - Consider upgrading to paid plan for always-on service
   - Use custom domain for better branding

3. **Monitoring:**
   - Enable email notifications for deployment failures
   - Check logs regularly for errors
