let temperature = 28;
// JS: &&
if (temperature < 0) {
  console.log("It's freezing outside!");
} else if (temperature >= 0 && temperature < 20) {
  console.log("It's quite cold outside.");
} else if (temperature >= 20 && temperature < 30) {
  console.log("It's warm outside.");
} else {
  console.log("It's hot outside.");
}
console.log("====================");

if (temperature < 0) {
  console.log("It's freezing outside!");
} else if (temperature < 20) {
  console.log("It's quite cold outside.");
} else if (temperature < 30) {
  console.log("It's warm outside.");
} else {
  console.log("It's hot outside.");
}
console.log("====================");

let number = 15;
// ternary operator
let result = number % 2 === 0 ? "Even" : "Odd";
console.log(result);
console.log("====================");

let age = 20;
let isAdult = age >= 18;
console.log(isAdult ? "You are an adult." : "You are not an adult.");
console.log("====================");

number = 7;
switch (number) {
  case 1:
    console.log("Monday");
    break;
  case 2:
    console.log("Tuesday");
    break;
  case 3:
    console.log("Wednesday");
    break;
  case 4:
    console.log("Thursday");
    break;
  case 5:
    console.log("Friday");
    break;
  case 6:
  case 7:
    console.log("Weekend");
    break;
  default:
    console.log("Invalid day number.");
}
console.log("====================");

// JS: ??
let myName; // undefined  
let result1 = myName ?? "Unknown";
console.log(result1); // Output: "Unknown"

let price = 25.5;
let discount = 5;
let finalPrice = price - (discount ?? 0);
console.log(finalPrice); // Output: 20.5
