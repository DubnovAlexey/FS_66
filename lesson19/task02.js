// number
let a = 3.9999;
let res = Math.floor(a);
console.log(res); //3
a = -3.999;
res = Math.floor(a);
console.log(res); //-4

a = 1.77;
res = Math.round(a);
console.log(res); //2
a = 1.11;
res = Math.round(a);
console.log(res); //1
a = -1.77;
res = Math.round(a);
console.log(res); //-2
a = -1.11;
res = Math.round(a);
console.log(res); //-1

res = Math.PI;
console.log(res);

console.log(Math.random()); // [0,1)

a = 1.77;
res = Math.trunc(a);
console.log(res); //1

a = 1.11;
res = Math.trunc(a);
console.log(res); //1

a = -1.77;
res = Math.trunc(a);
console.log(res); //-1

a = -1.11;
res = Math.trunc(a);
console.log(res); //-1

res = Math.PI;
res = res.toFixed(4);
console.log(res, typeof res);
res = +res;
console.log(res, typeof res);

// string

const str = "Hello Java Script!!!";
//           0      7 9         19    len=20
//                           -4 -1
console.log(str.length); //20
res = str.charAt(19);
console.log(res); //!
res=str[19];
console.log(res);//!
for (s of str){
    console.log(s);
}
res=str.indexOf('ava');
console.log(res);//7

res=str.indexOf('aaaaaaaaaa');
console.log(res);//-1

res=str.lastIndexOf('a');
console.log(res);//9

res=str.substring(4,8); // [4...8)
console.log(res);//o Ja

res=str.slice(-4,-1);
console.log(res);//t!!




