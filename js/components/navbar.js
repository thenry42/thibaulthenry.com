import { displayHtmlFile } from './viewport.js';

// Navigation logic
export let currentNavItem = 0;

let navNextCallCount = 0;
let navPrevCallCount = 0;

// Initialize by showing only the first item
export function initializeNavigation() {
    const navElements = document.querySelectorAll('.nav-tabs .menu-item');
    console.log('Initial order of nav elements:', Array.from(navElements).map(el => el.textContent.trim()));
    navElements.forEach((item, index) => {
        if (index !== currentNavItem) {
            item.style.display = 'none';
        } else {
            item.classList.add('current');
            item.style.display = 'block';
        }
    });
    // Display the initial content
    displayCurrentContent();
}

export function navNext() {
    navNextCallCount++;
    console.log(`navNext called ${navNextCallCount} times`);
    
    const navElements = document.querySelectorAll('.nav-tabs .menu-item');
    console.log('Current nav item before next:', navElements[currentNavItem].textContent.trim());
    navElements[currentNavItem].classList.remove('current');
    navElements[currentNavItem].style.display = 'none';
    
    // Update currentNavItem index
    currentNavItem = (currentNavItem + 1) % navElements.length;
    
    // Display the next item
    navElements[currentNavItem].style.display = 'block';
    navElements[currentNavItem].classList.add('current');
    console.log('Current nav item after next:', navElements[currentNavItem].textContent.trim());
    
    // Display the content for the current item
    displayCurrentContent();
    
    updateNavArrows();
}

export function navPrev() {
    navPrevCallCount++;
    console.log(`navPrev called ${navPrevCallCount} times`);
    
    const navElements = document.querySelectorAll('.nav-tabs .menu-item');
    console.log('Current nav item before prev:', navElements[currentNavItem].textContent.trim());
    navElements[currentNavItem].classList.remove('current');
    navElements[currentNavItem].style.display = 'none';
    
    // Update currentNavItem index
    currentNavItem = (currentNavItem - 1 + navElements.length) % navElements.length;
    
    // Display the previous item
    navElements[currentNavItem].style.display = 'block';
    navElements[currentNavItem].classList.add('current');
    console.log('Current nav item after prev:', navElements[currentNavItem].textContent.trim());
    
    // Display the content for the current item
    displayCurrentContent();
    
    updateNavArrows();
}

export function displayCurrentContent() {
    const navElements = document.querySelectorAll('.nav-tabs .menu-item');
    const currentNavItemName = navElements[currentNavItem].getAttribute('data-name');
    
    // Display the content for the current item
    displayHtmlFile(`${currentNavItemName}.html`, currentNavItemName.charAt(0).toUpperCase() + currentNavItemName.slice(1), `${currentNavItemName}-content`);
    
    // Check if the current content is the status page
    const contentContainer = document.getElementById('content-container');
    if (contentContainer) {
        const statusHeader = contentContainer.querySelector('.status-header h2');
        if (statusHeader && statusHeader.textContent.includes('Current Status')) {
            console.log('This is the status page');
            // Additional logic for the status page can be added here
        }
    }
}

export function updateNavArrows() {
    // Optional: Update arrows appearance based on current position
    document.getElementById('prev-nav').classList.toggle('active', true);
    document.getElementById('next-nav').classList.toggle('active', true);
}

// Run command by simulating typing and pressing Enter
export function runCommand(cmd) {
    const inputField = document.getElementById('command-input');
    inputField.value = cmd;
    inputField.dispatchEvent(new KeyboardEvent('keypress', {'key': 'Enter'}));
}

window.navNext = navNext;
window.navPrev = navPrev;
