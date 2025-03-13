export function initializeTerminal() {
    const inputField = document.getElementById("command-input");
    const outputDiv = document.getElementById("output");

    // Always focus the input field
    function focusInput() {
        inputField.focus();
    }

    // Focus input on page load
    focusInput();

    // Focus input when clicking anywhere in the terminal
    document.getElementById("terminal").addEventListener("click", focusInput);

    // Prevent losing focus when clicking the input or output area
    inputField.addEventListener("blur", function() {
        // Small delay to prevent focus issues
        setTimeout(focusInput, 10);
    });

    function printOutput(text) {
        const newLine = document.createElement("div");
        newLine.textContent = text;
        // Insert at the beginning of the output div (above existing content)
        outputDiv.insertBefore(newLine, outputDiv.firstChild);
    }

    function processCommand(command) {
        switch (command.toLowerCase()) {
            case "help":
                printOutput("Available commands: help, about, clear");
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
