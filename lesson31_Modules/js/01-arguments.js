function greet(name){ // parameter 'name' is used to greet the user
    console.log(`Hello, ${name}!`);
}

greet("Alice"); // argument "Alice" is passed to the function, which will be used as the value for the parameter 'name'

function calculatePrice(price, quantity){ // parameters 'price' and 'quantity' are used to calculate the total price
    return price * quantity;
}

console.log(calculatePrice(100, 3)); // arguments 100 and 3 are passed to the function, which will be used as the values for the parameters 'price' and 'quantity' 300

function subtract(a, b){ // parameters 'a' and 'b' are used to perform subtraction
    return a - b;
}

console.log(subtract(10, 5)); // arguments 10 and 5 are passed to the function, which will be used as the values for the parameters 'a' and 'b' 5
console.log(subtract(5, 10)); // arguments 5 and 10 are passed to the function, which will be used as the values for the parameters 'a' and 'b' -5

function showUser(name,age){
    console.log(`Hello, ${name}!`);
    console.log(`You are ${age} years old`);
}

showUser("Anna"); // argument "Anna" is passed to the function, which will be used as the value for the parameter 'name'. The parameter 'age' is not provided, so it will be undefined.

showUser("Vasya", 25, "Haifa"); // arguments "Vasya" and 25 are passed to the function, which will be used as the values for the parameters 'name' and 'age') // argument "Haifa" is passed to the function, but there is no corresponding parameter for it, so it will be ignored.

function greet1(name = "Guest"){ // parameter 'name' has a default value of "Guest"
    console.log(`Hello, ${name}!`);
}
greet1("Alice"); // argument "Alice" is passed to the function, which will be used as the value for the parameter 'name'
greet1(); // no argument is passed to the function, so the default value "Guest" will be used for the parameter 'name'
greet1() // no argument is passed to the function, so the default value "Guest" will be used for the parameter 'name'
greet1(undefined) // argument 'undefined' is passed to the function, so the default value "Guest" will be used for the parameter 'name'
greet1(null) // argument 'null' is passed to the function, so the value 'null' will be used for the parameter 'name'
greet1("") // argument '' (empty string) is passed to the function, so the value '' (empty string) will be used for the parameter 'name'


console.log("======== Rest Parameters ========");
function sum(...numbers){ //массив остаточных элементов 'numbers' collects all the arguments passed to the function
    console.log(numbers); // 'numbers' is an array that collects all the arguments passed to the function
    let result = 0;
    for(let number of numbers){ // 'number' is a variable that iterates over each element in the 'numbers' array
        result += number;
    }
    return result;
}
sum(5); // [5] arguments 5, 10, and 15 are passed to the function, which will be collected into the 'numbers' array parameter
sum(5, 10, 15); // [5, 10, 15] arguments 5, 10, and 15 are passed to the function, which will be collected into the 'numbers' array parameter
sum(1, 2, 3, 4, 5); // [1, 2, 3, 4, 5] arguments 1, 2, 3, 4, and 5 are passed to the function, which will be collected into the 'numbers' array parameter

function showProducts(category,...products){
    console.log(`Category: ${category}`);
    console.log(products);
}

showProducts("Electronics","TV","Phone","Laptop")
showProducts("Clothes","Shirt","Pants","Shoes")

console.log("======== Arguments устаревшее решение ========");

function showArguments(a, b){
    console.log(arguments); // 'arguments' is an array-like object that contains all the arguments passed to the function
    console.log(arguments.length);
}
showArguments(1,2,3,4,5,6,7);
console.log("псевдо-массив arguments не является массивом, поэтому у него нет методов массива, таких как forEach, map, filter и т.д. Чтобы использовать эти методы, нужно преобразовать его в массив с помощью Array.from() или spread-оператора [...arguments].");