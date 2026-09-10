// Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

// npm init

// npm install axios



//     https://api.open-meteo.com/v1/forecast?latitude=44.49&longitude=20.27&current_weather=true


// "type": "commonjs",  ->   "type": "module",

// Example of commonjs module export and import
// const {validateEcmascriptText} = require("./service/validate.js");
// module.exports = {validateEcmascriptText};


// =====================================63-23=

// https://jsonplaceholder.typicode.com/posts

//==========================================

// https://aistudio.google.com/api-keys

//  ???????????????????????????????????????????????????????

// npm install @google/genai
//===================================================


/*
a) Создайте несколько объектов-продуктов. В каждом объекте
должно быть поле name (название), description(описание), price(цена),
info (функция, которая формирует строку вида:
`товар: notebook lenovo thinkpad; цена: 1283 описание: cpu intel core7, ram:16gb ...`

b) создайте конструктор для создания объектов-товаров.
Создайте несколько товаров

с) Создайте массив из товаров. Напишите функцию, которая
выводит в консоль информацию о всех товарах в виде:
```
Tовар 1
    name: notebook lenovo thinkpad
    price: 1283
    description: .....
    info: ....
```
т.е. `поле: значение` При этом: поля, которые являются
функциями, нужно выводить результат работы функции
(не текст функции)


*/

//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa

let item1 = {
    name: "notebook lenovo thinkpad",
    price: 1283,
    description: "cpu intel core7, ram:16gb",
    info: infoFunction
}


console.log(item1);
console.log(item1.info());

let item2 = new Product("Acer N53",1600, "Игровой ноутбук");
item2.note = 'пробная партия';
console.log("------------------------");
console.log(item2);
console.log(item2.info());


//bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
function Product(name, price, description){
    this.name = name;
    this.price = price;
    this.description = description;
    this.info = infoFunction
}

function infoFunction(){
    return `товар: ${this.name}; цена: ${this.price} описание: ${this.description}`;
}

//ccccccccccccccccccccccccccccccccccccccccccccccccc
const arr = [item1, item2, new Product("Смартфон iphone 20pro","24 камеры",10000)];
console.log(arr);
console.log(arr[2]);
console.log("--------printArray----------------");
printArray(arr)

console.log("---------printArray2--------------");
printArray2(arr)




function printArray(arr){
    if(!Array.isArray(arr)){
        console.log("неопознанный параметр");
        return;
    } else {
        for(let i=0; i<arr.length; i++){
            console.log(`Товар ${i+1}`);
            let item = arr[i];
            for(let key in item){
                let value = typeof(item[key])!=='function'? item[key]:item[key]();
                console.log(`   ${key}:${value}`)
            }
        }

    }

}

function printArray2(arr){
    if(!Array.isArray(arr)){
        console.log("неопознанный параметр");
        return;
    } else {
        arr.forEach((item, i) =>{
            console.log(`Товар ${i+1}`);
            for(let key in item){
                let value = typeof(item[key])!=='function'? item[key]:item[key]();
                console.log(`   ${key}:${value}`)
            }
        })

    }

}