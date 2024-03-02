function p(input) {
  console.log(input)
}

function logOddNumbers(max) {
  for (let i = 0; i <= max; i++) {
    if (i % 2 === 1) console.log(i) ;
  }
}

// logOddNumbers(19)

function multiplesOfThreeAndFive(start, end) {
  for (let number = start; number <= end; number++) {
    if (number % 15 === 0 ) {
      console.log(number.toString() + '!');
    } else if (number % 5 === 0 || number % 3 === 0) {
      console.log(String(number));
    }
  }
}

// multiplesOfThreeAndFive(2,200)

function logMultiples(number) {
  let upperBound = Math.floor(100 / number) * number

  for (let i = upperBound; i >= number ; i-= number) {
    if (i % number === 0 && i % 2 === 1) {
      console.log(i);
    }
  }
}

// logMultiples(17)

function fizzBuzz () {
  for (let number = 0; number <= 100; number++) {
    let message = number

    if (number % 15 === 0 ) {
      message = 'FizzBuzz';
    } else if (number % 5 === 0) {
      message = 'Buzz';
    } else if (number % 3 === 0) {
      message = 'Fizz';
    }

    console.log(message);
  }
}

// fizzBuzz()

function isPrime(candidate) {
  if (candidate <= 1) {
    return false;
  }

  for (let i = 2; i < candidate; i++) {
    if (candidate % i === 0) {
      return false;
    }
  }

  return true;
}

isPrime(1);   // false
isPrime(2);   // true
isPrime(3);   // true
isPrime(43);  // true
isPrime(55);  // false
isPrime(0);   // false

function isXor(firstValue, secondValue) {
  return !!firstValue !== !!secondValue
}
/* to me, this is way more direct, since what we're dealing with is
parity; we're looking to return true when the boolean values are DIFFERENT
from one another. two trues and two false each return false. The straightforward
was is just to say when the first is not the same as the second.
 */

// isXor(false, true);     // true
// isXor(true, false);     // true
// isXor(false, false);    // false
// isXor(true, true);      // false
//
//
// isXor(false, 3);        // true
// isXor('a', undefined);  // true
// isXor(null, '');        // false
// isXor('2', 23);         // false

let rlSync = require('readline-sync');

function guessThePassword() {
  const PASSWORD= "password";
  let numOfGuesses = 0

  while (numOfGuesses < 3) {
    let guess = rlSync.question("What's the password?\n");
    if (PASSWORD === guess) {
      console.log(`You have successfully logged in, mother trucker!`);
      return;
    }
    numOfGuesses++;
  }
  console.log(`nah, b`);
}

// guessThePassword()

function studentGrade(firstGrade, secondGrade, thirdGrade) {
  let average = (firstGrade + secondGrade + thirdGrade) / 3;
  let letterGrade = 'F';

  if (average >= 90) {
    letterGrade = 'A';
  } else if (average >= 70) {
    letterGrade = 'B';
  } else if (average >= 50) {
    letterGrade = 'C';
  }
  console.log(`Based on the average of your 3 scores your letter grade is "${letterGrade}".`);
}

studentGrade(65,89,91)
studentGrade(95,89,91)
studentGrade(5,9,91)

function gcd(int1, int2) {
  /* start with the smaller, divide the larger by it, if not successful (zero
  remainder), decrement one and test again. if successful, must also divide the
  smaller.
   */
  let larger = int1 > int2 ? int1 : int2;
  let smaller = larger === int1 ? int2 : int1;
  let divisor = smaller;

  while (divisor >= 1) {
    if (larger % divisor === 0 && smaller % divisor === 0) {
      console.log(divisor);
      break;
    }
    divisor--;
  }
}

// gcd(125, 600);   // 25
// gcd(15, 10);  // 5
// gcd(9, 2);    // 1

const checkGoldbach = (expectedSum) => {
  if (expectedSum % 2 === 1 || expectedSum < 4 ) {
    console.log(null);
    return;
  }

  for (let candidate = 1; candidate <= expectedSum / 2; candidate++) {
    if (isPrime(candidate) && isPrime(expectedSum - candidate)) {
      console.log(candidate, (expectedSum - candidate));
    }
  }
}

// checkGoldbach(3);
// // logs: null
//
// checkGoldbach(4);
// // logs: 2 2
//
// checkGoldbach(12);
// // logs: 5 7
//
// checkGoldbach(100);
// // logs:
// 3 97
// 11 89
// 17 83
// 29 71
// 41 59
// 47 53

const generatePattern = function (nStars) {
  let numbersString = ''
  let starsString = ''

  for (let i = 1; i <= nStars; i++) {
    starsString += '*'.repeat(String(i).length)
  }

  for (let lineNumber = 1; lineNumber <= nStars; lineNumber++) {
    numbersString += lineNumber;
    starsString = starsString.slice(String(lineNumber).length);
    console.log(String(numbersString) + starsString);
  }
}

// generatePattern(5)
// generatePattern(14)

function indexOf(firstString, secondString) {
  /* take one string and match the first instance of it within another string
  return the index of the first instance
  iterate through each character of the string, starting at the front, until a
  match for the first character of the second string.

  then check the next character of s2, and it must match the next character of s2 (or vice versa),
  and this match must continue until all chars of s2 are matched. return the
  index of the fist character in the s1.
   */
  let limit = firstString.length - secondString.length;

  for (let indexFirst = 0; indexFirst <= limit; indexFirst++) {
    let matchCount = 0; // the idea of counting matches is the only thing I overlooked
    // in my original algo. it resets at the start of each iteration in the outer
    // for loop, which is what got me stuck

    for (let indexSecond = 0; indexSecond < secondString.length; indexSecond++) {
      if (firstString[indexFirst + indexSecond] === secondString[indexSecond]) {
        matchCount++;
      } else {
        break; // this only breaks out of the inner for loop, not both. I googled
        // this for the same reason.
      }
    }

    if (matchCount === secondString.length) {
      return indexFirst;
    }
  }

  return -1;
}
// I got really close and couldn't seal the deal. Am I happy I looked at the answer? I guess?

function lastIndexOf(firstString, secondString) {
  let limit = firstString.length - secondString.length;

  for (let indexFirst = firstString.length - 1;
       indexFirst >= limit; indexFirst--) {
    let matchCount = 0;
    let indexInnerFirst = indexFirst

    for (let indexSecond = (secondString.length - 1); indexSecond >= 0;
         indexSecond--) {
      if (secondString[indexSecond] === firstString[indexInnerFirst]) {
        matchCount++;
        indexInnerFirst--;
      } else {
        break;
      }
    }

    if (matchCount === secondString.length) {
      return indexInnerFirst + 1;
    }
  }
  return -1;
}

// console.log(indexOf('Some strings', 's'));                      // 5
// console.log(indexOf('Blue Whale', 'Whale'));                    // 5
// console.log(indexOf('Blue Whale', 'Blute'));                    // -1
// console.log(indexOf('Blue Whale', 'leB'));                      // -1

// console.log(lastIndexOf('Some strings', 's'));                  // 11
// console.log(lastIndexOf('Blue Whale, Killer Whale', 'Whale'));  // 19
// console.log(lastIndexOf('Blue Whale, Killer Whale', 'all'));    // -1

/* nightmare of a problem. took at least 2 hours. I am in struggle land.
what went well? I was able to make an algo close to the solution? what went wrong?
I didn't see how to count the matches and catch the success (the matches equal the
length of the second string.

What a burn. basically messed up my whole day.
 */


/*
problem: take a string and trip any leading or trailing whitespace chars, but not
any whitespace in the middle of the string.

iterate from the front and from the back.
find the index of the first
 */
let trim = function (str) {
  let startPoint = 0
  let endPoint = str.length - 1
  let trimmedString = '';

  for (let index = 0; index < str.length; index++) {
    if (str[index] !== ' ') {
      break;
    }
    startPoint++;
  }

  for (let indexBackwards = endPoint; indexBackwards >= 0; indexBackwards++) {
    if (str[indexBackwards] !== ' ') {
      break;
    }
    endPoint--;
  }

  for (let indexReturn = startPoint; indexReturn <= endPoint; indexReturn++) {
    trimmedString += str[indexReturn]
  }
  return trimmedString
}
// trim('  abc  ');  // "abc"
// trim('abc   ');   // "abc"
// trim(' ab c');    // "ab c"
// trim(' a b  c');  // "a b  c"
// trim('      ');   // ""
// trim('');         // ""
//
// console.log(trim('  abc  '));  // "abc"
// console.log(trim('abc   '));   // "abc"
// console.log(trim(' ab c'));    // "ab c"
// console.log(trim(' a b  c'));  // "a b  c"
// console.log(trim('      '));   // ""
// console.log(trim(''));         // ""

let splitString = (str, delimiter) => {
  if (delimiter === undefined) {
    console.log('ERROR: No delimiter');
    return;
  }


  let part = '';
  for (let idx = 0; idx < str.length; idx++) {
    if (str[idx] === delimiter) {
      console.log(part);
      part = ''
    } else if (delimiter === '') {
      console.log(str[idx]);
    } else {
      part += str[idx];
    }
  }
  console.log(part)
}

// splitString('abc,123,hello world', ',');
// // logs:
// // abc
// // 123
// // hello world
//
// splitString('hello');
// // logs:
// // ERROR: No delimiter
//
// splitString('hello', '');
// // logs:
// // h
// // e
// // l
// // l
// // o
//
// splitString('hello', ';');
// // logs:
// // hello
//
// splitString(';hello;', ';');
// // logs:
// //  (this is a blank line)
// // hello

const isCount = value => Number.isInteger(value) && value >= 0;
// this solution is better, but it was unclear that I could use these built in
// methods. isInteger is good to know

function repeat(string, times) {
  if (!isCount(times)) {
    return undefined;
  }

  let repeatedString = ''
  for (let repeats = 0; repeats < times; repeats++) {
    repeatedString += string;
  }
  return repeatedString;
}

// repeat('abc', 1);       // "abc"
// repeat('abc', 2);       // "abcabc"
// repeat('abc', -1);      // undefined
// repeat('abc', 0);       // ""
// repeat('abc', 'a');     // undefined
// repeat('abc', false);   // undefined
// repeat('abc', null);    // undefined
// repeat('abc', '  ');    // undefined

function startsWith(string, searchString) {
  // console.log(indexOf(string, searchString) === 0)
  // indexOf(string, searchString) === 0
  for (let index = 0; index < searchString.length; index++) {
    if (string[index] !== searchString[index]) {
      return false;
    }
  }
  return true;
}

let str = 'We put comprehension and mastery above all else';
startsWith(str, 'We');              // true
startsWith(str, 'We put');          // true
startsWith(str, '');                // true
startsWith(str, 'put');             // false

let longerString = 'We put comprehension and mastery above all else!';
startsWith(str, longerString);      // false

function toLowerCase(string) {
  // 65 - 90 are the uppercase chars
  const CONVERSION_OFFSET = 32 // the given solution had this, better for
  // reading
  let lowerCaseString = '';

  for (let index = 0; index < string.length; index++) {
    let charCode = string.charCodeAt(index)
    if (charCode >= 65 && charCode <= 90) {
      lowerCaseString += String.fromCharCode((charCode + CONVERSION_OFFSET));
    } else {
      lowerCaseString += string[index];
    }
  }
  console.log(lowerCaseString);
  return lowerCaseString;
}

// toLowerCase('ALPHABET');    // "alphabet"
// toLowerCase('123');         // "123"
// toLowerCase('abcDEF');      // "abcdef"

function substr(string, start, length) {
  let substring = '';

  if (start < 0) {
    start = string.length + start;
  }

  for (let counter = 0; counter < length; counter += 1) {
    let index = start + counter;

    if (string[index] === undefined) {
      break;
    }
  // for (let index = start; index < (start + length); index++) {
  //   if (index >= string.length) {
  //     break;
  //   }
    /*
    My solution used the index in the for loop declaration, but their solution
    uses a counter, which makes sense with the length. Theirs also uses
    the undefined return value of calling an index that doesn't exist
     */

    substring += string[index];
  }

  console.log(substring);
  return substring;
}

let string = 'hello world';

// substr(string, 2, 4);      // "llo "
// substr(string, -3, 2);     // "rl"
// substr(string, 8, 20);     // "rld"
// substr(string, 0, -20);    // ""
// substr(string, 0, 0);      // ""

const cleanIndex = function (string, index) {
  if (!Number.isInteger(index) || index < 0) {
    index = 0
  } else if (index > string.length) {
    index = string.length;
  }
  return index;
}

function substring(string, start, end) {
  if (end === undefined) {
    end = string.length;
  }

  start = cleanIndex(string, start)
  end = cleanIndex(string, end)

  if (end < start) {
    temp = start;
    start = end;
    end = temp;
  }

  let newString = '';

  for (let index = start; index < end; index++) {
    newString += string[index];
  }

  console.log(newString);
  return newString;
}

string = 'hello world';

// substring(string, 2, 4);    // "ll"
// substring(string, 4, 2);    // "ll"
// substring(string, 0, -1);   // ""
// substring(string, 2);       // "llo world"
// substring(string, 'a');     // "hello world"
// substring(string, 8, 20);   // "rld"

  /*
  if the letter is capital, rotate it
    65 - 90 are the uppercase chars
  if the letter is lowercase, rotate it
    97 - 122
  if it's not a letter, keep it
   */

let codeReviewTitle = 'Znl V xvaqyl erdhrfg lbhe srrqonpx? Gunax lbh fb zhpu!'
// rot13(codeReviewTitle) // "May I kindly request your feedback? Thank you so much!"
const rotateWithinRange = function (charCode, start, end) {
  const MIDDLE_CODE = (start + end) / 2;
  const OFFSET_VALUE = 13;

  if (charCode > MIDDLE_CODE) {
    charCode -= OFFSET_VALUE;
  } else {
    charCode += OFFSET_VALUE;
  }
  return String.fromCharCode(charCode);
}

let rot13 = (str) => {
  let newString = '';

  for (let index = 0; index < str.length; index++) {
    let characterCode = str[index].charCodeAt(0);

    if (characterCode >= 65 && characterCode <= 90) {
      newString += rotateWithinRange(characterCode, 65, 90);
    } else if (characterCode >= 97 && characterCode <= 122) {
      newString += rotateWithinRange(characterCode, 97, 122);
    } else {
      newString += str[index];
    }
  }
  return newString;
}

// console.log(rot13('Teachers open the door, but you must enter by yourself.'));
// // logs: Grnpuref bcra gur qbbe, ohg lbh zhfg ragre ol lbhefrys.
// console.log(rot13('Don\'t hate me, because I am BEAUTIFUL!'))
// console.log(rot13('May I kindly request your feedback? Thank you so much!'))
// console.log(rot13(rot13('Don\'t hate me, because I am BEAUTIFUL!')))






























