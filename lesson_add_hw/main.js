// --- 1. ИНИЦИАЛИЗАЦИЯ И СОСТОЯНИЕ (STATE) ---
const app = document.querySelector("#app");


let products = [
    {id: 1, name: "Молоко", category: "Молочные продукты", bought: false},
    {id: 2, name: "Хлеб", category: "Выпечка", bought: true},
    {id: 3, name: "Сыр", category: "Молочные продукты", bought: false},
    {id: 4, name: "Яблоки", category: "Фрукты", bought: false}
];

// Вспомогательные переменные для хранения состояния приложения
let currentFilter = 'ALL'; // Хранит текущий режим фильтрации: 'ALL', 'NEED', 'BOUGHT'
let isDraftMode = false;   // Булево значение (true/false) - находимся ли мы в режиме черновика
let draftProducts = [];    // Пустой массив, куда мы скопируем данные при создании черновика


// --- 2. ГЕНЕРАЦИЯ ПОЛЬЗОВАТЕЛЬСКОГО ИНТЕРФЕЙСА (UI) ---

// Функция, которая создает все HTML элементы через JavaScript и добавляет их на страницу
function createUI(container) {
    // Создаем заголовок
    const title = document.createElement("h2");
    title.textContent = "Управление списком продуктов";

    // -- Блок Черновика --
    const draftContainer = document.createElement("div");
    draftContainer.className = "draft-controls"; // Назначаем CSS-класс

    const draftWarning = document.createElement("span");
    draftWarning.textContent = "⚠️ Режим черновика";
    draftWarning.classList.add("hidden"); // Скрываем по умолчанию

    const btnCreateDraft = document.createElement("button");
    btnCreateDraft.textContent = "Создать черновик";

    const btnSaveDraft = document.createElement("button");
    btnSaveDraft.textContent = "Сохранить";
    btnSaveDraft.classList.add("hidden");

    const btnCancelDraft = document.createElement("button");
    btnCancelDraft.textContent = "Отменить";
    btnCancelDraft.classList.add("hidden");

    // Добавляем (append) кнопки внутрь контейнера черновика
    draftContainer.append(draftWarning, btnCreateDraft, btnSaveDraft, btnCancelDraft);

    // -- Блок Формы (Добавление) --
    const form = document.createElement("form");


    const inputName = document.createElement("input");
    inputName.type = "text";
    inputName.placeholder = "Название (например, Кофе)";

    const inputCategory = document.createElement("input");
    inputCategory.type = "text";
    inputCategory.placeholder = "Категория (например, Напитки)";

    const btnAdd = document.createElement("button");
    btnAdd.type = "submit";
    btnAdd.textContent = "Добавить";

    form.append(inputName, inputCategory, btnAdd);

    // -- Блок Фильтров --
    const filtersContainer = document.createElement("div");
    filtersContainer.className = "filters";

    const btnFilterAll = document.createElement("button");
    btnFilterAll.textContent = "Все";
    btnFilterAll.classList.add("active-filter"); // По умолчанию активен

    const btnFilterNeed = document.createElement("button");
    btnFilterNeed.textContent = "Нужно купить";

    const btnFilterBought = document.createElement("button");
    btnFilterBought.textContent = "Куплено";

    filtersContainer.append(btnFilterAll, btnFilterNeed, btnFilterBought);


    // -- Контейнер для списка продуктов --
    const list = document.createElement("ul");


    // Выстраиваем всю эту структуру внутрь нашего главного <div id="app">
    container.append(title, draftContainer, form, filtersContainer, list);

    // Функция возвращает (return) объект со ссылками на созданные элементы,
    // чтобы мы могли обращаться к ним из других частей кода.
    return {
        form, inputName, inputCategory, list,
        btnCreateDraft, btnSaveDraft, btnCancelDraft, draftWarning,
        btnFilterAll, btnFilterNeed, btnFilterBought
    };
}

// Запускаем функцию генерации UI и сохраняем ссылки на элементы в переменную ui
const ui = createUI(app);


// --- 3. БИЗНЕС-ЛОГИКА (ФУНКЦИИ УПРАВЛЕНИЯ ДАННЫМИ) ---

// Функция отрисовки (рендеринга) списка на экране
function renderProducts(arrayToRender) {
    // Очищаем текущий список (удаляем всё внутри тега <ul>)
    ui.list.innerHTML = "";

    // Метод forEach проходит по каждому элементу переданного массива
    arrayToRender.forEach(product => {
        // Создаем элемент списка <li>
        const li = document.createElement("li");

        // Заполняем его текстом (Название и Категория)
        li.textContent = `${product.name} [${product.category}]`;

        // Если свойство bought равно true, добавляем CSS-класс, чтобы зачеркнуть текст
        if (product.bought) {
            li.classList.add("bought");
        }

        // При клике на конкретный элемент списка вызывается функция изменения статуса
        li.addEventListener("click", () => {
            toggleProduct(product.id);
        });

        // Вставляем сформированный элемент <li> внутрь <ul>
        ui.list.append(li);
    });
}

// Функция добавления нового продукта
function handleAddProduct(event) {
    // e.preventDefault() отменяет стандартное поведение браузера при отправке формы
    event.preventDefault();

    // Получаем текст из полей ввода, очищая от пробелов по краям (trim)
    const nameValue = ui.inputName.value.trim();
    const categoryValue = ui.inputCategory.value.trim();// Защита (Валидация): Если пусто, выходим из функции (return)
    if (!nameValue || !categoryValue) {
        return;
    }

    // Определяем, с каким массивом работаем (основной или черновик)
    const targetArray = isDraftMode ? draftProducts : products;

    // Метод some() проверяет, есть ли хотя бы один элемент, удовлетворяющий условию.
    // Переводим всё в нижний регистр (toLowerCase), чтобы "Молоко" и "молоко" считались дублем.
    const isDuplicate = targetArray.some(p => p.name.toLowerCase() === nameValue.toLowerCase());

    if (isDuplicate) {
        alert("Такой продукт уже есть!");
        return;
    }


    // Создаем новый объект данных
    const newProduct = {
        id: Date.now(), // Date.now() дает уникальное число (миллисекунды) для идентификатора
        name: nameValue,
        category: categoryValue,
        bought: false
    };

    // Метод push() добавляет (мутирует) элемент в конец массива
    targetArray.push(newProduct);

    // Очищаем поля ввода
    ui.inputName.value = "";
    ui.inputCategory.value = "";
    ui.inputName.focus(); // Возвращаем курсор в поле ввода названия

// Обновляем отображение
    applyFiltersAndRender();
}

// Функция изменения статуса "Куплено / Не куплено"
function toggleProduct(productId) {
    const targetArray = isDraftMode ? draftProducts : products;

    // Метод findIndex ищет порядковый номер объекта в массиве по его id
    const index = targetArray.findIndex(p => p.id === productId);

    if (index !== -1) {
        // Инвертируем значение: если было true, станет false и наоборот
        targetArray[index].bought = !targetArray[index].bought;
        applyFiltersAndRender(); // Перерисовываем интерфейс
    }
}

// Функция Фильтрации
function applyFiltersAndRender() {
    const targetArray = isDraftMode ? draftProducts : products;

    let filteredArray = [];

    // Метод filter() создает НОВЫЙ массив, не ломая исходный
    if (currentFilter === 'ALL') {
        filteredArray = [...targetArray]; // Копируем массив
    } else if (currentFilter === 'NEED') {
        // В новый массив попадут только те объекты, где p.bought равно false
        filteredArray = targetArray.filter(p => p.bought === false);
    } else if (currentFilter === 'BOUGHT') {
        // В новый массив попадут только те объекты, где p.bought равно true
        filteredArray = targetArray.filter(p => p.bought === true);
    }

    // Отправляем отфильтрованный массив на отрисовку
    renderProducts(filteredArray);
}


// Функции управления черновиком (Deep Copy)
function createDraft() {
    isDraftMode = true;

    // structuredClone создает "глубокую копию".
    // Создаются абсолютно новые объекты в памяти браузера.
    // Изменения в draftProducts никак не повлияют на массив products.
    draftProducts = structuredClone(products);

    // Меняем видимость кнопок через добавление/удаление класса hidden
    ui.btnCreateDraft.classList.add("hidden");
    ui.btnSaveDraft.classList.remove("hidden");
    ui.btnCancelDraft.classList.remove("hidden");
    ui.draftWarning.classList.remove("hidden");

    applyFiltersAndRender();
}


function saveDraft() {
    isDraftMode = false;
    // При сохранении перезаписываем основной массив новыми данными из черновика
    products = structuredClone(draftProducts);
    resetDraftUI();
}

function cancelDraft() {
    isDraftMode = false;
    // Очищаем черновик. Оригинальный массив products остался нетронутым.
    draftProducts = [];
    resetDraftUI();
}

// Вспомогательная функция сброса интерфейса черновика
function resetDraftUI() {
    ui.btnCreateDraft.classList.remove("hidden");
    ui.btnSaveDraft.classList.add("hidden");
    ui.btnCancelDraft.classList.add("hidden");
    ui.draftWarning.classList.add("hidden");
    applyFiltersAndRender();
}


// --- 4. ПОДКЛЮЧЕНИЕ ОБРАБОТЧИКОВ СОБЫТИЙ (Event Listeners) ---


// Когда форма отправляется (по нажатию Enter или кнопки Submit), вызываем handleAddProduct
ui.form.addEventListener("submit", handleAddProduct);

// Кнопки черновика
ui.btnCreateDraft.addEventListener("click", createDraft);
ui.btnSaveDraft.addEventListener("click", saveDraft);
ui.btnCancelDraft.addEventListener("click", cancelDraft);

// Логика переключения кнопок фильтров
function setFilter(filterType, clickedButton) {
    currentFilter = filterType;

    // Убираем класс активности со всех кнопок фильтров
    ui.btnFilterAll.classList.remove("active-filter");
    ui.btnFilterNeed.classList.remove("active-filter");
    ui.btnFilterBought.classList.remove("active-filter");

    // Добавляем класс активности только той кнопке, на которую нажали
    clickedButton.classList.add("active-filter");

    // Перерисовываем список
    applyFiltersAndRender();
}


// Назначаем события на кнопки фильтров
ui.btnFilterAll.addEventListener("click", () => setFilter('ALL', ui.btnFilterAll));
ui.btnFilterNeed.addEventListener("click", () => setFilter('NEED', ui.btnFilterNeed));
ui.btnFilterBought.addEventListener("click", () => setFilter('BOUGHT', ui.btnFilterBought));


// --- 5. ЗАПУСК ПРИЛОЖЕНИЯ ---
// Когда браузер прочитает весь код, мы один раз вызываем функцию, чтобы нарисовать изначальный список.
applyFiltersAndRender();