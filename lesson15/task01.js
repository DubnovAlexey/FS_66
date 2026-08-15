console.log("Hello");


// alt+shift+f - форматирование кода
//alt+shift+down - дублирование строки
//alt+shift+up - перемещение строки вверх
//ctrl+shift+f - поиск по проекту
//ctrl+shift+r - поиск и замена по проекту
//ctrl+shift+s -save all
//ctrl+shift+e - открыть проводник
//ctrl+shift+` - открыть терминал
//Ctrl+F5 - run without debugging



let user = {
    name: "John Doe",
    age: 32,
    isAdmin: true,
    email: "john.doe@example.com",
    city: "New York",
}

console.log(user.name); // John Doe
console.log(user.age);
console.log(user.isAdmin);
console.log(user.email);
console.log(user.city);
console.log(user); // { name: 'John Doe', age: 32, isAdmin: true, email: '


console.log(user["name"]); // John Doe
console.log(user["age"]); // 32
console.log(user["isAdmin"]); // true
console.log(user["email"]); // john.doe@example.com
console.log(user["city"]); // New York

let fildName = "name";
console.log(user[fildName]); // John Doe

console.log("============"); 
// JSON (JavaScript Object Notation) - формат обмена данными, который используется для хранения и передачи данных между сервером и клиентом. JSON является текстовым форматом, который легко читается и пишется людьми, а также легко парсится и генерируется машинами.
console.log(user); // { name: 'John Doe', age: 32, isAdmin: true, email: '
console.log("============"); 

let userJSON = JSON.stringify(user); // преобразуем объект в JSON-строку
console.log(userJSON); // {"name":"John Doe","age":32,"isAdmin":true,"email":"john.doe@example.com","city":"New York"}

console.log(typeof userJSON); // string
console.log(user.name); // John Doe
console.log(userJSON.name); // undefined


let productJSON = '{"name":"iPhone 12","price":999,"inStock":true}'; // JSON-строка
let product = JSON.parse(productJSON); // преобразуем JSON-строку в объект
console.log(typeof product);
console.log(product.name); // iPhone 12



















