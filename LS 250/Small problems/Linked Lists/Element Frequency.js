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

function linkedListToArray(head) {
  let result = [];
  while (head) {
    result.push(head.val);
    head = head.next;
  }
  return result;
}

function testFrequencyList(input, expected) {
  let result = linkedListToArray(createFrequencyList(createLinkedList(input)));
  if (result.length !== expected.length) return false;
  let freq1 = new Map(), freq2 = new Map();
  for (let num of result) freq1.set(num, (freq1.get(num) || 0) + 1);
  for (let num of expected) freq2.set(num, (freq2.get(num) || 0) + 1);
  if (freq1.size !== freq2.size) return false;
  for (let [key, value] of freq1) {
    if (freq2.get(key) !== value) return false;
  }
  return true;
}

/* P: given a list where the values are integers, return a new list such that
* the values represent the frequency of values in the given list.
* Order doesn't matter for the returned list.
* E: BAE;
*   the order of the first list doesn't matter (not ordered)
*   no min size
*   it makes sense that the size of the new list is the count of distinct values in the first list
* D: linked lists, and a Map()
* A:
* generally:
*   traverse the first list, creating a tally with the Map object
*   then make a new list using the values from the Map
*
* specifically: given list
* current = list
* init new Map()
* while (current)
*   if map has the current value
*     tally the value
*     increment the current
*   else
*     create the value in the map, set it to 1
*
* then!
* use the create linked list helper with the output of Map.values -- nope
* it turns out I'm not supposed to do that. I'm only supposed to use the list node
* see below for updated pedac
* */

function createFrequencyListFD(head) {
  let current = head;
  let frequency = new Map();

  while (current) {
    if (frequency.has(current.val)) {
      frequency.set(current.val, frequency.get(current.val) + 1);
    } else {
      frequency.set(current.val, 1);
    }
    current = current.next;
  }

// used linked list helper, whoops

}

/* Ok not a shitshow, I quickly identified the use of a Map() that would help,
* so this took < 16 min.
* however, I had to look up how to use it
* I relearned that .entries, .values, .keys etc return a map iterator, but NOT
* an array; in order to get an array I have to use Array.from(iterator_returned_from_map_mathod)
* or I can also spread the iterator into an array literal.
* use has to check if it exists, use set(key, value) to set or reset the value
* of a key.
* There is a more idiomatic way to tally:

function increment(map, key) {
  map.set(key, (map.get(key) ?? 0) + 1);
}
*
* Also whoops, wasn't supposed to use createLinkedList. Do with just the node function.
*  soo...
* with the frequency Map
* I saw that I should use a dummy. Any time I need to return a different head
* than the original, use a dummy
*
* so here, use a dummy, value whatever
* current = dummy
* then for each value in the map
*   create node and set it to the next one
*   increment the current
*
* return the dummy.next
*
function ListNode(val) {
  this.val = val;
  this.next = null;
}
*  */

function createFrequencyList(head) {
  let current = head;
  let frequency = new Map();

  while (current) {
    frequency.set(current.val, (frequency.get(current.val) ?? 0) + 1);
    current = current.next;
  }

  let dummy = new ListNode(0);
  current = dummy;
  for (const count of frequency.values()) {
    current.next = new ListNode(count);
    current = current.next;
  }

  return dummy.next;
}

// Test cases
console.log(testFrequencyList([1, 1, 2, 1, 3], [3, 1, 1]));
console.log(testFrequencyList([1, 1, 2, 2, 2], [2, 3]));
console.log(testFrequencyList([6, 5, 4, 3, 2, 1], [1, 1, 1, 1, 1, 1]));
console.log(testFrequencyList([4, 4, 4, 4], [4]));
console.log(testFrequencyList([1, 2, 3, 4, 5], [1, 1, 1, 1, 1]));
console.log(testFrequencyList([], []));
console.log(testFrequencyList([1, 1, 1], [3]));
console.log(testFrequencyList([1, 2, 1, 2, 1, 2], [3, 3]));
// All test cases should log true.