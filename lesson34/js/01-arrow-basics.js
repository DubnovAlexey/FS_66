function greet(name) {
    return `Hello, ${name}!`;
}

console.log(greet('John'))//Hello, John!

const greet1 = (name) => {
    return `Hello, ${name}!`;
}

console.log(greet1('John'));//Hello, John!

function sayHello() {
    console.log('Hello!');
}

const sayHello1 = () => {
    console.log('Hello!');
}

sayHello1();//Hello!

//Var1
const square = (number) => {
    return number * number;
}
//Var2
const square1 = number => {
    return number * number;
}

const sum = (a, b) => {
    return a + b;
}

console.log(sum(2, 3));//5
//Var1
const double = (number) => {
    return number * 2;
}
//Var2
const double1 = number => number * 2;

//Attention!!!

const fist= (a,b) => {
    return a + b;
};
const second = (a,b) => a + b;

//first EQ second

const third = (a,b) => {
    a + b;
};

//Return undefined third not good
//var1
const createUser = (name,age)=>{
    return{
        name: name,
        age: age
    };
};
//var2 Syntax Error
// const createUser1 = (name,age) => {
//         name: name,
//         age: age
//      };

const createUser1 = (name,age) =>(
    {
        name: name,
        age: age
    }
)

const createUser2 = (name,age) => (
    {
        name,
        age
    });

// Arrow function and Arrays

const numbers = [1, 2, 3, 4, 5];

const doubled= numbers.map(
    function ( number){
        return number * 2;
    }
);

const doubled1 = numbers.map(
    number => number * 2
);

const doubled2 = numbers.map(
    (number) => {
        return number * 2
    });

const ages=[15,33,22,67,11,55];

const adults = ages.filter(
    age => age >= 18
);

console.log(adults);//[ 33, 22, 67, 55 ]


const names = ["Anna", "David","Sarah"];

names.forEach(
    name => {
        console.log(`Hello ${name}`);
    }
); // Hello ...

const users5 = [
    { name: "Anna", age:28},
    { name: "David", age: 22},
    { name: "Sarah", age: 15}
];

const adults5 = users5.filter(
    ({age}) => age >= 18
);

console.log(adults5);