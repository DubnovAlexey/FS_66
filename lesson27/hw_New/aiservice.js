

import { GEMINI_API_URL, GEMINI_API_KEY } from './config.js';

/**
 * Отправляет промпт в Gemini и возвращает текст ответа.
 * @param {string} prompt
 * @returns {Promise<string>}
 */
export async function askAi(prompt) {
    const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': GEMINI_API_KEY,
        },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Ошибка Gemini:', errorText);

        throw new Error(
            `Gemini API: ${response.status} ${response.statusText}`
        );
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
        throw new Error('AI не вернул текстовый ответ');
    }

    return text;
}