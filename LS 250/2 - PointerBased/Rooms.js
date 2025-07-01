// Write a function `rooms` that determines the minimum number of
// rooms required to handle a series of interviews given their
// time intervals.

// Each interval is represented as an array [start, end],
// where `start` is the start time and `end` is the end
// time of the interview.

// The function should return the number of conference rooms
// required to ensure no two interviews overlap in the same room.

// Example I:
// Input: intervals = [[20, 25], [10, 15], [0, 25]]
// Output: 2
// Explanation: The first interview is scheduled from
//              time 0 to 25. The second interview is
//              from time 10 to 15 and overlaps with
//              the first interview, requiring a second
//              room. The third interview from 20 to 25
//              also overlaps with the first. Thus, a
//              minimum of two rooms are required.

// Example II:
// Input: intervals = [[5, 9], [1, 3]]
// Output: 1
// Explanation: The first interview is scheduled from
//              time 5 to 9. The second interview is
//              from time 1 to 3. These two interviews
//              do not overlap, therefore only one
//              conference room is needed.

/* Given an unordered nested list of start and end times, determine the min
* number of rooms that is necessary for all the scheduled intervals. return an integer.
* E:
* It makes sense to sort the interviews by start time,
* for two pointers, there may be a separate pair of pointers for start times and end times.
* I really want to sort the array...
* in a sorted one, we can do anchor runner
* [[1, 3], [3, 6], [6, 8]]
*   a  r
* we need to account for 3 potentially showing up as end time in a later pair than where it shows up as a start time
* this would be easier with two lists and two pairs of anchor/runners
* A:
* store all the start times in an array
* same for end times
* sort them
* proceed through the lists, handling the next lowest element (if there are even elements, process
* the end time first, because frees up a room first)
* each time we process a start time, rooms++ (replace greatest if applicable),
* each process of an end time rooms --
* return greatest
* (this isn't two pointers, but it would work.
* */

// Ok this solution worked, but wasn't really two pointers.
function roomsFD(intervals) {
  let startTimes = [];
  let endTimes = [];
  let greatest = 0;

  for (const interval of intervals) {
    startTimes.push(interval[0]);
    endTimes.push(interval[1]);
  }

  startTimes.sort((a, b) => a - b);
  endTimes.sort((a, b) => a - b);

  let rooms = 0;
  let endPointer = 0;
  let startPointer = 0
  while (endPointer < endTimes.length && startPointer < startTimes.length) {
    let start = startTimes[startPointer];
    let end = endTimes[endPointer];
    if (end <= start) {
      rooms--;
      endPointer++;
    } else {
      rooms++;
      greatest = Math.max(rooms, greatest);
      startPointer++;
    }
  }
  return greatest;
}
// 25 min

/* If I wanted to do it more of a pure two pointers situation, without separate queues, and without sorting...
TURNS OUT I DID IT THE OPTIMAL WAY, I AM SMART GET PSYCHED!!!!!!!!
* */

// Test Cases:

console.log(rooms([[20, 25], [10, 15], [0, 25]]) === 2);
console.log(rooms([[5, 9], [1, 3]]) === 1);
console.log(rooms([[1, 2], [3, 4], [5, 6]]) === 1);
console.log(rooms([[1, 4], [2, 5], [3, 6]]) === 3);
console.log(rooms([[1, 3], [3, 6], [6, 8]]) === 1);
console.log(rooms([[1, 10]]) === 1);
console.log(rooms([[1, 3], [2, 4], [4, 6]]) === 2);
console.log(rooms([[1, 5], [2, 3], [4, 6], [5, 7]]) === 2);
console.log(rooms([[0, 5], [1, 3], [2, 6], [4, 7], [5, 9], [8, 10]]) === 3);
console.log(rooms([[1, 2], [2, 3], [3, 4], [4, 5]]) === 1);
console.log(rooms([[1, 20], [5, 10], [11, 15], [16, 18]]) === 2);
console.log(rooms([[1, 4], [1, 3], [1, 2], [1, 5]]) === 4);
// All test cases should log true