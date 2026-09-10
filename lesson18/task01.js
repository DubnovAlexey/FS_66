const user = {
  id: 7,
  name: "John",
  age: 25,
  "is Admin": true,
};
console.log(user);
console.log(user.age);
// console.log(user."is Admin"); ERROR
console.log(user["age"]);
console.log(user["is Admin"]);
let myField = "is Admin";
console.log(user[myField]);
 
console.log("=================");
 
for (let key in user) {
    // console.log(user.key);    ERROR
    console.log(key,user[key]);    
  console.log(`${key} -->> ${user[key]}`);
}
 
const fruts=["apple","kiwi","banana"]
for (frut of fruts){
    console.log(frut);    
}
 
for (frut in fruts){ // not good  ERROR
    console.log(frut,fruts[frut]);    
}
