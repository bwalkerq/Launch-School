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

function minilang(string) {
  let stack = [];
  let register = 0;
  let tokens = string.split(' ');

  for (let i = 0; i < tokens.length; i++) {
    // if (/\d/.test(tokens[i])) {
    //   register = Number(tokens[i]);
    //   continue;
    // }
    /* I see now that this guard clause is unnecessary given that, if the switch
    statement doesn't catch any command, then it must be a number, so we can put
    this setting the register functionality at the end as the `default` behavior.

    BUT! While I'm at it, I learned from Bob Rhodes (of course) that my regex in
    the guard clause is incorrect; as written it will return `true` for any string
    that contains a digit; instead I must use /^\d$/ so that the

    Also, I can refactor this to simply use Array.p.forEach rather than this for loop.
     */

    switch (tokens[i]) {
      case 'PRINT':
        console.log(register);
        break;
      case 'PUSH':
        stack.push(register);
        break;
      case 'ADD':
        register += stack.pop();
        break;
      case 'SUB':
        register -= stack.pop();
        break;
      case 'MULT':
        register *= stack.pop();
        break;
      case 'DIV':
        register = Math.round(register / stack.pop(), 10);
        break;
      case 'REMAINDER':
        register %= stack.pop();
        break;
      case 'POP':
        register = stack.pop();
        break;
      default:
        register = parseInt(tokens[i], 10);
    }
  }
}

// minilang('PRINT');
// 0

// minilang('5 PUSH 3 MULT PRINT');
// 15

// minilang('5 PRINT PUSH 3 PRINT ADD PRINT');
// 5
// 3
// 8

// minilang('5 PUSH POP PRINT');
// 5

// minilang('3 PUSH 4 PUSH 5 PUSH PRINT ADD PRINT POP PRINT ADD PRINT');
// 5
// 10
// 4
// 7

// minilang('3 PUSH PUSH 7 DIV MULT PRINT');
// 6

// minilang('4 PUSH PUSH 7 REMAINDER MULT PRINT');
// 12

// minilang('-3 PUSH 5 SUB PRINT');
// 8

// minilang('6 PUSH');
// (nothing is printed because the `program` argument has no `PRINT` commands)

function wordToDigit(string) {
  const DIGITS = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  }

    Object.keys(DIGITS).forEach(word => {
      let regex = new RegExp(`\\b${word}\\b`, 'g')
      string = string.replace(regex, DIGITS[word]);
    });
  console.log(string)
  return string;
    // string.split(' ').map(word => {
    //   if (word.match(/\W/))
    //   if (digits.includes(word)) {
    //     return digits.indexOf(word);
    //   } else {
    //     return word;
    //   }
    // }).join(' ')
}

// wordToDigit('Please call me at five five five one two three four. Thanks.');
// "Please call me at 5 5 5 1 2 3 4. Thanks."
// wordToDigit('The weight is done.');      // "The weight is done."

/* a burn. Frustrating experience to work with the digit words as an array,
referencing the index as the replacement value (I had seen this in an earlier
problem and thought it was so smooth, but then getting stuck with how to deal
with the period after 'four' in the string.

I ended up copying the solution; dissatisfying. I learned from their solution:
  Use Object.Key(hash) to get the array of the string value keys, then iterate through
  replace isn't in-place, so use reassignment for the iteration (line 179)
  reminder of bracket notation for hashes
 */

function findFibonacciIndexByLength(number) {
  let length = number;
  let previous = 8n;
  let fib = 13n;
  let index = 7n;

  while (String(fib).length < length) {
    index += 1n;
    let temp = fib;
    fib += previous;
    previous = temp;
  }

  return index;
}

// console.log(findFibonacciIndexByLength(2n) === 7n);    // 1 1 2 3 5 8 13
// console.log(findFibonacciIndexByLength(3n) === 12n);   // 1 1 2 3 5 8 13 21 34 55 89 144
// console.log(findFibonacciIndexByLength(10n) === 45n);
// console.log(findFibonacciIndexByLength(16n) === 74n);
// console.log(findFibonacciIndexByLength(100n) === 476n);
// console.log(findFibonacciIndexByLength(1000n) === 4782n);
// findFibonacciIndexByLength(10000n) === 47847n;

// The last example may take a minute or so to run.

// function fibonacci(n) {
//   if (n === 1 || n === 2) {
//     return 1;
//   } else {
//     return fibonacci(n - 1) + fibonacci(n - 2)
//   }
// }

// console.log(fibonacci(1));       // 1
// console.log(fibonacci(2));       // 1
// console.log(fibonacci(3));       // 2
// console.log(fibonacci(4));       // 3
// console.log(fibonacci(5));       // 5
// console.log(fibonacci(12));      // 144
// console.log(fibonacci(20));      // 6765

/* I only solved this because they scaffold it so much, here's the example given
in the problem set up (not even a hint!)

function sum(n) {
  if (n === 1) {
    return 1;
  } else {
    return n + sum(n - 1);
  }
}

just playing with this a bit made me understand how to structure my solution.
Also I remembered fragments of this from the Ruby version of this.
 */

// function fibonacci(n) {
//   let previous = 1;
//   let current = 1;
//
//   for (let i = 2; i < n; i++) {
//     let temp = current;
//     current += previous;
//     previous = temp;
//   }
//
//   console.log(current)
//   return current
// }

// fibonacci(20);       // 6765
// fibonacci(50);       // 12586269025
// fibonacci(75);       // 2111485077978050

/* Given solution accomplishes what I attempted with the reassignment of two
variables within an array. My syntax was off, so it's nice to see my idea brought
to fruition with working syntax. They had a nice idea to store the previous two
in an array, which my idea lacked; them using bracket notation to call elements
of the array is the key. I was just trying some version of [a,b] = [b,a], but that
is specifically for swapping variables, as opposed to reassigning a couple
variables using operations on those variables.

function fibonacci(nth) {
  let previousTwo = [1, 1];

  for (let counter = 3; counter <= nth; counter += 1) {
    previousTwo = [previousTwo[1], previousTwo[0] + previousTwo[1]];
  }

  return previousTwo[1];
}
 */

// Fibonacci Numbers (Memoization)

const memos = {}
function fibonacci(n) {

  if (n === 1 || n === 2) {
    return 1;
  } else {
    if (memos[n]){
      return memos[n];
    } else {
      memos[n] = fibonacci(n - 1) + fibonacci(n - 2);
      return memos[n];
    }
  }
}

// console.log(fibonacci(1));       // 1
// console.log(fibonacci(2));       // 1
// console.log(fibonacci(3));       // 2
// console.log(fibonacci(4));       // 3
// console.log(fibonacci(5));       // 5
// console.log(fibonacci(12));      // 144
// console.log(fibonacci(20));


















