console.log("task02 run");

function getJsonFromString(content) {
    const json = JSON.parse(content);
    return json;
}

let text = '{ "name": "John", "age": 30 }';
let result = getJsonFromString(text);
console.log(result);

text = { "name": "John", "age": 30 }; // Error
result = getJsonFromString(text);
console.log(result);

console.log("task02 end");

