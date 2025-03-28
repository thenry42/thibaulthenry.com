import { initTabs } from './components/tab.js';
import { initializeTerminal, simulateCommand } from './components/terminal.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize tab switching
    initTabs();
    
    // Initialize terminal
    initializeTerminal();
    
    // When switching to terminal tab, focus the input
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            if (tab.getAttribute('data-tab') === 'terminal') {
                document.getElementById('command-input').focus();
            }
        });
    });
    
    // Show help command on load
    simulateCommand('help');
});