import {GEMINI_API_KEY} from "./secret.js";

const ROLES = {
    USER: 'USER',
    ADMIN: 'ADMIN',
    GUEST: "GUEST"
};

const AI_MODEL = "gemini-3-flash-preview";

const FRIDGE_FILE = "./fridge.json";
const USERS_FILE = "./users.json";
const PROMPT = `
        Ты - квалифицированный повар.

        По названию блюда верни полный список ингредиентов,
        необходимых для его приготовления.

        Правила:
        - возвращай только JSON-массив строк;
        - каждый элемент массива — название одного продукта;
        - без пояснений;
        - без Markdown;
        - без нумерации;
        - без повторов.

        Пример:
        ["Свекла", "Картофель", "Морковь", "Лук", "Капуста"]

        Блюдо: `;
export {ROLES, AI_MODEL, FRIDGE_FILE, USERS_FILE, GEMINI_API_KEY, PROMPT};