"use strict";
// Error types and utilities for consistent error handling
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerErrorHandler = exports.isRetryableError = exports.formatError = exports.ERROR_MESSAGES = exports.unknownError = exports.gameError = exports.permissionError = exports.connectionError = exports.validationError = exports.createError = exports.ErrorType = void 0;
var ErrorType;
(function (ErrorType) {
    ErrorType["VALIDATION"] = "VALIDATION";
    ErrorType["CONNECTION"] = "CONNECTION";
    ErrorType["PERMISSION"] = "PERMISSION";
    ErrorType["GAME"] = "GAME";
    ErrorType["UNKNOWN"] = "UNKNOWN";
})(ErrorType || (exports.ErrorType = ErrorType = {}));
// Error factory functions
const createError = (type, message, details) => ({
    type,
    message,
    details,
});
exports.createError = createError;
const validationError = (message, details) => (0, exports.createError)(ErrorType.VALIDATION, message, details);
exports.validationError = validationError;
const connectionError = (message, details) => (0, exports.createError)(ErrorType.CONNECTION, message, details);
exports.connectionError = connectionError;
const permissionError = (message, details) => (0, exports.createError)(ErrorType.PERMISSION, message, details);
exports.permissionError = permissionError;
const gameError = (message, details) => (0, exports.createError)(ErrorType.GAME, message, details);
exports.gameError = gameError;
const unknownError = (message, details) => (0, exports.createError)(ErrorType.UNKNOWN, message, details);
exports.unknownError = unknownError;
// Error message templates
exports.ERROR_MESSAGES = {
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
};
// Error formatting utilities
const formatError = (error) => {
    return `${error.message}${error.type === ErrorType.CONNECTION ? '. Please refresh the page.' : ''}`;
};
exports.formatError = formatError;
const isRetryableError = (error) => {
    return error.type === ErrorType.CONNECTION || error.type === ErrorType.UNKNOWN;
};
exports.isRetryableError = isRetryableError;
// Server error handler
class ServerErrorHandler {
    static handle(error, action) {
        console.error(`Error in ${action}:`, error);
        if (error instanceof Error) {
            // Common error patterns
            if (error.message.includes('connect')) {
                return exports.ERROR_MESSAGES.CONNECTION_FAILED;
            }
            if (error.message.includes('validate') || error.message.includes('invalid')) {
                return exports.ERROR_MESSAGES.NICKNAME_INVALID;
            }
        }
        return `Failed to ${action}`;
    }
    static format(error) {
        if (error instanceof Error) {
            return (0, exports.unknownError)(error.message, error);
        }
        return (0, exports.unknownError)(exports.ERROR_MESSAGES.UNKNOWN_ERROR, error);
    }
}
exports.ServerErrorHandler = ServerErrorHandler;
