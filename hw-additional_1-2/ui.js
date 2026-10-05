export function createUI(app) {
    const title = document.createElement("h1");
    title.textContent = "Список продуктов";

    // Форма добавления продукта
    const form = document.createElement("form");

    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Введите продукт";

    const addButton = document.createElement("button");
    addButton.type = "submit";
    addButton.textContent = "Добавить";

    const addFromListButton = document.createElement("button");
    addFromListButton.type = "button";
    addFromListButton.textContent = "Добавить из списка";

    form.append(
        input,
        addButton,
        addFromListButton
    );

    // Текущий список продуктов
    const listTitle = document.createElement("h2");
    listTitle.textContent = "Список продуктов для покупки";

    const list = document.createElement("ul");

    // Форма поиска ингредиентов блюда
    const dishTitle = document.createElement("h2");
    dishTitle.textContent = "Что хотим приготовить?";

    const dishForm = document.createElement("form");

    const dishInput = document.createElement("input");
    dishInput.type = "text";
    dishInput.placeholder = "Например, борщ";

    const findMissingButton = document.createElement("button");
    findMissingButton.type = "submit";
    findMissingButton.textContent = "Найти недостающие";

    dishForm.append(
        dishInput,
        findMissingButton
    );

    // Здесь позже покажем результат
    const missingTitle = document.createElement("h2");
    missingTitle.textContent = "Недостающие продукты";

    const missingProductsList = document.createElement("ul");

    app.append(
        title,
        form,
        listTitle,
        list,
        dishTitle,
        dishForm,
        missingTitle,
        missingProductsList
    );

    return {
        form,
        input,
        list,
        addFromListButton,
        dishForm,
        dishInput,
        missingProductsList
    };
}