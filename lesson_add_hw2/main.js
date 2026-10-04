// main.js
import { state } from './state.js';
import { uiElements, createUI, renderProducts, updateCategoryDropdown, toggleDraftVisibility } from './ui.js';

const app = document.querySelector("#app");

// 1. Собираем панель управления на экране
createUI(app);

// 2. БИЗНЕС-ЛОГИКА (Управление грузопотоками)
function applyFiltersAndRender() {
    // 1. Определяем, откуда берем данные (черновик или оригинал)
    const targetArray = state.isDraftMode ? state.draftProducts : state.products;

    // --- БЛОК ФИЛЬТРАЦИИ ДЛЯ СПИСКА ПРОДУКТОВ ---
    let filteredArray = [];

    if (state.currentFilter === 'ALL') {
        filteredArray = [...targetArray];
    } else if (state.currentFilter === 'NEED') {
        filteredArray = targetArray.filter(p => p.bought === false);
    } else if (state.currentFilter === 'BOUGHT') {
        filteredArray = targetArray.filter(p => p.bought === true);
    }

    // --- БЛОК ПОДГОТОВКИ ДАННЫХ ДЛЯ КАТЕГОРИЙ ---
    // Мы перенесли бизнес-логику расчетов сюда. Мозг сам вычисляет, что нужно отдать интерфейсу.
    // .map() собирает все категории из текущего массива данных
    const allCategories = targetArray.map(p => p.category);
    // Set удаляет дубликаты, а [...] превращает это обратно в чистый массив
    const uniqueCategories = [...new Set(allCategories)];

    // --- ПЕРЕДАЧА ДАННЫХ В UI (ИНТЕРФЕЙС) ---
    // Передаем отфильтрованный массив продуктов и функцию переключения статуса
    renderProducts(filteredArray, toggleProduct);

    // Передаем готовый массив уникальных категорий в выпадающий список
    updateCategoryDropdown(uniqueCategories);
}

function handleAddProduct(event) {
    event.preventDefault();

    const nameValue = uiElements.inputName.value.trim();
    const categoryValue = uiElements.inputCategory.value.trim();

    if (!nameValue || !categoryValue) return;

    const targetArray = state.isDraftMode ? state.draftProducts : state.products;
    const isDuplicate = targetArray.some(p => p.name.toLowerCase() === nameValue.toLowerCase());

    if (isDuplicate) {
        alert("Такой продукт уже есть!");
        return;
    }

    targetArray.push({
        id: Date.now(),
        name: nameValue,
        category: categoryValue,
        bought: false
    });

    uiElements.inputName.value = "";
    uiElements.inputCategory.value = "";
    uiElements.inputName.focus();

    applyFiltersAndRender();
}

function toggleProduct(productId) {
    const targetArray = state.isDraftMode ? state.draftProducts : state.products;
    const index = targetArray.findIndex(p => p.id === productId);

    if (index !== -1) {
        targetArray[index].bought = !targetArray[index].bought;
        applyFiltersAndRender();
    }
}

// Логика песочницы (Черновик)
function createDraft() {
    state.isDraftMode = true;
    state.draftProducts = structuredClone(state.products); // Глубокое копирование
    toggleDraftVisibility(true);
    applyFiltersAndRender();
}

function saveDraft() {
    state.isDraftMode = false;
    state.products = structuredClone(state.draftProducts);
    toggleDraftVisibility(false);
    applyFiltersAndRender();
}

function cancelDraft() {
    state.isDraftMode = false;
    state.draftProducts = [];
    toggleDraftVisibility(false);
    applyFiltersAndRender();
}

function setFilter(filterType, clickedButton) {
    state.currentFilter = filterType;

    uiElements.btnFilterAll.classList.remove("active-filter");
    uiElements.btnFilterNeed.classList.remove("active-filter");
    uiElements.btnFilterBought.classList.remove("active-filter");

    clickedButton.classList.add("active-filter");
    applyFiltersAndRender();
}

// 3. ПОДКЛЮЧЕНИЕ ПРОВОДОВ К ПАНЕЛИ УПРАВЛЕНИЯ (Слушатели)
uiElements.form.addEventListener("submit", handleAddProduct);

uiElements.btnCreateDraft.addEventListener("click", createDraft);
uiElements.btnSaveDraft.addEventListener("click", saveDraft);
uiElements.btnCancelDraft.addEventListener("click", cancelDraft);

uiElements.btnFilterAll.addEventListener("click", () => setFilter('ALL', uiElements.btnFilterAll));
uiElements.btnFilterNeed.addEventListener("click", () => setFilter('NEED', uiElements.btnFilterNeed));
uiElements.btnFilterBought.addEventListener("click", () => setFilter('BOUGHT', uiElements.btnFilterBought));

// 4. ПЕРВЫЙ ЗАПУСК СИСТЕМЫ
applyFiltersAndRender();