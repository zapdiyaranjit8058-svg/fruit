// Product Data
const products = [
    {
        id: 1,
        name: "Organic Red Apples",
        category: "apples",
        emoji: "🍎",
        price: 4.99,
        unit: "lb",
        badge: "Organic",
        rating: 4.9,
        reviews: 124,
        description: "Premium organic red apples grown without pesticides or synthetic fertilizers. Crisp, sweet, and bursting with flavor."
    },
    {
        id: 2,
        name: "Fresh Strawberries",
        category: "berries",
        emoji: "🍓",
        price: 6.99,
        unit: "pack",
        badge: "Fresh",
        rating: 4.8,
        reviews: 89,
        description: "Sweet and juicy strawberries, perfect for snacking or adding to your morning cereal."
    },
    {
        id: 3,
        name: "Navel Oranges",
        category: "citrus",
        emoji: "🍊",
        price: 3.99,
        unit: "lb",
        badge: "Popular",
        rating: 4.7,
        reviews: 156,
        description: "Seedless navel oranges with perfect sweetness. Rich in vitamin C."
    },
    {
        id: 4,
        name: "Yellow Bananas",
        category: "tropical",
        emoji: "🍌",
        price: 1.99,
        unit: "lb",
        badge: null,
        rating: 4.6,
        reviews: 203,
        description: "Fresh, ripe bananas. Great source of potassium and natural energy."
    },
    {
        id: 5,
        name: "Green Grapes",
        category: "berries",
        emoji: "🍇",
        price: 5.99,
        unit: "lb",
        badge: "Sweet",
        rating: 4.8,
        reviews: 98,
        description: "Seedless green grapes with a perfect balance of sweet and tart flavors."
    },
    {
        id: 6,
        name: "Fresh Lemons",
        category: "citrus",
        emoji: "🍋",
        price: 2.99,
        unit: "lb",
        badge: null,
        rating: 4.7,
        reviews: 67,
        description: "Zesty lemons perfect for cooking, baking, or making fresh lemonade."
    },
    {
        id: 7,
        name: "Ripe Mangos",
        category: "tropical",
        emoji: "🥭",
        price: 4.49,
        unit: "each",
        badge: "Seasonal",
        rating: 4.9,
        reviews: 112,
        description: "Sweet and tropical mangoes. Rich in vitamins A and C."
    },
    {
        id: 8,
        name: "Fresh Pineapple",
        category: "tropical",
        emoji: "🍍",
        price: 5.99,
        unit: "each",
        badge: "Tropical",
        rating: 4.8,
        reviews: 145,
        description: "Sweet and juicy pineapple. Perfect for fruit salads or as a snack."
    },
    {
        id: 9,
        name: "Red Cherries",
        category: "berries",
        emoji: "🍒",
        price: 8.99,
        unit: "lb",
        badge: "Premium",
        rating: 4.9,
        reviews: 76,
        description: "Premium dark red cherries. Sweet, juicy, and bursting with flavor."
    },
    {
        id: 10,
        name: "Yellow Peaches",
        category: "stone-fruits",
        emoji: "🍑",
        price: 4.99,
        unit: "lb",
        badge: "Fresh",
        rating: 4.7,
        reviews: 89,
        description: "Sweet and juicy peaches. Perfect for snacking or baking."
    },
    {
        id: 11,
        name: "Green Apples",
        category: "apples",
        emoji: "🍏",
        price: 4.49,
        unit: "lb",
        badge: "Tart",
        rating: 4.6,
        reviews: 54,
        description: "Crisp and tart green apples. Perfect for pies or snacking."
    },
    {
        id: 12,
        name: "Fresh Limes",
        category: "citrus",
        emoji: "🟢",
        price: 2.49,
        unit: "lb",
        badge: null,
        rating: 4.5,
        reviews: 43,
        description: "Zesty limes perfect for cooking, cocktails, or guacamole."
    },
    {
        id: 13,
        name: "Honeydew Melon",
        category: "melons",
        emoji: "🍈",
        price: 6.99,
        unit: "each",
        badge: "Sweet",
        rating: 4.7,
        reviews: 62,
        description: "Sweet and refreshing honeydew melon. Perfect summer fruit."
    },
    {
        id: 14,
        name: "Watermelon",
        category: "melons",
        emoji: "🍉",
        price: 8.99,
        unit: "each",
        badge: "Summer",
        rating: 4.8,
        reviews: 178,
        description: "Juicy and refreshing watermelon. Perfect for hot summer days."
    },
    {
        id: 15,
        name: "Fresh Plums",
        category: "stone-fruits",
        emoji: "🍀",
        price: 3.99,
        unit: "lb",
        badge: null,
        rating: 4.6,
        reviews: 38,
        description: "Sweet and juicy plums. Great for snacking or baking."
    },
    {
        id: 16,
        name: "Fresh Avocados",
        category: "tropical",
        emoji: "🥑",
        price: 1.99,
        unit: "each",
        badge: "Organic",
        rating: 4.8,
        reviews: 234,
        description: "Creamy and nutritious avocados. Perfect for guacamole or toast."
    }
];

// Load featured products on homepage
function loadFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;
    
    const featured = products.slice(0, 4);
    container.innerHTML = featured.map(product => createProductCard(product)).join('');
}

// Load all products on shop page
function loadAllProducts() {
    const container = document.getElementById('all-products');
    if (!container) return;
    
    container.innerHTML = products.map(product => createProductCard(product)).join('');
    updateResultsCount(products.length);
}

// Create product card HTML
function createProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                ${product.emoji}
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            </div>
            <div class="product-content">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <span class="stars">${'⭐'.repeat(Math.floor(product.rating))}</span>
                    <span>${product.rating}</span>
                </div>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    <span class="unit">/ ${product.unit}</span>
                </div>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    🛒 Add to Cart
                </button>
            </div>
        </div>
    `;
}

// Update results count
function updateResultsCount(count) {
    const countElement = document.getElementById('results-count');
    if (countElement) {
        countElement.textContent = count;
    }
}

// Filter functionality
function setupFilters() {
    const filterLinks = document.querySelectorAll('.filter-link');
    
    filterLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state
            filterLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            const filtered = category === 'all' 
                ? products 
                : products.filter(p => p.category === category);
            
            const container = document.getElementById('all-products');
            if (container) {
                container.innerHTML = filtered.map(product => createProductCard(product)).join('');
                updateResultsCount(filtered.length);
            }
        });
    });
}

// Load product detail
function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id')) || 1;
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Update page elements
    document.getElementById('page-title').textContent = `${product.name} - FreshFruits`;
    document.getElementById('breadcrumb-name').textContent = product.name;
    document.getElementById('product-emoji').textContent = product.emoji;
    document.getElementById('product-badge').textContent = product.badge || 'Fresh';
    document.getElementById('product-title').textContent = product.name;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('current-price').textContent = `$${product.price.toFixed(2)}`;
    
    // Update thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.dataset.image = product.emoji;
        thumb.textContent = product.emoji;
    });
    
    // Load related products
    const relatedContainer = document.getElementById('related-products');
    if (relatedContainer) {
        const related = products.filter(p => p.category === product.category && p.id !== productId).slice(0, 4);
        relatedContainer.innerHTML = related.map(p => createProductCard(p)).join('');
    }
}

// Setup tabs
function setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Setup quantity selector
function setupQuantitySelector() {
    const minusBtn = document.querySelector('.qty-btn.minus');
    const plusBtn = document.querySelector('.qty-btn.plus');
    const qtyInput = document.querySelector('.qty-input');
    
    if (minusBtn && plusBtn && qtyInput) {
        minusBtn.addEventListener('click', () => {
            const current = parseInt(qtyInput.value);
            if (current > 1) {
                qtyInput.value = current - 1;
            }
        });
        
        plusBtn.addEventListener('click', () => {
            const current = parseInt(qtyInput.value);
            if (current < 50) {
                qtyInput.value = current + 1;
            }
        });
    }
}

// Make functions globally available
window.loadFeaturedProducts = loadFeaturedProducts;
window.loadAllProducts = loadAllProducts;
window.loadProductDetail = loadProductDetail;
window.setupFilters = setupFilters;
window.setupTabs = setupTabs;
window.setupQuantitySelector = setupQuantitySelector;
