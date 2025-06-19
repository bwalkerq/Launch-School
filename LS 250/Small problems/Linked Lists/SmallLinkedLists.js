/* P: given a linked list and a target, return the number of occurrences of that target
E: BAE - each one just scans through the whole thing and returns the count
D: LL, feels straightforward
A:
initialize count = 0
let current = head
let next = current.next

while (current)
  if current.val === target
    increment counter
  current = current.next
  next = current.next
* */

function countKeyOccurrencesFD(head, key) {
  if (!head) return 0;

  let count = 0;
  let current = head;

  // first draft -- I didn't know you could do this in a for loop
  while (current) {
    if (current.val === key) {
      count++;
    }
    current = current.next;
  }

  return count
}

function countKeyOccurrences(head, key) {
  let count = 0;
  for (let node = head; node != null; node = node.next) {
    if (node.val === key) count ++;
  }
  return count
}

// function ListNode(val) {
//   this.val = val;
//   this.next = null;
// }
//
// function createLinkedList(arr) {
//   let head = new ListNode(0);
//   let current = head;
//   arr.forEach(val => {
//     current.next = new ListNode(val);
//     current = current.next;
//   });
//   return head.next;
// }
//
// let list1 = createLinkedList([1, 2, 1, 2, 1, 3, 1]);
// let list2 = createLinkedList([4, 4, 4, 4]);
// let list3 = createLinkedList([1, 2, 3, 4, 5]);
// let list4 = createLinkedList([5, 5, 1, 2, 3, 5, 5]);
// let list5 = createLinkedList([]);
// let list6 = createLinkedList([1, 2, 3, 1, 1]);
//
// console.log(countKeyOccurrences(list1, 1) === 4);
// console.log(countKeyOccurrences(list2, 4) === 4);
// console.log(countKeyOccurrences(list3, 1) === 1);
// console.log(countKeyOccurrences(list4, 5) === 4);
// console.log(countKeyOccurrences(list5, 1) === 0);
// console.log(countKeyOccurrences(list6, 1) === 3);

// All test cases should log true.

// remove duplicates
/* P: given an ordered list with duplicates, remove the duplicates and return
the head of the modified list.
E: BAE, the duplicates can occur anywhere
D: LL, baby
A:
while our current node (is not null)
  if the val is equal to the next val
    skip the node in the next slot
  else
    move up the current and the next

let current
while current
  if the current val equals the next val
    set current's next property to next's next property
  else
    current = next
return head
* */
function deleteDuplicates(head) {
  if (!head) return head;
  let current = head;
  while (current.next) {
    if (current.val === current.next.val) {
      current.next = current.next.next;
    } else
      current = current.next
  }
  return head
}

// 9:30 - felt easy...too..easy.
/*Nothing too much to say about this easy one.
* */


function ListNode(val) {
  this.val = val;
  this.next = null;
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

function printLinkedList(head) {
  let currentNode = head;
  let listStr = '';
  while (currentNode !== null) {
    listStr += currentNode.val + ' -> ';
    currentNode = currentNode.next;
  }
  listStr += 'null'; // Indicate the end of the list
  console.log(listStr);
}

let list1 = createLinkedList([1, 1, 2]);
let list2 = createLinkedList([1, 1, 2, 3, 3]);
let list3 = createLinkedList([1, 2, 3, 3, 4]);
let list4 = createLinkedList([2, 2, 2, 3, 3]);
let list5 = createLinkedList([5]);

printLinkedList(deleteDuplicates(list1)); // Expected: "1 -> 2 -> null"
printLinkedList(deleteDuplicates(list2)); // Expected: "1 -> 2 -> 3 -> null"
printLinkedList(deleteDuplicates(list3)); // Expected: "1 -> 2 -> 3 -> 4 -> null"
printLinkedList(deleteDuplicates(list4)); // Expected: "2 -> 3 -> null"
printLinkedList(deleteDuplicates(list5)); // Expected: "5 -> null"


























