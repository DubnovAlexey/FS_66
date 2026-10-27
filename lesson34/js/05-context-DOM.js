"use strict"

const button= document.querySelector("#demoButton");

// при вызове через addEventListener
// this будет элементом, на котором зарегистрирован обработчик

// button.addEventListener("click", function(){
// 	console.log(this);
//     console.log(this.textContent);
// });

// button.addEventListener("click", ()=>{
// 	console.log(this);
// }); //window
console.log("==============================")
button.addEventListener("click", (event)=>{
    console.log(event.currentTarget);
});//Элемент на котором зарегистрирован обработчик

// разница между target и currentTarget

button.addEventListener("click", (event)=>{
    console.log(event.target);
});//Элемент на котором случилось событие



//arguments and arrows

function showArguments(){
    console.log(arguments);
}

showArguments(10,20,30,40);

// const showArgumentsArrow = ()=>{
// 	console.log(arguments);//Error
// }
//
// showArgumentsArrow(10,20,30,40);

const showArgumentsArrow = (...args)=>{
    console.log(args);
}

showArgumentsArrow(10,20,30,40);// [10, 20, 30, 40]

// Arrows and NEW

function User(name){
    this.name = name;
}

const user = new User("John");
console.log(user.name);//


const UserArrow = (name)=>{
    this.name = name;
};
// const userArrow= new UserArrow("Vasya");//ERROR


/*
                    обычная функция         стрелочная функция
синтаксис           function(0){}             ()=>{}
собственный this    да, см.способ вызова    нет, исп.внешний
NEW                         да                  нет
arguments                   да                  нет
call/apply/bind         меняют this             нет
краткий return           нет                    да
Удобство для callbacks    да                да, особенно при
                                            необходимости внешнего this
 */

// Обычная  функция - когда нам нужен метод объекта,
// когда нам нужен конструктор,
// когда нам нужен this от DOM-элемента в обработчике

// Стрелочная функция - когда нам нужен this от внешнего
// контекста, для коротких преобразований,
// для преобразований массивов-фильтр-мэп-форИч
// для работы с DOM-элементами, если не нужен собственный this









