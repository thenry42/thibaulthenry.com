import { initializeTerminal, homeButton, simulateCommand } from './components/terminal.js';
import { initializeNavigation, navNext, navPrev} from './components/navigation.js';
import { initializeViewport } from './components/viewport.js';

document.addEventListener('DOMContentLoaded', () => {

    window.homeButton = homeButton;
    window.simulateCommand = simulateCommand;

    initializeTerminal();
    initializeNavigation();
    initializeViewport();

    document.getElementById('next-nav').addEventListener('click', navNext);
    document.getElementById('prev-nav').addEventListener('click', navPrev);
});

