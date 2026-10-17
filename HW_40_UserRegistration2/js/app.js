// Находим нужные HTML-элементы один раз и сохраняем ссылки на них. // Так обработчики не ищут те же узлы при каждом действии.
const registrationForm = document.querySelector("#registration-form"); // Находим форму по id, чтобы читать и сбрасывать её поля.
const nameInput = document.querySelector("#name-input"); // Находим поле имени, чтобы получить его value и вернуть ему фокус.
const ageInput = document.querySelector("#age-input"); // Находим числовое поле возраста.
const formMessage = document.querySelector("#form-message"); // Находим место для сообщения пользователю.
const userCount = document.querySelector("#user-count"); // Находим элемент общего счётчика записей.
const userList = document.querySelector("#user-list"); // Находим контейнер списка пользователей.
const showAllButton = document.querySelector("#show-all-button"); // Находим кнопку показа всех записей.
const showAdultsButton = document.querySelector("#show-adults-button"); // Находим кнопку фильтра совершеннолетних.

// Создаём единственное хранилище текущей страницы и задаём возрастной порог. // После перезагрузки создастся новое пустое хранилище.
const userManager = createUserManager(); // Получаем объект с методами менеджера из файла userManager.js.
const ADULT_AGE = 18; // Сохраняем правило фильтра в одной именованной константе.
let currentFilter = "all"; // Запоминаем режим списка, который меняется при переключении кнопок.

// Показываем безопасное текстовое сообщение и выбираем его CSS-состояние. // textContent не превращает текст в HTML-разметку.
function showMessage(message, kind = "success") { // Принимаем текст и необязательный вид сообщения; по умолчанию это успех.
    formMessage.textContent = message; // Записываем обычную строку в элемент сообщения.
    formMessage.classList.toggle("is-error", kind === "error"); // Включаем класс ошибки, если kind равен error, иначе снимаем его.
} // Завершаем функцию показа сообщения.

// Получаем видимую часть списка на основе выбранного фильтра. // Фильтруется копия, выданная менеджером.
function getVisibleUsers(allUsers) { // Принимаем массив снимка и выбираем записи для отображения.
    if (currentFilter === "adults") { // Проверяем, выбран ли режим Show Adults.
        return allUsers.filter(({ age }) => age >= ADULT_AGE); // Создаём новый массив со взрослыми, не изменяя исходный.
    } // Завершаем ветку фильтрации взрослых.
    return allUsers; // Для режима Show All возвращаем весь снимок пользователей.
} // Завершаем выбор видимого списка.

// Перерисовываем список, счётчик и пустое состояние по текущему хранилищу. // Эта функция используется после каждой операции.
function renderUsers() { // Объявляем общий способ синхронизировать данные менеджера с DOM.
    const allUsers = userManager.getUsers(); // Получаем новый внешний массив, не раскрывая внутренний users.
    const visibleUsers = getVisibleUsers(allUsers); // Вычисляем отображаемую часть, не меняя коллекцию.
    userCount.textContent = `Total: ${allUsers.length}`; // Показываем общее количество, включая скрытые фильтром записи.
    userList.replaceChildren(); // Очищаем старые элементы списка перед новой отрисовкой.

    if (visibleUsers.length === 0) { // Проверяем, есть ли элементы для отображения.
        const emptyItem = document.createElement("li"); // Создаём HTML-элемент подсказки без строковой разметки.
        emptyItem.className = "empty-state"; // Указываем CSS-класс пустого состояния.
        emptyItem.textContent = currentFilter === "adults" ? "No adults in the list yet." : "No users yet. Add the first person above."; // Объясняем, почему сейчас нет видимых записей.
        userList.append(emptyItem); // Добавляем подсказку внутрь списка.
        return; // Останавливаем отрисовку карточек, потому что отображать нечего.
    } // Закрываем обработку пустого состояния.

    visibleUsers.forEach(({ id, name, age }) => { // Перебираем записи и извлекаем id, имя и возраст деструктуризацией.
        const listItem = document.createElement("li"); // Создаём элемент списка для одной записи.
        listItem.className = "user-row"; // Подключаем оформление карточки пользователя.
        const details = document.createElement("div"); // Создаём контейнер сведений о человеке.
        details.className = "user-details"; // Подключаем оформление группы имени и возраста.
        const nameLabel = document.createElement("span"); // Создаём элемент для имени.
        nameLabel.className = "user-name"; // Назначаем имени основной визуальный стиль.
        nameLabel.textContent = name; // Вставляем имя как текст, а не как HTML.
        const ageLabel = document.createElement("span"); // Создаём элемент для возраста.
        ageLabel.className = "user-age"; // Назначаем возрасту вторичный стиль.
        ageLabel.textContent = `${age} years old`; // Превращаем числовое значение в понятную подпись.
        details.append(nameLabel, ageLabel); // Добавляем оба фрагмента в общий контейнер.
        const deleteButton = document.createElement("button"); // Создаём кнопку удаления для этой карточки.
        deleteButton.className = "button button-delete"; // Назначаем общую и специальную CSS-классы кнопки.
        deleteButton.type = "button"; // Не даём кнопке Delete отправить форму регистрации.
        deleteButton.textContent = "Delete"; // Записываем видимую подпись обычным текстом.
        deleteButton.setAttribute("aria-label", `Delete ${name}`); // Уточняем назначение кнопки для программ чтения с экрана.
        deleteButton.addEventListener("click", () => handleDelete(id, name)); // Подписываем кнопку на замыкание, помнящее id и имя этой строки.
        listItem.append(details, deleteButton); // Объединяем сведения и кнопку внутри строки.
        userList.append(listItem); // Добавляем готовую строку в список.
    }); // Завершаем перебор видимых пользователей.
} // Завершаем отрисовку.

// Обрабатываем отправку формы; ошибки проверки попадают в catch, а завершение всегда фиксируется. // Пустой возраст превращается в null до Number.
function handleRegistration(event) { // Объявляем обработчик; браузер передаёт ему объект события отправки.
    event.preventDefault(); // Отменяем стандартную перезагрузку страницы при отправке формы.
    console.log("Registration attempt started"); // Отмечаем начало действия в консоли разработчика.

    try { // Начинаем блок основной логики, ошибки которой перехватит catch.
        const rawName = nameInput.value; // Читаем строку имени из свойства value.
        const rawAge = ageInput.value; // Читаем введённый возраст; значение поля поступает текстом.
        const age = rawAge.trim() === "" ? null : Number(rawAge); // Проверяем пустоту и только затем преобразуем непустой текст числом.
        const user = createUser({ name: rawName, age }); // Передаём один объект и получаем очищенную, проверенную запись с id.
        userManager.addUser(user); // Добавляем запись через метод, не меняя массив из app.js напрямую.
        renderUsers(); // Обновляем карточки и общий счётчик на странице.
        showMessage(`${user.name} was registered successfully.`, "success"); // Показываем подтверждение зелёным стилем.
        console.log("User registered:", user); // Выводим созданный объект, включая id и числовой возраст, в Console.
        registrationForm.reset(); // Очищаем поля стандартным методом формы после успешной регистрации.
        nameInput.focus(); // Перемещаем курсор к имени, чтобы можно было сразу ввести следующую запись.
    } catch (error) { // Перехватываем исключения, которые createUser выбросила через throw new Error.
        const { message } = error; // Извлекаем свойство message из объекта ошибки деструктуризацией.
        console.error(message); // Показываем текст ошибки в Console как ошибку.
        showMessage(message, "error"); // Показываем такой же текст на странице в красноватом сообщении.
    } finally { // Начинаем часть, выполняющуюся после успеха или ошибки.
        console.log("Registration attempt completed"); // Записываем обязательное сообщение для каждой попытки.
    } // Завершаем блок обработки регистрации.
} // Закрываем обработчик формы.

// Удаляем пользователя по id и обновляем интерфейс согласно результату. // Имя нужно только для журнала и понятного сообщения.
function handleDelete(userId, userName) { // Принимаем идентификатор и имя удаляемого пользователя.
    const wasRemoved = userManager.removeUser(userId); // Вызываем метод закрытого хранилища и получаем true или false.
    if (wasRemoved) { // Проверяем, нашёлся ли такой id в массиве.
        console.log(`User deleted: ${userName} (id ${userId})`); // Записываем успешное удаление в Console.
    } else { // Обрабатываем случай, когда id уже отсутствует.
        console.warn(`User not found for deletion: id ${userId}`); // Показываем предупреждение, не сообщая о ложном успехе.
    } // Завершаем выбор сообщения Console.
    renderUsers(); // Перестраиваем список и счётчик после операции.
    showMessage(wasRemoved ? `${userName} was removed.` : "That user was already removed.", wasRemoved ? "success" : "error"); // Отображаем результат с подходящим состоянием.
} // Закрываем обработчик удаления.

// Переключаем фильтр, обновляем доступное состояние кнопок и отрисовываем список. // Само хранилище при этом не меняется.
function setFilter(filterName) { // Принимаем режим all или adults от нажатой кнопки.
    currentFilter = filterName; // Запоминаем новый режим в изменяемой переменной.
    const showAllIsActive = currentFilter === "all"; // Вычисляем, должна ли быть активной первая кнопка.
    showAllButton.setAttribute("aria-pressed", String(showAllIsActive)); // Устанавливаем доступное состояние первой кнопки текстовым атрибутом.
    showAdultsButton.setAttribute("aria-pressed", String(!showAllIsActive)); // Устанавливаем противоположное состояние второй кнопки.
    renderUsers(); // Перерисовываем видимый список и общий счётчик.
    console.log(`User filter changed: ${filterName}`); // Фиксируем выбранный режим в Console.
} // Завершаем переключение фильтра.

// Подключаем обработчики после разбора HTML; defer в index.html обеспечивает нужный момент запуска. // Затем рисуем начальное состояние.
registrationForm.addEventListener("submit", handleRegistration); // Запускаем регистрацию кнопкой или клавишей Enter.
showAllButton.addEventListener("click", () => setFilter("all")); // При нажатии Show All включаем полный список.
showAdultsButton.addEventListener("click", () => setFilter("adults")); // При нажатии Show Adults включаем фильтр от 18 лет.
renderUsers(); // Создаём начальное пустое состояние и начальное значение счётчика.
console.log("User Registration app is ready"); // Сообщаем, что страница готова к работе.