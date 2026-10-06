const axios = require('axios');

// Функция валидации (Контракт данных)
function validateUser(user) {
    if (!user.name) {
        throw new Error("User name is missing");
    }
    if (!user.email) {
        throw new Error("User email is missing");
    }
    if (typeof user.id !== 'number') {
        throw new Error("User id is not a number");
    }
}

// Главная асинхронная функция-обертка
async function fetchAndValidateUsers() {
    // Внешний блок try-catch для обработки ошибок сети (API)
    try {
        // Остановка контекста выполнения до получения данных от сервера
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        const users = response.data;

        // Искусственное искажение данных для проверки отказоустойчивости
        if (users.length > 0) {
            users[0].email = null;
        }

        // Синхронная итерация по массиву объектов в оперативной памяти
        users.forEach(function (user) {
            // Внутренний блок try-catch для обработки логических ошибок валидации
            try {
                validateUser(user);
                console.log(`User is valid: ${user.name}`);
            } catch (error) {
                console.log(`Validation error: ${error.message}`);
            }
        });

    } catch (error) {
        // Сюда выполнение перейдет только в случае сбоя await axios.get(...)
        console.log("API error");
    }
}

// Инициализация выполнения
fetchAndValidateUsers();