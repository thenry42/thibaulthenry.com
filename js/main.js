import { initializeTerminal } from './components/terminal.js';
import { initializeNavigation, navNext, navPrev} from './components/navbar.js';

document.addEventListener('DOMContentLoaded', () => {
    initializeTerminal();
    initializeNavigation();
    document.getElementById('next-nav').addEventListener('click', navNext);
    document.getElementById('prev-nav').addEventListener('click', navPrev);
});

