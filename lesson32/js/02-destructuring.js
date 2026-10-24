const user = {
    name: "John",
    age: 30,
    city: "New York"
}

// const name=user.name;
// const age=user.age;
// const city=user.city;
//
// console.log(name,age,city)

// const {name,age,city}=user;
// console.log(name,age,city)

// const {city,name} = user;
// console.log(name,city)

// const {city = "Unknown",name : userName} = user;
// console.log(userName,city)

// const user1 ={
//     name: "Alice"
// }
//
// const {city = "Unknown",name : userName} = user1;
// console.log(userName,city) // Alice unknown

// const user1 ={
//     name: "Alice",
//     city:null
// }
//
// const {city = "Unknown",name : userName} = user1;
// console.log(userName,city) // Alice null

console.log("====Вложенная деструктуризация")

const user2= {
    name:"Bob",
    address:{
        city:"London",
        street:"123 Main St",
        zip:"12345"
    }
}

console.log(user2.name,user2.address.city) // Bob London

const {name, address:{city,street,zip}}=user2;
console.log(name, zip)//bob 12345

console.log("====Деструктуризация массивов")
const colors = ["red", "green", "blue"];
// const first=colors[0];
// const second=colors[1];
// console.log(first, second)// red green

// const  [first,second] = colors;
// console.log(first, second) // red green

const [first,,third]=colors;
console.log(third);//blue

console.log("======SWAP=====");
let a=10;
let b=20;
console.log(a,b);//10,20
// const temp=a;
// a = b;
// b=temp;
// console.log(a,b)//20,10

[a,b]=[b, a]
console.log(a, b)//20,10

console.log("====Деструктуризация параметров функции====")

function printUser({name,age,zip}){
    console.log(name,age,zip)
};
// function printUser(user){
//     const {name,age}=user;
//     console.log(name,age);
// };  // так не принято

const user3={
    name:"Alice",
    age:30,
    city: "NY"

}

printUser(user3) //Alice 30 undefined