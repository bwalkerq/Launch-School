/*
version numbers
p:
input:
  2 strings, representing version numbers
  each number from 1 to 4 digits
    separated by '.'
output:
  1 if v1 > v2
  -1 if v1 < v2
  0 if equal
  null if bad input
    anything other than digits and '.'

 e:
console.log(compareVersions('0.1', '1') === 1);
console.log(compareVersions('0.1', '0.1') === 0);
console.log(compareVersions('1.2.0.0', '1.18.2') === 1);
  returns 1 after second comparison because 2 < 18
console.log(compareVersions('1.2.0.0', '1.2') === 0);
  same number, have to fill in zeros after the numbers stop
    if undefined then 0?
console.log(compareVersions('1.18', '12.17') === 1);
  don't compare as strings!
console.log(compareVersions('12.17', '1.18') === -1);
console.log(compareVersions('1.1.1.2', '1.1.1') === -1);
console.log(compareVersions('1.1.1.2', '1.1.1.2.3') === 0);

d:
array, built with match
iterate through and compare
fill with zeros if necessary

a:
build to take strings
guard: if anything other than digits or '.', return null

use match to build arrays of the numbers.
iterate through comparing the strings, convert to numbers first
  if one is a different length and the return hasn't been determined, fill in with zeros


//
 */

console.log('4.2.t/asdf'.match(/[^0-9.]/g))
function compareVersions(version1, version2) {
  if ((version1 + version2).match(/[^0-9.]/)
  || (version1 + version2).match(/\.\.+/)
  || (version1.match(/^\./ || /\.$/))) {
    return null;
  }

  let matches1 = version1.match(/[0-9]+/g);
  let matches2 = version2.match(/[0-9]+/g);
  let longestLength = matches1.length < matches2.length ? matches2.length : matches1.length;

  for (let i = 0; i < longestLength; i++) {
    let element1 = matches1[i] || 0;
    let element2 = matches2[i] || 0;

    if (Number(element1) < Number(element2)) {
      return -1;
    } else if (Number(element1) > Number(element2)) {
      return 1;
    }
  }
  return 0;
}
// 0.1 < 1 = 1.0 < 1.1 < 1.2 = 1.2.0.0 < 1.18.2 < 13.37

// console.log(compareVersions('0.1', '1') === -1);
// console.log(compareVersions('0.1', '0.1') === 0);
// console.log(compareVersions('1.2.0.0', '1.18.2') === -1);
// console.log(compareVersions('1.2.0.0', '1.2') === 0);
// console.log(compareVersions('1.18', '12.17') === -1);
// console.log(compareVersions('12.17', '1.18') === 1);
// console.log(compareVersions('1.1.1.2', '1.1.1') === 1);
// console.log(compareVersions('1.2', '1.2.3') === -1);
// console.log(compareVersions('2', '2.1.1.2.3') === -1);
// console.log(compareVersions('1.2', '?') === null);
// console.log(compareVersions('asd', '2') === null);
console.log(compareVersions('2..3', '3') === null);
console.log(compareVersions('.2.3', '3') === null);
// console.log(compareVersions('', '') === );

/*



Doubler problem:
"Write a function called doubler that doubles every value in an array".

questions that I would ask:
input: an array
  empty array?
  non-array inputs?
  what data types allowed as elements?
    for strings, repeat letters or repeat words or repeat entire string?
      i.e. for each string, split on anything?
    numbers
      how to double zero?
      negatives?
    boolean?
    null and undefined?
  sparse arrays? How to handle empty slots or properties?
  will the data always be of the same type?
  repeat values allowed?
  size restrictions?
    even or odd number of elements?
  must the array start or end with anything?
  anything logged?
  return - mutate or new array?

Questions I forgot to ask:
  what if extra arguments?
  special inputs? are there any that get treated differently?

requirements given to me:
- elements that are numbers should be multiplied by 2
- elements that are strings should be repeated twice via concatenation
- other types of elements should be duplicated in the array
    I didn't see this coming. duplicated adj or after original elements?
- the input array should not be mutated
- elements that are special number values should remain unchanged
- elements that are any other type of number should be treated normally (multiplied by 2)
- elements that are empty strings should remain unchanged
- elements that are any other type of string should be treated normally (repeated twice)
- the input array can contain a mixture of different types of elements
- non-primitive elements should have their reference duplicated, not their value
- elements that appear more than once should be treated normally (as specified above)
- elements that contain nested arrays or objects should be treated normally (duplicated)
- if the input array contains empty slots (a "sparse array"), they should be removed
- if an inner array (element) contains empty slots, they should remain unchanged
- if the input array contains any object properties, they should remain unchanged
- if an inner array (element) contains any object properties, they should remain unchanged
- if the array is empty, return an empty array
- if multiple arguments are passed, ignore all but the first
- if the argument is a string, treat it as an array of characters
- if the argument is a non-negative integer, treat it as an array of digits
- if the argument is an object, treat it as an array of its property values
- all other kinds of inputs are invalid, and should return the string 'Invalid input'
 */

//My own test cases based on req's
// console.log(doubler([1,2.2,-3]) === [2,4.4,-6]);
// console.log(doubler(['ab', 'dg']) === ['abab', 'dgdg']);
// console.log(doubler([2, 'dg']) === [4, 'dgdg']);
// console.log(doubler(['', 5]) === ['', 10]);
// console.log(doubler([['a',3],10]) === [['a',3], ['a',3], 20]); //reference?
// console.log(doubler([{a: 3},10]) === [{a: 3},{a: 3}, 20]); //reference?
// console.log(doubler([1,2,2]) === [2,4,4]);
// console.log(doubler([2, ,3]) === [4,6]); //sparse
// // console.log(doubler([2, 20: 'a']) === []); //properties remain unchanged
// //have to build a property
// console.log(doubler([['a',3],10]) === [['a',3], ['a',3], 20]); //reference?
// console.log(doubler([]) === []);
// console.log(doubler([1], ['a']) === [2]);
// console.log(doubler('as') === ['aa','ss']);
// console.log(doubler(123) === [2,4,6]);
// console.log(doubler({a: 1, b: 2}) === [2,4]);
// console.log(doubler(null) === 'Invalid input');
// console.log(doubler(true) === 'Invalid input');
// console.log(doubler(undefined) === 'Invalid input');
// console.log(doubler(-123) === 'Invalid input');
// console.log(doubler(23.5) === 'Invalid input');

// Given test cases (reasonable)
// elements that are numbers should be multiplied by 2
doubler([1, 2, 3]);                    // [2, 4, 6]

// elements that are strings should be repeated twice via concatenation
doubler(['a', 'b', 'c']);              // ["aa", "bb", "cc"]

// other types of elements should be duplicated in the array
doubler([true, false]);                // [true, true, false, false]
// I missed this one
doubler([null]);                       // [null, null]
// I missed this one
doubler([undefined]);                  // [undefined, undefined]
// I missed this one
doubler([[1], []]);                    // [[1], [1], [], []]
doubler([{ foo: 'bar' }]);             // [{ foo: "bar" }, { foo: "bar" }]
doubler([function foo() {}]);          // [function foo(), function foo()]
// I missed this one
doubler([/abc/]);                      // [/abc/, /abc/]
// I missed this one

// the input array should not be mutated
let array = [1, 2, 3];
doubler(array);                        // [2, 4, 6]
array;                                 // [1, 2, 3]
// I noted this, but didn't make an example showing it

// Given edge cases (overkill!)
// elements that are special number values should remain unchanged
  // whoa, I apparently didn't know that "special number" was a designation for these values
doubler([NaN, Infinity, -Infinity]);   // [NaN, Infinity, -Infinity]

// elements that are any other type of number should be treated normally (multiplied by 2)
doubler([0.42, -5, 0, -0]);            // [0.84, -10, 0, -0]

// elements that are empty strings should remain unchanged
doubler(['']);                         // [""]

// elements that are any other type of string should be treated normally (repeated twice)
doubler([' ', 'aB', '@', '\n', '1']);  // ["  ", "aBaB", "@@", "\n\n", "11"]

// the input array can contain a mixture of different types of elements
doubler([1, 'a', true, [], {}]);       // [2, "aa", true, true, [], [], {}, {}]

// non-primitive elements should have their reference duplicated, not their value
// let doubled = doubler([{ a: 'b' }]);
// doubled[0] === doubled[1];             // true
//smart test here

// elements that appear more than once should be treated normally (as specified above)
doubler([1, 1, true, true, {}, {}]);   // [2, 2, true, true, true, true, {}, {}, {}, {}]

// elements that contain nested arrays or objects should be treated normally (duplicated)
doubler([[1, [2, 3], {}]]);            // [[1, [2, 3], {}], [1, [2, 3], {}]]
doubler([{ a: [1] }]);                 // [{ a: [1] }, { a: [1] }]

// if the input array contains empty slots (a "sparse array"), they should be removed
doubler([1, , 2, , , 3]);              // [2, 4, 6]

// if an inner array (element) contains empty slots, they should remain unchanged
doubler([[1, , , 2]]);                 // [[1, empty × 2, 2], [1, empty × 2, 2]]

// if the input array contains any object properties, they should remain unchanged
// let array = [1, 2];
// array.foo = 'bar';
// doubler(array);                        // [2, 4, foo: "bar"]
// this is how we do the property, I forgot.

// if an inner array (element) contains any object properties, they should remain unchanged
// let array = [1, 2];
// array.foo = 'bar';
// doubler([array]);                      // [[1, 2, foo: "bar"], [1, 2, foo: "bar"]]

// if the input array is empty, return an empty array
doubler([]);                           // []

// if multiple arguments are passed, ignore all but the first
doubler(['a'], ['b']);                 // ['aa']

// if the argument is a string, treat it as an array of characters
doubler('abc');                        // ["aa", "bb", "cc"]
doubler('123');                        // ["11", "22", "33"]
doubler('');                           // []

// if the argument is a non-negative integer, treat it as an array of digits
doubler(123);                          // [2, 4, 6]
doubler(0);                            // [0]

// if the argument is an object, treat it as an array of its property values
doubler({ a: 1, b: 2 });               // [2, 4]
doubler({ a: 'A', b: [] });            // ["AA", [], []]
doubler({});                           // []


// Given edge cases for invalid:
// all other kinds of inputs are invalid, and should return the string 'Invalid input'
doubler(-1);                           // "Invalid input"
doubler(0.42);                         // "Invalid input"
doubler(Infinity);                     // "Invalid input"
doubler(NaN);                          // "Invalid input"
doubler(true);                         // "Invalid input"
doubler(false);                        // "Invalid input"
doubler(null);                         // "Invalid input"
doubler(undefined);                    // "Invalid input"
doubler(function () {});               // "Invalid input"
doubler(/abc/);                        // "Invalid input"
doubler();                             // "Invalid input"

function doubler(arr) {
  //nah
}

// Practice writing questions
/*
p:
input:
  an array of strings
    with some number of distinct strings
  an integer, k
    represents the kth distinct string to return

output:
  the kth distinct string
    if there are fewer than k DS, return ''.

questions:
  regular input
    length requirement for array, or for strings?
    any characters not allowed?
    case-sensitive?
  edge cases
    if 0 is passed as k?
    neg k value?

  invalid input?
    what to return if a non array is passed?
    if array has non-string elements
    spare array?
    what if no second argument?
    ignore additional arguments?

compared to given questions:
got em all, though I did read the problem incorrectly and missed that k is not
 explicitly positive
 */

/*
Given an array of integers, nums, return the third largest number in the array.
If the third largest number does not exist, return the greatest number.

You are not allowed to sort the array.

questions:
  - non-array inputs? plain object?
  - what to do with non-integer inputs
    ignore? convert?
    e.g. convert string integers to integers?
  - missing argument? extra arguments?
  - what to do with duplicate values?
  - what if there are fewer than 3 elements, or if all elements are the same?
    this is answered in the problem statement, but I know they're going to ask this
  - greatest by value, not absolute value, right? negative integers are always < positive
  - sparse arrays? ignore empty slots? ignore properties?
  - what to do with input of -/+ infinity? NaN, null, undefined?
  - any max or min limits for values?

missed:
  max number of elements for the array?
  can the numbers be in any order (This is implied in the problem statement,
    that we're not allowed to sort, so
e:
  made below

data:
  -arrays, copies of arrays, and spread syntax for an array

a:
  first filter out any values that aren't numbers

  filter out the largest value (all of them) from the array
    ID the max value
    then filter, keeping any value that is not that value
  this again, deleting the second largest value(s)
    same process, with the filtered array
  return the current largest, which is the third largest from the original
    find the max, and simply return it (doesn't matter how many occurrences there are)

 */

function thirdLargestValue(nums) {
  nums = nums.filter(x => String(x).match(/[0-9]/));
  let numsCopy = filterOutMaxValue(nums);
  numsCopy = filterOutMaxValue(numsCopy);

  let thirdLargest = Math.max(...numsCopy);
  if (thirdLargest === -Infinity) {
    return Math.max(...nums);
  } else {
    return thirdLargest;
  }

  function filterOutMaxValue(arr) {
    let largest = Math.max(...arr);
    return arr.filter(x => x < largest)
  }

}

// console.log(Math.max(...[3, , ,2])) // weird stuff happens with sparse arrays
// the Math.max of this spread is NaN, because it's comparing a bunch of values
// that aren't numbers, just empty slots.

// console.log(thirdLargestValue([3,1,2]) === 1);
// console.log(thirdLargestValue([3,1,2,3,3,3,1,1,2,2,2]) === 1);
// console.log(thirdLargestValue([3,2]) === 3);
// console.log(thirdLargestValue([3, , ,2]) === 3);
// console.log(thirdLargestValue([-3,-1,-2]) === -3);
// console.log(thirdLargestValue([-Infinity,-1,-2]) )// === -Infinity);
// console.log(thirdLargestValue([]) === )

/*
Write a function, primeNumberPrinter, that prints all prime numbers present as
substrings in a given string.

questions:
arguments
  - what to do with a missing argument
  - extra arguments
  - non-string arguments
    - like an array of strings? object with string property values?
    - null, undefined, boolean, numbers
  - arguments that don't contain prime numbers, what to return?
  - max length of a string? min length?

parsing
  - how to determine where one number ends and another begins
  - what separates numbers
  - is there a max length of a number?

- printing the results vs returning?
- return an array?
- what about duplicate values in the string? each their own element in the array?

missed:
- EMPTY string argument? (actually, would have been covered when I asked min length)
- what ORDER should the numbers appear in the array? order found? sorted by value?
- can the string contain NEGATIVE numbers?
- [to a lesser extent, I missed the idea that a set of digits could represent
more than one number, e.g. 123 represents 12 and 23 in addition to 123 (which is
honestly dumb, but it's the right question to ask. I had asked what separates
numbers, so I think I would have been covered there.]
 */

/*
Write a function that takes a two-dimensional array as the argument and turns it
 into a flat array with all duplicated elements removed. Treat numbers and
 number strings (e.g., 1 and '1') as duplicates, and keep the one that comes
 first in the result.

questions:
input:
  - extra arguments? missing argument?
  - non-2D array? 3D? just 1D? how to handle that input?
  - min or max size of the larger array, or of it's nested arrays?
  - how many sub arrays can there be?
  - what data types are allowed?
    - boolean, undefined, null, float numbers

  - sparse arrays?

output:
  - does the result array have to be sorted? filled by order in which the
  elements are encountered?
  - mutated original array, or new array?
  -
missed:
- will the elements of the array always be arrays themselves? If not, what should I do?
- NaN? do I remove duplicate NaN's (since they're not equal to themselves)
- can the array contain objects?
  - if objects are allowed, how do we determine equality? if they have the same
  key value pair?
- EMPTY subarrays?

 */
























