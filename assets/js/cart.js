// Initialize cart state
let cart = [];
const TAX_RATE = 0.08; // 8% tax rate

// Basic cart functions
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Enable/disable checkout button based on cart contents
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.disabled = totalItems === 0;
        }
    }
}

function updateCartDisplay() {
    const cartItemsContainer = document.querySelector('.cart-items-container');
    const emptyCartMessage = document.querySelector('.empty-cart-message');
    const subtotalAmount = document.querySelector('.subtotal-amount');
    const taxAmount = document.querySelector('.tax-amount');
    const totalAmount = document.querySelector('.total-amount');
    
    if (!cartItemsContainer) return;
    
    // Clear current cart items
    const existingItems = cartItemsContainer.querySelectorAll('.cart-item');
    existingItems.forEach(item => item.remove());
    
    if (cart.length === 0) {
        // Show empty cart message
        if (emptyCartMessage) {
            emptyCartMessage.style.display = 'block';
        }
        
        // Update totals
        if (subtotalAmount) subtotalAmount.textContent = '$0.00';
        if (taxAmount) taxAmount.textContent = '$0.00';
        if (totalAmount) totalAmount.textContent = '$0.00';
        return;
    }
    
    // Hide empty cart message
    if (emptyCartMessage) {
        emptyCartMessage.style.display = 'none';
    }
    
    // Calculate subtotal
    let subtotal = 0;
    
    // Add items to cart display
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image || 'https://via.placeholder.com/100'}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <p>${item.description || ''}</p>
                <div class="cart-item-price">$${item.price.toFixed(2)} × ${item.quantity}</div>
                <div class="cart-item-actions">
                    <div class="cart-quantity-controls">
                        <button class="cart-quantity-btn minus" data-index="${index}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="cart-quantity-btn plus" data-index="${index}">+</button>
                    </div>
                    <button class="remove-from-cart" data-index="${index}">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                </div>
            </div>
        `;
        
        cartItemsContainer.insertBefore(cartItem, emptyCartMessage);
    });
    
    // Calculate tax and total
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;
    
    // Update summary
    if (subtotalAmount) subtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
    if (taxAmount) taxAmount.textContent = `$${tax.toFixed(2)}`;
    if (totalAmount) totalAmount.textContent = `$${total.toFixed(2)}`;
    
    // Add event listeners
    addCartEventListeners();
}

function addCartEventListeners() {
    // Quantity buttons
    document.querySelectorAll('.cart-quantity-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            if (e.target.classList.contains('plus')) {
                increaseQuantity(index);
            } else if (e.target.classList.contains('minus')) {
                decreaseQuantity(index);
            }
        });
    });
    
    // Remove buttons
    document.querySelectorAll('.remove-from-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.closest('.remove-from-cart').getAttribute('data-index'));
            removeFromCart(index);
        });
    });
    
    // Continue shopping button
    const continueShoppingBtn = document.querySelector('.continue-shopping-btn');
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', () => {
            // Scroll back to the menu section
            const menuSection = document.querySelector('.menu-section') || 
                               document.querySelector('.full-menu');
            if (menuSection) {
                menuSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
    
    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) {
                showNotification('Your cart is empty', 'error');
                return;
            }
            
            // Here you would normally redirect to checkout page
            showNotification('Proceeding to checkout...', 'success');
            // Optional: Redirect to checkout page
            // window.location.href = "/checkout.html";
        });
    }
}

function addToCart(name, price, quantity = 1, description = '', image = '') {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ name, price, quantity, description, image });
    }
    
    // Save cart to local storage
    saveCart();
    
    // Update UI
    updateCartCount();
    updateCartDisplay();
    showNotification(`${name} added to cart!`);
}

function increaseQuantity(index) {
    if (index >= 0 && index < cart.length) {
        cart[index].quantity++;
        saveCart();
        updateCartCount();
        updateCartDisplay();
    }
}

function decreaseQuantity(index) {
    if (index >= 0 && index < cart.length) {
        if (cart[index].quantity > 1) {
            cart[index].quantity--;
        } else {
            removeFromCart(index);
            return;
        }
        saveCart();
        updateCartCount();
        updateCartDisplay();
    }
}

function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
        const itemName = cart[index].name;
        cart.splice(index, 1);
        
        // Save cart to local storage
        saveCart();
        
        // Update UI
        updateCartCount();
        updateCartDisplay();
        showNotification(`${itemName} removed from cart`, 'info');
    }
}

function saveCart() {
    localStorage.setItem('resto-cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('resto-cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartCount();
        updateCartDisplay();
    }
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

// Initialize cart functionality
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    
    // Floating cart functionality
    const floatingCart = document.querySelector('.floating-cart');
    
    if (floatingCart) {
        floatingCart.addEventListener('click', () => {
            // Scroll to cart section
            const cartSection = document.getElementById('cart-section');
            if (cartSection) {
                cartSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                showNotification("Cart section not found on this page", "info");
            }
        });
    }
    
    // Add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const menuItem = e.target.closest('.menu-item') || e.target.closest('.special-item');
            if (menuItem) {
                const name = menuItem.querySelector('h3').textContent;
                const price = parseFloat(menuItem.querySelector('.price').textContent.replace('$', ''));
                const description = menuItem.querySelector('p').textContent;
                const image = menuItem.querySelector('img')?.src || '';
                const quantityEl = menuItem.querySelector('.quantity');
                const quantity = quantityEl ? parseInt(quantityEl.textContent) : 1;
                
                addToCart(name, price, quantity, description, image);
            }
        });
    });
    
    // Quantity controls on menu items
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const quantityEl = e.target.closest('.quantity-controls').querySelector('.quantity');
            let quantity = parseInt(quantityEl.textContent);
            
            if (e.target.classList.contains('plus')) {
                quantity++;
            } else if (e.target.classList.contains('minus') && quantity > 1) {
                quantity--;
            }
            
            quantityEl.textContent = quantity;
        });
    });
});
