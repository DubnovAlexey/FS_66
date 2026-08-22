const cats = [
    { name: "Whiskers", age: 2, color: "gray", weight: 4.5 },
    { name: "Fluffy", age: 5, color: "white", weight: 6.0 },
    { name: "Mittens", age: 3, color: "black", weight: 5.2 },
    { name: "Shadow", age: 2, color: "gray", weight: 8.8 },
    { name: "Simba", age: 1, color: "orange", weight: 3.9 },
];
let sortedCats = cats.sort((a, b) => a.age - b.age);
console.log("Коты, отсортированные по возрасту:", sortedCats);
sortedCats = cats.sort((b, a) => a.age - b.age);
console.log("Коты, отсортированные по возрасту (в обратном порядке):"
    , sortedCats);
const sortedCatsByName = cats.sort((a, b) =>
    a.name.localeCompare(b.name));
console.log("Коты, отсортированные по имени:", sortedCatsByName);
const sortedCatsByAgeAndWeight = cats.sort((a, b) => {
    if (a.age === b.age) {
        return a.weight - b.weight;
    }
    return a.age - b.age;
});
console.log("Коты, отсортированные по возрасту и весу:",
    sortedCatsByAgeAndWeight);

const res=cats.sort();
console.log("Коты...")