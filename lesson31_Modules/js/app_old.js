// console.log("App started");

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

const result1 = add(5, 3);
const result2 = subtract(10, 4);
const result3 = multiply(6, 7);

console.log(`Addition: ${result1}`);
console.log(`Subtraction: ${result2}`);
console.log(`Multiplication: ${result3}`);

const users = [
    {id:1, name: "John", age: 30},
    {id:2, name: "Jane", age: 17},
    {id:3, name: "Bob", age: 40}
];

function getAdultUsers(users) {
    return users.filter(user => user.age >= 18);
}

const adults = getAdultUsers(users);
console.log("Adult Users:", adults);

const result = document.querySelector("#result");

function renderUsers(users) {
    users.forEach(user => {
        const p = document.createElement("p");
        p.textContent = `${user.name} is ${user.age} years old`;
        result.appendChild(p);
    }); // Render users to the DOM
}

renderUsers(adults); // Call the function to render adult users