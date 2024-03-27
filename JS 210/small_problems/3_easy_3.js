function randomBetween() {
  ranNum = Math.random() * 200;
  ranNum = ranNum > 20 ? Math.ceil(ranNum) : 20;
  return ranNum
}

// console.log(`Teddy is ${ranNum} years old!`);

function countRandomNumbers() {
  var count = {};
  var counter = 0;
  var number;

  while (counter < 10000000) {
    number = String(randomBetween(20, 200));
    if (count[number]) {
      count[number] += 1;
    } else {
      count[number] = 1;
    }

    counter += 1;
  };

  console.log(count);
}

// countRandomNumbers();

let rlSync = require('readline-sync');
function searching101() {
  let arr = [];
  for (let i = 0; i < 5; i++) {

    arr.push(rlSync.question('Enter a number: '));
  }

  let searchTerm = rlSync.question('Enter the last number: ');

  if (arr.includes(searchTerm)) {
    console.log(`The number ${searchTerm} appears in ${arr}.`);
  } else {
    console.log(`The number ${searchTerm} does not appear in ${arr}.`);
  }
}

// searching101()

function timeToLive() {
  let age = rlSync.question('What is your age? ');
  let target = rlSync.question('Until what age do you imagine realistically living? ');
  let remainingYears = target - age;

  const today = new Date();
  const currentYear = today.getFullYear();
  const targetyear = currentYear + remainingYears;

  console.log(`It's ${currentYear}. You will realistically die in ${targetyear}`);
  console.log(`You have ${remainingYears} years, or ${remainingYears * 52} weeks to live!`);
}

// timeToLive();

// console.log(isPalindrome('madam') === true)
// console.log(isPalindrome('Madam') === false) //(case matters))
// console.log(isPalindrome("madam i'm adam") === false) // (all characters matter))
// console.log(isPalindrome('356653') === true)

// function isPalindrome(str) {
//   let reverseString = str.split('').reverse();
//   let chars = str.split('');
//   let iterationLength = Math.round(str.length)
//
//   for (let i = 0; i < iterationLength; i++) {
//     if (chars[i] !== reverseString[i]) return false;
//   }
//
//   return true;
// }

/* I had forgotten about === comparing strings char by char, so the given solution
is much more efficient
 */

function isPalindrome(string) {
  return string === string.split('').reverse().join('');
}

// console.log(isRealPalindrome('madam') === true) //
// console.log(isRealPalindrome('Madam') === true) // (case does not matter)
// console.log(isRealPalindrome("Madam, I'm Adam") === true) // (only alphanumerics matter)
// console.log(isRealPalindrome('356653') === true) //
// console.log(isRealPalindrome('356a653') === true) //
// console.log(isRealPalindrome('123ab321') === false) //

function isRealPalindrome(str) {
  const regex = /\W/gi;
  str = str.replaceAll(regex, '').toLowerCase();
  return isPalindrome(str);
}

// smoked their solution with regex, get psyched.

// isPalindromicNumber(34543);        // true
// isPalindromicNumber(123210);       // false
// isPalindromicNumber(22);           // true
// isPalindromicNumber(5);            // true

function isPalindromicNumber(n) {
  return isRealPalindrome(String(n));
}

/* I remembered this from the ruby track. I got burned then, and ripped this in
20 seconds this time. suck it.
 */

// runningTotal([2, 5, 13]);             // [2, 7, 20]
// runningTotal([14, 11, 7, 15, 20]);    // [14, 25, 32, 47, 67]
// runningTotal([3]);                    // [3]
// runningTotal([]);                     // []

function runningTotal(arr) {
  if (!arr || !arr.length) return arr;
  let result = [arr[0]];

  for (let i = 1; i < arr.length; i++) {
    result[i] = arr[i] + result[i-1];
  }
  return result;
}

/* I couldn't figure out how to use #map, though that was my instinct. Then I found
this solution!

function runningTotal(numbers) {
  let total = 0;
  return numbers.map(number => total += number);
}

which apparently is too terse and unclear, so the updated version is:

function runningTotal(numbers) {
  let total = 0;
  return numbers.map(number => {
    total += number;
    return total;
  });
}

but then again, there's a comma operator situation to note the specific return
value, which is smooth

function runningTotal(numbers) {
  let total = 0;
  return numbers.map(number => (total += number, total));
}

I like this one the most. I think I understand map a bit more.
 */

// swap('abcdef')
// swap('Oh what a wonderful day it is');  // "hO thaw a londerfuw yad ti si"
// swap('Abcde');                          // "ebcdA"
// swap('a');                              // "a"

function swap(str) {
  let wordsArr = str.split(' ');
  wordsArr = wordsArr.map( word => {
    let letters = word.split('')
    if (letters.length === 1) return word;
    first = letters.shift();
    last = letters.pop();
    letters.unshift(last);
    letters.push(first);
    return letters.join('');
  });
  return wordsArr.join(' ');
}

function swap(words) {
  function swapFirstLastCharacters(word) {
    return word.replace(/^(.)(.*)(.)$/, '$3$2$1');
  }

  console.log(words.split(' ').map(swapFirstLastCharacters).join(' '))
  return words.split(' ').map(swapFirstLastCharacters).join(' ');
}


/* pete hanson's solution:
function swap(words) {
  function swapFirstLastCharacters(word) {
    return word.replace(/^(.)(.*)(.)$/, '$3$2$1');
  }

  console.log(words.split(' ').map(swapFirstLastCharacters).join(' '))
  return words.split(' ').map(swapFirstLastCharacters).join(' ');
}

it's the regex I don't understand at all at this point. Someday I will.
context clues suggest:
 '^' starting with, '.' for any character, so '^(.)' the single char that starts the string
'.*' means any number of characters... (given the next expression, this means "in the middle")
'(.)$' the last single character

since we're using replace, the expression after the comma is what to replace the word with, so
$n means the nth capture group. I think maybe the '()/ denote capture groups? so
$3$2$1 means return the 3rd, 2nd, and 1st capture groups in the order, thus returning
the last letter, the middle letters, and the first letter.

another posted solution wrote it this way:
    return word.replace(/(^.)(.*)(.$)/, '$3$2$1' )
but DON'T write it this way, NON-STANDARD, LOOKS YUK to Jon

Jon and I discussed, as we always do, a great deal about the regex in this problem

The main take away for me (which feels foundational, so I'm glad that I got it now?)
is that a regex will always match if it *can* match, so there's an interesting scenario
with the greedy operators and non-greedy modifiers where even a non-greedy
'+?' (one or more, but the least I can take to fulfil the requirements of the regex)
will take up almost the whole word.

first, `^(.)(.*)(.)$` is a bit redundant, as `.` will capture a single character,
starting at the beginning, so the `^` is strictly unnecessary, but Jon suggests
keeping it for readability. Same with the `$`; it will capture the char at the
end because `()` gets precedence and has to capture something. Again, keep it as
written for readability.

with the `?` non-greedy modifier for `*` and `+`:
`(.)(.*?)(.)` captures only the first and second characters, in the 1st and 3rd
capture groups, respectively! The second capture group can catch 0 or more, but
with `?` takes the least amount required of it. And the return value of
`'abcde'.replace(/(.)(*?)(.)/, $3$2$1)`
would actually be 'bacde', with the first two characters switched in the first
two places, while the rest of the string is unchanged.

with `(.)(.+?)(.)`, similarly, the second capture group takes the minimum required
one char, the second character of the string, while the first and third take their
normal single characters. Here the first three letters would be returned in reverse
order, with the rest of the string unchanged.

Interestingly, `(.)(.+?)(.)^` with that trailing `^`, forces the otherwise non-greedy
second capture group to actually take the entire middle of the word. By requiring
that the third capture group take the last character, the second capture group
has to take everything in between the first and last characters in order for the
regex to match. That was surprising to me, though it's not now, so I guess that's...
learning!
 */

wordSizes('Four score and seven.');                       // { "3": 1, "4": 1, "5": 1, "6": 1 }
wordSizes('Hey diddle diddle, the cat and the fiddle!');  // { "3": 5, "6": 1, "7": 2 }
wordSizes("What's up doc?");                              // { "2": 1, "4": 1, "6": 1 }
wordSizes('');                                            // {}

function wordSizes(str) {
  let result = {};

  str.split(' ').forEach( word => {
    word = word.replaceAll(/\W/g, '');
    let length = word.length;

    if (result[length]) {
      result[length] += 1;
    } else {
      result[length] = 1;
    }
  });

  console.log(result);
  return result;
}






















