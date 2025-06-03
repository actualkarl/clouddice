import { useState, FormEvent } from 'react';
import ErrorMessage from './ErrorMessage';

const MAX_NICKNAME_LENGTH = 20;

interface JoinRoomProps {
  onJoin: (nickname: string) => void;
  error: string | null;
}

function JoinRoom({ onJoin, error }: JoinRoomProps) {
  const [nickname, setNickname] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (nickname.trim()) {
      onJoin(nickname);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-white mb-6">Cloud Dice</h1>
        
        {error && <ErrorMessage message={error} />}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nickname" className="block text-sm font-medium text-gray-300 mb-2">
              Enter your nickname
            </label>
            <input
              id="nickname"
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Your nickname"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={MAX_NICKNAME_LENGTH}
              required
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
}

export default JoinRoom;