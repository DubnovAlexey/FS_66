// HW_19: Сортировка пузырьком + бинарный поиск

// ===== Задание 1: сортировка пузырьком (по возрастанию) =====
function bubbleSort(arr) {
    const array = [...arr]; // копия, чтобы не менять исходный массив
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;

        for (let j = 0; j < n - 1 - i; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                swapped = true;
            }
        }

        if (!swapped) break; // массив уже отсортирован — дальше проверять не нужно
    }

    return array;
}

// ===== Задание 2*: бинарный поиск =====
function binarySearch(sortedArr, target) {
    let left = 0;
    let right = sortedArr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (sortedArr[mid] === target) {
            return mid;
        } else if (sortedArr[mid] < target) {
            left = mid + 1; // искомое правее середины
        } else {
            right = mid - 1; // искомое левее середины
        }
    }

    return -1; // не нашли
}

// ===== Демонстрация =====
const numbers = [1, 5, 2, 9, 4];
const sorted = bubbleSort(numbers);

console.log('Исходный массив:', numbers);
console.log('Отсортированный:', sorted);

console.log('Поиск 9:', binarySearch(sorted, 9));
console.log('Поиск 2:', binarySearch(sorted, 2));
console.log('Поиск 100 (нет в массиве):', binarySearch(sorted, 100));