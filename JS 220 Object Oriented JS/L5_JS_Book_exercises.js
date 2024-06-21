let apple = {
  name: 'Apple',
  color: 'Red',

  isRipe: function() {
    return `This ${this.name} is ripe.`;
  },

  describe: function() {
    return `This ${this.name} is ${this.color}.`;
  },
};

let banana = {
  name: 'Banana',
  color: 'Yellow',

  isRipe: function() {
    return `This ${this.name} is ripe.`;
  },

  describe: function() {
    return `This ${this.name} is ${this.color}.`;
  },
};

let blackberry = {
  name: 'Blackberry',
  color: 'Black',

  isRipe: function() {
    return `This ${this.name} is ripe.`;
  },

  describe: function() {
    return `This ${this.name} is ${this.color}.`;
  },
};

function makeFruit(name, color) {
  return {
    name,
    color,
    isRipe() {
      return `This ${this.name} is ripe.`;
    },
    describe() {
      return `This ${this.name} is ${this.color}.`;
    },
  };
}

function makePhone(brand, model, releaseYear) {
  return {
    brand,
    model,
    releaseYear,
    checkBattery() {
      console.log('your battery is lit');
    },
    displayInfo() {
      return `${releaseYear} ${brand} ${model}`;
    },
  };
}
let fancy = makePhone('Apple', 'iphone12', '2020');
let layman = makePhone('Samsung', 'Galazy s21', '2021');
// console.log(fancy, layman)

function createInstrument(name, type) {
  return {
    name,
    type,
    play() {
      console.log(`We are playing a tune on this ${name}.`)
    },
    showType() {
      console.log(`This ${name} is a ${type} instrument.`)
    },
  }
}

// let violin = createInstrument('violin', 'string');
// violin.play();     // We are playing a tune on this violin
// violin.showType(); // This violin is a string instrument
//
// let flute = createInstrument('flute', 'wind');
// flute.play();      // We are playing a tune on this flute
// flute.showType();  // This flute is a wind instrument
//
// let drum = createInstrument('drum', 'percussion');
// drum.play();       // We are playing a tune on this drum
// drum.showType();   // This drum is a percussion instrument

class Phone {
  constructor(brand, model, releaseYear) {
    this.brand = brand;
    this.model = model;
    this.releaseYear = releaseYear;
  }

  checkBattery() {
    console.log('your battery is lit');
  }

  displayInfo() {
    return `${this.releaseYear} ${this.brand} ${this.model}`;
  }

}

// console.log(boo instanceof Dog)

class OriginalVehicle {
  constructor(color, weight) {
    this.color = color;
    this.weight = weight;
  }

  accelerate() {
    console.log("let's gooooo");
  }

  decelerate() {
    console.log('slowing down...');
  }
}

// class Car extends OriginalVehicle {
//   constructor(color, weight, licenseNumber) {
//     super(color, weight);
//     this.licenseNumber = licenseNumber;
//   }
//
//   honk() {
//     console.log('beep beep');
//   }
// }
//
// class Boat extends OriginalVehicle {
//   constructor(color, weight, homePort) {
//     super(color, weight);
//     this.homePort = homePort;
//   }
//
//   dropAnchor() {
//     console.log("Anchor's away!")
//   }
// }
//
// class Plane extends OriginalVehicle {
//   constructor(color, weight, airline) {
//     super(color, weight);
//     this.airline = airline;
//   }
//
//   takeOff() {
//     console.log('take off!')
//   }
//
//   land() {
//     console.log("set'r down easy.")
//   }
// }

// let car = new Car('red', 3300, 'BXY334');
// car.accelerate();             // Accelerate
// car.honk();                   // Honk
// car.decelerate();             // Decelerate
// console.log(car.color, car.weight, car.licenseNumber);
// // red 3300 BXY334
//
// let boat = new Boat('yellow', 12000, 'Bahamas');
// boat.accelerate();            // Accelerate
// boat.decelerate();            // Decelerate
// boat.dropAnchor();            // Drop anchor
// console.log(boat.color, boat.weight, boat.homePort);
// // yellow 12000 Bahamas
//
// let plane = new Plane('blue', 83000, 'Southwest');
// plane.accelerate();           // Accelerate
// plane.takeOff();              // Take off
// plane.land();                 // Land
// plane.decelerate();           // Decelerate
// console.log(plane.color, plane.weight, plane.airline);
// // yellow 12000 Bahamas
//
// console.log(car instanceof Vehicle)
// console.log(car instanceof Car)
// console.log(boat instanceof Vehicle)
// console.log(boat instanceof Car)


class Person {
  #name;
  #age;

  constructor(name, age) {
    this.#name = name;
    this.#setAge(age);
  }

  showAge() {
    console.log(this.#age);
  }

  #setAge(newAge) {
    if (newAge < 1 || typeof(newAge) !== 'number') {
      throw new RangeError('age must be a positive number.');
    } else {
      this.#age = newAge;
    }
  }
}

let person = new Person('John', 30);
// person.showAge(); // 30

// let person2 = new Person('John', -5);
// RangeError: Age must be positive

// person.#age = 'abc';

class Book {
  #title;
  #author;
  #year;

  constructor(title, author, year) {
    this.#title = title;
    this.#author = author;
    this.year = year;
  }

  get title() {
    return this.#title;
  }

  get author() {
    return this.#author;
  }

  get year() {
    return this.#year;
  }

  set year(newYear) {
    if (newYear > 1900 && typeof newYear === 'number') {
      this.#year = newYear;
    } else {
      throw new RangeError('Invalid year')
    }
  }
}

let book = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 1925);
// console.log(book.title);  // The Great Gatsby
// console.log(book.author); // F. Scott Fitzgerald
// console.log(book.year);   // 1925
//
// book.year = 1932;         // Changing year
// console.log(book.year);   // 1932
//
// try {
//   book.year = 1825;
// } catch (e) {
//   console.log(e);   // RangeError: Invalid year
// }
//
// try {
//   let book2 = new Book('A Tale of Two Cities', 'Charles Dickents', 1859);
// } catch (e) {
//   console.log(e);   // RangeError: Invalid year
// }

class BankAccount {
  #balance;

  constructor() {
    this.#balance = 0;
  }

  #checkBalance() {
    console.log('Current balance: ' + this.#balance)
  }

  deposit(amount) {
    this.#balance += amount;
    this.#checkBalance();
  }

  withdraw(amount) {
    if (amount > this.#balance) {
      throw new RangeError('Insufficient Funds');
    } else {
      this.#balance -= amount;
      this.#checkBalance();
    }
  }
}

let account = new BankAccount();
// account.deposit(110);
// account.withdraw(50);
// account.withdraw(100); // RangeError: Insufficient funds

class Rectangle {
  #width;
  #height;

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
  }

  get width() {
    return this.#width;
  }

  get height() {
    return this.#height;
  }

  set width(newWidth) {
    if (newWidth > 0) {
      this.#width = newWidth;
    } else {
      throw new RangeError('width must be positive')
    }
  }

  set height(newHeight) {
    if (newHeight > 0) {
      this.#height = newHeight;
    } else {
      throw new RangeError('height must be positive')
    }
  }

  get area() {
    return this.height * this.width;
  }
}

let rect = new Rectangle(10, 5);
// console.log(rect.area); // 50
//
// rect.width = 20;
// console.log(rect.area); // 100
//
// rect.height = 12;
// console.log(rect.area); // 240
//
// try {
//   rect.width = 0;
// } catch (e) {
//   console.log(e); // RangeError: width must be positive
// }
//
// try {
//   rect.height = -10;
// } catch (e) {
//   console.log(e); // RangeError: height must be positive
// }

class MathUtils {
  static add(a, b) {
    return a + b;
  }

  static subtract(a, b) {
    return a - b;
  }

  static multiply(a, b) {
    return a * b;
  }

  static divide(a, b) {
    if (b === 0) {
      throw new RangeError('Division by zero')
    } else {
      return a / b;
    }
  }
}

// console.log(MathUtils.add(5, 3));       // 8
// console.log(MathUtils.subtract(10, 4)); // 6
// console.log(MathUtils.multiply(6, 7));  // 42
// console.log(MathUtils.divide(20, 5));   // 4
// console.log(MathUtils.divide(10, 0));   // RangeError: Division by zero


/*
* class Phone {
  constructor(brand, model, releaseYear) {
    this.brand = brand;
    this.model = model;
    this.releaseYear = releaseYear;
  }

  checkBattery() {
    console.log('your battery is lit');
  }

  displayInfo() {
    return `${this.releaseYear} ${this.brand} ${this.model}`;
  }

}
* Brand	Model	Release Year
Apple	iPhone 12	2020
Samsung	Galaxy S21	2021
*/
function Smartphone(brand, model, releaseYear) {
  this.brand = brand;
  this.model = model;
  this.releaseYear = releaseYear;
}

Smartphone.prototype.checkBatteryLevel = function () {
  return ('Don\'t worry, your battery is lit.');
}

Smartphone.prototype.displayInfo = function () {
  return `${this.releaseYear} ${this.brand} ${this.model}`;
}

let iphone12 = new Smartphone('Apple', 'iPhone 12', 2020);
let galaxyS21 = new Smartphone('Samsung', 'Galaxy S21', 2021);

// console.log(iphone12.checkBatteryLevel());
// // Apple iPhone 12 has 75% battery remaining.
//
// console.log(iphone12.displayInfo());
// // 2020 Apple iPhone 12
//
// console.log(galaxyS21.checkBatteryLevel());
// // Samsung Galaxy S21 has 75% battery remaining.
//
// console.log(galaxyS21.displayInfo());
// // 2021 Samsung Galaxy S21

function Vehicle(color, weight) {
  this.color = color;
  this.weight = weight;
}

Vehicle.prototype.accelerate = function () {
  console.log("let's gooooo");
}

Vehicle.prototype.decelerate = function () {
  console.log('slowing down...');
}

function Car(color, weight, licNum) {
  Vehicle.call(this, color, weight);
  this.licenseNumber = licNum;
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;
Car.prototype.honk = function () {
  console.log('beep beep');
}

function Boat(color, weight, homePort) {
  Vehicle.call(this, color, weight);
  this.homePort = homePort;
}

Boat.prototype = Object.create(Vehicle.prototype);
Boat.prototype.constructor = Boat;
Boat.prototype.dropAnchor = function () {
  console.log("Anchor's away!")
}
function Plane(color, weight, airline) {
  Vehicle.call(this, color, weight);
  this. airline = airline;
}

Plane.prototype = Object.create(Vehicle.prototype);
Plane.prototype.constructor = Plane;
Plane.prototype.takeOff = function () {
  console.log('take off!')
}

Plane.prototype.land = function () {
  console.log("set'r down easy.")
}

let car = new Car('red', 3300, 'BXY334');
car.accelerate();             // Accelerate
car.honk();                   // Honk
car.decelerate();             // Decelerate
console.log(car.color, car.weight, car.licenseNumber);
// red 3300 BXY334

let boat = new Boat('yellow', 12000, 'Bahamas');
boat.accelerate();            // Accelerate
boat.decelerate();            // Decelerate
boat.dropAnchor();            // Drop anchor
console.log(boat.color, boat.weight, boat.homePort);
// yellow 12000 Bahamas

let plane = new Plane('blue', 83000, 'Southwest');
plane.accelerate();           // Accelerate
plane.takeOff();              // Take off
plane.land();                 // Land
plane.decelerate();           // Decelerate
console.log(plane.color, plane.weight, plane.airline);
// yellow 12000 Bahamas
























