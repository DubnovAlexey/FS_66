// number
let a=3.14159
let res = Math.floor(a);
console.log(res);
a = -3.9999;
res = Math.floor(a);
console.log(res);
a = 3.999
res = Math.floor(a);
console.log(res);
console.log("============")

a = 1.25
res = Math.round(a);
console.log(res);
a = 1.77
res = Math.round(a);
console.log(res);
a = -1.77
res = Math.round(a);
console.log(res);
a = -1.11
res = Math.round(a);
console.log(res);
console.log("=============")

res = Math.PI;
console.log(res);
console.log("==========")
console.log(Math.random()); // [0,1)
console.log("===========")

a = 1.77
res = Math.trunc(a); //
console.log(res); // 1
console.log("==========")
res =Math.PI;
res = res.toFixed(4);
console.log(res, typeof res);
res = +res;
console.log(res, typeof res);

