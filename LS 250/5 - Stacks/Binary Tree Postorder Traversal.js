// Given the root node of a binary tree, implement a
// function `postorderTraversal` that returns an
// array containing the values of the nodes visited in
// an postorder traversal.

// Your task is to implement the function iteratively using a stack.

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
/* P: ok, same problem but with LRN, where the node is processed after going left
* and going right. So this means that I'd go left, then go left again, until I can't
* go left, then go right, and only process the node if there was no right.
* So that is basically, go left until can't, then go right and check left again
* and if left start the iteration over again, so left as far as I can go, and only
* if I go right and it's a leaf, then process.
* So each iteration will:
*   go left as far as possible
*   go right (then check left again, so start of new iteration) but right as far as possible
*   and then if it's a leaf, process, or it's the parent where all of its children
* have been processed, process it.
*
* so!
* A:
* empty stack
* empty result
* current = root
* while the current is not null, OR the stack is not empty
*   while the left is not null
*     push left to the stack
*     current becomes left
*
* gotta check right first before pushing the result
*
* if the right is not null
*   push the right to the stack
*   set current to right
*   continue
* while left IS null
*   pop the stack,
*   push the val to the result;
* don't change current so that it stays having a null left.
*
*  */

function postorderTraversal(root) {
  let result = [];
  let stack = [];
  let current = root;

  while (current !== null || stack.length > 0) {
    while (current.left !== null) {
      stack.push(current.left);
      current = current.left;
    }

    if (current.right !== null) {
      stack.push(current.right);
      current = current.right;
      continue;
    }

    result.push(current);
    current = stack.pop;
    // now what I want is to check if this has been seen, then push to result,
    // BUT there must be some way to not...
  }
}
/* Holy shit the solution uses two stacks, this is hard as hell!
* I'll pause this for now and maybe come back to it. My rationale is that I can
* use recursion if I'm required to traverse a Btree and do one of the orders.*/

// Test cases
const tree1 = buildTree([1, null, 2, 3]);
console.log(postorderTraversal(tree1)); // Output: [3, 2, 1]

const tree2 = buildTree([1, 2, 3, null, null, 4, null, null, 5]);
console.log(postorderTraversal(tree2)); // Output: [2, 5, 4, 3, 1]

const tree3 = buildTree([5, 3, null, 2, null, 1, null]);
console.log(postorderTraversal(tree3)); // Output: [1, 2, 3, 5]

const tree4 = buildTree([10, 5, 15, null, 6, 12, 21, null, null, 11]);
console.log(postorderTraversal(tree4)); // Output: [6, 5, 11, 12, 21, 15, 10]