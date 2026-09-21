

export const ROLES = {
    ADMIN: 'ADMIN',
    USER: 'USER',
    GUEST: 'GUEST',
};

export const AI_MODEL = 'gemini-3-flash-preview';

export const GEMINI_API_URL =
    `https://generativelanguage.googleapis.com/v1beta/models/${AI_MODEL}:generateContent`;

export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const FRIDGE_FILE = './fridge.json';