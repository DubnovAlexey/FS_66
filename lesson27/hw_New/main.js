

import { getAuthenticatedUser } from './authService.js';
import { readFromJsonFile } from './fileService.js';
import { createBasePromptByRole, createPrompt } from './promptService.js';
import { askAi } from './aiService.js';
import { ROLES, FRIDGE_FILE } from './config.js';

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

        // 1. Определяем пользователя и его роль
        const authenticatedUser = getAuthenticatedUser(username);

        // 2. ADMIN и USER видят содержимое холодильника, GUEST — нет
        let products = [];
        if (authenticatedUser.role === ROLES.ADMIN || authenticatedUser.role === ROLES.USER) {
            products = await readFromJsonFile(FRIDGE_FILE);
        }

        // 3. Строим промпт и спрашиваем AI
        const basePrompt = createBasePromptByRole(authenticatedUser);
        const prompt = createPrompt(basePrompt, dishTitle, products);
        const answer = await askAi(prompt);

        // 4. Показываем результат
        renderResult(answer);
    } catch (error) {
        showError(error.message || 'Неизвестная ошибка приложения');
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

function renderResult(text) {
    resultBox.innerHTML = '';

    const title = document.createElement('p');
    title.className = 'result-title';
    title.textContent = 'Результат:';
    resultBox.appendChild(title);

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