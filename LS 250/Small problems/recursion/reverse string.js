/*
* P: given a string, return the reversed string, using recursion.
* E: BAE, single letter case (should be consumed as the base case?
* or the empty string would be the base case?
* D: strings and recursion
* A:
* A [data structure] is a [problem definition] if [some condition is true], and the rest of the [data structure] is [problem definition].
* A string is a reversed-string if [] and the rest of the string is a valid reversed-string.
* the condition is: the first letter is reversed with the last
  if the string is empty, return string
* * let left = 0
* let right = length - 1
* helper takes the string, left, and right
*   if left - right < 1 (base case)
*     return the string
*   else (recursive case)
*     switch the places of the left and right
*     so, [string[left], string[right] = switched
*     left++
*     right--
*     return helper(string, left, right)
*
* */

function reverseString(string) {
  if (string === '') return string;
  let left = 0;
  let right = string.length - 1;
  let chars = string.split('');

  function helper(chars, left, right) {
    if (right - left < 1) {
      return chars;
    } else {
      [chars[left], chars[right]] = [chars[right], chars[left]];
      left++;
      right--;
      return helper(chars, left, right);
    }
  }

  return (helper(chars, left, right).join(''))
}

/* I knew that mine would work, but that it also probably wasn't the intended
* recursive approach, since it's also a two pointer approach
* but damn, I didn't expect their solution to so dang simple.
* Its genius is in the return on only a part of the string.
function reverseString(str) {
  if (str === "") {
    return "";
  }
  return reverseString(str.substr(1)) + str.charAt(0);
}
* That last step is crazy, because it sends the whole string minus the first character
* into the recursion, and then it adds all of the reversed characters after getting
* to the end of the string and sending up '' to get appended by all the previous characters
* in the reverse order. pretty dope.
* I'm unfamilar (it's been a long time) with .charAt() which takes an index and
* returns the character at that index from a string
* and `.substr()` which takes a beginning index (and an end index if desired) and
* returns the substring starting at the start index and going until `end` or
* the end of the string if no end is provided.
* */

console.log(reverseString("hello") === "olleh");
console.log(reverseString("world") === "dlrow");
console.log(reverseString("a") === "a");
console.log(reverseString("") === "");
console.log(reverseString("recursion") === "noisrucer");

// All test cases should log true.