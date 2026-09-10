const arr = ['one', 'two', 'three', 'four', 'five', 'six',
    'seven', 'eight', 'nine', 'ten', 'one', 'two', 'three',
    'four', 'five'];
console.log("========IndexOf, LastIndexOf========");
console.log(arr.indexOf('three'));
console.log(arr.lastIndexOf('three'));
console.log("========includes========");
console.log(arr.includes('three'));
console.log(arr.includes('eleven'));
console.log("========find, findIndex========");
console.log(arr.find((item) => item.toLowerCase() === 'three'));
console.log(arr.findIndex((item) => item.toLowerCase() === 'three'));
console.log(arr.find((e, index) => index % 2 === 0 && e.length > 4));
console.log(arr.filter((e, index) => index % 2 === 0 && e.length > 4));
console.log("========ObjArray========");
const persons = [
    {name: 'Alice', age: 30},
    {name: 'Bob', age: 25},
    {name: 'Charlie', age: 35},
    {name: 'David', age: 25}
];

const person = {name: 'Bob', age: 25};
res = persons.indexOf(person);
console.log(res);

res = persons.findIndex((p) => p.name === person.name && p.age === person.age);
console.log(res);
res = persons.find((p) => p.age < 32);
console.log(res);

console.log("========ForEach========");
persons.forEach((p) => console.log(`Name: ${p.name}, Age: ${p.age}`));
res = persons.forEach((p, i) =>
    console.log(`${i + 1}: Name: ${p.name}, Age: ${p.age}`));
console.log(res);//undefined

console.log("========Map========");
const names = persons.map((p) => p.name.toUpperCase());
console.log(names);
res= persons.map((p,i) => (`${i+1}: Name: ${p.name}, Age: ${p.age}`));
console.log(res);

console.log("========reduce========");
res = arr.reduce((acc, item) => acc + item.length, 0)/arr.length;
console.log(res);
res = arr.reduce((acc, item) => acc+=item+"-", "concatination: ");
console.log(res);
res="concatination: ";
for (let i = 0; i < arr.length; i++) {
    res+=arr[i]+"_";
}
console.log(res);
res = persons.reduce((youngPerson, p) =>
    youngPerson.age > p.age ? p : youngPerson);
console.log(res);