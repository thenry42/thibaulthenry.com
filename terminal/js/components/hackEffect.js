// Global variables
// Character set for the hack effect
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>/?";

// Global configuration for hack effect (exposed for easy adjustment)
export const hackConfig = {
    // Time between updates in milliseconds (lower = faster)
    speed: 20,
    
    // Base intensity (lower = faster reveal)
    intensity: 2,
    
    // Character reveal rate multipliers based on text length
    revealRate: {
        veryLong: 6,    // For text > 100 chars
        long: 2.5,      // For text > 50 chars
        medium: 2,      // For text > 20 chars
        short: 1.5      // For text <= 20 chars
    },
    
    // Delay before applying effect (ms)
    applyDelay: 50
};

// Apply hack effect to an element
export function applyHackEffect(element, customSpeed, customIntensity) {
    if (!element) return;
    
    // Use custom values or defaults from config
    const speed = customSpeed !== undefined ? customSpeed : hackConfig.speed;
    const intensity = customIntensity !== undefined ? customIntensity : hackConfig.intensity;
    
    // Store original content for each text node
    const textNodes = getAllTextNodes(element);
    
    textNodes.forEach(node => {
        // Skip empty text nodes
        if (!node.nodeValue.trim()) return;
        
        // Create a wrapper span for the text node
        const span = document.createElement('span');
        span.dataset.originalText = node.nodeValue;
        
        // Replace the text node with our span
        node.parentNode.replaceChild(span, node);
        
        // Start the effect
        startHackEffect(span, speed, intensity);
    });
}

// Get all text nodes within an element recursively
function getAllTextNodes(element) {
    const textNodes = [];
    
    function getTextNodes(node) {
        if (node.nodeType === 3) { // Text node
            textNodes.push(node);
        } else if (node.nodeType === 1) { // Element node
            // Skip script and style elements
            if (node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
                for (let i = 0; i < node.childNodes.length; i++) {
                    getTextNodes(node.childNodes[i]);
                }
            }
        }
    }
    
    getTextNodes(element);
    return textNodes;
}

// Start the hack effect on a specific text element
function startHackEffect(element, speed, intensity) {
    const originalText = element.dataset.originalText;
    let iteration = 0;
    
    // Determine the reveal rate based on text length
    let revealRate;
    if (originalText.length > 100) {
        revealRate = hackConfig.revealRate.veryLong;
    } else if (originalText.length > 50) {
        revealRate = hackConfig.revealRate.long;
    } else if (originalText.length > 20) {
        revealRate = hackConfig.revealRate.medium;
    } else {
        revealRate = hackConfig.revealRate.short;
    }
    
    // Start revealing characters gradually
    const interval = setInterval(() => {
        // Generate scrambled text
        element.textContent = originalText
            .split('')
            .map((char, index) => {
                // If this character should be revealed already
                if (index < iteration) {
                    return originalText[index];
                }
                
                // Skip spaces and preserve them
                if (char === ' ') {
                    return ' ';
                }
                
                // Return a random character
                return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('');
        
        // When we've revealed all characters, clear the interval
        if (iteration >= originalText.length) {
            clearInterval(interval);
        }
        
        // Increase iteration based on intensity and reveal rate
        iteration += revealRate / intensity;
    }, speed);
}

// Apply hack effect to all content loaded in the viewport
export function initHackEffect() {
    // Make hackConfig available globally for easy adjustment
    window.hackConfig = hackConfig;
    
    // Set up a MutationObserver to watch for content changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // Element node
                        setTimeout(() => {
                            applyHackEffect(node);
                        }, hackConfig.applyDelay);
                    }
                });
            }
        });
    });
    
    // Start observing the content container
    const contentContainer = document.getElementById('content-container');
    if (contentContainer) {
        observer.observe(contentContainer, { childList: true, subtree: true });
    }
}

// Function to update hack effect config (can be called from console)
export function updateHackConfig(newConfig) {
    Object.assign(hackConfig, newConfig);
    console.log('Hack effect config updated:', hackConfig);
}

// Also expose this function globally
window.updateHackConfig = updateHackConfig;