const userManager = createUserManager();

const ageInput = document.querySelector("#age");
const nameInput = document.querySelector("#name");
const registerButton = document.querySelector("#register");
const errorMessage = document.querySelector("#error");
const usersContainer = document.querySelector("#users");
const userCount = document.querySelector("#userCount");
const showAllButton = document.querySelector("#showAll");
const showAdultsButton = document.querySelector("#showAdults");

function renderUsers(users) {
    usersContainer.replaceChildren();

    users.forEach(({ id, name, age }) => {
        const userElement = document.createElement("li");
        const deleteButton = document.createElement("button");

        userElement.textContent = `${name} - ${age} years old`;
        deleteButton.textContent = "Delete";

        userElement.append(deleteButton);
        usersContainer.append(userElement);

        deleteButton.addEventListener("click", () => {
            userManager.deleteUser(id);

            userCount.textContent =
                `Total users: ${userManager.getUsers().length}`;

            renderUsers(userManager.getUsers());
        });
    });
}

showAllButton.addEventListener("click", () => {
    renderUsers(userManager.getUsers());
});

showAdultsButton.addEventListener("click", () => {
    const adults = userManager
        .getUsers()
        .filter(user => user.age >= 18);

    renderUsers(adults);
});

registerButton.addEventListener("click", function () {
    const ageValue = ageInput.value;
    const name = nameInput.value;

    try {
        if (ageValue === "") {
            throw new Error("Age is required");
        }

        const age = Number(ageValue);

        const user = createUser({ age, name });

        userManager.addUser(user);

        userCount.textContent =
            `Total users: ${userManager.getUsers().length}`;

        renderUsers(userManager.getUsers());

        errorMessage.textContent = "";
        ageInput.value = "";
        nameInput.value = "";

        console.log("User registered:", user);

    } catch (error) {
        console.error(error.message);
        errorMessage.textContent = error.message;

    } finally {
        console.log("Registration attempt completed");
    }
});

userCount.textContent =
    `Total users: ${userManager.getUsers().length}`;