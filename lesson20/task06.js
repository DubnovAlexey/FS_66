const cats = [
    { name: "Whiskers", age: 2, color: "gray", weight: 4.5 },
    { name: "Fluffy", age: 5, color: "white", weight: 6.0 },
    { name: "Mittens", age: 3, color: "black", weight: 5.2 },
    { name: "Shadow", age: 2, color: "gray", weight: 8.8 },
    { name: "Simba", age: 1, color: "orange", weight: 3.9 },
];
const isHeavyCat = cats.some((cat) => cat.weight > 6.0);
if (isHeavyCat) {
    console.log("Есть кот весом больше 6 кг.");
} else {
    console.log("Котов весом больше 6 кг нет.");
}
const isKittenPresent = cats.some((cat) => cat.age <= 1);
if (isKittenPresent) {
    console.log("Есть котенок младше 1 года.");
} else {
    console.log("Котят младше 1 года нет.");
}
const allCatsAreGray = cats.every((cat) => cat.color === "gray");
if (allCatsAreGray) {
    console.log("Все коты серого цвета.");
} else {
    console.log("Не все коты серого цвета.");
}

const allCatsAreFat = cats.every((cat) => cat.weight > 3.0);

if (allCatsAreFat) {
    console.log("Все коты весят больше 3 кг.");
} else {
    console.log("Не все коты весят больше 3 кг.");
}