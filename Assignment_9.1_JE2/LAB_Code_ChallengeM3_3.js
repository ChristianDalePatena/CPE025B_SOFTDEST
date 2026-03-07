class User {
    constructor(name, surname, email) {
        this.name = name;
        this.surname = surname;
        this.email = email;
    }
}

class Users {
    #users;

    constructor() {
        this.#users = new Map();
    }

    add(name, surname, email) {
        try {
            this.#users.set(email, new User(name, surname, email));
            console.log("User added successfully.");
        } catch (e) {
            console.log(e.message);
        }
    }

    delete(email) {
        if (this.#users.delete(email)) {
            console.log("User deleted.");
        } else {
            console.log("User not found.");
        }
    }

    get(email) {
        return this.#users.get(email);
    }

    getAll(sortBy) { // name, surname, email
        return [...this.#users]
            .sort((u1, u2) => u1[1][sortBy] > u2[1][sortBy] ? 1 : -1)
            .map(u => u[1]);
    }
}

let users = new Users();
let running = true;

while (running) {

    let choice = prompt(
        "Select an option:\n" +
        "1 - Add User\n" +
        "2 - Delete User\n" +
        "3 - Get User\n" +
        "4 - Show All Users\n" +
        "5 - Exit"
    );

    if (choice == "1") {

        let name = prompt("Enter name:");
        let surname = prompt("Enter surname:");
        let email = prompt("Enter email:");
        users.add(name, surname, email);

    } 
    else if (choice == "2") {

        let email = prompt("Enter email to delete:");
        users.delete(email);

    } 
    else if (choice == "3") {

        let email = prompt("Enter email to retrieve:");
        let user = users.get(email);

        if (user) {
            console.log("Name:", user.name);
            console.log("Surname:", user.surname);
            console.log("Email:", user.email);
        } else {
            console.log("User not found.");
        }

    } 
    else if (choice == "4") {

        let sortField = prompt("Sort by: name, surname, or email");
        let allUsers = users.getAll(sortField);

        console.log("All Users:");
        allUsers.forEach(u => {
            console.log(u.name + " " + u.surname + " - " + u.email);
        });

    } 
    else if (choice == "5") {

        running = false;
        console.log("Program exited.");

    } 
    else {

        console.log("Invalid selection.");

    }
}