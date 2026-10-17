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

const user1 ={
    name: "Alice",
    city:null
}

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

console.log(user2.name, user2.address.city) // Bob London

const {name, address:{city , street, zip}} = user2;
console.log(name, zip)

console.log("===деструктуризация массивов")

