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
  let current = head;
  let listStr = '';
  while (current !== null) {
    listStr += current.val + ' -> ';
    current = current.next;
  }
  listStr += 'null';
  console.log(listStr);
}

/* This is a cool problem, sort of two-pointers plus linked lists. This is what I would
* expect on the assessment.
* P: given two sorted LL's, return a single LL that is also sorted.
* E: BAE, though neither list has repeats, but I should write a solution for that.
* D: LL and Two Pointers
* A:
* first and second pointers, for the current node on each list
* initialize current for the current of the new list
* compare the two first elements, the smaller of the two becomes the head
*   then compare the smallest (current) to its next element, and the current element
*     on the other list
*   link current to the smaller of the two
*   advance current, advance the corresponding list
*   keep comparing the current to it's next current and the other list's next
*
* given head 1 and head 2
* let current;
* let a = head 1
* let b = head 2
* let newHead = the smaller of the two heads
*
* while (a OR b) // remember that Number(null) === 0
* if a less than b

*   current = a
* else
*
*   current = b
*
* return head
*
*
* Ok after 45 min this has been a shit show.
* I guess my PEDAC was shit.
* I am having the problem with accessing .val on null. When one of the values a
* or b hits null, I need to only do
* */

// FUCKING NIGHTMARE
function mergeSortedListsShitShow(head1, head2) {
  let a = head1;
  let b = head2;
  let newHead;
  let current;

  while (a || b) {
    if (!newHead) {
      newHead = current = a.val < b.val ? a : b;
      if (a === newHead) {
        a = a.next;
      } else {
        b = b.next;
      }
    }

    if (!a) {
      current.next = b;
      current = b;
      b = b.next;
      continue
    }

    if (!b) {
      current.next = a
      current = a
      a = a.next;
      continue
    }

      console.log('a:',a,'b:', b)

    if (a.val < b.val) {
      current.next = a
      current = a
      a = a.next;
    } else {
      current.next = b;
      current = b;
      b = b.next;
    }
  }
  return newHead
}

/* What an absolute shit show.
I never got a working solution.
I was doing so much, and so much apparently close to what they were doing.

the key differences are:
  they "soak up" the head logic with the dummy node: dummy node -> build ->
    return dummy.next at the end.
  they have a single loop for 2 non-null lists, and then after one runs out,
    they just append the rest of the whole non-null list at the end.
  their loop sets current.next in the if-branch, but then sets current to
    current.next at the end of each iteration, outside the if-branch.

    BURN.
*/

function mergeSortedLists(list1, list2) {
  let dummy = new ListNode(0);
  let current = dummy;

  while (list1 && list2) {
    if (list1.val < list2.val) {
      current.next = list1;
      list1 = list1.next
    } else {
      current.next = list2;
      list2 = list2.next
    }
    current = current.next;
  }
  // appends the rest of the non-null list to the end of the new-build.
  current.next = list1 === null ? list2 : list1;

  return dummy.next;
}



let list1 = createLinkedList([1, 3, 5]);
let list2 = createLinkedList([2, 4, 6]);
printLinkedList(mergeSortedLists(list1, list2)); // Expected: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> null

let list3 = createLinkedList([1, 2, 3]);
let list4 = createLinkedList([]);
printLinkedList(mergeSortedLists(list3, list4)); // Expected: 1 -> 2 -> 3 -> null

let list5 = createLinkedList([]);
let list6 = createLinkedList([1]);
printLinkedList(mergeSortedLists(list5, list6)); // Expected: 1 -> null

let list7 = createLinkedList([1, 5, 9]);
let list8 = createLinkedList([2, 4, 6, 8, 10]);
printLinkedList(mergeSortedLists(list7, list8)); // Expected: 1 -> 2 -> 4 -> 5 -> 6 -> 8 -> 9 -> 10 -> null

let list9 = createLinkedList([1, 2, 5]);
let list10 = createLinkedList([3, 6, 7]);
printLinkedList(mergeSortedLists(list9, list10)); // Expected: 1 -> 2 -> 3 -> 5 -> 6 -> 7 -> null