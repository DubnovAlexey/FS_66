//reduce

const numbers = [1, 5, 2, 9, 4];
const sum = numbers.reduce((accumulator, currentValue) =>
    accumulator + currentValue, 0);
console.log("Сумма всех элементов массива:", sum);
const mult=numbers.reduce((acc , n) =>
    acc  * n, 1);
console.log("Произведение всех элементов массива:", mult);
const mult1=numbers.reduce((acc , n) =>
    acc  * n);
console.log("Произведение всех элементов массива:", mult1);
const concat=numbers.reduce((acc , n) =>
    acc  + n, "");
console.log("Конкатенация всех элементов массива:", concat);
const avgResult=numbers.reduce((acc,n) => acc + n, 0)/numbers.length;
console.log("Среднее арифметическое всех элементов массива:",
    avgResult);