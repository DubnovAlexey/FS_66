import axios from "axios";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

async function getHottestUser() {
    try {
        // 1. Получаем список пользователей через axios
        const response = await axios.get(USERS_URL);

        const users = response.data;

        const usersWithWeather = [];

        // 2. Проходим по каждому пользователю
        for (const user of users) {
            const latitude = user.address.geo.lat;
            const longitude = user.address.geo.lng;

            // 3. Получаем погоду для текущего пользователя через fetch
            const weatherResponse = await fetch(
                `${WEATHER_URL}?latitude=${latitude}&longitude=${longitude}&current_weather=true`
            );

            if (!weatherResponse.ok) {
                throw new Error(
                    `Ошибка получения погоды: ${weatherResponse.status}`
                );
            }

            const weather = await weatherResponse.json();

            // Добавляем пользователя и его температуру в массив
            usersWithWeather.push({
                name: user.name,
                phone: user.phone,
                temperature: weather.current_weather.temperature,
            });
        }

        // 4. Находим пользователя с максимальной температурой
        let hottestUser = usersWithWeather[0];

        for (const user of usersWithWeather) {
            if (user.temperature > hottestUser.temperature) {
                hottestUser = user;
            }
        }

        console.log("Имя:", hottestUser.name);
        console.log("Телефон:", hottestUser.phone);
        console.log("Температура:", hottestUser.temperature);
    } catch (error) {
        console.error("Ошибка:", error);
    }
}

getHottestUser();