import { runHelp } from './help.js';
import { clearViewport, displayHtmlFile, loadContentWithoutHistory } from './viewport.js';
import { updateCurrentNavItemDisplay, currentNavItem, navTo } from './navigation.js';
import { addToHistory, getHistory, getHistoryItem } from './commandHistory.js';
import { showTerminal } from './toggleTerminal.js';

// Global variables
let inputField;
let outputDiv;
let terminal;
let isSelecting = false;
let historyPosition = -1; // Current position in command history when navigating
window.processCommand = processCommand;

export function initializeTerminal()
{
    inputField = document.getElementById("command-input");
    outputDiv = document.getElementById("output");
    terminal = document.getElementById("terminal");
    
    // Track if we're in selection mode
    isSelecting = false;

    // Always focus the input field
    function focusInput() {
        // Only focus if we're not selecting text
        if (!isSelecting && window.getSelection().toString() === '') {
            inputField.focus();
        }
    }

    // Focus input on page load
    focusInput();

    // Handle mousedown event to detect start of selection
    outputDiv.addEventListener("mousedown", function(event) {
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

    // Focus input when clicking directly on the terminal (but not on output)
    terminal.addEventListener("click", function(event) {
        // Only focus if we clicked directly on the terminal (not on output or during selection)
        if (event.target === terminal && !isSelecting && window.getSelection().toString() === '') {
            focusInput();
        }
    });

    // Modify blur behavior to respect text selection
    inputField.addEventListener("blur", function() {
        // Only refocus if we're not selecting text
        if (!isSelecting && window.getSelection().toString() === '') {
            // Small delay to prevent focus issues
            setTimeout(focusInput, 100);
        }
    });

    // Handle keydown for special keys like up/down arrows
    inputField.addEventListener("keydown", function(event) {
        const history = getHistory();
        
        // Up arrow - navigate back in history
        if (event.key === "ArrowUp") {
            event.preventDefault();
            
            // If we're already at the last history item, do nothing
            if (historyPosition >= history.length - 1) {
                return;
            }
            
            // Move up in history
            historyPosition++;
            inputField.value = getHistoryItem(historyPosition) || "";
            
            // Move cursor to end of input
            setTimeout(() => {
                inputField.selectionStart = inputField.selectionEnd = inputField.value.length;
            }, 0);
        }
        
        // Down arrow - navigate forward in history
        else if (event.key === "ArrowDown") {
            event.preventDefault();
            
            // If we're at the beginning of history or before, clear input
            if (historyPosition <= 0) {
                historyPosition = -1;
                inputField.value = "";
                return;
            }
            
            // Move down in history
            historyPosition--;
            inputField.value = getHistoryItem(historyPosition) || "";
            
            // Move cursor to end of input
            setTimeout(() => {
                inputField.selectionStart = inputField.selectionEnd = inputField.value.length;
            }, 0);
        }
        
        // Escape - clear input
        else if (event.key === "Escape") {
            event.preventDefault();
            inputField.value = "";
            historyPosition = -1;
        }
    });

    inputField.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            const command = inputField.value.trim();
            if (command) {
                printOutput("> " + command);
                processCommand(command);
                
                // Add to history and reset history position
                addToHistory(command);
                historyPosition = -1;
            }
            inputField.value = "";
            focusInput(); // Ensure input stays focused after entering command
        }
    });
    
    // Add a history command
    window.commandHistory = function() {
        printOutput("Command History:");
        const history = getHistory();
        if (history.length === 0) {
            printOutput("No commands in history.");
        } else {
            printOutput(history.map((cmd, i) => `${i+1}. ${cmd}`).join('\n'));
        }
        return "Command history displayed.";
    };
}

export function printOutput(text) {
    const newLine = document.createElement("div");
    // Replace \n with <br> tags for proper HTML line breaks
    // Replace spaces with &nbsp; to preserve multiple spaces
    newLine.innerHTML = text
        .replace(/\n/g, '<br>')
        .replace(/ {2,}/g, match => '&nbsp;'.repeat(match.length));
    
    // Alternative: use CSS to preserve whitespace
    // newLine.style.whiteSpace = "pre-wrap";
    
    newLine.className = "terminal-line";
    outputDiv.prepend(newLine);
    terminal.scrollTop = terminal.scrollHeight;
}

// Function to simulate typing a command and then executing it
export function simulateCommand(command)
{
    if (inputField) {
        inputField.value = command;
    }
    printOutput("> " + command);
    processCommand(command);
    
    // Add simulated commands to history too
    addToHistory(command);
    historyPosition = -1;
}

export function processCommand(command)
{
    switch (command.toLowerCase()) {
        case "cat welcome":
        case "cd welcome":
        case "welcome":
            printOutput("Displaying welcome message...");
            displayHtmlFile("welcome.html", "welcome-content");
            inputField.value = "";
            break;
        case "ls":
        case "cat help":
        case "man help":
        case "help":
            //showTerminal();
            printOutput(runHelp());
            inputField.value = "";
            break;
        case "cd status":
        case "cat status":
        case "status":
            printOutput("Displaying status...");
            displayHtmlFile("status.html", "status-content");
            inputField.value = "";
            break;
        case "cd projects":
        case "cat projects":
        case "projects":
            printOutput("Displaying projects...");
            displayHtmlFile("projects.html", "projects-content");
            inputField.value = "";
            break;
        case "cd skills":
        case "cat skills":
        case "skills":
            printOutput("Displaying skills...");
            displayHtmlFile("skills.html", "skills-content");
            inputField.value = "";
            break;
        case "cd experiences":
        case "cat experiences":
        case "experiences":
            printOutput("Displaying experiences...");
            displayHtmlFile("experiences.html", "experiences-content");
            inputField.value = "";
            break;
        case "cd education":
        case "cat education":
        case "education":
            printOutput("Displaying education...");
            displayHtmlFile("education.html", "education-content");
            inputField.value = "";
            break;
        case "cd about":
        case "cat about":
        case "about":
            printOutput("Displaying about...");
            displayHtmlFile("about.html", "about-content");
            inputField.value = "";
            break;
        case "cd contact":
        case "cat contact":
        case "contact":
            printOutput("Displaying contact information...");
            displayHtmlFile("contact.html", "contact-content");
            inputField.value = "";
            break;
        case "history":
            window.commandHistory();
            inputField.value = "";
            break;
        case "clear":
            outputDiv.innerHTML = "";
            inputField.value = "";
            break;
        default:
            printOutput("Error: command not found. Type 'help' for a list of available commands.");
            inputField.value = "";
            return;
    }
    if (command.toLowerCase() !== "clear" && command.toLowerCase() !== "help") {
        navTo(command);
    }
}

export function homeButton()
{
    loadContentWithoutHistory("welcome.html", "welcome-content");
    processCommand("clear");
    simulateCommand("help");
}
