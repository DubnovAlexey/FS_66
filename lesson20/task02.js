// map

const numbers = [1, 5, 2, 9, 4];
const result = numbers.map((num) => num * 10);
console.log("Массив после изменения:", result);
const elemPow2 = function(e) {
    return e * e;
};
const result1=numbers.map(elemPow2);
console.log("Массив после возведения в квадрат:", result1);

const fruits = ["apple", "banana", "cherry", "kiwi"];
console.log("Массив до изменения:", fruits);
const result2 = fruits.map((fruit) => fruit.length);
console.log("Массив после изменения:", result2);