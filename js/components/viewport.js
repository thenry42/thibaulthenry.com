/**
 * Viewport module
 * Handles displaying content in the right panel of the application
 */

// Store reference to content container
let contentContainer;

/**
 * Initialize the viewport
 */
export function initializeViewport() {
    contentContainer = document.getElementById("content-container");
    
    // Initial empty state
    setEmptyState();
}

/**
 * Display content in the right panel
 * @param {string} content - HTML content to display
 * @param {string} title - Optional title for the content box
 * @param {string} customClass - Optional custom CSS class for styling specific content types
 */
export function displayContent(content, title = "", customClass = "") {
    // Clear existing content
    contentContainer.innerHTML = "";
    
    // Create a container for the content
    const container = document.createElement("div");
    container.className = `content-box ${customClass}`.trim();
    
    // Add title if provided
    if (title) {
        const titleElement = document.createElement("h2");
        titleElement.textContent = title;
        container.appendChild(titleElement);
    }
    
    // Add content
    const contentElement = document.createElement("div");
    contentElement.className = "content-body";
    
    // Process links first, then apply the same whitespace logic as terminal.js
    const processedContent = processTextLinks(content);
    contentElement.innerHTML = processedContent
        .replace(/\n/g, '<br>')
        .replace(/ {2,}/g, match => '&nbsp;'.repeat(match.length));
    
    container.appendChild(contentElement);
    
    // Add to right panel
    contentContainer.appendChild(container);
}

/**
 * Load text content from file and display it
 * @param {string} filename - File to load from assets/texts directory
 * @param {string} title - Title for the content
 * @param {string} customClass - Optional custom CSS class
 */
export async function displayTextFile(filename, title = "", customClass = "") {
    try {
        const content = await fetchTextContent(filename);
        displayContent(content, title, customClass);
        return true;
    } catch (error) {
        displayError(`Failed to load ${filename}: ${error.message}`);
        return false;
    }
}

/**
 * Display welcome message
 */
export async function displayWelcome() {
    await displayTextFile("welcome.txt", "Welcome", "welcome-content");
}

/**
 * Display error message in the viewport
 * @param {string} message - Error message to display
 */
export function displayError(message) {
    displayContent(`<p class="error-message">${message}</p>`, "Error", "error-content");
}

/**
 * Set the viewport to display welcome message as the default state
 */
export function setEmptyState() {
    // Immediately display welcome message instead of empty instructions
    displayWelcome();
}

/**
 * Clear the viewport content
 */
export function clearViewport() {
    contentContainer.innerHTML = "";
}

/**
 * Fetch text content from file
 * @param {string} filename - File to load from assets/texts directory
 * @returns {Promise<string>} - File content
 */
async function fetchTextContent(filename) {
    const response = await fetch(`assets/texts/${filename}`);
    if (!response.ok) {
        throw new Error(`Failed to load ${filename} (${response.status})`);
    }
    return await response.text();
}

function processTextLinks(text) {
    // Convert [link text](http://example.com) syntax to actual HTML links
    return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
}
