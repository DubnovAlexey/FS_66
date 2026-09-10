import axios from "axios";
async function getWeather(latitude, longitude) {
    return await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
}
async function main(latitude, longitude) {
    const wetherData = await getWeather(latitude, longitude);
    console.log("Широта: " + latitude + "\nДолгота: " + longitude);
    console.log(wetherData.data);
    console.log("Скорость ветра: " + wetherData.data.current_weather.windspeed);
    console.log("Температура: " + wetherData.data.current_weather.temperature);
}
main(44.49, 20.27);