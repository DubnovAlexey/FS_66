console.log("TODO started");

let input = document.getElementById("taskInput");
let button = document.getElementById("addButton");
let list = document.getElementById("taskList");

console.log(input);
console.log(button);
console.log(list);

button.addEventListener("click", () => {
    const text = input.value.trim();
    if (text === "") {
        console.log("Please enter a task.");
        return
    }
        console.log(text);



const li = document.createElement("li");
console.log(li);
li.textContent = text;

li.addEventListener("click", () => {
    console.log(`Removing task`, li.textContent);
    list.removeChild(li);
});
list.appendChild(li);
input.value = "";
})