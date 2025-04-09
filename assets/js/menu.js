// Menu Page Specific JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Quick view functionality - DISABLED
    // setupQuickView();
    
    // Categories filtering
    setupCategoryFiltering();
    
    // Menu search functionality
    setupMenuSearch();
    
    // Animation on scroll
    setupScrollAnimation();
});

function setupQuickView() {
    // Quick view functionality has been disabled
    // This function is kept as a placeholder but does nothing
    console.log("Quick view functionality has been disabled");
}

function setupCategoryFiltering() {
    const menuItems = document.querySelectorAll('.menu-item');
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            menuItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function setupMenuSearch() {
    const menuSearch = document.querySelector('.menu-search-input');
    const menuItems = document.querySelectorAll('.menu-item');
    
    if (menuSearch) {
        menuSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                // If search is empty, reset to current category filter
                const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
                menuItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    if (activeCategory === 'all' || itemCategory === activeCategory) {
                        item.style.display = 'block';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    } else {
                        item.style.display = 'none';
                    }
                });
            } else {
                menuItems.forEach(item => {
                    const title = item.querySelector('h3').textContent.toLowerCase();
                    const description = item.querySelector('p').textContent.toLowerCase();
                    
                    if (title.includes(searchTerm) || description.includes(searchTerm)) {
                        item.style.display = 'block';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            }
        });
    }
}

function setupScrollAnimation() {
    const animateOnScroll = document.querySelectorAll('.animate-on-scroll');
    
    const checkScroll = () => {
        animateOnScroll.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.8) {
                element.classList.add('animate-fade-in');
            }
        });
    };
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
}
