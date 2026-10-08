const input = document.querySelector('#nameInput');
const result = document.querySelector('#result');
const button = document.querySelector('#helloButton');

console.log(input, result, button);

console.log(input.value);

button.addEventListener('click', () => {
    // console.log(input.value);
    const name = input.value.trim();
    console.log("Name:", name);
    if (name === '') {
        result.textContent = 'Please enter your name.';
        return;
    }
    result.textContent = `Hello, ${name}!`;

});