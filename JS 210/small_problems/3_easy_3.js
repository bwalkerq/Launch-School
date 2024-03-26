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
  return numbers.map(number => total += number, total);
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


























