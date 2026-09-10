// alt+shift+f - форматирование кода
//alt+shift+down - дублирование строки
//alt+shift+up - перемещение строки вверх
//ctrl+shift+f - поиск по проекту
//ctrl+shift+r - поиск и замена по проекту
//ctrl+shift+s -save all
//ctrl+shift+e - открыть проводник
//ctrl+shift+` - открыть терминал
//ctrl+` - открыть терминал
//Ctrl+F5 - run without debugging

//  ctrl+shift+v - markdown preview

let temperature = 118;
// Python: and or not
// JS: && || !

if (temperature < 0) {
  console.log("Очень холодно");
} else if (temperature >= 0 && temperature < 20) {
  console.log("Холодно");
} else if (temperature >= 20 && temperature < 30) {
  console.log("Тепло");
} else {
  console.log("Очень жарко");
}

if (temperature < 0) {
  console.log("Очень холодно");
} else if (temperature < 20) {
  console.log("Холодно");
} else if (temperature < 30) {
  console.log("Тепло");
} else {
  console.log("Очень жарко");
}

let number = 5;
console.log(number % 2 === 0 ? "Четное" : "Нечетное");

let age = 15;
let isAdult = age > 18;
console.log(isAdult ? "Совершеннолетний" : "Не достиг совершеннолетия");

// isAdult = age >= 18 ? true : false;
// console.log(isAdult); // not good

// console.log(age >= 18);

number = 5;
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
    console.log("Saturday");
    break;
  case 7:
    console.log("Sunday");
    break;
  default:
    console.log("Unknown day");
}

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
    console.log("Unknown day");
    // break;
}


let myName; //  для замены null или undefined на заданные данные
let result= myName ?? "Anonimus";
console.log(result); // Anonimus

let price= 25.5;
console.log(price ?? "Price not available"); // 25.5
