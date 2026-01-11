// Cart functionality
let cart = [];

// Initialize cart from localStorage
function initCart() {
    const savedCart = localStorage.getItem('freshFruitsCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCartCount();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('freshFruitsCart', JSON.stringify(cart));
}

// Add to cart
function addToCart(productId, quantity = 1) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            emoji: product.emoji,
            price: product.price,
            unit: product.unit,
            quantity: quantity
        });
    }
    
    saveCart();
    updateCartCount();
    
    // Show feedback
    showNotification(`${product.name} added to cart!`);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    loadCart();
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            saveCart();
            updateCartCount();
            loadCart();
        }
    }
}

// Update cart count in header
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const countElements = document.querySelectorAll('#cart-count');
    countElements.forEach(el => {
        el.textContent = count;
    });
}

// Get all products (imported from products.js)
function getProducts() {
    return typeof products !== 'undefined' ? products : [];
}

// Load cart items on cart page
function loadCart() {
    const container = document.getElementById('cart-items');
    if (!container) return;
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h3>Your cart is empty</h3>
                <p>Looks like you haven't added any fruits to your cart yet.</p>
                <a href="products.html" class="btn btn-primary">Start Shopping</a>
            </div>
        `;
        updateCartSummary();
        return;
    }
    
    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">${item.emoji}</div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)} / ${item.unit}</p>
            </div>
            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
            <div class="cart-item-quantity">
                <button class="qty-btn minus" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
                <input type="number" class="qty-input" value="${item.quantity}" min="1" 
                    onchange="updateQuantity(${item.id}, parseInt(this.value))">
                <button class="qty-btn plus" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">🗑️</button>
        </div>
    `).join('');
    
    updateCartSummary();
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delivery = subtotal >= 50 ? 0 : 5.99;
    const tax = subtotal * 0.08;
    const total = subtotal + delivery + tax;
    
    const subtotalEl = document.getElementById('subtotal');
    const deliveryEl = document.getElementById('delivery');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (deliveryEl) deliveryEl.textContent = delivery === 0 ? 'FREE' : `$${delivery.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
    if (checkoutBtn) checkoutBtn.disabled = cart.length === 0;
}

// Load order summary on checkout page
function loadOrderSummary() {
    const container = document.getElementById('order-items');
    if (!container) return;
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    container.innerHTML = cart.map(item => `
        <div class="order-item">
            <div class="order-item-image">${item.emoji}</div>
            <div class="order-item-info">
                <span class="order-item-name">${item.name}</span>
                <span class="order-item-qty">x${item.quantity}</span>
            </div>
            <span class="order-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
        </div>
    `).join('');
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const delivery = 5.99;
    const tax = subtotal * 0.08;
    const total = subtotal + delivery + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('delivery').textContent = `$${delivery.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Apply promo code
function applyPromo() {
    const promoInput = document.getElementById('promo-code');
    const discountRow = document.getElementById('discount-row');
    const discountEl = document.getElementById('discount');
    
    if (!promoInput || !promoInput.value) return;
    
    const promoCodes = {
        'FRESH10': 0.10,
        'FRUIT20': 0.20,
        'HEALTHY': 0.15
    };
    
    const code = promoInput.value.toUpperCase();
    const discount = promoCodes[code];
    
    if (discount) {
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const discountAmount = subtotal * discount;
        
        if (discountRow) discountRow.style.display = 'flex';
        if (discountEl) discountEl.textContent = `-$${discountAmount.toFixed(2)}`;
        
        showNotification(`Promo code applied! ${discount * 100}% off`);
    } else {
        showNotification('Invalid promo code');
    }
}

// Setup payment options
function setupPaymentOptions() {
    const paymentOptions = document.querySelectorAll('.payment-option input[name="payment"]');
    const cardDetails = document.getElementById('card-details');
    
    if (!paymentOptions.length || !cardDetails) return;
    
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (this.value === 'card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        });
    });
}

// Process checkout
function processCheckout(event) {
    event.preventDefault();
    
    if (cart.length === 0) {
        showNotification('Your cart is empty!');
        return;
    }
    
    // Simulate order processing
    showNotification('Processing your order...');
    
    setTimeout(() => {
        // Clear cart
        cart = [];
        saveCart();
        updateCartCount();
        
        // Show success
        alert('Thank you for your order! Your fresh fruits will be delivered soon.\n\nOrder #: FF-' + Date.now().toString().slice(-8));
        
        // Redirect to home
        window.location.href = 'index.html';
    }, 1500);
}

// Submit contact form
function submitContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('contactName')?.value;
    const email = document.getElementById('contactEmail')?.value;
    const subject = document.getElementById('contactSubject')?.value;
    const message = document.getElementById('contactMessage')?.value;
    
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all required fields');
        return;
    }
    
    showNotification('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    document.getElementById('contact-form').reset();
}

// Show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #2d8a4e;
        color: white;
        padding: 16px 24px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initCart();
    initTheme();
});

// Theme Toggle Functionality
function initTheme() {
    const savedTheme = localStorage.getItem('freshFruitsTheme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.setAttribute('data-theme', 'dark');
        updateThemeIcon();
    }
}

function toggleTheme() {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        document.body.removeAttribute('data-theme');
        localStorage.setItem('freshFruitsTheme', 'light');
    } else {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('freshFruitsTheme', 'dark');
    }
    
    updateThemeIcon();
}

function updateThemeIcon() {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    const themeIcon = document.querySelector('.theme-icon');
    
    if (themeIcon) {
        themeIcon.textContent = isDark ? '☀️' : '🌙';
    }
}

// Make functions globally available
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.updateCartCount = updateCartCount;
window.loadCart = loadCart;
window.loadOrderSummary = loadOrderSummary;
window.applyPromo = applyPromo;
window.processCheckout = processCheckout;
window.submitContactForm = submitContactForm;
window.showNotification = showNotification;
window.toggleTheme = toggleTheme;
window.initTheme = initTheme;
