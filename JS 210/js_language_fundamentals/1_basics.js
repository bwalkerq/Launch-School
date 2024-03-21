const paragraph = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sed \
ligula at risus vulputate faucibus. Aliquam venenatis nibh ut justo dignissim \
dignissim. Proin dictum purus mollis diam auctor sollicitudin. Ut in bibendum \
ligula. Suspendisse quam ante, dictum aliquam tristique id, porttitor pulvinar \
diam. Maecenas blandit aliquet ipsum. Integer vitae sapien sed nulla rutrum \
hendrerit ac a urna. Interdum et malesuada fames ac ante ipsum primis in faucibus.';

// console.log(paragraph);


const myBoolean = true;
const myString = 'hello';
const myArray = [];
const myOtherString = '';

// if (myBoolean) {
//   console.log('Hello'); // yes
// }
//
// if (!myString) {
//   console.log('World'); // no
// }
//
// if (!!myArray) {
//   console.log('Worldy'); // yes
// }
//
// if (myOtherString || myArray) {
//   console.log('!'); // yes
// }


// count the number of execution paths:
/* there are six, since any of the branches could have a `break` statement, ok but
also there could be 5, in terms of satisfying the logic branches or not. I'm
pretty sur I'm right, though.
 */
// if (condition1) {
//   // ...
//   if (condition2) {
//     // ...
//   } else {
//     // ...
//   }
// } else {
//   // ...
//   if (condition4) {
//     // ...
//     if (condition5) {
//       // ...
//     }
//   }
// }


// called this exercise, though Bob Rhodes really wrote a doozy of a FE


const rlSync = require('readline-sync')

function arithmetic() {
  let num1 = parseInt(rlSync.question("Enter your first number"))
  let num2 = parseInt(rlSync.question("Enter your second number"))

  console.log(`${num1} + ${num2} = ${num1 + num2}`)
  console.log(`${num1} - ${num2} = ${num1 - num2}`)
  console.log(`${num1} * ${num2} = ${num1 * num2}`)
  console.log(`${num1} / ${num2} = ${num1 / num2}`)
  console.log(`${num1} % ${num2} = ${num1 % num2}`)
  console.log(`${num1} ** ${num2} = ${num1 ** num2}`)
}

// arithmetic()

function lengthOfPhrase() {
  let phrase = rlSync.question("Enter a phrase.")
  let length = phrase.length
  console.log(`There are ${length} characters in ${phrase}`)
}

// lengthOfPhrase()

function stringToSignedInteger(str) {
  let chars = str.split('');
  let sum = 0;
  let sign = '';
  if (chars[0].match(/[+-]/)) {
    sign = chars.shift();
  }

  for (let index = 0; index < chars.length; index++) {
    sum += chars[index] * (10 ** (chars.length - 1 - index));
  }

  if (sign === '-') sum *= -1;

  console.log(sum);
  return sum;
}

// stringToSignedInteger('4321');      // 4321
// stringToSignedInteger('-570');      // -570
// stringToSignedInteger('+100');      // 100


const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

function integerToString(number) {
  let result = '';

  do {
    let remainder = number % 10;
    number = Math.floor(number / 10);

    result = DIGITS[remainder] + result;
  } while (number > 0);

  return result;
}

// integerToString(4321);      // "4321"
// integerToString(0);         // "0"
// integerToString(5000);      // "5000"

function signedIntegerToString(number) {
  if (number < 0) {
    return ('-' + integerToString(number * -1));
  } else if (number > 0) {
    return ('+' + integerToString(number));
  } else {
    return integerToString(number);
  }
}

console.log(signedIntegerToString(4321) === "+4321");
console.log(signedIntegerToString(-123) === "-123");
console.log(signedIntegerToString(0) === "0");
console.log(signedIntegerToString(-0))// === "-0");




























