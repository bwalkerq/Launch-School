function createGreeter(name) {
  return {
    name,
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
    greet(timeOfDay) {
      let msg = '';
      switch (timeOfDay) {
        case 'morning':
          msg += `${this.morning} ${name}`;
          break;
        case 'afternoon':
          msg += `${this.afternoon} ${name}`;
          break;
        case 'evening':
          msg += `${this.evening} ${name}`;
          break;
      }

      console.log(msg);
    },
  };
}
const helloVictor = createGreeter('Victor');
// helloVictor.greet('morning');

/* I understood (without encountering the content from future lessons about JS
closures and garbage collected) that `name` in the switch case refers to the
argument `name`, rather than the property `name`, since there's no `this`.
 */

const item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount(percent) {
    const discount = this.price * percent / 100;
    // this.price -= discount;

    // return this.price;
    return this.price - discount;
  },
};

item.discount(20)   // should return 40
// = 40
item.discount(50)   // should return 25
// = 20
item.discount(25)   // should return 37.5
// = 15
/*this was easy, too.*/


/*Testing Object Equality*/
function objectsEqual(first, second) {
  return (keysMatch(first,second) && valuesMatch(first,second))
  function keysMatch(a,b) {
    const aKeys = Object.keys(a).sort();
    const bKeys = Object.keys(b).sort();
    return aKeys.every((value, index) => value === bKeys[index]);
  }

  function valuesMatch(a,b) {
    const aKeys = Object.keys(a).sort();
    return aKeys.every(key => a[key] === b[key]);
  }
}

// console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
// console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
// console.log(objectsEqual({a: 'foo', b: 'bar'}, {b: "bar", a: 'foo'}));  // true
// console.log(objectsEqual({}, {}));                                      // true
// console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false
/*This last one got me. My solution does the same as the given, but mine
* does the unconventional (I haven't seen it anywhere else) way by turning the
* whole keys array to a string and comparing those...
* I can't think of an instance when this would not work...oh wait. dang. if one
* had a key '1' and the other 1...
* I have to rewrite my solution
*
* it makes sense that I haven't seen that pattern anywhere else. This updated
* solution is the same as the given, because it is bombproof.
*
* It's verbose, but at the same time, it's the only way to catch all the potential
* edge cases
* */

/*
info: Logs the name and year of the student.
addCourse: Enrolls student in a course. A course is an object literal that has
properties for its name and code.
listCourses: Returns a list of the courses student has enrolled in.
addNote: Adds a note property to a course. Takes a code and a note as an
argument. If a note already exists, the note is appended to the existing one.
updateNote: Updates a note for a course. Updating a note replaces the existing
note with the new note.
viewNotes: Logs the notes for all the courses. Courses without notes are not displayed.
*/
function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],
    info() {
      console.log(`${this.name} is a ${this.year} year student.`);
    },
    // adds a course object with name and code properties
    // e.g. { name: 'Math', code: 101 }
    addCourse(course) {
      this.courses.push(course);
    },
    listCourses() {
      return this.courses;
    },
    addNote(code, note) {
      this.courses.forEach(courseObj => {
        if (courseObj.code === code) {
          courseObj.notes = courseObj.notes || [];
          courseObj.notes.push(note);
        }
      });
    },
    viewNotes() {
      this.courses.forEach(courseObj => {
        if (courseObj.notes) {
          console.log(courseObj.name + ': ' + courseObj.notes.join('; '))
        }
      });
    },
    updateNote(code, note) {
      this.courses.forEach(courseObj => {
        if (courseObj.code === code) {
          courseObj.notes = [];
          courseObj.notes.push(note);
        }
      });
    },
  }
}

// let foo = createStudent('Foo', '1st');
// foo.info();
// // "Foo is a 1st year student"
// foo.listCourses();
// // [];
// foo.addCourse({ name: 'Math', code: 101 });
// foo.addCourse({ name: 'Advanced Math', code: 102 });
// foo.listCourses();
// // [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
// foo.addNote(101, 'Fun course');
// foo.addNote(101, 'Remember to study for algebra');
// foo.viewNotes();
// // "Math: Fun course; Remember to study for algebra"
// foo.addNote(102, 'Difficult subject');
// foo.viewNotes();
// // "Math: Fun course; Remember to study for algebra"
// // "Advance Math: Difficult subject"
// foo.updateNote(101, 'Fun course');
// foo.viewNotes();
// // "Math: Fun course"
// // "Advanced Math: Difficult subject"

const school = (function() {
  const students = [];
  const validYears = ['1st', '2nd', '3rd', '4th', '5th']
  function getCourse(student, courseName) {
    return student.courses.filter(({name}) => name === courseName)[0];
  }

  return {
    addStudent(name, year) {
      if (validYears.includes(year)){
        const newStudent = createStudent(name, year);
        students.push(newStudent);
        return newStudent;
      } else {
        console.log('Invalid Year.');
      }
    },

    // adds the course object to the student's courses property.
    enrollStudent(student, courseName, code) {
      student.addCourse({name: courseName, code})
    },

    // adds a grade property to the student's course
    addGrade(student, courseName, grade) {
      const course = getCourse(student,courseName);
      if (course) {
        course.grade = grade;
      }
    },
    // my solution didn't rely on listcourses, which is smoother, and also
    // relied on coursecode, which could be duplicated for, say, two intro courses.
    // addGrade(student, courseCode, grade) {
    //   student.courses.forEach(courseObj => {
    //     if (courseObj.code === courseCode) {
    //       courseObj.grade = grade;
    //     }
    //   });
    // },

    // logs all classes and grades (or 'in progress') for a student
    getReportCard(studentObj) {
      studentObj.courses.forEach(courseObj => {
        console.log(courseObj.name + ': '
          + (courseObj.grade || 'In progress'))
      })
    },

    // given a name of a course, logs the grades for each student enrolled
    // in the course with a grade.
    courseReport(courseName) {
      const courseStudents = students.map(student => {
        const course = getCourse(student, courseName) || { grade: undefined };
        return { name: student.name, grade: course.grade };
      }).filter(({grade}) => grade);

      if (courseStudents.length > 0) {
        console.log(`=${courseName} Grades=`);

        const average = courseStudents.reduce((total, {name, grade}) => {
          console.log(`${name}: ${String(grade)}`);
          return total + grade;
        }, 0) / courseStudents.length;

        console.log('---');
        console.log(`Course Average: ${String(average)}`);
      }
    },
  }
})();

// Examples of created student objects with grades; methods
// on the objects are not shown here for brevity. The
// following are only showing the properties that aren't
// methods for the three objects
const paul= {
  name: 'Paul',
  year: '3rd',
  courses: [
    { name: 'Math', code: 101, grade: 95, },
    { name: 'Advanced Math', code: 102, grade: 90, },
    { name: 'Physics', code: 202, }
  ],
}

const mary= {
  name: 'Mary',
  year: '1st',
  courses: [
    { name: 'Math', code: 101, grade: 91, },
  ],
}


const kim = {
  name: 'Kim',
  year: '2nd',
  courses: [
    { name: 'Math', code: 101, grade: 93, },
    { name: 'Advanced Math', code: 102, grade: 90, },
   ],
}


//pre-populating the school for the test cases
// school.students.push(kim, mary, paul)
// this no longer works because I made the list of students private.

let benji = school.addStudent('Benji', '4th');
school.enrollStudent(benji, 'calcII', 102);
school.addGrade(benji, 'calcII', 93);
// benji.listCourses()

school.getReportCard(paul);
// = Math: 95
//   = Advanced Math: 90
//   = Physics: In progress

school.courseReport('Math');
// = =Math Grades=
//   = Paul: 95
//   = Mary: 91
//   = Kim: 93
//   = ---
//   = Course Average: 93

school.courseReport('Advanced Math');
// = =Advanced Math Grades=
//   = Paul: 90
//   = Kim: 90
//   = ---
//   = Course Average: 90

school.courseReport('Physics');
// = undefined
















