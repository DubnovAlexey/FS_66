//  ctrl+shift+v - markdown preview

console.log(false == 0); //true
console.log(false === 0); //false

console.log("" == 0);// true
console.log("" === 0);// false

console.log(null == undefined);// true
console.log(null === undefined);// false

console.log("55" == 55);// true
console.log("55" === 55);// false

console.log("true" == true);// false
console.log("true" === true);// false

console.log((0.2 + 0.1 - 0.3) == true);// false
console.log((0.2 + 0.1 - 0.3) === true);// false

console.log((0.2 + 0.1 - 0.3) == false);// false
console.log((0.2 + 0.1 - 0.3) === false);// false

console.log("===============================");

console.log({} == {});// false
console.log({} === {});// false

console.log({} == "[object Object]");//true
console.log({} === "[object Object]");// false

console.log({} == true);// false
console.log({} == false);// false

console.log({} == 0);//false
console.log({} == NaN);// false