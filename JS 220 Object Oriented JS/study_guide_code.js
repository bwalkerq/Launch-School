// potential gotcha
function Cat(name) {
  if (name === undefined) {
    // return "error!" can't do this! if a primitive is explicitly returned, returns the object
    return {error: "no name"}
  }

  this.name = name
}
// -------------------------------

// IIFE
let counter = function () {
  let count = 0;
  return function () {
    count += 1;
    return count;
  };
}();

// console.log(counter())
// console.log(counter())
// console.log(counter())

class Piggybank {
  constructor() {
    this.coins = [];
  }

  static sound() {
    console.log('coins jingling')
  }

  static material = 'ceramic';
}

// Piggybank.sound()
// console.log(Piggybank.material);

function makeCar() {
  let speed = 0
  return {
    gas(num) {
      speed += num;
      console.log(speed);
    },

    brake(num) {
      if (num > speed) num = speed;
      speed -= num;
      console.log(speed);
    }
  }
}

// let camry = makeCar();
// camry.gas(10); // 10
// camry.gas(10); // 20
// camry.brake(10); // 10
// camry.brake(20); // 0

let bob = {
  name: 'Bob',
}

Object.defineProperties(bob, {
  height: {
    value: 70,
    writable: false,
  },
});

// console.log(bob.height)

class Stamp{
  constructor(name) {
    this.name = name;
    Stamp.allMinted.push(name);
    return this;
  }

  static allMinted = []
}

let st1 = new Stamp('orchid');
let st2 = new Stamp('shrek');
// console.log(Stamp.allMinted); // ['orchid', 'shrek']

let myDog = {
  // metricWeight() { return this.weight / 2.2 },
  weight: 15,
  age: 10,
  // get lbsPerYear() {return}
  get metricWeight() { return this.weight / 2.2},
  // metricWeight: this.weight / 2.2,

  birthday() {this.age += 1}
}

Object.defineProperties(myDog, {
  metricWeight: {
    value: () => {
      console.log(this);
      return myDog.weight / 2.2
    },
    writable: false,
  }
});

// console.log(myDog.metricWeight());


class Doggie {
  weight;
  metricWeight;
  timesPetted = 0;
  constructor(weight) {
    this.weight = weight;
    this.metricWeight = weight / 2.2;
  }

  pet() {
    this.petted += 1;
  }
}

let jon = new Doggie(20)
// console.log(jon.metricWeight)


// advancedMath.js
// module.exports = {
//   find,
//   rotate,
//   PHI,
// }

// main.js
// const {find, rotate, PHI} = require('./advnacedMath.js')

let obj = { a: 123};
aFunction = function() {
  return this.a;
}.bind(obj)
// console.log(aFunction());

let shoe = {};

function BabyShoe() {}

BabyShoe.prototype = Object.create(Object.getPrototypeOf(shoe))

function OinkBank() {
  this.total = 0;
}

OinkBank.prototype.deposit = function(amount) {
  this.total += amount;
}

let jonny = new OinkBank();
jonny.deposit(100);
// console.log(jonny.total)


let rock = {
  breed: "pomeranian",
  introduce() {
    let self = this;
    function shoutBreed() {
      return self.breed.toUpperCase();
    }
    console.log("I'm a " + shoutBreed());
  },
}

rock.introduce();






