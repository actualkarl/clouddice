import { useState, useEffect, useCallback } from 'react';
import { User, DiceRoll } from './shared/types';
import { useSocket } from './hooks';
import JoinRoom from './components/JoinRoom';
import DiceTable from './components/DiceTable';
import RollHistory from './components/RollHistory';
import UserList from './components/UserList';
import ErrorMessage from './components/ErrorMessage';

const MAX_ROLL_HISTORY = 50;

function App() {
  const [nickname, setNickname] = useState('');
  const [joined, setJoined] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [rolls, setRolls] = useState<DiceRoll[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [currentRoll, setCurrentRoll] = useState<DiceRoll | null>(null);
  const [myUserId, setMyUserId] = useState<string | null>(null);

  // Socket event handlers
  const { error, connected, join, rollDice } = useSocket({
    onJoined: (data) => {
      setMyUserId(data.userId);
      setUsers(data.users);
      setRolls(data.recentRolls);
      setJoined(true);
    },
    onUserJoined: (user) => {
      setUsers(prev => [...prev, user]);
    },
    onUserLeft: (userId) => {
      setUsers(prev => prev.filter(u => u.id !== userId));
    },
    onDiceRolled: (roll) => {
      setRolls(prev => [...prev.slice(-(MAX_ROLL_HISTORY - 1)), roll]); // Keep last MAX_ROLL_HISTORY rolls
    },
  });

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
    if (nickname.trim()) {
      setNickname(nickname);
      join(nickname.trim());
    }
  }, [join]);

  const handleRoll = useCallback((diceCount: number) => {
    if (!isRolling && connected) {
      setIsRolling(true);
      setCurrentRoll(null);
      rollDice(diceCount);
    }
  }, [isRolling, connected, rollDice]);

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
        
        {error && <ErrorMessage message={error} />}
        
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