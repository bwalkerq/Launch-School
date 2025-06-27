

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// Helper function to build a tree from an array
function buildTree(arr) {
  if (arr.length === 0) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  while (queue.length > 0 && i < arr.length) {
    const node = queue.shift();
    if (arr[i] !== null) {
      node.left = new TreeNode(arr[i]);
      queue.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i]);
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

function treeToArray(root) {
  if (root === null) return [];
  const result = [];
  let current = root;
  while (current) {
    result.push(current.val);
    result.push(current.left === null ? null : current.left.val);
    current = current.right;
  }
  while (result[result.length - 1] === null) {
    result.pop();
  }
  return result;
}

function runTest(input) {
  let root = buildTree(input);
  transform(root);
  console.log(treeToArray(root));
}

// Given the root of a binary tree, transform it into a
// linked list-like structure following the tree's nodes
// in a pre-order traversal pattern.

// In the transformed structure, each node's right child points to
// the next node in the traversal, and the left child is always null.
// The order of nodes in the list should match a pre-order
// traversal of the original binary tree.

// The binary tree should be transformed in place.

// Example 1:

// Input: [1,2,3,4,5]
// Equivalent to:

//     1
//    / \
//   2   3
//  / \
// 4   5

// Output: [1,null,2,null,4,null,5,null,3]
// Equivalent to:

//  1
//   \
//    2
//     \
//      4
//       \
//        5
//         \
//          3

// Example 2:

// Input: [1,null,2,3]
// Equivalent to:

//  1
//   \
//    2
//   /
//  3

// Output: [1,null,2,null,3]
// Equivalent to:

//  1
//   \
//    2
//     \
//      3


// Bonus: Can you transform the tree in-place (with O(1) extra space)?
/*
* P: given the root of a tree, transform it into a linked list where the right
* arm of each node points to the next node, in preorder traversal
* E:
* D: stack?
* A:
* start with the root in the stack
* for each iteration, NLR, so process means to link the previous to the current?
* then go left if you can
* then go right if you can
* with a stack this means push the right then the left
* start with a dummy
* connect root to right arm of dummy (return dummy.right at the end)
* then push right, push left
*
*
* root in stack
* dummy.right is previous
* until the stack is empty, on each iteration
*   process
*     curr = pop from the stack
*     previous.right = current
*     previous.left = null
*   push right, push left
*
* */

function transform(root) {
  if (root === null) return root
  let dummy = new TreeNode('dummy');
  let previous = dummy;
  let stack = [root];

  while (stack.length > 0) {
    let curr = stack.pop();
    previous.right = curr;
    previous.left = null;
    if (curr.right !== null) stack.push(curr.right);
    if (curr.left !== null) stack.push(curr.left);

    previous = curr;
  }

  return dummy.right;
}

// Test cases

runTest([1,2,3,4,5]);
// Expected: [1,null,2,null,4,null,5,null,3]

runTest([1,null,2,3]);
// Expected: [1,null,2,null,3]

runTest([1,2,5,3,4,null,6]);
// Expected: [1,null,2,null,3,null,4,null,5,null,6]

runTest([]);
// Expected: []

runTest([1]);
// Expected: [1]

runTest([1,2,3,null,4,5,6]);
// Expected: [1,null,2,null,4,null,3,null,5,null,6]

runTest([1,2,3,4,5,6,7]);
// Expected: [1,null,2,null,4,null,5,null,3,null,6,null,7]

runTest([1,2,null,3,null,4,null,5]);
// Expected: [1,null,2,null,3,null,4,null,5]

runTest([1,null,2,null,3,null,4,null,5]);
// Expected: [1,null,2,null,3,null,4,null,5]