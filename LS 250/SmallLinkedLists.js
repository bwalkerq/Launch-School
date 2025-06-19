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

function countKeyOccurrences(head, target) {
  if (!head) return 0;

  let count = 0;
  let current = head;
  let next = current.next;

  while (current) {
    if (current.val === target) {
      count++;
    }
    current = next;
    next = current ? current.next : null;
  }

  return count
}

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

let list1 = createLinkedList([1, 2, 1, 2, 1, 3, 1]);
let list2 = createLinkedList([4, 4, 4, 4]);
let list3 = createLinkedList([1, 2, 3, 4, 5]);
let list4 = createLinkedList([5, 5, 1, 2, 3, 5, 5]);
let list5 = createLinkedList([]);
let list6 = createLinkedList([1, 2, 3, 1, 1]);

console.log(countKeyOccurrences(list1, 1) === 4);
console.log(countKeyOccurrences(list2, 4) === 4);
console.log(countKeyOccurrences(list3, 1) === 1);
console.log(countKeyOccurrences(list4, 5) === 4);
console.log(countKeyOccurrences(list5, 1) === 0);
console.log(countKeyOccurrences(list6, 1) === 3);

// All test cases should log true.