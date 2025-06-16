// Recursion
/*
* A [data structure] is a [problem definition] if [some condition is true], and
* the rest of the [data structure] is [problem definition].
*
* P: given a number >=0  n, return the sum of the numbers 0 to n.
* E: BAE
* D: recusion
* A:
* base case: n = 0, return zero
* recusive case: return n + sumOfNN(n-1)
* reduction step: (n-1)
*
* if n <= 0 return 0
* else
*   return n + f(n-1)
*  */

// Create a function that calculates the sum of the first `n`
// natural numbers. A natural number is a positive integer
// starting from 1. Therefore, the sum of the first `n` natural
// numbers is the sum of all integers from 1 to `n`.

// For example, if `n` is 5, the sum would be 1 + 2 + 3 + 4 + 5 == 15.

console.log(sumOfNaturalNumbers(1) === 1);
console.log(sumOfNaturalNumbers(5) === 15);
console.log(sumOfNaturalNumbers(10) === 55);
console.log(sumOfNaturalNumbers(20) === 210);
console.log(sumOfNaturalNumbers(0) === 0);

// All test cases should log true.

function sumOfNaturalNumbers(n) {
  if (n <= 1) {
    return n;
  }
  return n + sumOfNaturalNumbers(n-1);
}