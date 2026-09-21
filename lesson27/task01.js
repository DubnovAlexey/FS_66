
const user = {
    name: 'Alex',
    role: 'USER',
    password: '111'
};
const admin = {
    name: 'John',
    role: 'ADMIN',
    password: '222'
}
const autenticatedUser= user;
if (autenticatedUser.role === 'ADMIN'){
    console.log('Удаление данных разрешено');
} else {
    console.log('Операция запрещена!');
}