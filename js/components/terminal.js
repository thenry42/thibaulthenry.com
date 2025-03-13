import { runHelp } from './help.js';

export function initializeTerminal() {
    const inputField = document.getElementById("command-input");
    const outputDiv = document.getElementById("output");
    const terminal = document.getElementById("terminal");
    
    // Track if we're in selection mode
    let isSelecting = false;

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

    function printOutput(text) {
        const newLine = document.createElement("div");
        // Replace \n with <br> tags for proper HTML line breaks
        newLine.innerHTML = text.replace(/\n/g, '<br>');
        newLine.className = "terminal-line";
        outputDiv.prepend(newLine);
        terminal.scrollTop = terminal.scrollHeight;
    }

    function processCommand(command) {
        switch (command.toLowerCase()) {
            case "help":
                printOutput(runHelp());
                break;
            case "about":
                printOutput("This is a terminal-style website.");
                break;
            case "clear":
                outputDiv.innerHTML = "";
                break;
            default:
                printOutput("Command not found. Type 'help' for a list of commands.");
        }
    }

    inputField.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            const command = inputField.value.trim();
            if (command) {
                printOutput("$> " + command);
                processCommand(command);
            }
            inputField.value = "";
            focusInput(); // Ensure input stays focused after entering command
        }
    });
}
