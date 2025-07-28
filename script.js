// Получаем доступ к Telegram API
const webApp = window.Telegram.WebApp;

// Говорим Telegram, что приложение готово
webApp.ready();

// Расширяем на весь экран
webApp.expand();

// Массив товаров (примеры, можно добавить больше)
const products = [
    {
        id: 1,
        name: 'Смартфон XYZ',
        description: 'Крутой смартфон',
        image: 'https://via.placeholder.com/200x150?text=Смартфон',
        discountPrice: 8000,
        originalPrice: 10000
    },
    {
        id: 2,
        name: 'Наушники ABC',
        description: 'Беспроводные наушники',
        image: 'https://via.placeholder.com/200x150?text=Наушники',
        discountPrice: 2000,
        originalPrice: 3000
    },
    {
        id: 3,
        name: 'Часы DEF',
        description: 'Умные часы',
        image: 'https://via.placeholder.com/200x150?text=Часы',
        discountPrice: 5000,
        originalPrice: 7000
    }
];

// Корзина (пустая сначала)
let cart = [];

// Функция для рендера списка товаров
function renderProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = ''; // Очищаем
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="prices">
                <span class="discount-price">${product.discountPrice} руб</span>
                <span class="original-price">${product.originalPrice} руб</span>
            </div>
            <button onclick="addToCart(${product.id})">Купить по скидке</button>
        `;
        productList.appendChild(card);
    });
}

// Функция добавления в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        renderCart();
        webApp.showAlert(`Товар "${product.name}" добавлен в корзину!`);
    }
}

// Функция рендера корзины
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartEmpty = document.getElementById('cartEmpty');
    cartItems.innerHTML = '';
    if (cart.length === 0) {
        cartEmpty.style.display = 'block';
    } else {
        cartEmpty.style.display = 'none';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Цена: ${item.discountPrice} руб</p>
            `;
            cartItems.appendChild(cartItem);
        });
    }
}

// Переключение табов
document.getElementById('catalogTab').addEventListener('click', () => {
    switchTab('catalog');
});
document.getElementById('cartTab').addEventListener('click', () => {
    switchTab('cart');
});

function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(button => button.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    document.getElementById(tabId + 'Tab').classList.add('active');
}

// Инициализация: Рендерим товары и корзину
renderProducts();
renderCart();

// Старые функции
document.getElementById('showAlertBtn').addEventListener('click', () => {
    webApp.showAlert('Привет! Это алерт из Telegram.');
});

document.getElementById('sendDataBtn').addEventListener('click', () => {
    const data = { message: 'Данные от пользователя' };
    webApp.sendData(JSON.stringify(data));
});

document.getElementById('closeAppBtn').addEventListener('click', () => {
    webApp.close();
});