console.log("02-selectors.js started");

const title = document.querySelector("#shopTitle");
console.log(title);
console.log(typeof title);
console.log(title.textContent);

const product = document.querySelector(".product");
console.log(product);
console.log(typeof product);
console.log(product.textContent);

const products = document.querySelectorAll(".product");
console.log(products);
console.log(typeof products);
console.log(products.length);

products.forEach((product) =>{
    console.log(product.textContent);
})


// variable -> collection -> forEach -> callback function -> product.textContent

const prices = document.querySelectorAll("#price");
console.log(prices);
console.log(price.textContent);