/* P: given an array of integers, return the sum
base case: an empty array?
A:
return if empty
pop = array pop
return sum of array + pop
* */
function sum(arr) {
  if (arr.length === 0) return 0;
  let popped = arr.pop();
  return sum(arr) + popped;
}

console.log(sum([1, 2, 3]) === 6);
console.log(sum([10, 15, 20, 10, 5]) === 60);
console.log(sum([-5, -1, 5, 2, -3]) === -2);
console.log(sum([7]) === 7);
console.log(sum([]) === 0);

// All test cases should log true.