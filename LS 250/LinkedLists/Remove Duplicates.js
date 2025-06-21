// Write a function `removeDuplicates` that removes all
// nodes with duplicate values from a sorted linked list,
// leaving only distinct values from the original list.
// The function should take the head of the sorted linked
// list as input and return the modified list. The list
// should remain sorted after removing duplicates. If the
// list becomes empty after removing all duplicates,
// return null.

// Example:
// Input: head = [1, 2, 2, 3, 3, 4, 5, 5]
// Output: [1, 4]
// Explanation: The values 2, 3, and 5 appear multiple times, so
//              they are removed. Only 1 and 4 remain as unique
//              values.

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
/* P: This is a unique problem from the last duplicate-related LL problem.
* Here, we remove an element entirely if it's duplicated.
* so given a LL, remove all instances of any value that is repeated at least once
* and return the list with the single values. If all values were originally repeated,
* return null.
* E: note that the repeated elements may be at the start, middle, or end.
* D: linked lists...
*
* A:
* Note that I will use a dummy node since I may return a different head (if the
* head is repeated)
* make a dummy
* make current = dummy
*
* iterate through the list (while current)
*   look at the next element and remember its value
*   if the next  is not the same as the current)
*     connect the current next prop to the next node
*     set current variable to the next node
*   else (if the next value is the same,)
*     we gotta remove the next and all other instances, so go until we find a
*       different value and then link the current to that one with the different value
*
* More specifically:
* let dummy = new node with negative value or 'dummy' as a value
* dummy.next = head
* let current = head
* let previous = dummy
*
* while current, check if the current has duplicates, and if so, remove all cases by connecting to previous
*   if current val is not equal to the next val
*     previous = previous.next
*     current = current.next
*   else (meaning that the current value is duplicated and it has to be removed)
*     while (current val === next val)
*       current = current next
*     once it breaks out of this while loop, that means our current is the last instance of the duplicate
*     so, previous.next = current.next
*     current = current.next
*
* return dummy.next
* */

function removeDuplicatesFD(head) {
  let dummy = new ListNode('dummy', head);
  let current = head;
  let previous = dummy;

  while (current && current.next) {
    if (current.val !== current.next.val) {
      previous = previous.next;
      current = current.next;
    } else {
      while (current.val === current.next ? current.next.val : null) {
        current = current.next;
      }
      previous.next = current.next;
      current = current.next;
    }
  }
  return dummy.next;
}
/* 29 minutes, but it was a false success, whoops. Grandpa arrived and I got
distracted, so I had actually written something that worked for the previous
remove duplicates problem. but not this one.
Also, I wrote a totally wrong condition in the while loop, one that
apparently deletes one wrong node at a time, and would eventually blow up. dang
let's try again:

while current
  if the current val is equal to the next val
    while current.next && curr.val === curr.next.val
      curr = curr.next
    previous.next = curr.next
    curr = curr.next
  else (meaning curr val not equal to the next val
    [make this more step-by-step]
    previous.next = curr
    previous = previous.next
    curr = curr.next

  return dummy.next;

Finally a success
* */
function removeDuplicates(head) {
  let dummy = new ListNode(0, null);
  let previous = dummy;
  let current = head;

  while (current) {
    if (current.next && current.val === current.next.val) {
      const duplicateVal = current.val;
      while (current && current.val === duplicateVal) {
        current = current.next;
      }
      previous.next = current;
    } else {
      previous.next = current;
      previous = previous.next;
      current = current.next;
    }
  }
  return dummy.next;
}

let list1 = createLinkedList([1, 2, 2, 3, 3, 4, 5, 5]);
let list2 = createLinkedList([1, 1, 1, 2, 3]);
let list3 = createLinkedList([1, 2, 3, 4, 5]);
let list4 = createLinkedList([1, 1, 1, 1, 1]);
let list5 = createLinkedList([1, 2, 2, 3, 3, 3, 4, 4, 5, 5, 5]);

printLinkedList(removeDuplicates(list1)); // Expected: 1 -> 4 -> null
printLinkedList(removeDuplicates(list2)); // Expected: 2 -> 3 -> null
printLinkedList(removeDuplicates(list3)); // Expected: 1 -> 2 -> 3 -> 4 -> 5 -> null
printLinkedList(removeDuplicates(list4)); // Expected: null
printLinkedList(removeDuplicates(list5)); // Expected: 1 -> null