// Implement a function `findNodeInBST` that, given
// the root node of a binary search tree and a value,
// returns true if the value exists in the tree or
// false if it does not.

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

/*
* P: given a root and a target, return true if target exists in the tree, else false
* E: fine
* D: traversing the binary tree...
* A:
* I guess we could go either way with this, either DFS or BFS?
* start with the root,
* if the node val is the target return true
* if the target is less than the root, search and return the left
* else search and return the right node
* if both left and right are null, return false;
*
* */

function findNodeInBSTFD(root, target) {
    if (root === null) return false;
  function helper(node) {
    if (node.val === target) return true;
    if (node.left !== null && target < node.val) {
      return helper(node.left);
    } else if (node.right !== null && target > node.val) {
      return helper(node.right)
    } else {
      return false;
    }
  }
  return helper(root);
}

/* My solution totally works, but theirs is more direct, and it deals with the
base case of a node being null. Which is nicer for fewer conditions to check.
Mine is more clear because it has one root, but it's fine to think of each subtree
as having its own root.
* */

function findNodeInBST(root, target) {
  if (root === null) return false;
  if (root.val === target) return true;
  if (root.val < target) {
    return findNodeInBST(root.right, target);
  } else {
    return findNodeInBST(root.left, target);
  }
}

// Test cases
const tree1 = buildTree([4, 2, 7, 1, 3]);
console.log(findNodeInBST(tree1, 2) === true);
console.log(findNodeInBST(tree1, 5) === false);

const tree2 = buildTree([5, 3, 8, 1, 4, 7, 9]);
console.log(findNodeInBST(tree2, 7) === true);
console.log(findNodeInBST(tree2, 10) === false);

const tree3 = buildTree([10]);
console.log(findNodeInBST(tree3, 10) === true);
console.log(findNodeInBST(tree3, 5) === false);

const tree4 = buildTree([]);
console.log(findNodeInBST(tree4, 1) === false);
// All test cases should log true