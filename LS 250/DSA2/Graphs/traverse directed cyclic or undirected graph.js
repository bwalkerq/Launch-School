// Implement a function `dfs` that accepts two arguments: an adjacency
// list representing an undirected graph, and a starting vertex (source).
// The function should print the vertices in preorder depth-first
// traversal order.

const adjList = new Map();
adjList.set(1, [2]);
adjList.set(2, [1, 3]);
adjList.set(3, [2]);

// dfs(adjList, 1); // 1, 2, 3

// given this solution, my task is to create the version using a stack
function dfsRecursive(adjList, source, visited = new Set()) {
  console.log(source);
  visited.add(source);

  let neighbors = adjList.get(source);
  for (let neighbor of neighbors) {
    if (!visited.has(neighbor)) {
      dfs(adjList, neighbor, visited);
    }
  }
}
/*
* A: for DFS, we use a stack and pop on and off
* still need the new set for visited
* start with the stack with the source in it
* each iteration:
*   pop off the stack and process
*   add any neighbors that haven't been seen before to the stack
* */

function dfs(adjList, source) {
  const stack = [source];
  const visited = new Set([source]);

  while (stack.length > 0) {
    const node = stack.pop();
    console.log(node);
    const neighbors = adjList.get(node)
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        stack.push(neighbor)
      }
    }
  }
}


// Implement a function `bfs` that accepts two arguments: the adjacency list
// representing an undirected graph and a starting vertex (source).
// The function should print the vertices in breadth-first
// traversal order.

/* if I learned anything today it's that BFS uses a queue and DFS uses a stack
* SO I need a queue here!
* and the iteration is usually:
*   process an item from the queue
*   add the linked things from that to the queue
* here, we need a visited Set since this is undirected or cyclic
*
* */
const adjList2 = new Map();
adjList2.set(1, [2, 3]);
adjList2.set(2, [1, 4]);
adjList2.set(3, [1, 4, 5]);
adjList2.set(4, [2, 3]);
adjList2.set(5, [3, 6]);
adjList2.set(6, [5]);

function bfs(adjList, source) {
  let queue = [source];
  let visited = new Set([source]);

  while (queue.length !== 0) {
    let current = queue.shift();
    console.log(current);

    let neighbors = adjList.get(current);
    for (let neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor)
        queue.push(neighbor);
      }
    }
  }
}

console.log(bfs(adjList2, 1)); // 1, 2, 3, 4, 5, 6 or 1, 3, 2, 5, 4, 6


















