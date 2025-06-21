// Write a function `reverseSegment` that reverses a segment
// of a singly linked list between two given positions,
// `start` and `end`. The function should take the head of
// the linked list and two integers, `start` and `end`, as
// input and return the modified list.

// The positions `start` and `end` are 1-indexed, and `start`
// is guaranteed to be less than or equal to `end`.

// The list is guaranteed to have at least one node, and `start`
// and `end` are guaranteed to be within the bounds of the list.

// Example:
// Input: head = [1, 3, 5, 7, 9], start = 2, end = 4
// Output: [1, 7, 5, 3, 9]
// Explanation: The segment from position 2 to 4 (3 -> 5 -> 7)
//              is reversed to (7 -> 5 -> 3).

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
/* This is some pretty spicy stuff!
* P: given a singly linked list and two well-behaved start and end indices,
* return the same list with the portion from start to end reversed.
* E: bae. the reversed portion can start at the beginning
* D: linked list, dummy variable, and maybe several to keep track of the end of
* the beginning and the beginning of the end
* A:
*
* dummy (0,null)
* let current = head
* let prev = dummy
* let index = 1
* let nextNode = null
*
* This portion moves through the part of the list before the start, traversing as usual
* while index < start
*   prev.next = curr;
*   prev = prev.next;
*   curr = curr.next;
*   index++;
*
* let leftConnectionPoint = previous
* let nodeToConnectToRightConnection = current
*
* Then, for the reversal, where the current node will eventually be connected to the
* rightConnection point, but that point we haven't reached yet...
*
*   while index <= end
*     nextNode = curr.next
*     curr.next = previous (this will be the wrong connection for the node at `start` but we'll correct it later)
*     prev = curr
*     curr = nextNode
*     index++;
* when I exit this second while, my current will be the first el of the rest of the list
* leftConnectionPoint.next = prev
* nodeToConnect.next = current
*
* return dummy.next
*
* */
function reverseSegment(head, start, end) {
  let dummy = new ListNode(0, null);
  let prev = dummy;
  let curr = head;
  let index = 1

  while (index < start) {
    prev.next = curr;
    prev = prev.next;
    curr = curr.next;
    index++;
  }

  let leftConnectionPoint = prev
  let nodeToConnectToRightConnection = curr
  let nextNode = null

  while (index <= end) {
    nextNode = curr.next;
    curr.next = prev;
    prev = curr;
    curr = nextNode;
    index++;
  }
  leftConnectionPoint.next = prev;
  nodeToConnectToRightConnection.next = curr;
  return dummy.next;
}
/* ~45 min? A long time! But I did it! No mistakes in the logic.
My growth areas are to
  write the algo in not-code language
  test more (at all) during the code writing


* */

let list1 = createLinkedList([1, 3, 5, 7, 9]);
let list2 = createLinkedList([1, 2, 3]);
let list3 = createLinkedList([1]);
let list4 = createLinkedList([1, 2, 3, 4, 5, 6]);
let list5 = createLinkedList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

printLinkedList(reverseSegment(list1, 2, 4)); // Expected: 1 -> 7 -> 5 -> 3 -> 9 -> null
printLinkedList(reverseSegment(list2, 1, 3)); // Expected: 3 -> 2 -> 1 -> null
printLinkedList(reverseSegment(list3, 1, 1)); // Expected: 1 -> null
printLinkedList(reverseSegment(list4, 3, 5)); // Expected: 1 -> 2 -> 5 -> 4 -> 3 -> 6 -> null
printLinkedList(reverseSegment(list5, 4, 7)); // Expected: 1 -> 2 -> 3 -> 7 -> 6 -> 5 -> 4 -> 8 -> 9 -> 10 -> null