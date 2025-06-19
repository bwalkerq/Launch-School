// Imagine a series of vertical barriers arranged in a straight
// line at equal distances across a flat field.
// These barriers have different heights. After a rainstorm,
// water collects between the barriers, forming reservoirs.
// Your task is to determine the maximum volume of rainwater
// that can be captured between any two barriers, without
// the water spilling over the tops of those two barriers.

// Write a function `maxRainwater` that takes an array of
// barrier `heights` and calculates the maximum volume
// of rainwater that can be harvested between any two barriers.

// The array `heights` represents the height of each barrier,
// where `heights[i]` is the height of the i-th barrier.
// The distance between each barrier is uniform.

// The input array will contain at least 2 values.

// Example:
// Input: [1, 2, 1]
// Output: 2
// Explanation: The distance between the first and
// third barrier is 2, and the height is 1, so
// the maximum amount of rainfall is 2 * 1 = 2

//   |    =>    |
// |_|_|      |*|*|

// Example:
// Input: [2, 3, 4, 2]
// Output: 6
// Explanation: The distance between the first and
// fourth barrier is 3, and the height is 2, so the
// maximum amount of rainfall is 3 * 2 = 6

//     |            |
//   | |    =>    | |
// | | | |      |*|*|*|
// |_|_|_|      |*|*|*|

/* note that the water would start to spill over the edges of the first and last
* barriers before that additional unit would fill up. */

/* spicy! I love it.
* P: given a list of barrier heights, return the max rainwater that can be caught
* between any two barriers.
* input: array of unordered integers
* output: integer
* E: BAE. lots of least-common height calculations across distances. fun problem.
* D: two pointers, anchor runner!
* A:
* anchor = 0
* runner = 1
* greatest = 0
* while anchor is still calculating distances and volumes, meaning
* while anchor less than length - 1
*   while runner's value is greater than or equal to anchor's
*     anchor's val * (runner - anchor) (which is distance) --> (calculate volume)
*     if volume is > greatest volume, replace
*     increment runner
*   increment anchor
*   reset runner to anchor + 1;
* return greatest volume;
*
* Ah! spicy. I only solved for the cases in which the outer two! ach.
* Then I got all the cases to work, but with a double loop anchor runner.
* */
function maxRainwaterFD(heights) {
  if (heights.length < 2) return 0;
  let anchor = 0;
  let runner = 1;
  let greatest = 0;

  while (anchor < heights.length - 1) {
    while (runner < heights.length) {
      let volume = Math.min(heights[anchor], heights[runner]) * (runner - anchor)
      if (volume > greatest) {
        greatest = volume;
      }
      runner++;
    }
    anchor++;
    runner = anchor + 1;
  }
  console.log(greatest)
  return greatest;
}

/*
* Totally different approach. two pointers, but now left and right.
* the volume is the min of the two pointers' values * the distance between them.
* advance the one that is smaller.
* that is my intuition though I haven't identified exactly why
* A:
* let left and right
* while left < right
*   store greatest with ternary if greater than current greatest
*   advance the smaller of the two towards the middle
* return greatest
* */

function maxRainwater(heights) {
  if (heights.length < 2) return 0;
  let left = 0;
  let right = heights.length - 1;
  let greatest = 0;

  while (left < right) {
    let volume = Math.min(heights[left], heights[right]) * (right - left);
    greatest = volume > greatest ? volume : greatest;
    if (heights[left] < heights[right]) {
      left++;
    } else {
      right--;
    }
  }
  return greatest;
}

console.log(maxRainwater([1, 1]) === 1);
console.log(maxRainwater([1, 3]) === 1);
console.log(maxRainwater([1, 2, 1]) === 2);
console.log(maxRainwater([2, 3, 4, 2]) === 6);
console.log(maxRainwater([2, 2, 2, 2, 2]) === 8);
console.log(maxRainwater([2, 9, 5, 10, 5, 6]) === 24);
console.log(maxRainwater([5, 4, 3, 2, 9, 10, 3, 4, 5]) === 40);
console.log(maxRainwater([3, 1, 2, 5, 2, 4, 2, 5, 6, 1, 5, 3, 2, 3, 4, 1, 2]) === 44);
console.log(maxRainwater([2, 2, 13, 9, 1, 15, 2, 5, 9, 7, 5, 3, 6, 3, 4, 1, 4, 5]) === 75);

// All test cases should log true

// got a working solution at 27 min. but it's probably not that efficient...