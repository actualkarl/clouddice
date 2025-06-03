import { useState } from 'react';
import { DiceRoll } from '../../../shared/types';

interface DiceTableProps {
  isRolling: boolean;
  currentRoll: DiceRoll | null;
  onRoll: (diceCount: number) => void;
}

function DiceTable({ isRolling, currentRoll, onRoll }: DiceTableProps) {
  const [diceCount, setDiceCount] = useState(1);

  const handleRoll = () => {
    onRoll(diceCount);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Dice Table</h2>
      
      <div className="flex flex-col items-center justify-center min-h-[300px] bg-gray-700 rounded-lg p-8">
        {isRolling ? (
          <div className="flex gap-2 flex-wrap justify-center">
            {Array.from({ length: diceCount }).map((_, i) => (
              <div key={i} className="text-6xl animate-spin">
                🎲
              </div>
            ))}
          </div>
        ) : currentRoll ? (
          <div className="text-center">
            <div className="flex gap-3 justify-center mb-4 flex-wrap">
              {currentRoll.values.map((value, i) => (
                <div
                  key={i}
                  className="text-5xl font-bold bg-gray-800 rounded-lg p-4 min-w-[70px] border-2 border-gray-600"
                >
                  {value}
                </div>
              ))}
            </div>
            {currentRoll.values.length > 1 && (
              <div className="text-3xl font-bold text-green-400">
                Total: {currentRoll.total}
              </div>
            )}
          </div>
        ) : (
          <div className="text-gray-400 text-xl">
            Click roll to start
          </div>
        )}
      </div>
      
      <div className="flex gap-4 items-center mt-6">
        <div className="flex items-center gap-2">
          <label htmlFor="diceCount" className="text-sm font-medium">
            Dice:
          </label>
          <select
            id="diceCount"
            value={diceCount}
            onChange={(e) => setDiceCount(Number(e.target.value))}
            disabled={isRolling}
            className="bg-gray-700 text-white rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        
        <button
          onClick={handleRoll}
          disabled={isRolling}
          className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          {isRolling ? 'Rolling...' : `Roll ${diceCount} ${diceCount === 1 ? 'Die' : 'Dice'}`}
        </button>
      </div>
    </div>
  );
}

export default DiceTable;