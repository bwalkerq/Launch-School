const fs = require('fs');

const content = fs.readFileSync('input.txt', "utf-8");

/*
P:
for a bunch of reports of varying levels
determine the number of safe reports
  safe means
    numbers are either all descending or all ascending
    and the increment size (differences) between adjacent numbers is 3, 2, or 1
    no repeating numbers (increment size would be 0)

E:
make sense to me

D:
arrays

A:
take all the text, put each report in its own array
for each subarray
  if ascending safe OR descending safe
    increment safe counter
return safe counter

ascending safe helper:
For each but the last entry in the array
  if the next minus the current is greater than 0 and less than 4 return true

descending safe helper:
same but current minus next
 */

function linesToArrayOfIntegers(content) {
  let lines = content.split('\n');
  lines = lines.map(el => {
    return el.split(' ').map(str => Number.parseInt(str, 10));
  })
  return lines;
}

let input = linesToArrayOfIntegers(content);

function partOne(array) {
  let safeCounter = 0;
  for (const arrayElement of array) {
    if (safeDescending(arrayElement)[0] || safeAscending(arrayElement)[0]) {
      safeCounter++;
    }
  }
  console.log(safeCounter);
  return safeCounter;
}

function safeDescending(array) {
  for (let i = 0; i < array.length - 1; i++) {
    let diff = array[i] - array[i + 1]; // current minus next
    if (!(diff > 0 && diff < 4)) {
      return [false, i];
    }
  }
  return [true];
}

function safeAscending(array) {
  for (let i = 0; i < array.length - 1; i++) {
    let diff = array[i+1] - array[i]; // next minus current
    if (!(diff > 0 && diff < 4)) {
      return false;
    }
  }
  return [true];
}

// partOne(input)

/*
P: problem one, with the allowance of one level to be removed in order to make it safe.

E:
now, what can be safe are:
  reports with a single repeating level
  reports with a single inc/dec when otherwise dec/inc
  reports that have a single large difference
All of these can be caught with the difference compound inequality

D:
still arrays

A:
exception counter starts at 0
for each el in a subarray
  if safe
    increment counter
  else
    create a spliced copy (thanks Clare)
    if spliced passes
      increment safe
return safe counter



 */

function partTwo(list) {
  let safeCounter = 0;
  for (const report of list) {
    if (isSafe(report)) {
      safeCounter++;
      console.log(report)
    } else {
      for (let i = 0; i < report.length; i++) {
        let modified = report.filter( (_,idx) => idx !== i);
        console.log(modified)

        if (isSafe(modified)) {
          safeCounter++;
        }
      }
    }
  }
  console.log(safeCounter);
}

// partTwo(input)
let example = [
[7, 6, 4, 2, 1],
[1, 2, 7, 8, 9],
[9, 7, 6, 2, 1],
[1, 3, 2, 4, 5],
[8, 6, 4, 4, 1],
[1, 3, 6, 7, 9],
]
partTwo(example)


function isSafe(array) {
  return safeDescending(array) ||safeAscending(array)
}



















