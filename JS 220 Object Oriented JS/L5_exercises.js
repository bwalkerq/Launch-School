// let invoice = {
//   phone: 3000,
//   internet: 6500,
// };
// let payment = {
//   phone: 1300,
//   internet: 5500,
// };
// let invoiceTotal = invoice.phone + invoice.internet;
// let paymentTotal = payment.phone + payment.internet;
// let remainingDue = invoiceTotal - paymentTotal;
//
// console.log(paymentTotal);         // => 6800
// console.log(remainingDue);         // => 2700

// function createInvoice(services) {
//   let phone = 3000;
//   let internet = 5500;
//
//   if (services) {
//     Object.keys(services).forEach(key => {
//       if (key === 'phone') {
//         phone = services.phone;
//       } else if (key === 'internet') {
//         internet = services.internet;
//       }
//     });
//   }
//
//   return {
//     phone: phone,
//     internet: internet,
//
//     total() {
//       return phone + internet;
//     }
//   }
// }

function createInvoice1(services = {}) {
  let invoice = {
    phone: services.phone || 3000,
    internet: services.internet || 5500,
  }

  invoice.total = function () {
    return this.phone + this.internet;
  };

  return invoice;
}

/* My solution above this one was so convoluded. This solution:
* - sets a default empty object to avoid reading properties of null
* - uses the same || operators to assign values that I tried to implement
* - doesn't nest the method inside the object, but instead assigns it outside
*   the object literal... */

// function invoiceTotal(invoices) {
//   let total = 0;
//   let i;
//
//   for (i = 0; i < invoices.length; i += 1) {
//     total += invoices[i].total();
//   }
//
//   return total;
// }

// let invoices = [];
// invoices.push(createInvoice());
// invoices.push(createInvoice({
//   internet: 6500,
// }));
//
// invoices.push(createInvoice({
//   phone: 2000,
// }));
//
// invoices.push(createInvoice({
//   phone: 1000,
//   internet: 4500,
// }));

// console.log(invoiceTotal(invoices));             // => 31000

function createPayment1(services = {}) {
  return {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount,
    total() {
      if (this.amount) {
        return this.amount;
      } else {
        return this.internet + this.phone;
      }
    }
  }
}

// function paymentTotal(payments) {
//   let total = 0;
//   let i;
//
//   for (i = 0; i < payments.length; i += 1) {
//     total += payments[i].total();
//   }
//
//   return total;
// }

// let payments = [];
// payments.push(createPayment());
// payments.push(createPayment({
//   internet: 6500,
// }));
//
// payments.push(createPayment({
//   phone: 2000,
// }));
//
// payments.push(createPayment({
//   phone: 1000,
//   internet: 4500,
// }));
//
// payments.push(createPayment({
//   amount: 10000,
// }));
//
// // console.log(paymentTotal(payments));      // => 24000

function createInvoice(services = {}) {
  return {
    phone: services.phone || 3000,
    internet: services.internet || 5500,
    payments: [],

    total() {
      return this.phone + this.internet;
    },

    addPayment(payment) {
      this.payments.push(payment);
    },

    addPayments(array) {
      array.forEach(x => this.addPayment(x));
    },

    amountDue() {
      let totalPayments = this.payments.reduce((accum, payment) => {
        return accum += payment.total();
      }, 0)

      return this.total() - totalPayments;
    },
  };
}

function createPayment(services = {}) {
  return {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount,
    total() {
      if (this.amount) {
        return this.amount;
      } else {
        return this.internet + this.phone;
      }
    }
  }
}

let invoice = createInvoice({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment({
  amount: 2000,
});

let payment2 = createPayment({
  phone: 1000,
  internet: 1200,
});

let payment3 = createPayment({
  phone: 1000,
});

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
// console.log(invoice.payments)
// console.log(invoice.amountDue());       // this should return 0


let prot = {};

let foo = Object.create(prot)
// console.log(Object.getPrototypeOf(foo) === prot)
// console.log(prot.isPrototypeOf(foo))

let boo = {};
boo.myProp = 1;

let far = Object.create(boo);

// lots of code

// console.log(far.myProp);       // 1
// console.log(far.hasOwnProperty('myProp'))

function getDefiningObject(object, propKey) {
  if (object === null || object.hasOwnProperty(propKey)) {
    return object;
  } else {
    return getDefiningObject(Object.getPrototypeOf(object), propKey);
  }
}

 foo = {
  a: 1,
  b: 2,
};

let bar = Object.create(foo);
let baz = Object.create(bar);
let qux = Object.create(baz);

bar.c = 3;

// console.log(getDefiningObject(qux, 'c') === bar);     // => true
// console.log(getDefiningObject(qux, 'e'));             // => null


function shallowCopy(object) {
  return object
}

 foo = {
  a: 1,
  b: 2,
};

 bar = Object.create(foo);
bar.c = 3;
bar.say = function() {
  console.log('c is ' + this.c);
};

 baz = shallowCopy(bar);
// console.log(baz.a);       // => 1
// baz.say();                // => c is 3
// console.log(baz.hasOwnProperty('a'));  // false
// console.log(baz.hasOwnProperty('b'));  // false
// console.log(baz.hasOwnProperty('c'));  // true

function extend(destination) {
  [...arguments].forEach(obj => {
    Object.keys(obj).forEach(k => {
      destination[k] = obj[k];
    });
  });
  return destination;
}

 foo = {
  a: 0,
  b: {
    x: 1,
    y: 2,
  },
};

let joe = {
  name: 'Joe'
};

let funcs = {
  sayHello() {
    console.log('Hello, ' + this.name);
  },

  sayGoodBye() {
    console.log('Goodbye, ' + this.name);
  },
};

let object = extend({}, foo, joe, funcs);

// console.log(object.b.x);          // => 1
// object.sayHello();                // => Hello, Joe

// let Dog = function() {};
//
// Dog.prototype.say = function() {
//   console.log(this.name + ' says Woof!');
// }
//
// Dog.prototype.run = function() {
//   console.log(this.name + ' runs away.');
// }

// let fido = new Dog();
// fido.name = 'Fido';
// fido.say();             // => Fido says Woof!
// fido.run();             // => Fido runs away.
//
// let spot = new Dog();
// spot.name = 'Spot';
// spot.say();             // => Spot says Woof!
// spot.run();             // => Spot runs away.

let RECTANGLE = {
  area() {
    return this.width * this.height;
  },
  perimeter() {
    return 2 * (this.width + this.height);
  },
};

function RectangleDraft(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area.call(this);
  this.perimeter = RECTANGLE.perimeter.call(this);
}

let rect1 = new RectangleDraft(2, 3);
// console.log(rect1.area);
// console.log(rect1.perimeter);

function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.area = function () {
  return Math.PI * this.radius ** 2;
}

let a = new Circle(3);
let b = new Circle(4);

// console.log(a.area().toFixed(2)); // => 28.27
// console.log(b.area().toFixed(2)); // => 50.27


// let ninjaA;
// let ninjaB;
// function Ninja() {
//   this.swung = false;
// }
//
// ninjaA = new Ninja();
// ninjaB = new Ninja();
//
// // Add a swing method to the Ninja prototype which
// // returns the calling object and modifies swung
// Ninja.prototype.swing = function () {
//   this.swung = true;
//   return this;
// }

// console.log(ninjaA.swing().swung);      // must log true
// console.log(ninjaB.swing().swung);      // must log true


ninjaA = (function() {
  function Ninja(){};
  return new Ninja();
})();

// create a ninjaB object (2 solutions!)
let ninjaC = new (ninjaA.constructor)();
// let ninjaC = Object.create(Object.getPrototypeOf(ninjaA))

// console.log(ninjaC.constructor === ninjaA.constructor);    // should log true


// Assignment 12
let shape = {
  getType() {
    return this.type;
  },
}

function Triangle(a, b, c) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.type = 'triangle';
}

Triangle.prototype = shape;
Triangle.prototype.getPerimeter = function () {
  return this.a + this.b + this.c;
};

Triangle.prototype.constructor = Triangle; // I forgot to do this;
/*
One thing that you may miss to do is to set the constructor to the proper value.
Typically, this is done for you automatically, in that a function's prototype
object will automatically have a property constructor pointing to the function.
However, in this case, since we pointed the Triangle function's prototype to
shape, we lost that constructor reference. Therefore, we have to set it back manually.
*/

let t = new Triangle(3, 4, 5);
// console.log(t.constructor);                 // Triangle(a, b, c)
// console.log(shape.isPrototypeOf(t));        // true
// console.log(t.getPerimeter());              // 12
// console.log(t.getType());                   // "triangle"

// console.log(("Hello").constructor.name);
// console.log(([1,2,3]).constructor.name);
// console.log(({name: 'Srdjan'}).constructor.name);
// I knew to call constructor, but missed the `.name`
// I realize now that I've never seen the String Function, for example

function User(first, last) {
  if (!(this instanceof User)) {
    return new User(first, last);
  }

  this.name = first + ' ' + last;
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');
//
// console.log(name);         // => Jane Doe
// console.log(user1.name);   // => John Doe
// console.log(user2.name);   // => John Doe


function createObject(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}
// didn't get this one

 foo = {
  a: 1
};

 bar = createObject(foo);
// console.log(bar)
// console.log(bar.a)
// console.log(foo.isPrototypeOf(bar));         // true


Object.prototype.begetObject = function() {
  function F() {}
  F.prototype = this;
  return new F()
}
// got this one

 bar = foo.begetObject();
// console.log(foo.isPrototypeOf(bar));         // true

function neww(constructor, args) {
  let object = Object.create(constructor.prototype);
  let result = constructor.apply(object, args);

  return typeof result === 'object' ? result : object;
}

// function Person(firstName, lastName) {
//   this.firstName = firstName;
//   this.lastName = lastName;
// }
//
// Person.prototype.greeting = function() {
//   console.log('Hello, ' + this.firstName + ' ' + this.lastName);
// };
//
// let john = neww(Person, ['John', 'Doe']);
// john.greeting();          // => Hello, John Doe
// john.constructor;         // Person(firstName, lastName) {...}

// no explanation given. This felt like a true reach. unreachable.

// function Pet(animal, name) {
//   this.animal = animal;
//   this.name = name;
// }
//
// Pet.prototype.sleep = function () {
//   console.log("I am sleeping");
//
// }
//
// Pet.prototype.wake = function () {
//   console.log("I am sleeping");
//
// }

// let pudding = new Pet("Cat", "Pudding");
// console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
// pudding.sleep(); // I am sleeping
// pudding.wake();  // I am awake

// let neptune = new Pet("Fish", "Neptune");
// console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
// neptune.sleep(); // I am sleeping
// neptune.wake();  // I am awake


// class Cat {
//   constructor(name = 'Kitty') {
//     this.name = name;
//   }
//
//   greet() {
//     console.log(`Hey there, I'm ${this.name}!`);
//   }
//
//   rename(newName) {
//     this.name = newName;
//   }
//
//   static genericGreeting() {
//     console.log("Hello! I'm a cat!");
//   }
// }

// let kitty = new Cat();
// kitty.greet(); // Hello! My name is Kitty!
// kitty.rename('Sophie');
// kitty.greet(); // Hello! My name is Sophie!
// Cat.genericGreeting()

class Rectangle {
  constructor(width, length) {
    this.length = length;
    this.width = width;
  }

  getWidth() {
    return this.width;
  }

  getLength() {
    return this.length;
  }

  getArea() {
    return this.length * this.width;
  }
}

let rect = new Rectangle(4, 5);

// console.log(rect.getWidth()); // 4
// console.log(rect.getLength()); // 5
// console.log(rect.getArea()); // 20

class Square extends Rectangle {
  constructor(size) {
    super(size, size);
  }
}
let square = new Square(5);
// console.log(`area of square = ${square.getArea()}`); // area of square = 25

// class Cat {
//   constructor(name) {
//     this.name = name;
//   }
//   speaks() {
//     return `${this.name} says meowwww.`;
//   }
// }
//
// let fakeCat = Object.create(Cat.prototype)
//   console.log(fakeCat instanceof Cat); // logs true
// console.log(fakeCat.name);           // logs undefined
// console.log(fakeCat.speaks());       // logs undefined says meowwww.


// class Pet {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }
//
// class Cat extends Pet {
//   constructor(name, age, color) {
//     super(name, age);
//     this.color = color;
//   }
//
//   info() {
//     return `My cat ${this.name} is ${this.age} years old and has ${this.color} fur.`
//   }
// }
//
// pudding = new Cat('Pudding', 7, 'black and white');
// let butterscotch = new Cat('Butterscotch', 10, 'tan and white');
//
// console.log(pudding.info());
// console.log(butterscotch.info());

// class Animal {
//   constructor(name, age, legs, species, status) {
//     this.name = name;
//     this.age = age;
//     this.legs = legs;
//     this.species = species;
//     this.status = status;
//   }
//   introduce() {
//     return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}.`;
//   }
// }
// class Cat extends Animal {
//   constructor(name, age, status) {
//     super(name, age, 4, 'cat', status);
//   }
//
//   introduce() {
//     return super.introduce() + ' Meow meow!';
//   }
// }
// class Dog extends Animal {
//   constructor(name, age, status, master) {
//     super(name, age, 4, 'dog', status);
//     this.master = master;
//   }
//
//   greetMaster() {
//     return `Hello ${this.master}! Woof!`
//   }
// }
//
// let cat = new Cat("Pepe", 2, "happy");
// // console.log(cat.introduce() === "Hello, my name is Pepe and I am 2 years old and happy. Meow meow!");
// // logs true

class Vehicle {
  constructor(make, model, wheels) {
    this.make = make;
    this.model = model;
    this.wheels = wheels
  }

  getWheels() {
    return this.wheels;
  }

  info() {
    return `${this.make} ${this.model}`
  }
}
class Car extends Vehicle {
  constructor(make, model) {
    super(make, model, 4);
  }
}

class Motorcycle extends Vehicle {
  constructor(make, model) {
    super(make, model, 2);
  }
}

class Truck extends Vehicle {
  constructor(make, model, payload) {
    super(make, model, 6);
    this.payload = payload;
  }
}
// let car = new Car('ch', 'mo');
// console.log(car.getWheels())
// let truck = new Truck('as', 'df', 100)
// console.log(truck.info())
// console.log(truck.payload)


class Person {
  constructor(name) {
    this.name = name;
  }

  greeting() {
    return `Hello, I'm ${this.name}. It's very nice to meet you.`;
  }
}

class Shouter extends Person {
  constructor(name) {
    super(name);
  }

  greeting() {
    return super.greeting().toUpperCase();
  }
}

let person = new Person("Jane");
let shouter = new Shouter("Bob");

// console.log(person.greeting()); // Hello, I'm Jane. It's very nice to meet you.
// console.log(shouter.greeting()); // HELLO, I'M BOB. IT'S VERY NICE TO MEET YOU.


class Pet {
  constructor(type, name) {
    this.type = type;
    this.name = name;
  }
}

class Owner {
  constructor(name) {
    this.name = name;
    this.pets = [];
  }

  numberOfPets() {
    return this.pets.length;
  }
}

class Shelter {
  constructor() {
    this.adoptions = {};
  }

  adopt(owner, pet) {
    let ownerName = owner.name
    if (Object.keys(this.adoptions).includes(ownerName)) {
      this.adoptions[ownerName].push(pet);
    } else {
      this.adoptions[ownerName] = [pet];
    }
    owner.pets.push(pet)
  }
  
  printAdoptions() {
    for (let name of Object.keys(this.adoptions)) {
      console.log(name + " has adopted the following pets:")
      this.adoptions[name].forEach(pet => {
        console.log(`a ${pet.type} named ${pet.name}`)
      })
      console.log('\n')
    }
  }
}

let butterscotch = new Pet('cat', 'Butterscotch');
let pudding      = new Pet('cat', 'Pudding');
let darwin       = new Pet('bearded dragon', 'Darwin');
let kennedy      = new Pet('dog', 'Kennedy');
let sweetie      = new Pet('parakeet', 'Sweetie Pie');
let molly        = new Pet('dog', 'Molly');
let chester      = new Pet('fish', 'Chester');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');

let shelter = new Shelter();
shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);





























