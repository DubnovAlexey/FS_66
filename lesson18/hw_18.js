/*
HW_18_TEXT
 
1.Напишите четыре функции для основных математических действий + - * /
2.Напишите функцию калькулятор, принимающую при вызове два числа
и функцию операции над этими числами и возвращающую результат вычислений
3.Попробуйте написать все эти функции через function-declaration.
4.Попробуйте написать все эти функции через  function-expression.
5.***
Попробуйте написать все эти функции черед стрелочный синтаксис
    который имеет свою специфику и подходит не всегда.
 */

// 1. Function Declaration

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("На ноль делить нельзя");
  }
  return a / b;
}

function calculator(a, b, operation) {
  return operation(a, b);
}

console.log(calculator(10, 5, add)); // 15
console.log(calculator(10, 5, subtract)); // 5
console.log(calculator(10, 5, multiply)); // 50
console.log(calculator(10, 5, divide)); // 2
console.log("1=================================");


// 2. Function Expression
const add1 = function(a,b){
    return a+b;
};

const subtract1 = function(a,b){
    return a-b;
};

const multiply1 = function(a,b){
    return a*b;
};

const divide1 = function(a,b){
    if (b===0) {
      throw new Error('На ноль делить нельзя');  
    }
    return a/b;
};

const calculator1 = function (a,b,operation){
    return operation(a,b);
};
console.log(calculator1(12, 5, add)); // 17
console.log(calculator1(12, 5, subtract)); // 7
console.log(calculator1(12, 5, multiply)); // 60
console.log(calculator1(12, 5, divide)); // 2.4
console.log("2============================");


// 3. Стрелочные функции

const add2 = (a,b) => a+b;

const subtract2=(a,b)=>a-b;

const multiply2=(a,b)=>a*b;

const divide2 = (a,b)=>{
    if(b===0){
        throw new Error('На ноль делить нельзя');
    }
    return a/b;
};

const calculator2 = (a,b,operation)=> operation(a,b);

console.log(calculator2(13, 5, add)); // 18
console.log(calculator2(13, 5, subtract)); // 8
console.log(calculator2(13, 5, multiply)); // 65
console.log(calculator2(13, 5, divide)); // 2.6