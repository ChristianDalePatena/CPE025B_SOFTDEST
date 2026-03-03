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


// Show one of contacts
let showContact = function(contacts, i) {
    if (contacts instanceof Array && contacts[i]) {
        console.log(`${contacts[i].name} / ${contacts[i].phone} / ${contacts[i].email}`);
    }
};


// Show all the contacts
let showAllContacts = function(contacts) {
    if (contacts instanceof Array) {
        for (let contact of contacts) {
            console.log(`${contact.name} / ${contact.phone} / ${contact.email}`);
        }
    }
};


//  add a new contact information
let addNewContact = function(contacts, name, phone, email) {
    if (contacts instanceof Array && name && phone && email) {
        contacts.push({
            name: name,
            phone: phone,
            email: email
        });
        console.log("Contact added successfully.");
    }
};


// function for sorting contacts
let sortContacts = function(contacts, key) {
    if (contacts instanceof Array) {
        if (key === "name" || key === "phone" || key === "email") {
            contacts.sort((a, b) => a[key].localeCompare(b[key]));
            console.log(`Contacts sorted by ${key}.`);
        } else {
            console.log("Invalid sort option.");
        }
    }
};


// switch cases for precise decision 
let choice = prompt("Choose an option: show / showAll / add / sort");

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

    case "sort":
        let sortOption = prompt("Sort by: name / phone / email");
        sortContacts(contacts, sortOption);
        showAllContacts(contacts);
        break;

    default:
        console.log("Invalid option.");
}