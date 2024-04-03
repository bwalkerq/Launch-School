repeater('Hello');        // "HHeelllloo"
repeater('Good job!');    // "GGoooodd  jjoobb!!"
repeater('');             // ""

function repeater(string) {
  
}

repeater('Hello');        // "HHeelllloo"
repeater('Good job!');    // "GGoooodd  jjoobb!!"
repeater('');             // ""

function repeater (str) {
  let result = '';
  str.split('').forEach( letter => result += (letter + letter))
  return result;
}

const VOWELS = ['a','e','i','o','u']
function doubleConsonants(str) {
  let result = '';
  str.split('').forEach(char => {
    if (VOWELS.includes(char) || !char.match(/\w/)) {
      result += char;
    } else {
      result += (char + char);
    }
  });
  return (result)
}

doubleConsonants('String');          // "SSttrrinngg"
doubleConsonants('Hello-World!');    // "HHellllo-WWorrlldd!"
doubleConsonants('July 4th');        // "JJullyy 4tthh"
doubleConsonants('');                // ""

function reverseNumber(num) {
  return (parseInt(num.toString().split('').reverse().join(''), 10));
}

reverseNumber(12345);    // 54321
reverseNumber(12213);    // 31221
reverseNumber(456);      // 654
reverseNumber(12000);    // 21 -- Note that zeros get dropped!
reverseNumber(1);        // 1

// centerOf('I Love JavaScript'); // "a"
// centerOf('Launch School');     // " "
// centerOf('Launch');            // "un"
// centerOf('Launchschool');      // "hs"
// centerOf('x');                 // "x"

function centerOf(str) {
  let length = str.length;
  if (length % 2 === 0) {
    console.log(str.slice(length / 2 - 1, length / 2 + 1));
  } else {
    console.log(str.slice(length / 2, length / 2 + 1));
  }
}

negative(5);     // -5
negative(-3);    // -3
negative(0);     // -0

function negative(num) {
  return (num >= 0 ? -num : num);
}

/*
 note js includes two representations of zero, which is useful when
 approaching infinity:
 console.log(1 / +0 ===  Infinity) // true
 console.log(1 / -0 === -Infinity) // true
 they're not the same object, though, just have the same loose and strict value.
 */

// sequence(5);    // [1, 2, 3, 4, 5]
// sequence(3);    // [1, 2, 3]
// sequence(1);    // [1]
//
// function sequence(num) {
//   let result = [];
//   for (let i = 0; i < num; i++) {
//     result.push(i + 1);
//   }
//   return (result);
// }

// swapName('Joe Roberts');    // "Roberts, Joe"

function swapName(str) {
  console.log(str.split(' ').reverse().join(', '));
}

sequence(5, 1);          // [1, 2, 3, 4, 5]
sequence(4, -7);         // [-7, -14, -21, -28]
sequence(3, 0);          // [0, 0, 0]
sequence(0, 1000000);    // []

function sequence(count, start) {
  let result = [];
  for (let i = 0; i < count; i++) {
    result.push(start * (i + 1));
  }
  return (result);
}

reverseSentence('');                       // ""
reverseSentence('Hello World');            // "World Hello"
reverseSentence('Reverse these words');    // "words these Reverse"

function reverseSentence(str) {
  return (str.split(' ').reverse().join(' '))
}

reverseWords('Professional');             // "lanoisseforP"
reverseWords('Walk around the block');    // "Walk dnuora the kcolb"
reverseWords('Launch School');            // "hcnuaL loohcS"

function reverseWords(str) {
  let words = str.split(' ');
  words = words.map( word => {
    if (word.length >= 5) {
      return word.split('').reverse().join('');
    } else {
      return word;
    }
  });
  console.log(words.join(' '))
}

function dothis(arg1, another) {
  arg1 = 3;
  object1 = 1
}

let object1 = {1: 4}

dothis(object1);

console.log(object1)
