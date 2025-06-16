/*
DSABook1 contains all the exercises up to the Walkthrough for Linked Lists
This file starts with the practice problems for Linked Lists
*/

// In this problem, you need to implement a function
// `removeEverySecondNode` that accepts a singly linked list
// as an argument. The function should remove every alternate
// node, starting with the second node.

/*P: given a list, remove every second node from the list, starting with the second
* E: BAE
* D: linked lists
* Mental Model: to remove each second means that when I'm on the second, I need
* to go back and link the 1st to the 3rd.
* This is a case where I need a nextNode, prev, and curr
*
* A:
* prev, curr, and nextNode
* use a boolean as a toggle
*   toRemove starts as false
* each iteration, toggle toRemove so that it removes each second
* if toRemove is true
*   set prev node's next as the nextNode
*   curr set to nextN
*   nextN set to curr.next
*   (ignore prev)
*   toggle boolean
* else
*   prev = curr
*   curr = nn
*   nn = curr.next
*   toggle boolean
* */

// first draft didn't work, because I used an unnecessary nextNode! Then I ended
// up accessing properties of null. KISS

function removeEverySecondNodeFirstDraft(head) {
  let toRemove = false;
  let prev = null;
  let curr = head;
  let nextNode = curr.next;

  while (curr) {
    if (toRemove) {
      console.log('removing', curr)
      prev.next = nextNode;
      curr = nextNode
      nextNode = curr.next;
      toRemove = !toRemove;
    } else {
      console.log("else:", curr)
      prev = curr;
      curr = nextNode
      nextNode = curr.next;
      toRemove = !toRemove;
      console.log('curr at end of else', curr)
    }
  }

  return head;
}

/* Once i got rid of the unnecessary nextNode, it was simple.
* I guess the take away is that if I am completely breaking a link so that I
* would lose access to node, like with reversing, that's when the extra variable
* is necessary. This time, nextNode just made an overly complex and unworkable solution
* */
function removeEverySecondNode(head) {
  let toRemove = false;
  let prev = null;
  let curr = head;

  while (curr) {
    if (toRemove) {
      prev.next = curr.next
      curr = curr.next
    } else {
      prev = curr;
      curr = curr.next
    }
    toRemove = !toRemove;
  }

  return head;
}

/*
Their solution. Slick. mine is more descriptive. But yes, in theirs you can
definitely see the jumping nature, that we're just skipping from one to the next
odd and so on...

function removeEverySecondNode(head) {
  let curr = head;
  while (curr && curr.next) {
    curr.next = curr.next.next;
    curr = curr.next;
  }
  return head;
}
* */

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function printLinkedList(head) {
  let currentNode = head;
  let listStr = '';
  while (currentNode !== null) {
    listStr += currentNode.val + ' -> ';
    currentNode = currentNode.next;
  }
  listStr += 'null';
  console.log(listStr);
}

function createLinkedList(arr) {
  let head = new ListNode(0);
  let current = head;
  arr.forEach(val => {
    current.next = new ListNode(val);
    current = current.next;
  });
  return head.next;
}

let list1 = createLinkedList([1, 2, 3, 4, 5]);
let list2 = createLinkedList([1, 2]);
let list3 = createLinkedList([1]);
let list4 = createLinkedList([1, 2, 3, 4]);
let list5 = createLinkedList([]);

// printLinkedList(removeEverySecondNode(list1)); // Expected: 1 -> 3 -> 5 -> null
// printLinkedList(removeEverySecondNode(list2)); // Expected: 1 -> null
// printLinkedList(removeEverySecondNode(list3)); // Expected: 1 -> null
// printLinkedList(removeEverySecondNode(list4)); // Expected: 1 -> 3 -> null
// printLinkedList(removeEverySecondNode(list5)); // Expected: null



// Stack implementation
// class ListNode {
//   constructor(val = 0, next = null) {
//     this.val = val;
//     this.next = next;
//   }
// }

class Stack {
  constructor() {
    this.top = null;
  }
  peek() {
    return this.top ? this.top.val : null;
    // Returns the value of the top most element without removing it.
    // If the stack is empty, it returns `null`.
  }

  push(value) {
    this.top = new ListNode(value, this.top);
  }

  pop() {
    // If the stack is empty, it returns `null`.
    if (!this.top) return null;
    // Removes the item from the stack and returns it
    let popped = this.top;
    this.top = this.top.next;
    return popped.val;
  }
}

const myStack = new Stack();
// myStack.push(1);
// console.log('Top element:', myStack.peek());  // logs 'Top element: 1'
// myStack.push(2);
// console.log('Top element:', myStack.peek());  // logs 'Top element: 2'
// myStack.push(3);
// console.log('Top element:', myStack.peek());  // logs 'Top element: 3'
// myStack.pop();
// console.log('Top element after pop:', myStack.peek());  // logs 'Top element after pop: 2'
// myStack.pop();
// console.log('Top element after pop:', myStack.peek());  // logs 'Top element after pop: 1'
// myStack.pop();
// console.log('Peek on empty stack:', myStack.peek());    // logs 'Peek on empty stack: null'


// class ListNode {
//   constructor(val = 0, next = null) {
//     this.val = val;
//     this.next = next;
//   }
// }

class Queue {
  constructor() {
    this.front = null;
    this.back = null;
  }
  peek() {
    // Returns the value of the top most element without removing it.
    return this.front ? this.front.val : null;
    // If the queue is empty, it returns `null`.
  }

  enqueue(value) {
    // Adds an item to the queue
    const newNode = new ListNode(value);
    if (!this.front) {
    this.back = this.front = newNode;
    } else {
      this.back.next = newNode;
      this.back = newNode
    }
  }

  dequeue() {
    // Removes the item from the queue and returns it
    if (!this.front) return null;

    let removedNode = this.front;
    // if the element being dequeued is the last element, change last to null, too
    if (this.front === this.back) {
      this.front = null;
      this.back = null;
    } else {
      this.front = this.front.next;
    }
    return removedNode.val;

    // If the queue is empty, it returns `null`.
  }
}

const myQueue = new Queue();
// myQueue.enqueue(1);
// console.log('Front element:', myQueue.peek());  // logs 'Front element: 1'
// myQueue.enqueue(2);
// console.log('Front element:', myQueue.peek());  // logs 'Front element: 1'
// myQueue.enqueue(3);
// console.log('Front element:', myQueue.peek());  // logs 'Front element: 1'
// myQueue.dequeue();
// console.log('Front element after dequeue:', myQueue.peek());  // logs 'Front element after dequeue: 2'
// myQueue.dequeue();
// console.log('Front element after dequeue:', myQueue.peek());  // logs 'Front element after dequeue: 3'
// myQueue.dequeue();
// console.log('Peek on empty queue:', myQueue.peek());  // logs 'Peek on empty queue: null'
// console.log('`back` on empty queue:', myQueue.back);  // logs '`back` on empty queue: null'


// Write a function `areMatched` that takes a string as an argument
// and returns true if all types of brackets (parentheses (),
// square brackets [], and curly braces {}) in the string are
// properly matched. For the brackets to be considered
// matched, every opening bracket must have a corresponding
// closing bracket of the same type, and the brackets must be
// correctly nested.

/* P: given a string with a bunch of brackets, return true if matched, else false
* E: BAE, though note that there can be multiple groupings of correct brackets within
* larger bracket matches e.g. {[]()} is correctly matched
* MM: my first thought was a queue because I could keep track of the first and last,
* and match them, but that gets busted by the example above.
*
* I think I want to feed in each element, and remove it when it's match is given.
* so feed in ( and then if the next element is an open bracket, feed that too,
* but if not, it must be ) or else return false.
* I need some way to map ( to ), etc. I could do a simple object.
* D: an array as a stack, for sure. I think I would have tried to implement the
* NodeList stack if the problem description didn't suggest using an array as a
* stack or queue.
* A:
* build a new Map() with the opening brackets as keys, and their closing partners as values
* for each element in the string (use a for loop for function return capability)
* if the Map has the element,
*   add it to the stack
* else,
*   if it matches it's partner
*   i.e. (if map.get(the last element) === the new element)
*     remove the last el from the stack, and don't add the new element
*   else
*     return false
* return true */

/* Note: my original solution worked for the given cases, but then I went hard
* with the new o4 mini AI model, which is SICK, and I just edited over everything.
* This new solution from AI has several things that I didn't have, like a separate
* Set for the openings; mine had just the map with the openings and closings. It
* had my switch them around, for very clear reading of the code.
* it also caught the parity check at the top, which I missed (and which still makes
* me think of the chessboard with Doug.)
* it also had me check for the stack being empty within the iteration, which would
* be the case when I get to closing char after all the opening chars have been
* accounted for.
* Also had me check for the length being zero at the end, to account for the case
* where some opening have been left over.
* Damn that was spicy. */

function areMatched(string) {
  if (string.length % 2 === 1) return false;

  const opening = new Set(['(','{','['])
  const closingToOpening = new Map([
    [')', '('],
    [']', '['],
    ['}', '{']
  ]);
  const stack = [];

  for (const char of string) {
    if (opening.has(char)) {
      stack.push(char);
    } else {
      if (stack.length === 0 || stack[stack.length - 1] !== closingToOpening.get(char)) {
        return false;
      }
      stack.pop();
    }
  }

  return stack.length === 0; // this checks that all brackets have been matched.
}

console.log(areMatched("()"));              // Output: true
console.log(areMatched("([()]{})"));        // Output: true
console.log(areMatched("([((}]({}))"));     // Output: false
console.log(areMatched("{{[[(())]]}}"));    // Output: true
console.log(areMatched(""));                // Output: true
console.log(areMatched("([)]"));            // Output: false







































