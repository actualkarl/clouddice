import { useEffect, useState, useCallback, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { 
  User, 
  DiceRoll, 
  JoinedData, 
  ServerToClientEvents, 
  ClientToServerEvents 
} from '../shared/types';
// Connection constants
const SOCKET_RECONNECT_ATTEMPTS = 5;
const SOCKET_RECONNECT_DELAY = 1000;

// Error messages
const ERROR_MESSAGES = {
  NOT_CONNECTED: 'Not connected to server',
  RECONNECT_FAILED: 'Failed to reconnect to server',
} as const;

type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>;

interface UseSocketResult {
  socket: SocketType | null;
  connected: boolean;
  error: string | null;
  join: (nickname: string) => void;
  rollDice: (diceCount: number) => void;
  disconnect: () => void;
}

interface SocketEvents {
  onJoined?: (data: JoinedData) => void;
  onUserJoined?: (user: User) => void;
  onUserLeft?: (userId: string) => void;
  onDiceRolled?: (roll: DiceRoll) => void;
  onError?: (message: string) => void;
}

export function useSocket(events: SocketEvents): UseSocketResult {
  const [socket, setSocket] = useState<SocketType | null>(null);
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const reconnectAttempts = useRef(0);

  useEffect(() => {
    const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001';
    const newSocket = io(serverUrl, {
      reconnection: true,
      reconnectionAttempts: SOCKET_RECONNECT_ATTEMPTS,
      reconnectionDelay: SOCKET_RECONNECT_DELAY,
    }) as SocketType;

    setSocket(newSocket);

    // Connection event handlers
    newSocket.on('connect', () => {
      setConnected(true);
      setError(null);
      reconnectAttempts.current = 0;
      console.log('Connected to server');
    });

    newSocket.on('disconnect', () => {
      setConnected(false);
      console.log('Disconnected from server');
    });

    newSocket.on('connect_error', (err) => {
      setConnected(false);
      reconnectAttempts.current++;
      if (reconnectAttempts.current >= SOCKET_RECONNECT_ATTEMPTS) {
        setError(ERROR_MESSAGES.RECONNECT_FAILED + '. Please refresh the page.');
      }
      console.error('Connection error:', err.message);
    });

    // Game event handlers
    newSocket.on('joined', (data: JoinedData) => {
      events.onJoined?.(data);
      setError(null);
    });

    newSocket.on('userJoined', (user: User) => {
      events.onUserJoined?.(user);
    });

    newSocket.on('userLeft', (userId: string) => {
      events.onUserLeft?.(userId);
    });

    newSocket.on('diceRolled', (roll: DiceRoll) => {
      events.onDiceRolled?.(roll);
    });

    newSocket.on('error', (message: string) => {
      setError(message);
      events.onError?.(message);
      console.error('Server error:', message);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const join = useCallback((nickname: string) => {
    if (socket && connected) {
      socket.emit('join', nickname);
    } else {
      setError(ERROR_MESSAGES.NOT_CONNECTED);
    }
  }, [socket, connected]);

  const rollDice = useCallback((diceCount: number) => {
    if (socket && connected) {
      socket.emit('roll', diceCount);
    } else {
      setError(ERROR_MESSAGES.NOT_CONNECTED);
    }
  }, [socket, connected]);

  const disconnect = useCallback(() => {
    if (socket) {
      socket.close();
      setSocket(null);
      setConnected(false);
    }
  }, [socket]);

  return {
    socket,
    connected,
    error,
    join,
    rollDice,
    disconnect,
  };
}