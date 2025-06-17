/*
* P: given a string sentence, return the sentence with the words in the same location,
* but the words reversed.
* E: BAE
* D: two pointers, working on modifying the string
* A: writer/reader
* start the writer at 0, reader starts at 0 and goes until it finds a space, x
* so from zero to x-1 (the last letter of the word location) reverse the letters.
* writer and reader change letters, then move towards one another until they cross
* each other or until they reach the same value
* then they move on to the next word, and repeat the process
* more formally:
* writer = 0
* reader = 1
* lastSpace = undefined
* while the writer is less than the length
*   if reader value is " " or reader === length
*     lastSpace = reader
*     decrement reader (to get back to the last letter)
*     while writer < reader
*       writer, reader = reader, writer
*       increment writer
*       decrement reader
*   writer = reader = lastSpace plus 1
* return the string
* */

console.log(reverseWords("Hello World") === "olleH dlroW");
console.log(reverseWords("JavaScript is fun") === "tpircSavaJ si nuf");
console.log(reverseWords("Coding in the sun") === "gnidoC ni eht nus");
console.log(reverseWords("Launch School") === "hcnuaL loohcS");

function reverseWordsFirstDraft(str) {
  let writer = 0;
  let reader = 1;
  let lastSpace = undefined;
  let chars = str.split('')

  while (writer < chars.length) {
    if (chars[reader] === ' ' || reader === chars.length) {
      lastSpace = reader;
      reader--;
      while (writer < reader) {
        [chars[writer], chars[reader]] = [chars[reader], chars[writer]];
        writer++;
        reader--;
      }
    writer = reader = lastSpace + 1;
    }
    reader++;
  }
  return chars.join('');
}

/* My solution is fine, though my initial thought to create a helper is what they did!
* I thought for sure that would be cheating, or avoiding the point, but alas.
* Here's their solution, which benefits from splitting on the spaces, and map, and join. */

function reverseWords(string) {
  return string.split(' ').map(reverseWord).join(' ');
}

function reverseWord(str) {
  let start = 0;
  let end = str.length;
  let chars = str.split('');

  while (start < end) {
    [chars[start], chars[end]] = [chars[end], chars[start]];
    start++;
    end--;
  }

  return chars.join('');
}







































