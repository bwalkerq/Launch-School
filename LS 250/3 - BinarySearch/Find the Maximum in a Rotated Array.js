// Write a function `findMax` that finds the maximum element in
// a rotated sorted array.

// A rotated sorted array is an array that was originally sorted
// in ascending order, but has been rotated (shifted) by some
// number of positions. The function should take an array of
// integers as input, representing the rotated sorted array,
// and it should return the maximum element in the array.
// The array is guaranteed to have at least one element.

// The solution should be in O(logN) time complexity.

// Example:
// Input: nums = [8, 9, 10, 2, 5, 6]
// Output: 10
// Explanation: The original sorted array [2, 5, 6, 8, 9, 10]
//              was rotated 3 times.

/* holy shit! spicy, I've spent 7 minutes just pointing at my screen and playing this out
* P: given a rotated sorted array of numbers, return the max.
* input: array, sorted then rotated some # of times
* output: the max value
*
* E: As I play with this, I think we want to compare the mid to the left element.
* If the left el is greater than the mid element,
*   the max is to the left, so move search left
*   right = mid - 1 (because the mid can't be the max, since the left most is already bigger than it)
* if the left element is less than the mid element
*   it could be the max or the max occurs to the right
*
* D: Binary search
* A:
* left = 0
* right = last element
* while left < right
*   if left element > mid element
*     right = mid - 1
*   else (meaning left element is less than the mid element)
*     turns out I DO indeed need to check an immediate neighbor, because the case
*     where there's two elements and the right hand is larger caught this into an infinite loop
*     left = mid + 1
* return left
* */

function findMax(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let mid = Math.floor((right + left) / 2);

    if (nums[left] > nums[mid]) {
      right = mid - 1;
    } else { // left element is smaller or equal to mid element
      if (nums[mid] > nums[mid + 1]) return nums[mid];
      left = mid + 1;
    }
  }
  return nums[left];
}

/* 29 minutes. Surprisingly long. I go the bulk done but got tripped up by the
* case where there are two elements and the right hand side is larger.
* I had originally put in a check for the mid element to be the max before shifting
* the search to left, but took it out thinking that the max would end up in the
* left spot eventually, but it didn't work like that.
*
* AI says that mine is briefer but harder to understand than the given solution.
* Theirs is very clear.

function findMax(nums) {
  let left = 0;
  let right = nums.length - 1;
  let firstElem = nums[0];
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let midNumber = nums[mid];

    if ((mid === 0 || nums[mid - 1] < midNumber) && (mid === nums.length - 1 || nums[mid + 1] < midNumber)) {
      return midNumber;
    } else if (midNumber < firstElem) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
}
* */

console.log(findMax([8, 9, (10), 2, 5, 6]) === 10);
console.log(findMax([15, 18, (2), 3, 6, 12]) === 18);
console.log(findMax([7, 8, 2, (3), 4, 5, 6]) === 8);
console.log(findMax([3, 1]) === 3);
console.log(findMax([5]) === 5);
console.log(findMax([9, 10, 11, 12, (13), 14, 15, 1, 2, 3]) === 15);
console.log(findMax([4, 5, (1), 2, 3]) === 5);
console.log(findMax([23, 34, 38, 40, 41, 14, (15), 16, 17, 18, 19, 20, 21]) === 41);
console.log(findMax([100, 200, 300, 400, 500]) === 500);
console.log(findMax([45, 47, 49, 51, 53, (55), 57, 59, 61, 63, 44]) === 63);
console.log(findMax([11, 13, 15, 17, 19, 21, 1, 3, 5, 7, 9]) === 21);