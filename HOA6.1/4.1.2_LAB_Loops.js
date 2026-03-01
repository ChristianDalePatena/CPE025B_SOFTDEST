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

let choice;

while (true) {

    choice = prompt(
        "Choose an option:\n" +
        "first  - Display first contact\n" +
        "last   - Display last contact\n" +
        "all    - Display all contacts\n" +
        "new    - Add new contact\n" +
        "quit   - Exit program"
    );

    if (choice === "first") {

        console.log(`${contacts[0].name} / ${contacts[0].phone} / ${contacts[0].email}`);

    } else if (choice === "last") {

        let last = contacts.length - 1;
        console.log(`${contacts[last].name} / ${contacts[last].phone} / ${contacts[last].email}`);

    } else if (choice === "all") {

        for (let i = 0; i < contacts.length; i++) {
            console.log(`${contacts[i].name} / ${contacts[i].phone} / ${contacts[i].email}`);
        }

    } else if (choice === "new") {

        let name = prompt("Enter name:");
        let phone = prompt("Enter phone:");
        let email = prompt("Enter email:");

        if (name && phone && email) {
            contacts.push({ name, phone, email });
            console.log("New contact added.");
        } else {
            console.log("Contact not added. ");
        }

    } else if (choice === "quit") {

        console.log("You quit.");
        break;

    } else {

        console.log("Invalid option.");
    }
}