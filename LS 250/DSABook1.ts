// Given a list of numbers,
// find two numbers in the list that add up to ten
// and return them. If no such pair exists, return null.

// It is guaranteed that there is either exactly one pair of numbers
// that satisfies the condition, or no pairs at all.

// Test Cases:

/*
* P: find two numbers that sum to 10 and return them
* input: array of numbers
* out: array of the pair, or null
* E: behave as expected
*
* mm: go through each number, and sum with each other (sliding window?)
* if the sum is 10, return the two in an array.
*
* D: just arrays with iteration
* A:
* for each number with it's index
*   take the subarray of everything after it, and for each element
*       sum with the
*
*
* */

// function findPair(arr: number[]):number[] | null {
//     let output:number[] | null;
//     arr.forEach((el, index, array) => {
//         const arr2 = array.slice(index + 1)
//         arr2.forEach(otherEl => {
//             if (el + otherEl === 10) {
//                 output = [el, otherEl];
//             }
//         })
//     })
//
//     return output ? output : null;
// }

// console.log(findPair([2, 3, 9, 7])); // Output: [3, 7]
// console.log(findPair([10, 6, -1, 2])); // null
// console.log(findPair([1, 2, 5, 6])); // null
// console.log(findPair([1, 3, 6, 10, 4, 5])); // [6, 4]
// console.log(findPair([4, -5, 3, 15, 5])); // [-5, 15]


function test(n) {
    let matrix = [];
    for (let i = 0; i < n; i++) {
        matrix[i] = [];
        for (let j = 0; j < n; j++) {
            matrix[i][j] = i + j;
        }
    }
    return matrix;
}

// console.log(test(6))


// Finding a Majority Element
// Given an array of numbers, return its majority element.

// The majority element is the value in the array that appears
// as at least half of the elements in the array.

// It is guaranteed that only one majority element exists in the array.

// Test Cases:

// console.log(findMajority([6, 4, 4, 6, 4]) === 4);
// console.log(findMajority([4, 5, 2, 5, 5, 5, 1]) === 5);
// console.log(findMajority([1, 2, 1, 2, 2, 1, 2]) === 2);
// console.log(findMajority([1, 2, 3, 1, 4, 4, 1, 1]) === 1);
// console.log(findMajority([5, 5, 5]) === 5);

// All test cases should log true

/*P: given an array of numbers, return the one that appears the most often
* in: array of numbers, not ordered
* out: the number that occurs most frequently
* E: BAE
* D: array iteration
* A:
* tally, then count and return
* for each element
*   if it exists in the object, tally up, if not create it set count to 1
*
* Then, for each key find the highest value
* return the key that has the highest value
*
* */
interface CountObj {
    [key: number]: number
}

function findMajorityInitialSolution(arr: number[]): number {
    let countsObj: CountObj = arr.reduce((obj, cv) => { // cv stands for current value
        obj[cv] = obj[cv] || 0;
        obj[cv] += 1;
        return obj;
    }, {} as CountObj); // note this starting object

    let highest = 0;
    let majorityKey: number | null = null

    for (let countsObjKey in countsObj) {
        const cv: number = countsObj[countsObjKey];
        if (cv > highest) {
            highest = cv;
            majorityKey = Number(countsObjKey);
        }
    }

    return majorityKey
}
// TC: N+N? so just N? SC: N for the object.
// My solution has a linear time complexity, just like their solution. But their solution uses Map() and it's niiiice.

function findMajority(arr: number[]): number | null {
    let counts = new Map<number, number>();
    let majorityCount = Math.ceil(arr.length / 2);

    for (const number of arr) {
        if (counts.has(number)) {
            counts.set(number, counts.get(number) + 1 )
        } else {
            counts.set(number, 1)
        }

        if (counts.get(number) >= majorityCount) {
            return number;
        }
    }
    return null;
}

// overall a much better, clearer solution.


// start-end pointers
function findPair(nums: number[], target: number): [number, number] | null {
    let start = 0;
    let end = nums.length - 1;

    while (start < end) {
        let a = nums[start];
        let b = nums[end];

        if (a + b === target) {
            return [a, b]
        } else if (a + b < target) {
            start++
        } else {
            end--;
        }
    }
}

// Test cases
// const nums1 = [1, 3, 6, 7, 8, 12];
// const target1 = 14;
// console.log(findPair(nums1, target1)); // Output: [6, 8]
//
// const nums2 = [2, 6, 8, 10];
// const target2 = 17;
// console.log(findPair(nums2, target2)); // null


// Practice: Reverse Consonants
// Given a string `str`, reverse all the consonants in the string and return it.
// Consonants are all alphabetic characters except for the vowels `'a'`, `'e'`, `'i'`,
// `'o'`, and `'u'`, which can appear in both lower and upper cases.
// The consonants can appear more than once in the string.

// console.log(reverseConsonants("") === "");
// console.log(reverseConsonants("s") === "s");
// console.log(reverseConsonants("HELLO" ) === "LELHO");
// console.log(reverseConsonants("leetcode")  == "deectole");
// console.log(reverseConsonants("example")  == "elapmxe");
// console.log(reverseConsonants("Consonants")  == "sotnonasnC");

// All test cases should log true

/*P: given a string, reverse the order of the consonants only, while the vowels remain in place, and return the new string
* E: BAE
* D: pointers. start and end
* A:
* while the start and end have not met in the middle
*   if start is a consonant
*       if the end is a consonant
*           swap the letters
*           increment the start
*       else
*           decrement the end
*   else
*       increment the start
* */
function reverseConsonants(str: string): string {
    const arr = str.split('');
    const isConsonant = (char) => /[^aeiou]/i.test(char)
    let start = 0
    let end = str.length - 1;

    while (start < end) {
        while (!isConsonant(arr[start])) {
            start++;
        }
        while (!isConsonant(arr[end])) {
            end--;
        }
        [arr[start], arr[end]] = [arr[end], arr[start]];
        start++;
        end--;

        // if (arr[start].match(/[^aeiou]/i)) {
        //     if (arr[end].match(/[^aeiou]/i)) {
        //         let temp = arr[start];
        //         arr.splice(start, 1, str[end]);
        //         arr.splice(end, 1, temp);
        //         start++;
        //         end--
        //     } else {
        //         end--;
        //     }
        // } else {
        //     start++;
        // }
    }
    return arr.join('')
}

// the main thing I relearned was to use destructuring [a,b] = [b,a] for replacement, rather than splice, which is heavy.
// and to use .test rather than .match.
// test is called on a regex and takes a string, whereas .match does the converse.


// Practice: Compress to Distinct Elements
// Given a sorted array of integers, your task is to implement a function
// `compressToDistinct` that modifies the array in-place to ensure
// it starts with a sequence of distinct elements in their original order.
// After making these modifications, the function should return
// the count of these distinct elements.

// The elements in the latter part of the array, after the distinct ones, are not important.

// Example:

// If the input array is [3, 3, 5, 7, 7, 8], there are four distinct elements: 3, 5, 7, and 8.
// After modifying the array to place these distinct elements at the beginning,
// the resulting array should look like this -> [3, 5, 7, 8, _, _].
// The underscores (_) represent the elements that are no longer important.

// You should name the function `compressToDistinct` for the tests to work correctly.

function testCompressToDistinct(array, expectedLength) {
    const originalReference = array;
    const resultLength = compressToDistinct(array);
    const isSameObject = originalReference === array;
    const isLengthCorrect = resultLength === expectedLength;
    const isModifiedCorrectly = array.slice(0, expectedLength).every((val, idx, arr) => idx === 0 || val > arr[idx - 1]);

    // console.log(
    // isSameObject, isLengthCorrect, isModifiedCorrectly
    //
    // )
    return isSameObject && isLengthCorrect && isModifiedCorrectly;
}

console.log(testCompressToDistinct([3, 3, 5, 7, 7, 8], 4));
console.log(testCompressToDistinct([1, 1, 2, 2, 2, 3, 4, 4, 5], 5));
console.log(testCompressToDistinct([0], 1));
console.log(testCompressToDistinct([-5, -3, -3, -1, 0, 0, 0, 1], 5));
console.log(testCompressToDistinct([6, 6, 6, 6, 6, 6, 6], 1));

// All tests should log true.

/*P: given an array of numbers with repetitions, mutate the array to have the distinct elements first, and
* the other places filled in with whatever, and then return the number of distinct elements
* E: BAE
* D: pointer, reader-writer
* A:
* Writer starts at index 0, reader starts at index 0.
* while the reader is less than the length
*   if the reader reads a number that is in the distinct array
*     increment reader
*   else
*     write the reader's value to the writer position
*     push the reader value to the distinct arr
*     increment writer
*     increment reader
* return the distinct length
* */
function compressToDistinctFirstDraft(nums: number[]): number {
    let writer = 0;
    let reader = 0;
    const distinctArr: Array<number> = []
    while (reader < nums.length) {
        if (distinctArr.includes(nums[reader])){
            reader++;
        } else {
            nums[writer] = nums[reader];
            distinctArr.push(nums[reader]);
            reader++;
            writer++;
        }
    }

    return distinctArr.length
}
/* Learned to use a SET for quick lookups of uniqueness (not a separate distinct array with .includes, which has a long
lookup time (and also not a Map, which is for key value pairs, but similar vibe to Set))
* The set has very nice instance methods
In my case, I used a while loop but in every iteration I incremented the reader...which is what a for loop does!
* */
function compressToDistinct(nums:number[]): number {
    const seen = new Set();
    let writer = 0;

    for (let reader = 0; reader < nums.length; reader++) {
        if (!seen.has(nums[reader])) {
            seen.add(nums[reader]);
            nums[writer] = nums[reader];
            writer++;
        }
    }

    return seen.size
}






















