import { DiceRoll } from '../../../shared/types';

interface RollHistoryProps {
  rolls: DiceRoll[];
}

function RollHistory({ rolls }: RollHistoryProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Roll History</h2>
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {rolls.length === 0 ? (
          <p className="text-gray-500">No rolls yet</p>
        ) : (
          [...rolls].reverse().map((roll, index) => (
            <div
              key={`${roll.timestamp}-${index}`}
              className="flex justify-between items-center py-2 px-3 bg-gray-700 rounded"
            >
              <span className="font-medium">{roll.nickname}</span>
              <div className="text-right">
                <span className="text-sm text-gray-400 mr-3">
                  {roll.values.join(', ')}
                </span>
                <span className="text-xl font-bold">
                  {roll.total}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RollHistory;