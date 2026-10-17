export const users = [
    {
        id: 1,
        name: 'Anna',
        age: 28,
    },
    {
        id: 2,
        name: 'David',
        age: 17,
    },
    {
        id: 3,
        name: 'John',
        age: 35,
    }
];

const minAdultsAge = 18;

export function getAdult(users) {
    return users.filter(user => user.age >= minAdultsAge);
}