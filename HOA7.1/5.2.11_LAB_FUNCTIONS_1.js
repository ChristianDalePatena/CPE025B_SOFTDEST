let contacts = [{
    name: "Maxwell Wright",
    phone: "(0191) 719 6495",
    email: "Curabitur.egestas.nunc@nonummyac.co.uk"
}, {
    name: "Raja Villarreal",
    phone: "0866 398 2895",
    email: "posuere.vulputate@sed.com"
}, {
    name: "Helen Richards",
    phone: "0800 1111",
    email: "libero@convallis.edu"
}];


// Function 1: Show one contact
function showContact(contactList, index) {
    if (!(contactList instanceof Array)) {
        console.log("Contact list is not an array!");
        return;
    }

    if (index >= 0 && index < contactList.length) {
        let contact = contactList[index];
        console.log(`Name: ${contact.name}`);
        console.log(`Phone: ${contact.phone}`);
        console.log(`Email: ${contact.email}`);
    } else {
        console.log("Error: Invalid index.");
    }
}


// Function 2: Show all contacts
function showAllContacts(contactList) {
    if (!(contactList instanceof Array)) {
        console.log("Contact list is not an array!");
        return;
    }

    for (let i = 0; i < contactList.length; i++) {
        console.log(`\nContact ${i}`);
        console.log(`Name: ${contactList[i].name}`);
        console.log(`Phone: ${contactList[i].phone}`);
        console.log(`Email: ${contactList[i].email}`);
    }
}


// Function 3: Add new contact
function addNewContact(contactList, name, phone, email) {
    if (!(contactList instanceof Array)) {
        console.log("Contact list is not an array!");
        return;
    }

    if (!name || !phone || !email) {
        console.log("Invalid Information!");
        return;
    }

    contactList.push({
        name: name,
        phone: phone,
        email: email
    });

    console.log("New contact added successfully.");
}


// choice for the Menu with the use of switch cases
let choice = prompt("Choose an option: show / showAll / add");

switch (choice) {
    case "show":
        let index = Number(prompt("Enter contact index:"));
        showContact(contacts, index);
        break;

    case "showAll":
        showAllContacts(contacts);
        break;

    case "add":
        let name = prompt("Enter name:");
        let phone = prompt("Enter phone:");
        let email = prompt("Enter email:");
        addNewContact(contacts, name, phone, email);
        break;

    default:
        console.log("Invalid option.");
}