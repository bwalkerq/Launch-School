let myObject = {
  a: 'name',
  'b': 'test',
  123: 'c',
  1: 'd',
};

myObject[1];
// myObject[a]; // this raises an error because the expression in the bracket must
// be a string value
myObject.a;

// what will be output
myObject = {
  prop1: '123',
  prop2: '234',
  'prop 3': '345',
};

const prop2 = '456';
myObject['prop2'] = '456';
myObject[prop2] = '678';

// console.log(myObject[prop2]); // 678
// console.log(myObject.prop2); // 456

myObj = {};
myObj[myFunc()] = 'hello, ';

function myFunc() {
  return 'funcProp';
}

// console.log(myObj); // hello
// myObj[myFunc()] = 'world!';
// console.log(myObj); // world

const myArray = [5, 5];
myArray[-1] = 5;
myArray[-2] = 5;

function average(array) {
  let sum = 0;

  for (let i = -2; i < array.length; i += 1) {
    sum += array[i];
  }

  return sum / array.length;
}

// console.log(average(myArray)); // 10, since #length returns 2 rather than 4,
// since the length is defined as one more than the largest index (non-neg integer)

function calculateBonus() {
  return arguments[1] ? arguments[0] / 2 : 0;
}

// console.log(calculateBonus(2800, true));               // 1400
// console.log(calculateBonus(1000, false));              // 0
// console.log(calculateBonus(50000, true));              // 25000

function penultimate(string) {
  arr = string.split(' ')
  console.log(arr[arr.length - 2]);
  return string.split(' ').slice(-2, -1)[0];
}

// penultimate('last word');                    // expected: "last"
// penultimate('Launch School is great!');      // expected: "is"


const MILLISECONDS_PER_MINUTE = 60 * 1000;

function timeOfDay(deltaMinutes) {
  const midnight = new Date('1/1/2000 00:00');
  /*
  Necessary to set the date with a string, otherwise it sets a time outside my time
  zone, which threw off everything by 6 hours.
   */
  const afterMidnight = new Date(midnight.getTime() + deltaMinutes * MILLISECONDS_PER_MINUTE);
  /*
  The important thing in this line is that the Date object allows us to add
  negative values--in this case, negative milliseconds--to a time and it rolls
  back the clock. Convenient!
   */

  // console.log(afterMidnight.toTimeString())
  // we can't just return the toTimeString here; it gives too many components.

  const hours = padWithZeroes(afterMidnight.getHours(), 2);
  const minutes = padWithZeroes(afterMidnight.getMinutes(), 2);

  console.log(`${hours}:${minutes}`);
  return `${hours}:${minutes}`;
}

function padWithZeroes(number, length) {
  let numberString = String(number);

  while (numberString.length < length) {
    numberString = `0${numberString}`;
  }

  return numberString;
}

// timeOfDay(0);          // "00:00"
// timeOfDay(-3);         // "23:57"
// timeOfDay(35);         // "00:35"
// timeOfDay(-1437);      // "00:03"
// timeOfDay(3000);       // "02:00"
// timeOfDay(800);        // "13:20"
// timeOfDay(-4231);      // "01:29"


































