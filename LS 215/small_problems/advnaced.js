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
  return trans;
}

const newMatrix = transpose(matrix);

console.log(newMatrix);      // [[1, 4, 3], [5, 7, 9], [8, 2, 6]]
console.log(matrix);         // [[1, 5, 8], [4, 7, 2], [3, 9, 6]]

// 18 min
// obviously, math background helped here.
// The challenge would be to get any size matrix.
/*
got it! I had a mistake with the j loop going until the length of the original,
which only represents the number of rows of the original; the j loop needs to go
through each element in each row of the original (which is the same as going through
to each row of the transpose, so j < trans.length succeeds)

 */

const matrix2 = [
  [1, 5, 8],
  [4, 7, 2],
  [3, 9, 6],
  [4, 5, 6],
];
const matrix3 = [
  [1, 5, 8, 2, 7, 8],
  [4, 7, 2, 2, 7, 8],
  [3, 9, 6, 2, 7, 8],
  [4, 5, 6, 2, 7, 8],
];
console.log(transpose(matrix2))
console.log(transpose(matrix3))































