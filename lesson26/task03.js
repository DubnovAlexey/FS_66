// https://jsonplaceholder.typicode.com/posts
//https://jsonplaceholder.typicode.com/users

async function returnUser(id){
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const userData = await response.json();
    return userData;
}
const userId = 1; // 1..10
const userData = await returnUser(userId);
console.log(userData); // Object
const userDataJson = JSON.stringify(userData, null, 2);
console.log(userDataJson); // String
const people = [];
for (let i = 1; i <= 10; i++) {
    const userData = await returnUser(i);
    let myObj={
        id: userData.id,
        name: userData.name,
        latitude: userData.address.geo.lat,
        longitude: userData.address.geo.lng
    };
    people.push(myObj);
}
console.log(people); // Array of person objects