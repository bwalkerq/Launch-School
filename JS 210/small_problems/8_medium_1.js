'use strict'

function rotateArray(array) {
  if (arguments.length === 0 || !Array.isArray(array)) return undefined;
  return array.slice(1).concat(array.slice(0,1));
}
rotateArray([7, 3, 5, 2, 9, 1]);       // [3, 5, 2, 9, 1, 7]
rotateArray(['a', 'b', 'c']);          // ["b", "c", "a"]
rotateArray(['a']);                    // ["a"]
rotateArray([1, 'a', 3, 'c']);         // ["a", 3, "c", 1]
rotateArray([{ a: 2 }, [1, 2], 3]);    // [[1, 2], 3, { a: 2 }]
rotateArray([]);                       // []

// return `undefined` if the argument is not an array
rotateArray();                         // undefined
rotateArray(1);                        // undefined


// the input array is not mutated
const array = [1, 2, 3, 4];
rotateArray(array);                    // [2, 3, 4, 1]
// console.log(array);                                 // [1, 2, 3, 4]


function rotateRightmostDigits(number, n) {
  let array = String(number).split('');
  return Number(
    array.slice(0,-n).concat(rotateArray(array.slice(-n))).join('')
  )
}

// console.log(String(735291).split('').slice(1,-1))
/* overall a very successful solution! Direct and especially pleasing and
efficient use of String.p.slice, which I reminded myself can use negative indices,
which is so convenient in this context. Well done!

Also, I like that mine relies on the previous problem's solution `rotateArray()`.
 */

/* Another solution using Array.p.splice() which modifies in place, and took
me a long time to understand, because it's concatinating with itself, and with
a modified version of itself. Very confusing to read. Because of order of operations
you read the `array.concat` first but the `array.splice` occurs first, so the
array.concat is already the mutated version, and since #splice returns the deleted
item, it's what is being concatenated. woof. That's too confusing, I hope that's
not standard!

function rotateRightmostDigits(number, digit) {
  if (!Number(number) || number === 0) return 0;
  let array = String(number).split('');
  return Number(array.concat(array.splice(-digit, 1)).join(''));
}
*/

// console.log(rotateRightmostDigits(735291, 1) === 735291);
// console.log(rotateRightmostDigits(735291, 2) === 735219);
// console.log(rotateRightmostDigits(735291, 3) === 735912);
// console.log(rotateRightmostDigits(735291, 4) === 732915);
// console.log(rotateRightmostDigits(735291, 5) === 752913);
// console.log(rotateRightmostDigits(735291, 6) === 352917);
// console.log(rotateRightmostDigits(-12345, 4));      // -13452

function maxRotation(number) {
  let nDigits = String(number).length;

  for (let i = nDigits; i > 0; i -= 1) {
    number = rotateRightmostDigits(number, i);
  }

  return number;
}

maxRotation(735291);          // 321579
maxRotation(3);               // 3
maxRotation(35);              // 53
maxRotation(105);             // 15 -- the leading zero gets dropped
maxRotation(8703529146);      // 7321609845








































