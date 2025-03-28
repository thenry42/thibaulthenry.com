// global variables
const MAX_HISTORY_SIZE = 100;
let commandHistory = [];

// Add a command to history
export function addToHistory(command) {
    // Don't add empty commands or duplicates of the last command
    if (!command || (commandHistory.length > 0 && commandHistory[0] === command)) {
        return;
    }
    
    commandHistory.unshift(command);
    
    if (commandHistory.length > MAX_HISTORY_SIZE) {
        commandHistory = commandHistory.slice(0, MAX_HISTORY_SIZE);
    }
}

// Get the full command history
export function getHistory() {
    return [...commandHistory]; // Return a copy to prevent external modification
}

// Get a specific command from history by index
export function getHistoryItem(index) {
    if (index >= 0 && index < commandHistory.length) {
        return commandHistory[index];
    }
    return null;
}

// Clear command history
export function clearHistory() {
    commandHistory = [];
}

// Initialize command history
export function initCommandHistory() {
    // Make history accessible globally for debugging
    window.terminalHistory = {
        get: getHistory,
        clear: clearHistory
    };
}
