//============================================

// https://jsonplaceholder.typicode.com/posts

// npm install --save-dev jest
// "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"

//============================================


import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";

// === ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ РАБОТЫ С ФАЙЛАМИ ===

async function writeToJsonFile(filePath, data) {
    await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

async function readFromJsonFile(filePath) {
    const fileData = await readFile(filePath, "utf-8");
    return JSON.parse(fileData);
}

async function appendToJsonFile(filePath, data) {
    const existingData = await readFromJsonFile(filePath);
    const updatedData = [...existingData, ...data];
    await writeToJsonFile(filePath, updatedData);
}

async function displayFileJsonContents(filePath) {
    const fileData = await readFile(filePath, "utf-8");
    console.log("Данные из файла (сырой JSON):\n", fileData);
}

// === ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ДЛЯ РАБОТЫ С МАССИВОМ ===

function addOrUpdateProduct(fridge, name, count, price, expDate) {
    const idx = fridge.findIndex((product) => product.name === name);

    if (idx !== -1) {
        fridge[idx].count += count;
        fridge[idx].price = price;
        fridge[idx].expDate = expDate;
        console.log(`Количество продукта "${name}" обновлено:`, fridge[idx]);
    } else {
        fridge.push({ name, count, price, expDate });
        console.log("Продукт добавлен:", { name, count, price, expDate });
    }
}

function removeProduct(fridge, name) {
    const idx = fridge.findIndex((product) => product.name === name);
    if (idx !== -1) {
        fridge.splice(idx, 1);
        console.log(`Продукт "${name}" удалён из списка.`);
    }
}

function displayFridgeContents(fridge) {
    console.log("=== Содержимое холодильника ===");
    if (fridge.length === 0) {
        console.log("Холодильник пуст.");
    } else {
        fridge.forEach((product, index) => {
            console.log(
                `${index + 1}. ${product.name}: ${product.count} шт., ${product.price} $, expDate: ${product.expDate}`
            );
        });
    }
}

// === ОСНОВНАЯ ФУНКЦИЯ ПРИЛОЖЕНИЯ ===

async function runFridgeApp(fileName, stopWords) {
    const rl = readline.createInterface({ input, output });
    const fridge = [];

    console.log("Программа для учета продуктов в холодильнике.");
    console.log(
        "Введите продукты в холодильнике. Для завершения введите ",
        stopWords.join(", "),
        " (без учёта регистра)."
    );

    while (true) {
        const name = await rl.question("Введите наименование продукта: ");
        const trimmedName = name.trim();

        if (stopWords.includes(trimmedName.toLowerCase())) {
            break;
        }

        if (trimmedName === "") {
            console.log("Наименование продукта не может быть пустым. Попробуйте снова.");
            continue;
        }

        const countInput = await rl.question(`Введите количество продукта "${trimmedName}": `);
        const count = +countInput.trim();

        if (Number.isNaN(count)) {
            console.log("Количество введено некорректно. Попробуйте снова.");
            continue;
        }

        const priceInput = await rl.question(`Введите цену продукта "${trimmedName}": `);
        const price = +priceInput.trim();

        if (Number.isNaN(price)) {
            console.log("Цена введена некорректно. Попробуйте снова.");
            continue;
        }

        const expDateInput = await rl.question(
            `Введите срок годности продукта "${trimmedName}" (YYYY-MM-DD): `
        );
        const expDate = expDateInput.trim();

        // Передаем управление массивом в helper-функции
        const isAlreadyInFridge = fridge.some((product) => product.name === trimmedName);

        if (isAlreadyInFridge && count === 0) {
            removeProduct(fridge, trimmedName);
        } else {
            addOrUpdateProduct(fridge, trimmedName, count, price, expDate);
        }

        console.log("Текущий список продуктов:");
        console.table(fridge);
    }

    rl.close();

    // Сохранение и вывод с помощью helper-функций
    if (fridge.length > 0) {
        const filePath = path.resolve(fileName);
        try {
            // 1. Сохраняем массив объектов в файл
            await writeToJsonFile(filePath, fridge);
            console.log(`\nДанные о продуктах сохранены в файл: ${filePath}`);

            // 2. Выводим сырое содержимое файла
            await displayFileJsonContents(filePath);

            // 3. Читаем и парсим файл обратно в массив
            const savedProducts = await readFromJsonFile(filePath);

            // 4. Форматированно отображаем прочитанные данные
            displayFridgeContents(savedProducts);
            console.table(savedProducts);
        } catch (error) {
            console.error("Ошибка при работе с файлом:", error.message);
        }
    } else {
        console.log("Список продуктов пуст. Данные не были сохранены.");
    }
}

// Запуск программы
const fileName = "fridge.json";
const stopWords = ["exit", "выход", "стоп", "stop"];
runFridgeApp(fileName, stopWords);