{
    let age=28;
    console.log(age);//28
}

// console.log(age);//ReferenceError

{
    var b=28;
}
console.log(b);//28

function test(){
    var message="Hello"
}

test();
// console.log(message);//ReferenceError

var number11=20;
var number11=30;
console.log(number11);//30

let number22=22;
// let number22=33; //Error

console.log("==== Hoisting and TDZ");

console.log(a);
var a=10;//undefined

console.log(b);
// let b=20; //SyntaxError

console.log("==== let and const");

const user = {
    name:"John",
    age:30
}

user.name ="Anna";
console.log(user.name);//Anna

// user = 123;//Error

console.log("==== var and let in loops");

for (var i=0; i<5; i++) {
    setTimeout(()=>{
        console.log(i);
    },100);
}

for (let j=0; j<5; j++) {
    setTimeout(()=>{
        console.log(j);
    },100);
}