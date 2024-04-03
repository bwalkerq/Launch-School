'use strict';

const SUITS = ["Clubs", "Diamonds", "Hearts", "Spades"];
const RANKS = ["2", "3", "4", "5", "6", "7", "8", "9",
  "10", "Jack", "Queen", "King", "Ace"];

function createDeck() {
  let allCards = () => {
    return SUITS.reduce((deck, suit) => {
      RANKS.forEach(rank => deck.push(`${rank} of ${suit}`));
      return deck;
    }, []);
  };

  let deck = allCards();
  shuffle(deck);

  return deck;
}

function shuffle(deck) {
  for (let counter = 0; counter < 256; counter += 1) {
    let randomIndex1 = randomCardIndex();
    let randomIndex2 = randomCardIndex();
    let tempCard = deck[randomIndex1];
    deck[randomIndex1] = deck[randomIndex2];
    deck[randomIndex2] = tempCard;
  }

  function randomCardIndex() {
    return Math.floor(Math.random() * deck.length);
  }
}

// console.log(createDeck());


// Rewrite the following code using classic JavaScript syntax:
function foo() {
  return {
    // bar() {
    bar: function() {
      console.log("bar");
    },
    qux: function(arg1) { // also written from `qux(arg1) {`
      console.log("qux");
      console.log(arg1);
    },
    baz: function(arg1, arg2) { // same
      console.log("baz");
      console.log(arg1);
      console.log(arg2);
    },
  };
}

// with sugar:
function foo(one, two, three) {
  return {
    bar: one,
    baz: two,
    qux: three,
  };
}

let { baz, qux, bar } = foo(1, 2, 3);

// without sugar:
function foo(one, two, three) {
  return {
    bar: one,
    baz: two,
    qux: three,
  };
}
let obj = foo(1,2,3); // instantiates an object with these properties
let baz = obj.baz; // destructures object's properties into local variables.
let qux = obj.qux;
let bar = obj.bar;

// with sugar:
function foo([ one, , three ]) {
  return [
    three,
    5,
    one,
  ];
}

let array = [1, 2, 3];
let result = foo(array);
let [ bar, qux, baz ] = result;

// without sugar:

function foo(arr) {
  return [
    arr[2],
    5,
    arr[0],
  ];
}
// this is way less efficient that with sugar, which allows for naming

let array = [1, 2, 3];
let result = foo(array);
let bar = result[0];
let qux = result[1];
let baz = result[2] // destructures array's value's into local variables.

// with sugar:
function product(num1, num2, num3) {
  return num1 * num2 * num3;
}

let array = [2, 3, 5];
let result = product(...array);
// without sugar:

let result = product(array[0], array[1], array[2]);


// with sugar:
function product(...numbers) {
  return numbers.reduce((total, number) => total * number);
}

let result = product(2, 3, 4, 5);
// without sugar:
function product(a, b, c, d) {
  let args = Array.from(arguments);
  return args.reduce((total, number) => total * number);
}

let result = product(2, 3, 4, 5);

// Replace the word HERE in the following code so the program prints the results shown:
// const HERE = { foo: 42, bar: 3.1415, qux: "abc" };
const {foo, ...rest} = { foo: 42, bar: 3.1415, qux: "abc" };
console.log(foo);         // 42
console.log(rest);        // { bar: 3.1415, qux: 'abc' }
// an example of rest syntax, which captures the rest of the object properties after
// the named first property key, foo. I don't know and example when that would
// be useful, but I can imagine simply that it would be very useful.

// with sugar:
const obj = {
  first: "I am the first",
  second: "I am the second",
  third: [1, 2, 3],
  rest: { a: 'a', b: 'b' },
};

const { first, second, ...rest } = obj;
/*
Note that the name used in ...rest is not treated as the name of a property.
Instead, rest will be set to an object that contains all of the properties that
have not been previously extracted from the object.
 */

// without sugar, the final line:
// I looked at the answer and realized this is about object destructuring
const first = obj.first;
const second = obj.second;
const rest = {
  third: obj.third,
  rest: obj.rest,
}
/* wow that was labor intensive. this destructures the first two properties and
stores the values as local constants in their respective keys. (i.e. "extracts"
the first two properties) and then stores the rest of the properties in an obj
called rest.
 */

// Using shorthand notation, what is the missing code?
  function qux() {
  let animalType = "cat";
  let age = 9;
  let colors = ["black", "white"];
  // missing code goes below this line
  return {
    animalType,
    age,
    colors
  }
}

let { type, age, colors } = qux();
console.log(type);    // cat
console.log(age);     // 9
console.log(colors);  // [ 'black', 'white' ]

















































