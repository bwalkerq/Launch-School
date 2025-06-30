
// Write a function `longestSubstringLength` that finds the
// length of the longest substring without duplicates in a
// given string. The function should take a string as input
// and return an integer representing the length of the longest
// substring without any repeating characters. The input
// string will only contain lowercase characters.

// Example:
// Input: s = "helloworld"
// Output: 5
// Explanation: The longest substring without repeating characters is "world",
// which has a length of 5.

/*
P: given a string with no spaces (?) return an integer that represents the longest substring of letters with no
repeated letters.
E: BAE
strings with spaces?
try out the anchor runner sliding window vs left and right start adj, and then increment right until duplicate, increment left until remove the duplicate
"abbczt"
"abtbc"
"tmmzuxtmmsbt"
mzuxt

D: left and right situation and a set
A:
string length is less than 2, return the string
left = 0
right starts 1
greatest length = 0
set is a new set

while left < length - 1, right < length - 1, (left < right)?
  (guard clause for early exit if the remaining window is smaller than current greatest length)
  left char is stored in set
  if the right char is not in the set
    add right char to the set
    increment right
    if the size of the set > greatest length, replace integer
  else
    while left char !== right char
      delete the char at left from the set
      increment the left
    (when the left char is the right char)
      delete the left char from the set
      inc left
      inc right

return greatest length
*/

/* Notes from Philip:
* good job messing with the inputs to try to catch the edge cases
* Is my overall approach efficient, but don't get stuck trying to make the
* most efficient before I actually get to the algorithm, some of those efficnencies I can
* add in as I go.
* If I get really stuck, there are two options:
*   what would my brute force implementation be
*   try to introspect what I'm doing "by eye" when I look at a test case (a
*     harder one) and determine how I am confirming the given output--that can
*     inform my algorithm creation.
*
* */

function longestSubstringLengthFD(string) {
  if (string.length < 2) return string.length;

  let left = 0;
  let right = 1;
  let greatestLength = 0;
  let chars = new Set();

  while (left < string.length - 1 && right < string.length) {
    chars.add(string[left]);
    if (!chars.has(string[right])) {
      chars.add(string[right]);
      right++;
      greatestLength = chars.size > greatestLength ? chars.size : greatestLength;
    } else {
      while (string[left] !== string[right]){
        chars.delete(string[left]);
        left++;
      }
      left++;
      right++;
    }
  }
  return greatestLength;

}

function longestSubstringLength(s) {
  let left = 0;
  let right = 0;
  let maxLen = 0;
  const seen = new Set();

  while (right < s.length) {
    if (!seen.has(s[right])) {
      // Expand window to the right
      seen.add(s[right]);
      right++;
      maxLen = Math.max(maxLen, seen.size);
    } else {
      // Shrink window from the left until the duplicate is removed
      seen.delete(s[left]);
      left++;
    }
  }

  return maxLen;
}
console.log(longestSubstringLength("a") === 1);
console.log(longestSubstringLength("aa") === 1);
console.log(longestSubstringLength("ab") === 2);
console.log(longestSubstringLength("abba") === 2);
console.log(longestSubstringLength("abc") === 3);
console.log(longestSubstringLength("helloworld") === 5);
console.log(longestSubstringLength("dvdf") === 3);
console.log(longestSubstringLength("tmmzuxt") === 5);
console.log(longestSubstringLength("thisishowwedoit") === 6);
console.log(longestSubstringLength("longestsubstring") === 8);
console.log(longestSubstringLength("aabbccddeffghijklmno") === 10);
console.log(longestSubstringLength("abcdefghijklmnopqrstuvwxyz") === 26);