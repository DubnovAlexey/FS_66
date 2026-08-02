// - Hybrid Architecture
const astronaut = {
    name: "Alex",
    planet: "Mars",
    age: 32,
    isCommander: true,
    missionDuration: 90
};

// - Mutable Derived State
let futureAge = astronaut.age + 10;
let extendedMissionDuration = astronaut.missionDuration + 30;

//- Encapsulation of logging logic into a Function 
const printAstronautProfile = (astronautData, labelColor) =>{
    // - Template Literal for formatting
    const profileMessage = `
      ============================
      👨‍🚀 ASTRONAUT PROFILE
      ============================
      Name: ${astronautData.name}
      Destination: ${astronautData.destination}
      Current Age: ${astronautData.age}
      FutureAge: ${astronautData.futureAge} 
      Mission Duration: ${astronautData.duration} days
      extendedMissionDuration: ${astronautData.extendedMissionDuration} days
      Commander Status: ${astronautData.status}
      ============================
    `;
    
    // - Styled Output in Console
    console.log("%c" + profileMessage, `color: ${labelColor}; font-weight: bold; background: #111;`);
};

// - Initial State Output. Green color.
printAstronautProfile({
    name: "Alex",
    destination: "Mars",
    age: 32,
    duration: 90,
    status: true
}, "#00ff00");

// - Step 6: State Reassignment
missionDuration = extendedMissionDuration; // Updating duration using calculation
isCommander = false; 

// - Final State Output after changes. Orange color.
printAstronautProfile({
    name: "Alex",
    destination: "Mars",
    age: 32,
    futureAge: 32 + 10, // Calculating futureAge exactly where it's needed inside the Object
    duration: 90,
    extendedMissionDuration: 120, // Updated duration
    status: false
}, "#00ff00");

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