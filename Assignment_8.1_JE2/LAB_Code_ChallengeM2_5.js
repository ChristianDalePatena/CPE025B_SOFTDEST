class User {
    constructor({name, surname, email, role}) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.role = role;
        this.courses = [];
        this.messages = []; 
    }

    addCourse(course, level) {
        this.courses.push({ course, level });
    }

    editCourse(course, level) {
        let existingCourse = this.courses.find(c => c.course === course);
        if (existingCourse) {
            existingCourse.level = level;
        } else {
            this.courses.push({ course, level });
        }
    }

    sendMessage(from, message) {
        this.messages.push({
            from: from.email,
            to: this.email,
            message: message
        });
    }

    showMessagesHistory() {
        for (let msg of this.messages) {
            console.log(`${msg.from} -> ${msg.to}: ${msg.message}`);
        }
    }
}

class ExtendedUser extends User {
    constructor({name, surname, email, role}) {
        super({name, surname, email, role});
    }

    get fullName() {
        return `${this.name} ${this.surname}`;
    }

    set fullName(fullName) {
        let names = (fullName || '').split(' ');
        if(names[0] && names[1]) {
            this.name = names[0];
            this.surname = names[1];
        }
    }

    static match(teacher, student, course) {
        let matched = [];
        for(let scourse of student.courses) {
            for(let tcourse of teacher.courses) {
                if(scourse.course === tcourse.course && scourse.level <= tcourse.level) {
                    matched.push(scourse);
                }
            }
        }
        
        if(course) {
            for(let mcourse of matched) {
                if(mcourse.course === course) {
                    return mcourse;
                }
            }
            return null;
        } else {
            return matched;
        }
    }
}

class Teacher extends ExtendedUser {
    constructor({name, surname, email}) {
        super({name, surname, email, role: 'teacher'});
    }
}

class Student extends ExtendedUser {
    constructor({name, surname, email}) {
        super({name, surname, email, role: 'student'});
    }
}

class Tutoring {
    constructor() {
        this.students = [];
        this.teachers = [];
    }

    getStudentByName(name, surname) {
        return this.students.find(student => student.name === name && student.surname === surname);
    }

    getTeacherByName(name, surname) {
        return this.teachers.find(teacher => teacher.name === name && teacher.surname === surname);
    }

    getStudentsForTeacher(teacher) {
        return this.students.filter(student => ExtendedUser.match(teacher, student).length > 0);
    }

    getTeacherForStudent(student) {
        return this.teachers.filter(teacher => ExtendedUser.match(teacher, student).length > 0);
    }

    addStudent(name, surname, email) {
        this.students.push(new Student({name, surname, email}));
    }

    addTeacher(name, surname, email) {
        this.teachers.push(new Teacher({name, surname, email}));
    }
}

class ExtendedTutoring extends Tutoring {
    constructor() {
        super();
    }

    sendMessages(from, to = [], message) {
        if(from && to.length) {
            for(let target of to) {
                target.sendMessage(from, message);
            }
        }
    }
}


let student1 = new Student({name: 'Rafael', surname: 'Fife', email: 'rfife@rhyta.com'});
let teacher1 = new Teacher({name: 'Paula', surname: 'Thompkins', email: 'PaulaThompkins@jourrapide.com'});

student1.addCourse('maths', 2);
student1.addCourse('biology', 2); 
teacher1.addCourse('biology', 3);
teacher1.editCourse('chemistry', 4);

console.log(`${student1.fullName}: ${student1.courses.length} courses`); 
console.log(`${teacher1.fullName}: ${teacher1.courses.length} courses`); 
student1.fullName = 'Rafael Fifer';
console.log(`${student1.fullName}: ${student1.courses.length} courses`); 

console.log('Match (all):', ExtendedUser.match(teacher1, student1)); 
console.log('Match (specific):', ExtendedUser.match(teacher1, student1, 'biology')); 

console.log('--- Tutoring Tests ---');

let tutoring = new Tutoring();
tutoring.addStudent('Rafael', 'Fife','rfife@rhyta.com');
tutoring.addStudent('Kelly', 'Estes', 'k_estes@dayrep.com');
tutoring.addTeacher('Paula', 'Thompkins', 'PaulaThompkins@jourrapide.com');

let student = tutoring.getStudentByName('Rafael', 'Fife');
student.addCourse('maths', 2);
student.addCourse('physics', 4);

let teacher = tutoring.getTeacherByName('Paula', 'Thompkins');
teacher.addCourse('maths', 4);

let students = tutoring.getTeacherForStudent(student);
let teachers = tutoring.getStudentsForTeacher(teacher);
console.log(students[0]); 
console.log(teachers[0]); 

student = tutoring.getStudentByName('Kelly', 'Estes');
students = tutoring.getTeacherForStudent(student);
teachers = tutoring.getStudentsForTeacher(teacher);
console.log(students[0]); 
console.log(teachers[0]); 

console.log('--- Extended Tutoring Tests ---');

let extTutoring = new ExtendedTutoring();
extTutoring.addStudent('Rafael', 'Fife','rfife@rhyta.com');
extTutoring.addStudent('Kelly', 'Estes', 'k_estes@dayrep.com');
extTutoring.addTeacher('Paula', 'Thompkins', 'PaulaThompkins@jourrapide.com');

let to = [];
to.push(extTutoring.getStudentByName('Rafael', 'Fife'));
to.push(extTutoring.getStudentByName('Kelly', 'Estes'));

extTutoring.sendMessages(extTutoring.getTeacherByName('Paula', 'Thompkins'), to, 'test message');

for(let user of to) {
    user.showMessagesHistory();
}