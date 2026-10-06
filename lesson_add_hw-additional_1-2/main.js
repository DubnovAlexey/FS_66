import {askAi} from "./aiService.js";

const app = document.querySelector("#app");

import { createUI } from "./ui.js";

const productsFromList = [
    "Milk", "MILK", "Potato", "Cucumber", "BUTTER", "Butter", "BUTTER", "Butter", ""
]
const products =[];


const {
    form,
    input,
    list,
    addFromListButton,
    dishForm,
    dishInput,
    missingProductsList
} = createUI(app);


function normalizeProductName(productName) {
    return productName.trim().toLowerCase();
}

function hasProduct(productName) {
    const normalizedName = normalizeProductName(productName);
    return products.some(product => normalizeProductName(product) === normalizedName)
}

function addProduct(productName) {
    const cleanName = productName.trim();
    if (!cleanName || hasProduct(cleanName)) {
        return
    }
    products.push(cleanName);
    const li = document.createElement("li");
    li.textContent = cleanName;
    list.append(li);
}


function handleAddProductFromList() {
    const uniqueProducts = [...new Set(productsFromList)];
    console.log("Before for Each", uniqueProducts);
    //new Set === Новый Set, [...new Set(productsFromList)] => новый массив
    productsFromList.forEach(addProduct);
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

//dish addEventListener
dishForm.addEventListener("submit", handleDishSubmit);


async function handleDishSubmit(e) {
    e.preventDefault();
    const dishTitle = dishInput.value.trim();
    if (!dishTitle){
        return;
    }
    try{
        const answer = await askAi(dishTitle);
        console.log(answer);
        const parsedProducts = parseAiProducts(answer);
        const missingProducts = getMissingProducts(parsedProducts);
        renderMissingProducts(missingProducts);
        dishInput.value = "";
        dishInput.focus();
    }catch(e) {
        console.error(e);
    }


}

function parseAiProducts(answer){
    let parsedProducts;
    try{
        parsedProducts = JSON.parse(answer);
    }catch(e){
        throw  new Error("Gemini returned invalid JSON");
    }
    if(!Array.isArray(parsedProducts)) {
        throw  new Error("Gemini returned not an array");
    }
    return parsedProducts;
}

function getMissingProducts(recipeProducts) {
    return recipeProducts.filter(product => {
        return !hasProduct(product)
    })
}

function renderMissingProducts(productsArray) {
    missingProductsList.innerHTML = "";

    productsArray.forEach(product => {
        const li = document.createElement("li");
        li.textContent = product;
        missingProductsList.append(li);
    })
}