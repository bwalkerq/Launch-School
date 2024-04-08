// console.log(sum(23));           // 5
// console.log(sum(496));          // 19
// console.log(sum(123456789));    // 45

function sum(num) {
  let numStringArray = String(num).split('');
  return numStringArray.reduce((accum, digit) => accum + Number(digit), 0);
}

/* I made the right choice to look at the solution. My solution would have taken
ages, and would have been convoluted, using mods and division to shave off digits
and worst of all, recursive calls. I am really glad I looked, as the solution
uses reduce, which I haven't used even once, so this is good learning.

reduce is called on an array, with a callback function, which can include a bunch of things,
including an accumulator.
namely, a callback function that includes the following parameters:
  accumulator
  currentValue
  currentIndex
  array (that reduce is being called on)
followed by
  an initial value
 */


const ALPHA_NUMERIC = {
  0: 'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'nineteen',
}

function alphabeticNumberSort(arr) {
  let result = arr.sort((a, b) => ALPHA_NUMERIC[a] < ALPHA_NUMERIC[b] ? -1 : 1);
  console.log(result);
}

// alphabeticNumberSort(
//   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
// [8, 18, 11, 15, 5, 4, 14, 9, 19, 1, 7, 17, 6, 16, 10, 13, 3, 12, 2, 0]

// studying for the win; I was only able to do this because I studied with Phillip the other day
// given solution much better, in that it doesn't create an object, just the
// array, since the numbers are their own indices :|

multiplyAllPairs([2, 4], [4, 3, 1, 2]);    // [2, 4, 4, 6, 8, 8, 12, 16]

function multiplyAllPairs(firstArr, secondArr) {
  let result = [];
  for (let i = 0; i <firstArr.length; i++) {
    for (let j = 0; j < secondArr.length; j++) {
      result.push(firstArr[i] * secondArr[j]);
    }
  }
  return result.sort((a, b,) => a - b);
}

sumOfSums([3, 5, 2]);        // (3) + (3 + 5) + (3 + 5 + 2) --> 21
sumOfSums([1, 5, 7, 3]);     // (1) + (1 + 5) + (1 + 5 + 7) + (1 + 5 + 7 + 3) --> 36
sumOfSums([4]);              // 4
sumOfSums([1, 2, 3, 4, 5]);  // 35

function sumOfSums(arr) {
  let result = 0
  let length = arr.length
  arr.forEach(el => {
    result += el*length;
    length -= 1;
  })
  return result;
}

leadingSubstrings('abc');      // ["a", "ab", "abc"]
leadingSubstrings('a');        // ["a"]
leadingSubstrings('xyzzy');    // ["x", "xy", "xyz", "xyzz", "xyzzy"]

function leadingSubstrings(str) {
  let arr = str.split('');
  return arr.map((letter, idx) => arr.slice(0, idx + 1).join(''));
}

function substrings(str) {
  let result = [];
  for (let i = 0; i < str.length; i++) {
    let sub = leadingSubstrings(str.slice(i))
    result = result.concat(sub);  // in this line I learned that concat does not
    // mutate, but returns a new array.
  }
  return result
}

// console.log(substrings('abcde'));
// [ "a", "ab", "abc", "abcd", "abcde",
//   "b", "bc", "bcd", "bcde",
//   "c", "cd", "cde",
//   "d", "de",
//   "e" ]);

palindromes('abcd');       // []
palindromes('madam');      // [ "madam", "ada" ]

palindromes('hello-madam-did-madam-goodbye');
// returns
// [ "ll", "-madam-", "-madam-did-madam-", "madam", "madam-did-madam", "ada",
//   "adam-did-mada", "dam-did-mad", "am-did-ma", "m-did-m", "-did-", "did",
//   "-madam-", "madam", "ada", "oo" ]

palindromes('knitting cassettes');
// returns
// [ "nittin", "itti", "tt", "ss", "settes", "ette", "tt" ]

function isPalindrome(word) {
  return word.length > 1 && word === word.split('').reverse().join('')
}
function palindromes(str) {
  return (substrings(str).filter(isPalindrome));
}

// I had the same logic, and chose to mirror the given solution and break
// out into two separate functions

buyFruit([['apple', 3], ['orange', 1], ['banana', 2]]);
// returns ["apple", "apple", "apple", "orange", "banana", "banana"]

function buyFruit(twoDimArr) {
  let result = [];
  twoDimArr.forEach(subArr => {
    for (let i = 0; i < subArr[1]; i++) {
      result.push(subArr[0]);
    }
  });
  return result;
}

function transactionsFor(inventoryItem, arr) {
  return arr.filter(obj => obj.id === inventoryItem)
// return arr.filter(({id}) => id === inventoryItem); // note equivalence
}

/* the thing to learn from their solution is, I think, a syntax sugar thing
that, in this case, calls `.id` on each subobject in the array of objects.

function transactionsFor(inventoryItem, transactions) {
  return transactions.filter(({id}) => id === inventoryItem);
}

note that `({id})` calls `.id` on each object, so that the only property of the
object in the block that you're dealing with is the `id` property. That's fine.

 */

const transactions = [ { id: 101, movement: 'in',  quantity:  5 },
  { id: 105, movement: 'in',  quantity: 10 },
  { id: 102, movement: 'out', quantity: 17 },
  { id: 101, movement: 'in',  quantity: 12 },
  { id: 103, movement: 'out', quantity: 15 },
  { id: 102, movement: 'out', quantity: 15 },
  { id: 105, movement: 'in',  quantity: 25 },
  { id: 101, movement: 'out', quantity: 18 },
  { id: 102, movement: 'in',  quantity: 22 },
  { id: 103, movement: 'out', quantity: 15 }, ];

// console.log(transactionsFor(101, transactions));
// returns
// [ { id: 101, movement: "in",  quantity:  5 },
//   { id: 101, movement: "in",  quantity: 12 },
//   { id: 101, movement: "out", quantity: 18 }, ]

isItemAvailable(101, transactions);     // false
isItemAvailable(105, transactions);     // true

function isItemAvailable(inventoryItem, transactions) {
  let relevantTransactions = transactionsFor(inventoryItem, transactions);
  let total = 0;

  relevantTransactions.forEach(obj => {
    if (obj.movement === "in") {
      total += obj.quantity;
    } else {
      total -= obj.quantity;
    }
  });
  return total > 0;
}

/*
Note their solution is nearly identical, though they use reduce with the `sum`
variable built into the callback function. Note that setting the value of sum to
zero happens at the very end of the long `reduce` block. Without it, it would be
implicitly set to the first element, which is an object (i.e., { id: 101,
movement: 'in', quantity: 5 }).

function isItemAvailable(item, transactions) {
  const quantity = transactionsFor(item, transactions).reduce((sum, transaction) => {
    if (transaction.movement === 'in') {
      return sum + transaction.quantity;
    } else {
      return sum - transaction.quantity;
    }
  }, 0);

  return quantity > 0;
}
 */


































