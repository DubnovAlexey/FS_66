// 1.Моя аппликация
function deleteProduct(productTitle, user){
    if (canDelete(user)){
        console.log(`${productTitle} успешно удален`);
    } else {
        console.log('Операция запрещена!');
    }
}
// 2.Иммитация стороннего фреймворка для
// авторизации и аутентификации пользователей
function canDelete(user){
    return user.role ==='ADMIN';
}
// 3. Иммитация БД
const user = {
    name: 'Alex',
    role: 'USER'
};
const admin = {
    name: 'John',
    role: 'ADMIN'
};
// ВЫЗОВ МОЕЙ АПЛИКАЦИИ
deleteProduct('Banana',user)