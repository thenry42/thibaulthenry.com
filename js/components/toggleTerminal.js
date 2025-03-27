/**
 * Terminal visibility toggle functionality
 * Controls showing/hiding the terminal panel and adjusts layout accordingly
 */

const elements = {
    toggleButton: null,
    terminalContainer: null,
    contentWrapper: null
};

export function initializeToggleTerminal() {
    // Initialize DOM elements
    elements.toggleButton = document.getElementById('toggle-terminal');
    elements.terminalContainer = document.getElementById('terminal-container');
    elements.contentWrapper = document.getElementById('content-wrapper');
    
    // Set initial button text
    elements.toggleButton.textContent = 'Hide Terminal';
    
    // Add click event listener
    elements.toggleButton.addEventListener('click', toggleTerminal);
}

export function toggleTerminal() {
    if (isTerminalHidden()) {
        showTerminal();
    } else {
        hideTerminal();
    }
}

export function showTerminal() {
    elements.terminalContainer.style.display = '';
    elements.contentWrapper.style.flex = '4';
    elements.toggleButton.textContent = 'Hide Terminal';
    triggerResize();
}

export function hideTerminal() {
    elements.terminalContainer.style.display = 'none';
    elements.contentWrapper.style.flex = '1';
    elements.toggleButton.textContent = 'Show Terminal';
    triggerResize();
}

export function isTerminalHidden() {
    return elements.terminalContainer.style.display === 'none';
}

function triggerResize() {
    window.dispatchEvent(new Event('resize'));
} 