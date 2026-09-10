const cats = [
    { name: 'Whiskers', age: 2, color: 'gray' , weight: 4.5},
    { name: 'Fluffy', age: 5, color: 'white' , weight: 6.0},
    { name: 'Mittens', age: 3, color: 'black' , weight: 5.2},
    { name: 'Shadow', age: 4, color: 'gray' , weight: 5.8},
    { name: 'Simba', age: 1, color: 'orange' , weight: 3.9}
];

const catWithAge2 = cats.find(cat => cat.age === 2);
// console.log("Кот возрастом 2 года:", catWithAge2);
if (catWithAge2) {
    console.log("Кот возрастом 2 года:", catWithAge2);
}else {
    console.log("Кот возрастом 2 года не найден.");
};
console.log("Кот возрастом 2 года:",
    catWithAge2 ? catWithAge2 : "не найден.");