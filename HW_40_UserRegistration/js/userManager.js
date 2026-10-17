// ===== userManager.js — управление коллекцией пользователей через замыкание =====

function createUserManager() { // Фабрика: каждый вызов создаёт отдельное хранилище пользователей
    let users = []; // Приватный массив: локальная переменная функции, из app.js напрямую недоступна

    return { // Возвращаем объект с методами — только через них можно работать с массивом
        addUser(user) { // Метод 1: добавить пользователя (принимает готовый объект)
            users.push(user); // Кладём пользователя в конец внутреннего массива
            console.log(`[userManager] User added: id=${user.id}. Total users: ${users.length}`); // Сообщение в консоль: добавлено, сколько всего
        }, // Конец метода addUser

        getUsers() { // Метод 2: получить список пользователей (аргументов нет)
            return [...users]; // Spread создаёт НОВЫЙ массив-копию: внешний код не сможет испортить внутренний массив
        }, // Конец метода getUsers

        removeUser(userId) { // Метод 3 (доп. задание B): удалить пользователя по id
            const countBefore = users.length; // Запоминаем, сколько пользователей было до удаления
            users = users.filter((user) => user.id !== userId); // filter оставляет всех, у кого id не совпал с удаляемым; результат записываем обратно в приватную переменную
            const wasRemoved = users.length < countBefore; // Если пользователей стало меньше — удаление прошло успешно
            console.log(`[userManager] Remove user id=${userId}: ${wasRemoved ? 'done' : 'not found'}. Total users: ${users.length}`); // Сообщение в консоль: результат и остаток
            return wasRemoved; // Возвращаем true (удалён) или false (такого id не было)
        }, // Конец метода removeUser
    }; // Конец возвращаемого объекта
} // Конец фабрики createUserManager