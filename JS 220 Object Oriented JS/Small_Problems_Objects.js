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
    addCourse(course) {
      this.courses.push(course);
    },
    listCourses() {
      console.log(this.courses);
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

let foo = createStudent('Foo', '1st');
foo.info();
// "Foo is a 1st year student"
foo.listCourses();
// [];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.listCourses();
// [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
// "Advance Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
// "Math: Fun course"
// "Advanced Math: Difficult subject"