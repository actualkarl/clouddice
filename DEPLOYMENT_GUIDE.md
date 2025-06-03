# Cloud Dice Deployment Guide

## Render.com Deployment

This project is configured for deployment on Render.com using the `render.yaml` configuration.

### Prerequisites
1. Push your code to GitHub
2. Connect your GitHub repository to Render
3. Render will automatically detect the `render.yaml` file

### Configuration

The deployment consists of two services:

#### Backend Server (`clouddice-server`)
- **Type**: Web Service
- **Environment**: Node.js
- **Build Command**: `cd server && npm install && npm run build`
- **Start Command**: `cd server && npm run start`
- **Port**: 10000 (automatically set by Render)

#### Frontend (`clouddice-frontend`)
- **Type**: Static Site
- **Build Command**: `cd client && npm install && npm run build`
- **Publish Directory**: `./client/dist`
- **Environment Variables**:
  - `VITE_SERVER_URL`: Points to the deployed backend server

### Environment Variables

#### Server
- `NODE_ENV`: production
- `PORT`: 10000 (set by Render)

#### Client
- `VITE_SERVER_URL`: https://clouddice-server.onrender.com

### Health Endpoints

The server provides health check endpoints:
- `GET /` - Basic status and connected users count
- `GET /health` - Health check with uptime

### CORS Configuration

The server is configured to accept requests from:
- Local development: `http://localhost:5173`, `http://localhost:5174`
- Production: `https://clouddice-frontend.onrender.com`
- Development tools: ngrok domains
- All Render domains: `*.onrender.com`

### Deployment Steps

1. **Push to GitHub**:
   ```bash
   git push origin main
   ```

2. **Create Render Account** and connect your GitHub repository

3. **Render will automatically**:
   - Detect the `render.yaml` file
   - Create both services (server and frontend)
   - Deploy using the specified build and start commands

4. **Access your application**:
   - Frontend: `https://clouddice-frontend.onrender.com`
   - Backend: `https://clouddice-server.onrender.com`

### Troubleshooting

#### Build Failures
- Check that all dependencies are in `package.json`
- Ensure TypeScript compiles without errors locally
- Verify build commands work in the correct directories

#### Connection Issues
- Verify CORS settings include your deployed domain
- Check that `VITE_SERVER_URL` points to the correct backend URL
- Ensure WebSocket connections are working (Render supports WebSockets)

#### Server Not Starting
- Check that the `dist` directory is created during build
- Verify the start command path: `cd server && npm run start`
- Check logs for any missing dependencies or runtime errors

### Local Testing Before Deployment

```bash
# Test server build
cd server && npm run build && npm run start

# Test client build  
cd client && npm run build && npm run preview
```

### Performance Notes

- **Free Tier**: Services may spin down when idle and take 30+ seconds to wake up
- **WebSockets**: Fully supported on Render
- **Static Assets**: Client is served from Render's CDN for fast loading