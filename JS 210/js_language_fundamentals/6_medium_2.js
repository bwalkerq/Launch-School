function processOrder(price, quantity, discount, serviceCharge, tax) {
  quantity = quantity || 1;
  discount = discount || 0;
  serviceCharge = serviceCharge || 0.1;
  tax = tax || 0.15;

  return (price * quantity) * (1 - discount) * (1 + serviceCharge) * (1 + tax);
}

// console.log(processOrder(100, 2,  ))

/* this one totally got me; the issue is that if a value is set to 0 (perhaps it
would make sense to set tax to 0, in Washington State), the value for tax is
reassigned to the default value because 0 is falsy in JS. whoops!
A better way to write this, for arguments that are left out in the call, is to
specifically test if they are `=== undefined`.
 */

// const person = { name: 'Victor' };
// const otherPerson = { name: 'Victor' };
//
// console.log(person === otherPerson);    // false -- expected: true
/* as written, these are two different objects that have the same values.
the strict equality operator returns true for objects that are the same object.
 */

const person = { name: 'Victor' };
const otherPerson = person

// console.log(person === otherPerson);    //

let startingBalance = 1;
const chicken = 5;
const chickenQuantity = 7;

function totalPayable(item, quantity) {
  return startingBalance + (item * quantity);
}

// startingBalance = 5;
// console.log(totalPayable(chicken, chickenQuantity));
//
// startingBalance = 10;
// console.log(totalPayable(chicken, chickenQuantity));



const doubler = makeDoubler('Benji');
doubler(5);                             // returns 10
// logs:
// This function was called by Victor.

// this is a partial function application problem.

function makeDoubler(caller) {
  return (number) => {
    console.log(`This function was called by ${caller}.`);
    return number * 2;
  };
}

/* I was able to get most of the way to the solution, but I had originally written
the function as:

function makeDoubler(caller) {
  let function = (number) => {
    console.log(`This function was called by ${caller}.`);
    return number * 2;
  };
  return function();  <<<<<------------- note these parentheses
}

the problem here was that I returned the return value of the anonymous function
by those errant parentheses, rather than returning the anonymous function itself.
it turns out that when I remove the parentheses, the IDE catches that the variable
declaration is redundant, and auto refactors to just returns the arrow function
declaration.
 */

const array = ['Apples', 'Peaches', 'Grapes'];
//
// array[3.4] = 'Oranges';
// console.log(array.length); // 3
// console.log(Object.keys(array).length); // 4
//
// array[-2] = 'Watermelon';
// console.log(array.length); // still 3
// console.log(Object.keys(array).length); // 5

const languages = ['JavaScript', 'Ruby', 'Python'];
// console.log(languages); // the whole array
// console.log(languages.length); // 3
//
// languages.length = 4;
// console.log(languages); // ['JavaScript', 'Ruby', 'Python', empty]
// console.log(languages.length); // 4
//
// languages.length = 1;
// console.log(languages); // ['JavaScript']
// console.log(languages.length); // 1
//
// languages.length = 3;
// console.log(languages); // ['JavaScript', 2 empty]
// console.log(languages.length); // 3
//
// languages.length = 1;
// languages[2] = 'Python';
// console.log(languages); // ['JavaScript', empty, 'Python']
// console.log(languages[1]); // undefined
// console.log(languages.length); // 3

function one() {
  function log(result) {
    console.log(result);
  }

  function anotherOne(...args) {
    let result = '';
    for (let i = 0; i < args.length; i += 1) {
      result += String.fromCharCode(args[i]);
    }

    log(result);
  }

  function anotherAnotherOne() {
    console.log(String.fromCharCode(87, 101, 108, 99, 111, 109, 101));
    anotherOne(116, 111);
  }

  anotherAnotherOne();
  anotherOne(116, 104, 101);
  return anotherOne;
}

one()(77, 97, 116, 114, 105, 120, 33);


































