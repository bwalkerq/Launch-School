const blocks = [
['B', 'O'],
['X', 'K'],
['D', 'Q'],
['C', 'P'],
['N', 'A'],
['G', 'T'],
['R', 'E'],
['F', 'S'],
['J', 'W'],
['H', 'U'],
['V', 'I'],
['L', 'Y'],
['Z', 'M'],
]
/*
B:O   X:K   D:Q   C:P   N:A
G:T   R:E   F:S   J:W   H:U
V:I   L:Y   Z:M

Problem:
input: a string of a target word
output: boolean representing if the target word can be spelled successfully with the blocks

Spell some words with these blocks
use each block no more than once.
when a block is "used", only one letter per block is used
- (That mean no double letters)
- case-insensitive

Data:
nested array for the blocks
array to track which letters have been used (rather than blocks)
array of string characters for the target word

A:
useABlock
iterates through the blocks array const, finds the target letter, returns it and it's partner letter
  for loop
  check each sub array with includes
  if found
    return 0th and 1th elements

isBlockWord
bad inputs:
  - return "invalid input homie" if not a string
  - return "invalid input homie" if input includes any string that is not a letter
    - regex for only letters

store each of the letter pairs in a subarray of a nested array
  hardcode the nested array as a const 'blocks'
have an empty "used" array
  - 'used'

uppercase the string
break the word into an array of string letters
  - split
go through each letter of the word I'm trying to spell
  - for loop because I'll short circuit
see if the used array includes the current letter
  - includes method called on the used array
if so
  return false
if not, put the letter and it's block-mate in the used array.
  push into the used array:
    helper function that finds and returns the appropriate block letters

if I make it through the whole word, return true the end

 */
function isBlockWord(str) {
  if (typeof str !== 'string') return "invalid input, homie.";
  if (str.match(/[^a-z]/i)) return "invalid input, homie.";

  let used = [];
  str = str.toUpperCase().split('');

  for (let i = 0; i < str.length; i++) {
    if (used.includes(str[i])) {
      return false;
    } else {
      let [a, b] = (useABlock(str[i]))
      used.push(a, b);
    }
  }
  return true;
}

function useABlock(letter) {
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i].includes(letter)) {
      return [blocks[i][0], blocks[i][1]];
    }
  }
}

// console.log(useABlock('H'));

// console.log(isBlockWord('BATCH'));      // true
// console.log(isBlockWord('BUTCH'));      // false
// console.log(isBlockWord('jest'));       // true

// console.log(isBlockWord(true));       // 'invalid input'
// console.log(isBlockWord(123));       // 'invalid input'
// console.log(isBlockWord("123"));       // 'invalid input'

/*
notes from Phillip:
In the data structure part, make a decision faster if one structure doesn't seem
immediately better than the other; later on it may become apparent that one is
better, and I can switch then if necessary

algo
started out high level enough, went into too much detail with things like "I'll use
a for loop here" or "I'll use includes method"

start coding by 25 min

testing more frequently, I did do this with the helper method

type, then read
 */

/*
Feedback that I often give:
  - Think of the interview as a presentation of your process; you want to make
it transparent what you're thinking and why, and also package it in a way
that is easy for them to understand and follow. While thinking, talk through
your solution process. Once you've settled on something, state it clearly,
and then type it out. Bite-sized ideas are great. Say a sentence or two about
each line of algorithm or code that you type, before you type. Then type in
silence to give you and the interviewer a moment of silence to process.
- When testing as you code, Always communicate what you *expect* the code to do
  *before* running the code. This demonstrates that you are in control of the
code
- Test as often as possible for each unique bit of code; err on the side of
testing too much
- The algorithm and the code always have to align; sometimes you have to go
back and revise your algo (blueprint and building construction, a la Spencer)
*/

/*
input: n, the number of switches, the number of passes
output: array of the lights still on (perfect squares, cause factors, baby)

p:
have n switches, all off, turn all on, then every 2nd off, then every 3rd on, every 4th off...
after n passes, which are on, and return them in an array.

e:
satisfied

d:
object for each light, key number, with boolean for state as value
pull out the keys that match true at the end into an array

a:
loop from 1 to n to make the object, setting all values to false
  note that we have actual length because starting at 1, not 0
Make an array of the list of numbers, for iteration
iterate through the object, changing the state of each ith property
  - if the number is a factor of i,
   change state
  - else continue

filter out the keys that have a true value, return it
  object.keys(obj).filter
    return the value

change state helper:
given a boolean, return the opposite
 obj[i] = !obj[i]
 */

function lightsOn(switches) {
  let obj = {};
  for (let i = 1; i <= switches; i++) {
    obj[i] = false;
  }

  let fullList = Object.keys(obj);

  fullList.forEach(i => {
    fullList.forEach(j => {
      if (j % i === 0) {
        obj[j] = !obj[j];
      }
    });
  });

  return fullList.filter(x => obj[x]).map(Number);
}

// console.log(lightsOn(5));        // [1, 4]
// Detailed result of each round for `5` lights
// Round 1: all lights are on
// Round 2: lights 2 and 4 are now off;     1, 3, and 5 are on
// Round 3: lights 2, 3, and 4 are now off; 1 and 5 are on
// Round 4: lights 2 and 3 are now off;     1, 4, and 5 are on
// Round 5: lights 2, 3, and 5 are now off; 1 and 4 are on

// console.log(lightsOn(100));      // [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
// 24 minutes, no input validation

/*
input: an odd integer >= 7
output: fancy star with 8 points, logged

p:
n across the middle
top and bottom portions reflected
top: each layer has three stars, more spaced out as we get farther
away from the center
each layer is centered
3 stars with no spaces
3 stars with one space between each
... with 2 spaces between each pair

could be considered a grid n*n

e: n = 7
*  *  *
0 * 2 * 2 * 0

* * *
1 * 1 * 1 * 1
***
2 * 0 * 0 * 2

n = 9
*   *   *
0 * 3 * 3 * 0
...
3 *** 3


d:
strings stored in an array that represents just the top half
a variable for the middle line of the star

a:
bad inputs:
- even integers
- non-int numbers
- non-numbers
log "invalid" if these happen

declare middle string

get empty top array

for the top array:
there are (n-1 / 2) elements (lines) in this array
  create outside spaces variable, set to 0
  create inside space variable, set to (n-3 / 2)
  iterate
    push into array: OS + star + IS + star + IS + star + OS
    increment OS
    decrement IS


log the strings from the array for the top half
log the middle string
log the reverse of the top array

 */
function star(n) {
  if (n < 7 || n % 2 !== 1 || typeof n !== 'number' || !Number.isInteger(n)) {
    console.log("invalid");
    return;
  }

  let halfArray = [];
  let middle = '*'.repeat(n)

  let outSpace = 0;
  let inSpace = (n-3) / 2;

  for (let i = 0; i < (n-1)/2; i++) {
    halfArray.push(
      ' '.repeat(outSpace) +
      '*' +
      ' '.repeat(inSpace) +
      '*' +
      ' '.repeat(inSpace) +
      '*' +
      ' '.repeat(outSpace)
    );

    outSpace += 1;
    inSpace -= 1;
  }

  halfArray.forEach(x => console.log(x));
  console.log(middle);
  halfArray.reverse().forEach(x => console.log(x));
}

// 39 minutes (!)

/*
Phillip says strong, thing to increase is JS fluency
string.prototype.repeat - I needed this, didn't remember it
Also had to get help with how to confirm something is/isn't an integer
  Number.isInteger() returns boolean
big note here: if there are quantities that change over each iteration (e.g.
the inSpace and outSpace here) it may be more easy/useful to express those quantities
in terms of i, rather than setting them to a value before the first iteration and
inc/dec those values. Especially if the quantities change non-linearly, this alt
approach may be dope.

use more descriptive names for parameter in a callback function if it's any more
complex than what I have

spend less time fixing typos to have more time to code

 */


// star(6);
// star(3);
// star(6.2);
// star('6');
// star([6]);
// star(7);
// star(9);
// star(21);

/*
input: odd integer, n
output: a diamond design logged with height and width n

p:
the middle row has n stars, while each row moving away from the middle has
n - 2r stars, where r is the number of rows from the middle
The top and bottom rows each have 1 star centered

e: satisfied

d:
array for top half, elements are strings

a:
bad input:
non integers, even ints, neg ints

declare empty top-half array
declare middle string of n stars

iterate (n-1)/2 times
  build string is (n-1)/2 - i spaces, plus 1+2(n-1) stars,
    push that into array

log each element of the array
log the middle
log the reverse array elements


 */
function diamond(n) {
  if (!Number.isInteger(n) || n % 2 !== 1 || n < 0) {
    console.log(`no can do, sucka. ${n} is not an odd integer.`)
    return false;
  }

  let topHalf = [];
  let middle = '*'.repeat(n)
  let halfLength = (n-1) / 2;

  for (let i = 0; i < halfLength; i++) {
    topHalf.push(
      ' '.repeat(halfLength - i) +
      '*'.repeat(1 + 2 * (i))
    );
  }
  topHalf.forEach(x => console.log(x));
  console.log(middle);
  topHalf.reverse().forEach(x => console.log(x));
}

// diamond(3);
// diamond(5);
// diamond(7);
// diamond([7]);
// diamond(2);
// diamond(-2);
// diamond('asdf');
// something like 25 min? But this is annoying because it was the exact same
// structure as the star one at the end. I clearly should have done this one
// first. I think Phillip just wanted to share his solution because it's cool.

/*
input/test-writing questions to ask the interviewer
all input:
  - input validation? How should we handle bad input? error message?
  - what do null, undefined, empty arrays, empty objects?
  - what should be done with repeat/duplicate values?

if number input:
  - what is the range of inputs? max and min?
  - can +/- infinity be an input?
  - negative numbers?
  - floats?
  -

 questions for strings:
  - which characters constitute a "word" or a "token"?
    - uppercase and lowercase?
    - hyphenated words?
    - a 'dash' made of two hyphens?
    - are there any "starts with" requirements (remember ^ anchor for regex)
    - are there any "ends with" requirements (remember $ anchor)
  - What characters will separate tokens (or words)?
    - exactly one space, or more than one space? up to how many spaces?


Data Structure lecture notes (90 min video)
  - input data
  - rules/requirements as data
    - hash/object

  - string, array, hash/object, number
    - string
      - concat, strip, reverse, etc.
      - Regular Expression! split, replace, match...
    - array
      - need to walk through it (iteration)
      - index
      - abstractions!!
        - map
        - reduce
        - select/filter
        - all
        - ...
    - hash/object
      - lookup table / dictionary
      - partition data for more efficient access downstream
      - digest
    - number
      - math operations
      - number as string may have advantage over numbers
  - compound data structures
    - array of arrays
    - hash with array/object values, etc.

Algorithm
  - algorithms have to be described in the language of chosen data structure!
    - "then solve it" doesn't count
  - have to be really fluent with
    - String / Regex
    - Array
      - Ruby: Enumerable
      - JavaScript: Higher-Order Functions
    - Hash / Object
      - Creation (default values)
      - Access (default values)
      - Iteration
  - verify your algorithm with your examples / test cases
 */






















































