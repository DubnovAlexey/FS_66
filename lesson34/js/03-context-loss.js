"use strict";

const user={
    name: 'John',
    age: 30,
    showName() {
        console.log(`User name: ${this.name}`);
    }
};

user.showName();//User name: John

const show= user.showName;// ТАК БЫВАЕТ РЕДКО!!!
// show();//TypeError: Cannot read properties of undefined

// потеря контекста при передаче функции в качестве аргумента

const user1= {
    name5: 'John',
    showName() {
        console.log(`User name: ${this.name5}`);
    }
}

setTimeout(user1.showName,1000);//User name: undefined

// setTimeout(user1.showName(),1000);//   ERROR

//Var 1 решения стрелочная функция как обертка для
// вызова через объект обычной функции

setTimeout(() => user1.showName(),1000);//User name: John

//Var2 решения через bind
const boundShowName= user.showName.bind(user);
// bind(user) - создает новую функцию с привязанным контекстом

boundShowName();//User name: John

setTimeout(user.showName.bind(user),1000);//User name: John

user.showName.bind(user)();//User name: John
// user.showName.bind(user)//

//Var3 call()
console.log("========================");

function introduce(){
    console.log(`My name is ${this.name}`);
}

const user3= {
    name: 'John'
};

introduce.call(user3); //My name is John

console.log("***************************")
function introduce1 (city,country){
    console.log(`My name is ${this.name}, 
    I live in ${city}, ${country}`);
}

introduce1.call(user, "Haifa", "Israel"); //My name is John, I live in Haifa, Israel

//Var 4 apply()

introduce1.apply(user, ["Rehovot","Israel"]);//My name is John, I live in Rehovot, Israel



