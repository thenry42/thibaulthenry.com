// Projects filtering functionality
export function initializeProjects(retryCount = 0, maxRetries = 10) {
    // Check if we've exceeded maximum retries
    if (retryCount >= maxRetries) {
        console.warn(`Failed to initialize projects after ${maxRetries} attempts`);
        return;
    }
    
    // Wait for content to be loaded
    setTimeout(() => {
        const categoryBtns = document.querySelectorAll('.category-btn');
        const projectCards = document.querySelectorAll('.project-card');
        
        if (!categoryBtns.length || !projectCards.length) {
            console.log(`Projects elements not found, retry in 100ms (attempt ${retryCount + 1}/${maxRetries})`);
            setTimeout(() => initializeProjects(retryCount + 1, maxRetries), 100);
            return;
        }
        
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-category');
                
                // Update active button
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (category === 'all' || card.getAttribute('data-category') === category) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                // Show/hide section headers based on selection
                const personalSection = document.getElementById('personal-projects');
                const school42Section = document.getElementById('42-projects');
                
                if (category === 'all') {
                    personalSection.style.display = 'block';
                    school42Section.style.display = 'block';
                } else if (category === 'personal') {
                    personalSection.style.display = 'block';
                    school42Section.style.display = 'none';
                } else if (category === '42') {
                    personalSection.style.display = 'none';
                    school42Section.style.display = 'block';
                }
            });
        });
        
        console.log('Projects filtering initialized');
    }, 50); // Reduced initial timeout for better performance
}
