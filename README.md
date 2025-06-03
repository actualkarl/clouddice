# Cloud Dice - Simple Version

A real-time dice rolling application with WebSocket synchronization.

## Features
- Single shared room for all users
- Real-time dice rolling with animation
- User list showing all connected players
- Roll history
- Simple 6-sided dice

## 🚀 Quick Start Options

### Option 1: Docker (Recommended) 🐳
```bash
# Start development environment
npm run docker:dev
```
**Access:** http://localhost:5173

📖 **See [DOCKER_QUICKSTART.md](DOCKER_QUICKSTART.md) for detailed Docker instructions**

### Option 2: Traditional Setup

#### Install dependencies
```bash
# Root dependencies
npm install

# Server dependencies
cd server && npm install && cd ..

# Client dependencies
cd client && npm install && cd ..
```

### Run development servers

**For Windows:**
```bash
# From root directory, this opens two separate command windows
npm run dev:win
```

**For Mac/Linux:**
```bash
# From root directory, run both client and server
npm run dev
```

**Alternative (manual method for any OS):**
```bash
# Terminal 1 - Server
cd server
npm run dev

# Terminal 2 - Client (new terminal window)
cd client
npm run dev
```

This will start:
- Server on http://localhost:3001
- Client on http://localhost:5173

## How to use
1. Open http://localhost:5173 in your browser
2. Enter your nickname
3. Click "Join Room"
4. Click "Roll Dice" to roll
5. See other players' rolls in real-time

## Tech Stack
- Frontend: React + TypeScript + Tailwind CSS + Vite
- Backend: Node.js + Express + Socket.io + TypeScript
- Real-time: WebSocket communication
- Containerization: Docker + Docker Compose

## 🌍 Deployment Options

### 🎆 Quick Deploy (Free):
- **Render.com:** See [RENDER_DEPLOYMENT.md](RENDER_DEPLOYMENT.md)
- **Vercel + Render:** See [DEPLOYMENT.md](DEPLOYMENT.md)

### 🐳 Docker Deploy:
- **Any Docker Platform:** See [DOCKER_GUIDE.md](DOCKER_GUIDE.md)
- **Local Production:** `npm run docker:prod`

### 🛠️ Development:
- **Docker:** `npm run docker:dev` (recommended)
- **Traditional:** `npm run dev`

Choose the deployment method that best fits your needs!