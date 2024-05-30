/*
Given an object of chapters, Create a function that returns which chapter is nearest to the page you're on. If two chapters are equidistant, return the chapter with the higher page number.

p:
input:
  an object
    of chapters with keys as strings
      name of chapter
    and value as numbers
      page number
  an integer: the page you're on

output:
  the name of the chapter (string) key from the object

the page number will always be less than the highest page number in the object

e:
done below, 3 cases

nearestChapter({
  "Chapter 1" : -5,
  "Chapter 2" : 5,
  "Chapter 3" : big
}, 15) ➞ "Chapter 2"

d:
object
array of the values

a:
distances
take the values from the object, map them represent the distance fromt he current page number

copy the values, take the absolute value of each
find the min, store the min

find and store the index of the min in the distances

go back to the object, get the chapters, and return the chapter (key) with the index of the min

*/
function nearestChapter(obj, currentPage) {
  let distances = Object.values(obj).map(page => {
    return page - currentPage;
  });

  let abs = distances.map(Math.abs)
  let min = Math.min(...abs)

  let minIdx = distances.indexOf(min)
  if (minIdx === -1) {
    minIdx = distances.indexOf(-min)
  }

  return Object.keys(obj)[minIdx]
}

/*
for in loops for objects
be familiar with objects, entries, fromEntries,,

give a higher level algo, dial it down
test stuff in the plan on the console

*/

let book = {
  "Chapter 1" : 1,
  "Chapter 2" : 15,
  "Chapter 3" : 37
}


// for (let chapter in book) {
//   book[chapter] = 10 - book[chapter];
//   console.log(chapter,
//   book[chapter]
//   );
// }

// console.log(
// nearestChapter({
//   "Chapter 1" : 1,
//   "Chapter 2" : 15,
//   "Chapter 3" : 37
// }, 11) === "Chapter 2")
// // closer to the upside
// console.log(
//   nearestChapter({
//     "Chapter 1" : 1,
//     "Chapter 2" : 15,
//     "Chapter 3" : 37
//   }, 20)  === "Chapter 2");
//   // closer on the downside
// console.log(
// nearestChapter({
//   "Chapter 1" : 10,
//   "Chapter 2" : 20,
//   "Chapter 3" : 37
// }, 15) ===  "Chapter 2");
// //equidistant, returns the higher

// console.log(nearestChapter({
//   "Chapter 1" : 1,
//   "Chapter 2" : 15,
//   "Chapter 3" : 37
// }, 10) === "Chapter 2")
//
// console.log(nearestChapter({
//   "New Beginnings" : 1,
//   "Strange Developments" : 62,
//   "The End?" : 194,
//   "The True Ending" : 460
// }, 200) === "The End?")
//
// console.log(nearestChapter({
//   "Chapter 1a" : 1,
//   "Chapter 1b" : 5
// }, 3) === "Chapter 1b")
//
// console.log(nearestChapter({
//   "Chapter 1a" : 1,
//   "Chapter 1b" : 5,
//   "Chapter 1c" : 50,
//   "Chapter 1d" : 100
// }, 75) === "Chapter 1d")
//
// console.log(nearestChapter({
//   "Chapter 1a" : 1,
//   "Chapter 1b" : 5,
//   "Chapter 1c" : 50,
//   "Chapter 1d" : 100,
//   "Chapter 1e" : 200
// }, 150) === "Chapter 1e")
//
// console.log(nearestChapter({
//   "Chapter 1a" : 1,
//   "Chapter 1b" : 5,
//   "Chapter 1c" : 50,
//   "Chapter 1d" : 100,
//   "Chapter 1e" : 200
// }, 74) === "Chapter 1c")
//
// console.log(nearestChapter({
//   "Chapter 1a" : 1,
//   "Chapter 1b" : 5,
//   "Chapter 1c" : 50,
//   "Chapter 1d" : 100,
//   "Chapter 1e" : 200,
//   "Chapter 1f" : 400
// }, 300) === "Chapter 1f")
//
// console.log(nearestChapter({
//   "Chapter Four": 46,
//   "Chapter Five": 54
// }, 50) === "Chapter Five")


/*
If we list all the natural numbers below 10 that are multiples of 3 or 5,
we get 3, 5, 6 and 9. The sum of these multiples is 23.

Finish the solution so that it returns the sum of all the multiples of 3 or 5
 below the number passed in.

Additionally, if the number is negative, return 0.

Note: If the number is a multiple of both 3 and 5, only count it once.
 */

function threeFiver(number) {
  if (number < 0) return 0;
  let counter = 0;
  let sum = 0;
  while (counter < number) {
    if (counter % 5 === 0 || counter % 3 === 0) {
      sum += counter;
    }
    counter ++;
  }
  return sum;
}

/*
move zeros to the end
p:
input: an array of elements

output: the same array, with zeros moved to the end
  does mutate

e:
with no zeros, return the whole array
ignore all other elements, including sparse arrays?

data:
arrays baby

a:
filter a copy of the argument for just zeros, store them
filter the original for everythihng but zeros
concat


 */

function moveZeros(arr) {
  let zeros = arr.filter(x => x === 0);
  arr = arr.filter(x => x !== 0);
  console.log(zeros, arr)
  return arr.concat(zeros);
}

// console.log(moveZeros([true, 1, 0, 3, 'a', 0, false])) // [true, 1, 3, 'a', false, 0, 0])

/*
Snail Sort
https://www.codewars.com/kata/521c2db8ddc89b9b7a0000c1/train/javascript

p:
input: an NxN array
  square
  can be 0x0, just [[]]

output:
  an array
  containing the values of the input
  in clockwise order from 1,1, like a snail

e
1,2
3,4

1243

123
456
789

3,6,9
2,5,6
1,4,7

    123  6  987  45
    first row
    the last elem of the second
    the last row, reversed
    the rest of row 2

11,12,13,14
15,16,17,18
19,20,21,22
23,24,25,26

row 1,
last element each of second and third row,
row 4 reverse,
first element each from third and second row

round 1:
row 1
last of 2
last of 3
row 4 reversed
first of 3
first of 2

round 2:
all (that's left) of 2
all that's left of 3, reversed

data:
arrays all day

a:
this is recursive. eating away at the perimeter.
for NxN, rows and columns i,j

i = 0 (all)
increment i by 1 until i = N, take nth column element
  1,N
  2,N
i=N reversed (all) pop.reverse
decrement i by 1 until i = 0, take 0th column element
  2,0
  1,0
pop the 0th row, send to the algo again,
  if we reach an undefined element, return the result

  for recursion, we want to concat the result of each round
  return result

new idea:
rotate the array 90 degree CCW, shift the array to the result (the first subarray)
  reverse each row, then reflect the values i,j => j,i

make a copy, start the process, when the row is undefined, return the result

 */

let longTest = [
  [1, 2, 3, 4, 5, 6],
  [20, 21, 22, 23, 24, 7],
  [19, 32, 33, 34, 25, 8],
  [18, 31, 36, 35, 26, 9],
  [17, 30, 29, 28, 27, 10],
  [16, 15, 14, 13, 12, 11]
];
let longSolution = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]

let snail = function(array) {
  function reverseRows(arr) {
    return arr.map(row => {
      return row.reverse();
    });
  }
  function transpose(arr) {
    let trans = arr[0].map(el => []);

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[0].length; j++) {
        trans[j][i] = arr[i][j];
      }
    }
    return trans;
  }

  let arrayCopy = array.slice();
  let result = arrayCopy.shift();

  while (arrayCopy[0] !== undefined) {
    arrayCopy = reverseRows(arrayCopy)
    arrayCopy = transpose(arrayCopy);
    result.push(arrayCopy.shift());
  }

  return result.flat();
}

// console.log(snail(longTest))

let n = [3, , 2, , 1,]
// console.log(n.sort())
// console.log(n.length)

/*
ungroup student data

p:
in: nested array of objects, several layers

array of all data
  objects for each teach
    teacher key:, string name
    data key: array of objects
      each object a student with
        name:
        (one or more keys) of other info
out:
an array of objects
  each represents a student with
    teacher:
    name:
    (info):
arr[0]['data'][0]

e:
each student object in data gets merged as part of the object holding the teacher
however, each object gets the teacher, so it's not mapping each element of the outer array

d: arrays, iteration, objects, entries, fromEntries

a:
// result array
iterate the 1st array, for each teacherObj (obj, idx, array)
  iterate through their `data` to pull out each student
  teacherObj.data.foreach (studentObj, idx, dataArray)
    build an object
    let newObj = {}
      put the teacher name first
        - newobj[teacher] = array[idx].teacher
      get each key and info added
      - studentObj = {...newObj, ...studentobj
    push newObject to result array

 */
function ungroupStudents(arr) {
  let result = [];
  arr.forEach((teacherObj, idx, outsideArray) => {
    teacherObj.data.forEach((studentObj) => {
      let newObj = {};
      newObj.teacher = outsideArray[idx].teacher;
      newObj = {...newObj, ...studentObj}
      result.push(newObj)
      console.log(newObj)
    });
  });
  return result;
}

// GPT's function:
/*
function ungroupStudents(arr) {
  return arr.flatMap(teacherObj => { // Using flatMap to flatten the array of arrays
    const teacherName = teacherObj.teacher;
    return teacherObj.data.map(studentObj => ({ // Using map to transform each student object
      teacher: teacherName,
      ...studentObj // Using object spread to merge studentObj properties
    }));
  });
}
 */

let schoolData = [
  {
    teacher: "Ms. Car",
    data: [
      {
        name: "James",
        emergencyNumber: "617-771-1082",
      },
      {
        name: "Alice",
        allergies: ["nuts", "carrots"],
      }
      ],
  },
  {
    teacher: "Mr. Lamb",
    data: [
      {
        name: "Aaron",
        age: 3
      }
      ]
  }
  ]

// console.log(  ungroupStudents(schoolData));

// console.log(schoolData[0]['data'][0])
// let a = {key: 1}
// let b = {a: 3, key: 8}
// console.log({...a, ...b})

// ungroupStudents(data)
// ➞
// [{
//   teacher: "Ms. Car",
//   name: "James",
//   emergencyNumber: "617-771-1082",
// }, {
//   teacher: "Ms. Car",
//   name: "Alice",
//   allergies: ["nuts", "carrots"],
// }, {
//   teacher: "Mr. Lamb",
//   name: "Aaron",
//   age: 3,
// }]

// - Getting distinct values from an array with duplicates
let arrWithDupes = [1,2,3,1,4,5,5,5,3,2,1,6]
function uniqueArray(arr) {
  let result = [];
  arr.forEach(el => {
    if (!result.includes(el)) {
      result.push(el)
    }
  });
  return result;
}


// console.log(
//   uniqueArray(arrWithDupes),
//   arrWithDupes.filter((v,i,a) => a.indexOf(v) === i)
// );


// Write a function that selects all words that have all the same vowels (in any order and/or number) as the first word, including the first word.
/*
with Philip 5/22

return an array that includes the words (including the first) that contain the same vowels

input:
  an array
  any size
  string elements
  one argument
  can contain white spaces
  any characters possible, we're only matching the vowels

output
  empty if emtpy given
  a new array
  with the words from the given array
    that have the same vowels
      must have at least one of each of the vowels from the first word
      can't have any other vowels

e: done below

d:
arrays, filtering
regex

a:
// make a new regex from the first word that represents the vowels to match

// let pattern = new RegExp(strVar, 'gi')

take the vowels from the first word
  match the first word to a regex for the vowels
remove the duplicate vowels
  ??

filter the array to keep the words that contain at least one occurance of each of the same vowels as the first word
  iterate the list of included vowels
    if the string matches the vowel, continue
    else, return false
    at the end return true

filter the full vowel list down to the non-included vowels

reject the words that contain additional vowels
filter again
  if the word includes a non-included vowel
    return false
  else
    return true

return the filtered list

*/

function sameVowelGroup(arr) {
  if (arr.length === 0) return [];
  let first = arr[0];
  let included = first.match(/[aeiouy]/gi) || [];

  let nonInc = 'aeiouy'.split('').filter(x => {
    return !included.includes(x);
  })

  return arr.filter(word => {
    let keep = included.all(vowel => word.match(vowel));

    //if word does include non-included vowel
    nonInc.forEach(vowel => {
      if (word.match(vowel)) keep = false;
    })

    return keep;
  });
}

// console.log(sameVowelGroup(["toe", "ocelot", "ocea"])) //➞ ["toe", "ocelot"]
// console.log(sameVowelGroup(["toe", "ocelot", "oops"])) //➞ ["toe", "ocelot"]
// console.log(sameVowelGroup(["toeo", "ace", "oops"])) //➞ ["toeo"]
// console.log(sameVowelGroup(["tooe", "toadey"])) //➞ ["tooe"]
// console.log(sameVowelGroup(["toe", "toe adey"])) //➞ ["toe"]
// console.log(sameVowelGroup(["toe", "to edf ef"])) //➞ ["toe"]
// console.log(sameVowelGroup(["o", "to edf", 'ao', 'ootoo'])) //➞ ["o", 'ootoo']
// console.log(sameVowelGroup(["sdf", "to edf ef", 'ghj', 'a', 'ae'])) //➞ ['sdf', 'ghj']


// console.log(sameVowelGroup(["many", "carriage", "emit", "apricot", "animal"]) )//== ["many"]);
// console.log(sameVowelGroup(["hoops", "chuff", "bot", "bottom"]));// == ["hoops", "bot", "bottom"]);
// console.log(sameVowelGroup([])); // == []);
// console.log(sameVowelGroup(["ant", "any"])); // == ["ant"]);
// console.log(sameVowelGroup(["$money$", "new yooork", "y-e-o-m-a-n", "a%mnesty456"])); // == ["$money$", "new yooork"]);
// console.log(sameVowelGroup(['qwrt', 'uiop', 'sdfg'])); // == ['qwrt', 'sdfg']);

// Here is GPT's solution:
function sameVowelGroup(words) {
  if (words.length === 0) return [];

  const vowels = 'aeiou';

  // Function to get unique vowels from a word
  function getUniqueVowels(word) {
    const uniqueVowels = [];
    for (let char of word) {
      if (vowels.includes(char) && !uniqueVowels.includes(char)) {
        uniqueVowels.push(char);
      }
    }
    return uniqueVowels.sort().join('');
  }

  // Get the unique vowel set for the first word
  const firstWordVowels = getUniqueVowels(words[0]);

  // Filter words whose unique vowel sets match the first word's unique vowel set
  const result = words.filter(word => getUniqueVowels(word) === firstWordVowels);

  return result;
}

// console.log(sameVowelGroup(["many", "carriage", "emit", "apricot", "animal"])); // ["many"]
// console.log(sameVowelGroup(["hoops", "chuff", "bot", "bottom"])); // ["hoops", "bot", "bottom"]
// console.log(sameVowelGroup([])); // []
// console.log(sameVowelGroup(["ant", "any"])); // ["ant"]
// console.log(sameVowelGroup(["$money$", "new yooork", "y-e-o-m-a-n", "a%mnesty456"])); // ["$money$", "new yooork"]
// console.log(sameVowelGroup(['qwrt', 'uiop', 'sdfg'])); // ['qwrt', 'sdfg']


/*
Validating Sets (the game!)

p: validate each group of three cards as a set or not. Sets have each category where all are the same or all are different.

input:
  array
    of three objects
      each representing a card
      with 4 properties
        each property has 3 options

out:
  a boolean

e:
I know this game well, so examples not needed, but if I were making them, I'd make a set where:
  - one prop is the same, others different
  - all props different
  - all props the same
  - one with 2/3, so not a set

d:
array => scan, array of property values

a:
go through each property of all three cards, and return false if they're not all the same or not all different
oooo
I can pull into an array the values for each characteristic (e.g. all three colors) and if the array length is 2, return false
for each card

transform the array to the values of each card
  check through corresponding values,
  map the first element to a nested array with all characteristics

  // 4 times, so the length of the first element, check each of the ith elements
    push each into an array
    remove duplicates
    check length
    if the number of distinct values is 2,
      return false


return true at the end!

*/

function isSet(cards) {
  cards = cards.map(Object.values)
  for (let i = 0; i < cards[0].length; i++) {
    let singleProp = [];
    cards.forEach(card => {
      singleProp.push(card[i])
    })
    singleProp = singleProp.filter((v,i,a) => a.indexOf(v) === i);

    if (singleProp.length === 2) return false;
  }
  return true;
}

//  Like a boss
/*
the main thing I'm noticing is how I can see a path forward more clearly. I'm
building JS fluency

I like how this solution is very much about distillation. I think it could get
in the weeds with all the different characteristics, like full, empty, oval, etc.
Instead, I took a smoother approach and counted the number of distinct. Very nice.

GPT:
function isSet(cards) {
  // Helper function to check if all properties are the same or different
  const allSameOrDifferent = (prop1, prop2, prop3) => {
    return prop1 === prop2 && prop2 === prop3 || prop1 !== prop2 && prop2 !== prop3 && prop1 !== prop3;
  };

  // Check if all properties are either all the same or all different for each property
  const colorsAreSet = allSameOrDifferent(cards[0].color, cards[1].color, cards[2].color);
  const numbersAreSet = allSameOrDifferent(cards[0].number, cards[1].number, cards[2].number);
  const shadesAreSet = allSameOrDifferent(cards[0].shade, cards[1].shade, cards[2].shade);
  const shapesAreSet = allSameOrDifferent(cards[0].shape, cards[1].shape, cards[2].shape);

  // Return true if all properties are either all the same or all different for each property
  return colorsAreSet && numbersAreSet && shadesAreSet && shapesAreSet;
}

[[When I asked to compare the two solutions]]
Differences:

Data Representation: Your solution converts each card object into an array of
its property values, while my solution directly accesses the properties of
each card object.

Logic: Your solution iterates through the properties of the cards, while my
solution explicitly checks each property (color, number, shade, and shape)
individually.

Handling Duplicates: Your solution filters out duplicate values within each
property array, while my solution compares properties directly using a
helper function.

Your solution is more generic in terms of handling any number of properties,
but it requires more processing to convert objects to arrays. My solution is
more explicit in its logic and directly addresses the specific properties of
the cards.
 */

/*
p:
given two objects, combine keys and values into one object, and values that correspond to a shared key get combined

input:
  two objects
    string key, integer values
  may not have the same number of properties

out:
  an object
    keys combined,
    values copied over or combined for shared keys

examples:
same length, one combined
different lengths, some combined
none combined

d:
I feel like there's reducing going on here, so I'm leaning towards arrays for reduce

a:
// get all the keys, iterate through
//   - concat keys from both
//   -remove dupes
  // - for each iterate
  sum the existing entries by checking for the same name, sum the values
    - value 1 from the first or 0
    - value 2 from the second or 0
  sum with zero guard clause when non-matched prop key

  add the key value pair to the result
    result.key = summed

*/
function combine(firstObj, secondObj) {
  let keys = [...Object.keys(firstObj), ...Object.keys(secondObj)].filter((v,i,a) => a.indexOf(v) === i);
  let result = {};

  keys.forEach(key => {
    let firstVal = firstObj[key] || 0;
    let secondVal = secondObj[key] || 0;
    result[key] = firstVal + secondVal;
  })

  result = Object.fromEntries(Object.entries(result).sort((a, b) => a[1] - b[1]))

  return result;
}
/*
25 min to initial solution
Overlooked THE ORDER of the result object. This is the second time I've been
  burned or order of the result
spent maybe 5-8 min more to use entries and fromEntries to sort the object.

GPT's solution is way smoother.
Great use of for in loops, which I haven't used yet!
*/
function combineGPT(income1, income2) {
  const combinedIncome = {};

  // Iterate over the keys in the first income object
  for (let key in income1) {
    // Add the income from the first object to the combined income
    combinedIncome[key] = income1[key];
  }

  // Iterate over the keys in the second income object
  for (let key in income2) {
    // If the category already exists in the combined income, add the income from the second object
    // Otherwise, create a new entry in the combined income
    combinedIncome[key] = (combinedIncome[key] || 0) + income2[key];
  }

  return combinedIncome;
}



const user1 = {
  powerPlant: 70000,
  rental: 12000,
}

const user2 = {
  teaching: 40000,
  rental: 10000,
}

// console.log(
//   combine(user1, user2)) // === {
// powerPlant: 70000,
//   teaching: 40000,
//   rental: 22000   // The rental income is added together.
// })

const user3 = {
  powerPlant: 70000,
  teaching: 111,
  rental: 12000,
}
// console.log(
//   combine(user3, user2)) // === {
//   powerPlant: 70000,
//   teaching: 40111, // also teaching combined
//   rental: 22000   // The rental income is added together.
// })

/*
p: given coordinates for two rectangles, return the area of the overlapping portions

in:
two arrays
  each with two objects
    each object contains two coordinates
      that represent a pair of opposite vertices of a rect.
  always in x,y format
  coordinate values are integers
    pos or neg

out:
a number
  that represents the area of the overlapping rectangles

can the rectangles not overlap?
  deal with this separately

e:
  [{ x: 2, y: 1 }, { x: 5, y: 5 }],
  [{ x: 3, y: 2 }, { x: 5, y: 7 }]

  I'm noticing that the x values are 2,5,3,5
  sorted they're 2,3,5,5

  y values are 1,2,5,7

  that the distance between the middle two, those are the side lengths of the overlapping triangle

  5-3 = 2
  5-2 = 3
  2*3 = 6

  [{ x: 2, y: -9 }, { x: 13, y: -4 }],
  [{ x: 5, y: -11 }, { x: 7, y: -2 }]

  2,5,7,13 and -11,-9,-4,-2
     2               -5
  2 * 5 = 10

d: arrays of the x and y values
arithmetic on the middle entries, more arithmetic
abs val the product

a:
when dealing with non-overlapping situation,
  if the max x of 1st < min x of 2nd or vice versa
  same for y's, then return 0

combine the arrays
iterate through each object
  compile x's and y's
  sort them
  calculate differnce of the middle two values of each
  multiply them, abval

*/

function overlappingRectangles(firstRect, secondRect) {
  let xCoords = [];
  let yCoords = [];

  [...firstRect, ...secondRect].forEach(obj => {
    xCoords.push(obj.x);
    yCoords.push(obj.y);
  })

  function zeroOverlap(arr) {
    if (String(arr) === String(arr.slice().sort())) return true;
  }

  if (zeroOverlap(xCoords) || zeroOverlap(yCoords)) return 0;

  let n = [xCoords, yCoords].map(arr => {
    arr.sort((a, b) => a - b);
    return Math.abs(arr[2] - arr[1]);
  });

  return n.reduce((x,y) => x * y);
}

/*
I got poned by this, but it was at the end of the insane solo parenting week,
late at night, and I solved it in time except the non-overlap case
which I had noted, but wasn't given cases for.

One thing I really appreciate about edabit is the hiding of the test cases
this is closer to the interview structure

GPT's solution was very coordinate algebra heavy, which I think is much clearer.
mine abstracts some arithmetic away in the sorting of the array's and finding
the difference between the middle two values. It abstracts further by comparing
string versions of the sorted and non-sorted arrays -- that strategy was born out
of extreme tiredness. It make much more sense (though it's more labor-intensive)
to write the coordinate geometry stuff.
 */
function overlappingRectanglesGPT(rect1, rect2) {
  // Function to find overlap in 1 dimension
  function overlap(p1, p2, p3, p4) {
    return Math.max(0, Math.min(p2, p4) - Math.max(p1, p3));
  }

  // Coordinates of the opposite angles of the rectangles
  const x1 = rect1[0].x, y1 = rect1[0].y;
  const x2 = rect1[1].x, y2 = rect1[1].y;
  const x3 = rect2[0].x, y3 = rect2[0].y;
  const x4 = rect2[1].x, y4 = rect2[1].y;

  // Calculate overlap in x and y dimensions
  const overlap_x = overlap(x1, x2, x3, x4);
  const overlap_y = overlap(y1, y2, y3, y4);

  // Calculate area of overlap
  const area = overlap_x * overlap_y;

  return area;
}

// console.log(overlappingRectangles(
//   [{ x: 2, y: 1 }, { x: 5, y: 5 }],
//   [{ x: 3, y: 2 }, { x: 5, y: 7 }]
// ) === 6);
//
// console.log(overlappingRectangles(
//   [{ x: 2, y: -9 }, { x: 13, y: -4 }],
//   [{ x: 5, y: -11 }, { x: 7, y: -2 }]
// ) === 10);
//
// console.log(overlappingRectangles(
//   [{ x: -8, y: -7 }, { x: -4, y: 0 }],
//   [{ x: -5, y: -9 }, { x: -1, y: -2 }]
// ) === 5);

/*

All Pairs that Sum to Target
Create a function that returns all pairs of numbers in an array that sum to a target. Sort the pairs in ascending order with respect to the smaller number, then order each pair in this order: [smaller, larger].

p:
given an array of numbers and a target, return a nested array of all of the pairs of numbers that sum to the target. Sort each subarray ascending, sort outer array asc by each pairs lowest value

in:
an array
  of numbers and strings
    all strings are string numbers
  of any size
  if empty array, (return empty)
  negatives are accepted

and a target
  a whole number integer
  negative possible

output:
new array
  nested array
    of 2-el arrays
      the pairs of integers that sum to the target
      numbers may be used more than once, as long as they are paired with a different instance of the same integer partner

  return empty array if no pairs

  e: done
  console.log(allPairs([2, 4, 5, 3], 7))//  ➞ [[2, 5], [3, 4]]
[2, 4, 5, 3]
[2, 3, 4, 5]


d: arrays! sliding window situation, to mimic combinations

a:
sort array first (can mutate)

for each number in the array
  search through the rest of the array (to the right of the number)
  for each element in the larger array
    for each element in the portion of the array to the right
  ID any candidates that sum to the target
    if the i and the j sum to the target,
  collect successful pairs as a two element array into the result array
    result push [i,j]

return the result
*/

// function allPairs(arr, n) {
//   arr = arr.map(x => Number(x)).sort();
//   let result = [];

//   for (let i = 0; i < arr.length; i++) {
//     for (let jthElement of arr.slice(i + 1))
//     if (arr[i] + jthElement === n) {
//       result.push([arr[i], jthElement])
//     }
//   }
//   return result;
// }

// console.log([1,1,2,3,4,2,3,4,5,6,5,6,5,6].filter((v,i,a) => a.indexOf(v) === i))

// let arr = [1, 1, 2, 3, 4]
// let uniqArr = [...new Set(arr)]   // [1, 2, 3, 4]

//sick bits of code:
// A.p.reduce() is sick
// count the occurrences of an element in an array, store in an object
let array = [1,1,2,3,4,2,3,4,5,6,5,6,5,6]
let countsObj = array.reduce((obj, currentValue) => {
  obj[currentValue] = obj[currentValue] || 0;
    // if the key exists in the returned object (a value is returned, set it to
    // itself, or set it to zero when this is the first occurrence of the key
  obj[currentValue] += 1 // increment the count for that occurrence
  return obj // returning the object for each iteration of reduce
}, {});
// console.log(countsObj)

// this avoids sort
// and grabs the min value out of an array, and can keep grabbing the new min (from AJ)
// resultArr.push(array.splice(array.indexOf(Math.min(...arr)), 1)[0])

/*
remember to ask about sparse arrays

*/

// console.log(allPairs([5, 3, 9, 2, 1], 3))//  ➞ [[1, 2]]
// console.log(allPairs([2, 4, 5, 3], 7))//  ➞ [[2, 5], [3, 4]]
// console.log(allPairs([-2, -4, -5, -3], -7))//  ➞ [[-2, -5], [-3, -4]]
// console.log(allPairs([5, 3, 9, 2, 1], 100))//  ➞ []
// // a number used more than once in a pair
// console.log(allPairs([5, 3, 1, 2, 1], 3))//  ➞ [[1, 2], [1, 2]]
// console.log(allPairs([2, 1, 2, 1], 3))//  ➞ [[1, 2], [1, 2], [1, 2], [1, 2]]


// console.log(allPairs([4, 5, 1, 3, 6, 8], 9)) //, [[1, 8], [3, 6], [4, 5]])
// console.log(allPairs([5, 2], 14)) //, [])
// console.log(allPairs([5, 5, 2], 14)) //, [])
// console.log(allPairs([8, 7, 7, 2, 4, 6], 14)) //, [[6, 8], [7, 7]])
// console.log(allPairs([8, 7, 2, 4, 6], 14)) //, [[6, 8]])
// console.log(allPairs([1, 3, 5, 4, 0, 2], 4)) //, [[0, 4], [1, 3]])
// console.log(allPairs([1, 3, 5, 4, 0, 2, 2], 4)) //, [[0, 4], [1, 3], [2, 2]])
// console.log(allPairs([1, 3, 5, '4', 0], 4)) //, [[0, 4], [1, 3]])

/*
Create a function that takes an array of football clubs with properties: name, wins, loss, draws, scored, conceded, and returns the team name with the highest number of points. If two teams have the same number of points, return the team with the largest goal difference.

How to Calculate Points and Goal Difference
team = { name: "Manchester United", wins: 30, loss: 3, draws: 5, scored: 88, conceded: 20 }

Total Points = 3 * wins + 0 * loss + 1 * draws = 3 * 30 + 0 * 3 + 5 * 1 = 95 points
Goal Difference = scored - conceded = 88 - 20 = 68

problem: given stats on teams, return the winner (most points) or in case of tie, the highest goal difference

in:
an array
  of objects
    each structured the same way
    strings and numbers where expected

out:
a string
  the name of the winning club
    winner is the most points earned
      in case of tie,
        tiebreaker is highest goal difference

e:
(what if tie and then tie for goal diff? hope that doesn't happen...)

d:
objects
store stats in same object? (good for checking as I code)
possible array to store info?

a:
for each team in the array
  // Calculate the score and GoalDif
  // store as properties

  // calculate the max score
    // map to just the values, calculate the max BY SPREADing the mapped array

  iterate through the teams again
    if the score is equal the max, store name in array
    if length is 1,
      return the only element
    else
      calculate the max goal diff, match to the

// helper
// max value of given property
//   map to just values of given key, return the max
//   I'll use this up to twice
*/

function champions(arr) {
  for (let team of arr) {
    team.points = team.wins * 3 + team.draws * 1;
    team.goalDiff = team.scored - team.conceded;
  }

  function maxVal(key) {
    return Math.max(...arr.map(team => team[key]));
  }

  const maxPoints = maxVal('points')
  let maxTeams = arr.filter(x => x.points === maxPoints);

  console.log(arr)
  console.log(maxTeams)

  if (maxTeams.length === 1) {
    return maxTeams[0].name;
  } else {
    const maxGoalDiff = maxVal('goalDiff');
    maxTeams = maxTeams.filter(team => team.goalDiff === maxGoalDiff);
    return maxTeams[0].name;
  }
}

/*
GPT
The main difference between my solution and this is that I directly calculate
the max values of the goalDiff and the Points, whereas this just keeps a tally,
and if the current points are greater, then the champion's name is replaced.

This solution is much more straightforward, I think
easier to type, easier to read.

To distill this problem is:
"iterate through a list of values and return the greatest"
  the values are embedded in object properties, and have to be calculated
  but with each value, just keep the ticker/tracker updated as you find greater ones
  and update the champions string for the return value
  there's a clause thrown in there about ties that requires some conditional logic
but ultimately , it's of the structure of "iterate and return the max of a list"

I hate to admit it, but coding with GPT is helping me in a few particular ways,
and seeing the "standard" solution for many of these problems is helping me see
larger structures or motifs.
*/

function championsGPT(teams) {
  let maxPoints = -1;
  let maxGoalDiff = -1;
  let champion = "";

  for (let team of teams) {
    const points = 3 * team.wins + 1 * team.draws;
    const goalDifference = team.scored - team.conceded;

    if (points > maxPoints || (points === maxPoints && goalDifference > maxGoalDiff)) {
      maxPoints = points;
      maxGoalDiff = goalDifference;
      champion = team.name;
    }
  }

  return champion;
}

// console.log(champions([
//   {
//     name: "Chelsea",
//     wins: 35,
//     loss: 3,
//     draws: 0,
//     scored: 102,
//     conceded: 20,
//   },
//   {
//     name: "Liverpool",
//     wins: 24,
//     loss: 6,
//     draws: 8,
//     scored: 118,
//     conceded: 29,
//   },
//   {
//     name: "Arsenal",
//     wins: 28,
//     loss: 2,
//     draws: 8,
//     scored: 87,
//     conceded: 39,
//   },
// ]) === "Chelsea")

// console.log(champions([
//   {
//     name: "Manchester United",
//     wins: 30,
//     loss: 3,
//     draws: 5,
//     scored: 88,
//     conceded: 20,
//   },
//   {
//     name: "Arsenal",
//     wins: 24,
//     loss: 6,
//     draws: 8,
//     scored: 98,
//     conceded: 29,
//   },
//   {
//     name: "Chelsea",
//     wins: 22,
//     loss: 8,
//     draws: 8,
//     scored: 98,
//     conceded: 29,
//   },
//   ]) === "Manchester United");

//   // same points, tiebreaker goes to ManU
//   console.log(championsGPT([
//     {
//       name: "Manchester United",
//       wins: 1,
//       loss: 3,
//       draws: 5,
//       scored: 10,
//       conceded: 1,
//     },
//     {
//       name: "Arsenal",
//       wins: 1,
//       loss: 3,
//       draws: 5,
//       scored: 10,
//       conceded: 5,
//     }
//     ]) === "Manchester United");


/*
with Jon 5/27
Images can be described as a 3D array.

// This image has only one white pixel:

[
  [[255, 255, 255]]
]

// This one is a 2 by 2 black image:

[
  [[0, 0, 0], [0, 0, 0]],
  [[0, 0, 0], [0, 0, 0]]
]

Your task is to create a function that takes a 3D array representation of an image and returns the inverse of that.

p: take a 3d array, return an invert of the array

invert refers to the colors, becoming the opposite
range of a color is 0 - 255
155 is the inversion of 100

  the (ab val) difference between 255 and a color number is its inversion

in:
  a 3D array
    of any size, any dimension
    each pixel has 3 numveric el's
      neg or positve integers
      unlimited range
      less than zero collapses to 0
      greater than 255 collapses to 255
out:
  a new array, don't mutate
  a 3D array
    same size and dimensions
    colors inverted, i.e. numeric differences from 255
empty 3d array returns an empty 3d array

e:
invert([
  [[255, 255, 255], [255, 255, 255]],
  [[255, 255, 255], [255, 255, 255]]
]) ➞ [
  [[0, 0, 0], [0, 0, 0]],
  [[0, 0, 0], [0, 0, 0]]
]

d:
arrays and mapping

a:
helper function
invert a color
  given an interger, collapse if nec,
  return 255 - integer.

3-d mapping
return
map just the el
  map just the el
    map transform each num el
      helper function

*/

function invert(arr) {
  return arr.map(row => {
    return row.map(pixel => {
      return pixel.map(numVal => {
        return invertColor(numVal);
      });
    });
  });

  function invertColor(integer) {
    if (integer < 0) {
      return 255;
    } else if (integer > 255) {
      return 0;
    } else {
      return 255 - integer;
    }
  }
}

function invertJonSolution(arr) {
  return arr.map(row => {
    return row.map(pixel => {
      return pixel.map(numVal => {
        return 255 - (numVal > 255 ? 255 : (numVal < 0 ? 0 : numVal));
      });
    });
  });
}

//   console.log(
//     invert([
//       [[255, 255, 255], [255, 255, 255]],
//       [[255, 255, 255], [255, 255, 255]]
//     ])
//   );
// // ➞ [
//   // [[0, 0, 0], [0, 0, 0]],
// //   [[0, 0, 0], [0, 0, 0]]
// // ]
//
//   console.log(
//     invert([
//       [[255, 255, 255]],
//       [[255, 255, 255], [255, 255, 255]]
//     ])
//   );
// // ➞ [
//   // [[0, 0, 0]],
// //   [[0, 0, 0], [0, 0, 0]]
// // ]
//
//   console.log(
//     invert([
//       [[-255, -255, -255]],
//       [[256, 1000, 300], [155, 254, 1]]
//     ])
//   );
// // ➞ [
// // [[255, 255, 255]],
// //   [[0, 0, 0], [100, 1, 254]]
// // ]

/*
You were tasked with making a list of every makeup item your local pharmacy had in stock. You created a very long array of each item, with each element having both a name and brand property. Now you're looking to simplify the list by combining duplicate items, and adding a count property to everything.

p: given a long array of objects, return a condensed array that has a count rather than duplicate objects
in:
an array
  of objects
    brand and name properties

out:
a new array
  of objects
    with duplicates removed, an object count for each distinct object

e:
can different products every have the same brand or same name but not both? (assume yes)
other properties?

d: array of bojects for iteration
new object for containing, adding the count

a:

init currentBrand and currentName trackers

simple iteration of the array
  if the item's brand and name don't match the current,
    reassign current trackers
    create a new object in the result
    start count at 1
  else
    iterate the count

 return the result
*/
function simplifyListOLD(arr) {
  let result = [];
  let currentBrand = '';
  let currentName = '';

  arr.forEach(item => {
    // console.log(item.brand, item.name);
    if (item.brand !== currentBrand || item.name !== currentName) {
      currentBrand = item.brand;
      currentName = item.name;
      item.count = 1;
      result.push(item);
    } else {
      result[result.length-1].count += 1;
    }
  });

  return result;
}

// BIG BURN
/*
the takeaway here is that for getting counts of something, USE REDUCE
I knew in writing it that my solution wouldn't work for non-adjacent duplicate
items. Interestingly, this was one of the first times that GPT didn't detect that
my solution wouldn't work for that type of input even though I asked it directly.
This gives me heart! ha!
Anyway, reduce is the way to go. I will try to implement it now without further
 looking at the given solution

 a:
 reduce the given array, with an accumulator object, return the accumulator each time


 */

function simplifyList(arr) {
  return Object.values(arr.reduce((acc, product) => {
    const key = `${product.brand}_${product.name}`;
    acc[key] = acc[key] || {brand: product.brand, name: product.name, count: 0};
    acc[key].count += 1;
    return acc;
  }, {}));
}
// DOUBLE BIG BURN with RETURNING the accumulator. shit!



const example = [
  { brand: "Stila", name: "Stay All Day Liquid Lipstick" },
  { brand: "NARS", name: "Cosmetics Voyageur Pallete" },
  { brand: "Stila", name: "Stay All Day Liquid Lipstick" },
  { brand: "Urban Decay", name: "Naked Honey Pallete" },
  { brand: "Stila", name: "Stay All Day Liquid Lipstick" },
  { brand: "NARS", name: "Cosmetics Voyageur Pallete" },
]
// console.log((example[0]))


// console.log(
//   simplifyList(example))
//  ➞ [
//   { brand: "NARS", name: "Cosmetics Voyageur Pallete", count: 2 },
//   { brand: "Urban Decay", name: "Naked Honey Pallete", count: 1 },
//   { brand: "Stila", name: "Stay All Day Liquid Lipstick", count: 3 }
// ]


/*
Get Notes Distribution
Create a function that takes an array of students and returns an object
representing their notes distribution. Keep in mind that all invalid notes
should not be counted in the distribution. Valid notes are: 1, 2, 3, 4, 5

p: from an object with notes (grades) return a count of the notes

input:
an array
  of objects
    with name and notes keys
    the notes are stored in an array
      some invalid notes included
      valid values are 1 through 5

out:
an object
  with the notes distribution
  notes are keys, occurrence is value
  in descending order
if a note doesn't occur, don't include in return

e:
getNotesDistribution([
  {
    "name": "Steve",
    "notes": [5, 5, 3, -1, 6]  // filter out -1 and 6
  },
  {
    "name": "John",
    "notes": [3, 2, 5, 0, -3] // filter out 0 and -3, not in desc order, so sort
  }
] ➞ {
  5: 3,
  3: 2,
  2: 1
})

d:
array iterate to get the set of notes into an array
reduce the array into the object for accumulation

a:
map the given array to it's notes arrays
flatten the array so it's just note values
reduce the array of notes with an acc obj
  ignore invalid values
  familiar pattern
  set the value as a key to it's current value, or zero
  increment
  return the acc object

return the object from the reduce call

 */
function getNotesDistribution(arr) {
  arr = arr.map(obj => obj.notes).flat().filter(x => x >= 1 && x <= 5);
  return arr.reduce((acc, currentVal) => {
    acc[currentVal] = acc[currentVal] || 0;
    acc[currentVal] += 1;
    return acc;
  }, {});
}

// console.log(
//   getNotesDistribution([
//     {
//       "name": "Steve",
//       "notes": [5, 5, 3, -1, 6]  // filter out -1 and 6
//     },
//     {
//       "name": "John",
//       "notes": [3, 2, 5, 0, -3] // filter out 0 and -3, not in desc order, so sort
//     }
//   ]))

// unintentionally got a problem that needed a distribution output, same as last
// time, so very easy.
// 16 min







/*
Splitting Objects Inside an Array
You bought a few bunches of fruit over the weekend. Create a function that splits a bunch into singular objects inside an array.

p: given an array of objects with quantities, destructure into an array of objects corresponding to their counts

in:
an array
  of objects
    with name and quantity props
    string and integer values, resp
    integer > 0

out:
an array
  of objects
  same properties, but each quantity is 1
  each fruit object is duplicated the corresponding counts

e:
BAE

d:
array, for of
for loop with i = quantity
or reduce

a:
reduce the array with acc array
  repeatFruit(name, quantity, accobj)
  return the accArray

function
repeatFruit(name, quantity, accobj)
for loop up to quantity
put into accarray name, quantity = 1
*/
function splitBunches(arr) {
  return arr.reduce((accArray, obj) => {
    for (let i = 0; i < obj.quantity; i++) {
      accArray.push({name: obj.name, quantity: 1})
    }
    return accArray;
  }, []);
}

// console.log(splitBunches([
//   { name: "grapes", quantity: 2 }
// ]));
// // ➞ [
// //   { name: "grapes", quantity: 1 },
// //   { name: "grapes", quantity: 1 }
// // ]
//
//
// console.log(splitBunches([
//   { name: "currants", quantity: 1 },
//   { name: "grapes", quantity: 2 },
//   { name: "bananas", quantity: 2 }
// ]));
//  ➞ [
//   { name: "currants", quantity: 1},
//   { name: "grapes", quantity: 1 },
//   { name: "grapes", quantity: 1 },
//   { name: "bananas", quantity: 1 },
//   { name: "bananas", quantity: 1 }
// ]

/*
easy, <20 min with a big interruption in the middle. Feeling good that I've
gotten to practice reduce three times today.
GPT's solution did even simpler and just init's a result array, For each through
 the original, and does the same for loop to push the right number of items to
 the result.
*/

/*
Standard Competition Ranking
Standard competition ranking (also known as "1224" ranking) assigns the same rank to matching values. Rank numbers are increased each time, so ranks are sometimes skipped. If we have 5 scores (the highest score having a rank of 1):

No matching values:

Scores = [99, 98, 97, 96, 95]
Rank = 1,  2,  3,  4,  5
With matching values:

Scores = [99, 98, 98, 96, 95]
Rank = 1,  2,  2,  4,  5

// Second and third scores are equal, so rank "3" is skipped.
Given an object containing the names and scores of 5 competitors, and a competitor name, return the rank of that competitor after applying competition ranking.

p: given some scores, put them in standard comp rank, with tie scores having the same rank, and some ranks skipped
in:
an object
  name keys, score values
  strings and integer numbers
a name
  string
  someone in the given object
out:
an integer rank of the target person

e:
No matching values:
Scores = [99, 98, 97, 96, 95]
Rank = 1,  2,  3,  4,  5

With matching values:
Scores = [99, 9, 9, 6, 5]
Rank = 1,  2,  2,  4,  5

Scores = [9, 9, 9, 6, 5]
Rank = 1,  1,  1,  4,  5

Scores = [9, 9, 9, 9, 15]
Rank    = 2, 2, 2, 2, 1

double names?
mutate?

d:
object (mutate)
array: some iteration where I reference the array I'm iterating

a:

rank = -1
take all the values, sorted,
iterate through

if the current value is the same as previous,
rank = previous rank
else, rank = i+1
if current val === target val, return rank

*/

function competitionRank(obj, targetName) {
  let rank = -1;
  let targetScore = obj[targetName];
  const scores = Object.values(obj).sort((a,b) => b - a);

  for (let i = 0; i < scores.length; i++) {
    let currentScore = scores[i];

    if (currentScore !== scores[i - 1]) {
      rank = i + 1;
    }

    if (targetScore === currentScore) {
      return rank;
    }
  }
}
/*
33 min, and GPT couldn't do better than I did.
I overlooked that sort() defaults to string representation of numbers, so I had to
quickly figure out to explicitly sort by value. It was a fairly quick bug fix.

I also had to rewrite my code because I tried to return early out of ForEach, and
had to rewrite the whole thing into a for loop

I'll ask GPT how to get out of that. DAMN it's good. :|

instead of rewriting a forEach call into a for loop, I can use Array.p.some()!
it's really smart, once I hit the thing that I want to return on, I can just
return true to return out of the iteration. In this case, since I initialize rank
outside the iteration, I can just return it at the end of the function.

 */
// console.log(competitionRank(
//   {Lilly: 91, Harris: 87, Archie: 93, Lexi: 100, Ava: 88}, "Lilly")
//   === 3);
//
// console.log(
//   competitionRank({
//     George: 96,
//     Emily: 95,
//     Susan: 93,
//     Jane: 89,
//     Brett: 82
//   }, "Jane") === 4
// );
//
// console.log(
//   competitionRank({
//     Kate: 92,
//     Carol: 92,
//     Jess: 87,
//     Bruce: 87,
//     Scott: 84
//   }, "Bruce") === 3
// );

/*
First Recurrence Index
Create a function that identifies the very first item that has recurred in the string argument passed. It returns the identified item with the index where it first appeared and the very next index where it resurfaced -- entirely as an object; or as an empty object if the passed argument is either null, undefined, empty string, or no recurring item exists.

Examples
recurIndex("DXTDXTXDTXD") ➞ {"D": [0, 3]}
// D first appeared at index 0, resurfaced at index 3
// T appeared and resurfaced at indices 2 and 5 but D and X completed the cycle first

recurIndex("YXZXYTUVXWV") ➞ {"X": [1, 3]}

recurIndex("YZTTZMNERXE") ➞ {"T": [2, 3]}

recurIndex("AREDCBSDERD") ➞ {"D": [3, 7]}

recurIndex("") ➞ {}

recurIndex(null) ➞ {}

d: strings, arrays, reduce

a:
build a distribution of the characters until one character has been found twice
array of the string
init acc object
iterate through with a for loop for early return,
  build distribution-like object like normal pattern
    the letter is the key, the value is the array with the index
  if the length of the indeces array is 2, return that character and the indices array

*/
function recurIndex(str) {
  let accObj = {};
  if (!str) return accObj;
  // const strArray = str.split(''); // don't need this!

  for (let i = 0; i < str.length; i++) {
    let currentLetter = str[i];
    // if (accObj[currentLetter]) {
    if (accObj.hasOwnProperty(currentLetter)) {
      return {[currentLetter]: [accObj[currentLetter], i]};
      // WRONG {currentLetter: [accObj[currentLetter], i]};
      // remember the brackets around the key
    } else {
      accObj[currentLetter]= i;
    }
  }
  return {};
}

/* Messed up time because I was interrupted, but overall flowed very well on what seemed like a challenging problem
I recognized the distribution-like pattern shortly after starting
I recognized that I had to early return before I started coding (originally thought reduce(), but then realized I didn't need the whole distribution)
I didn't need the split array, since I can iterate the string on index directly
Perhaps the scariest/most important moment is when I wrote the line for the early
return, and kept getting
`{ currentLetter: [0,3] }` instead of
`{ D: [0,3] }`
because I forgot the brackets around the key.

GPT told me that creating an array for the occurrences i s unnecessary, I agree
instead, I can just track the first occurrence as the property value, and then
just create the array with the early return at the end.
Also told me to use Object.p.hasOwnProperty (which is above my pay-grade, but I
looked into this, and it seems like good advice.

*/
//
// console.log(recurIndex("DXTDXTXDTXD")) //➞ {"D": [0, 3]}
// // D first appeared at index 0, resurfaced at index 3
// // T appeared and resurfaced at indices 2 and 5 but D and X completed the cycle first
//
// console.log(recurIndex("YXZXYTUVXWV")) //➞ {"X": [1, 3]}
//
// console.log(recurIndex("YZTTZMNERXE")) //➞ {"T": [2, 3]}
//
// console.log(recurIndex("AREDCBSDERD")) //➞ {"D": [3, 7]}
//
// console.log(recurIndex("")) //➞ {}
//
// console.log(recurIndex(null)) //➞ {}


/*
Deep Arithmetic
Write a function that takes an array of strings of arbitrary dimensionality ([], [][], [][][], etc.) and returns the sum of every separate number in each string in the array.

p: find all the distinct numbers and sum them
in:
an array
  potentially of lots of sub Arrays
  with strings with lots of characters
    including digits,
    and negative numbers

out:
an integer
  the sum of all the numbers that were pulled out

Examples
sum(["1", "five", "2wenty", "thr33"]) ➞ 36
1,2,33 sums to 36

sum([["1X2", "t3n"],["1024", "5", "64"]]) ➞ 1099
1,2,3,1024,5,64

sum([[["1"], "10v3"], ["738h"], [["s0"], ["1mu4ch3"],"-1s0"]]) ➞ 759
Notes
Numbers in strings can be negative, but will all be base-10 integers.
Negative numbers may directly follow another number.
The hyphen or minus character ("-") does not only occur in numbers.
Arrays may be ragged or empty.

d:
arrays flatmap regex matching
reduce for sum

a:
flatmap the array
for each string
  match to a regex that catches those digits, negatives
    if the match group length is one,
      return the first element
    else
      return the match group
  (wait, if it's one match, it's a bunch of stuff, if it's multiple, it's just the matches) (great news, if the match is one, it's length is one.)

flatten the mapped result (because match groups may be however dimensional)
reduce
  parseInt each string and sum with accum
  return the accum

*/
// console.log('aaasdaasdfadsaaa'.match(/a*/));

function sum(arr) {
  arr = arr.flat(Infinity).map(str => {
    return str.match(/\-?[0-9]+/g);
  });
  return arr.flat().reduce((acc, currentValue) => {
    if (!currentValue) return acc;
    return acc += parseInt(currentValue);
  }, 0);
}
/*
very proud of this solution! 24 minutes
somewhat thinky regex, with optional `-` leading, and any number of digits
had to figure out flat(Infinity) which is very nice to remember (good for given nested array of arbitrary depth)
had to remember to parseInt each of the values
had to remember to pass an initial value of `acc` as 0 to sum the numbers

*/


// console.log(sum(["1", "five", "2wenty", "thr33"])) //➞ 36
// // 1,2,33 sums to 36
//
// console.log(sum([["1X2", "t3n"],["1024", "5", "64"]])) //➞ 1099
// // 1,2,3,1024,5,64
//
// console.log(sum([[["1"], "10v3"], ["738h"], [["s0"], ["1mu4ch3"],"-1s0"]])) //➞ 759

/*
Create a function that takes an object and returns an object of all entries having unique marks. If the marks are the same, take who is eldest.

p:
given an object, return a filtered object based on unique marks with age as a tiebreaker
in:
an object
  all structured the same way
  string number key
    object value with age, name, marks
      note that marks are strings
  size at least 1 property
  NOT sorted desc by marks
  duplicate names? sure
  same mark and age? nope

out:
  return a new object
  keys updated to reflect order by age, desc

e:
getObject({
  "0": { age: 18, name: "john", marks: "400" },
  "1": { age: 17, name: "julie", marks: "400" },
  "2": { age: 16, name: "Robin", marks: "200" },
  "3": { age: 16, name: "Bella", marks: "300" }
}) ➞ {
  "0": { age: 18, name: "john", marks: "400" },
  "1": { age: 16, name: "Robin", marks: "200" },
  "2": { age: 16, name: "Bella", marks: "300" }
}

d: objects into arrays?
iterate with for in loop?

a:
no sorting needed, since objects are already sorted by age
  corollary: always keep the first of a set of duplicates

init result obj
init seen array
counter starts at zero
iterate through the object
  if the marks value hasn't been seen prior,
  - if the value is included in the seen array
    add it to the result obj with the counter key value as a string
    add the marks value to seen array
    increment the counter

  return the result object
*/

function getObject(obj) {
  let result = {};
  let seen = [];
  let counter = 0

  for (let key in obj) {
    if (!seen.includes(obj[key].marks)) {
      result[String(counter)] = obj[key];
      // console.log(result)
      seen.push(obj[key].marks);
      counter += 1;
    }
  }
  return result;
}
/*
30 min
with Esther
verbalize what I'm thinking during the data structures section
*/

// console.log(
//   getObject({
//     "0": { age: 18, name: "john", marks: "400" },
//     "1": { age: 17, name: "julie", marks: "400" },
//     "2": { age: 16, name: "Robin", marks: "200" },
//     "3": { age: 16, name: "Bella", marks: "300" }
//   }));
// // ➞ {
// //   "0": { age: 18, name: "john", marks: "400" },
// //   "1": { age: 16, name: "Robin", marks: "200" },
// //   "2": { age: 16, name: "Bella", marks: "300" }
// // }
//
// console.log(
//   getObject({
//     "0": { age: 217, name: "jack", marks: "400" },
//     "1": { age: 18, name: "john", marks: "400" },
//     "2": { age: 17, name: "julie", marks: "400" },
//   }));
// // ➞ {
// // "0": { age: 217, name: "jack", marks: "400" },
// // }

/*
my own extension of the above problem: Sort a nested object by a value of one
of the inner properties

These were my initial thoughts, it doesn't have to be this complicated!
    // put the age values in an array, sort them
    // nested iteration
    // iterate through the values array
    //   iterate through the outer object, check for the matching, add it to the result

A better way!
turn the object into an array, sort() the array by accessing the values of the
inner object!

 */
let nester = {
  0: { age: 80, name: "john", },
  1: { age: 7, name: "julie", },
  2: { age: 9000, name: "Robin", },
  3: { age: 600, name: "Bella", }
};

// let entries = Object.entries(nester);
// entries.sort((a, b) => {
//   return b[1].age - a[1].age;
// });
// console.log(entries)
//
// let sortedNester = Object.fromEntries(entries)
// console.log(sortedNester)
// // note this actually doesn't sort the object


/*
Vending Machine
Your task is to create a function that simulates a vending machine.

Given an amount of money (in cents ¢ to make it simpler) and a productNumber, the vending machine should output the correct product name and give back the correct amount of change.

The coins used for the change are the following: [500, 200, 100, 50, 20, 10]

The return value is an object with 2 properties:

product: the product name that the user selected.
change: an array of coins (can be empty, must be sorted in descending order).

p: given a product and payment, return an object with the requested product, and change
in:
the products (static)
money in cents
  an integer
a product number

out:
"invalid product number" if out of range
"not enough money" if too little
an object
  product property
    string
  change property
    an array
      of integers that are the coins representing the change
      desc order
    can be an empty array if no change
e:
vendingMachine(products, 200, 7) ➞ { product: "Crackers", change: [ 50, 20, 10 ] }

vendingMachine(products, 500, 0) ➞ "Enter a valid product number"

vendingMachine(products, 90, 1) ➞ "Not enough money for this product"

d:
objects!
array for the change

a:
// result object {}

// retreive the object matching the product number
  // for each obj of the products array
  // if the product number matches the requested
    // check cost
    // store product name in the result obj
    return the object with the name and the change array
      do arithmetic with the cost and money to make the change array

// change array helper(price, payment) {
//   empty result array
//   calc change (while change >0)
//    iterate through the coins
//     if the change is greater than the coin
//     push the coin to the result
// subtract the coin's value from the change
// while loop will stop once all change has been pushed to the array
return the array
}
*/

function vendingMachine(payment, productNumber) {
  // Products available
  const products = [
    { number: 1, price: 100, name: 'Orange juice' },
    { number: 2, price: 200, name: 'Soda' },
    { number: 3, price: 150, name: 'Chocolate snack' },
    { number: 4, price: 250, name: 'Cookies' },
    { number: 5, price: 180, name: 'Gummy bears' },
    { number: 6, price: 500, name: 'Condoms' },
    { number: 7, price: 120, name: 'Crackers' },
    { number: 8, price: 220, name: 'Potato chips' },
    { number: 9, price: 80,  name: 'Small snack' },
  ];

  const coins = [500, 200, 100, 50, 20, 10, 5, 1];

  // function changeArray(price, payment) {
  //   let arr = [];
  //   let change = payment - price;
  //   for (let i = 0; i < coins.length; i++) {
  //     if (change === 0) return arr;
  //     if (change >= coins[i]) {
  //       arr.push(coins[i]);
  //       change = change - coins[i];
  //       i = 0;
  //     }
  //   }
  // }

  // GPT's solution did the change array much, much better
  /* the thing that got me is that I was trying to loop through the whole list
  of coins each time, WHILE the change was greater than 0.

  A better approach is to loop through the coins once, and stay on each coin
  WHILE the current change amount is greater than the current coin. This makes
  sense since you'd be adding multiple, say, 25 cent coins if the change amount
  was 81.
   */
  if (productNumber < 1 || productNumber >= products.length) {
    return "Enter a valid product number";
  }

  const product = products[productNumber -1];
  // Calculate the change
  let changeAmount = payment - product.price;
  const change = [];

  // Calculate the coins for the change
  for (let coin of coins) {
    while (changeAmount >= coin) {
      change.push(coin);
      changeAmount -= coin;
    }
  }

  let result = {};
  for (let obj of products) {
    if (obj.number === productNumber) {
      if (obj.price > payment) return 'Not enough money for this product';
      result['product'] = obj.name;
      result['change'] = change
    }
  }

  return result;
}


// console.log(vendingMachine(200, 7))
// //  ➞ { product: "Crackers", change: [ 50, 20, 10 ] }
//
// console.log(vendingMachine(500, 0))
// //  ➞ "Enter a valid product number"
//
// console.log(vendingMachine(90, 1) )
// // ➞ "Not enough money for this product"

/*
Check If the Brick Fits through the Hole
Write the function that takes three dimensions of a brick: height(a), width(b) and depth(c) and returns true if this brick can fit into a hole with the width(w) and height(h).

Examples
doesBrickFit(1, 1, 1, 1, 1) ➞ true

doesBrickFit(1, 2, 1, 1, 1) ➞ true

doesBrickFit(1, 2, 2, 1, 1) ➞ false
Notes
You can turn the brick with any side towards the hole.
We assume that the brick fits if its sizes equal the ones of the hole (i.e. brick size should be less than or equal to the size of the hole, not strictly less).
You can't put a brick in at a non-orthogonal angle. hahhahhaa

p: given a 2D hole, check if a 3D brick fits
in:
5 numbers
  3 dimensions of a brick
  2 dimensions of a hole

out: boolean if the brick fits through at an orthogonal angle

e:
note that if the at least 2 of the dimensions are less than or equal to the hole's two dimensions, it fits

d:
just arrays, some/all, or count

a:
slice the first three
sort them asc
if each of the first two is less than or equal to the corresponding 2, true
*/
function doesBrickFit(h, l, w, wBrick, hBrick) {
  let brickDimensions = [h, l, w].sort((a,b) => a - b);
  let holeDimensions = [wBrick, hBrick].sort((a,b) => a - b);
  for (let i = 0; i < holeDimensions.length; i++) {
    if (brickDimensions[i] > holeDimensions[i]) {
      return false;
    }
  }
  return true;
}

// console.log(doesBrickFit(1, 1, 1, 1, 1) === true)
//
// console.log(doesBrickFit(1, 2, 1, 1, 1) === true)
//
// console.log(doesBrickFit(5, 2, 2, 1, 1) === false)

/* Super Strict Grading
Given an object literal of student names and an array of their test scores over the semester, return a list of all the students who passed the course (in alphabetical order). However, there is one more thing to mention: the pass mark is 100% in everything!
p:
given an object with student's scores, return an array of the names of students who earned 100% in all assessments

in:
an object
  of properties with a name as key, an array of string scores as the value
    each score is structured 'x/n'
  the arrays of scores may be different lengths
  may have different totals
  student with no scores? (prob doesn't exist)

out:
an array
  of the names (keys) of students who scored 100% in all assessments
  if no one meets req's, return an empty array
  sorted alphabetical

Examples:
below

Notes
All of a student's test scores must be 100% to pass.
Remember to return an array of student names sorted alphabetically.

d:
obj => array of entries for abstraction of every()
array for name at the end, remember to sort

a:
get an array of the object
filter iterate through each nested array of name and array of string scores
    check if every one of the string scores are 100%
    - split the string on '/', check if the first and second entry are equal to one another

map to just the names

*/
function whoPassed(studentObj) {
  studentObj = Object.entries(studentObj).filter(nestedArr => {
    return nestedArr[1].every(stringScore => {
      let scoreParts = stringScore.split('/')
      return scoreParts[0] === scoreParts[1];
    })
  })

  return studentObj.map(nestedArr => nestedArr[0]).sort()
}
/*
Like a boss 22 minutes
Felt smooth the whole time, great way to cruise into this assessment

I am SO glad that I figured out that Array.p.all() doesn't exist, and it's actually
.every()! Phew!
Takes the same callback of (el, idx, array) which is very nice.

GPT did fine, some approximation of mine

A user-submitted solution was really smooth with the use of `eval()`
I also really like how it filters the array of just the names,
```
const whoPassed = students =>
	Object
		.keys(students)
		.filter(name => students[name].every(score => eval(score) === 1))
		.sort()
```


 */
// console.log(whoPassed({
//   "John" : ["5/5", "50/50", "10/10", "10/10"],
//   "Sarah" : ["4/8", "50/57", "7/10", "10/18"],
//   "Adam" : ["8/10", "22/25", "3/5", "5/5"],
//   "Barry" : ["3/3", "20/20"]
// }) )
// // ➞ ["Barry", "John"]
//
// console.log(whoPassed({
//   "Zara" : ["10/10"],
//   "Kris" : ["30/30"],
//   "Charlie" : ["100/100"],
//   "Alex" : ["1/1"]
// }) )
// // ➞ ["Alex", "Charlie", "Kris", "Zara"]
//
// console.log(whoPassed({
//   "Zach" : ["10/10", "2/4"],
//   "Fred" : ["7/9", "2/3"]
// }) )
// ➞ []










































