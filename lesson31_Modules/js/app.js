import { add, subtract, multiply } from './math.js';

const result = add(5, 3);
console.log(`Addition: ${result}`);

const result2 = subtract(10, 4);
console.log(`Subtraction: ${result2}`);

const result3 = multiply(6, 7);
console.log(`Multiplication: ${result3}`);

// app.js uses math.js
//app.js dependency on math.js

import { PI } from './math.js';
console.log(`Value of PI: ${PI}`);


console.log("========================================");

import {users, getAdult as filterAdults} from "./users.js";
// import renderUsers from "./ui.js"; // {} не нужны, так как мы экспортируем по умолчанию
import showUsers from "./ui.js";

// console.log(users);
// const adults = getAdult(users);
// console.log("Adult Users:", adults);

const container = document.querySelector("#result");
const adults = filterAdults(users);

// renderUsers(adults, container);
showUsers(adults, container); // renderUsers is default export, so we can use any name for it

console.log("========================================");

