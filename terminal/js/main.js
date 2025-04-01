import { initializeTerminal, homeButton, simulateCommand } from './components/terminal.js';
import { initializeNavigation, navNext, navPrev, runCommand } from './components/navigation.js';
import { initializeViewport } from './components/viewport.js';
import { initHackEffect } from './components/hackEffect.js';
import { initCommandHistory } from './components/commandHistory.js';
import { initializeToggleTerminal } from './components/toggleTerminal.js';
import { initializeProjects } from './components/projects.js';
import { initializeCopyToClipboard } from './components/copyToClipboard.js';

document.addEventListener('DOMContentLoaded', () => {
    window.homeButton = homeButton;
    window.simulateCommand = simulateCommand;
    window.runCommand = runCommand;

    initializeTerminal();
    initializeNavigation();
    initializeViewport();
    initHackEffect();
    initCommandHistory();
    //initializeToggleTerminal(); // Initialize the toggle terminal functionality
    
    // Initialize projects filtering when viewing projects
    document.getElementById('next-nav').addEventListener('click', checkForProjects);
    document.getElementById('prev-nav').addEventListener('click', checkForProjects);
    
    // Also initialize when clicking on menu items or using terminal commands
    const observer = new MutationObserver(() => {
        checkForProjects();
    });
    
    // Start observing the content container for changes
    const contentContainer = document.getElementById('content-container');
    if (contentContainer) {
        observer.observe(contentContainer, { childList: true });
    }

    initializeCopyToClipboard();
});

// Check if projects page is loaded and initialize if it is
function checkForProjects() {
    setTimeout(() => {
        if (document.querySelector('.projects-container')) {
            initializeProjects();
        }
    }, 100);
}

