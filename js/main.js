import { initializeTerminal, homeButton, simulateCommand } from './components/terminal.js';
import { initializeNavigation, navNext, navPrev, runCommand } from './components/navigation.js';
import { initializeViewport } from './components/viewport.js';
import { initHackEffect } from './components/hackEffect.js';
import { initCommandHistory } from './components/commandHistory.js';

document.addEventListener('DOMContentLoaded', () => {
    window.homeButton = homeButton;
    window.simulateCommand = simulateCommand;
    window.runCommand = runCommand;

    initializeTerminal();
    initializeNavigation();
    initializeViewport();
    initHackEffect();
    initCommandHistory();

    document.getElementById('next-nav').addEventListener('click', navNext);
    document.getElementById('prev-nav').addEventListener('click', navPrev);
});

