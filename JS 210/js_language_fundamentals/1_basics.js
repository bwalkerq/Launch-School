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

DIGITS = {}
function stringToInteger(num) {

}

stringToInteger('4321');      // 4321
stringToInteger('570');       // 570