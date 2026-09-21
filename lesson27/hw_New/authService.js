import { ROLES } from './config.js';

const KNOWN_USERS = [
    { name: 'John', role: ROLES.USER },
    { name: 'Bill', role: ROLES.ADMIN },
];

export function getAuthenticatedUser(username) {
    const normalizedInput = username.toLowerCase(); // Приводим к нижнему регистру
    const found = KNOWN_USERS.find((u) => u.name.toLowerCase() === normalizedInput);

    if (found) {
        return found;
    }
    return { name: username, role: ROLES.GUEST };
}