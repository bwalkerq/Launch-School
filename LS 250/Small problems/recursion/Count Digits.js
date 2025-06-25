/*
* P: given an number, return the count of digits recurssively
* A:
* make a string
* remove one char at a time
* pass the rest of the string , add one
*
* OR, if zero, return 0
* return floor num divided by 10 + 1 */

function countDigits(num) {
  if (num < 10) return 1;
  return countDigits(Math.floor(num / 10)) + 1;
}
console.log(countDigits(12345) === 5);
console.log(countDigits(7) === 1);
console.log(countDigits(100000) === 6);
console.log(countDigits(99999) === 5);
console.log(countDigits(0) === 1);

// All test cases should log true.