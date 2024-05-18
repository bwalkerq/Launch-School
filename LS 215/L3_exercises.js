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

function compareVersions(version1, version2) {
  if ((version1 + version2).match(/[^0-9.]/)) return null;

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
  - greatest by value, not abosoute value, right? negative integers are always < positive
  - sparse arrays? ignore empty slots? ignore properties?
  - what to do with input of -/+ infinity? NaN, null, undefined?
  - any max or min limits for values?


 */






























