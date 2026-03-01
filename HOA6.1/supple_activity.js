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

while (true) {

    let option = prompt(
        "Contact Manager\n\n" +
        "show   - Display contact by index\n" +
        "all    - Display all contacts\n" +
        "add    - Add new contact\n" +
        "search - Search by name\n" +
        "quit   - Exit program"
    );

    
    if (option === null) {
        continue;
    }

    option = option.toLowerCase();

    
    if (option === "show") {

        let index = prompt("Enter contact index (starting from 0):");

        if (index === null) continue;

        index = Number(index);

        if (!isNaN(index) && index >= 0 && index < contacts.length) {
            let c = contacts[index];
            alert(`${c.name}\n${c.phone}\n${c.email}`);
        } else {
            alert("Invalid index.");
        }

    }

    
    else if (option === "all") {

        if (contacts.length === 0) {
            alert("No contacts available.");
        } else {
            for (let i = 0; i < contacts.length; i++) {
                console.log(
                    `${i}: ${contacts[i].name} / ${contacts[i].phone} / ${contacts[i].email}`
                );
            }
            alert("All contacts displayed.");
        }

    }

    
    else if (option === "add") {

        let name = prompt("Enter name:");
        if (name === null) continue;

        let phone = prompt("Enter phone:");
        if (phone === null) continue;

        let email = prompt("Enter email:");
        if (email === null) continue;

        
        if (name.trim() !== "" && phone.trim() !== "" && email.trim() !== "") {
            contacts.push({
                name: name.trim(),
                phone: phone.trim(),
                email: email.trim()
            });
            alert("Contact added.");
        } else {
            alert("All fields are required.");
        }
    }

    
    else if (option === "search") {

        let searchName = prompt("Enter name to search:");
        if (searchName === null) continue;

        let found = false;

        for (let i = 0; i < contacts.length; i++) {
            if (contacts[i].name.toLowerCase() === searchName.toLowerCase()) {
                alert(
                    `Found:\n${contacts[i].name}\n${contacts[i].phone}\n${contacts[i].email}`
                );
                found = true;
                break;
            }
        }

        if (!found) {
            alert("Contact not found.");
        }
    }

   
    else if (option === "quit") {
        alert("Program terminated.");
        break;
    }

    
    else {
        alert("Invalid option.");
    }
}