// Write a function `findPeakInTerrain` that finds any peak in a
// given hilly terrain. A peak is an element that is strictly
// greater than its neighbors. The first and last elements can
// be peaks if they are strictly greater than their single neighbor.
// Adjacent elements in the terrain cannot be equal.

// The function should take an array of integers as input,
// representing the elevations of spots in the terrain.
// It should return the index of any peak in the terrain.
// There is guaranteed to be at least one peak in the input array.

// Example:
// Input: terrain = [1, 3, 2, 1, 4, 5]
// Output: 1 or 5
// Explanation: Both index 1 (elevation 3) and index 5
//              (elevation 5) are peaks.

/* P: given an array of integers of size >= 3, return one (of at least one) peaks,
* where a peak is:
*   an integer that is strictly greater than both its neighbors OR
*   and integer at the beginning or end of the array that is > its one neighbor.
* E: a peak can occur anywhere in the middle, or at the ends
* I didn't realize until AI hinted that adj values are never equal! That's not
* stated explicitly in the problem.
*
* MM: there is a way to solve this that is simply a runner, but I guess that's a brute force approach
*
* D: I'm not sure I would have known Binary had it not been in this section
* Note that because I can return ANY peak, that early exit strategy hints at Binary.
*
* A:
* regular binary template
* left = 0, right = length -1
* if terrain[left] is greater than the next element, return left
* if last element greater than penultimate, return right
* [I don't know if the early returns are optimal, but they'll work.]
* while left <= right
*   let mid = math.floor((right + left) /2)
*   if adjacent elements are both less than mid,
*     return mid
*   if el to the left of mid > mid
*     move search left (go up the hill, lol)
*     right = mid -1
*   if element to the left of mid < mid
*     move search right
*     left = mid + 1
* These only deal with peaks in the middle, but not the peaks at the end...
* early return for those?
* */

function findPeakInTerrain(terrain) {
  let left = 0;
  if (terrain[left] > terrain[left + 1]) return left;
  let right = terrain.length - 1;
  if (terrain[right] > terrain[right - 1]) return right;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (terrain[mid - 1] < terrain[mid] && terrain[mid] > terrain[mid+1]) {
      return mid;
    } else if (terrain[mid - 1] > terrain[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
}

/* Ok! 22 min, completely done, no refactoring, just straight trues. which feels
* great. The thing to really change is that I am not testing during the middle
* of the writing. So this time, I wrote the whole thing, then tested. I think I usually do that.
* Here, it's a bit hard to test, I guess I could just make sure the template is
* working by removing the condition in the `if`? I dunno, it's not super easy to test.
* I'll keep looking for other ways on future problems.

* The AI draft is less clear to me, though way shorter
* */
function findPeakInTerrainAISolution(terrain) {
  const n = terrain.length;
  if (n === 0) throw new Error("terrain must have at least 1 element");
  if (n === 1) return 0;

  let left = 0;
  let right = n - 1;

  // We loop until left == right; that index must be a peak.
  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    // If mid is higher than its right neighbor,
    // the peak is in [left, mid]. Otherwise, it's in [mid+1, right].
    if (terrain[mid] > terrain[mid + 1]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  // At this point left == right, and that index is guaranteed to be a peak.
  return left;
}


console.log(findPeakInTerrain([1, 2, 1]) === 1);
console.log(findPeakInTerrain([1, 3, 4, 1]) === 2);
console.log(findPeakInTerrain([3, 2, 1]) === 0);
console.log(findPeakInTerrain([1, 2, 3]) === 2);
console.log([1, 4].includes(findPeakInTerrain([1, 3, 2, 1, 5, 4])));
console.log(findPeakInTerrain([1, 2, 3, 4, 5, 7, 3]) === 5);
console.log(findPeakInTerrain([1, 2, 3, 4, 3, 2, 1]) === 3);
console.log([0, 8].includes(findPeakInTerrain([5, 4, 3, 2, 1, 2, 3, 4, 5])));
console.log(findPeakInTerrain([1, 2, 3, 4, 5, 4, 3, 2, 1]) === 4);
console.log(findPeakInTerrain([10, 9, 8, 7, 6, 5, 4, 3, 2, 1]) === 0);
console.log(findPeakInTerrain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) === 9);

// All test cases should log true