// Given the root node of a binary tree, implement a
// function `bfs` that returns an array containing the
// values of the nodes visited in level order
// (or breadth-first-search) traversal.

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

/* P: given a root, return an array of the processed nodes in level order
* Note that this means we process the root first, then all the nodes from left
* to right on each subsequent level.
* E: BAE
* MM I don't know exactly how I will keep track of the level..
* Hint: A queue data structure would be helpful to keep track of the nodes to process
* and the order in which to do so
* A:
* given the root
* init a queue -- maybe a map? the key would be the level, the value would be an
* array of all the nodes at that level. Then iterate the map in order to push
* to the result?
* Let's do it.
*
* specifically
* given the root
* init a new map to queue the nodes
* helper function:
* traverse the tree, adding each node to its respective value in the Map
*   if node is null, return
*   if the height exists in the cache, push this node to the Map
*   else set the height with this node in an array
*
* then with the Map, iterate with for in loop
*   push the values to the result
*
* return the result
*
* */

// this didn't work because I didn't know Map methods well enough, and then I
// looked at the solution, so I'm simplifying now.
function bfsFD(root) {
  let result = []
  let cache = new Map();

  function helper(node, height) {
    if (!node) return;
    height++;
    if (cache.get(height)) {
      let array = cache.get(height);
      array.push(node);
    } else {
      cache.set(height, [node]);
    }
    helper(node.left);
    helper(node.right);
  }

  helper(root, 0) // the root will get a height of 1 this way
  // now the cache is filled;

  // abort!
  //   let nodes = cache[cacheKey];
  //   console.log(cache[cacheKey])
  //   for (const node of nodes) {
  //     result.push(node.val)
  //   }
  // }
  return result;
}

/* A:
* let's try this again
* Although I don't know how this is the case, the way to do this BFS traverse
* is to use an array as a queue
* first, add the root to the queue
* then in each iteration
*   dequeue a node and process it
*   add the left node to the queue if it exists
*   same for the right node
*
* */
function bfs(root) {
  const queue = [root];
  const result = [];

  while (queue.length > 0) {
    const node = queue.shift()
    result.push(node.val);
    if (node.left !== null) queue.push(node.left);
    if (node.right !== null) queue.push(node.right);
  }

  return result;
}
/* So much I had to learn from this:
* `if (!node.left)` doesn't work in JS, that's only for TS, so I had to use the
* actual check against null
* I don't know how I would have realized that processing a single element on
* each iteration would guarantee that everything is processed by level. That's crazy to me
*
* */

// Test cases
const tree1 = buildTree([1, null, 2, 3]);
console.log(bfs(tree1)); // Output: [1, 2, 3]

const tree2 = buildTree([1, 2, 3, null, null, 4, null, null, 5]);
console.log(bfs(tree2)); // Output: [1, 2, 3, 4, 5]

const tree3 = buildTree([5, 3, null, 2, null, 1, null]);
console.log(bfs(tree3)); // Output: [5, 3, 2, 1]

const tree4 = buildTree([10, 5, 15, null, 6, 12, 21, null, null, 11]);
console.log(bfs(tree4)); // Output: [10, 5, 15, 6, 12, 21, 11]