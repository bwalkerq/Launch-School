'use strict'
function letterCaseCount(string) {
  const lowerArray = string.match(/[a-z]/g) || [];
  // returns an array of each character that matches the regex!! or an empty
  // array if no matches.
  const upperArray = string.match(/[A-Z]/g) || [];
  const neitherArray = string.match(/[^a-z]/gi) || [];

  return {
    lowercase: lowerArray.length,
    uppercase: upperArray.length,
    neither: neitherArray.length,
  };
}

function letterPercentages(string) {
  const length = string.length;
  let result = letterCaseCount(string);

  Object.keys(result).forEach(key => {
    result[key] = (result[key] / length * 100).toFixed(2);
  });

  return result
}

letterPercentages('abCdef 123');
// { lowercase: "50.00", uppercase: "10.00", neither: "40.00" }

letterPercentages('AbCd +Ef');
// { lowercase: "37.50", uppercase: "37.50", neither: "25.00" }

letterPercentages('123');
// { lowercase: "0.00", uppercase: "0.00", neither: "100.00" }

function triangle(a, b, c) {
  if (a + b <= c || a + c <= b || b + c <= a) {
    return 'invalid';
  } else if (a === b && b === c) {
    return 'equilateral';
  } else if (a === b || b === c || a === c) {
    return 'isosceles';
  } else {
    return 'scalene';
  }
}

// console.log(triangle(3, 3, 3));        // "equilateral"
// console.log(triangle(3, 3, 1.5));      // "isosceles"
// console.log(triangle(3, 4, 5));        // "scalene"
// console.log(triangle(0, 3, 3));        // "invalid"
// console.log(triangle(3, 1, 1));        // "invalid"

function triangleClassByAngle(a, b, c) {
  const arr = [a, b, c];
  if ((a + b + c) !== 180 || arr.some(angle => angle <= 0)) {
    return 'invalid';
  } else if (arr.some(angle => angle > 90)) {
    return 'obtuse';
  } else if (arr.some(angle => angle === 90)) {
    return 'right';
  } else {
    return 'acute';
  }
}

// console.log(triangleClassByAngle(60, 70, 50));       // "acute"
// console.log(triangleClassByAngle(30, 90, 60));       // "right"
// console.log(triangleClassByAngle(120, 50, 10));      // "obtuse"
// console.log(triangleClassByAngle(0, 90, 90));        // "invalid"
// console.log(triangleClassByAngle(50, 50, 50));       // "invalid"

function fridayThe13ths(year) {
  // start with the date of jan 13 for the given year, check if that day of week
  // is equal to 5, check each month by adding 1 to the month, and store each
  // success in a counter, return the counter.
  let month = 1
  let date = new Date(`${year}-${month}-13`)
  let success = 0;


  while (month <= 12) {
    if (date.getDay() === 5) {
      success += 1;
    }
    month += 1;
    date.setMonth(month - 1);
  }

  // console.log(success);
  return success;
}

fridayThe13ths(1986);      // 1
fridayThe13ths(2015);      // 3
fridayThe13ths(2017);      // 2

/* the weirdest thing about this problem and how I went about it, is that for
`new Date()` constructor, the month is the number you input (e.g. 2 means february),
but for `Date.p.setMonth()` the input represents the months on a zero-based index
(e.g. 2 represents March). That was unexpected. Dates are such a hassle!
 */

function featured(number) {
  const MAX_FEATURED = 9876543201;
  if (number >= MAX_FEATURED) return "There is no possible number that fulfills those requirements.";
  let featured = false

  do {
    number += 1;
  } while (!(number % 7 === 0) || !(number % 2 === 1))

  let uniqueDigits = (input) => {
    return new Set(String(input).split('')).size === String(input).length;
  }
  /* this is really important new learning (from seaching stack exchange)
  A `Set` object lets you store unique values (i.e. gets rid of duplicates)
  In this problem, I pass the split string array as the argument to `new Set()` and got
   the set, which I can call size on to compare to the actual string. It worked!
   But I definitely do not understand Sets enough to wield them with confidence
   or accuracy.
   */

  while (featured === false) {
    if (uniqueDigits(number)) {
      featured = true;
    } else {
    number += 14;
    }
  }
  return number;
}

// console.log(featured(12));           // 21
// console.log(featured(20));           // 21
// console.log(featured(21));           // 35
// console.log(featured(997));          // 1029
// console.log(featured(1029));         // 1043
// console.log(featured(999999));       // 1023547
// console.log(featured(999999987));    // 1023456987
// console.log(featured(9876543186));   // 9876543201
// console.log(featured(9876543200));   // 9876543201
// console.log(featured(9876543201));   // "There is no possible number that fulfills those requirements."

function sumSquareDifference(n) {
  let sum = 0;
  let sumOfSquares = 0;

  for (let i = 1; i < n + 1; i++) {
    sum += i;
    sumOfSquares += i**2;
  }

  return (
    sum ** 2 - sumOfSquares
  );
}

sumSquareDifference(3);      // 22 --> (1 + 2 + 3)**2 - (1**2 + 2**2 + 3**2)
sumSquareDifference(10);     // 2640
sumSquareDifference(1);      // 0
sumSquareDifference(100);    // 25164150

  /*
  bubble sort
  iterate through each element, compare it with the next, swap if right smaller
   than left.

   when the iteration happens without any swaps, stop.

   */
function bubbleSort(arr) {
  let counter = 1;
  let didSwapping = true;

  while (didSwapping && counter < arr.length) {
    didSwapping = false;

    for (let i = 0; i < arr.length - 1; i++) {
      let current = arr[i];
      let next = arr[i + 1];

      if (current > next) {
        arr.splice(i, 2, next, current);
        didSwapping = true;
      }
    }
  }
}

const array1 = [5, 3];
bubbleSort(array1);
console.log(array1);    // [3, 5]

const array2 = [6, 2, 7, 1, 4];
bubbleSort(array2);
console.log(array2);    // [1, 2, 4, 6, 7]

const array3 = ['Sue', 'Pete', 'Alice', 'Tyler', 'Rachel', 'Kim', 'Bonnie'];
bubbleSort(array3);
console.log(array3);    // ["Alice", "Bonnie", "Kim", "Pete", "Rachel", "Sue", "Tyler"]



















