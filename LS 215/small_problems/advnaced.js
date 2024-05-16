/*
p:
input:
  a string in the form of a template of my choosing
  must have way to plug in mad libs words
output:
  the string with the random words plugged in at the appropriate spots,
questions:
random with or without replacement? (without is my guess)
if we use all of the words from the beginning of the list, do we randomize the
list again, or start at the beginning, or return an error (and need to add more
words to the replacement constant?

test cases:
It really looks like we need two noun lists, one for animals, and one for their parts
it looks like there is replacement for the randomization

d:
string array, map

a
replacements is a property with word type as key, an array of words for replacing

match text into array

map the array
  if the word has an apostrophe,
    split on it,
    replace the word if it's a key using helper function,
    join with apostrophe,
    return the joined word
  if the word is included in the list of keys
    return a random replacement from the correct property
  else return the original word

join the string and return it

replacement helper
if the word is a key, replace it with a random element of the array that is the
value of the corresponding key


deal with ending punctuation!

 */

function madlibs(template) {
  console.log(
    template.replace(/adjective|verb|adverb|noun|character/gi, replaceKey)
  );

  // let wordArray = template.match(/[\w']+/g)
  //   .map(word => {
      // if (Object.keys(replacements).includes(word)) {
      //   return replaceKey(word);
      // } else if (word.includes('\'')) {
      //   let words = word.split('\'')
      //   words[0]= replaceKey(words[0]);
      //   return words.join('\'');
      // } else {
      //   return word;
      // }
    // });
  // console.log(wordArray.join(' ') + template.slice(-1));
  // return (wordArray.join(' ') + template.slice(-1));
}
// not easy!
/*
Maybe 40 min, or a little over, I got up in the middle of solving it :/
the biggest takeaway from their solution is that String.p.replace with a regex
 is a way, way better method to use than includes and replacing words in an array with map.
 I'm glad I did this problem! Replace is so powerful.
*/

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function replaceKey(word) {
  return replacements[word][getRandomInt(replacements[word].length)]
}

const replacements= {
  adjective: ['quick', 'lazy', 'sleepy', 'noisy', 'hungry',],
  character: ['fox', 'dog', 'cat',],
  noun: ['head', 'leg', 'tail',],
  verb: ['jumps', 'lifts', 'bites', 'licks', 'pats',],
  adverb: ['easily', 'lazily', 'noisily', 'excitedly',],
};

let template1 = `The adjective brown character adverb verb the adjective yellow
character, who adverb verb her noun and looks around.`;

let template2 = `the character verb the character's noun.`;

// These examples use the following list of replacement texts:
// adjectives: quick lazy sleepy noisy hungry
// nouns: fox dog head leg tail cat
// verbs: jumps lifts bites licks pats
// adverbs: easily lazily noisily excitedly
// ------

// madlibs(template1);
// The "sleepy" brown "cat" "noisily"
// "licks" the "sleepy" yellow
// "dog", who "lazily" "licks" his
// "tail" and looks around.

// madlibs(template1);
// The "hungry" brown "cat" "lazily"
// "licks" the "noisy" yellow
// "dog", who "lazily" "licks" his
// "leg" and looks around.

// madlibs(template2);      // The "fox" "bites" the "dog"'s "tail".
// madlibs(template2);      // The "cat" "pats" the "cat"'s "head".

/*
p:
a matrix is an array that holds a set of arrays, all of which represent a row in the matrix.
  the first subarray is the first row
  the second is the second row
  - the ith element is the ith row
  - accessing the columns is a little stranger, where we have to access the jth
  element in EACH row.


input: a 3 by 3 matrix
  an array
  with 3 elements
  each element is an array
    with 3 elements, each a number
output: the transpose of the original matrix
  an array with 3 arrays,
    all the same elements as the original, but the rows have become the columns, and vv

e:
for each element in the original, (i,j), that element becomes (j,i) in the transpose

1,3
5,10
would become
1,5
3,10

note that the diagonal elements don't rotate
because they are actually i,i, so rotation has no effect

it makes sense to process the original matrix row by row
so for each ith row, the elements become the jth element in each new column
e.g.
the 2nd row 4,7,2 become the 2nd element in each row in the new. (same as becoming the 2nd column)

nested iteration:
1st row: i=0
  j=0: new array[j][i] = old[i][j]

d:
arrays

a:
for each ith row, populate the ith element in each of the rows in the transpose
for i
  for j
    new[j][i] = old[i][j]

c:
 */

const matrix = [
  [1, 5, 8],
  [4, 7, 2],
  [3, 9, 6]
];

function transpose(arr) {
  let trans = arr[0].map(el => []);

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      trans[j][i] = arr[i][j];
    }
  }
  console.log(trans)
  return trans;
}

// const newMatrix = transpose(matrix);

// console.log(newMatrix);      // [[1, 4, 3], [5, 7, 9], [8, 2, 6]]
// console.log(matrix);         // [[1, 5, 8], [4, 7, 2], [3, 9, 6]]

// 18 min
// obviously, math background helped here.
// The challenge would be to get any size matrix.
/*
got it! I had a mistake with the j loop going until the length of the original,
which only represents the number of rows of the original; the j loop needs to go
through each element in each row of the original (which is the same as going through
to each row of the transpose, so j < trans.length succeeds)

 */

// const matrix2 = [
//   [1, 5, 8],
//   [4, 7, 2],
//   [3, 9, 6],
//   [4, 5, 6],
// ];
// const matrix3 = [
//   [1, 5, 8, 2, 7, 8],
//   [4, 7, 2, 2, 7, 8],
//   [3, 9, 6, 2, 7, 8],
//   [4, 5, 6, 2, 7, 8],
// ];
// console.log(transpose(matrix2))
// console.log(transpose(matrix3))

// transpose([[1, 2, 3, 4]]);            // [[1], [2], [3], [4]]
// transpose([[1], [2], [3], [4]]);      // [[1, 2, 3, 4]]
// transpose([[1]]);                     // [[1]]

// transpose([[1, 2, 3, 4, 5], [4, 3, 2, 1, 0], [3, 7, 8, 6, 2]]);
// [[1, 4, 3], [2, 3, 7], [3, 2, 8], [4, 1, 6], [5, 0, 2]]

/*
p:
input:
  any MxN matrix
output:
  the 90-degree clockwise rotation matrix of the input
    MxN will become NxM

e:
building on what I did before, let's represent each element (i,j) as it's new position

3  4  1
9  7  5
becomes:
9  3
7  4
5  1

3: 0,0 -> 0,1
4: 0,1 -> 1,1
1: 0,2 -> 2,1
9: 1,0 -> 0,0
7: 1,1 -> 1,0
5: 1,2 -> 2,0

in all of these (i,j), the column become the row, so j => i
the new columns are in the reverse order of the rows in the original
  the first row becomes the last column
  the second row becomes the second to last column
  the third  ...             third to last
  the ith row becomes the -jth column, but we don't have backwards unless with slice, sooo
  the ith row becomes (i + (M - (2 * i) whhhaaattt

  how about in a 3x3, the 1st row becomes the entire last colum
  the 2nd row => 2nd column
  last row => 1st column
  for all i = 0 => j = length - 0
  for all i = 1 => j = length - 1


d: arrays

a:
for each i,j => j, length - (i + 1)
4: 0,2 -> 2,1
 */

const matrix1 = [
  [1, 5, 8],
  [4, 7, 2],
  [3, 9, 6],
];

const matrix2 = [
  [3, 7, 4, 2],
  [5, 1, 0, 8],
];

// const newMatrix1 = rotate90(matrix1);
// const newMatrix2 = rotate90(matrix2);
// const newMatrix3 = rotate90(rotate90(rotate90(rotate90(matrix2))));
//
// console.log(newMatrix1);      // [[3, 4, 1], [9, 7, 5], [6, 2, 8]]
// console.log(newMatrix2);      // [[5, 3], [1, 7], [0, 4], [8, 2]]
// console.log(newMatrix3);      // `matrix2` --> [[3, 7, 4, 2], [5, 1, 0, 8]]

function rotate90(matrix) {
  let rotated = matrix[0].map(el => []);

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      rotated[j][matrix.length - (i+1)] = matrix[i][j];
    }
  }
  return rotated;
}

// 46 minutes, but divided across three sittings because my life is shambles right now
// therapy session "you haven't supported me". where am I?

/*
what got me out of it--at the end I had an off-by-one error, and I was hack slashing
to try to get it--what got me out was (BIG SURPRISE) going back to the numerical
analysis of a few points, or elements. Then I realized the off by one

If I encounter another matrix problem, writing each point in terms of i and j seemed
to help. I got really bogged down in a numerical analysis of representing everything
only in terms of i, which proved very arithmentic heavy, time heavy.

I'm noticing in the given solution that they were very explicit about the name of
i and j, using rowIdx and colIdx instead. That clarity is nice, though I felt
confident in i and j from my math background.

FUCK They used the transpose, then reversing the rows.

SO an idea might be to transpose then reverse. composition of functions. shit.
Make the problem simpler

Hueristics to reach for:
  - MTPS
  - draw a picture
  - what patterns do I notice?
  - can I use algebra to represent this?
  - do I know a related formula?
  - What are some edge cases?

*/

/*
Merge Sorted Lists
p:
input: two sorted arrays
  number elements
  0 to many elements in each
  no order to the arrays
output:
  a single array
  with all elements sorted
  duplicate values fine

req's
- can't mutate the arrays
- no sorting the result array (defeats the purpose!)
-
examples:
merge([1, 5, 9], [2, 6, 8]);      // [1, 2, 5, 6, 8, 9]
  builds from first, then sec, then first, 2 from second, and first to end
merge([1, 1, 3], [2, 2]);         // [1, 1, 2, 2, 3]
  f,f,s,s,f
  different lengths

merge([], [1, 4, 5]);             // [1, 4, 5]
merge([1, 4, 5], []);             // [1, 4, 5]
if one is empty, return the other (guard clause, or might be processed normally

what about
merge([1, 4, 5], [1, 4]);             // I expect [1, 1, 4, 4, 5]
so equal gets pushed, doesn't matter which.

d:
arrays!
a result array

a:
first thought is to slice both, and SHIFT (not unshift! burn!) from each,
comparing as we go.
  if the first leading is less than or equal to the second leading, or if the second is undefined
    shift the first leading
  else
    shift the second leading
when we get to the end of one array, the comparison will just be with undefined
while the length of both arrays are greater than 0...
seems like it would work, but I'd prefer a way that wasn't copying

 */
function merge(firstArr, secondArr) {
  // firstArr = firstArr.slice();
  // secondArr = secondArr.slice();
  // let result = [];
  //
  // while (firstArr.length > 0 || secondArr.length > 0) {
  //   if (firstArr[0] <= secondArr[0] || secondArr[0] === undefined) {
  //     result.push(firstArr.shift());
  //   } else {
  //     result.push(secondArr.shift());
  //   }
  // }
  let result = [];
  let firstCounter = 0;
  let secondCounter = 0;

  while (firstCounter <= (firstArr.length - 1) || secondCounter <= (secondArr.length - 1)) {
    if (firstArr[firstCounter] <= secondArr[secondCounter] || secondArr[secondCounter] === undefined) {
      result.push(firstArr[firstCounter]);
      firstCounter += 1;
    } else {
      result.push(secondArr[secondCounter]);
      secondCounter += 1;
    }
  }

  // console.log(result);
  return result;
}


// merge([1, 5, 9], [2, 6, 8]);      // [1, 2, 5, 6, 8, 9]
// merge([1, 1, 3], [2, 2]);         // [1, 1, 2, 2, 3]
// merge([], [1, 4, 5]);             // [1, 4, 5]
// merge([1, 4, 5], []);             // [1, 4, 5]
// merge([1, 4, 5], [1, 4]);             // I expect [1, 1, 4, 4, 5]

// 35 minutes
// did a good job choosing a path and going for it
// JS fluency still lacking, I got burned on unshift vs shift. I got them mixed up.

/*
p: merge sort algorithm
input:
  an array
  of either all numbers or all strings
  of length >= 2
output:
  a sorted array
  sorted with the merge sort algo

req:
can use merge from last problem
the whole back half of the algo is the merge function that we used

e:
mergeSort([9, 5, 7, 1]);           // [1, 5, 7, 9]
break into 2 then 4
mergeSort([5, 3]);                 // [3, 5]
mergeSort([6, 2, 7, 1, 4]);        // [1, 2, 4, 6, 7]
what to do with an odd number?
[[6, 2], [7, 1, 4]]
[[[6], [2]], [[7, 1], [4]]]
[[[6], [2]], [[[7], [1]], [4]]]
this should be fine

mergeSort(['Sue', 'Pete', 'Alice', 'Tyler', 'Rachel', 'Kim', 'Bonnie']);
// ["Alice", "Bonnie", "Kim", "Pete", "Rachel", "Sue", "Tyler"]
this comparison should be fine because all names capitalized

mergeSort([7, 3, 9, 15, 23, 1, 6, 51, 22, 37, 54, 43, 5, 25, 35, 18, 46]);
// [1, 3, 5, 6, 7, 9, 15, 18, 22, 23, 25, 35, 37, 43, 46, 51, 54]

MTPS
for an array of size 2 e.g. [2,4], want to return [2], [4]
for [2,4,6] return [[[2],[4]],[6]]



a:
for an even number, split into ...
splice? returns deleted
slice? copies

// nest(arr)
// if the length is two, return the two nested bit
//   [2,3] => [[2],[3]]
//   map(x => [x]
// if length 3?
// else
//   pass the first and second half to the same function
//   [2,3,4,5] => [[2,3],[4,5]]
//     arr.slice(0,arr.length/2)
//     eventually => [[2],[3]],[[2],[3]]

if the length is 1, return

 */


  // function nest(partialArray) {
  //   if (partialArray.length === 2) {
  //     console.log('length of 2')
  //     return [[partialArray[0]],[partialArray[1]]]
  //   } else if (partialArray.length === 3) {
  //     console.log('length 3')
  //     return [nest(partialArray.slice(0,2)),[partialArray[2]]]
  //   } else {
  //     console.log('else')
  //     return [
  //       nest(partialArray.slice(0,(partialArray.length / 2))),
  //       nest(partialArray.slice(partialArray.length / 2)),
  //     ]
  //   }
  // }
  //
  // return nest(arr)
// ok so I need to establish variables to hold part of the array in each iteration

function mergeSort(arr) {
  if (arr.length === 1) return arr;

  let firstHalfCopy = arr.slice(0,(arr.length / 2));
  let secondHalfCopy = arr.slice(arr.length / 2);

  firstHalfCopy = mergeSort(firstHalfCopy);
  secondHalfCopy = mergeSort(secondHalfCopy);

  return merge(firstHalfCopy, secondHalfCopy);
}

console.log(mergeSort([9, 5, 7, 1]));           // [1, 5, 7, 9]
console.log(mergeSort([9, 5, 7, 1,4,6]));
// let hold = (mergeSort([9, 5, 7, 1,4,6,10,12]));
// console.log(hold)
console.log(mergeSort([5, 3]));                 // [3, 5]
console.log(mergeSort([6, 2, 7, 1, 4]));        // [1, 2, 4, 6, 7]
//
console.log(mergeSort(['Sue', 'Pete', 'Alice', 'Tyler', 'Rachel', 'Kim', 'Bonnie']));
// ["Alice", "Bonnie", "Kim", "Pete", "Rachel", "Sue", "Tyler"]

console.log(mergeSort([7, 3, 9, 15, 23, 1, 6, 51, 22, 37, 54, 43, 5, 25, 35, 18, 46]));
// [1, 3, 5, 6, 7, 9, 15, 18, 22, 23, 25, 35, 37, 43, 46, 51, 54]


// brought me to my knees
/*
what to take away? the utter simplicity of recursive functions; Many times in the
past I have written these, and am always surprised by how simple they are.
I had an understanding to return the argument once I got to a certain low state--
I had chosen an array of size 2 instead of 1, needlessly complicating it. (MTPS)
and I understood to recursively call the mergesort function on the first half and
the second half. Makes sense.

I did get confused with whether to return/call with or without the brackets,
sort of losing the thread of when a return object already had brackets.
I guess it comes down to slicing the first and second halves, that's what creates
the nested brackets.

That was a crazy problem.
 */

















