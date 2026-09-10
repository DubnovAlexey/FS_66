// массивы
console.log("== Arrays ==");

let fruits = ["apple", "banana", "orange"]; // Создаем массив фруктов
console.log(fruits[0]); // Output: "apple"
console.log(fruits.length); // Output: 3
console.log("====================");

let numbers = [1, 2, 3, 4, 5];
numbers[2] = 10; // Изменяем значение элемента с индексом 2
console.log(numbers);
console.log("====================");

const colors = ["red", "green", "blue"];
colors.push("yellow"); // Добавляем элемент в конец массива
console.log(colors);
console.log("====================");

// добавление элементов в начало массива
const animals = ["cat", "dog", "rabbit"];
animals.unshift("hamster"); // Добавляем элемент в начало массива
console.log(animals);
console.log("====================");

// удаление элементов из массива
const fruits1 = ["apple", "banana", "orange"];
fruits1.pop(); // Удаляем последний элемент массива
console.log(fruits1);
fruits1.shift(); // Удаляем первый элемент массива
console.log(fruits1);
console.log("====================");

const animals1 = ["cat", "dog", "rabbit"]; // Создаем массив животных
for (let i = 0; i < animals1.length; i++) {
  // Перебираем массив с помощью цикла for
  console.log(animals1[i]);
}
console.log("====================");

// перебор массива с помощью for...of
const colors1 = ["red", "green", "blue"];
for (const color of colors1) {
  console.log(color); // Output: "red", "green", "blue"
}
console.log("====================");

// перебор массива с помощью forEach
const numbers1 = [1, 2, 3, 4, 5];
numbers1.forEach(function (number) {
  console.log(number); // Output: 1, 2, 3, 4, 5
});
console.log("====================");

// перебор массива с помощью forEach и стрелочной функции
const fruits2 = ["apple", "banana", "orange"];
fruits2.forEach((fruit) => console.log(fruit)); // Output: "apple", "banana", "orange"
console.log("====================");

const fruits3 = ["apple", "banana", "orange"];
fruits3.splice(1, 2, "grape", "kiwi", "mango"); // Удаляем 2 элемента с индекса 1 и добавляем новые элементы "grape" и "kiwi"
console.log(fruits3); // Output: ["apple", "grape", "kiwi", "mango", "orange"]
