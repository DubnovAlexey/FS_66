const animal = {
    eats: true,

    walk() {
        console.log("Animal is walking");
    }
};

const dog = Object.create(animal);
dog.name = "Rex";

console.log(dog.name);//Rex
console.log(dog.eats);// true

dog.walk(); //Animal is walking

console.log(Object.getPrototypeOf(dog) === animal); //true

const cat = Object.create(animal);
cat.name = "Tom";
cat.walk(); //Animal is walking
console.log(Object.getPrototypeOf(cat) === animal) //true

console.log(Object.hasOwn(dog,"walk")); //false
console.log(typeof dog.walk); //function

dog.eats= false;
console.log(dog.eats);//false
console.log(cat.eats);//true

console.log(Object.getPrototypeOf(dog) === animal); //true

animal.eats="qwert";
console.log(">>>",dog.eats);//false
console.log("<<<",cat.eats);//qwert

class Animal1{
    constructor(name) {
        this.name = name;
    }

    walk() {
        console.log(`${this.name} is walking`);
    }
}
const animal1 = new Animal1("Rex");
animal1.walk(); //Rex is walking
// new создает новый объект, который наследует
// свойства и методы от прототипа запуская его конструктор


class Dog1 extends Animal1 {
    bark() {
        console.log(`${this.name} say Woof!`);
    }
}

const dog1 = new Dog1("Tuzik");

dog1.bark(); //Tuzik say Woof!
dog1.walk(); //Tuzik is walking

class Dog2 extends Animal1 {
    constructor(name, breed) {
        // this.breed = breed; //ERROR
        super(name); // вызов конструктора родителя
        this.breed = breed;
    }

    bark() {
        console.log(`${this.name} say Woof!`);
    }
}

const dog2= new Dog2("Bobik", "Labrador");

console.log(dog2.breed);//Labrador
console.log(dog2.name);//Bobik

class Animal2{
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} make a sound`);
    }
}

class Dog3 extends Animal2 {
    speak() {
        // super.speak(); // вызов родительского метода

        console.log(`${this.name} BARKS`);
    }
}
const animal2 = new Animal2("Animal");
const dog3 = new Dog3("Pushok");

animal2.speak();//Animal make a sound
dog3.speak();//Pushok BARKS