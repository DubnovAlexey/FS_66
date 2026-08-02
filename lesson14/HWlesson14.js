const astronaut = {
    name: "Alex",
    planet: "Mars",
    age: 32,
    duration: 90,
    status: true
};


const printAstronautProfile = (astronautData, labelColor) => {
    const profileMessage = `
      ================================
      👨‍🚀 ASTRONAUT PROFILE
      ================================
      Name: ${astronautData.name}
      Destination: ${astronautData.planet}
      Current Age: ${astronautData.age}
      Mission Duration: ${astronautData.duration} days
      Commander Status: ${astronautData.status}
      ============================
    `;

    console.log("%c" + profileMessage, `color: ${labelColor}; font-weight: bold; background: #111;`);
};

printAstronautProfile(astronaut, "#00ff00");
astronaut.age = 32 + 10; //  Update Age in 10 years
astronaut.duration = 90 + 30;  // Updating base duration to 120 days as required after adding 30
astronaut.status = false;  // Updating commander status

printAstronautProfile(astronaut, "#ff9900");

/*
Задача: Система профилей астронавтов 🚀
Mission 👨‍🚀
Создайте JavaScript-программу для хранения информации об астронавте.

    What You Need to Do 📘
1. Создать переменные
Создайте переменные:

    astronautName

astronautAge

isCommander

planet

missionDuration

2. Использовать разные типы данных
Использовать: - string - number - boolean

3. Выполнить вычисления
Посчитать: - возраст астронавта через 10 лет

длительность миссии после увеличения на 30 дней
4. Выполнить конкатенацию строк
Создать сообщения: - имя астронавта - планета - статус командира

5. Вывести результаты
Использовать console.log()

6. Изменить значения переменных , Вывести результаты
Изменить: - длительность миссии - статус командира

 */