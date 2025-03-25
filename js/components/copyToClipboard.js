/**
 * Copy to clipboard functionality for the contact page
 * Uses CSS classes for styling rather than inline styles
 */

export function initializeCopyToClipboard() {
    // Only target contact page elements
    const copyableSelector = '.contact-value';
    
    // Track which elements have been copied and are waiting for mouse movement
    const copiedElements = new Set();
    
    // Add click event listener to all contact value elements
    document.addEventListener('click', (event) => {
        // Check if clicked element is a contact value or contains one
        const contactValue = event.target.closest(copyableSelector);
        
        if (contactValue) {
            // If clicking on a link, don't interfere with navigation
            if (event.target.tagName === 'A') {
                return;
            }
            
            // Prevent the default action
            event.preventDefault();
            
            // Get the text content to copy
            let textToCopy = contactValue.textContent.trim();
            
            // If it contains a link, let's prioritize the link's href for URLs
            const link = contactValue.querySelector('a');
            if (link) {
                textToCopy = link.href;
            }
            
            if (textToCopy) {
                // Add to set of copied elements
                copiedElements.add(contactValue);
                
                // Add classes to track the copying state
                contactValue.classList.add('copying');
                contactValue.classList.add('copied');
                
                // Copy text to clipboard
                navigator.clipboard.writeText(textToCopy)
                    .then(() => {
                        // Display copy confirmation tooltip
                        showCopyTooltip(contactValue, 'Copied!');
                        
                        // Remove copied class after animation
                        setTimeout(() => {
                            contactValue.classList.remove('copied');
                            
                            // Note: We don't remove the 'copying' class here anymore
                            // It will be removed on mousemove instead
                        }, 300);
                    })
                    .catch(err => {
                        console.error('Failed to copy text: ', err);
                        showCopyTooltip(contactValue, 'Copy failed');
                        
                        // Remove copied class after error
                        setTimeout(() => {
                            contactValue.classList.remove('copied');
                            copiedElements.delete(contactValue);
                        }, 2000);
                    });
            }
        }
    });
    
    // Add mousemove listener to document to detect when user moves mouse
    document.addEventListener('mousemove', (event) => {
        // Check if we have any elements waiting for mouse movement
        if (copiedElements.size > 0) {
            // For each copied element, check if the mouse has moved away from it
            for (const element of copiedElements) {
                const rect = element.getBoundingClientRect();
                
                // Get mouse position
                const mouseX = event.clientX;
                const mouseY = event.clientY;
                
                // Check if mouse is outside or far from the element
                const isOutside = 
                    mouseX < rect.left - 20 || 
                    mouseX > rect.right + 20 || 
                    mouseY < rect.top - 20 || 
                    mouseY > rect.bottom + 20;
                
                if (isOutside) {
                    // Remove copying class and remove from set
                    element.classList.remove('copying');
                    copiedElements.delete(element);
                }
            }
        }
    });
    
    // Function to show tooltip with copy confirmation
    function showCopyTooltip(element, message) {
        // Remove any existing tooltips
        const existingTooltip = element.querySelector('.copy-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
        
        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'copy-tooltip';
        tooltip.textContent = message;
        
        // Add tooltip to element
        element.appendChild(tooltip);
        
        // Show tooltip
        setTimeout(() => {
            tooltip.classList.add('visible');
            
            // Hide and remove tooltip after delay
            setTimeout(() => {
                tooltip.classList.remove('visible');
                setTimeout(() => tooltip.remove(), 200);
            }, 1500);
        }, 10);
    }
} 