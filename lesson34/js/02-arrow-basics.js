const user = {
    name: 'John',
    age: 30,
    showName: function() {
        console.log(this.name);
    }
};

user.showName();//John

const user1 = {
    name: 'Jane',
    age: 25,
    showName() {
        console.log(this.name);
    }
};

user1.showName();//Jane

function showName() {
    console.log(this.name);
}

const user2 = {
    name: 'Bob',
    age: 40,
    showName: showName

};

const user3 = {
    name: 'Alice',
    age: 28,
    showName: showName
};

user3.showName();//Alice

user2.showName();//Bob