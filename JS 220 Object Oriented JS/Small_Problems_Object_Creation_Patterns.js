// Implement an ancestors method that returns the prototype chain (ancestors) of a calling object as an array of object names. Here's an example output:

// name property added to make objects easier to identify
// const foo = {name: 'foo'};
// const bar = Object.create(foo);
// bar.name = 'bar';
// const baz = Object.create(bar);
// baz.name = 'baz';
// const qux = Object.create(baz);
// qux.name = 'qux';

// foo.prototype.ancestors = function() {
// Object.getPrototypeOf(foo).ancestors = function() {
//   let ancestors = [];
//   let current = this;
//   while (Object.getPrototypeOf(current) !== null) {
//     // console.log(current);
//     ancestors.push(Object.getPrototypeOf(current).name || 'Object.prototype');
//     current = Object.getPrototypeOf(current);
//   }
//   return ancestors;
// }

// console.log(qux.ancestors());  // returns ['baz', 'bar', 'foo', 'Object.prototype']
// console.log(baz.ancestors());  // returns ['bar', 'foo', 'Object.prototype']
// console.log(bar.ancestors());  // returns ['foo', 'Object.prototype']
// console.log(foo.ancestors());  // returns ['Object.prototype']


// #2 Delegate
function delegate(obj, name, ...args) {
  return () => {
    return obj[name](...args)
  }
}

const foo = {
  name: 'test',
  bar(greeting) {
    console.log(`${greeting} ${this.name}`);
  },
};

const baz = {
  qux: delegate(foo, 'bar', 'hello'),
};

// baz.qux();   // logs 'hello test';
//
// foo.bar = () => { console.log('changed'); };
//
// baz.qux();          // logs 'changed'


// #3 Classical Object Creation

// function Person(first, last, age, gender) {
//   this.firstName = first;
//   this.lastName = last;
//   this.age = age;
//   this.gender = gender;
// }

// Person.prototype.fullName = function () {
//   return this.firstName + ' ' + this.lastName;
// }
//
// Person.prototype.communicate = function() {
//   console.log('Communicating')
// }
//
// Person.prototype.eat = function() {
//   console.log('Eating')
// }

// Person.prototype.sleep = function() {
//   console.log('Sleeping')
// }

class Person {
  constructor(first, last, age, gender) {
    this.firstName = first;
    this.lastName = last;
    this.age = age;
    this.gender = gender;
  }

  fullName() {
    return this.firstName + ' ' + this.lastName;
  }

  communicate() { console.log('Communicating') }

  eat() { console.log('Eating') }

  sleep() { console.log('Sleeping') }
}



class Doctor extends Person {
  constructor(first, last, age, gender, specialization) {
    super(first, last, age, gender);
    this.specialization = specialization;
  }

  diagnose() {
    console.log('Diagnosing')
  }
}

// function Doctor(first, last, age, gender, specialization) {
//   Person.call(this, first, last, age, gender);
//   this.specialization = specialization
// }

// Doctor.prototype = Object.create(Person.prototype);
// Doctor.prototype.diagnose = function () {
//   console.log('Diagnosing')
// }
// Doctor.prototype.constructor = Doctor;

// function Professor(firstName, lastName, age, gender, subject) {
//   Person.call(this, firstName, lastName, age, gender);
//   this.subject = subject;
// }
//
// Professor.prototype = Object.create(Person.prototype);
// Professor.prototype.teach = () => {
//   console.log('Teaching');
// };
// Professor.prototype.constructor = Professor;

class Professor extends Person {
  constructor(firstName, lastName, age, gender, subject) {
    super(firstName, lastName, age, gender);
    this.subject = subject;
  }

  teach() {
    console.log('Teaching');
  }
}

// function Student(first, last, age, gender, degree) {
//   Person.call(this, first, last, age, gender);
//   this.degree = degree;
// }
//
// Student.prototype = Object.create(Person.prototype);
// Student.prototype.study = function () {
//   console.log('Studying');
// }
// Student.prototype.constructor = Student;

class Student extends Person {
  constructor(first, last, age, gender, degree) {
    super(first, last, age, gender);
    this.degree = degree;
  }

  study() {
    console.log('Studying')
  }
}

// function GraduateStudent(first, last, age, gender, degree, graduateDegree) {
//   Student.call(this, first, last, age, gender, degree);
//   this.graduateDegree = graduateDegree;
// }
//
// GraduateStudent.prototype = Object.create(Student.prototype);
// GraduateStudent.prototype.research = function () {
//   console.log('Researching');
// }
// GraduateStudent.prototype.constructor = GraduateStudent;

class GraduateStudent extends Student {
  constructor(first, last, age, gender, degree, graduateDegree) {
    super(first, last, age, gender, degree);
    this.graduateDegree = graduateDegree;
  }

  research() {
    console.log('Researching')
  }
}

const person = new Person('Foo', 'Bar', 21, 'male');
// console.log(person instanceof Person);       // logs true
// console.log(person instanceof Doctor);       // logs false
// console.log(person instanceof Professor);    // logs false
// console.log(person instanceof Student);      // logs false
// person.eat();                                // logs 'Eating'
// person.communicate();                        // logs 'Communicating'
// person.sleep();                              // logs 'Sleeping'
// console.log(person.fullName());              // logs 'Foo Bar'

const doctor = new Doctor('Bar', 'Qux', 21, 'female', 'Pediatrics');
// console.log(doctor instanceof Person);       // logs true
// console.log(doctor instanceof Doctor);       // logs true
// console.log(doctor instanceof Professor);    // logs false
// console.log(doctor instanceof Student);      // logs false
// doctor.eat();                                // logs 'Eating'
// doctor.communicate();                        // logs 'Communicating'
// doctor.sleep();                              // logs 'Sleeping'
// console.log(doctor.fullName());              // logs 'Bar Qux'
// doctor.diagnose();                           // logs 'Diagnosing'


const professor = new Professor('Bar', 'Foo', 48, 'female', 'Law');
// console.log(professor instanceof Person);    // logs true
// console.log(professor instanceof Professor); // logs true
// console.log(professor instanceof Doctor);    // logs false
// console.log(professor instanceof Student);   // logs false
// professor.eat();                             // logs 'Eating'
// professor.communicate();                     // logs 'Communicating'
// professor.sleep();                           // logs 'Sleeping'
// console.log(professor.fullName());           // logs 'Bar Foo'
// professor.teach();                           // logs 'Teaching'

const graduateStudent = new GraduateStudent('Qux', 'Bar', 21, 'non-binary', 'BS Industrial Engineering', 'MS Industrial Engineering');
// logs true for next three statements
// console.log(graduateStudent instanceof Person);          // logs true
// console.log(graduateStudent instanceof Student);         // logs true
// console.log(graduateStudent instanceof GraduateStudent); // logs true
// console.log(graduateStudent instanceof Professor);       // logs false
// console.log(graduateStudent instanceof Doctor);          // logs false
// graduateStudent.eat();                       // logs 'Eating'
// graduateStudent.communicate();               // logs 'Communicating'
// graduateStudent.sleep();                     // logs 'Sleeping'
// console.log(graduateStudent.fullName());     // logs 'Qux Bar'
// graduateStudent.study();                     // logs 'Studying'
// graduateStudent.research();                  // logs 'Researching'

function Bard() {}
function Food() {}
Food.prototype = Object.create(Bard.prototype)

let bard = Bard.prototype;
let food = new Food;
// console.log(bard.isPrototypeOf(food))
// console.log(Object.getPrototypeOf(food) === bard)

let canI = new Bard.prototype.constructor
// console.log(canI instanceof Bard)




// #4 - Mini Inventory Management System
class Item {
  constructor(name, category, quantity) {
    this.skuCode = this.makeSKU(name, category);
    this.name = name;
    this.category = category;
    this.quantity = quantity;
  }

  makeSKU(name, category) {
    return (name.slice(0,3) + category.slice(0,2)).toUpperCase();
  }
}

let ItemManager = {
  items: [],

  create(name, category, quantity) {
    if (name.length < 5 || category.length < 5 || category.includes(' ') || quantity === undefined) {
      return false
    } else {
      this.items.push(new Item(name, category, quantity));
    }
  },

  update(sku, obj) {
    this.items.map(item => {
      if (item.skuCode === sku) {
        for (const objKey in obj) {
          item[objKey] = obj[objKey];
        }
      }
    })
  },

  delete(sku) {
    this.items = this.items.filter(item => {
      return item.skuCode !== sku
    })
  },

  inStock() {
    return this.items.filter(item => {
      return item.quantity > 0;
    })
  },

  itemsInCategory(category) {
    return this.items.filter(item => {
      return item.category === category;
    })
  },
}

const ReportManager = {
  init(itemManagerObj) {
    this.items = itemManagerObj;
  },

  createReporter(sku) {
    const item = this.items.items.filter(i => i.skuCode === sku)[0]
    return {
      itemInfo() {
        for (let itemKey in item) {
          console.log(itemKey + ': ' + item[itemKey])
        }
      }
    }
  },

  reportInStock() {
    this.items.items.forEach(item => {
      if (item.quantity > 0) {
        console.log(item.name);
      }
    })
  }

}


ItemManager.create('basket ball', 'sports', 0);           // valid item
ItemManager.create('asd', 'sports', 0);
ItemManager.create('soccer ball', 'sports', 5);           // valid item
ItemManager.create('football', 'sports');
ItemManager.create('football', 'sports', 3);              // valid item
ItemManager.create('kitchen pot', 'cooking items', 0);
ItemManager.create('kitchen pot', 'cooking', 3);          // valid item

// console.log(ItemManager.items);
// returns list with the 4 valid items
//
ReportManager.init(ItemManager);
ReportManager.reportInStock();
// // logs soccer ball,football,kitchen pot
//
ItemManager.update('SOCSP', { quantity: 0 });
// console.log(ItemManager.inStock());
// // returns list with the item objects for football and kitchen pot
ReportManager.reportInStock();
// // logs football,kitchen pot
// console.log(ItemManager.itemsInCategory('sports'));
// // returns list with the item objects for basket ball, soccer ball, and football
ItemManager.delete('SOCSP');
// console.log(ItemManager.items);
// // returns list with the remaining 3 valid items (soccer ball is removed from the list)

const kitchenPotReporter = ReportManager.createReporter('KITCO');
// kitchenPotReporter.itemInfo();
// // logs
// // skuCode: KITCO
// // itemName: kitchen pot
// // category: cooking
// // quantity: 3
//
ItemManager.update('KITCO', { quantity: 10 });
// kitchenPotReporter.itemInfo();
// // logs
// // skuCode: KITCO
// // itemName: kitchen pot
// // category: cooking
// // quantity: 10



















