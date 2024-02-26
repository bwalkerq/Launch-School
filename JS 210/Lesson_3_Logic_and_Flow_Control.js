function p(input) {
  console.log(input)
}

function logOddNumbers(max) {
  for (let i = 0; i <= max; i++) {
    if (i % 2 === 1) console.log(i) ;
  }
}

// logOddNumbers(19)

function multiplesOfThreeAndFive(start, end) {
  for (let number = start; number <= end; number++) {
    if (number % 15 === 0 ) {
      console.log(number.toString() + '!');
    } else if (number % 5 === 0 || number % 3 === 0) {
      console.log(String(number));
    }
  }
}

// multiplesOfThreeAndFive(2,200)

function logMultiples(number) {
  let upperBound = Math.floor(100 / number) * number

  for (let i = upperBound; i >= number ; i-= number) {
    if (i % number === 0 && i % 2 === 1) {
      console.log(i);
    }
  }
}

// logMultiples(17)

function fizzBuzz () {
  for (let number = 0; number <= 100; number++) {
    message = number

    if (number % 15 === 0 ) {
      message = 'FizzBuzz';
    } else if (number % 5 === 0) {
      message = 'Buzz';
    } else if (number % 3 === 0) {
      message = 'Fizz';
    }

    console.log(message);
  }
}

// fizzBuzz()

function isPrime(candidate) {
  if (candidate <= 1) {
    return false;
  }

  for (let i = 2; i < candidate; i++) {
    if (candidate % i === 0) {
      return false;
    }
  }

  return true;
}

isPrime(1);   // false
isPrime(2);   // true
isPrime(3);   // true
isPrime(43);  // true
isPrime(55);  // false
isPrime(0);   // false

function isXor(firstValue, secondValue) {
  return !!firstValue !== !!secondValue
}
/* to me, this is way more direct, since what we're dealing with is
parity; we're looking to return true when the boolean values are DIFFERENT
from one another. two trues and two falses each return false. The straightforward
was is just to say when the first is not the same as the second.
 */

// isXor(false, true);     // true
// isXor(true, false);     // true
// isXor(false, false);    // false
// isXor(true, true);      // false
//
//
// isXor(false, 3);        // true
// isXor('a', undefined);  // true
// isXor(null, '');        // false
// isXor('2', 23);         // false

let rlSync = require('readline-sync');

function guessThePassword() {
  const PASSWORD= "password";
  let numOfGuesses = 0

  while (numOfGuesses < 3) {
    let guess = rlSync.question("What's the password?\n");
    if (PASSWORD === guess) {
      console.log(`You have successfully logged in, mother trucker!`);
      return;
    }
    numOfGuesses++;
  }
  console.log(`nah, b`);
}

// guessThePassword()











































