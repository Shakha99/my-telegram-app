document.addEventListener('DOMContentLoaded', () => {
    // Initialize Telegram Web App SDK
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();

    // Apply Telegram theme (dark as default, but adapt)
    if (tg.colorScheme === 'light') {
        document.documentElement.classList.remove('dark');
    } else {
        document.documentElement.classList.add('dark');
    }

    // Handle logo click (back to main page)
    document.getElementById('logo').addEventListener('click', (e) => {
        e.preventDefault();
        tg.showAlert('Navigating back to main page');
        // In real setup, window.location.href = 'index.html';
    });

    // Notification button with random red dot simulation
    const notificationBtn = document.getElementById('notification-btn');
    const notificationDot = document.getElementById('notification-dot');
    const hasNotifications = Math.random() > 0.5; // Simulate notifications
    if (hasNotifications) {
        notificationDot.classList.remove('hidden');
    }
    notificationBtn.addEventListener('click', () => {
        tg.showAlert('Notifications page coming soon');
    });

    // Navigation buttons
    document.getElementById('nav-home').addEventListener('click', () => {
        tg.showAlert('Navigating to Home page');
    });
    document.getElementById('nav-profile').addEventListener('click', () => {
        tg.showAlert('Navigating to Profile page');
    });

    // Products grid
    const productsGrid = document.getElementById('products-grid');
    const loading = document.getElementById('loading');
    let productCount = 0;
    const maxProducts = 12;
    const batchSize = 4;

    function createProductCard(id, name = `Product ${id}`, price = 10 + id, image = `https://via.placeholder.com/100?text=?`) {
        const card = document.createElement('div');
        card.className = 'product-card bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center';
        card.innerHTML = `
            <img src="${image}" alt="${name}" class="w-24 h-24 object-cover rounded-md mb-2">
            <h3 class="text-sm font-medium">${name}</h3>
            <p class="text-gray-300">$${price}</p>
            <button class="mt-2 bg-red-300 text-white px-4 py-2 rounded-md hover:bg-red-400">Buy</button>
        `;
        card.querySelector('button').addEventListener('click', () => {
            tg.showAlert('Added to cart!');
        });
        return card;
    }

    function loadMoreProducts() {
        if (productCount >= maxProducts) return;

        loading.classList.remove('hidden');
        setTimeout(() => {
            for (let i = 1; i <= batchSize; i++) {
                if (productCount >= maxProducts) break;
                productCount++;
                productsGrid.appendChild(createProductCard(productCount));
            }
            loading.classList.add('hidden');
        }, 1000); // Simulate loading delay
    }

    // Initial load
    loadMoreProducts();

    // Infinite scroll
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading.classList.contains('hidden') === false) {
            loadMoreProducts();
        }
    });

    // Admin Mode
    const adminBtn = document.getElementById('admin-mode-btn');
    const adminPanel = document.getElementById('admin-panel');
    adminBtn.addEventListener('click', () => {
        adminPanel.classList.toggle('admin-open');
    });

    // Add Product Form
    const addForm = document.getElementById('add-product-form');
    addForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('product-name').value;
        const price = parseFloat(document.getElementById('product-price').value);
        const image = document.getElementById('product-image').value || 'https://via.placeholder.com/100?text=?';
        if (name && price) {
            productCount++;
            productsGrid.appendChild(createProductCard(productCount, name, price, image));
            addForm.reset();
            adminPanel.classList.remove('admin-open');
        } else {
            tg.showAlert('Please fill in name and price.');
        }
    });
});