let contacts = [
    {
        name: "Linus Torvalds",
        role: "System Admin",
        skills: ["Linux", "Git", "Kernels"],
        availability: true
    },
    {
        name: "Ada Lovelace",
        role: "Logic Analyst",
        skills: ["Algorithms", "Math", "Analytics"],
        availability: false
    },
    {
        name: "Alan Turing",
        role: "Cryptographer",
        skills: ["Logic", "Enigma", "Security"],
        availability: true
    }
];

// function to show a single contact by index of each contacts
function showContact(index) {
    if (index >= 0 && index < contacts.length) {
        let contact = contacts[index];
        console.log(`Name: ${contact.name}`);
        console.log(`Role: ${contact.role}`);
        console.log(`First Skill: ${contact.skills[0]}`);
    } else {
        console.log("Invalid index");
    }
}

// function to show all of the contacts
function showAllContacts() {
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];
        console.log(`${i}. ${contact.name} - ${contact.role} - Skills: ${contact.skills.join(", ")} - Available: ${contact.availability}`);
    }
}

// function to add a new contact in the array list
function addContact(name, role, skill) {
    if (!name || !role || !skill) {
        console.log("All fields must be provided!");
        return;
    }
    contacts.push({
        name: name,
        role: role,
        skills: [skill],
        availability: true
    });
    console.log("New contact added!");
}

// function to search a contact by name only (case sensitive)
function searchContact(name) {
    let found = false;
    for (let contact of contacts) {
        if (contact.name.toLowerCase() === name.toLowerCase()) {
            console.log(`Name: ${contact.name}`);
            console.log(`Role: ${contact.role}`);
            console.log(`Availability: ${contact.availability ? "Available" : "Busy"}`);
            found = true;
            break;
        }
    }
    if (!found) {
        console.log("Contact not found");
    }
}

// function for infinite loop to avoid reopening the program simultaneously  
while (true) {
    let action = prompt("Choose an action: show / all / add / search / quit");

    if (action === "quit") {
        alert("Goodbye!");
        break;
    }

    switch (action) {
        case "show":
            let index = Number(prompt("Enter contact index:"));
            showContact(index);
            break;

        case "all":
            showAllContacts();
            break;

        case "add":
            let name = prompt("Enter Name:");
            let role = prompt("Enter Role:");
            let skill = prompt("Enter a Skill:");
            addContact(name, role, skill);
            break;

        case "search":
            let searchName = prompt("Enter Name to search:");
            searchContact(searchName);
            break;

        default:
            console.log("Invalid action, try again.");
    }
}