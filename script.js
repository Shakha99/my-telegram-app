document.addEventListener('DOMContentLoaded', () => {
    // Initialize Telegram Web App SDK
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();

    // Apply Telegram theme
    if (tg.colorScheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    // Handle logo click
    document.getElementById('logo').addEventListener('click', () => {
        window.location.reload();
    });

    // Notification button with random red dot simulation
    const notificationBtn = document.getElementById('notification-btn');
    const notificationDot = document.getElementById('notification-dot');
    const hasNotifications = Math.random() > 0.5; // Simulate notifications
    if (hasNotifications) {
        notificationDot.classList.remove('hidden');
    }
    notificationBtn.addEventListener('click', () => {
        tg.showAlert('Notifications page coming soon!');
    });

    // Navigation buttons
    document.getElementById('nav-shop').addEventListener('click', () => {
        tg.showAlert('Navigating to Shop page');
    });
    document.getElementById('nav-profile').addEventListener('click', () => {
        tg.showAlert('Navigating to Profile page');
    });

    // Products grid
    const productsGrid = document.getElementById('products-grid');
    let productCount = 4;

    function createProductCard(id) {
        const card = document.createElement('div');
        card.className = 'product-card bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center';
        card.innerHTML = `
            <img src="https://via.placeholder.com/200?text=Product+${id}" alt="Product ${id}" class="w-full h-40 object-cover rounded-md mb-2">
            <h3 class="text-sm font-medium">Product ${id}</h3>
            <p class="text-gray-600 dark:text-gray-300">$${10 + id}</p>
            <button class="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Buy</button>
        `;
        card.querySelector('button').addEventListener('click', () => {
            tg.showAlert('Added to cart!');
        });
        return card;
    }

    // Initial products
    for (let i = 1; i <= 4; i++) {
        productsGrid.appendChild(createProductCard(i));
    }

    // Infinite scroll simulation
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            for (let i = productCount + 1; i <= productCount + 4; i++) {
                productsGrid.appendChild(createProductCard(i));
            }
            productCount += 4;
        }
    });
});