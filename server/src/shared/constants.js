"use strict";
// Shared constants used by both client and server
Object.defineProperty(exports, "__esModule", { value: true });
exports.VALIDATION_MESSAGES = exports.SOCKET_RECONNECT_DELAY = exports.SOCKET_RECONNECT_ATTEMPTS = exports.DEFAULT_PORT = exports.MAX_ROLL_HISTORY = exports.MIN_NICKNAME_LENGTH = exports.MAX_NICKNAME_LENGTH = exports.DICE_SIDES = exports.MAX_DICE = exports.MIN_DICE = void 0;
// Dice configuration
exports.MIN_DICE = 1;
exports.MAX_DICE = 10;
exports.DICE_SIDES = 6;
// User configuration
exports.MAX_NICKNAME_LENGTH = 20;
exports.MIN_NICKNAME_LENGTH = 1;
// Room configuration
exports.MAX_ROLL_HISTORY = 50;
// Server configuration
exports.DEFAULT_PORT = 3001;
// Client configuration
exports.SOCKET_RECONNECT_ATTEMPTS = 5;
exports.SOCKET_RECONNECT_DELAY = 1000;
// Validation messages
exports.VALIDATION_MESSAGES = {
    NICKNAME_TOO_SHORT: 'Nickname must be at least 1 character',
    NICKNAME_TOO_LONG: `Nickname must be less than ${exports.MAX_NICKNAME_LENGTH} characters`,
    INVALID_DICE_COUNT: `Dice count must be between ${exports.MIN_DICE} and ${exports.MAX_DICE}`,
};
