// hw17text
/*
1. Напишите программу,
которая проверяет проверяет и печаттает вердикт , 
является ли целое положительное
число любой длины счастливым попозиционно!
ЕСЛИ  Сумма цифр на четных позициях равна 
сумме цифр на нечетных позициях - число счастливое,
ИНАЧЕ нет. 
1210 - 1+1 = 2+0 счастливое
135 - 1+5 != 3 не счастливое 

2. Напишите программу,
которая проверяет и печаттает вердикт , 
является ли целое положительное
число  длины 6 цифр счастливым зеркално!
ЕСЛИ  Сумма перваых 3 цифр равна 
сумме цифр на последних 3 позициях - число счастливое,
ИНАЧЕ нет. 
123420 -1+2+3 = 2+0 счастливое

712004- 7+1+2 != 0+0+4 не счастливое 
*/

console.log("1====================");
let number = 1211;
let numberStr = String(number);
let evenNum = 0;
let oddNum = 0;

for (let i = 0; i < numberStr.length; i++) {
  if (i % 2 === 0) {
    evenNum += +numberStr[i];
  } else {
    oddNum += +numberStr[i];
  }
}

if (evenNum === oddNum) {
  console.log("Счастливое число");
} else {
  console.log("Не счастливое число");
}

console.log("2====================");

number = 123421;
numberStr = String(number);

let sum_first_half_number = 0;
let sum_second_half_number = 0;

for (let i = 0; i < numberStr.length; i++) {
  if (i < 3) {
    sum_first_half_number += +numberStr[i];
    //+numberStr[i] - преобразует строку в число(унраный плюс)
  } else {
    sum_second_half_number += +numberStr[i];
  }
}

if (sum_first_half_number === sum_second_half_number) {
  console.log("Счастливое число");
} else {
  console.log("Не счастливое число");
}

console.log("3====================");

let sum1 = 0;
let sum2 = 0;
let pos = 1;
let num = 3234;
while (num != 0) {
  if (pos % 2 == 0) {
    sum1 += num % 10;
  } else {
    sum2 += num % 10;
  }
  num = (num - (num % 10)) / 10;
  pos++;
}
if (sum1 === sum2) {
  console.log("Счастливое число");
} else {
  console.log("Не счастливое число");
}

console.log("4====================");

num = 3234;
sum1 = 0;
sum2 = 0;
while (num) {
  sum1 += num % 10;
  num = (num - (num % 10)) / 10;
  sum2 += num % 10;
  num = (num - (num % 10)) / 10;
}

if (sum1 === sum2) {
  console.log("Счастливое число");
} else {
  console.log("Не счастливое число");
}

console.log("5====================");
num = 1234;
let sum = 0;
while (num) {
  sum = (num % 10) - sum;
  num = (num - (num % 10)) / 10;
}
if (sum === 0) {
  console.log("Счастливое число");
} else {
  console.log("Не счастливое число");
}

console.log("6====================");
num = 623452;
sum = 0;
let first = (num - (num % 1000)) / 1000;
let last = num % 1000;
for (let i = 1; i <= 3; i++) {
  sum = sum + (first % 10) - (last % 10);
  last = (last - (last % 10)) / 10;
  first = (first - (first % 10)) / 10;
}
if (sum === 0) {
  console.log("Счастливое число");
} else {
  console.log("Не счастливое число");
}

console.log("7====================");
num = 623452;

last =
  (last - (last % 100)) / 100 +
  (((last - (last % 10)) / 10) % 10) +
  (last % 10);
first =
  (first - (first % 100)) / 100 + (first - (first % 10)) / 10 + (first % 10);

if (last === first) {
  console.log("Счастливое число");
} else {
  console.log("Не счастливое число");
}
