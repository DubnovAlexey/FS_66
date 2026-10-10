import {add, multiply, subtract, divide} from "./math.js";
import {PI, getRectangleArea, getCircleArea, getCircleLength} from "./geometry.js";


// --- Логика переключения темы ---
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Слушаем клик по кнопке
themeToggleBtn.addEventListener('click', () => {
    // Переключаем класс 'light-theme' на теге <body>
    body.classList.toggle('light-theme');

    // Меняем текст на кнопке в зависимости от текущей темы
    if (body.classList.contains('light-theme')) {
        themeToggleBtn.textContent = '🌙 Dark Mode';
    } else {
        themeToggleBtn.textContent = '☀️ Light Mode';
    }
});
// --------------------------------


// 1. Выполняем математические вычисления
const mathResults = [
    `15 + 7 = ${add(15, 7)}`,
    `20 - 8 = ${subtract(20, 8)}`,
    `6 * 9 = ${multiply(6, 9)}`,
    `100 / 4 = ${divide(100, 4)}`,
    `10 / 0 = ${divide(10, 0)}`
];

// 2. Выполняем геометрические вычисления
const geoResults = [
    `Circle area (r=5): ${getCircleArea(5)}`,
    `Rectangle area (8x12): ${getRectangleArea(8, 12)}`,
    `Circle length (r=10): ${getCircleLength(10)}`
];

// 3. Вывод в консоль (Строго по ТЗ)
console.log("--- Math Operations ---");
mathResults.forEach(result => console.log(result));

console.log("\n--- Geometry Operations ---");
geoResults.forEach(result => console.log(result));

// 4. Вывод в DOM (Дополнительно для визуализации)
const resultContainer = document.getElementById("result");

// Функция для добавления блоков на страницу
function renderResults(title, resultsArray) {
    const section = document.createElement("div");
    section.className = "result-section";

    const heading = document.createElement("h2");
    heading.textContent = title;
    section.appendChild(heading);

    resultsArray.forEach(item => {
        const p = document.createElement("p");
        p.textContent = item;
        section.appendChild(p);
    });

    resultContainer.appendChild(section);
}

// Отрисовываем результаты на HTML странице
renderResults("Math Operations", mathResults);
renderResults("Geometry Operations", geoResults);


// // variant 2

// const result1 = add(15, 7);
// const result2 = subtract(20, 8);
// const result3 = multiply(6, 9);
// const result4 = divide(100, 4);
// const result5 = divide(10, 0);

// console.log("--- Math Operations ---");
// console.log(`Addition: ${result1}`);
// console.log(`Subtraction: ${result2}`);
// console.log(`Multiplication: ${result3}`);
// console.log(`Division: ${result4}`);
// console.log(`Division by zero: ${result5}`);
// console.log(`Value of PI: ${PI}`);
//
// console.log("--- Geometry Operations ---");
// const res1 =  getRectangleArea(8, 12);
// const res2 = getCircleArea(5);
// const res3 = getCircleLength(10);
//
// console.log(`Area of circle with radius 5: ${res2}`);
// console.log(`Area of rectangle with sides 8 and 12: ${res1}`);
// console.log(`Length of circle with radius 10: ${res3}`);