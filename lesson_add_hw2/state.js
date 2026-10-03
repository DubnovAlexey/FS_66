// state.js

// Экспортируем (export) единый объект state (состояние).
// Это наш генеральный манифест грузов.
export const state = {
    products: [
        {id: 1, name: "Молоко", category: "Молочные продукты", bought: false},
        {id: 2, name: "Хлеб", category: "Выпечка", bought: true},
        {id: 3, name: "Сыр", category: "Молочные продукты", bought: false},
        {id: 4, name: "Яблоки", category: "Фрукты", bought: false}
    ],
    currentFilter: 'ALL', // Режим радара ('ALL', 'NEED', 'BOUGHT')
    isDraftMode: false,   // Флаг режима песочницы
    draftProducts: []     // Резервный ангар для черновика
};