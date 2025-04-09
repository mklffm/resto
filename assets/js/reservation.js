// Reservation Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Initialize form handling
    initReservationForm();
    
    // Initialize animations
    setupScrollAnimation();
    
    // Set default date and time values
    setDefaultDateTime();
});

function initReservationForm() {
    const reservationForm = document.querySelector('.reservation-form');
    if (!reservationForm) return;
    
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const guests = document.getElementById('guests').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const specialRequests = document.getElementById('special-requests').value;
        
        // Simple validation
        if (!name || !email || !phone || !guests || !date || !time) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        // Here you would normally send the data to a server
        // For now, just show a success message
        showReservationConfirmation(name, email, date, time, guests);
        
        // Reset form
        reservationForm.reset();
    });
    
    // Add floating label effects
    document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
        // Check if input already has a value (e.g. from browser autofill)
        if (input.value) {
            input.classList.add('has-value');
        }
        
        input.addEventListener('focus', () => {
            input.classList.add('has-value');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.classList.remove('has-value');
            }
        });
        
        // For selects, handle the change event separately
        if (input.tagName === 'SELECT') {
            input.addEventListener('change', () => {
                if (input.value) {
                    input.classList.add('has-value');
                }
            });
        }
    });
}

function setDefaultDateTime() {
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    
    if (dateInput && timeInput) {
        // Set default date to tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        // Format date as YYYY-MM-DD
        const year = tomorrow.getFullYear();
        const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
        const day = String(tomorrow.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        
        // Set default time to 7:00 PM
        const defaultTime = '19:00';
        
        // Set values
        dateInput.setAttribute('min', formattedDate);
        dateInput.value = formattedDate;
        timeInput.value = defaultTime;
        
        // Trigger has-value class
        dateInput.classList.add('has-value');
        timeInput.classList.add('has-value');
    }
}

function showReservationConfirmation(name, email, date, time, guests) {
    // Create confirmation overlay
    const confirmationOverlay = document.createElement('div');
    confirmationOverlay.className = 'confirmation-overlay';
    
    // Format date for display
    const displayDate = new Date(date);
    const formattedDate = displayDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    // Create content
    confirmationOverlay.innerHTML = `
        <div class="confirmation-content">
            <div class="confirmation-header">
                <h2>Reservation Confirmed!</h2>
                <button class="close-confirmation">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="confirmation-body">
                <p>Thank you, ${name}! Your reservation has been confirmed.</p>
                <div class="confirmation-details">
                    <div class="detail-item">
                        <i class="far fa-calendar"></i>
                        <span>${formattedDate}</span>
                    </div>
                    <div class="detail-item">
                        <i class="far fa-clock"></i>
                        <span>${time}</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-user-friends"></i>
                        <span>${guests} ${parseInt(guests) === 1 ? 'Person' : 'People'}</span>
                    </div>
                </div>
                <p>A confirmation email has been sent to ${email}.</p>
                <p class="confirmation-note">Please arrive 5-10 minutes before your reservation time. We look forward to serving you!</p>
            </div>
            <div class="confirmation-footer">
                <button class="confirm-button">OK</button>
            </div>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(confirmationOverlay);
    
    // Add event listeners to close
    const closeBtn = confirmationOverlay.querySelector('.close-confirmation');
    const confirmBtn = confirmationOverlay.querySelector('.confirm-button');
    
    [closeBtn, confirmBtn].forEach(btn => {
        btn.addEventListener('click', () => {
            confirmationOverlay.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(confirmationOverlay);
            }, 300);
        });
    });
    
    // Show confirmation with animation
    setTimeout(() => {
        confirmationOverlay.classList.add('active');
    }, 10);
}

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
