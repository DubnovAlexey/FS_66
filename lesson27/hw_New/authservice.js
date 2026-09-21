

import { ROLES } from './config.js';

const KNOWN_USERS = [
    { name: 'John', role: ROLES.USER },
    { name: 'Bill', role: ROLES.ADMIN },
];

/**
 * Ищет пользователя по имени среди известных.
 * Если не находит — считает его новым и даёт роль GUEST.
 * @param {string} username
 * @returns {{name: string, role: string}}
 */
export function getAuthenticatedUser(username) {
    const found = KNOWN_USERS.find((u) => u.name === username);
    if (found) {
        return found;
    }
    return { name: username, role: ROLES.GUEST };
}