// Given the root node of a binary tree, implement a
// function `inorderTraversal` that returns an
// array containing the values of the nodes visited in
// an inorder traversal.

// Your task is to implement the function iteratively using a stack.

/* P: now, using a stack, given a root, do in-order traversal
* The difference now is that rather than NLR, we need LNR, which means that
* we...go to the left node first  before processing the current node. Yes that's
* correct, doing recursion in my previous encounter with this problem made
* this a simple trick of reordering the lines that processed the value and the lines
* that dove the left or right into recursion.
* Now I have to go left until I hit null, and then process that value, then go right
* until I hit null, and then go up a level to process the node above that..
*
* A:
* go left if you can, then start the iteration again
* if left is null, process that node, then go right
* So in better terms, each iteration
* adds the left to the stack if it exists and and it hasn't already been seen,
*   adds it to seen as well
*   then continues
* if no left, then processes current
* then adds right if it exists and hasn't been seen, adds to seen, starts iteration over */


function inorderTraversalFD(root) {
  if (root === null) return root;

  let stack = [root];
  let result = [];
  let seen = new Set([root]);


  while (stack.length > 0) {
    let current = stack.pop();
    if (current.left !== null && !seen.has(current.left)) {
      seen.add(current.left)
      stack.push(current, current.left);
      continue;
    }

    result.push(current.val);
    seen.add(current)

    if (current.right !== null && !seen.has(current.right)) {
      seen.add(current.right)
      stack.push(current.right);
      continue
    }
  }
  return result;
}

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

// I can do this without a seen Set().
// I can do it by each iteration:
// going left as far as possible,
// process the node,
// then go right (not as much as possible.)
/* I had to use their solution entirely, the algorithm visual walkthrough did NOT
* make sense to me and I couldn't translate it to code.
* The given solution focuses on an extremely fluid use of the current value
* changing it as it goes down the line on the left, and then to process the current node
* while its on a leaf, and then again to the right node (once) on each iteration.
* That is what I wasn't able to do: I was thinking of the current value keeping the same value
* for each iteration, when in fact it makes more sense for each iteration to have
* potentially many different nodes stored in the current variable throughout a
* single iteration.
* I had originally had the current node popped off in an iteration, then pushed back on
* for later processing, but that never worked. It's worth noting that the root
* is stored up front (not preloaded to the stack) because the pop from the stack
* doesn't happen in the iteration until after the left dive. */

function inorderTraversal(root) {
  let stack = [];
  let result = [];
  let current = root;

  while (current !== null || stack.length > 0) {
    while (current !== null) {
      stack.push(current);
      current = current.left
    }

    current = stack.pop()
    result.push(current.val);

    current = current.right;
  }
  return result;
}


// Test Cases:

const tree1 = buildTree([1, null, 2, 3]);
console.log(inorderTraversal(tree1)); // Output: [1, 3, 2]

const tree2 = buildTree([1, 2, 3, null, null, 4, null, null, 5]);
console.log(inorderTraversal(tree2)); // Output: [2, 1, 4, 5, 3]

const tree3 = buildTree([5, 3, null, 2, null, 1, null]);
console.log(inorderTraversal(tree3)); // Output: [1, 2, 3, 5]

const tree4 = buildTree([10, 5, 15, null, 6, 12, 21, null, null, 11]);
console.log(inorderTraversal(tree4)); // Output: [5, 6, 10, 11, 12, 15, 21]