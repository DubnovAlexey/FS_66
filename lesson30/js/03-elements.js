console.log("03-elements.js started");
const title = document.querySelector("#shopTitle");
console.log(title.textContent);

title.textContent = "My Apple Store"; // Change the text content of the title
title.classList.add("highlight"); // Add the highlight class

title.classList.remove("highlight"); // Remove the highlight class

title.classList.toggle("highlight"); // Toggle the highlight class
title.classList.toggle("highlight"); // Toggle the highlight class again
