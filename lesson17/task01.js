let ar1=["banana","apple","orange",7,3,true,undefined,null];
console.log(ar1);
const ar2=["banana","apple","orange",7,3,true,undefined,null];
console.log(ar2);
ar2[0]="kiwi";
console.log(ar2);
// ar2=ar1; ERROR TypeError: Assignment to constant variable.
// console.log(ar2);
let arStr=ar1.toString();
console.log(arStr);
 
const ar3=["banana","apple","orange"];
console.log(ar3);
arStr=ar3.toString();// banana,apple,orange
console.log(arStr);
arStr=ar3.join("-");// banana-apple-orange
console.log(arStr);
arStr=ar3.join("\n");//с переносом строки
console.log(arStr);
arStr=ar3.join(999);//banana999apple999orange
console.log(arStr);
console.log(ar3.at(0));//banana
console.log(ar3[0]);//banana
 
console.log(typeof ar3); // object
console.log(Array.isArray(ar3)); // true
 
const ar4=[1,2,3,4,5];
console.log(ar4);
 
const ar5=ar3.concat(ar4);// [ 'banana', 'apple', 'orange', 1, 2, 3, 4, 5 ]
console.log(ar5);
const ar6=ar4.concat(ar3,ar1);//  [ 1, 2, 3, 4, 5, 'banana', 'apple', 'orange', 'banana', 'apple', 'orange', 7, 3, true, undefined, null ]
console.log(ar6);
 
console.log(ar3);// [ 'banana', 'apple', 'orange' ]
ar3[6]="grape";
console.log(ar3);// [ 'banana', 'apple', 'orange', <3 empty items>, 'grape' ]
console.log(ar3.length);//7
console.log(ar3[4], typeof ar3[4]);//undefined undefined
delete ar3[0];
console.log(ar3);// [ <1 empty item>, 'apple', 'orange', <3 empty items>, 'grape' ]
 
