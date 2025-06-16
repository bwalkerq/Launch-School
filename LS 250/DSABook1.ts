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


// function test(n) {
//     let matrix = [];
//     for (let i = 0; i < n; i++) {
//         matrix[i] = [];
//         for (let j = 0; j < n; j++) {
//             matrix[i][j] = i + j;
//         }
//     }
//     return matrix;
// }

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

function findMajorityInitialSolution(arr: number[]): number | null {
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

// function findMajority(arr: number[]): number | null {
//     let counts = new Map<number, number>();
//     let majorityCount = Math.ceil(arr.length / 2);
//
//     for (const number of arr) {
//         if (counts.has(number)) {
//             counts.set(number, counts.get(number) + 1 )
//         } else {
//             counts.set(number, 1)
//         }
//
//         if (counts.get(number) >= majorityCount) {
//             return number;
//         }
//     }
//     return null;
// }

// overall a much better, clearer solution.


// start-end pointers
function findPair(nums: number[], target: number): [number, number] | undefined {
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
    const isConsonant = (char:string) => /[^aeiou]/i.test(char)
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

// function testCompressToDistinct(array, expectedLength) {
//     const originalReference = array;
//     const resultLength = compressToDistinct(array);
//     const isSameObject = originalReference === array;
//     const isLengthCorrect = resultLength === expectedLength;
//     const isModifiedCorrectly = array.slice(0, expectedLength).every((val, idx, arr) => idx === 0 || val > arr[idx - 1]);
//
//     // console.log(
//     // isSameObject, isLengthCorrect, isModifiedCorrectly
//     //
//     // )
//     return isSameObject && isLengthCorrect && isModifiedCorrectly;
// }
//
// console.log(testCompressToDistinct([3, 3, 5, 7, 7, 8], 4));
// console.log(testCompressToDistinct([1, 1, 2, 2, 2, 3, 4, 4, 5], 5));
// console.log(testCompressToDistinct([0], 1));
// console.log(testCompressToDistinct([-5, -3, -3, -1, 0, 0, 0, 1], 5));
// console.log(testCompressToDistinct([6, 6, 6, 6, 6, 6, 6], 1));

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
function compressToDistinctWithSet(nums:number[]): number {
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

// AI said that anchor runner is preferred for its efficiency and simplicity for in-place modifications, and it has
// a smaller space complexity, so I want to try it

/*GAH! I missed a hugely important part, which is that the arrays are ALREADY SORTED
* that makes a huge difference in this! So, my solution would be better when unsorted, because this solution wouldn't
* even work if unsorted!
*
* New Algo:
* [3, 3, 3, 5, 7, 7, 8]
* anchor starts at 0, runner at 1
* if the ... and I got it, I think with the <= for the nums.length
* because it wasn't catching the last number, which was sometimes distinct*/

function compressToDistinct(nums: number[]): number {
    let anchor = 0;
    let runner = 1;
    while (runner <= nums.length) {
        if (nums[runner] !== nums[anchor]) {
            anchor++;
            nums[anchor] = nums[runner];
        }
        runner++;
    }
    return anchor;
}


// Binary Search Template

// function binaryTemplate(array: number[], target: number) {
//     let left = 0;
//     let right = array.length - 1;
//
//     while (left <= right) {
//         let mid = Math.floor((left + right) / 2);
//
//         if (array[mid] === target) {
//             // Optional early return
//         } else if (***comparison***) {
//             left = mid + 1;
//         } else {
//             right = mid - 1;
//         }
//     }
// }
//
// // Most often, if the target is not found, additional handling
// // or returning a specific value is needed. In many cases it will
// // be the index that `left` variable holds, which would indicate
// // where the target *would* fit into the array.


// Practice: Find Zero Position
// Write a function named `findZeroPosition` that takes in a
// sorted array of distinct integers as input.
// The function should return the index where the value 0 is
// found in the array, or the index where it would be inserted if
// it were not found.

// If the value 0 is found in the array, the function should
// return the index of the value 0. If the value 0 is not found,
// the function should return the index where it would be inserted
// while maintaining the sorted order of the array.

// Example:
// Input: nums = [-7, -5, -3, 0, 2]
// Output: 3

// console.log(findZeroPosition([-7, -5, -3, 0, 2]) === 3)

// Example:
// Input: nums = [3, 5, 7, 9, 11]
// Output: 0
// console.log(findZeroPosition([3, 5, 7, 9, 11]) === 0)

function findZeroPosition(array: number[]): number {
    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (array[mid] === 0) {
            return mid;
        } else if (array[mid] < 0) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return left;
}


// Demo: Find the Range of Threes
// Implement a function `findRange` that takes in an array of
// integers sorted in ascending order. The function should
// return an array containing the starting and ending
// positions of the number 3 within the array. If the number 3
// is not found, return [-1, -1].

// Example:
// Input: nums = [1, 2, 3, 3, 3, 3, 3, 4, 5]
// Output: [2, 6]

// Example:
// Input: nums = [1, 2, 5, 5, 6, 9, 10]
// Output: [-1, -1]
function findRangeOfThrees(nums: number[]) {
    return [findLeftMostIndex(nums, 3), findRightMostIndex(nums, 3)];
}

function findLeftMostIndex(array: number[], target: number): number {
    let left = 0;
    let right = array.length - 1;
    let leftMost = -1

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (array[mid] === target) {
            leftMost = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    return leftMost;
}

function findRightMostIndex(array: number[], target: number): number {
    let left = 0;
    let right = array.length - 1;
    let rightMost = -1;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (array[mid] === target) {
            rightMost = mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return rightMost
}

// console.log(findRangeOfThrees([1, 2, 3, 3, 3, 3, 3, 4, 5])); // [2, 6]
// console.log(findRangeOfThrees([1, 2, 5, 5, 6, 9, 10]));      // [-1, -1]
// console.log(findRangeOfThrees([]));                          // [-1, -1]




// Practice minimum count
// Given an array `nums` sorted in ascending order, determine
// the minimum between the count of positive integers and the
// count of negative integers.

// Please note that the number `0` is neither positive nor negative.


// All test cases should log true.

/*P: given a sorted array of numbers, count the negative and positive entries, and return the lesser of the two counts.
* E: BAE, zero is neither pos or neg
* D: they would probably want me to see that since this is sorted, use the binary search
* A:
* I wrote a return zero index function above, I could probably use that.
* find the index of the zero, count the left and right sides, return the smaller
* I could have done a better Alogirithm write up-- I think I copied the previous zero place function and then got
* distracted and dove in.
* after dealing with the case that zero exists, then we exit the while loop with the `left` populated with the position of the first positive integer
* If I get here, left represents the index where 0 would go
* this represents the first positive integer position
* so the neg count is left
* and the positive count is length - left
*
* */

function minimumCountFirstDraft(array: number[]) {
    let left = 0;
    let right = array.length - 1;
    let negativeCount;
    let positiveCount

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (array[mid] === 0) {
            console.log('mid:', mid)
            negativeCount = mid - 1 >= 0 ? mid : 0
            positiveCount = mid === array.length - 1 ? 0 : array.length - 1 - mid
            return negativeCount > positiveCount ? positiveCount : negativeCount;
        } else if (array[mid] < 0) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    negativeCount = left
            console.log('neg count:', negativeCount)
    positiveCount = array.length - left
            console.log("pos count:", positiveCount)
    return negativeCount > positiveCount ? positiveCount : negativeCount
}

// Second draft with AI
/* I am pleased that I caught the zero conditions and AI didn't at first.
* The main benefit from the AI solution was that I didn't have to account for zero so verbosely in the while loop;
* instead, */
function minimumCount(array: number[]) {
    let left = 0;
    let right = array.length - 1;

    if (right < 0) return 0;

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);

        if (array[mid] < 0) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    const negativeCount = left
    let positiveCount = array.length - left
    positiveCount = positiveCount - (array[left] === 0 ? 1 : 0)

    return Math.min(positiveCount, negativeCount);
}

// console.log(minimumCount([-4, -3, -2, -1, 3, 4]) === 2);
// console.log(minimumCount([-3, 1, 2, 3, 4, 5]) === 1);
// console.log(minimumCount([-5, -4, -3, -2, -1]) === 0);
// console.log(minimumCount([1, 2, 3, 4, 5]) === 0);
// console.log(minimumCount([-2, -1, 1, 2]) === 2);
// console.log(minimumCount([-7, -5, -4, 1, 2, 6, 10]) === 3);
// console.log(minimumCount([-3, -2, -1, 0, 5, 6]) === 2);
// console.log(minimumCount([-1, 0, 1]) === 1);
// console.log(minimumCount([]) === 0);



// ** LINKED LISTS **
// walkthrough

// Given the head of a linked list, remove all
// occurrences of the value 2 from the linked list.

// Input:  1 -> 2 -> 3 -> 2 -> 4 -> null
// Output: 1 -> 3 -> 4 -> null

// Input:  2 -> 3 -> 2 -> null
// Output: 3 -> null

// Input:  null
// Output: null

class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}
/* P: given a linked list, remove the values that are 2, and return the list
* E: BAE
* D: linked lists
* A:
* have a current pointer and a previous pointer
* If curr is null: break from the loop
* If the current is 2 (the target):
*   if the previous value is null
*       update the head to the next node (current.next)
*   else
*       set the previous node's next property `prev.next` to the current + 1 `curr.next`
* else
*   update the previous pointer to curr
* move the curr pointer to the next node
*  */

//first draft without dummy node
function deleteTwosFirstDraft(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let curr: ListNode | null = head;

    if (!head) {
        return head;
    }

    while (curr) {
        if (curr.val === 2) {
            if (!prev) {
                head = curr.next;
            } else {
                prev.next = curr.next
            }
        } else {
            prev = curr
        }
        curr = curr.next;
    }
    return head;
}
// Helper function to format the linked list into a string
function stringifyList(head: ListNode | null) {
    let curr = head;
    let result = "";
    while (curr !== null) {
        result += curr.val + " -> ";
        curr = curr.next;
    }
    result += "null";
    return result;
}

// Test case 1
let head1 = new ListNode(1);
head1.next = new ListNode(2);
head1.next.next = new ListNode(3);
head1.next.next.next = new ListNode(2);
head1.next.next.next.next = new ListNode(4);

// console.log("Input: ", stringifyList(head1));
// console.log("Output:", stringifyList(deleteTwos(head1)));
// Input:  1 -> 2 -> 3 -> 2 -> 4 -> null
// Output: 1 -> 3 -> 4 -> null

// Test case 2
const head2 = new ListNode(2);
head2.next = new ListNode(3);
head2.next.next = new ListNode(2);

// console.log("Input: ", stringifyList(head2));
// console.log("Output:", stringifyList(deleteTwos(head2)));
// Input:  2 -> 3 -> 2 -> null
// Output: 3 -> null


// second draft, much easier implementation with dummy node pointing to the head node.
function deleteTwos(head: ListNode | null): ListNode | null {
    let dummy = new ListNode();
    dummy.next = head;
    let prev = dummy;
    let curr: ListNode | null = head;

    while (curr) {
        if (curr.val === 2) {
            prev.next = curr.next
        } else {
            prev = curr
        }
        curr = curr.next;
    }
    return dummy.next;
}


// Given the head of a linked list, reverse the list and return it.

// Input: 1 -> 2 -> 3 -> 4 -> null
// Output: 4 -> 3 -> 2 -> 1 -> null

/* P: reverse a list, return the new head of the list (the last node)
* E BAE
* D: linked list
* A:
* initialize a next-node variable for the loop, which will hold the node to the right as I change the connection from
* pointing right to pointing left
* when I get to the end, return the prev node, as the current node will hold null
* */

function reverseLinkedList(head: ListNode): ListNode | null{
    let nextNode;
    let prev = null;
    let curr: ListNode | null = head;

    while (curr) {
        nextNode = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextNode;
    }
    return prev;
}


// Helper function to print the linked list
function printList(head: ListNode | null) {
    let curr = head;
    let result = "";
    while (curr !== null) {
        result += curr.val + " -> ";
        curr = curr.next;
    }
    result += "null";
    return result;
}
// Test case 1
head1 = new ListNode(1);
head1.next = new ListNode(2);
head1.next.next = new ListNode(3);
head1.next.next.next = new ListNode(4);

console.log("Input: ", printList(head1));
console.log("Output:", printList(reverseLinkedList(head1)));
// Input:  1 -> 2 -> 3 -> 4 -> null
// Output: 4 -> 3 -> 2 -> 1 -> null

// I did this problem after reading the explanation











































