// Получаем доступ к Telegram API
const webApp = window.Telegram.WebApp;

// Говорим Telegram, что приложение готово
webApp.ready();

// Расширяем на весь экран
webApp.expand();

// Функция 1: Кнопка для показа алерта
document.getElementById('showAlertBtn').addEventListener('click', () => {
    webApp.showAlert('Привет! Это алерт из Telegram. Всё работает!');
});

// Функция 2: Кнопка для отправки данных в бот
document.getElementById('sendDataBtn').addEventListener('click', () => {
    const data = { message: 'Привет от пользователя! Это тестовые данные.' };  // Что отправляем (можно изменить)
    webApp.sendData(JSON.stringify(data));  // Отправляем как строку
});

// Функция 3: Кнопка для закрытия приложения
document.getElementById('closeAppBtn').addEventListener('click', () => {
    webApp.close();
});