// Shared constants used by both client and server

// Dice configuration
export const MIN_DICE = 1;
export const MAX_DICE = 10;
export const DICE_SIDES = 6;

// User configuration
export const MAX_NICKNAME_LENGTH = 20;
export const MIN_NICKNAME_LENGTH = 1;

// Room configuration
export const MAX_ROLL_HISTORY = 50;

// Server configuration
export const DEFAULT_PORT = 3001;

// Client configuration
export const SOCKET_RECONNECT_ATTEMPTS = 5;
export const SOCKET_RECONNECT_DELAY = 1000;

// Validation messages
export const VALIDATION_MESSAGES = {
  NICKNAME_TOO_SHORT: 'Nickname must be at least 1 character',
  NICKNAME_TOO_LONG: `Nickname must be less than ${MAX_NICKNAME_LENGTH} characters`,
  INVALID_DICE_COUNT: `Dice count must be between ${MIN_DICE} and ${MAX_DICE}`,
} as const;