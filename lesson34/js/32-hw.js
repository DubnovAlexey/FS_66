function createUser({ name, age, ...extra }) {
    if (!name.trim()) {
        throw new Error("Name is required");
    }

    if (!Number.isFinite(age) || age < 0) {
        throw new Error("Invalid age");
    }

    return {
        id: Date.now(),
        name: name.trim(),
        age,
        ...extra
    };
}

function createUserManager() {
    const users = [];

    return {
        addUser(user) {
            users.push(user);
        },

        getUsers() {
            return [...users];
        }
    };
}

const manager = createUserManager();

const nameInput = document.querySelector("#userName");
const ageInput = document.querySelector("#userAge");
const button = document.querySelector("#registerButton");
const list = document.querySelector("#usersList");

button.addEventListener("click", () => {
    try {
        const name = nameInput.value;
        const ageText = ageInput.value.trim();

        if (ageText === "") {
            throw new Error("Age is required");
        }

        const user = createUser({
            name,
            age: Number(ageText)
        });

        manager.addUser(user);

        list.replaceChildren();

        manager.getUsers().forEach(({ name, age }) => {
            const p = document.createElement("p");

            p.textContent = `${name}, ${age} years old`;

            list.append(p);
        });

        console.log("Registered:", user);

    } catch (error) {
        console.log("Registration error:", error.message);

    } finally {
        console.log("Registration attempt completed");
    }
});