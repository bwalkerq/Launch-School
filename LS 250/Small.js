/*
* P: given a string sentence, return the sentence with the words in the same location,
* but the words reversed.
* E: BAE
* D: two pointers, working on modifying the string
* A: writer/reader
* start the writer at 0, reader starts at 0 and goes until it finds a space, x
* so from zero to x-1 (the last letter of the word location) reverse the letters.
* writer and reader change letters, then move towards one another until they cross
* each other or until they reach the same value
* then they move on to the next word, and repeat the process
* more formally:
* writer = 0
* reader = 1
* lastSpace = undefined
* while the writer is less than the length
*   if reader value is " " or reader === length
*     lastSpace = reader
*     decrement reader (to get back to the last letter)
*     while writer < reader
*       writer, reader = reader, writer
*       increment writer
*       decrement reader
*   writer = reader = lastSpace plus 1
* return the string
* */

// console.log(reverseWords("Hello World") === "olleH dlroW");
// console.log(reverseWords("JavaScript is fun") === "tpircSavaJ si nuf");
// console.log(reverseWords("Coding in the sun") === "gnidoC ni eht nus");
// console.log(reverseWords("Launch School") === "hcnuaL loohcS");

function reverseWordsFirstDraft(str) {
  let writer = 0;
  let reader = 1;
  let lastSpace = undefined;
  let chars = str.split('')

  while (writer < chars.length) {
    if (chars[reader] === ' ' || reader === chars.length) {
      lastSpace = reader;
      reader--;
      while (writer < reader) {
        [chars[writer], chars[reader]] = [chars[reader], chars[writer]];
        writer++;
        reader--;
      }
    writer = reader = lastSpace + 1;
    }
    reader++;
  }
  return chars.join('');
}

/* My solution is fine, though my initial thought to create a helper is what they did!
* I thought for sure that would be cheating, or avoiding the point, but alas.
* Here's their solution, which benefits from splitting on the spaces, and map, and join. */

function reverseWords(string) {
  return string.split(' ').map(reverseWord).join(' ');
}

function reverseWord(str) {
  let start = 0;
  let end = str.length;
  let chars = str.split('');

  while (start < end) {
    [chars[start], chars[end]] = [chars[end], chars[start]];
    start++;
    end--;
  }

  return chars.join('');
}

// console.log(findAverages([1, 2, 3, 4, 5, 6], 3)); // [ 2, 3, 4, 5 ]
// console.log(findAverages([1, 2, 3, 4, 5], 2));    // [1.5, 2.5, 3.5, 4.5]
// console.log(findAverages([10, 20, 30, 40, 50], 4)); // [ 25, 35 ]
// console.log(findAverages([5, 5, 5, 5, 5], 1));      // [ 5, 5, 5, 5, 5 ]
// console.log(findAverages([1, 3, 2, 6, -1, 4, 1, 8, 2], 5)); // [2.2, 2.8, 2.4, 3.6, 2.8]

/* P: given an array of integers, and k an integer, return an array filled with
* the average value of each subarray of size k.
* E: BAE
* D: two pointers, anchor runner, where anchor represents the start of each subarray
* A:
* anchor at 0
* runner at 0
* array to hold averages
* while anchor <= length - k
*   set runner to anchor position
*   for k times:
*     runner starts at anchor, add value to sum
*     runner increments
*   push average to the averages array
*   increment anchor
* return the averages array
*  */

function findAverages(arr, k) {
  let anchor = 0;
  let runner = 0;
  const averages = [];

  while (anchor <= arr.length - k) {
    runner = anchor;
    let sum = 0;
    for (let i = 0; i < k; i++) {
      sum += arr[runner];
      runner++;
    }
    averages.push(sum / k)
    anchor++;
  }
  return averages;
}

// my solution works. The mini (AI) solution is crazy, and very efficient.
// it makes the averages array the right size to avoid the repeated push expansion
/* but the thing that both mini and LSbot suggest is to remove the for loop in the middle
* because it's not as efficient is calculating a window, and then sliding the window
* one space, and adding the new value and subtracting the old value. changes from n*k to just n
* complexity. So that's cool
* here's an example:
* // Start with calculating the sum of the first window
let windowSum = 0;
for (let i = 0; i < k; i++) {
  windowSum += arr[i];
}
averages.push(windowSum / k);

// For subsequent windows, adjust the sum by removing the element leaving the window
// and adding the element entering the window
for (let i = 1; i <= arr.length - k; i++) {
  windowSum = windowSum - arr[i - 1] + arr[i + k - 1];
  averages.push(windowSum / k);
}
* */

// the mini solution:
// function findAverages(arr, k) {
//   const n = arr.length;
//   if (k > n || k <= 0) return [];      // edge‐cases
//
//   const averages = new Array(n - k + 1);
//   let windowSum = 0;
//
//   // 1) Sum up the first k elements
//   for (let i = 0; i < k; i++) {
//     windowSum += arr[i];
//   }
//   averages[0] = windowSum / k;
//
//   // 2) Slide the window: remove arr[i-k], add arr[i]
//   for (let i = k; i < n; i++) {
//     windowSum += arr[i]     // add the new right element
//                - arr[i - k]; // remove the old left element
//     averages[i - k + 1] = windowSum / k;
//   }
//
//   return averages;
// }



// console.log(twoSumLessThanTarget([3, 1, 4], 5) === 4);
// console.log(twoSumLessThanTarget([8, 2, 4, 9, 5, 10, 1, 7], 16) === 15);
// console.log(twoSumLessThanTarget([5, 8, 3, 2, 1], 6) === 5);
// console.log(twoSumLessThanTarget([6, 8, 10, 12], 5) === -1);
// console.log(twoSumLessThanTarget([1, 2, 3, 4, 5], 100) === 9);
// console.log(twoSumLessThanTarget([10, 20, 30, 40, 50], 40) === 30);
// console.log(twoSumLessThanTarget([7, 4, 15, 11, 21, 9], 24) === 22);
// All test cases should log true

/* P: given an array of numbers and a target, return the sum of two distinct
* numbers from the array that is less than the target.
* the two numbers can be from anywhere in the array
* E: BAE
* D: two pointers, anchor runner
* A:
* anchor at 0
* runner at 1
* returnSum = -1
* runner iterate to each spot through the end of the array
*   if the sum is higher than returnSum and less than the target
*     replace returnSum
*   increment anchor
*   runner to anchor + 1, redo iteration
* return returnSum */

function twoSumLessThanTargetFirstDraft(nums, target) {
  let anchor = 0;
  let highestSum = -1;

  while (anchor < nums.length) {
    for (let runner = anchor + 1; runner < nums.length; runner++) {
      const currentSum = nums[anchor] + nums[runner]
      if (currentSum > highestSum && currentSum < target) {
        highestSum = currentSum;
      }
    }
    anchor++;
  }

  return highestSum;
}

/*works fine, improve by sorting first and then have the two pointers move toward one another
* then the time complexity isn't n^2, but nlogn.
* also add an early exit for hitting target - 1, which is the highest possible
* return value.
* sort the array
* while left is less than right
*   if the sum is k-1, return
*   if the sum is greater than best, and less than target
*     replace best
*     increment left
*   else
*     decrement right
* */

function twoSumLessThanTarget(nums, target) {
  nums = nums.sort((a,b) => a - b)
  let left = 0;
  let right = nums.length - 1;
  let best = -1;

  while (left < right) {
    const currentSum = nums[left] + nums[right];
    if (currentSum === target -1) return currentSum;

    if (currentSum > best && currentSum < target) {
      best = currentSum;
      left++;
    } else {
      right--;
    }
  }
  return best;
}

// Treats!
/* P: given two number arrays, an appetite array and a treats array, how many treats do I have that are
* at least as big as the appetite? Return the number of times (satisfied pets, lol)
* E: BAE - the location of the treat/pet in the array doesn't matter
* [2, 3, 4], [2, 3, 3]
* [2, 3, 4], [1, 2, 3]
* D: sort the arrays
* two pointers, one in each array
* A:
* sort the arrays
* start pet and treat at their respective 0's
* let matched counter = 0
*
* while pet < length AND treat < length
* if the pet <= treat
*   matched ++
*   increment both
* else if pet > treat
*   increment treat
*
* */

function assignTreatsFirstDraft(pets, treats) {
  pets = pets.sort((a,b) => a - b);
  treats = treats.sort((a,b) => a - b);
  let count = 0;
  let petPointer = 0;
  let treatPointer = 0;

  while (petPointer < pets.length && treatPointer < treats.length) {
    if (pets[petPointer] <= treats[treatPointer]) {
      count++;
      petPointer++;
      treatPointer++;
    } else {
      treatPointer++;
    }
  }
  return count;
}

/* my solution was solid, minimal feedback from LS. AI suggested that I write 
* something more ideomatic, which is great.
* only need i instead of petpointer
* use a for loop */

function assignTreats(pets, treats) {
  pets = pets.sort((a,b) => a - b);
  treats = treats.sort((a,b) => a - b);
  let count = 0;
  let i = 0;

  for (const treat of treats) {
    if (i >= pets.length) break;
    if (pets[i] <= treat) {
      count++;
      i++;
    }
  }

  return count;
}

// console.log(assignTreats([3, 4, 2], [1, 2, 3]) === 2);
// console.log(assignTreats([1, 5], [5, 5, 6]) === 2);
// console.log(assignTreats([1, 2, 3], [3]) === 1);
// console.log(assignTreats([2], [1, 2, 1, 1]) === 1);
// console.log(assignTreats([4, 3, 1], [2, 1, 3]) === 2);
// console.log(assignTreats([1,2,3], [1,2,3]) === 3);
// console.log(assignTreats([4, 5, 6], [1,2,3]) === 0);
// All test cases should log true.


// Count Pairs
/* P: given a sorted array of numbers and a target, return the
* count of pairs whose sum exceeds the target
* input: sorted array of numbers, target integer
* output: an integer, the count of pairs whose sum exceeds the target
* note that I think this will be n^2 time.
* E: BAE
* but will there ever be duplicate entries? that would be more spicy...
* D: two pointers, two loops, have to loop through all the remaining
* anchor runner
* A:
* optional create a Set of the input array so no duplicate counts
* for i loop through the length...
*   for j from i+1 to end...
*     if i+j is greater than target
*       increment count
*
* return count
* */

function countPairsFirstDraft(nums, target) {
  let distinctNums = [...new Set(nums)]
  let count = 0;

  for (let i = 0; i < distinctNums.length; i++) {
    for (let j = i + 1; j < distinctNums.length; j++) {
      if (distinctNums[i] + distinctNums[j] > target) {
        count++;
      }
    }
  }
return count;
}
// remember that Sets use SIZE not length; length is for Arrays!

// console.log(countPairs([1, 2, 3, 4, 5], 6) === 4);
// // Pairs: (2, 5), (3, 4), (3, 5), (4, 5)
//
// console.log(countPairs([1, 2, 3, 4, 5], 8) === 1);
// // Pair: (4, 5)
//
// console.log(countPairs([1, 3, 5, 7], 6) === 4);
// // Pairs: (1, 7), (3, 5), (3, 7), (5, 7)
//
// console.log(countPairs([1, 2, 3, 4], 5) === 2);
// // Pairs: (2, 4), (3, 4)
//
// console.log(countPairs([1, 2, 3, 4, 5], 10) === 0);
// // No pairs

/* 16 min, but would have been much faster, sub 10, had I not chosen to solve
* a harder problem, that when duplicate entries are introduced to the input array.
*
* The take away for that is that a Set does remove duplicates, but then has
* totally different methods than arrays, e.g. has() and size() and it DOESN'T have map(),
* filter(), length(), or even indexing.
*
* a common way to remove the duplicates and then get an array again (for convenience
* is to spread
* const noDuplicates = [...new Set(arrayWithDuplicates)];
*

* Dang! Not that effecient. I thought for sure it would need n^2 time, but there's
* a two pointer way that doesn't have the two iterations. I'll try first:
*
* A:
* start left and right in the array
* while the left is < right
*   if left + right > target
*     increment count
*     decrememnt right
*   else if left + right <= target
*     increment left
 */

function countPairs(nums, target) {
  let distinctNums = [...new Set(nums)]
  let count = 0;
  let left = 0;
  let right = distinctNums.length - 1;

  while (left < right) {
    if (distinctNums[left] + distinctNums[right] > target) {
      count += right - left;  // this optimization totally eluded me
      right--;
    } else {
      left++;
    }
  }

  return count;
}

/* This is faster big O. O(N)
* but it's extra spicy that every time we increment the count, we do it by
* right - left because once two numbers make a sum that exceeds the target, we
* know that every other number to the right of the left pointer will make a sum
* with the right pointer that is also larger. so we can add right (the number of
* elements to the left of the right pointer) - left (the number of elements that
* are smaller that the left pointer) which represents the number of elements
* that are larger than the left pointer and therefor big enough to make a big-enough
* sum to increment the counter. Dang! */


/* P: given an array of numbers, return true if a number is 3x another number
* in the array, else return false
* in: ordered array of numbers
* out: boolean, true if a number is 3x another number
*
* E: BAE.
* the spicy bit is that my normal left and right can't work without doubling back.
* if the right is more than 3x left, tempted to move right back or left forward, but
* in both cases we could overstep a potential match
* so maybe we have to check the two on the left before decrementing the right?
* [4, 5, 7, 9, 13, 15, 17]
* 4*3 is less than 17 and 15
* decrement right
* 4*3
* ok nevermind! I took the hint, it's anchor runner!
*
* D: two pointers, anchor runner
* A:
* anchor = 0
* runner = 1
* while anchor < length
*   if 3xanchor === runner, return true!
*   else if 3xanchor > runner
*     increment runner
*   else (meaning 3xanchor < runner)
*     increment anchor
*     runner = anchor + 1
* return false
* */

function checkTripleMatchFirstDraft(nums) {
  let anchor = 0;
  let runner = 1;

  while (anchor < nums.length) { // this would need length - 1 since anchor shouldn't go past the second to last spot
    const target = 3 * nums[anchor];
    const current = nums[runner];
    if (target === current) return true;
    if (target > current) {
      runner++;
    } else {
      anchor++;
      runner = anchor + 1;  // turns out this is unnecessary
    }
  }
  return false;
}

/* 21 min
* I struggled with my mind stuck on start end pointers for many minutes, but
* then I took the hint and tried anchor runner. I got it pretty fast.
* BUT I got a solution that is suboptimal. I looked at the second hint, and have
* to think more about this...
* it said: consider the moment when the runner stop moving; from that point onwards
* determine how long the anchor continues to move.
* [4, 5, 7, 9, 13, 15, 17]
* so, move the runner till it's greater than 3xanchor
* then move the anchor until 3xanchor is greater than the runner
* A:
* same anchor runner starting positions
* while anchor < length
*   same early return if current == target
*   if target > current
*     increment runner
*   else
*     increment anchor
* */
function checkTripleMatch(nums) {
  let anchor = 0;
  let runner = 1;

  while (runner < nums.length) {

    const target = 3 * nums[anchor];
    const current = nums[runner];
    if (target === current) return true;
    if (target > current) {
      runner++;
    } else {
      anchor++;
    }
  }
  return false;
}

console.log(checkTripleMatch([1, 3, 9, 28]) === true);
console.log(checkTripleMatch([1, 2, 4, 10, 11, 12]) === true);
console.log(checkTripleMatch([0, 5, 7, 55]) === false);
console.log(checkTripleMatch([4, 5, 7, 9, 13, 15, 17]) === true);
console.log(checkTripleMatch([2, 6, 13, 54]) === true);
console.log(checkTripleMatch([1, 5, 17, 51]) === true);
console.log(checkTripleMatch([1, 2, 4, 8]) === false);

// All test cases should log true.























































