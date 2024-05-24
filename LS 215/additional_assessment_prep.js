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

console.log(isSet([
  { color: "green", number: 1, shade: "empty", shape: "squiggle" },
  { color: "green", number: 2, shade: "empty", shape: "diamond" },
  { color: "green", number: 3, shade: "empty", shape: "oval" }
]) === true);

console.log(isSet([
  { color: "purple", number: 1, shade: "full", shape: "oval" },
  { color: "green", number: 1, shade: "full", shape: "oval" },
  { color: "red", number: 1, shade: "full", shape: "oval" }
]) === true);

console.log(isSet([
  { color: "purple", number: 3, shade: "full", shape: "oval" },
  { color: "green", number: 1, shade: "full", shape: "oval" },
  { color: "red", number: 3, shade: "full", shape: "oval" }
]) === false);

// Like a boss
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

console.log(
  combine(user1, user2)) // === {
// powerPlant: 70000,
//   teaching: 40000,
//   rental: 22000   // The rental income is added together.
// })

const user3 = {
  powerPlant: 70000,
  teaching: 111,
  rental: 12000,
}
console.log(
  combine(user3, user2)) // === {
//   powerPlant: 70000,
//   teaching: 40111, // also teaching combined
//   rental: 22000   // The rental income is added together.
// })
