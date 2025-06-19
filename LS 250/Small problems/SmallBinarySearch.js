/* P: given an array of lowercase letters in ascending order, and a key, find
* the smallest letter that is greater than the target
* hoping that < works on letters!
* E: BAE
* D: well, binary search!
* A:
* binary template:
* actually! let the target be one letter to the right?
* no, let's target the letter itself, because I'd need the whole alphabet to tick through...
* while left < right
*   find mid
*   if mid === target
*     check mid + 1, if > than target, return mid + 1
*   if mid is less than the target, move right
*     left = mid + 1
*     mid = math floor right - left
*   else if mid greater than
*     check immediately left, if target,
*       then return mid
*     move left, so right = mid - 1
*
*
* */

function findNextLetterFD(array, target) {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (array[mid] === target) {
      if (mid === array.length - 1) return array[0];
      if (array[mid + 1] > target) return array[mid + 1];
    } else if (array[mid] < target) {
      left = mid + 1;
    } else {
      // if (array[mid - 1] === target) return array[mid];
      right = mid - 1;
    }
  }
  return array[left];
//
// // Most often, if the target is not found, additional handling
// // or returning a specific value is needed. In many cases it will
// // be the index that `left` variable holds, which would indicate
// // where the target *would* fit into the array.

}

// console.log(findNextLetter(['b', 'd', 'f'], 'a') === 'b');
// console.log(findNextLetter(['b', 'd', 'f'], 'c') === 'd');
// console.log(findNextLetter(['b', 'd', 'f'], 'f') === 'b');
// console.log(findNextLetter(['a', 'a', 'b', 'c'], 'a') === 'b');
// console.log(findNextLetter(['c', 'f', 'j'], 'c') === 'f');
// console.log(findNextLetter(['a', 'c', 'f', 'h', 'i', 'j'], 'g') === 'h');
// All test cases should log true.

/* This took probably 25 to 30 minutes. The hint said to use the template, which
* makes me hope that they'd offer it in the test, but prob not.
* I came up with most of it on my own, the thing to remember is equal, then less, than greater
* and that if the target isn't found, the variable that the left index holds
* represents where the target WOULD fit into the array.
* AI had some great tweaks.
* */


function findNextLetter(array, target) {
  let left = 0;
  let right = array.length - 1;
  let result = array[0];

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (array[mid] > target) {
      result = array[mid];
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return result;
}


/* P: given a 3X3 matrix, which is sorted, determine if a given target exists in the matrix
* The solution should be )(logM*N), which means.... nested binary search?
* E: BAE, always 3x3
* in order to utilize binary search, we need to check the middle number middle array
* then the corresponding middle number in the other array, and so on.
* D: binary search, but somehow twice but not nested? this is where my math background is maybe muddying
* the waters for me.
* A:
* helper function to binary search an array
* check the middle array, if not found, then check either the left or the right
* so the helper returns the value at the left index, and if that is > target, check the 1st array
* else
*   check the third array...
*
* */


/* After 30 minutes and still no solution, I looked at the hint, which says
* I can perform two binary searches (which I knew), one to find the correct subarray,
* and one to search that subarray. I thought I was doing that...
*
* ok, check the first and last of each subarray as the term to check.
*
* start with left and right, like normal binary search
* if the mid's first term is <= target AND last term >= target,
*   return/break and this is our target subarray
* else if first term > target, move search to the left
*   right = mid -1
* else if last term is < target, move search to the right
*   left = mid + 1
* else return false (meaning the value doesn't exist in the given subs)
*
* Then search the subarray with regular binary search
* return binary search
*    */

// console.log(findInNestedArray([[4, 8, 12], [16, 20, 24], [28, 32, 36]], 20) === true);
// console.log(findInNestedArray([[3, 6, 9], [12, 15, 18], [21, 24, 27]], 27) === true);
// console.log(findInNestedArray([[1, 3, 5], [7, 9, 11], [13, 15, 17]], 19) === false);
// console.log(findInNestedArray([[10, 20, 30], [40, 50, 60], [70, 80, 90]], 10) === true);
// console.log(findInNestedArray([[15, 25, 35], [45, 55, 65], [75, 85, 95]], 5) === false);
// All test cases should return true.

function findInNestedArray(matrix, target) {
  let left = 0;
  let right = matrix.length - 1;
  let targetMatrix = false;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let currentMatrix = matrix[mid];

    if (currentMatrix[0] <= target &&
      currentMatrix[currentMatrix.length - 1] >= target) {
      targetMatrix = currentMatrix
      break
    } else if (currentMatrix[0] > target) {
      right = mid - 1;
    } else if (currentMatrix[currentMatrix.length - 1] < target) {
      left = mid + 1;
    }
  }
  return targetMatrix ? binarySearch(targetMatrix, target): false;
}

function binarySearch(array, target) {
  let left = 0;
  let right = array.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (array[mid] === target) {
      return true;
    } else if (array[mid] < target) {  // move the search right
      left = mid + 1;
    } else {                        // move left
      right = mid - 1;
    }
  }
  return false;
}

/* SHIT. Just to get this to work, it took me 64 total minutes. BURN.
* not very regulated right now!
* WTF */

/* 2 hours later, I check my solution with LS's and honestly they're very similar.
* That was just a hard problem. AI had a crazy solution as well, so I'm not
* redrafting this one. */

/* P: given an array of numbers in asc order, determine if a target occurs 4 or more times
output a boolean
E: BAE. occurring 3 times is not sufficient.
I think we did a problem like this where we stored the left occurrence and the right occurrence
D: since we're searching for a distinct term in a sorted list, we're going to go with binary search
A:
find the left index and right index separately

find left most
besides the normal template, create a left-most variable to hold the position
in the case where the target doesn't occur, we'd want to return -1
if we find the target,
  store it as left most
  shift left, right = mid - 1
if mid < target
  shift right, left = mid + 1
if mid > target
  shift left, right = mid - 1

return left most index

similarly, for rightmost
if we find the target
  store rightmost
  shift right
if mid < target
  shift right
if mid > target
  shift left
return the right most
THEN
return rightmost - leftmost >= 4
* */
function isTargetFrequentFD(array, target) {
  const leftMost = findLeftMostFD(array, target);
  if (leftMost < 0) return false;
  const rightMost = findRightMost(array, target);
  return rightMost - leftMost + 1 >= 4; // plus one because subtracting indices
  // represents one less than the number of occurrences
}

function findLeftMostFD(array, target) {
  let left = 0;
  let right = array.length - 1;
  let leftMost = -1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (array[mid] === target) {
      leftMost = mid;
      right = mid - 1;
    } else if (array[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return leftMost;
}

function findRightMost(array, target) {
  let left = 0;
  let right = array.length - 1;
  let rightMost = -1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (array[mid] === target) {
      rightMost = mid;
      left = mid + 1;
    } else if (array[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return rightMost;
}

// console.log(isTargetFrequent([1, 2, 3, 3, 3, 3, 4], 3) === true);
// console.log(isTargetFrequent([1, 1, 1, 1, 2, 3, 4], 1) === true);
// console.log(isTargetFrequent([1, 2, 3, 4, 5], 2) === false );
// console.log(isTargetFrequent([1, 1, 3, 4, 5], 2) === false );
// console.log(isTargetFrequent([2, 2, 2, 3, 3, 3, 4], 3) === false);
// console.log(isTargetFrequent([4, 4, 4, 4, 4, 4, 4], 4) === true);
// All test cases should log true.

/* the mini solution was siiiick; first off, it generalized the leftmost/rightmost
* by adding a parameter for find leftmost, and then a tiny iff statement which
* is really the only difference between the two functions. THEN in the main function
* it approaches finding the leftmost, and then employing a `threshold` idea, where
* threshhold is 4 if it needs to occur at least 4 times. And then once it finds
* the leftmost occurance, it checks if there's enough room in the array for it
* to have the required occurrences, and then it just checks if that index (in this
* case, 3 indices away from the first occurrence) is the target, and if so returns
* true, because if that fourth spot is the target, and the array is sorted, then
* there has to be 4 occurrences. damn son, Smooth operator
* */

function isTargetFrequent(array, target, threshold = 4) {
  const leftMost = binaryFindBookend(array, target);
  if (leftMost < 0) return false;

  // check if there's enough room in the array for threshold occurrences
  if (leftMost + threshold > array.length) return false

  return array[leftMost + threshold - 1] === target;
}

// finds the leftmost occurrence by default, or finds the rightMost if boolean param is false
function binaryFindBookend(array, target, findLeftMost = true) {
  let left = 0;
  let right = array.length - 1;
  let bookend = -1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (array[mid] === target) {
      bookend = mid;
      if (findLeftMost) {
        right = mid - 1;
      } else {
        left = mid + 1
      }
    } else if (array[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return bookend;
}

/* Square root problem!
* P: given an integer, return true if it's a perfect square, else false
* don't use built in Math root stuff (i.e. use binary search?)
* E: so basic.
* D: I would only think Binary because it's in the problem set
* MM: let's think about factors, since that's what makes squares unique and interesting
* for 9: 1,3,9
* 16: 1,16,2,8,4
* so there's always an odd number of factors
* A:
* so maybe, chopping in half repeatedly. since that's what binary is
* start with the middle of the space between 1 and n
* right = n
* mid = right/2
* if mid * mid === n
*   return true
* else if mid * mid < n
*   move right, so left = mid
* else
*   move search left, so here, right = mid
*
* return false
* */

function isSquareInteger(n) {
  let left = 0;
  let right = n;

  while (left <= right) {
    let mid = Math.floor((right + left) /2)

    if ((mid * mid) === n) {
      return true;
    } else if ((mid * mid) < n) {
      left = mid + 1;
    } else {
      right = mid - 1
    }
  }
  return false;
}

console.log(isSquareInteger(1) === true);
console.log(isSquareInteger(4) === true);
console.log(isSquareInteger(16) === true);
console.log(isSquareInteger(14) === false);
console.log(isSquareInteger(25) === true);
console.log(isSquareInteger(26) === false);

// All test cases should log true.

/* 20 min, but 7 were just thinking!
* no notes on my solution.
* The take away is that we don't NEED a collection, but rather, a range of
* numbers in order to do the binary search*/


















































