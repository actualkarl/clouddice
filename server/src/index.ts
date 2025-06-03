import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { User, DiceRoll, ServerToClientEvents, ClientToServerEvents } from '../../shared/types';

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174", /\.ngrok\.io$/, /\.ngrok-free\.app$/],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Single room storage
const room = {
  users: new Map<string, User>(),
  rolls: [] as DiceRoll[]
};

// Constants
const MAX_DICE = 10;
const MIN_DICE = 1;
const DICE_SIDES = 6;
const MAX_ROLL_HISTORY = 50;

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', (nickname: string) => {
    try {
      // Validate nickname
      if (!nickname || nickname.trim().length === 0) {
        socket.emit('error', 'Nickname is required');
        return;
      }

      const sanitizedNickname = nickname.trim().slice(0, 20);
      
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
      console.error('Error in join handler:', error);
      socket.emit('error', 'Failed to join room');
    }
  });

  socket.on('roll', (diceCount: number) => {
    try {
      const user = room.users.get(socket.id);
      if (!user) {
        socket.emit('error', 'You must join first');
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
      console.error('Error in roll handler:', error);
      socket.emit('error', 'Failed to roll dice');
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

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('CORS origins:', ["http://localhost:5173", "http://localhost:5174", /\.ngrok\.io$/, /\.ngrok-free\.app$/]);
});