# Cloud Dice - Replit Deployment Guide

## Quick Start on Replit

1. **Import to Replit:**
   - Go to [replit.com](https://replit.com)
   - Click "Create Repl"
   - Choose "Import from GitHub"
   - Paste your repository URL
   - Click "Import from GitHub"

2. **Automatic Setup:**
   - Replit will detect the configuration files
   - It will automatically install dependencies
   - The app will build and start

3. **Access Your App:**
   - Frontend: Main Replit URL (port 80)
   - Backend: Port 3001 (WebSocket connections)

## Configuration Files

### `.replit`
- Defines entry point (`index.js`)
- Sets up Node.js 20 environment
- Configures ports (3001 for backend, 80 for frontend)
- Enables TypeScript language server

### `replit.nix`
- Installs Node.js 20
- Includes TypeScript support
- Manages system dependencies

### `index.js`
- Orchestrates both frontend and backend
- Handles environment variables
- Manages process lifecycle

## How It Works

1. **Single Entry Point:** `index.js` starts both services
2. **Backend:** Runs on port 3001 with WebSocket support
3. **Frontend:** Vite dev server proxied through port 80
4. **Environment Detection:** Automatically uses Replit URLs

## Troubleshooting

### "Cannot connect to server"
- Check the Console for backend errors
- Ensure port 3001 is exposed in Replit

### "Page not loading"
- Wait for both services to start (check logs)
- Refresh after 30 seconds

### "Build failures"
- Click "Shell" and run: `npm run install:all`
- Then run: `npm run build`

## Sharing Your App

1. Your app URL: `https://[repl-name].[username].repl.co`
2. Share this URL with friends
3. Everyone can join and roll dice together!

## Performance Tips

- Use "Always On" (paid feature) for 24/7 availability
- Replit free tier may sleep after inactivity
- First load after sleep takes ~30 seconds

## Development on Replit

To make changes:
1. Edit files in the Replit editor
2. Changes auto-reload
3. Use the Console for debugging

## Clean Project Structure

We've removed Docker and platform-specific files:
- All deployment files moved to `archive-deployment/`
- Simplified scripts in `package.json`
- Clean structure for Replit