const dms = (angleNumber) => {
  while (angleNumber < 0 ) {
    angleNumber += 360;
  }
  angleNumber %= 360;
  let degrees = Math.floor(angleNumber / 1);

  let minutes = Math.floor(angleNumber % 1 * 60);
  minutes = String(minutes).padStart(2, 0);

  let seconds = Math.floor(angleNumber % 1 * 60 % 1 * 60 );
  seconds = String(seconds).padStart(2, 0);

  console.log(`${degrees}\°${minutes}\'${seconds}\"`);
}

// dms(30);           // 30°00'00"
// dms(76.73);        // 76°43'48"
// dms(254.6);        // 254°35'59"
// dms(93.034773);    // 93°02'05"
// dms(0);            // 0°00'00"
// dms(360);          // 360°00'00" or 0°00'00"

// dms(-1);   // 359°00'00"
// dms(400);  // 40°00'00"
// dms(-40);  // 320°00'00"
// dms(-420); // 300°00'00"

// union([1, 3, 5], [3, 6, 9]);    // [1, 3, 5, 6, 9]
// union([1, 3, 5], [3, 6, 9], [9,10]);    // [1, 3, 5, 6, 9, 10]

function union(...args) {
  let result = [];
  args.forEach( arr => copyNonDupsTo(result, arr));
  console.log(result);
  return result;
}

function copyNonDupsTo(resultArr, arr) {
  arr.forEach( element => {
    if (!resultArr.includes(element)) {
      resultArr.push(element);
    }
  });
  return resultArr;
}

/* my first solution used the same methods and logic within the copyNonDupsTo
function, but restricted to a pair of arrays. I took the time to rewrite my solution
to mirror the given solution because it works for any number of arrays, and I
thought that was well worthwhile.
 */

// halvsies([1, 2, 3, 4]);       // [[1, 2], [3, 4]]
// halvsies([1, 5, 2, 4, 3]);    // [[1, 5, 2], [4, 3]]
// halvsies([5]);                // [[5], []]
// halvsies([]);                 // [[], []]

function halvsies(arr) {
  let half = Math.round(arr.length / 2);
  console.log([arr.slice(0,half), arr.slice(half)]);
  return [arr.slice(0,half), arr.slice(half)];
}

findDup([1, 5, 3, 1]);                                // 1
findDup([18,  9, 36, 96, 31, 19, 54, 75, 42, 15,
  38, 25, 97, 92, 46, 69, 91, 59, 53, 27,
  14, 61, 90, 81,  8, 63, 95, 99, 30, 65,
  78, 76, 48, 16, 93, 77, 52, 49, 37, 29,
  89, 10, 84,  1, 47, 68, 12, 33, 86, 60,
  41, 44, 83, 35, 94, 73, 98,  3, 64, 82,
  55, 79, 80, 21, 39, 72, 13, 50,  6, 70,
  85, 87, 51, 17, 66, 20, 28, 26,  2, 22,
  40, 23, 71, 62, 73, 32, 43, 24,  4, 56,
  7, 34, 57, 74, 45, 11, 88, 67,  5, 58]);    // 73

function findDup(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr.slice(i + 1).includes(arr[i])) {
      return arr[i];
    }
  }
}

function findDup2(array) {
  const seen = {};

  for (let i = 0; i < array.length; i += 1) {
    if (seen[array[i]]) {
      return array[i];
    } else {
      seen[array[i]] = true;
    }
  }
}

/*
I like my solution slightly better than the given solution, because I think it's
faster(?). My rationale is that my algorithm will return on the first instance
of the duplicate element, whereas the given solution returns on the second
instance of the duplicated element (both iterate from the beginning of the
array). That said, my function takes a lot more memory to run, because I'm
making a copy of the given array with each iteration. That will be a big burden
 with large input arrays. So maybe I like the given solution better, ha!
 */

interleave([1, 2, 3], ['a', 'b', 'c']);    // [1, "a", 2, "b", 3, "c"]

function interleave(firstArr, secondArr) {
  let result = [];
  for (let i = 0; i < firstArr.length; i++) {
    result.push(firstArr[i], secondArr[i]);
  }
  return result;
}

showMultiplicativeAverage([3, 5]);                   // "7.500"
showMultiplicativeAverage([2, 5, 7, 11, 13, 17]);    // "28361.667"

function showMultiplicativeAverage(arr) {
  let total = 1;
  arr.forEach(element => total *= element);
  return (total / arr.length).toFixed(3);
  // #tofixed rounds to n decimals and converts to string
}

multiplyList([3, 5, 7], [9, 10, 11]);    // [27, 50, 77]

function multiplyList(firstArr, secondArr) {
  let result = [];
  for (let i = 0; i < firstArr.length; i++) {
    result[i] = firstArr[i] * secondArr[i];
  }
  return result;
}

function multiplyList2(array1, array2) {
  return array1.map((number, index) => number * array2[index]);
}
/*
from this baller solution I learned that map can have two arguments passed: the
element and its index!
Reading the documentation for Array.prototype.map doesn't explain this behavior... hmm
 */

digitList(12345);       // [1, 2, 3, 4, 5]
digitList(7);           // [7]
digitList(375290);      // [3, 7, 5, 2, 9, 0]
digitList(444);         // [4, 4, 4]

function digitList(num) {
  return (num.toString().split('').map(Number))
}
/*
I learned that I can call the Number constructor directly from map; it converts
all the elements of an array to numbers.
 */

const vehicles = ['car', 'car', 'truck', 'car', 'SUV', 'truck',
  'motorcycle', 'suv', 'motorcycle', 'car', 'truck'];

function countOccurrences(arr) {
  let result = {};
  arr.forEach( element => {
    if (result[element]) {
      result[element] += 1;
    } else {
      result[element] = 1;
    }
  });

  for (let resultKey in result) {
    console.log(resultKey + ' => ' + result[resultKey]);
  }
}

// countOccurrences(vehicles);
// console output
// car => 4
// truck => 3
// SUV => 1
// motorcycle => 2
// suv => 1

average([1, 5, 87, 45, 8, 8]);       // 25
average([9, 47, 23, 95, 16, 52]);    // 40

function average(arr) {
  let sum = 0;
  arr.forEach( el => sum += el);
  return (Math.floor(sum / arr.length));
}




























