// Recursion
/*
* A [data structure] is a [problem definition] if [some condition is true], and
* the rest of the [data structure] is [problem definition].
*
* P: given a number >=0  n, return the sum of the numbers 0 to n.
* E: BAE
* D: recusion
* A:
* base case: n = 0, return zero
* recusive case: return n + sumOfNN(n-1)
* reduction step: (n-1)
*
* if n <= 0 return 0
* else
*   return n + f(n-1)
*  */

// Create a function that calculates the sum of the first `n`
// natural numbers. A natural number is a positive integer
// starting from 1. Therefore, the sum of the first `n` natural
// numbers is the sum of all integers from 1 to `n`.

// For example, if `n` is 5, the sum would be 1 + 2 + 3 + 4 + 5 == 15.

// console.log(sumOfNaturalNumbers(1) === 1);
// console.log(sumOfNaturalNumbers(5) === 15);
// console.log(sumOfNaturalNumbers(10) === 55);
// console.log(sumOfNaturalNumbers(20) === 210);
// console.log(sumOfNaturalNumbers(0) === 0);

// All test cases should log true.

function sumOfNaturalNumbers(n) {
  if (n <= 1) {
    return n;
  }
  return n + sumOfNaturalNumbers(n-1);
}

// Dynamic Programming (DP)

// You are given a grid represented as a nested array filled
// with empty strings. Chaos, the puppy, is standing at the
// top-left corner of the grid and can move either down or right
// at any point in time. Determine the number of distinct paths
// Chaos can take to reach a bowl of treats placed at the
// bottom-right corner of the grid.

// Define a function `chaosInTheGrid` that, given a nested
// array, returns the number of unique paths that Chaos
// can take to reach the bottom-right corner.

// The grid will have at least 1 row and 1 column.

// Example:

// Given the following 2x3 grid:

const grid = [
  ["", "", ""],
  ["", "", ""],
];

// There are three distinct path Chaos can take:
// 1. Right -> Right -> Down
// 2. Right -> Down -> Right
// 3. Down -> Right -> Right

/* P: given an n by m grid, return the number of paths possible for
Chaos the dog to reach the bottom right corner moving only to the right and down.
E: generally BAE, though I can't keep them in my mind because the solutions are
recursive.
D: I am supposed to work the top-down solution here, which is recursive.
A: the base case is maybe the 2 by 2 case? or just the move one up and one to
the left case?
in order to calculate, you sum the number of ways from one above and one to the left.
so...
where n represents the row, and m the column
grid[n][m] = grid[n-1][m] + grid[n][m-1]
base case: any square where the column or the row is 0, the value of that square is 1;
make a function inside the function, to retain the memo, and to keep the signature
the same.
* */
function chaosInTheGrid(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const memo = new Map();

  function nByMWays(n, m) {
    if (n === 0 || m === 0) return 1;
    const key = `${n}, ${m}`
    if (memo.has(key)) {
      return memo.get(key)
    } else {
      const result = nByMWays(n - 1, m) + nByMWays(n, m - 1);
        memo.set(key, result)
      return result;
    }
  }

  return nByMWays(rows - 1, cols - 1);  // remember that the length is
  // 1-indexed, thus returning the lengths - 1 for the dimensions
}
/* My big mistake was passing a new array as a key, which can't work, because arrays
with the same elements, if they are different arrays, will never be equal to one another
* overall, I had the basic structure once I looked at the previous top-down recursive
* solution for the crates of increasing size. That's good!
* */

// Test cases

// const grid1 = [[""]];
// const grid2 = [
//   ["", ""],
//   ["", ""],
// ];
// const grid3 = [
//   ["", "", ""],
//   ["", "", ""],
//   ["", "", ""],
// ];
// const grid4 = [
//   ["", "", "", "", ""],
//   ["", "", "", "", ""],
//   ["", "", "", "", ""],
// ];
// const grid5 = [
//   ["", "", "", "", "", ""],
//   ["", "", "", "", "", ""],
//   ["", "", "", "", "", ""],
//   ["", "", "", "", "", ""],
//   ["", "", "", "", "", ""],
//   ["", "", "", "", "", ""],
// ];
// console.log(chaosInTheGrid(grid1) === 1);
// console.log(chaosInTheGrid(grid2) === 2);
// console.log(chaosInTheGrid(grid3) === 6);
// console.log(chaosInTheGrid(grid4) === 15);
// console.log(chaosInTheGrid(grid5) === 252);
// All test cases should log true


// You are given a grid represented as a
// nested array filled with strings.

// Chaos is standing at the top-left corner of
// the grid and can move either down or right at
// any point in time. However, there are sleeping
// cats in certain squares, represented by the
// letter "C" in the grid, and Chaos cannot go through
// these squares.

// Determine the number of distinct paths Chaos
// can take to reach a bowl of treats placed at
// the bottom-right corner of the grid.

// Define a function `chaosInTheGridWithCats` that,
// given a nested array, returns the number of
// unique paths that Chaos can take to reach the
//  bottom-right corner.

// The grid will have at least 1 row and 1 column.

// Example:

// Given the following 2x3 grid:

// const grid = [
//   ["", "C", ""],
//   ["", "", ""],
// ];

// There is only one distinct path Chaos can take:
// 1. Down -> Right -> Right

/* Ok now the same problem, but with cats...
* From an iterative approach, it means that if we get to a spot that is either
* to the right of a cat or
* below a cat
* then the sum of the ways to get to that spot are whatever plus zero for the cat
* spot. I.e. the ways to get to a cat spot are zero. */

function chaosInTheGridWithCats(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const cache = new Map();

  function pathsToCoordinate(n,m) {
    if (n < 0 || m < 0 || grid[n][m] === 'C') return 0;
    if (n === 0 && m === 0) return 1;
    const key = `${n}, ${m}`
    if (cache.has(key)) {
      return cache.get(key);
    } else {
      let result = pathsToCoordinate(n - 1, m) + pathsToCoordinate(n, m - 1);
      cache.set(key, result);
      return result;
    }
  }
  return pathsToCoordinate(rows - 1, cols - 1);
}
/* Got close but missed a huge part of the problem: since our base case was no
longer just the case of a square on the top or the left side, because a cat can
mess that up, we have to guard against any values being out of bounds.
So that first conditional is to check for out of bounds or a cat, and in any of
those cases return 0.
*/

// Test Cases:

const grid1 = [
  ["", "C"],
  ["", ""],
];
const grid2 = [["", "C"]];
const grid3 = [
  ["", "", ""],
  ["", "C", ""],
  ["", "", ""],
];
const grid4 = [
  ["", "", "", "", "C"],
  ["", "C", "", "", ""],
  ["", "", "", "C", ""],
];
const grid5 = [
  ["", "", "", "", "C", ""],
  ["", "C", "", "", "", ""],
  ["", "", "", "", "", ""],
  ["", "", "", "C", "", ""],
  ["", "C", "", "", "", ""],
  ["", "", "", "", "", ""],
];

// console.log(chaosInTheGridWithCats(grid1) === 1);
// console.log(chaosInTheGridWithCats(grid2) === 0);
// console.log(chaosInTheGridWithCats(grid3) === 2);
// console.log(chaosInTheGridWithCats(grid4) === 2);
// console.log(chaosInTheGridWithCats(grid5) === 43);




// BINARY TREES
// Given the root node of a binary tree, implement a
// function `getHeight` that calculates its height.

// The height of the tree is the level of the
// deepest node or the longest path from the root
// to a leaf node.

// The root node is considered to have a height of 1.

// Example

//      1
//     / \
//    2   3
//   / \
//  4   5


// The height of this binary tree is 3, as the
// longest path from the root node to a leaf node
// (either from 1 to 4 or from 1 to 5) involves 3 nodes.

class Node {
  constructor(value) {
    this.val = value;
    this.left = null;
    this.right = null;
  }
}

// Helper function for test cases
function buildTree(arr) {
  if (arr.length === 0) {
    return null;
  }

  const nodes = [];

  const val = arr.shift();
  const root = new Node(val);
  nodes.push(root);

  while (arr.length > 0) {
    const curr = nodes.shift();

    const leftVal = arr.shift();
    if (leftVal !== null) {
      curr.left = new Node(leftVal);
      nodes.push(curr.left);
    }

    if (arr.length > 0) {
      const rightVal = arr.shift();
      if (rightVal !== null) {
        curr.right = new Node(rightVal);
        nodes.push(curr.right);
      }
    }
  }

  return root;
}
/* This feels a little like DP iteration, because I need to keep track of how
many times I progressed, or rather, a cache for each value and its level?

P: given a tree root node, return the height of the tree as an integer
E: I don't fully know how the helper function works to create the trees, but I
do understand how to traverse the tree.
D: binary tree, DP recursion
A:
base case is a leaf
if both left and right are null, return
helper function takes a node and the current height?
if left is defined, go there,
if right defined, go there
all the time storing height values in the cache, so increment height before cache

given the root node
let height = 1
let greatestHeight = 0

helper function (node, height)
  if the height > greatestHeight, replace it
  if !left and !right, return
  if node.left exists, go there!
    helper (node.left, height + 1
  if right exists, same thing
    helper...

return greatestHeight
* */

function getHeight(root) {
  let height = 0;
  let greatestHeight = 0;

  function helper(node, height) {
    height++;
    greatestHeight = height > greatestHeight ? height : greatestHeight;
    if (!node.left && !node.right) return;
    if (node.left) {
      helper(node.left, height)
    }
    if (node.right) {
      helper(node.right, height);
    }
  }

  helper(root, height)
  return greatestHeight;
}

// Test Cases

const tree1 = buildTree([1]);
console.log(getHeight(tree1))// === 1);

const tree2 = buildTree([1, 2, 3, null, null, 4, 5]);
console.log(getHeight(tree2) === 3);

const tree3 = buildTree([1, 2, 3, 4, 5, 6, 7]);
console.log(getHeight(tree3) === 3);

const tree4 = buildTree([1, 2, 3, null, null, 4, 5, null, null, null, 6]);
console.log(getHeight(tree4) === 4);

const tree5 = buildTree([1, 2, null, 3, null, 4, null, 5, 6, null, null, null, 7]);
console.log(getHeight(tree5) === 6);

const tree6 = buildTree([1, 2, null, 3, null, 4, null, 5, null, 6, 8, null, 7, null, 9, null, null, null, 10]);
console.log(getHeight(tree6) === 8);
// All test cases should log true

























































