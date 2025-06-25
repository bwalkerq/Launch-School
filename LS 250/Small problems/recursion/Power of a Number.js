
/* given x and n, return x^n, recursively
* A: if n is 0, return 1
* return the power function with n-1) * x
* */
function power(x, n) {
  if (n === 0) return 1;
  return power(x, n-1) * x;
}

console.log(power(2, 3) === 8);
console.log(power(5, 0) === 1);
console.log(power(3, 4) === 81);
console.log(power(7, 2) === 49);
console.log(power(10, 1) === 10);

// All test cases should log true.