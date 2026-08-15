let number=5;
do { // do while - выполняется хотя бы один раз
    console.log('Hello');
    number--;
} while (number>0); // do while - выполняется хотя бы один раз

console.log('----------1---------');

let number1=2;
do { // do while - выполняется хотя бы один раз
    console.log(number1);
    number1 *= 2;  // 2,4,8,16,32,64,128,256,512,1024
} while (number1<2050); // do while - выполняется хотя бы один раз
console.log('--------2-----------');

let fruits = ['apple', 'banana', 'cherry', 'date'];
for (let i = 0; i < fruits.length; i++) { // for - выполняется для каждого элемента массива
    fruits[i] = fruits[i] + "!"; // добавляем в конец каждого элемента массива "!"
console.log(fruits);
}
console.log('--------3-----------');

let count = 0;
while (count < fruits.length) { // while - выполняется пока условие true
    console.log(`${count+1}. ${fruits[count]}`); // выводим каждый элемент массива с его порядковым номером
    count+=1;
}
console.log('--------4-----------');

for(let fruit of fruits){  // for of - выполняется для каждого элемента массива
    console.log(fruit); // выводим каждый элемент массива
     fruit = "kiwi"; // изменяем значение переменной fruit, но не изменяем сам массив
console.log(fruit); // выводим измененное значение переменной fruit
} // else - выполняется для каждого элемента массива
console.log(fruits); // выводим массив, чтобы показать, что он не изменился