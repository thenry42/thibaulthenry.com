import { runHelp } from './help.js';
import { initializeViewport, displayWelcome, clearViewport, displayHtmlFile } from './viewport.js';

export function initializeTerminal() {
    const inputField = document.getElementById("command-input");
    const outputDiv = document.getElementById("output");
    const terminal = document.getElementById("terminal");
    
    // Initialize the viewport
    initializeViewport();
    
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

    function processCommand(command) {
        switch (command.toLowerCase()) {
            case "welcome":
                printOutput("Displaying welcome message...");
                displayHtmlFile("welcome.html", "Welcome", "welcome-content");
                break;
            case "help":
                printOutput(runHelp());
                break;
            case "status":
                printOutput("Displaying status...");
                displayHtmlFile("status.html", "Status", "status-content");
                break;
            case "resume":
                printOutput("Displaying resume...");
                displayHtmlFile("resume.html", "Resume", "resume-content");
                break;
            case "projects":
                printOutput("Displaying projects...");
                displayHtmlFile("projects.html", "Projects", "projects-content");
                break;
            case "skills":
                printOutput("Displaying skills...");
                displayHtmlFile("skills.html", "Skills", "skills-content");
                break;
            case "experiences":
                printOutput("Displaying experiences...");
                displayHtmlFile("experiences.html", "Experiences", "experiences-content");
                break;
            case "education":
                printOutput("Displaying education...");
                displayHtmlFile("education.html", "Education", "education-content");
                break;
            case "about":
                printOutput("Displaying about...");
                displayHtmlFile("about.html", "About", "about-content");
                break;
            case "contact":
                printOutput("Displaying contact information...");
                displayHtmlFile("contact.html", "Contact", "contact-content");
                break;
            case "clear":
                outputDiv.innerHTML = "";
                break;
            case "clear-all":
                outputDiv.innerHTML = "";
                clearViewport();
                break;
            default:
                printOutput("Error: command not found. Type 'help' for a list of available commands.");
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
