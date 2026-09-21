import express from 'express'; // Подключаем систему маршрутизации
import cors from 'cors'; // Разрешаем фронтенду доступ к бэкенду
import 'dotenv/config'; // Загружаем переменные из .env в process.env
import fs from 'fs/promises'; // Инструмент работы с файлами
import path from 'path'; // Навигатор по папкам

const app = express();
app.use(cors());
app.use(express.json()); // Сервер теперь понимает JSON-посылки

// МАРШРУТ 1: Выдача склада (fridge.json)
app.get('/api/fridge', async (req, res) => {
    try {
        const data = await fs.readFile(path.resolve('./fridge.json'), 'utf-8');
        res.json(JSON.parse(data));
    } catch (error) {
        res.status(500).json({ error: 'Склад недоступен' });
    }
});

// МАРШРУТ 2: Обращение к ИИ
app.post('/api/ask', async (req, res) => {
    try {
        const { prompt } = req.body;

        // Достаем название модели из .env. Если вдруг там пусто — ставим запасной вариант (fallback)
        const modelName = process.env.AI_MODEL || 'gemini-1.5-flash';

        // Динамически подставляем модель и ключ в URL (Шаблонизация)
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${process.env.GEMINI_API_KEY}`;

        const googleResponse = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
            }),
        });

        const data = await googleResponse.json();

        // Если Google дал отбой (как на твоем скриншоте)
        if (!googleResponse.ok) {
            console.error('ОТКАЗ ОТ GOOGLE:', data);
            return res.status(400).json({
                error: `Ошибка Google API: ${data.error?.message || 'Неизвестная ошибка ИИ'}`
            });
        }

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Внутренняя ошибка сервера (Backend)' });
    }
});

// Запускаем двигатели
app.listen(3001, () => {
    console.log('🚀 Центральный Backend запущен на порту 3001');
    console.log(`📡 Модель ИИ: ${process.env.AI_MODEL || 'не указана в .env'}`);
});