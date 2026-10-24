let nextId = 1;

function createUser({ name, age, ...rest }) {
    if (!name || name.trim() === "") {
        throw new Error("Name is required");
    }

    if (age === "" || age === undefined || age === null) {
        throw new Error("Age is required");
    }

    if (
        Number.isNaN(age) ||
        age < 0 ||
        age > 120 ||
        !Number.isInteger(age)
    ) {
        throw new Error("Invalid age");
    }

    return {
        ...rest,
        id: nextId++,
        name: name.trim(),
        age
    };
}