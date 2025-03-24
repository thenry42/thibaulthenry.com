/**
 * Terminal visibility toggle functionality
 * Controls showing/hiding the terminal panel and adjusts layout accordingly
 */

export function initializeToggleTerminal() {
    const toggleButton = document.getElementById('toggle-terminal');
    const terminalContainer = document.getElementById('terminal-container');
    const contentWrapper = document.getElementById('content-wrapper');
    
    // Set initial button text based on terminal visibility
    // (Assuming terminal is visible by default)
    toggleButton.textContent = 'Hide Terminal';
    
    toggleButton.addEventListener('click', function() {
        // Toggle visibility and update button text
        if (terminalContainer.style.display === 'none') {
            terminalContainer.style.display = '';
            contentWrapper.style.flex = '4'; // Restore original flex value
            toggleButton.textContent = 'Hide Terminal';
        } else {
            terminalContainer.style.display = 'none';
            contentWrapper.style.flex = '1'; // Take full width
            toggleButton.textContent = 'Show Terminal';
        }
        
        // Trigger a window resize event to help any responsive elements adjust
        window.dispatchEvent(new Event('resize'));
    });
} 