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

// Выполнение асинхронного HTTP-запроса
axios.get('https://jsonplaceholder.typicode.com/users')
    .then(function (response) {
        // Данные успешно получены и загружены в память
        const users = response.data;

        // Искусственное искажение данных для проверки отказоустойчивости
        if (users.length > 0) {
            users[0].email = null;
        }

        // Итерация по массиву объектов
        users.forEach(function (user) {
            try {
                validateUser(user);
                console.log(`User is valid: ${user.name}`);
            } catch (error) {
                // Локальный перехват логической ошибки
                console.log(`Validation error: ${error.message}`);
            }
        });
    })
    .catch(function (error) {
        // Глобальный перехват сетевой ошибки
        console.log("API error");
    });

