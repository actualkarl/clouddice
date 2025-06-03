import { User } from '../../../shared/types';

interface UserListProps {
  users: User[];
  currentUserId: string | null;
}

function UserList({ users, currentUserId }: UserListProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">
        Players ({users.length})
      </h2>
      <div className="space-y-2">
        {users.map(user => (
          <div
            key={user.id}
            className={`flex items-center space-x-2 p-2 rounded ${
              user.id === currentUserId ? 'bg-gray-700' : ''
            }`}
          >
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="flex-1">{user.nickname}</span>
            {user.id === currentUserId && (
              <span className="text-xs text-gray-400">(You)</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;