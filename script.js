// Получаем доступ к Telegram API
const webApp = window.Telegram.WebApp;

// Говорим Telegram, что приложение готово к показу
webApp.ready();

// Расширяем приложение на весь экран (чтобы не было лишних полос)
webApp.expand();