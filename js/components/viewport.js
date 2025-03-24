import { displayCurrentContent, updateCurrentNavItemDisplay, currentNavItem } from './navigation.js';
import { applyHackEffect } from './hackEffect.js';

// Global variables
let contentContainer;

// Track content navigation history
const contentHistory = [];
let currentHistoryIndex = -1;
const MAX_HISTORY_SIZE = 30; // Maximum size for history

export function initializeViewport()
{
    contentContainer = document.getElementById("content-container");
    setEmptyState();

    // Add content navigation to the global window object
    window.contentHistory = {
        getAll: () => [...contentHistory],
        getCurrentIndex: () => currentHistoryIndex,
        back: navigateBack,
        forward: navigateForward,
        clear: () => {
            contentHistory.length = 0;
            currentHistoryIndex = -1;
            updateNavigationArrows();
        }
    };

    // Set up event listeners for navigation buttons
    const backButton = document.getElementById('content-nav-back');
    const forwardButton = document.getElementById('content-nav-forward');
    
    if (backButton) {
        backButton.addEventListener('click', navigateBack);
    }
    
    if (forwardButton) {
        forwardButton.addEventListener('click', navigateForward);
    }
    
    // Update arrow states initially
    updateNavigationArrows();
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
    const result = loadContentWithoutHistory(fileName, contentId);
    
    // Only add to history if loading was successful
    if (result) {
        addToHistory(fileName, contentId);
    }
    
    return result;
}

export function displayError(message) {
    displayContent(`<p class="error-message">${message}</p>`, "Error", "error-content");
}

export function setEmptyState() {
    loadContentWithoutHistory("welcome.html", "welcome-content");
}

export function clearViewport() {
    const contentContainer = document.getElementById('content-container');
    if (contentContainer) {
        contentContainer.innerHTML = '';
    }
}

async function fetchHtmlContent(filename) {
    const response = await fetch(`./pages/${filename}`);
    if (!response.ok) {
        throw new Error(`Failed to load ${filename} (${response.status})`);
    }
    return await response.text();
}

// Navigate to previous content (older)
function navigateBack() {
    const history = contentHistory;
    
    // If we're already at the last history item, do nothing
    if (currentHistoryIndex >= history.length - 1) {
        return;
    }
    
    // Move to older item in history
    currentHistoryIndex++;
    const item = contentHistory[currentHistoryIndex];
    
    if (item) {
        loadContentWithoutHistory(item.fileName, item.contentId);
        updateNavigationArrows();
    }
}

// Navigate to next content (newer)
function navigateForward() {
    // If we're at the beginning of history or before, do nothing
    if (currentHistoryIndex <= 0) {
        return;
    }
    
    // Move to newer item in history
    currentHistoryIndex--;
    const item = contentHistory[currentHistoryIndex];
    
    if (item) {
        loadContentWithoutHistory(item.fileName, item.contentId);
        updateNavigationArrows();
    }
}

// Update the state of navigation arrows
function updateNavigationArrows() {
    const backArrow = document.getElementById('content-nav-back');
    const forwardArrow = document.getElementById('content-nav-forward');
    
    if (!backArrow || !forwardArrow) return;
    
    // Update back button state (can we go to older entries?)
    if (currentHistoryIndex >= contentHistory.length - 1) {
        backArrow.classList.add('disabled');
    } else {
        backArrow.classList.remove('disabled');
    }
    
    // Update forward button state (can we go to newer entries?)
    if (currentHistoryIndex <= 0) {
        forwardArrow.classList.add('disabled');
    } else {
        forwardArrow.classList.remove('disabled');
    }
}

// Add entry to history
function addToHistory(fileName, contentId) {
    // Don't add duplicates of the most recent item
    if (contentHistory.length > 0 && 
        contentHistory[0].fileName === fileName && 
        contentHistory[0].contentId === contentId) {
        return;
    }
    
    // Add to the beginning of the array (newest first)
    contentHistory.unshift({ fileName, contentId });
    
    // Trim if exceeding max size
    if (contentHistory.length > MAX_HISTORY_SIZE) {
        contentHistory = contentHistory.slice(0, MAX_HISTORY_SIZE);
    }
    
    // Reset current position to beginning of history
    currentHistoryIndex = 0;
    
    // Update arrow states
    updateNavigationArrows();
}

// Load content without adding to history (used for history navigation)
export function loadContentWithoutHistory(fileName, contentId) {
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

// Get history item
function getHistoryItem(index) {
    if (index >= 0 && index < contentHistory.length) {
        return contentHistory[index];
    }
    return null;
}
