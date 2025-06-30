

//Given the head of a sorted singly linked list, modify the list in place such that each element appears at most twice, and return the head of the updated list.


class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Convert an array to a linked list
function createLinkedList(arr) {
  if (!arr.length) return null;
  let head = new ListNode(arr[0]);
  let current = head;
  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }
  return head;
}

// Convert a linked list back to an array
function linkedListToArray(head) {
  let result = [];
  while (head) {
    result.push(head.val);
    head = head.next;
  }
  return result;
}

// Helper to test your solution
function testRemoveDuplicates(arr) {
  const head = createLinkedList(arr);
  const result = removeDuplicates(head);
  console.log(linkedListToArray(result));
}
/*
P: given a head, return the list with each node recurring no more than 2 times (remove duplicates beyond 2 occurances)
e: BAE
D: LL, prevNode
A:
if head is null, return null;
firstDuplicateFound = false
curr is the head
prevNode = null; (don't need dummy, because the first node will become previous in the first iteration regardless)

while (curr)
case one, the node is not a duplicate of the previous node
  if the current value is not equal to the previous value
    if firstDuplicateFound is true
      firstDuplicateFound = false
      connect the previous node to the current node
    move on
      prev becomes the current
      current becomes the curr.next
case 2: the node is the first duplicate of the previous node
  else if the current node value is equal to the previous value AND firstDuplicateFound is false
    firstDuplicateFound = true (triggers deleteland)
    move on but into delete land
      prev becomes current
      current becomes current next
case 3: the node is a duplicate beyond the first duplicate
  else (implies that we're in delete land)
    delete all instances of these duplicates,
    prev stay the same (don't change)
    current = curr.next

return the head
*/

function removeDuplicates(head) {
  if (head === null) return null;
  let firstDuplicateFound = false;
  let curr = head;
  let dummy = new ListNode('dummy', head)
  let prev = dummy;

  while (curr) {
    if (curr.val !== prev.val) {
      if (firstDuplicateFound) {
        firstDuplicateFound = false;
        prev.next = curr;
      }
      prev = curr;
    } else if (curr.val === prev.val && firstDuplicateFound === false) {
      firstDuplicateFound = true;
      prev = curr;
    }
    curr = curr.next
  }
  prev.next = null;

  return dummy.next;
}

console.log(testRemoveDuplicates([1, 1, 1, 2, 2, 3]))
// Expected: [1, 1, 2, 2, 3]

console.log(testRemoveDuplicates([0, 0, 0, 0]))
// Expected: [0, 0]

console.log(testRemoveDuplicates([1, 2, 3, 3, 3, 4]))
// Expected: [1, 2, 3, 3, 4]

console.log(testRemoveDuplicates([]))
// Expected: []

console.log(testRemoveDuplicates([5]))
// Expected: [5]

console.log(testRemoveDuplicates([1, 1, 2, 2, 2, 3, 3, 3]))
// Expected: [1, 1, 2, 2, 3, 3]


/* Zane's nice way to write out lists and keep track of the pointers. I'll def
use this in the assessment.

([1, 1, 1, 2, 2, 3]))   [1, 1, 2, 2, 3]

 0 - 1 - 1 - 1 - 2 - 2 - 3
 c   n   nn

 c.next = nn
 1 - 1 - 2 - 2  - 3
 c   n.  nn

 dont all match move forward



*/