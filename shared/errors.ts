// Error types and utilities for consistent error handling

export enum ErrorType {
  VALIDATION = 'VALIDATION',
  CONNECTION = 'CONNECTION',
  PERMISSION = 'PERMISSION',
  GAME = 'GAME',
  UNKNOWN = 'UNKNOWN',
}

export interface AppError {
  type: ErrorType;
  message: string;
  details?: unknown;
}

// Error factory functions
export const createError = (type: ErrorType, message: string, details?: unknown): AppError => ({
  type,
  message,
  details,
});

export const validationError = (message: string, details?: unknown) => 
  createError(ErrorType.VALIDATION, message, details);

export const connectionError = (message: string, details?: unknown) => 
  createError(ErrorType.CONNECTION, message, details);

export const permissionError = (message: string, details?: unknown) => 
  createError(ErrorType.PERMISSION, message, details);

export const gameError = (message: string, details?: unknown) => 
  createError(ErrorType.GAME, message, details);

export const unknownError = (message: string, details?: unknown) => 
  createError(ErrorType.UNKNOWN, message, details);

// Error message templates
export const ERROR_MESSAGES = {
  // Connection errors
  NOT_CONNECTED: 'Not connected to server',
  CONNECTION_FAILED: 'Failed to connect to server',
  CONNECTION_LOST: 'Connection to server lost',
  RECONNECT_FAILED: 'Failed to reconnect to server',
  
  // Validation errors
  NICKNAME_REQUIRED: 'Nickname is required',
  NICKNAME_INVALID: 'Nickname contains invalid characters',
  DICE_COUNT_INVALID: 'Invalid dice count',
  
  // Permission errors
  JOIN_REQUIRED: 'You must join the room first',
  ALREADY_JOINED: 'You have already joined the room',
  
  // Game errors
  ROLL_IN_PROGRESS: 'A roll is already in progress',
  ROLL_FAILED: 'Failed to roll dice',
  
  // Generic errors
  UNKNOWN_ERROR: 'An unexpected error occurred',
  TRY_AGAIN: 'Please try again',
} as const;

// Error formatting utilities
export const formatError = (error: AppError): string => {
  return `${error.message}${error.type === ErrorType.CONNECTION ? '. Please refresh the page.' : ''}`;
};

export const isRetryableError = (error: AppError): boolean => {
  return error.type === ErrorType.CONNECTION || error.type === ErrorType.UNKNOWN;
};

// Server error handler
export class ServerErrorHandler {
  static handle(error: unknown, action: string): string {
    console.error(`Error in ${action}:`, error);
    
    if (error instanceof Error) {
      // Common error patterns
      if (error.message.includes('connect')) {
        return ERROR_MESSAGES.CONNECTION_FAILED;
      }
      if (error.message.includes('validate') || error.message.includes('invalid')) {
        return ERROR_MESSAGES.NICKNAME_INVALID;
      }
    }
    
    return `Failed to ${action}`;
  }
  
  static format(error: unknown): AppError {
    if (error instanceof Error) {
      return unknownError(error.message, error);
    }
    return unknownError(ERROR_MESSAGES.UNKNOWN_ERROR, error);
  }
}