function greet(name) { // параметр функции name
    console.log(`Hello, ${name}!`);
}
greet("Anna")  // аргумент функции "Anna"

function calculatePrice(price,quantity){
    return price * quantity;
}

console.log(calculatePrice(100,3))//300

function subtract(a,b){
    return a - b;
}

console.log(subtract(10,5))//5
console.log(subtract(5,10))//-5

function showUser(name,age){
    console.log(`Hello, ${name}!`);
    console.log(`You are ${age} years old`);
}

showUser("Anna") // Anna undefined
showUser("Vasya",25,"Haifa")//Vasya 25
// arguments !!!!!!

function greet1(name = "Guest"){
    console.log(`Hello, ${name}!`);
}

greet1("Anna")// Anna
greet1()//Guest
greet1(undefined)//Guest
greet1(null)//null
greet1("")//пустая строка

console.log("=======RestParams=====")

function sum(...numbers){ // массив остаточных аргументов
    console.log(numbers)
    let result=0;
    for(let number of numbers){
        result+=number;
    }
    return result;
}

console.log(sum(5))// [5]  5
console.log(sum(1,2,3))// [1,2,3] 6
console.log(sum(1,2,3,4,5,6,7))  // [1,2,3,4,5,6,7] 28

function showProducts(category,...products){
    console.log(`Category: ${category}`);
    console.log(products);
}

showProducts("Electronics","TV","Phone","Laptop")
showProducts("Clothes","Shirt","Pants","Shoes")


console.log("=======arguments устаревшее решение=====")

function showArguments(a,b){
    console.log(arguments); // 1,2,3,4,5,6,7
    console.log(arguments.length) //7
}

showArguments(1,2,3,4,5,6,7)

console.log("=======arguments ПСЕВДОМАССИВ устаревшее решение=====")
// у него очень мало доступных методов и
// его нет в стрелочных функциях

function test(a=5, ...rest){
    console.log(a)
    console.log(rest);
}

test(undefined,10,20)