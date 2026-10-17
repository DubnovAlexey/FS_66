// ===== app.js — работа со страницей: события, регистрация, отрисовка списка =====
// Этот файл подключён последним: к моменту его запуска уже существуют createUser (user.js) и createUserManager (userManager.js).

// --- Настройки и состояние приложения ---

const ADULT_AGE = 18; // Возраст, с которого человек считается совершеннолетним (для фильтра Show Adults)
const userManager = createUserManager(); // Создаём хранилище пользователей; сам массив спрятан внутри замыкания
let currentFilter = 'all'; // Текущий фильтр списка: 'all' (все) или 'adults' (совершеннолетние); хранит только режим показа, не пользователей

// --- Ссылки на элементы страницы (ищем один раз, используем много раз) ---

const nameInput = document.querySelector('#name-input'); // Поле ввода имени
const ageInput = document.querySelector('#age-input'); // Поле ввода возраста
const registerButton = document.querySelector('#register-button'); // Кнопка Register
const messageBox = document.querySelector('#message'); // Область сообщений (ошибки и подтверждения)
const userList = document.querySelector('#user-list'); // Список пользователей (ul)
const userCount = document.querySelector('#user-count'); // Место для числа пользователей (доп. задание A)
const showAllButton = document.querySelector('#show-all-button'); // Кнопка фильтра Show All
const showAdultsButton = document.querySelector('#show-adults-button'); // Кнопка фильтра Show Adults

// --- Сообщения для пользователя ---

function showMessage(text, type) { // Показывает текст в области сообщений; type — 'error', 'success' или пусто
    messageBox.textContent = text; // Записываем текст безопасно (textContent не разбирает HTML)
    messageBox.classList.remove('message--error', 'message--success'); // Снимаем оформление предыдущего сообщения
    if (type) { // Если тип указан (непустая строка)
        messageBox.classList.add(`message--${type}`); // Добавляем нужный класс оформления: message--error или message--success
    } // Конец проверки типа
} // Конец функции showMessage

// --- Фильтрация (доп. задание C) ---

function getVisibleUsers(allUsers) { // Принимает полный список, возвращает тот, что нужно показать
    if (currentFilter === 'adults') { // Если выбран фильтр «совершеннолетние»
        return allUsers.filter(({ age }) => age >= ADULT_AGE); // filter создаёт новый массив; деструктуризация достаёт age из каждого пользователя
    } // Конец ветки для adults
    return allUsers; // Иначе показываем всех
} // Конец функции getVisibleUsers

// --- Отрисовка списка и счётчика ---

function renderUsers() { // Перерисовывает список пользователей и счётчик
    const allUsers = userManager.getUsers(); // Получаем актуальную копию списка через getUsers
    const visibleUsers = getVisibleUsers(allUsers); // Выбираем тех, кого нужно показать при текущем фильтре

    userCount.textContent = String(allUsers.length); // Доп. задание A: выводим общее число зарегистрированных (не зависит от фильтра)
    userList.replaceChildren(); // Сначала полностью очищаем контейнер от старого содержимого

    if (visibleUsers.length === 0) { // Если показывать некого
        const emptyItem = document.createElement('li'); // Создаём строку-заглушку
        emptyItem.className = 'user-list__empty'; // Назначаем ей класс оформления
        emptyItem.textContent = currentFilter === 'adults' ? 'No adults registered yet.' : 'No users yet. Register the first one using the form above.'; // Текст заглушки зависит от фильтра
        userList.append(emptyItem); // Добавляем заглушку в список
        return; // Выходим из функции: рисовать больше нечего
    } // Конец ветки «список пуст»

    visibleUsers.forEach(({ id, name, age }) => { // Перебираем пользователей; деструктуризация сразу достаёт id, name и age
        const item = document.createElement('li'); // Создаём строку списка
        item.className = 'user-list__item'; // Назначаем класс оформления строки

        const info = document.createElement('p'); // Создаём абзац для текста «имя, возраст»
        info.className = 'user-list__info'; // Назначаем класс оформления текста

        const nameSpan = document.createElement('span'); // Создаём отдельный элемент для имени
        nameSpan.className = 'user-list__name'; // Класс: имя выделяется полужирным
        nameSpan.textContent = name; // Имя вставляем только через textContent — введённый HTML не сработает

        const ageSpan = document.createElement('span'); // Создаём отдельный элемент для возраста
        ageSpan.className = 'user-list__age'; // Класс: возраст приглушённого цвета
        ageSpan.textContent = `, ${age} ${age === 1 ? 'year' : 'years'} old`; // Текст вида «, 28 years old» (для одного года — «year»)

        info.append(nameSpan, ageSpan); // Складываем имя и возраст в один абзац

        const deleteButton = document.createElement('button'); // Доп. задание B: создаём кнопку Delete
        deleteButton.type = 'button'; // Обычная кнопка (не отправляет форму)
        deleteButton.className = 'delete-button'; // Класс оформления кнопки
        deleteButton.textContent = 'Delete'; // Надпись на кнопке
        deleteButton.setAttribute('aria-label', `Delete ${name}`); // Подпись для экранных читалок: какого именно пользователя удаляем
        deleteButton.addEventListener('click', () => handleDelete(id, name)); // Обработчик «помнит» id и name своей строки — это замыкание

        item.append(info, deleteButton); // Складываем текст и кнопку в строку
        userList.append(item); // Добавляем готовую строку в список
    }); // Конец перебора пользователей
} // Конец функции renderUsers

// --- Регистрация пользователя ---

function handleRegister() { // Обработчик нажатия на кнопку Register
    try { // Блок try: здесь выполняется основная логика, ошибки из неё перехватит catch
        console.log('[app] Registration started'); // Сообщение в консоль: начало регистрации

        const name = nameInput.value; // Шаг 1: получаем значение поля имени
        const rawAge = ageInput.value.trim(); // Шаг 1–2: получаем значение поля возраста без пробелов по краям
        const age = rawAge === '' ? null : Number(rawAge); // Шаг 2–3: пустое поле отмечаем как null (иначе Number('') дал бы 0), остальное превращаем в число

        const newUser = createUser({ name, age }); // Шаги 4–5: передаём данные в createUser и получаем объект пользователя (или ошибку)
        userManager.addUser(newUser); // Шаг 6: кладём пользователя в хранилище
        renderUsers(); // Шаги 7–8: внутри берём список через getUsers и обновляем страницу

        console.log(`[app] Registered: ${newUser.name}, ${newUser.age} (id=${newUser.id})`); // Шаг 9: сообщение об успешной регистрации в консоль
        nameInput.value = ''; // Шаг 10: очищаем поле имени
        ageInput.value = ''; // Шаг 10: очищаем поле возраста
        showMessage(`${newUser.name} was registered.`, 'success'); // Показываем на странице подтверждение
        nameInput.focus(); // Возвращаем курсор в поле имени — удобно вводить следующего пользователя
    } catch (error) { // Блок catch: сюда попадаем, если в try была выброшена ошибка
        const { message } = error; // Деструктуризация: достаём текст ошибки из объекта error
        console.error('[app] Registration error:', message); // Выводим ошибку в консоль
        showMessage(message, 'error'); // Показываем ошибку пользователю на странице; пользователь в список не добавлен
    } finally { // Блок finally: выполняется всегда — и после успеха, и после ошибки
        console.log('Registration attempt completed'); // Сообщение из задания: попытка регистрации завершена
    } // Конец конструкции try...catch...finally
} // Конец функции handleRegister

// --- Удаление пользователя (доп. задание B) ---

function handleDelete(id, name) { // Обработчик удаления: получает id и имя удаляемого пользователя
    const wasRemoved = userManager.removeUser(id); // Просим менеджер удалить пользователя; получаем true или false
    if (wasRemoved) { // Если удаление прошло успешно
        console.log(`[app] Deleted: ${name} (id=${id})`); // Сообщение в консоль
        showMessage(`${name} was deleted.`, 'success'); // Подтверждение на странице
        renderUsers(); // Перерисовываем список и счётчик
    } else { // Если пользователя с таким id не нашлось
        console.warn(`[app] User id=${id} was not found`); // Предупреждение в консоль
    } // Конец проверки результата
} // Конец функции handleDelete

// --- Переключение фильтра (доп. задание C) ---

function setFilter(filterName) { // Переключает фильтр: 'all' или 'adults'
    currentFilter = filterName; // Запоминаем выбранный режим
    const isAll = filterName === 'all'; // true, если выбран режим «все»
    showAllButton.classList.toggle('filter--active', isAll); // Подсвечиваем кнопку Show All, только если режим «все»
    showAdultsButton.classList.toggle('filter--active', !isAll); // Подсвечиваем кнопку Show Adults в противоположном случае
    showAllButton.setAttribute('aria-pressed', String(isAll)); // Сообщаем состояние кнопки экранным читалкам
    showAdultsButton.setAttribute('aria-pressed', String(!isAll)); // То же для второй кнопки
    console.log(`[app] Filter changed: ${filterName}`); // Сообщение в консоль
    renderUsers(); // Перерисовываем список; внутренний массив при этом не меняется
} // Конец функции setFilter

// --- Подключение обработчиков событий ---

registerButton.addEventListener('click', handleRegister); // Нажатие на Register запускает регистрацию

[nameInput, ageInput].forEach((input) => { // Для обоих полей ввода
    input.addEventListener('keydown', ({ key }) => { // Слушаем нажатие клавиши; деструктуризация достаёт название клавиши
        if (key === 'Enter') { // Если нажат Enter
            handleRegister(); // Регистрируем — так удобнее, чем тянуться мышью к кнопке
        } // Конец проверки клавиши
    }); // Конец обработчика keydown
}); // Конец перебора полей

showAllButton.addEventListener('click', () => setFilter('all')); // Кнопка Show All включает режим «все»
showAdultsButton.addEventListener('click', () => setFilter('adults')); // Кнопка Show Adults включает режим «совершеннолетние»

// --- Запуск ---

renderUsers(); // Первая отрисовка: показываем счётчик 0 и сообщение «пользователей нет»
console.log('[app] Application is ready'); // Сообщение в консоль: приложение готово к работе