import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { User, DiceRoll, ServerToClientEvents, ClientToServerEvents } from './shared/types';
import { 
  MIN_DICE, 
  MAX_DICE, 
  DICE_SIDES, 
  MAX_ROLL_HISTORY, 
  MAX_NICKNAME_LENGTH,
  DEFAULT_PORT,
  VALIDATION_MESSAGES 
} from './shared/constants';
import { ServerErrorHandler, ERROR_MESSAGES } from './shared/errors';

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from client/dist for production
const clientDistPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

// API endpoints
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Cloud Dice Server is running!', 
    timestamp: new Date().toISOString(),
    connectedUsers: room.users.size
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

// Serve React app for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: [
      "http://localhost:5173", 
      "http://localhost:5174", 
      "https://clouddice-frontend.onrender.com",
      /\.ngrok\.io$/, 
      /\.ngrok-free\.app$/,
      /\.onrender\.com$/,
      /\.repl\.co$/,
      /\.replit\.dev$/
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Single room storage
const room = {
  users: new Map<string, User>(),
  rolls: [] as DiceRoll[]
};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', (nickname: string) => {
    try {
      // Validate nickname
      if (!nickname || nickname.trim().length === 0) {
        socket.emit('error', ERROR_MESSAGES.NICKNAME_REQUIRED);
        return;
      }

      const sanitizedNickname = nickname.trim().slice(0, MAX_NICKNAME_LENGTH);
      
      const user: User = {
        id: socket.id,
        nickname: sanitizedNickname,
        socketId: socket.id
      };
      
      room.users.set(socket.id, user);
      
      // Send joined confirmation with room state
      socket.emit('joined', {
        userId: user.id,
        users: Array.from(room.users.values()),
        recentRolls: room.rolls.slice(-10)
      });
      
      // Notify others
      socket.broadcast.emit('userJoined', user);
      console.log(`${sanitizedNickname} joined the room`);
    } catch (error) {
      const message = ServerErrorHandler.handle(error, 'join room');
      socket.emit('error', message);
    }
  });

  socket.on('roll', (diceCount: number) => {
    try {
      const user = room.users.get(socket.id);
      if (!user) {
        socket.emit('error', ERROR_MESSAGES.JOIN_REQUIRED);
        return;
      }

      // Validate and sanitize dice count
      const count = Math.floor(Math.min(Math.max(MIN_DICE, diceCount || MIN_DICE), MAX_DICE));
      
      // Roll the dice
      const values: number[] = [];
      for (let i = 0; i < count; i++) {
        values.push(Math.floor(Math.random() * DICE_SIDES) + 1);
      }
      
      const total = values.reduce((sum, val) => sum + val, 0);
      
      const roll: DiceRoll = {
        userId: user.id,
        nickname: user.nickname,
        values,
        total,
        timestamp: Date.now()
      };
      
      // Add to history
      room.rolls.push(roll);
      
      // Keep history size manageable
      if (room.rolls.length > MAX_ROLL_HISTORY) {
        room.rolls = room.rolls.slice(-MAX_ROLL_HISTORY);
      }
      
      // Broadcast to all users
      io.emit('diceRolled', roll);
      
      console.log(`${user.nickname} rolled ${count} dice: ${values.join(', ')} (Total: ${total})`);
    } catch (error) {
      const message = ServerErrorHandler.handle(error, 'roll dice');
      socket.emit('error', message);
    }
  });

  socket.on('disconnect', () => {
    try {
      const user = room.users.get(socket.id);
      if (user) {
        room.users.delete(socket.id);
        socket.broadcast.emit('userLeft', user.id);
        console.log(`${user.nickname} left the room`);
      }
    } catch (error) {
      console.error('Error in disconnect handler:', error);
    }
  });
});

const PORT = process.env.PORT || DEFAULT_PORT;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('CORS origins:', ["http://localhost:5173", "http://localhost:5174", /\.ngrok\.io$/, /\.ngrok-free\.app$/]);
});