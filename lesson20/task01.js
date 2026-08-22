const printArray = (arr) => {
    for (let i = 0; i < arr.length; i+=1) {
        arr[i] = arr[i] * 10;
        console.log(i," -> ",arr[i]);
    }
}
const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
printArray(primes);
console.log("Массив после изменения:", primes);
const reverseArray = (arr) => {
    for (let i=0, j=arr.length-1; i<j; i++, j--) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
};
reverseArray(primes);
console.log("Массив после переворота:", primes);