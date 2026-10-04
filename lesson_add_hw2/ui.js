// ui.js


// Создаем пустой контейнер, куда сложим все ссылки на HTML-элементы,
// чтобы командный центр (main.js) мог повесить на них радары-слушатели.
export const uiElements = {};

// Функция сборки интерфейса
export function createUI(container) {
    const title = document.createElement("h2");
    title.textContent = "Управление списком продуктов";

    const draftContainer = document.createElement("div");
    draftContainer.className = "draft-controls";

    const draftWarning = document.createElement("span");
    draftWarning.textContent = "⚠️ Режим черновика";
    draftWarning.classList.add("hidden");

    const btnCreateDraft = document.createElement("button");
    btnCreateDraft.textContent = "Создать черновик";

    const btnSaveDraft = document.createElement("button");
    btnSaveDraft.textContent = "Сохранить";
    btnSaveDraft.classList.add("hidden");

    const btnCancelDraft = document.createElement("button");
    btnCancelDraft.textContent = "Отменить";
    btnCancelDraft.classList.add("hidden");

    draftContainer.append(draftWarning, btnCreateDraft, btnSaveDraft, btnCancelDraft);

    const form = document.createElement("form");
    const inputName = document.createElement("input");
    inputName.type = "text";
    inputName.placeholder = "Название (например, Кофе)";

    const inputCategory = document.createElement("input");
    inputCategory.type = "text";
    inputCategory.placeholder = "Категория (например, Напитки)";
    inputCategory.setAttribute("list", "category-list");

    const dataList = document.createElement("datalist");
    dataList.id = "category-list";

    const btnAdd = document.createElement("button");
    btnAdd.type = "submit";
    btnAdd.textContent = "Добавить";

    form.append(inputName, inputCategory, dataList, btnAdd);

    const filtersContainer = document.createElement("div");
    filtersContainer.className = "filters";

    const btnFilterAll = document.createElement("button");
    btnFilterAll.textContent = "Все";
    btnFilterAll.classList.add("active-filter");

    const btnFilterNeed = document.createElement("button");
    btnFilterNeed.textContent = "Нужно купить";

    const btnFilterBought = document.createElement("button");
    btnFilterBought.textContent = "Куплено";

    filtersContainer.append(btnFilterAll, btnFilterNeed, btnFilterBought);

    const list = document.createElement("ul");

    container.append(title, draftContainer, form, filtersContainer, list);

    // Записываем все созданные узлы связи в наш экспортируемый объект
    Object.assign(uiElements, {
        form, inputName, inputCategory, dataList, list,
        btnCreateDraft, btnSaveDraft, btnCancelDraft, draftWarning,
        btnFilterAll, btnFilterNeed, btnFilterBought
    });
}

// Функция отрисовки списка (Рендер)
// Принимает массив для отрисовки и функцию-коллбэк (для связи с main.js)
export function renderProducts(arrayToRender, onToggleCallback) {
    uiElements.list.innerHTML = "";

    arrayToRender.forEach(product => {
        const li = document.createElement("li");
        li.textContent = `${product.name} [${product.category}]`;

        if (product.bought) {
            li.classList.add("bought");
        }

        // При клике дергаем функцию, переданную извне
        li.addEventListener("click", () => {
            onToggleCallback(product.id);
        });

        uiElements.list.append(li);
    });
}

// Функция обновления выпадающего списка категорий
// Функция стала "чистой". Она принимает готовый массив строк (categoriesArray) снаружи.
// Ей абсолютно неважно, откуда этот массив пришел: из черновика, из основного списка или из интернета.
export function updateCategoryDropdown(categoriesArray) {
    // 1. Очищаем старый список
    uiElements.dataList.innerHTML = "";

    // 2. Проходим по массиву, который нам передали через параметры
    categoriesArray.forEach(categoryString => {
        const option = document.createElement("option"); // Создаем тег
        option.value = categoryString;                   // Записываем текст
        uiElements.dataList.append(option);              // Вставляем в DOM
    });
}

// Вспомогательная функция для переключения видимости кнопок черновика
export function toggleDraftVisibility(isDraftMode) {
    if (isDraftMode) {
        uiElements.btnCreateDraft.classList.add("hidden");
        uiElements.btnSaveDraft.classList.remove("hidden");
        uiElements.btnCancelDraft.classList.remove("hidden");
        uiElements.draftWarning.classList.remove("hidden");
    } else {
        uiElements.btnCreateDraft.classList.remove("hidden");
        uiElements.btnSaveDraft.classList.add("hidden");
        uiElements.btnCancelDraft.classList.add("hidden");
        uiElements.draftWarning.classList.add("hidden");
    }
}