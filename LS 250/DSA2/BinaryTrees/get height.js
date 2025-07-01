
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






