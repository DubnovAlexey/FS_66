console.log("====== Arrays ======");

let arr = [1, 2, 3, 4, 5];
console.log(arr[0]);
console.log(arr);
arr = ["a", "b", "c", "d", 1, 2, 3, false, true];
console.log(arr[0]);
console.log(arr);

const fruits = ["apple", "banana", "orange"];
console.log(fruits[0]);
console.log(fruits);
fruits[1] = "grape";
console.log(fruits);
// fruits=["kiwi", "mango", "pear"];
// console.log(fruits);  ERROR: Assignment to constant variable.

// добавление элемента в конец массива
fruits.push("kiwi");
console.log(fruits);
//добавление элемента в начало массива
fruits.unshift("mango");
console.log(fruits);
// удаление последнего элемента массива
fruits.pop();
console.log(fruits);
// удаление первого элемента массива
fruits.shift();
console.log(fruits);

fruits.push("pear", "watermelon");
console.log(fruits);
fruits.unshift("strawberry", "blueberry");
console.log(fruits);
const myFruits = ["tomato", "cucumber"];
console.log(fruits.push(myFruits));
console.log(fruits);
console.log("==========================");

console.log(fruits.pop());
console.log(fruits);
console.log("==========================");
console.log(fruits.shift());
console.log(fruits);
// CRUD - Create, Read, Update, Delete

console.log(fruits.splice(1, 2, "tomato", "cucumber", "carrot"));
console.log(fruits);
//  start index, how many elements to remove, new elements to add
console.log(fruits.length);

//HW16TEXT
// 1. В файле 1 создайте массив с числами от 1 до 10. Выведите его в консоль.
// для пунктов 2-5 используйте методы массива push, shift, pop , unshiftи length соответственно. 
// 2. Добавьте в конец массива число 11 , а в начало 0 и выведите массив в консоль.
// 3. Удалите первый и последний элемент массива и выведите массив в консоль.
// 4. Замените третий элемент массива на число 99 и выведите массив в консоль.
// 5. Выведите длину массива в консоль.
// 6. В файле 2 повторите пункты 1-5, но используйте методы массива splice и length соответственно.