function ListNode(val) {
  this.val = val;
  this.next = null;
}

function createLinkedList(arr, cyclePos) {
  let head = new ListNode(0);
  let current = head;
  let cycleNode = null;

  arr.forEach((val, index) => {
    current.next = new ListNode(val);
    current = current.next;
    if (index === cyclePos) {
      cycleNode = current;
    }
  });

  if (cycleNode) {
    current.next = cycleNode;
  }

  return head.next;
}

let list1 = createLinkedList([3, 2, 0, -4], 1);
let list2 = createLinkedList([1, 2], 0);
let list3 = createLinkedList([1], -1);
let list4 = createLinkedList([10, 20, 30, 40, 50, 60], 3);
let list5 = createLinkedList([5, 15, 25, 35, 45], -1);

/* P: this seems spicy! given a linked list, which is either singly linked list
* or a circular LL, return true if it's circular, else false.
* E: BAE, though it took a long time to discern how they are creating the circular
* list.
* The question for me is how can we determine a pattern is circular rather than
* just happenstance, or just repetition? We'd have to add a property to each,
* which is perhaps not the way to go about this, but it would definitely work.
* update! don't do that--I asked LS bot.
*
* If I kept track of a pattern of values, and returned if I hit that pattern
* again, is that enough? would I have to hit the pattern twice?
*
* wow, no at 14 min I looked at the hint, and I don't think I would have come
* up with that! two pointers, fast and slow! ach!
* A:
* let fast = head
* let slow = head
* while fast
*   increment the slow, and the fast by two
*   if the two nodes equal,
*     return true
* return false
* */

function hasCycleFD(head) {
  let fast = head;
  let slow = head;

  while (fast) {
    if (!fast.next) return false;
    fast = fast.next ? fast.next.next : null;
    slow = slow.next;
    if (fast === slow) {
      return true
    }
  }
  return false;
}

// 18 min, minor changes

function hasCycle(head) {
  let fast = head;
  let slow = head;

  while (fast && fast.next) {
    fast = fast.next ? fast.next.next : null;
    slow = slow.next;
    if (fast === slow) {
      return true
    }
  }
  return false;
}

console.log(hasCycle(list1)); // true
console.log(hasCycle(list2)); // true
console.log(hasCycle(list3)); // false
console.log(hasCycle(list4)); // true
console.log(hasCycle(list5)); // false

console.log(list3)
// console.log(list2.next.next.next)