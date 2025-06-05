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

function findPair(arr: number[]):number[] | null {
    let output:number[] | null;
    arr.forEach((el, index, array) => {
        const arr2 = array.slice(index + 1)
        arr2.forEach(otherEl => {
            if (el + otherEl === 10) {
                output = [el, otherEl];
            }
        })
    })

    return output ? output : null;
}

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

console.log(test(6))





























