import { initTabs, switchTab, isTabActive } from './components/tab.js';

window.initTabs = initTabs;
window.switchTab = switchTab;
window.isTabActive = isTabActive;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize tab switching
    initTabs();
});