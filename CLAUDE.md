# Cloud Dice - AI Assistant Guide

## Project Overview
Cloud Dice is a real-time synchronized dice rolling web application built with React, TypeScript, Node.js, and Socket.IO. Users can join a shared room and roll dice together with perfect synchronization.

## Current Implementation Status
- ✅ Single shared room (no room codes)
- ✅ Multi-dice rolling (1-10 dice)
- ✅ Real-time WebSocket synchronization
- ✅ Component-based architecture
- ✅ TypeScript with shared types
- ✅ Error handling and validation
- ✅ Docker support for deployment
- ✅ Render deployment configuration

## Tech Stack
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + Socket.IO + TypeScript
- **Shared Types**: TypeScript interfaces in `/shared/types.ts`
- **Real-time**: WebSocket communication
- **Deployment**: Docker, Render (split services)

## Project Structure
```
/clouddice
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # UI components
│   │   │   ├── JoinRoom.tsx
│   │   │   ├── DiceTable.tsx
│   │   │   ├── RollHistory.tsx
│   │   │   └── UserList.tsx
│   │   └── App.tsx          # Main app logic
├── server/                   # Node.js backend
│   └── src/
│       └── index.ts         # WebSocket server
├── shared/
│   └── types.ts             # Shared TypeScript types
├── render.yaml              # Render deployment config
├── docker-compose.yml       # Development Docker
└── docker-compose.prod.yml  # Production Docker
```

## Development Setup (Windows WSL)

### Prerequisites for WSL
```bash
# Update WSL Ubuntu packages
sudo apt update && sudo apt upgrade -y

# Install Node.js via nvm (recommended for WSL)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18

# Verify installations
node --version  # Should be v18.x.x
npm --version   # Should be 9.x.x or higher
```

### Project Setup in WSL
```bash
# Clone the project (if not already done)
cd /mnt/c/Users/GGPC/Downloads/Coding_Projects/
git clone <your-repo-url> clouddice
cd clouddice

# Install dependencies
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..

# Run development servers (2 terminals in WSL)
# Terminal 1:
cd server && npm run dev

# Terminal 2:
cd client && npm run dev
```

### WSL-Specific Notes
- Access the app at `http://localhost:5173` (Vite dev server)
- Server runs on `http://localhost:3001`
- Use VS Code with WSL extension for best experience
- File watching works better in WSL2 than WSL1
- If port conflicts occur, check Windows processes: `netstat -ano | findstr :3001`

### Key Files to Understand
1. `/shared/types.ts` - All TypeScript interfaces
2. `/server/src/index.ts` - WebSocket event handlers
3. `/client/src/App.tsx` - Main state management
4. `/client/src/components/DiceTable.tsx` - Dice rolling UI

## Important Implementation Details

### Socket.IO Events
**Client → Server:**
- `join(nickname: string)` - Join the room
- `roll(diceCount: number)` - Roll 1-10 dice

**Server → Client:**
- `joined(data: JoinedData)` - Includes userId, users, recentRolls
- `userJoined(user: User)` - New user notification
- `userLeft(userId: string)` - User disconnected
- `diceRolled(roll: DiceRoll)` - Dice roll result
- `error(message: string)` - Error messages

### State Management
- `myUserId` - Critical for identifying own rolls
- `isRolling` - Controls animation state
- `currentRoll` - Display state for dice results
- Roll detection uses `latestRoll.userId === myUserId`

### Common Issues & Solutions
1. **Dice rolling forever**: Fixed by properly tracking `myUserId`
2. **White screen**: Fixed with error boundaries and safe data access
3. **Windows command issues**: Use `npx` prefix or global installs
4. **Multiple dice not showing**: Ensure `values` array is properly rendered

## Testing Checklist
When making changes, test:
- [ ] Join with nickname
- [ ] Roll single die
- [ ] Roll multiple dice (2-10)
- [ ] Check roll history shows all values
- [ ] Verify other users see rolls
- [ ] Test with multiple browser windows

## Future Enhancement Ideas
- Different dice types (d4, d8, d10, d12, d20)
- Private rooms with codes
- 3D dice rendering with Three.js
- Sound effects
- Roll statistics
- Custom dice colors/themes

## Important Notes
- Always maintain backwards compatibility with roll data
- Server validates all inputs (nickname length, dice count)
- Keep components isolated - changes to one shouldn't break others
- Use TypeScript strictly - no `any` types
- Test with multiple users before considering feature complete

## Common Pitfalls to Avoid
1. Don't access `socket.id` on client - it's undefined
2. Always validate array access (use optional chaining)
3. Remember Windows users need special handling for commands
4. Keep roll history limited to prevent memory issues
5. Always emit events to all users (use `io.emit` not `socket.emit` for rolls)

## Render Deployment (Split Services)

### Overview
The application is deployed on Render as two separate services:
- **Backend**: Node.js web service
- **Frontend**: Static site with Vite build

### Deployment Configuration
The `render.yaml` file defines both services:

```yaml
services:
  # Backend API Service
  - type: web
    name: clouddice-server
    env: node
    buildCommand: cd server && npm install && npm run build
    startCommand: cd server && npm run start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000

  # Frontend Static Site
  - type: static
    name: clouddice-frontend
    buildCommand: cd client && npm install && npm run build
    staticPublishPath: ./client/dist
    envVars:
      - key: VITE_SERVER_URL
        value: https://clouddice-server.onrender.com
```

### Deployment Steps

1. **Prepare Your Repository**
   ```bash
   # Ensure all changes are committed
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. **Deploy to Render**
   - Go to [render.com](https://render.com)
   - Connect your GitHub repository
   - Choose "Blueprint" deployment (uses render.yaml)
   - Render will automatically create both services

3. **Environment Variables**
   - Backend automatically uses PORT 10000
   - Frontend needs VITE_SERVER_URL pointing to backend URL
   - Update VITE_SERVER_URL after backend deploys

4. **Post-Deployment**
   - Test WebSocket connections
   - Verify CORS settings work correctly
   - Check that both services are healthy

### Troubleshooting Render Deployment

1. **Build Failures**
   - Check Node version compatibility
   - Ensure TypeScript is in dependencies, not just devDependencies
   - Verify all required packages are listed

2. **WebSocket Issues**
   - Render supports WebSockets on all plans
   - Ensure client uses wss:// for secure connections
   - Check CORS configuration includes Render domains

3. **Static Site Issues**
   - Verify build output is in `client/dist`
   - Check that index.html exists after build
   - Ensure Vite base URL is configured correctly

### Local Testing of Production Build
```bash
# Build both services locally
npm run build

# Test production builds
# Terminal 1 - Backend
cd server
NODE_ENV=production PORT=10000 npm start

# Terminal 2 - Frontend (use a static server)
cd client
npx serve dist -p 5000
```

### Alternative Docker Deployment on Render
If you prefer Docker deployment:
1. Uncomment the Docker service in render.yaml
2. Comment out the split services
3. Push changes and redeploy

### Monitoring and Logs
- Use Render dashboard for logs
- Monitor WebSocket connections
- Set up alerts for service health
- Check memory usage (Socket.IO can be memory intensive)