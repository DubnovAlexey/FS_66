/*
HW_20_TEXT
1.Создайте массив на 10 строк.

2.Создайте функцию comparator(a,b), которая  принимает 2 строки  и
возвращает 1 - если первое строка длиннее, -1 если вторая строка длиннее,
0 если равны.
Используйте синтаксис function declaration, вызовите эту фкнкцию и
напечатайте результат.
Напишите эту эе функцию используя Function Expression и Arrow Function
3.Напишите функцию, которая принимает массив и функуию-компаратор,
и возвращает самое большое значение в массиве. Вызовите эту функцию, передав
ей массив строк, полученный в первой задаче и функцию, написанную во второй задаче.
*/

// 1. Создаем массив на 10 строк
const techStack = [
    "Docker", "Astro", "WebStorm", "React", "TypeScript",
    "Git", "Redux", "EVE Online", "X4", "GameHub"
];

// 2. Функция comparator(a,b)

// Вариант А: Function Declaration
function comparator(a, b) {
    if (a.length > b.length) return 1;
    if (a.length < b.length) return -1;
    return 0;
}
console.log("Результат Function Declaration (React vs Git):", comparator("React", "Git"));

// Вариант Б: Function Expression
const comparatorExpr = function(a, b) {
    if (a.length > b.length) return 1;
    if (a.length < b.length) return -1;
    return 0;
};

// Вариант В: Arrow Function
const comparatorArrow = (a, b) => {
    if (a.length > b.length) return 1;
    if (a.length < b.length) return -1;
    return 0;
};

// 3. Функция поиска с использованием всех методов урока 20
function findMaxString(arr, compFunc) {

    // .every() - проверяем, все ли элементы соответствуют условию (являются строками)
    const isValid = arr.every(item => typeof item === 'string');
    if (!isValid) return null;

    // .some() - проверяем, есть ли хотя бы один элемент длиннее 8 символов
    const hasLongWords = arr.some(item => item.length > 8);

    // .forEach() - перебираем элементы ради побочных эффектов (вывод в консоль)[cite: 1]
    console.log(`Начинаем обработку. Есть ли длинные слова? ${hasLongWords}`);
    arr.forEach(item => console.log(`Стек содержит: ${item}`));

    // --- ЦЕПОЧКА МЕТОДОВ (Pipeline) ---

    // .filter() - отбор по условию: убираем пустые строки[cite: 1]
    const processedData = arr.filter(item => item.length > 0)

        // .map() - преобразование элементов: очищаем строки от лишних пробелов[cite: 1]
        .map(item => item.trim())

        // .sort() - сортируем массив. Он напрямую принимает функцию-компаратор[cite: 1]
        .sort(compFunc);

    // .find() - находит первый элемент, удовлетворяющий условию[cite: 1]
    // Так как мы отсортировали массив по возрастанию длины, возьмем первое слово длиннее 4 букв
    const firstMediumWord = processedData.find(item => item.length > 4);
    console.log(`Первое слово длиннее 4 символов: ${firstMediumWord}`);

    // .reduce() - «сворачивает» весь массив к одному значению (максимальному)[cite: 1]
    // Сравниваем элементы с помощью переданного компаратора
    const maxString = processedData.reduce((acc, curr) => {
        // Если компаратор вернул 1, значит текущий элемент (curr) больше аккумулятора (acc)
        return compFunc(curr, acc) === 1 ? curr : acc;
    });

    return maxString;
}

// Вызов функции
const result = findMaxString(techStack, comparator);
console.log("--- ИТОГ ---");
console.log(`Самое большое значение в массиве: ${result}`);