// Write a function named `minLengthForTargetSum` that
// determines the minimal length of a contiguous subarray
// within an array of positive integers, `nums`. This
// subarray should have a sum that is greater than or
// equal to a specified positive integer, `target`.
// The function should return the length of this
// subarray. If no such subarray exists, return 0.

// The time complexity of your solution should be O(NlogN).

// Example:
// Input: nums = [4, 2, 5, 7], target = 10
// Output: 2
// Explanation: In this example, the shortest subarray that
//              meets or exceeds the target sum of 10 is [5, 7].
//              This subarray sums to 12, which is greater than
//              the target sum of 10. The length of this subarray is 2.

/*
* P: given an UNsorted array of numbers, use binary search to return the LENGTH of the shortest
* subarray from the given array that sums to a value greater than or equal to a given target
*
* I haven't figured out an algorithm that always yields the correct answer
* start at the middle and sum each half.
* If the left half is too low, add number?
* if the right half is too low, add a number?
* these feels like recursion?
* I took the hint, because I felt desperately tired from insanely bad sleep last night:
* You can perform a binary search on the length of the array. This way, you can eliminate half of the possible lengths each time, which accounts for the logN part of the solution.
* ok so each iteration we choose half the length, and slide that length along the array to see if it sums?
* meaning, start with half the length, if it doesn't sum, take a length that is midway between half and full
* and if it does sum, choose a length that is midway from 1 to half, until we find the right length.
* That's really smart.
*
* left = 0
* right is length
* shortest = infinity
*
* while left < right (when they become equal, return)
*   let mid (represents the length of the interval)
*   for i from 0 to i <= length - mid
*     find the sum of the subarray
*     if the subarray sums >= target
*       store mid value in shortest
*       try smaller window
*       right = mid
*       break;
*
*     try bigger window
*     left = mid
*     if left === right, break;
* return shortest
* */

function minLengthForTargetSumFD(nums, target) {
  let left = 0;
  let right = nums.length
  let shortest = Infinity;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let found = false;
    console.log('mid:', mid)
    for (let i = 0; i <= nums.length - mid; i++) {
      const sum = nums.slice(i, i + mid).reduce((total, c) => total += c, 0)
      if (sum >= target) {
        found = true;
        shortest = mid;
        right = mid;
        console.log("shortest:",shortest)
        break;
      }
    }
    if (!found) {
      left = mid + 1;
    }
    if (left === right) return shortest;
  }
}
/* GD what a mess;
* How could I have avoided this?
* Once it became a hot mess, how could I have stepped back to make this work?
* The thing I needed to do differently was use anchor runner rather than slicing and so on, I think?
* helper function for is this a valid length?
  * given k (a length), the nums, and the target, return true if the sum is achieved, else false
  * initialize sum of the right number of integers
  * slide the window of the sum down the line, checking all the way
  * if sum >= target, true
  * if we get to the end, false
*
* main function
  * binary search with the length of k
  * left = 0
  * right = length
  * for each value in the binary search...
  * if helper function returns true, store in shortest
  *
  * return shortest at the end
* */

function isAValidLength(k, nums, target) {
  let anchor = 0;
  let runner = 0;
  let sum = 0;

  while (runner < k) {
    sum += nums[runner];
    runner++;
  }

  if (sum >= target) return true;

  while (runner < nums.length) {
    sum -= nums[anchor];
    anchor++;
    sum += nums[runner]; // put guard clause for runner off the end? += undefined?
    runner++;
    if (sum >= target) return true;
  }
  return false
}

// console.log(isAValidLength(2, [1, 2, 3], 5))

function minLengthForTargetSum(nums, target) {
  let left = 1;
  let right = nums.length
  let shortest = 0;

  while (left <= right) {
    let mid = Math.floor((right + left) / 2);
    if (isAValidLength(mid, nums, target)) {
      shortest = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return shortest;
}


console.log(minLengthForTargetSum([1, 2, 3], 5) === 2);
console.log(minLengthForTargetSum([1, 1, 1], 4) === 0);
console.log(minLengthForTargetSum([8, 2, 1, 4], 8) === 1);
console.log(minLengthForTargetSum([1, 2, 5, 4, 3], 9) === 2);
console.log(minLengthForTargetSum([1, 4, 1, 3, 6, 2], 9) === 2);
console.log(minLengthForTargetSum([1, 2, 3, 4], 10) === 4);
console.log(minLengthForTargetSum([1, 2, 6, 1, 1, 7], 9) === 3);
console.log(minLengthForTargetSum([4, 2, 2, 1, 5, 2], 14) === 5);

// All test cases should log true






























