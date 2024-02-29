for (let i = 0; i < 100; i++) {
  if (i % 2 === 1) {
    // console.log(i);
  }
}

for (let i = 2; i <= 100; i += 2) {
  // console.log(i);
}

// 1 square meter == 10.7639 square feet
let rlSync = require('readline-sync');

function roomSize() {
  const SQMETERS_TO_SQFEET = 10.7639
  let length = rlSync.question('What is the length of the room, in meters?\n');
  let width = rlSync.question('What is the width of the room, in meters?\n');
  let area = length * width;
  let squareFeetArea = area * SQMETERS_TO_SQFEET

  console.log(`The area of the room is ${area} square meters (${squareFeetArea} square feet).`);
}

// roomSize();

function billPlusTip(bill, tipPercentage) {
  if (bill === undefined) {
    bill = parseFloat(rlSync.question('What is the bill?'))
  }

  if (tipPercentage === undefined) {
    tipPercentage = parseFloat(rlSync.question('What is the tip percentage?'))
  }

  let tip = bill * tipPercentage / 100;
  let totalBill = bill + tip;

  console.log(`The tip is $${tip.toFixed(2)}.`)
  console.log(`The total is $${totalBill.toFixed(2)}.`);
}

// billPlusTip(200, 15);
// billPlusTip(102.5, 15.7);
// billPlusTip(45);

function sumOrProduct() {
  let limit = NaN
  let response = undefined;

  while (!isNaN(limit)) { // was reminded to use #isNaN because of the quirk where NaN is not equal to itself.
    limit = parseInt(rlSync.question('Please enter an integer greater than 0.\n'));
  }

  while (response !== 'p' && response !== 's') {
    response = rlSync.question('Enter "s" to compute the sum, or "p" to compute the product.\n');
  }

  let result = 1;
  for (let count = 1; count <= limit ; count++) {
    if (response === 'p') {
      result *= count;
    } else {
      if (count === 1) {
        continue;
      }
      result += count;
    }
  }

  let message = response === 'p' ? 'product' : 'sum';

  console.log(`The ${message} of the integers between 1 and ${limit} is ${result}.`);
}

// sumOrProduct();

function shortLongShort(shortString, longString) {
  if (shortString.length > longString.length) {
    [shortString, longString] = [longString, shortString];
  }
  result = shortString + longString + shortString;
  console.log(result);
  return result;
}

// shortLongShort('abc', 'defgh');    // "abcdefghabc"
// shortLongShort('abcde', 'fgh');    // "fghabcdefgh"
// shortLongShort('', 'xyz');         // "xyz"

function isLeapYear(year) {
  if (year < 1752) {
    return year % 4 === 0;
  } else if (year % 400 === 0) {
    return true;
  } else if (year % 100 === 0) {
    return false;
  } else {
    return year % 4 === 0;
  }
}

isLeapYear(2016);      // true
isLeapYear(2015);      // false
isLeapYear(2100);      // false
isLeapYear(2400);      // true
isLeapYear(240000);    // true
isLeapYear(240001);    // false
isLeapYear(2000);      // true
isLeapYear(1900);      // false
isLeapYear(1752);      // true
isLeapYear(1700);      // true
isLeapYear(1);         // false
isLeapYear(100);       // true
isLeapYear(400);       // true
























