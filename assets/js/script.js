// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const hamburger = document.querySelector('.hamburger');
            const navLinks = document.querySelector('.nav-links');
            if (hamburger && hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        }
    });
});

// Menu Filtering and Search
const menuItems = document.querySelectorAll('.menu-item');
const categoryButtons = document.querySelectorAll('.category-btn');
const menuSearch = document.querySelector('.menu-search-input');

// Category filtering
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

// Search functionality
if (menuSearch) {
    menuSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        menuItems.forEach(item => {
            const title = item.querySelector('h3').textContent.toLowerCase();
            const description = item.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
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
}

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Newsletter Subscription
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });
}

// Header Scroll Effect
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Initialize notification system
function showNotification(message, type = 'success') {
    const notification = document.querySelector('.notification');
    if (!notification) return;
    
    notification.textContent = message;
    notification.className = 'notification';
    notification.classList.add(type, 'show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Testimonials Carousel
const testimonials = document.querySelectorAll('.testimonial');
const prevTestimonial = document.querySelector('.prev-testimonial');
const nextTestimonial = document.querySelector('.next-testimonial');
let currentTestimonialIndex = 0;

function showTestimonial(index) {
    testimonials.forEach(testimonial => {
        testimonial.style.display = 'none';
        testimonial.classList.remove('active');
    });
    
    testimonials[index].style.display = 'block';
    testimonials[index].classList.add('active');
}

if (testimonials.length > 0 && prevTestimonial && nextTestimonial) {
    // Show first testimonial
    showTestimonial(0);
    
    // Previous button click
    prevTestimonial.addEventListener('click', () => {
        currentTestimonialIndex = (currentTestimonialIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonialIndex);
    });

    // Next button click
    nextTestimonial.addEventListener('click', () => {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
        showTestimonial(currentTestimonialIndex);
    });

    // Auto-advance testimonials
    let testimonialInterval = setInterval(() => {
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
        showTestimonial(currentTestimonialIndex);
    }, 5000);

    // Pause auto-advance on hover
    testimonials.forEach(testimonial => {
        testimonial.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonial.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(() => {
                currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
                showTestimonial(currentTestimonialIndex);
            }, 5000);
        });
    });
}

// Quick View Modal
const quickViewModal = document.querySelector('.quick-view-modal');
const quickViewContent = document.querySelector('.quick-view-content');
const closeQuickView = document.querySelector('.close-quick-view');

document.querySelectorAll('.quick-view-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const menuItem = e.target.closest('.menu-item');
        const itemName = menuItem.querySelector('h3').textContent;
        const itemDescription = menuItem.querySelector('p').textContent;
        const itemPrice = menuItem.querySelector('.price').textContent;
        const itemImage = menuItem.querySelector('img').src;
        
        quickViewContent.innerHTML = `
            <button class="close-quick-view">×</button>
            <div class="quick-view-image">
                <img src="${itemImage}" alt="${itemName}">
            </div>
            <div class="quick-view-info">
                <h3>${itemName}</h3>
                <p>${itemDescription}</p>
                <div class="quick-view-price">${itemPrice}</div>
            </div>
        `;
        
        quickViewModal.style.display = 'flex';
        
        // Add event listeners to new elements
        quickViewContent.querySelector('.close-quick-view').addEventListener('click', () => {
            quickViewModal.style.display = 'none';
        });
    });
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === quickViewModal) {
        quickViewModal.style.display = 'none';
    }
});

// Special Offers Countdown
const specialItems = document.querySelectorAll('.special-item');
specialItems.forEach(item => {
    const badge = item.querySelector('.special-badge');
    if (badge.textContent === 'Limited Time') {
        const countdown = document.createElement('div');
        countdown.className = 'countdown';
        countdown.innerHTML = `
            <span class="hours">24</span>h
            <span class="minutes">00</span>m
            <span class="seconds">00</span>s
        `;
        item.querySelector('.special-content').appendChild(countdown);
        
        // Set countdown to 24 hours from now
        const endTime = new Date();
        endTime.setHours(endTime.getHours() + 24);
        
        const updateCountdown = () => {
            const now = new Date();
            const diff = endTime - now;
            
            if (diff <= 0) {
                countdown.innerHTML = 'Offer Expired';
                return;
            }
            
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            countdown.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
            countdown.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
            countdown.querySelector('.seconds').textContent = seconds.toString().padStart(2, '0');
        };
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
});

// Add to Cart from Specials
document.querySelectorAll('.special-item .add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
        const specialItem = e.target.closest('.special-item');
        const itemName = specialItem.querySelector('h3').textContent;
        const itemPrice = parseFloat(specialItem.querySelector('.price').textContent.replace('$', ''));
        
        const existingItem = cart.find(item => item.name === itemName);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: itemName,
                price: itemPrice,
                quantity: 1
            });
        }
        
        updateCartCount();
        showNotification(`${itemName} added to cart!`);
    });
});

// Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            if (entry.target.classList.contains('award-item')) {
                entry.target.classList.add('animate-scale');
            }
        }
    });
}, observerOptions);

// Add animation classes to elements
document.querySelectorAll('.animate-on-scroll').forEach(element => {
    animateOnScroll.observe(element);
});

document.querySelectorAll('.award-item').forEach(element => {
    animateOnScroll.observe(element);
});

document.querySelectorAll('.menu-item').forEach(element => {
    animateOnScroll.observe(element);
});

// Parallax Effect
const parallaxSections = document.querySelectorAll('.parallax');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    parallaxSections.forEach(section => {
        const speed = section.dataset.speed || 0.5;
        const yPos = -(scrolled * speed);
        section.style.backgroundPositionY = `${yPos}px`;
    });
});

// Reservation Form Handling
const reservationForm = document.querySelector('.reservation-form');
if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(reservationForm);
        const reservationDetails = {
            name: formData.get('name'),
            email: formData.get('email'),
            date: formData.get('date'),
            time: formData.get('time'),
            guests: formData.get('guests'),
            requests: formData.get('special-requests')
        };
        
        // Here you would typically send this to a server
        console.log('Reservation details:', reservationDetails);
        showNotification('Reservation request submitted successfully!');
        reservationForm.reset();
    });
}

// Instagram Feed Interaction
document.querySelectorAll('.instagram-item').forEach(item => {
    item.addEventListener('click', () => {
        // Here you would typically open the Instagram post in a new tab
        window.open('https://instagram.com', '_blank');
    });
});

// Award Items Animation
document.querySelectorAll('.award-item').forEach(award => {
    award.addEventListener('mouseenter', () => {
        award.querySelector('i').style.transform = 'scale(1.2) rotate(360deg)';
    });
    
    award.addEventListener('mouseleave', () => {
        award.querySelector('i').style.transform = 'scale(1) rotate(0)';
    });
});

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', () => {
    // Show initial animations for elements in viewport
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        if (element.getBoundingClientRect().top < window.innerHeight) {
            element.classList.add('animate-fade-in');
        }
    });
});

// Parallax Effect for Reservation Section
const reservationSection = document.querySelector('.reservation-section');
if (reservationSection) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        reservationSection.style.backgroundPositionY = `${rate}px`;
    });
}

// Enhanced Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    requestAnimationFrame(() => {
        notification.classList.add('show');
    });
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
} 