const app = document.querySelector("#app");

const productsFromList = [
    "Milk", "MILK", "Potato", "Cucumber", "BUTTER", "Butter", "BUTTER", "Butter", ""
]
const products =[];


function createUI(app) {
    const title = document.createElement("h1");
    title.textContent = "Список продуктов";
    app.append(title); //добавить в  DOM после элемента,  prepend - перед элементом
    const form = document.createElement("form");
    const input = document.createElement("input");
    input.type = "text"; //НЕ ОБЯЗАТЕЛЬНО - ЭТО ДЕФОЛТНОЕ ЗНАЧЕНИЕ
    input.placeholder = "Введите продукт";
    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Добавить";

    const addFromListButton = document.createElement("button");
    addFromListButton.type = "button";
    addFromListButton.textContent = "Добавить из списка";

    form.append(input, button, addFromListButton);
    const list = document.createElement("ul");
    app.append(form, list);
    return {form, input, list,  addFromListButton};
}

const {form, input, list, addFromListButton} = createUI(app);

function normalizeProductName(productName) {
    return productName.trim().toLowerCase();
}

function hasProduct(productName) {
    const normalizedName = normalizeProductName(productName);
    return products.some(product => normalizeProductName(product) === normalizedName)
}

function addProduct(productName) {
    if (hasProduct(productName) || !productName) {
        return
    }
    products.push(productName);
    const li = document.createElement("li");
    li.textContent = productName;
    list.append(li);
}


function handleAddProductFromList() {
    const uniqueProducts = [...new Set(productsFromList)];
    //new Set === Новый Set, [...new Set(productsFromList)] => новый массив
    productsFromList.forEach(addProduct)
    console.log(uniqueProducts);
}

addFromListButton.addEventListener("click", handleAddProductFromList);

list.addEventListener("click", (event) => {
    const li = event.target.closest("li");
    if (!li || !list.contains(li)) {
        return

    }
    event.target.classList.toggle("bought");
});


function handleSubmit(e) {
    e.preventDefault();
    const productName = input.value.trim();
    addProduct(productName);
    input.value = "";
    input.focus();
}

//addEventListener
form.addEventListener("submit", handleSubmit);