function initTabs()
{
    const tabs = document.querySelectorAll('.tab');
    
    // Add click event listeners to each tab
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Get the tab's data-tab attribute
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get all tab panes
            const tabPanes = document.querySelectorAll('.tab-pane');
            
            // Hide all tab panes and remove active class
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
                pane.style.display = 'none'; // Hide inactive panes
            });
            
            // Show and activate corresponding tab pane
            const activePane = document.querySelector(`.tab-pane[data-tab="${tabId}"]`);
            if (activePane) {
                activePane.classList.add('active');
                activePane.style.display = 'block'; // Show active pane
            }

            // Dispatch custom event for tab change
            const tabChangeEvent = new CustomEvent('tabChanged', {
                detail: {
                    tabId: tabId,
                    isTerminal: tabId === 'terminal'
                }
            });
            document.dispatchEvent(tabChangeEvent);
        });
    });

    // Initialize all tab panes to be hidden except the active one
    const allPanes = document.querySelectorAll('.tab-pane');
    allPanes.forEach(pane => {
        if (pane.classList.contains('active')) {
            pane.style.display = 'block';
        } else {
            pane.style.display = 'none';
        }
    });
}

function switchTab(tabId)
{
    const tab = document.querySelector(`.tab[data-tab="${tabId}"]`);
    if (tab) {
        tab.click();
    }
}

// New function to check if a specific tab is active
function isTabActive(tabId) {
    const tab = document.querySelector(`.tab[data-tab="${tabId}"]`);
    return tab && tab.classList.contains('active');
}

export { initTabs, switchTab, isTabActive };