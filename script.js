// Получаем доступ к Telegram API
const webApp = window.Telegram.WebApp;

// Говорим Telegram, что приложение готово
webApp.ready();

// Расширяем на весь экран
webApp.expand();

// Функция 1: Кнопка для показа алерта (старая)
document.getElementById('showAlertBtn').addEventListener('click', () => {
    webApp.showAlert('Привет! Это алерт из Telegram. Всё работает!');
});

// Функция 2: Кнопка для отправки данных в бот (старая)
document.getElementById('sendDataBtn').addEventListener('click', () => {
    const data = { message: 'Привет от пользователя! Это тестовые данные.' };
    webApp.sendData(JSON.stringify(data));
});

// Функция 3: Кнопка для закрытия приложения (старая)
document.getElementById('closeAppBtn').addEventListener('click', () => {
    webApp.close();
});

// Новая функция 5: Кнопка "Купить" — показывает алерт про группу
document.getElementById('buyBtn').addEventListener('click', () => {
    webApp.showAlert('Чтобы скидка сработала, нужно собрать группу из двух человек!');
});