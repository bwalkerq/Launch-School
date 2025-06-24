// Given an undirected graph represented by an edge list, determine if
// there is a path between specified source and destination vertices.

// Implement the function `hasPath` that takes three arguments:
// an edge list representing the graph, a source vertex, and a
// destination vertex. The function should return true if a path
// exists between the source and destination, and false otherwise.

/* P: given an edge list, a source, and destination,
return true if there exists a path between them, else false
E:   BAE
D: graph, edge list, turn it into adj list, visited Set, either recursion or stack/queue
A:
make an adj list from the edge list
init visited as a new set
init queue with the source
on each iteration, while the queue is not empty
  shift a node from the queue, call it current
  if the current node is the target, return true
  get the neighbors
  if the neighbors haven't been visited
    add them to visited
    push them to the queue
*/

function hasPath(edgeList, src, dst) {
  let adjList = edgeToAdj(edgeList);
  let visited = new Set();
  let queue = [src];

  while (queue.length > 0) {
    let current = queue.shift();
    if (current === dst) return true;
    let neighbors = adjList.get(current);
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return false;
}

/*
make adj list helper
for each element in the edge list, we need to add both pairs a, b and b,a to the map
if a DOESN'T exist in the map,
  map set (a,[])
push b to the value (an array) for a
Same set of steps for b, but pushing a to its array in the map, so
if b doesn't exist in the map,
  set (b, [])
push a to map.get(b)
*/

function edgeToAdj(edgeList) {
  const adjList = new Map();

  edgeList.forEach(([vertex1, vertex2]) => {
    if (!adjList.has(vertex1)) adjList.set(vertex1, []);
    adjList.get(vertex1).push(vertex2);

    if (!adjList.has(vertex2)) adjList.set(vertex2, []);
    adjList.get(vertex2).push(vertex1);
  });
  return adjList;
}

// console.log(edgeToAdj([[1, 2], [1, 3], [2, 4], [3, 4], [3, 5], [5, 6]]))

console.log(hasPath([[1, 2], [2, 3], [3, 4]], 1, 4) === true);
console.log(hasPath([[1, 2], [3, 4]], 1, 4) === false);
console.log(hasPath([[1, 2], [1, 3], [2, 4], [3, 4], [3, 5], [5, 6]], 1, 6) === true);
console.log(hasPath([], 1, 1) === true);
console.log(hasPath([[1, 2], [1, 3], [4, 5], [6, 7]], 2, 5) === false);
console.log(hasPath([[1, 2], [2, 3], [3, 4], [4, 5], [1, 5], [2, 6], [6, 7], [7, 8], [8, 5]], 1, 8) === true);
console.log(hasPath([[1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 3], [2, 7], [7, 8], [8, 7], [7, 9], [9, 10], [10, 11], [11, 12], [12, 10], [7, 13]], 1, 13) === true);
console.log(hasPath([[1, 2], [2, 3], [3, 1], [4, 5], [5, 6], [6, 4], [7, 8], [8, 9], [9, 10], [10, 7], [11, 12], [13, 14], [14, 15], [15, 13]], 1, 12) === false);
// All test cases should log true
