import { displayHtmlFile } from './viewport.js';

// Global variables
export let currentNavItem = 0;
window.navNext = navNext;
window.navPrev = navPrev;

export const navElements = [
    { index: 0, title: 'welcome' },
    { index: 1, title: 'status' },
    { index: 2, title: 'resume' },
    { index: 3, title: 'projects' },
    { index: 4, title: 'skills' },
    { index: 5, title: 'experiences' },
    { index: 6, title: 'education' },
    { index: 7, title: 'about' },
    { index: 8, title: 'contact' }
];

// Add this new function to set up the menu items
export function setupMenuItems() {
    const navTabsContainer = document.querySelector('.nav-tabs');
    
    // Clear existing content
    navTabsContainer.innerHTML = '';
    
    // Add menu items based on navElements array
    navElements.forEach(element => {
        const menuItem = document.createElement('a');
        menuItem.href = 'javascript:void(0)';
        menuItem.className = 'menu-item';
        menuItem.setAttribute('data-name', element.title);
        menuItem.textContent = element.title;
        menuItem.onclick = function() {
            // Set currentNavItem to this element's index
            currentNavItem = element.index;
            
            // Update display
            updateCurrentNavItemDisplay();
            
            // Display the content
            displayCurrentContent();
        };
        
        // Initially hide all except the current one
        if (element.index !== currentNavItem) {
            menuItem.style.display = 'none';
        } else {
            menuItem.classList.add('current');
        }
        
        navTabsContainer.appendChild(menuItem);
    });
}

// Helper function to update the display of the current nav item
export function updateCurrentNavItemDisplay() {
    const menuItems = document.querySelectorAll('.nav-tabs .menu-item');
    
    // Hide all items
    menuItems.forEach(item => {
        item.classList.remove('current');
        item.style.display = 'none';
    });
    
    // Show only current item
    menuItems[currentNavItem].classList.add('current');
    menuItems[currentNavItem].style.display = 'block';
}

// Update initializeNavigation function to use our new setupMenuItems function
export function initializeNavigation() {
    // Set up the menu items first
    setupMenuItems();
    
    // Display the content for the current nav item
    displayCurrentContent();
    
    // Set up event listeners for the navigation arrows
    document.getElementById('prev-nav').addEventListener('click', navPrev);
    document.getElementById('next-nav').addEventListener('click', navNext);
    
    console.log('Navigation initialized with items:', navElements.map(el => el.title));
}

export function navNext() {
    // Update currentNavItem index
    currentNavItem = (currentNavItem + 1) % navElements.length;
    
    updateCurrentNavItemDisplay();
    displayCurrentContent();
    runCommand(navElements[currentNavItem].title);
}

export function navPrev() {
    // Update currentNavItem index
    currentNavItem = (currentNavItem - 1 + navElements.length) % navElements.length;
    
    updateCurrentNavItemDisplay();
    displayCurrentContent();
    runCommand(navElements[currentNavItem].title);
}

export function navTo(command) {
    currentNavItem = navElements.find(item => item.title.toLowerCase() === command.toLowerCase()).index;
    updateCurrentNavItemDisplay();
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

// Run command by simulating typing and pressing Enter
export function runCommand(cmd) {
    const inputField = document.getElementById('command-input');
    inputField.value = cmd;
    inputField.dispatchEvent(new KeyboardEvent('keypress', {'key': 'Enter'}));
}
