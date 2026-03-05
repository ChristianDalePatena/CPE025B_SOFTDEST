
function sendEmail(from, to, message) {
    console.log(`Email sent from ${from} to ${to}: ${message}`);
}


class User {
    constructor({name, surname, email, role}) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.role = role;
        this.messages = [];
        this.courses = [];
    }

    
    addCourse(course, level) {
        if (!this.courses.find(c => c.course === course)) {
            this.courses.push({course, level});
        }
    }

   
    removeCourse(course) {
        const index = this.courses.findIndex(c => c.course === course);
        if (index !== -1) this.courses.splice(index, 1);
    }

   
    editCourse(course, level) {
        const c = this.courses.find(c => c.course === course);
        if (c) c.level = level;
    }

    
    sendMessage(toUser, message) {
        
        this.messages.push({from: this.email, to: toUser.email, content: message});
        
        toUser.messages.push({from: this.email, to: toUser.email, content: message});
        
        sendEmail(this.email, toUser.email, message);
    }

    
    showMessagesHistory() {
        for (let message of this.messages) {
            console.log(`${message.from} -> ${message.to}: ${message.content}`);
        }
    }
}



let student1 = new User({name: 'Rafael', surname: 'Fife', email: 'rfife@rhyta.com', role: 'student'});
let student2 = new User({name: 'Kelly', surname: 'Estes', email: 'k_estes@dayrep.com', role: 'student'});
let teacher1 = new User({name: 'Paula', surname: 'Thompkins', email: 'PaulaThompkins@jourrapide.com', role: 'teacher'});


student1.addCourse('maths', 2);
student1.addCourse('physics', 1);
student1.removeCourse('physics');

teacher1.addCourse('biology', 3);
teacher1.editCourse('biology', 4);

console.log(`${student1.name}: ${student1.courses.length} courses`); // Rafael: 1 courses
console.log(`${teacher1.name}: ${teacher1.courses.length} courses`); // Paula: 1 courses


teacher1.sendMessage(student1, 'test message');
teacher1.sendMessage(student1, 'another message');


console.log("\nTeacher's message history:");
teacher1.showMessagesHistory();


console.log("\nStudent's message history:");
student1.showMessagesHistory();