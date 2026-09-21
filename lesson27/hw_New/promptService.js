import { ROLES } from './config.js';

export function createBasePromptByRole(user) {
    if (user.role === ROLES.ADMIN) {
        return `
        Ты - квалифицированный повар. 
        Твоя задача - на основе названия желаемого блюда и списка продуктов в холодильнике,
        составить рекомендации: какие недостающие продукты надо закупить.
        Правила: возвращай только список покупок. Не возвращай продукты, которые уже есть.
        `;
    }
    if (user.role === ROLES.USER) {
        return `
        Ты - квалифицированный повар. 
        Твоя задача - составить рекомендации: какие продукты надо использовать ИЗ ИМЕЮЩИХСЯ в холодильнике.
        Правила: возвращай только продукты из холодильника. Не пиши то, чего там нет.
        `;
    }
    if (user.role === ROLES.GUEST) {
        return `
        Ты - квалифицированный повар.
        Тебе даётся только название желаемого блюда.
        Твоя задача - назвать основные продукты, необходимые для приготовления этого блюда.
        Правила: возвращай только список продуктов, без лишних слов.
        `;
    }

    throw new Error(`Отказано в доступе. Неизвестная роль: ${user.role}`);
}

export function formatProductsForPrompt(products) {
    return products.map(product => ` ${product.name}: ${product.count}`).join('\n');
}

export function createPrompt(basePrompt, dishTitle, products = [], role) {
    if(!dishTitle.trim()){
        throw new Error(`Название блюда не может быть пустым`);
    }

    if(!Array.isArray(products)) {
        throw new Error(`Продукты должны быть массивом`);
    }

    let productText = '';

    if (role === ROLES.GUEST) {
        productText = '[Данные о холодильнике недоступны - гостевой доступ]';
    } else if (products.length === 0) {
        productText = '[Холодильник абсолютно пуст]';
    } else {
        productText = formatProductsForPrompt(products);
    }

    return `${basePrompt} Желаемое блюдо: ${dishTitle}. Продукты в наличии:\n${productText}`;
}