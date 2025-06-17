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


console.log(assignTreats([3, 4, 2], [1, 2, 3]) === 2);
console.log(assignTreats([1, 5], [5, 5, 6]) === 2);
console.log(assignTreats([1, 2, 3], [3]) === 1);
console.log(assignTreats([2], [1, 2, 1, 1]) === 1);
console.log(assignTreats([4, 3, 1], [2, 1, 3]) === 2);
console.log(assignTreats([1,2,3], [1,2,3]) === 3);
console.log(assignTreats([4, 5, 6], [1,2,3]) === 0);

// All test cases should log true.




























































