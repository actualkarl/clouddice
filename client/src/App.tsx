import { useState, useEffect, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';
import { User, DiceRoll, JoinedData, ServerToClientEvents, ClientToServerEvents } from '../../shared/types';
import JoinRoom from './components/JoinRoom';
import DiceTable from './components/DiceTable';
import RollHistory from './components/RollHistory';
import UserList from './components/UserList';

type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>;

function App() {
  const [socket, setSocket] = useState<SocketType | null>(null);
  const [nickname, setNickname] = useState('');
  const [joined, setJoined] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [rolls, setRolls] = useState<DiceRoll[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [currentRoll, setCurrentRoll] = useState<DiceRoll | null>(null);
  const [myUserId, setMyUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const serverUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:3001';
    const newSocket = io(serverUrl) as SocketType;
    setSocket(newSocket);

    newSocket.on('joined', (data: JoinedData) => {
      setMyUserId(data.userId);
      setUsers(data.users);
      setRolls(data.recentRolls);
      setJoined(true);
      setError(null);
    });

    newSocket.on('userJoined', (user: User) => {
      setUsers(prev => [...prev, user]);
    });

    newSocket.on('userLeft', (userId: string) => {
      setUsers(prev => prev.filter(u => u.id !== userId));
    });

    newSocket.on('diceRolled', (roll: DiceRoll) => {
      setRolls(prev => [...prev.slice(-49), roll]); // Keep last 50 rolls
    });

    newSocket.on('error', (message: string) => {
      setError(message);
      console.error('Server error:', message);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  // Handle when my roll is received
  useEffect(() => {
    if (rolls.length > 0 && myUserId && isRolling) {
      const latestRoll = rolls[rolls.length - 1];
      if (latestRoll.userId === myUserId) {
        console.log('My roll received:', latestRoll);
        setCurrentRoll(latestRoll);
        setTimeout(() => {
          setIsRolling(false);
        }, 1000);
      }
    }
  }, [rolls, myUserId, isRolling]);

  const handleJoin = useCallback((nickname: string) => {
    if (socket && nickname.trim()) {
      setNickname(nickname);
      socket.emit('join', nickname.trim());
    }
  }, [socket]);

  const handleRoll = useCallback((diceCount: number) => {
    if (socket && !isRolling) {
      setIsRolling(true);
      setCurrentRoll(null);
      setError(null);
      socket.emit('roll', diceCount);
    }
  }, [socket, isRolling]);

  if (!joined) {
    return <JoinRoom onJoin={handleJoin} error={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Cloud Dice</h1>
          <span className="text-gray-400">Playing as: {nickname}</span>
        </div>
        
        {error && (
          <div className="bg-red-600 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <DiceTable
              isRolling={isRolling}
              currentRoll={currentRoll}
              onRoll={handleRoll}
            />
            <RollHistory rolls={rolls} />
          </div>
          
          <UserList users={users} currentUserId={myUserId} />
        </div>
      </div>
    </div>
  );
}

export default App;