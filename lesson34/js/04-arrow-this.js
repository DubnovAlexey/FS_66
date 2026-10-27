// стрелочная функция использует this из окружающей
// лексической области

"use strict";

// const user = {
//     name: "John",
//
//     showName() {
//         console.log("Outer:",this.name); //John
//
//         function inner() {
//             console.log("Inner:",this.name); //ERROR
//         }
//
//         inner();// undefined
//     }
// };
// user.showName();

const user1 = {
    name: "John",

    showName() {
        console.log("Outer:",this.name); //John

        const inner= () => {
            console.log("Inner:",this.name); //John
        }

        inner();// user1
    }
};
user1.showName();

const user2 = {
    name1: "John",

    showName: () => {
        console.log(this.name1)//undefined
    }
};
user2.showName();

const user3 = {
    name1: "John",

    showName(){
        console.log(this.name1)//John
    }
};
user3.showName();

const user4 = {
    name1: "John",

    showName: function(){
        console.log(this.name1)//John
    }
};
user4.showName();


