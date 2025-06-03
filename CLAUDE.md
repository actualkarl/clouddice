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

## Tech Stack
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + Socket.IO + TypeScript
- **Shared Types**: TypeScript interfaces in `/shared/types.ts`
- **Real-time**: WebSocket communication

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
└── package.json             # Root scripts
```

## Development Commands

### Windows Setup (IMPORTANT)
```bash
# Install global dependencies first
npm install -g vite nodemon typescript ts-node

# Install project dependencies
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..

# Run development servers (2 terminals)
# Terminal 1:
cd server && npm run dev

# Terminal 2:
cd client && npm run dev
```

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