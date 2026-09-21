import { getAuthenticatedUser } from './authService.js';
import { readFromJsonFile } from './fileService.js';
import { createBasePromptByRole, createPrompt } from './promptService.js';
import { askAi } from './aiService.js';
import { ROLES, BACKEND_FRIDGE_URL } from './config.js';

const usernameInput = document.getElementById('username');
const dishInput = document.getElementById('dish');
const searchButton = document.getElementById('search-btn');
const resultBox = document.getElementById('result');
const errorModal = document.getElementById('error-modal');
const errorMessage = document.getElementById('error-message');
const closeModalButton = document.getElementById('close-modal');

searchButton.addEventListener('click', handleSearch);
closeModalButton.addEventListener('click', hideError);

async function handleSearch() {
    const username = usernameInput.value.trim();
    const dishTitle = dishInput.value.trim();

    try {
        validateInput(username, dishTitle);

        const authenticatedUser = getAuthenticatedUser(username);

        let products = [];
        if (authenticatedUser.role === ROLES.ADMIN || authenticatedUser.role === ROLES.USER) {
            products = await readFromJsonFile(BACKEND_FRIDGE_URL);
        }

        const basePrompt = createBasePromptByRole(authenticatedUser);
        const prompt = createPrompt(basePrompt, dishTitle, products, authenticatedUser.role);

        // Ждем возвращения зонда с орбиты ИИ
        const answer = await askAi(prompt);

        // ВАЖНО: Теперь мы передаем не только текст, но и роль пользователя
        renderResult(answer, authenticatedUser.role);
    } catch (error) {
        showError(error.message || 'Неизвестная системная ошибка');
    }
}

function validateInput(username, dishTitle) {
    if (!username) {
        throw new Error('Введите имя пользователя');
    }
    if (!dishTitle) {
        throw new Error('Введите название блюда');
    }
}

// ДОБАВЛЕН ПАРАМЕТР role
function renderResult(text, role) {
    // 1. Очищаем старый результат
    resultBox.innerHTML = '';

    // 2. Если это ГОСТЬ, добавляем информационную плашку (маркер)
    if (role === ROLES.GUEST) {
        const guestWarning = document.createElement('p');
        // Добавим немного встроенных стилей для выделения (или можно вынести в CSS)
        guestWarning.style.color = '#a5333a'; // Красненький цвет
        guestWarning.style.fontSize = '0.9rem';
        guestWarning.style.fontWeight = '600';
        guestWarning.style.marginBottom = '12px';
        guestWarning.textContent = 'Внимание: Вы вошли как Гость. Рецепт сгенерирован без учета содержимого вашего холодильника.';
        resultBox.appendChild(guestWarning);
    }

    // 3. Создаем заголовок "Результат:"
    const title = document.createElement('p');
    title.className = 'result-title';
    title.textContent = 'Результат:';
    resultBox.appendChild(title);

    // 4. Отрисовываем сам список продуктов от ИИ
    text
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .forEach((line) => {
            const p = document.createElement('p');
            p.textContent = line;
            resultBox.appendChild(p);
        });
}

function showError(message) {
    errorMessage.textContent = message;
    errorModal.classList.remove('hidden');
}

function hideError() {
    errorModal.classList.add('hidden');
}