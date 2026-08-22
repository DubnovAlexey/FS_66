let ddf = [2, 6, 3, 8, 22, 55, 463, 853,];

function bubbleSort(arr) {
    let len = arr.length;
    let readyFlag = false;
    for (let i = 0; i < len; i++) {
        readyFlag = true;
        for (let j = 0; j < len - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                readyFlag = false;
            }
        }
        if (readyFlag === true) {
            break;
        }
    }
    return arr;
}

console.log(`до сортировки ->`, [ddf])
const sort = bubbleSort(ddf);
console.log(`после сортировки ->`, sort)
console.log("========================")

