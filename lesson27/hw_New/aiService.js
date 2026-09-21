import { BACKEND_AI_URL } from './config.js';

export async function askAi(prompt) {
    const response = await fetch(BACKEND_AI_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt }),
    });

    const data = await response.json();

    // Если наш сервер поймал ошибку 400 (как на твоем скриншоте)
    if (!response.ok) {
        throw new Error(data.error || `Сетевая ошибка: ${response.status}`);
    }

    // Опциональная цепочка (Optional Chaining) - безопасно лезем вглубь объекта
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
        throw new Error('AI не вернул текстовый ответ.');
    }

    return text;
}