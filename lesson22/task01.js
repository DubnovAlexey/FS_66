async function printWeather() {
    const response = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=44.49&longitude=20.27&current_weather=true');
    console.log(response);
}

console.log("--------fetch without await----------------");
let res = fetch('https://api.open-meteo.com/v1/forecast?latitude=44.49&longitude=20.27&current_weather=true');
console.log(res);

console.log("--------fetch with await----------------");
printWeather();

// Пример неправльного использования await в коде верхнего уровня
// (top-level code) без обертки в async функцию
// const response = await fetch(
//     'https://api.open-meteo.com/v1/forecast?latitude=44.49&longitude=20.27&current_weather=true');
//     console.log(response);