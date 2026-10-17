function renderUsers(users, container) {
    users.forEach(user => {
        const p = document.createElement("p");
        p.textContent = `${user.name} is ${user.age} years old`;
        container.append(p);
    });
}

export default renderUsers;