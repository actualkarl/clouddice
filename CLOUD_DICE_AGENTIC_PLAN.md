# Cloud Dice - Agentic Coding Implementation Plan

## Project Overview
A real-time synchronized dice rolling web application with realistic 3D physics for remote tabletop gaming.

## Development Phases

### Phase 1: Project Setup and Core Infrastructure
**Goal:** Establish foundation for real-time dice rolling application

#### Task 1.1: Initialize Project Structure
```
/clouddice
├── /client              # React frontend
│   ├── /src
│   │   ├── /components  # UI components
│   │   ├── /hooks       # Custom React hooks
│   │   ├── /services    # WebSocket & API services
│   │   ├── /utils       # Helper functions
│   │   └── /assets      # Images, fonts, etc.
│   └── package.json
├── /server              # Node.js backend
│   ├── /src
│   │   ├── /handlers    # WebSocket event handlers
│   │   ├── /middleware  # Express middleware
│   │   ├── /services    # Business logic
│   │   └── /utils       # Server utilities
│   └── package.json
├── /shared              # Shared types/constants
└── package.json         # Root package.json
```

**Commands:**
```bash
# Create directory structure
mkdir -p client/src/{components,hooks,services,utils,assets}
mkdir -p server/src/{handlers,middleware,services,utils}
mkdir shared

# Initialize packages
npm init -y
cd client && npm init -y && cd ..
cd server && npm init -y && cd ..
```

#### Task 1.2: Install Core Dependencies
**Frontend:**
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "three": "^0.160.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.96.0",
    "socket.io-client": "^4.7.4",
    "react-router-dom": "^6.21.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "tailwindcss": "^3.4.0"
  }
}
```

**Backend:**
```json
{
  "dependencies": {
    "express": "^4.18.2",
    "socket.io": "^4.7.4",
    "cors": "^2.8.5",
    "nanoid": "^5.0.4",
    "cannon-es": "^0.20.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.2",
    "typescript": "^5.3.3"
  }
}
```

### Phase 2: Basic Room System Implementation
**Goal:** Enable users to create and join rooms

#### Task 2.1: Create Room Management Backend
```typescript
// server/src/services/roomService.ts
interface Room {
  id: string;
  code: string;
  users: Map<string, User>;
  createdAt: Date;
  lastActivity: Date;
}

interface User {
  id: string;
  nickname: string;
  socketId: string;
}

class RoomService {
  private rooms: Map<string, Room>;
  
  createRoom(): Room
  joinRoom(code: string, user: User): Room
  leaveRoom(userId: string, roomId: string): void
  getRoomByCode(code: string): Room | null
  generateRoomCode(): string
}
```

#### Task 2.2: Implement WebSocket Events
```typescript
// server/src/handlers/socketHandlers.ts
const handleConnection = (socket: Socket) => {
  socket.on('createRoom', handleCreateRoom);
  socket.on('joinRoom', handleJoinRoom);
  socket.on('leaveRoom', handleLeaveRoom);
  socket.on('rollDice', handleRollDice);
  socket.on('disconnect', handleDisconnect);
};
```

#### Task 2.3: Create Frontend Room Components
```tsx
// client/src/components/CreateRoom.tsx
// client/src/components/JoinRoom.tsx
// client/src/components/Room.tsx
// client/src/hooks/useWebSocket.ts
```

### Phase 3: 3D Dice Implementation
**Goal:** Create realistic 3D dice with physics

#### Task 3.1: Set Up Three.js Scene
```tsx
// client/src/components/DiceScene.tsx
const DiceScene: React.FC = () => {
  // Initialize Three.js scene
  // Add lighting
  // Add camera controls
  // Add dice table/surface
};
```

#### Task 3.2: Create Dice Geometry
```typescript
// client/src/utils/diceGeometry.ts
export const createD6Geometry = () => {
  // Create box geometry
  // Add textures for numbers
  // Apply materials
};
```

#### Task 3.3: Implement Physics Engine
```typescript
// shared/physics/dicePhysics.ts
export class DicePhysics {
  private world: CANNON.World;
  
  initializeWorld(): void
  createDice(position: Vec3): Body
  simulateRoll(seed: number): RollResult
  getDeterministicResult(seed: number): number
}
```

### Phase 4: Real-Time Synchronization
**Goal:** Ensure all users see identical dice rolls

#### Task 4.1: Implement Seed-Based Rolling
```typescript
// server/src/services/rollService.ts
class RollService {
  generateRollSeed(): number
  broadcastRoll(roomId: string, userId: string, seed: number): void
  validateRoll(seed: number, result: number): boolean
}
```

#### Task 4.2: Synchronize Animations
```typescript
// client/src/services/syncService.ts
class SyncService {
  syncRollAnimation(seed: number, startTime: number): void
  interpolatePosition(deltaTime: number): void
  handleLatency(serverTime: number): void
}
```

### Phase 5: UI/UX Implementation
**Goal:** Create responsive, intuitive interface

#### Task 5.1: Design Component System
```
Components:
- LandingPage
- RoomLobby
- DiceTable
- UserList
- RollHistory
- RollButton
- ShareModal
```

#### Task 5.2: Implement Responsive Design
```css
/* Tailwind configuration for mobile-first design */
/* Breakpoints: mobile (default), tablet (768px), desktop (1024px) */
```

### Phase 6: Security & Performance
**Goal:** Secure and optimize the application

#### Task 6.1: Implement Security Measures
- Input sanitization
- Rate limiting
- Room access validation
- WebSocket authentication

#### Task 6.2: Optimize Performance
- Lazy load 3D assets
- Implement WebSocket reconnection
- Add service worker for offline support
- Optimize bundle size

### Phase 7: Deployment
**Goal:** Deploy application to production

#### Task 7.1: Configure Build Process
```json
// package.json scripts
{
  "scripts": {
    "build:client": "cd client && npm run build",
    "build:server": "cd server && npm run build",
    "build": "npm run build:client && npm run build:server",
    "start": "node server/dist/index.js"
  }
}
```

#### Task 7.2: Deploy to Cloud Platform
- Frontend: Vercel/Netlify
- Backend: Railway/Render
- Configure environment variables
- Set up CI/CD pipeline

## Implementation Order for AI Agents

1. **Start with Task 1.1-1.2**: Set up project structure and dependencies
2. **Move to Task 2.1-2.3**: Build basic room system (no dice yet)
3. **Test room creation/joining**: Ensure WebSocket communication works
4. **Implement Task 3.1-3.3**: Add 3D dice rendering
5. **Complete Task 4.1-4.2**: Add synchronization
6. **Polish with Task 5.1-5.2**: Improve UI/UX
7. **Secure with Task 6.1-6.2**: Add security and optimize
8. **Deploy with Task 7.1-7.2**: Ship to production

## Testing Strategy

### Unit Tests
- Room management logic
- Dice physics calculations
- WebSocket event handlers

### Integration Tests
- Room creation/joining flow
- Dice roll synchronization
- Multi-user scenarios

### E2E Tests
- Complete user journey
- Cross-browser compatibility
- Mobile responsiveness

## Success Criteria
- [ ] Users can create/join rooms without friction
- [ ] Dice rolls are perfectly synchronized
- [ ] Physics animation runs at 60fps
- [ ] < 100ms latency for roll results
- [ ] Works on mobile and desktop browsers
- [ ] Handles 100+ concurrent rooms

## Notes for AI Implementation
- Always test WebSocket events in isolation first
- Use deterministic physics seed for testing
- Implement features incrementally with working demos
- Prioritize core functionality over polish initially
- Keep components modular and reusable