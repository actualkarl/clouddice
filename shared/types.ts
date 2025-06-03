export interface User {
  id: string;
  nickname: string;
  socketId?: string;
}

export interface DiceRoll {
  userId: string;
  nickname: string;
  values: number[];
  total: number;
  timestamp: number;
}

export interface JoinedData {
  userId: string;
  users: User[];
  recentRolls: DiceRoll[];
}

export interface ServerToClientEvents {
  joined: (data: JoinedData) => void;
  userJoined: (user: User) => void;
  userLeft: (userId: string) => void;
  diceRolled: (roll: DiceRoll) => void;
  error: (message: string) => void;
}

export interface ClientToServerEvents {
  join: (nickname: string) => void;
  roll: (diceCount: number) => void;
}