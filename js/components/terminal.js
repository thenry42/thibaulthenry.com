import { runHelp } from './help.js';
import { clearViewport, displayHtmlFile } from './viewport.js';
import { updateCurrentNavItemDisplay, currentNavItem, navTo } from './navigation.js';

// Global variables
let inputField;
let outputDiv;
let terminal;
let isSelecting = false;
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

export function processCommand(command)
{
    switch (command.toLowerCase()) {
        case "welcome":
            printOutput("Displaying welcome message...");
            displayHtmlFile("welcome.html", "", "welcome-content");
            break;
        case "help":
            printOutput(runHelp());
            inputField.value = "";
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
            inputField.value = "";
            break;
        default:
            printOutput("Error: command not found. Type 'help' for a list of available commands.");
            inputField.value = "";
    }
    navTo(command);
}
