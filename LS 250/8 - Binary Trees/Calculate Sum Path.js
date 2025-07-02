// Given the root node of a binary tree containing only single-digit
// integers (0-9), implement a function `calculatePathSum` that
// computes the total sum of all root-to-leaf paths.
// A root-to-leaf path is a sequence of nodes from the root to a
// leaf, where each node's value represents a digit in the number
// formed by that path.

// Example 1:
//     5
//    / \
//   3   7
//
// In this tree, there are two root-to-leaf paths:
// 5 -> 3 (representing the number 53)
// 5 -> 7 (representing the number 57)
// The total sum would be 53 + 57 = 110.
//
// Example my own:
//        8
//       / \
//      2   9
//     / \
//    6   4
//       /
//      1
//
// In this tree, there are three root-to-leaf paths:
class TreeNode {
  constructor(value) {
    this.val = value;
    this.left = null;
    this.right = null;
  }
}
// 8 -> 2 -> 6 (representing the number 826)
// 8 -> 2 -> 4 (representing the number 824)
// 8 -> 9 (representing the number 89)
// The total sum would be 826 + 824 + 89 = 1739.

/* P: given a root of a binary tree, where each node's value is a single digit,
* return the sum of the root-to-leaf path numbers, where one such number is
* defined by combining the digits from the root to the leaf to form a number.
* E: BAE
* Note that each leaf will have an associated number
* D: DFS and recursion
* A:
* the base case is a null node
* but if both left and right are null, in which case return the val as a string
* has to be processed by a Set() I think. Otherwise added twice?
* recursive case
* return the string val + the helper left, the string val + helper right (ach!)
* how to get individual strings?
*
* */
function calculatePathSum(root) {
  let nums = [];

  function helper(node, string) {
    if (node === null) return;
    if (node.left === null && node.right === null) {
      nums.push(string + node.val)
    } else {
      string += String(node.val);
      helper(node.left, string);
      helper(node.right, string);
    }
  }

  helper(root, '');
  return nums.map(Number).reduce((total, current) => total+= current, 0 )
}
/* I like my solution better than theirs because mine was easier to check by
keeping the actual digit as a reference; theirs multiplied it by 10 (which makes
sense for how the number is built, and is smart) and then summing it into
running total. That feels way harder to manage since you can't see if each sum
is getting all the numbers it should, or getting an extra one of the same num.
Anyway, I like mine better for its testing and explicitness.
We both used recursion in approximately the same way. I was proud that I figured this out on my own.

*/

// This was a first draft that I realized I could simplify.
// function calculatePathSum(root) {
//   let nums = new Set();
//
//   function helper(node, string) {
//     if (node === null) {
//       nums.add(string)
//       return;
//     }
//
//     const s = String(node.val);
//     string += s;
//
//     helper(node.left, string);
//     helper(node.right, string);
//   }
//
//   helper(root, '');
//   console.log( Array.from(nums).map(Number))
//   return Array.from(nums).map(Number).reduce((total, current) => total+= current, 0 )
// }
// Test Cases

const tree1 = buildTree([8]);
console.log(calculatePathSum(tree1) === 8);

const tree2 = buildTree([5, 3, 7]);
console.log(calculatePathSum(tree2) === 110);

const tree3 = buildTree([2, 8, 4, 3, 9]);
console.log(calculatePathSum(tree3) === 596);
// Example my own:
//        2
//       / \
//      8   4
//     / \
//    3   9
//


const tree4 = buildTree([6, 2, 8, null, 5]);
console.log(calculatePathSum(tree4) === 693);

const tree5 = buildTree([3, 7, 2, 1, 9, 5, 4, null, null, 6, 8]);
console.log(calculatePathSum(tree5) === 8614);

const tree6 = buildTree([9, 4, 7, null, 1, 3, null, null, 8]);
console.log(calculatePathSum(tree6) === 10391);

// All test cases should log true


// Helper function for test cases

function buildTree(arr) {
  if (arr.length === 0) {
    return null;
  }
  const nodes = [];
  const val = arr.shift();
  const root = new TreeNode(val);
  nodes.push(root);
  while (arr.length > 0) {
    const curr = nodes.shift();
    const left_val = arr.shift();
    if (left_val !== null) {
      curr.left = new TreeNode(left_val);
      nodes.push(curr.left);
    }
    if (arr.length > 0) {
      const right_val = arr.shift();
      if (right_val !== null) {
        curr.right = new TreeNode(right_val);
        nodes.push(curr.right);
      }
    }
  }
  return root;
}

