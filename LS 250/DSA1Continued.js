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

printLinkedList(removeEverySecondNode(list1)); // Expected: 1 -> 3 -> 5 -> null
printLinkedList(removeEverySecondNode(list2)); // Expected: 1 -> null
printLinkedList(removeEverySecondNode(list3)); // Expected: 1 -> null
printLinkedList(removeEverySecondNode(list4)); // Expected: 1 -> 3 -> null
printLinkedList(removeEverySecondNode(list5)); // Expected: null