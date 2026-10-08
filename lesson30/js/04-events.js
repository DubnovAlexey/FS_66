const button = document.querySelector("#changeButton");
const title = document.querySelector("#Title");
// console.log(button);

// button.addEventListener("click", (event) => {
//     console.log(event);
// });

button.addEventListener("click", () => {
    console.log("Before:", title.textContent);
    title.textContent = "New Title";
    console.log("After:", title.textContent);
});