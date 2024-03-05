function lastInArray(arr) {
  console.log(arr[arr.length - 1]);
  return arr[arr.length - 1];
}

// lastInArray([1,2,3,4,5,6,7])

const NAMES = ['Steve', 'Martha', 'Pat'];

let rollCall = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}

// rollCall(NAMES)

function backwards(arr) {
  let result = [];

  for (let index = arr.length - 1; index >= 0; index -= 1) {
    result.push(arr[index]);
  }
  console.log(result);
  return result;
}

// backwards(NAMES);

function stringSquish(arr) {
  let result = '';
  for (let i = 0; i < arr.length; i++) {
    result += String(arr[i]);
  }
  console.log(result);
}

// stringSquish(NAMES);

function push(arr, element) {
  arr[arr.length] = element;
  return arr.length;
}

let count = [0, 1, 2];
// console.log(push(count, 3));         // 4
// console.log(count);                  // [ 0, 1, 2, 3 ]

function pop(arr) {
  if (array.length === 0) {
    return undefined;
  }

  let lastElement = arr[arr.length - 1];
  arr.length = arr.length - 1;
  return lastElement;
}

// count = [1, 2, 3];
// pop(count);             // 3
// count;                  // [ 1, 2 ]

function unshift(arr, value) {
  for (let index = arr.length; index > 0; index -= 1) {
      arr[index] = arr[index - 1];
  }
  arr[0] = value
  return arr.length;
}

// count = [1, 2, 3];
// console.log(unshift(count, 0));      // 4
// console.log(count);                  // [ 0, 1, 2, 3 ]

function shift(arr) {
  let firstElement = arr[0];
  for (let i = 0; i < arr.length - 1; i++) {
    arr[i] = arr [i + 1];
  }
  arr.length = arr.length - 1;
  return firstElement;
}

// count = [1, 2, 3];
// console.log(shift(count));           // 1
// console.log(count);                  // [ 2, 3 ]

function indexOf(arr, value) {
  for (let index = 0; index < arr.length; index++) {
    if (arr[index] === value) {
      return index;
    }
  }
  return -1;
}

indexOf([1, 2, 3, 3], 3);         // 2
indexOf([1, 2, 3], 4);            // -1

function lastIndexOf(arr, value) {
  for (let index = arr.length - 1; index >= 0; index -= 1) {
    if (arr[index] === value) {
      return index;
    }
  }
  return -1;
}

lastIndexOf([1, 2, 3, 3], 3);     // 3
lastIndexOf([1, 2, 3], 4);        // -1

function slice(arr, startIndex, endIndex) {
  let newArray = [];
  for (let index = startIndex; index < endIndex; index++) {
    push(newArray, arr[index]);
  }

  return newArray;
}

slice([1, 2, 3, 4, 5], 0, 2);                      // [ 1, 2 ]
slice(['a', 'b', 'c', 'd', 'e', 'f', 'g'], 1, 3);  // [ 'b', 'c' ]

/*
Write a function named splice that accepts three arguments: an Array, a
start index, and the number of values to remove. The function should remove
values from the original Array, starting with the start index and removing
the specified number of values. The function should return the removed values
 in a new Array.


 */
function splice(arr, startIndex, numberToRemove) {
  let splicedArray = []

  for (let index = startIndex; index < arr.length; index++) {
    if (index < startIndex + numberToRemove) {
      push(splicedArray, arr[index]);
    } else if (index >= startIndex + numberToRemove) {
      arr[index - numberToRemove] = arr[index];
    }
  }
  arr.length = arr.length - numberToRemove;
  return splicedArray
}

count = [1, 2, 3, 4, 5, 6, 7, 8];
// console.log(splice(count, 2, 5)); // == [ 3, 4, 5, 6, 7 ]);
// console.log(count);                                 // [ 1, 2, 8 ]

function concat(arr1, arr2) {
  let newArray = [];
  for (let index = 0; index < arr1.length; index++) {
    push(newArray, arr1[index]);
  }

  for (let index = 0; index < arr2.length; index++) {
    push(newArray, arr2[index]);
  }
  return newArray;
}

// console.log(concat([1, 2, 3], [4, 5, 6]));       // [ 1, 2, 3, 4, 5, 6 ]

function join(array, string) {
  let joinedString = '';

  for (let index = 0; index < array.length; index++) {
    joinedString += String(array[index]);
    if (index < array.length - 1) {
      joinedString += string;
    }
  }

  console.log(joinedString);
  return joinedString;
}

// join(['bri', 'tru', 'wha'], 'ck ');       // 'brick truck wha'
// join([1, 2, 3], ' and ');                 // '1 and 2 and 3'

function arraysEqual(firstArray, secondArray) {
  if (firstArray.length !== secondArray.length) {
    return false;
  }

  for (let index = 0; index < firstArray.length; index++) {
    if (firstArray[index] !== secondArray[index]) {
      // console.log(false)
      return false;
    }
  }
  // console.log(true)
  return true;
}

console.log(arraysEqual([1], [1]) === true);
console.log(arraysEqual([1], [2]) === false);
console.log(arraysEqual([1, 2], [1, 2, 3]) === false);
console.log(arraysEqual([1, 'hi', true], [1, 'hi', true]) === true);
console.log(arraysEqual([1, 'hi', true], [1, 'hi', false]) === false);
console.log(arraysEqual([1, 'hi', true], [1, 'hello', true]) === false);
console.log(arraysEqual([1, 'hi', true], [2, 'hi', true]) === false);






