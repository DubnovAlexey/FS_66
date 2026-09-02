import { GoogleGenAI } from "@google/genai";

// Выносим настройки в константы для удобного управления (Configuration Management).
// Если тариф ключа изменится, достаточно будет поменять значение здесь.
const AI_CONFIG = {
    modelName: "gemini-3-flash-preview",
    apiKey: process.env.GEMINI_API_KEY
};

/**
 * Асинхронная функция для отправки запроса к LLM-модели.
 * @param {string} prompt - Текст запроса от пользователя.
 * @returns {Promise<string>} - Текстовый ответ от ИИ или сообщение об ошибке.
 */
export async function askAi(prompt) {
    // 1. Инициализация клиента
    const genAi = new GoogleGenAI({
        apiKey: AI_CONFIG.apiKey
    });

    // 2. Блок обработки исключений (Exception Handling)
    try {
        console.log(`[Система] Инициализация HTTP-соединения с эндпоинтом: ${AI_CONFIG.modelName}...`);

        const response = await genAi.models.generateContent({
            model: AI_CONFIG.modelName,
            contents: prompt,
        });

        return response.text;

    } catch (error) {
        // 3. Журналирование (Logging) точной причины сбоя
        console.error(`[Критическая ошибка API] Статус: ${error.status || 'Неизвестно'}`);
        console.error(`Детали: ${error.message}`);

        // Возвращаем резервный текст, чтобы предотвратить падение вызывающего кода
        return "Ошибка: Сервис генерации текста временно недоступен.";
    }
}

// Функция для локального тестирования модуля
async function main() {
    const prompt = "Кратко объясни концепцию инкапсуляции в ООП.";
    const aiResponse = await askAi(prompt);

    console.log("\n--- Ответ от LLM ---");
    console.log(aiResponse);
    console.log("--------------------");
}

// Запуск только в случае прямого вызова скрипта
main();