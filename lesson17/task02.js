// циклы
// print 5 times "Hello"
for (let i = 0; i < 5; i++) {
    console.log('Hello');
}

let n=5;
n=n+2;
console.log(n);//7
n--; // decrement
console.log(n);//6
console.log(n++);//6
console.log(n);//7
console.log(++n);//8
console.log(n);//8
console.log(n--);//8
console.log(n);//7
console.log(--n);//6
console.log(n);//6

console.log('-------------------');

for ( ; ; ) {
    console.log('Hello');
    break;
} // бесконечный цикл, но с break

// for (let j=0; j<5; j+=1) {
//     console.log(j);  // 0,1,2,3,4
// }
// console.log(j); // ERROR j is not defined

for (let j=2; j<2050; j*=2) {
    console.log(j);  // 2,4,8,16,32,64,128,256,512,1024
} // j*=2 - умножение на 2

console.log('-------------------');

