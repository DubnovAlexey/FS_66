const number = [7,3,9,22,11,3,7,15];
console.log('========Sort========');
console.log(number.sort((a, b) => a - b));
console.log('========Random========');
// number.sort((a, b) =>Math.random() - 0.5);
number.sort(() =>Math.random() - 0.5);
console.log(number);
console.log('========MyFindIndex========');
function myFindIndex(array, callback) {
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i])) {
            return i;
        }
    };
    return -1;
}
let res= myFindIndex(number, (item) => item === 22);
console.log(res);
function checkEven(item) {
    return item % 2 === 0;
}
console.log('========CheckEven========');
console.log(number);
let res2 = myFindIndex(number, checkEven);
console.log(res2);
console.log('========ObjectsSort========');
const persons = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Charlie', age: 35 },
    { name: 'David', age: 25 }
];

persons.sort((a, b) => {
    if (a.age === b.age) {
        return a.name.localeCompare(b.name);
    }
    return a.age - b.age;
});
console.log(persons);