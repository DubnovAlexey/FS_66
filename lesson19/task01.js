function sayHello(name = "anonymous") {
    console.log(`Hello, ${name}`);
}
sayHello("John");
sayHello();
sayHello("Vasya",1,2,3,true);

function print(a,b,...args){
    console.log(a);
    console.log(b);
    for (let element of args) {
        console.log(`(${typeof element}): ${element}`);
    }

}
print(1,2,3,4,5, ()=> console.log("hello"))