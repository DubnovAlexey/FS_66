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

/* ===========================================================
   ЗАДАНИЕ 1
   Целое положительное число ЛЮБОЙ длины счастливое "попозиционно",
   если сумма цифр на нечётных позициях равна сумме цифр
   на чётных позициях. Позиции считаются слева направо, с 1

   =========================================================== */

   function analyzePositional(number) {
  const digits = String(number).split('').map(Number); // преобразуем число в массив цифр
  const oddDigits = [];  // цифры на нечётных позициях: 1-я, 3-я, 5-я...
  const evenDigits = []; // цифры на чётных позициях: 2-я, 4-я, 6-я...

  digits.forEach((digit, index) => { // index начинается с 0, поэтому добавляем 1 для позиции
    const position = index + 1;
    if (position % 2 === 0) {
      evenDigits.push(digit);
    } else {
      oddDigits.push(digit);
    }
  });

  const oddSum = oddDigits.reduce((sum, d) => sum + d, 0); // сумма цифр на нечётных позициях
  const evenSum = evenDigits.reduce((sum, d) => sum + d, 0); // сумма цифр на чётных позициях

  return { oddDigits, evenDigits, isHappy: oddSum === evenSum }; // возвращаем массивы цифр и результат проверки
}
function checkPositionalHappy(number) {
  if (!Number.isInteger(number) || number <= 0) {
    console.log(`${number} - ошибка: нужно целое положительное число`);
    return;
  }

    const { oddDigits, evenDigits, isHappy } = analyzePositional(number);
  const sign = isHappy ? '=' : '!=';
  const verdict = isHappy ? 'счастливое' : 'не счастливое';

  console.log(`${number} - ${oddDigits.join('+')} ${sign} ${evenDigits.join('+')} ${verdict}`);
}

console.log('--- Задание 1 ---');
checkPositionalHappy(1210);   // 1+1 = 2+0 -> счастливое
checkPositionalHappy(135);    // 1+5 != 3 -> не счастливое
checkPositionalHappy(2222);   // 2+2 = 2+2 -> счастливое
checkPositionalHappy(48091);  // пример числа другой длины


/* ===========================================================
   ЗАДАНИЕ 2
   Целое положительное число длиной РОВНО 6 цифр счастливое
   "зеркально", если сумма первых 3 цифр равна сумме
   последних 3 цифр.
   =========================================================== */

function analyzeMirror(number) {
  const digits = String(number).split('').map(Number);
  const firstHalf = digits.slice(0, 3);
  const secondHalf = digits.slice(3, 6);

  const firstSum = firstHalf.reduce((sum, d) => sum + d, 0); // сумма первых 3 цифр
  const secondSum = secondHalf.reduce((sum, d) => sum + d, 0);// сумма последних 3 цифр

  return { firstHalf, secondHalf, isHappy: firstSum === secondSum }; // возвращаем массивы цифр и результат проверки
}

function checkMirrorHappy(number) { // проверка числа на целое положительное и длину 6 цифр
  if (!Number.isInteger(number) || number <= 0) { // проверка на целое положительное число
    console.log(`${number} - ошибка: нужно целое положительное число`);
    return;
  }

  const str = String(number);
  if (str.length !== 6) {
    console.log(`${number} - ошибка: число должно состоять ровно из 6 цифр`);
    return;
  }

  const { firstHalf, secondHalf, isHappy } = analyzeMirror(number);
  const sign = isHappy ? '=' : '!=';
  const verdict = isHappy ? 'счастливое' : 'не счастливое';

  console.log(`${number} - ${firstHalf.join('+')} ${sign} ${secondHalf.join('+')} ${verdict}`);
}

console.log('\n--- Задание 2 ---');
checkMirrorHappy(123420);  // 1+2+3 = 4+2+0 -> счастливое
checkMirrorHappy(712004);  // 7+1+2 != 0+0+4 -> не счастливое
checkMirrorHappy(999999);  // 9+9+9 = 9+9+9 -> счастливое
checkMirrorHappy(12345);   // ошибка: не 6 цифр

// console.log('\n--- var 2---');
// function checkPositionallyLucky(number) {
//   const str = String(number);
//   let oddSum = 0;  // Сумма цифр на нечетных позициях (1, 3, 5...)
//   let evenSum = 0; // Сумма цифр на четных позициях (2, 4, 6...)
//
//   for (let i = 0; i < str.length; i++) {
//     const digit = Number(str[i]);
//     const position = i + 1; // Номер позиции (начиная с 1)
//
//     if (position % 2 !== 0) {
//       oddSum += digit;
//     } else {
//       evenSum += digit;
//     }
//   }
//
//   if (oddSum === evenSum) {
//     console.log(`${number} — счастливое`);
//   } else {
//     console.log(`${number} — не счастливое`);
//   }
// }
//
// // Проверка примеров из задания:
// checkPositionallyLucky(1210); // 1210 — счастливое (1+1 = 2+0)
// checkPositionallyLucky(135);  // 135 — не счастливое (1+5 != 3)
//
//
// function checkMirrorLucky(number) {
//   const str = String(number);
//
//   // Валидация длины числа
//   if (str.length !== 6) {
//     console.log(`${number} — число должно состоять из 6 цифр`);
//     return;
//   }
//
//   const sumFirst3 = Number(str[0]) + Number(str[1]) + Number(str[2]);
//   const sumLast3 = Number(str[3]) + Number(str[4]) + Number(str[5]);
//
//   if (sumFirst3 === sumLast3) {
//     console.log(`${number} — счастливое`);
//   } else {
//     console.log(`${number} — не счастливое`);
//   }
// }
//
// // Проверка примеров из задания:
// checkMirrorLucky(123420); // 123420 — счастливое (1+2+3 = 4+2+0)
// checkMirrorLucky(712004); // 712004 — не счастливое (7+1+2 != 0+0+4)
//
// console.log('--- var 3 ---');
//
// // Задача 1: Позиционно счастливое число (любая длина)
//
// function isPositionallyLucky(n) {
//   if (n <= 0 || !Number.isInteger(n)) return false;
//
//   const s = String(n);
//   let oddSum = 0;
//   let evenSum = 0;
//
//   for (let i = 0; i < s.length; i++) {
//     const digit = Number(s[i]);
//     // позиции с 1 слева: 1,3,5... — нечётные; 2,4,6... — чётные
//     if ((i + 1) % 2 === 1) {
//       oddSum += digit;
//     } else {
//       evenSum += digit;
//     }
//   }
//
//   return oddSum === evenSum;
// }
//
// // Примеры
// console.log(1210, isPositionallyLucky(1210) ? "счастливое" : "не счастливое"); // 1+1 == 2+0
// console.log(135,  isPositionallyLucky(135)  ? "счастливое" : "не счастливое"); // 1+5 != 3
// console.log(12321, isPositionallyLucky(12321) ? "счастливое" : "не счастливое");
//
// // Задача 2: Зеркально счастливое число (ровно 6 цифр)
//
// function isMirrorLucky(n) {
//   if (!Number.isInteger(n) || n < 100000 || n > 999999) return false;
//
//   const s = String(n);
//   const left  = Number(s[0]) + Number(s[1]) + Number(s[2]);
//   const right = Number(s[3]) + Number(s[4]) + Number(s[5]);
//
//   return left === right;
// }
//
// // Примеры
// console.log(123420, isMirrorLucky(123420) ? "счастливое" : "не счастливое"); // 1+2+3 == 4+2+0
// console.log(712004, isMirrorLucky(712004) ? "счастливое" : "не счастливое"); // 7+1+2 != 0+0+4
// console.log(123321, isMirrorLucky(123321) ? "счастливое" : "не счастливое");
//
// console.log('--- var 4 ---');
//
// /* 1. Счастливое число — попозиционно
//
// Нужно считать позиции слева направо: 1-я позиция — нечётная, 2-я — чётная и т. д.
// */
// let number = 1210;
// let str = String(number);
// let sumEven = 0;
// let sumOdd = 0;
// for (let i = 0; i < str.length; i++) {
//     let digit = Number(str[i]);
//     if ((i + 1) % 2 === 0) {
//         sumEven += digit;
//     } else {
//         sumOdd += digit;
//     }
// }
// if (sumEven === sumOdd) {
//     console.log("Число счастливое");
// } else {
//     console.log("Число не счастливое");
// }
// /*
// Для 1210:
//
// * нечётные позиции: 1 + 1 = 2
// * чётные позиции: 2 + 0 = 2
//
// Результат:
//
// Число счастливое
//
// Можно сделать это через функцию, чтобы проверять любое число:
// */
//
// function isHappyPositional(number) {
//     let str = String(number);
//     let sumEven = 0;
//     let sumOdd = 0;
//     for (let i = 0; i < str.length; i++) {
//         let digit = Number(str[i]);
//         if ((i + 1) % 2 === 0) {
//             sumEven += digit;
//         } else {
//             sumOdd += digit;
//         }
//     }
//     return sumEven === sumOdd;
// }
// console.log(isHappyPositional(1210)); // true
// console.log(isHappyPositional(135));  // false
//
// //  ⸻
//
// /* 2. Счастливое шестизначное число — зеркально
//
// Здесь число обязательно должно состоять из 6 цифр.
//
// Сравниваем:
//
// 123420
// 123 | 420
//
// Суммы:
//
// 1 + 2 + 3 = 6
// 4 + 2 + 0 = 6
// */
// function isHappyMirror(number) {
//     let str = String(number);
//     if (str.length !== 6) {
//         return false;
//     }
//     let sumFirst = 0;
//     let sumLast = 0;
//     for (let i = 0; i < 3; i++) {
//         sumFirst += Number(str[i]);
//     }
//     for (let i = 3; i < 6; i++) {
//         sumLast += Number(str[i]);
//     }
//     return sumFirst === sumLast;
// }
// console.log(isHappyMirror(123420)); // true
// console.log(isHappyMirror(712004)); // false
//
//
// let number = 123420;
// if (isHappyMirror(number)) {
//     console.log("Число счастливое");
// } else {
//     console.log("Число не счастливое");
// }
