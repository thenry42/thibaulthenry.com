/**
 * Terminal implementation for portfolio website
 */
import { switchTab } from './tab.js';

// Available commands and their descriptions
const COMMANDS = {
    'help': 'Display available commands',
    'about': 'Show information about me',
    'contact': 'Display contact information',
    'projects': 'List my projects',
    'skills': 'Show my technical skills',
    'education': 'Display my educational background',
    'experiences': 'Show my work experience',
    'clear': 'Clear the terminal output',
};

let isSelecting = false;
let terminal = null;
let output = null;
let commandInput = null;

// Initialize the terminal functionality
export function initializeTerminal() {
    terminal = document.getElementById('terminal');
    output = document.getElementById('output');
    commandInput = document.getElementById('command-input');

    if (!terminal || !output || !commandInput) {
        console.error('Terminal elements not found!');
        return;
    }

    // Set up input handler
    commandInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const command = commandInput.value.trim().toLowerCase();
            handleCommand(command);
            commandInput.value = '';
            
            // Prevent default to avoid unwanted form submission
            event.preventDefault();
        }
    });

    // Keep focus on input when clicking anywhere in the terminal
    terminal.addEventListener('click', () => {
        commandInput.focus();
    });

    // Handle mousedown event to detect start of selection
    output.addEventListener("mousedown", function(event) {
        isSelecting = true;
    });

    // Handle mouseup event to detect end of selection
    document.addEventListener("mouseup", function(event) {
        // Short delay before allowing focus to return to input
        setTimeout(() => {
            isSelecting = false;
            // Only refocus if no text is selected 
            if (window.getSelection().toString() === '') {
                focusInput();
            }
        }, 100);
    });

    commandInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            const command = commandInput.value.trim();
            if (command) {
                printOutput("thibault@portfolio:~$ " + command);
                processCommand(command);
            }
            commandInput.value = "";
            focusInput(); // Ensure input stays focused after entering command
        }
    });
    
    // Welcome message
    printToTerminal(`Welcome to Thibault's portfolio terminal!
Type 'help' to see available commands.`);
}

// Handle a terminal command
function handleCommand(command) {
    // Echo the command
    printToTerminal(`<span class="prompt">$></span> ${command}`, false);
    
    // Skip empty commands
    if (!command) return;
    
    // Process the command
    switch (command) {
        case 'help':
            showHelp();
            break;
        case 'clear':
            clearTerminal();
            break;
        case 'about':
        case 'contact':
        case 'projects':
        case 'skills':
        case 'education':
        case 'experiences':
            navigateToTab(command);
            printToTerminal(`Navigating to ${command} tab...`);
            break;
        default:
            printToTerminal(`Command not found: ${command}. Type 'help' to see available commands.`);
    }
}

// Display help information
function showHelp() {
    let helpText = 'Available commands:\n\n';
    
    for (const [cmd, desc] of Object.entries(COMMANDS)) {
        helpText += `${cmd.padEnd(12)} - ${desc}\n`;
    }
    
    printToTerminal(helpText);
}

// Print text to the terminal
function printToTerminal(text, isOutput = true) {
    const output = document.getElementById('output');
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = text;
    
    // Add the new line at the top for a more natural scrolling experience
    output.insertBefore(line, output.firstChild);
   
    output.prepend(line);

    // Ensure scroll position is at the bottom
    output.scrollTop = output.scrollHeight;
    terminal.scrollTop = terminal.scrollHeight;
}

// Clear the terminal
function clearTerminal() {
    const output = document.getElementById('output');
    output.innerHTML = '';
}

// Navigate to a specific tab using the existing switchTab function
function navigateToTab(tabName) {
    switchTab(tabName);
}

// Public function to simulate a command (can be called from other scripts)
export function simulateCommand(command) {
    const commandInput = document.getElementById('command-input');
    if (commandInput) {
        commandInput.value = command;
        handleCommand(command);
        commandInput.value = '';
    }
}

// Process a command
export function processCommand(command) {
    // Echo the command
    printToTerminal(`<span class="prompt">thibault@portfolio:~$</span> ${command}`, false);
}

export function focusInput() {
    // Only focus if we're not selecting text
    if (!isSelecting && window.getSelection().toString() === '') {
        commandInput.focus();
    }
}
