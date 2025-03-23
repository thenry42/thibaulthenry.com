import { displayCurrentContent, updateCurrentNavItemDisplay, currentNavItem } from './navigation.js';

// Global variables
let contentContainer;

export function initializeViewport()
{
    contentContainer = document.getElementById("content-container");
    setEmptyState();
}

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
    
    // Set HTML content directly - no text processing needed
    contentElement.innerHTML = content;
    
    container.appendChild(contentElement);
    contentContainer.appendChild(container);
}

export async function displayHtmlFile(filename, title = "", customClass = "") {
    try {
        const content = await fetchHtmlContent(filename);
        displayContent(content, title, customClass);
        console.log('Displaying HTML file:', filename);
        return true;
    } catch (error) {
        displayError(`Failed to load ${filename}: ${error.message}`);
        return false;
    }
}

export function displayError(message) {
    displayContent(`<p class="error-message">${message}</p>`, "Error", "error-content");
}

export function setEmptyState() {
    displayHtmlFile("welcome.html", "", "welcome-content");
}

export function clearViewport() {
    contentContainer.innerHTML = "";
}

async function fetchHtmlContent(filename) {
    const response = await fetch(`./pages/${filename}`);
    if (!response.ok) {
        throw new Error(`Failed to load ${filename} (${response.status})`);
    }
    return await response.text();
}
