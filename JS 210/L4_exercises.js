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

// console.log(arraysEqual([1], [1]) === true);
// console.log(arraysEqual([1], [2]) === false);
// console.log(arraysEqual([1, 2], [1, 2, 3]) === false);
// console.log(arraysEqual([1, 'hi', true], [1, 'hi', true]) === true);
// console.log(arraysEqual([1, 'hi', true], [1, 'hi', false]) === false);
// console.log(arraysEqual([1, 'hi', true], [1, 'hello', true]) === false);
// console.log(arraysEqual([1, 'hi', true], [2, 'hi', true]) === false);

/*
Assignment 9: Basic Array Uses
 */

function firstElementOf(arr) {
  return arr[0];
}

// firstElementOf(['U', 'S', 'A']);  // returns "U"

function lastElementOf(arr) {
  console.log(arr[arr.length - 1]);
  return (arr[arr.length - 1]);
}

// lastElementOf(['U', 'S', 'A']);  // returns "A"

function nthElementOf(arr, index) {
  return arr[index];
}

let digits = [4, 8, 15, 16, 23, 42];

// nthElementOf(digits, 3);   // returns 16
// nthElementOf(digits, 8);   // what does this return?  undefined
// nthElementOf(digits, -1);  // what does this return? undefined

function firstNOf(arr, count) {
  return arr.slice(0, count);
}

// let digits = [4, 8, 15, 16, 23, 42];
// firstNOf(digits, 3);    // returns [4, 8, 15]

function lastNOf(arr, count) {
  if (count > arr.length) {
    console.log(arr.slice(0))
    return arr.slice(0)
  }
  console.log(arr.slice(arr.length - count));
  return arr.slice(arr.length - count);
}

digits = [4, 8, 15, 16, 23, 42];
// lastNOf(digits, 1 + 6);
// lastNOf(digits, 2 + 6);
// lastNOf(digits, 3 + 6);
// lastNOf(digits, 4 + 6);
// lastNOf(digits, 5 + 6);
// lastNOf(digits, 6 + 6);
// lastNOf(digits, 7 + 6);
//
// console.log(digits.slice(-2));

/*
interesting note about this solution is that by adding the length to any count
will actually solve the issue that resetting the index to 0 accomplishes above.
 */

function endsOf(beginningArr, endingArr) {
  let dunk = [beginningArr[0], endingArr[endingArr.length - 1]];
  console.log(dunk);
  return dunk;
}

// endsOf([4, 8, 15], [16, 23, 42]);  // returns [4, 42]

// Assignment 10: Intermediate

function oddElementsOf(arr) {
  let oddIndicesArray = [];
  for (let index = 0; index < arr.length; index++) {
    if (index % 2 === 1) {
      oddIndicesArray.push(arr[index]);
    }
  }
  console.log(oddIndicesArray);
  return oddIndicesArray;
}

digits = [4, 8, 15, 16, 23, 42];

// oddElementsOf(digits);    // returns [8, 16, 42]

function forwardsBackwards(arr) {
  // for (let index = arr.length - 1; index >= 0; index -= 1) {
  //   arr.push(arr[index]);
  // }
  console.log(arr.concat(arr.slice().reverse()));
  return arr.concat(arr.slice().reverse());
}

// forwardsBackwards(digits);

function sortDescending(arr) {
  return arr.slice().sort().reverse();

  /* Their solution:
  let arrCopy = arr.slice();
  return arrCopy.sort((a, b) => b - a);  // Notice that function expressions can be passed as an argument.
   */

}

// let array = [23, 4, 16, 42, 8, 15];
// let result = sortDescending(array);
// console.log(result);                 // logs    [42, 23, 16, 15, 8, 4]
// console.log(array);                  // logs    [23, 4, 16, 42, 8, 15]

function matrixSums(arr) {
  let resultArray = []
  for (let i = 0; i < arr.length; i++) {
    let sum = 0
    for (let j = 0; j < arr[i].length; j++) {
      sum += arr[i][j];
    }
    resultArray.push(sum);
  }
  console.log(resultArray);
  return resultArray;
}

// matrixSums([[2, 8, 5], [12, 48, 0], [12]]);  // returns [15, 60, 12]

function uniqueElements(arr) {
  let uniqueArray = []

  for (let i = 0; i < arr.length; i++) {
    let match = false;

    for (let j = 0; j < uniqueArray.length; j++) {
      if (arr[i] === uniqueArray[j]) {
        match = true;
        break;
      }
    }

    if (!match) {
      uniqueArray.push(arr[i]);
    }
  }
  console.log(uniqueArray);
}

/* Their solution:
function uniqueElements(arr) {
  let uniques = [];
  let len = arr.length;

  for (let index = 0; index < len; index += 1) {
    if (uniques.indexOf(arr[index]) === -1) {
      // if the element doesn't have an index, -1 is returned. I agree this is
      // more smooth.
      uniques.push(arr[index]);
    }
  }

  return uniques;
}
 */

// uniqueElements([1, 2, 4, 3, 4, 1, 5, 4]);  // returns [1, 2, 4, 3, 5]
// uniqueElements([10, 1, 10, 10, 2, 4, 3, 4, 1, 5, 4]);

// Assignment 11: find missing numbers

function missing(arr) {
  let first = arr[0];
  let last = arr[arr.length - 1];
  let missingElements = [];

  for (let candidate = first; candidate < last; candidate++) {
    if (arr.indexOf(candidate) === -1) {
      missingElements.push(candidate);
    }
  }

  console.log(missingElements);
}

missing([-3, -2, 1, 5]);                  // [-1, 0, 2, 3, 4]
missing([1, 2, 3, 4]);                    // []
missing([1, 5]);                          // [2, 3, 4]
missing([6]);                             // []




















