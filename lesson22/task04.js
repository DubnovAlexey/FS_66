async function printWeather(latitude, longitude) {
    const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`,
    );
    console.log(
        "--------Результат работы метода fetch() await синтаксис----------------",
    );
    console.log(response);

    const jsonObj = await response.json();
    console.log("------Результат работы метода json()----------------");
    console.log(jsonObj);
    console.log("=============================================");
    console.log("Широта: " + latitude + "\nДолгота: " + longitude);
    console.log("Скорость ветра: " + jsonObj.current_weather.windspeed);
    console.log("Температура: " + jsonObj.current_weather.temperature);

}


const latitude = 44.49;
const longitude = 20.27;
printWeather(latitude, longitude);