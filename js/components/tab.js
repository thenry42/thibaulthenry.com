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
            
            // Remove active class from all tab panes
            tabPanes.forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Add active class to corresponding tab pane
            const activePane = document.querySelector(`.tab-pane[data-tab="${tabId}"]`);
            if (activePane) {
                activePane.classList.add('active');
            }
        });
    });
}

function switchTab(tabId)
{
    const tab = document.querySelector(`.tab[data-tab="${tabId}"]`);
    if (tab) {
        tab.click();
    }
}

export { initTabs, switchTab };