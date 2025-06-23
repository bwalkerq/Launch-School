// Create a function `calculator` that evaluates arithmetic
// expressions given as strings. The function should support
// basic arithmetic operations: addition (+), subtraction (-),
// multiplication (*), and division (/).

// The function should:
// 1. Accept a string input representing a valid arithmetic expression.
//    The input will consist of non-negative integers, arithmetic
//    operator(+, -, *, /), and may contain whitespace characters.
// 2. Evaluate the expression following the standard order of operations
//    (multiplication and division before addition and subtraction).
// 3. Return the result as an integer.

// For division operations, the result should be rounded down to
// the nearest integer (floor division).

// You can assume that the input will never contain division by zero.

// Note: Implement the calculation logic yourself without using
// any built-in expression evaluation functions.

// Examples:
//
// 1. Input: "4 + 3 * 2"
//    Output: 10
//    Explanation: 3*2 is evaluated first (6), then added to 4.
//
// 2. Input: "15 / 3 - 2"
//    Output: 3
//    Explanation: 15/3 is 5, then 2 is subtracted.
//
// 3. Input: "10 + 8 / 3"
//    Output: 12
//    Explanation: 8/3 is 2 (rounded down), then added to 10.

/* P: this is a whitespace problem first!
* Given a string of numbers and operations with wacky whitespace, return the correct
* calculation as a number.
* E: there can be leading or tailing whitespace to trim
* there can be space or not between each number/symbol
* D: I assume this is a stack, but there's order of operations at play here, so...
* we have to do * and / first
* then - and +
* A:
* remove all whitespace
* then put spaces between each thing if it doesn't exist?
* split on ' ' for an array
* first pass for / or *
*   if so, combine the two numbers and symbol with splice? (not efficient)
* second pass for + and -, can just be straight through
*
* Ok I had to use AI a lot for whitespace regex.
* \s matches any whitespace character
* + means 'one or more'
* g flag just after the regex literal means do this everywhere!
* so regex is /\s+/g and then use that with replace
*
* Specifically:
* remove all whitespace with \s+ and g with replace
* add one space before and after each symbol, also with regex
*
* no no no, I'm going about this wrong. They don't want regex at all, they
* want a direct stack approach.
* focus on going through each character...
* yeah whoa, I just looked at their stack and that is totally not at all what I
* was doing.
* init nums = ''
* go through the chars,
* if char is a digit, store in nums
* if symbol,
*   switch
*   + push num to stack
*   - push -num to stack
*   * pop value from stack and mult with current number, push to stack
*   / same, with /
*
* return sum via reduce at the end.
* */

function calculator(expression) {
  let num = '';
  let op = '+';
  let stack = [];
  expression += '+';
  for (const char of expression.split('')) {
    if (char >= '0' && char <= '9') {
      num += char;
    } else if (/[+\-*/]/.test(char)) {
      num = parseInt(num);
      switch (op) { // we're doing the last stored operation
        case '*':
          stack.push(stack.pop() * Number(num));
          break;
        case '/':
          stack.push(Math.floor(stack.pop() / Number(num)));
          break;
        case '+':
          stack.push(Number(num));
          break;
        case '-':
          stack.push(-Number(num));
          break;
      }
      num = '';  // reset the num
      op = char; // store the most recent operation
    }
  }
  return stack.reduce((total, value) => total + value, 0)
}

/* Used the solution, 50 min total, probably gave up around 30 min.
* A complete re-wiring of my brain into stack mode.
* since operations work such that you need to know a number, the operation, and
* the number after the operation, this solution is very elegant in that it stores
* the most recent operation it comes to but goes and stores the next number--once
* we encounter another symbol, then we have the number stored and the previous
* operation stored, so we can process those with the stack. Then it clears out the num
* and stores the most recent operation for processing next.
* Particularly smart to add a '+' to the end of the string so that the last number is added
* to the stack, and to pre-store the '+' in  `op` so that the first number gets
* added to the stack always.
* This was not a whitespace problem, that was smoke and mirrors. It mattered more
* to have a structured way to process the numbers while still respecting order
* of operations.
* I really don't know if I would have come up with this on my own! yikes!
*
* */

console.log(calculator("6 - 2") === 4);
console.log(calculator(" 8 / 3") === 2);
console.log(calculator("2+3*4") === 14);
console.log(calculator("10 - 2 * 3 + 4 ") === 8);
console.log(calculator(" 20 / 4 * 2 + 7") === 17);
console.log(calculator("5 + 3 * 2 - 8 / 4") === 9);
console.log(calculator("10+5/4-3*2+2") === 7);
console.log(calculator(" 30 / 3 * 2 - 4 * 2 / 4 + 1 ") === 19);
console.log(calculator("100 - 20 * 3 / 2 + 5 * 4 - 10 / 2 * 3") === 75);
// All test cases should log true.