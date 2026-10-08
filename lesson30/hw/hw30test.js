
const USERS_URL = "https://jsonplaceholder.typicode.com/users";

// В конце моделируем ошибку сервера намеренно испортив адрес
// const USERS_URL = "https://jsonplaceholder1111111.typicode.com/users";

// Функция проверки одного пользователя
function validateUser(user) {

    // Проверяем наличие имени
    if (!user.name) {
        throw new Error("User name is missing");
    }

    // Проверяем наличие email
    if (!user.email) {
        throw new Error("User email is missing");
    }

    // Проверяем, что id имеет числовой тип
    if (typeof user.id !== "number") {
        throw new Error("User id must be a number");
    }
}


// Получаем пользователей через Axios
axios.get(USERS_URL)

    .then(response => {

        // Массив пользователей
        const users = response.data;

        // Специально портим первого пользователя
        //  *********************************************
        // users[0].email = null;

        // Проверяем каждого пользователя
        for (const user of users) {

            try {

                // Вызываем функцию валидации
                validateUser(user);

                // Если ошибок нет
                console.log("User is valid:", user.name);

            } catch (error) {

                // Ошибка проверки конкретного пользователя
                console.log(
                    "Validation error:",
                    error.message
                );

            }
        }

    })

    .catch(error => {

        // Ошибка получения данных от API
        console.log("API error");

    });