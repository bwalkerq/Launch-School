// Implement a function `dfs` that accepts two arguments: the adjacency list
// representing a directed acyclic graph and a starting vertex (source).
// The function should print the vertices in preorder depth-first
// traversal order.

// Their solution using a stack
// each iteration pops one off the stack, processes, and adds it's neighbors to the stack
function dfsStack(adjList, source) {
  let stack = [source];
  while (stack.length !== 0) {
    let current = stack.pop();
    console.log(current);
    let neighbors = adjList.get(current);
    for (let neighbor of neighbors) {
      stack.push(neighbor);
    }
  }
}

/*
* P: given an adjacency list and source (starting vertex)
* print the list of preorder DF traversal values
* recursive solution now:
* the base case is the node is null, just return
* the recursive case is to process the node (here, log it) and then for each of the
* neighbors, feed that to the function
* */

// the recursive solution
function dfs(adjList, source) {
  if (source === null) return;
  console.log(source)
  let neighbors = adjList.get(source)
  for (const neighbor of neighbors) {
    dfs(adjList, neighbor)
  }
}

const adjList = new Map();
adjList.set(1, []);
adjList.set(2, [1, 3, 4]);
adjList.set(3, [5]);
adjList.set(4, [6]);
adjList.set(5, []);
adjList.set(6, []);
adjList.set(7, [6]);

// dfs(adjList, 2); // 2, 4, 6, 3, 5, 1 or 2, 1, 3, 5, 4, 6

// Note that the output can vary based on the order in
// which you process neighbors. These two outputs are
// the most likely, but other valid orders exist.


// Implement a function `bfs` that accepts two arguments: the adjacency list
// representing an acyclic graph and a starting vertex (source).
// The function should print the vertices in breadth-first
// traversal order.

/* The hint is that I should use a queue, which I believe I used on the most
* recent level-order traverse
* on each iteration
*   process one item from the queue
*   add the neighbors to the queue
* */

function bfs(adjList, source) {
  let queue = [source];
   while (queue.length > 0) {
     let node = queue.shift();
     console.log(node);
     const neighbors = adjList.get(node);
     for (const neighbor of neighbors) {
       queue.push(neighbor);
     }
   }
}

bfs(adjList, 2); // 2, 1, 3, 4, 5, 6  or 2, 4, 3, 1, 6, 5

// Again, the order depends on which neighbor node we explore first









