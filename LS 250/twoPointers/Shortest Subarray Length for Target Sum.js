// Write a function named `minLengthForTargetSum` that
// determines the minimal length of a contiguous subarray
// within an array of positive integers, `nums`. This
// subarray should have a sum that is greater than or
// equal to a specified positive integer, `target`. The
// function should return the length of this subarray.
// If no such subarray exists, return 0.

// Example:
// Input: nums = [4, 2, 5, 7], target = 10
// Output: 2
// Explanation: In this example, the shortest subarray that
//              meets or exceeds the target sum of 10 is [5, 7].
//              This subarray sums to 12, which is greater than
//              the target sum of 10. The length of this
//              subarray is 2.

/* P: given an array of unsorted numbers and a target, return the length of
* the smallest subarray whose sum >= target.
* E: BAE, the pointers need to start in the same place since the subarray can be
* 1
* D: two pointers, shifting single window with left and right moving
* A: My initial thought is that we start on the left, pointers in the same spot,
* check the sum, and if it's big enough,
*   compare the length with the stored shortest length and replace if smaller
* then move the left pointer to the right
* if the sum isn't big enough, move the right pointer to the right
* ??when do I exit the loop? when the right pointer is at the end, and the sum
* is smaller than the target.
* This was wrong! it's actually if the right pointer is NOT at the end, OR the
* sum is greater= than the target (if the sum is bigger, then keep shaving off
* the left tail in hopes of getting a smaller distance.)
*
* specifically:
* left and right = 0
* result = length + 1 (one longer than the longest case scenario)
* sum = first value
* while the right not at the end of the array OR sum >= target
*   if sum is less than target
*     right++
*      add its value to the sum
*   else --> meaning sum is >= target
*     replace result if it's shorter
*       result = current distance, which is 1 + right - left
*     subtract left's val from the sum
*     left++;
* return result if it's shorter than length + 1, else 0
* */

function minLengthForTargetSumFD(nums, target) {
  let left = 0;
  let right = 0;
  let sum = nums[left];
  let shortest = nums.length + 1; // one longer than longest possible

  while (right !== nums.length - 1 || sum >= target) {
    if (sum >= target) {
      let distance = 1 + right - left;
      shortest = distance < shortest ? distance : shortest;
      sum -= nums[left];
      left++;
    } else {
      right++;
      sum += nums[right];
    }
  }
  return shortest === nums.length + 1 ? 0 : shortest;
}

/* about 30 min. I liked my original approach, it only took me a few minutes to
* think about a two pointer method beyond the brute force.
* I got really mixed up with the while condition, and needed to test that out
* on difference cases.
* I think generally I could spend more time talking through a case or two once I
* get some logic established.
* The AI solution is nice because it's a for loop plus a while condition, which
* means that it's cleaner and less error-prone because I'm not juggling two conditions
* in the while.
* */

function minLengthForTargetSum(nums, target) {
  let left = 0;
  let sum = 0;
  let shortest = Infinity;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];

    while (sum >= target) {
      shortest = Math.min(right - left + 1, shortest);
      sum -= nums[left];
      left++;
    }
  }
  
  return shortest === Infinity ? 0 : shortest;
}

console.log(minLengthForTargetSum([1, 2, 3], 5) === 2);
console.log(minLengthForTargetSum([1, 1, 1], 4) === 0);
console.log(minLengthForTargetSum([8, 2, 1, 4], 8) === 1);
console.log(minLengthForTargetSum([1, 2, 3, 4, 5], 9) === 2);
console.log(minLengthForTargetSum([1, 4, 1, 3, 6, 2], 9) === 2);
console.log(minLengthForTargetSum([1, 2, 3, 4], 10) === 4);
console.log(minLengthForTargetSum([1, 2, 6, 1, 1, 7], 9) === 3);
console.log(minLengthForTargetSum([4, 2, 2, 1, 5, 2], 14) === 5);

// All test cases should log true