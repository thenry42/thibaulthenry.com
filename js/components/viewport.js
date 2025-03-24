import { displayCurrentContent, updateCurrentNavItemDisplay, currentNavItem } from './navigation.js';
import { applyHackEffect } from './hackEffect.js';

// Global variables
let contentContainer;

export function initializeViewport()
{
    contentContainer = document.getElementById("content-container");
    setEmptyState();
}

export function displayContent(content, customClass = "") {
    // Clear existing content
    contentContainer.innerHTML = "";
    
    // Create a container for the content
    const container = document.createElement("div");
    container.className = `content-box ${customClass}`.trim();
    
    // Add content
    const contentElement = document.createElement("div");
    contentElement.className = "content-body";
    
    // Set HTML content directly - no text processing needed
    contentElement.innerHTML = content;
    
    container.appendChild(contentElement);
    contentContainer.appendChild(container);
}

export function displayHtmlFile(fileName, contentId) {
    const contentContainer = document.getElementById('content-container');
    if (!contentContainer) return false;
    
    fetch(`pages/${fileName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${fileName}: ${response.status} ${response.statusText}`);
            }
            return response.text();
        })
        .then(html => {
            contentContainer.innerHTML = html;
            
            // Apply hack effect to the newly loaded content
            setTimeout(() => {
                const contentElement = contentContainer.querySelector(`.${contentId}`) || contentContainer;
                applyHackEffect(contentElement);
            }, 50); // Short delay to ensure DOM is updated
        })
        .catch(error => {
            console.error('Error loading content:', error);
            contentContainer.innerHTML = `<div class="error">Error loading content: ${error.message}</div>`;
        });
    
    return true;
}

export function displayError(message) {
    displayContent(`<p class="error-message">${message}</p>`, "Error", "error-content");
}

export function setEmptyState() {
    displayHtmlFile("welcome.html", "welcome-content");
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
