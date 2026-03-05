class User {
    constructor({name, surname, email, role}) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.role = role;
        this.courses = [];
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
        let retVal;
        for(let student of this.students) {
            if(student.name === name && student.surname === surname) {
                retVal = student;
            }
        }
        return retVal;
    }

    getTeacherByName(name, surname) {
        let retVal;
        for(let teacher of this.teachers) {
            if(teacher.name === name && teacher.surname === surname) {
                retVal = teacher;
            }
        }
        return retVal;
    }

    getStudentsForTeacher(teacher) {
        let retVal = [];
        for(let student of this.students) {
            if(ExtendedUser.match(teacher, student).length) {
                retVal.push(student);
            }
        }
        return retVal;
    }

    getTeacherForStudent(student) {
        let retVal = [];
        for(let teacher of this.teachers) {
            if(ExtendedUser.match(teacher, student).length) {
                retVal.push(teacher);
            }
        }
        return retVal;
    }

    addStudent(name, surname, email) {
        this.students.push(new Student({name, surname, email}));
    }

    addTeacher(name, surname, email) {
        this.teachers.push(new Teacher({name, surname, email}));
    }
}

// --- Test Execution Block 1: Basic Class Functionality ---
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

console.log('--- Tutoring Tests below ---');

// --- Test Execution Block 2: Tutoring Class Functionality ---
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
console.log(students[0]); // -> Teacher {name: 'Paula', surname: 'Thompkins', ...
console.log(teachers[0]); // -> Student {name: 'Rafael', surname: 'Fife', ...

student = tutoring.getStudentByName('Kelly', 'Estes');
students = tutoring.getTeacherForStudent(student);
teachers = tutoring.getStudentsForTeacher(teacher);
console.log(students[0]); // -> undefined
console.log(teachers[0]); // -> Student {name: 'Rafael', surname: 'Fife', ...