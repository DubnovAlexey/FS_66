console.log("03-elements.js started");
const title = document.querySelector("#shopTitle");
console.log(title.textContent);

title.textContent = "My Apple Store";
title.classList.add("highlight");
