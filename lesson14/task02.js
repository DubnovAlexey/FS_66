let userName='John';
let userAge=30;
let isStudent=true;

console.log('Age=', userAge);


console.log('==============');


let user = {
    name: 'John',
    age: 30,
    isStudent: true
};
console.log(user);
console.log('Name=', user.name);
console.log('Age=', user.age);
console.log('Is Student=', user.isStudent);

user.name = 'Mike';
console.log('Name=', user.name);
console.log(user);

user.email= 'mike@example.com';
console.log(user);

delete user.isStudent;
console.log(user);

const user1 = {
    name: 'Alice',
    age: 25,
    isStudent: false
};
console.log(user1);
user1.isStudent= true;
console.log(user1);
user1.email='alice@example.com';
console.log(user1);

console.log(typeof user1);