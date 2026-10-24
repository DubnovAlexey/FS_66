function test(){
    const message="Hello";

    console.log(message)
}

console.log("=======Closure========");
test();// Hello

// console.log(message);//ReferenceError: message is not defined

function outer(){
    const message="Hello";

    function inner(){
        console.log(message);
        // const message2 = "Hello2";
    }

    // console.log(message2) //ERROR
    inner();
}

outer(); //Hello

function outer2(){
    const message3="Hello3";
    function inner2(){
        console.log(message3);
    }

    return inner2;
}
const savedFunction=outer2();//inner2

savedFunction();// inner2()  -> Hello3

function createCounter(){
    let count=0;
    return function(){
        count++;
        return count;
    }
}

const counter=createCounter();
console.log(counter());//1
console.log(counter());//2
console.log(counter());//3

const counterA=createCounter();
const counterB=createCounter();

console.log(counterA());//1
console.log(counterA());//2
console.log(counterA());//3

console.log(counterB());//1
console.log(counterB());//2
console.log(counterB());//3

console.log(counterA()); //4

console.log("==== Замыкания и DOM ======");

function createCounter2(){
    let count=0;
    return function(){
        count++;
        return count;
    }
}

const counter2=createCounter2();

// console.log(counter2());//1
// console.log(counter2());//2
// console.log(counter2());//3

const button=document.querySelector("#counterButton");
const result = document.querySelector("#counterResult");

button.addEventListener("click", function(){
    const value=counter2();
    result.textContent=value.toString();
    console.log("Counter:",value);
});

const counterC=createCounter2();
const counterD=createCounter2();
console.log(counterC());//1
console.log(counterD());//1
console.log(counterC());//2
console.log(counterC());//3
console.log(counterC());//4

console.log("=====Замыкание как фабрика функций=====");

function createMultiplier(factor){
    // let localFactor=factor;
    return function(value){
        return value*factor;
    }
}

const double=createMultiplier(2);
const triple=createMultiplier(3);

console.log(double(5));//10
console.log(triple(5));//15