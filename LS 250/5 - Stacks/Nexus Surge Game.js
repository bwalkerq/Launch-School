// You're keeping score for a futuristic game called "Nexus Surge."
// In this game, players accumulate points in unusual ways. At the
// start of each round, you begin with an empty scoreboard.

// You receive a sequence of scoring actions as an array of strings.
// Each action in the sequence is one of the following:

//  -  An integer x:
//      - Add a new score of x points to the scoreboard.
//  - '+':
//      - Add a new score that is the sum of the two most recent scores.
//  - '*':
//      - Add a new score that is double the most recent score.
//  - '-':
//      - Remove the most recent score from the scoreboard.

// Create a function `nexusSurge` that calculates and returns the sum
//  of all scores on the scoreboard after applying all the given actions.

// The input will be an array of valid operations.

// For operation "+", there will always be at least two previous scores on the record.
// For operations "*" and "-", there will always be at least one previous score on the record.

// Example 1:

// Input: actions = ["7","3","-","*","+"]
// Output: 42
// Explanation:
// "7" - Add 7 to the scoreboard, scoreboard is now [7].
// "3" - Add 3 to the scoreboard, scoreboard is now [7, 3].
// "-" - Remove the previous score, scoreboard is now [7].
// "*" - Add 2 * 7 = 14 to the scoreboard, scoreboard is now [7, 14].
// "+" - Add 7 + 14 = 21 to the scoreboard, scoreboard is now [7, 14, 21].
// The total sum is 7 + 14 + 21 = 42.

// Example 2:

// Input: actions = ["8","-3","6","-","*","12","+","+"]
// Output: 35
// Explanation:
// "8" - Add 8 to the scoreboard, scoreboard is now [8].
// "-3" - Add -3 to the scoreboard, scoreboard is now [8, -3].
// "6" - Add 6 to the scoreboard, scoreboard is now [8, -3, 6].
// "-" - Remove the previous score, scoreboard is now [8, -3].
// "*" - Add 2 * -3 = -6 to the scoreboard, scoreboard is now [8, -3, -6].
// "12" - Add 12 to the scoreboard, scoreboard is now [8, -3, -6, 12].
// "+" - Add -6 + 12 = 6 to the scoreboard, scoreboard is now [8, -3, -6, 12, 6].
// "+" - Add 12 + 6 = 18 to the scoreboard, scoreboard is now [8, -3, -6, 12, 6, 18].
// The total sum is 8 + (-3) + (-6) + 12 + 6 + 18 = 35.

// Example 3:

// Input: actions = ["4","-"]
// Output: 0
// Explanation:
// "4" - Add 4 to the scoreboard, scoreboard is now [4].
// "-" - Remove the previous score, scoreboard is now [].
// Since the scoreboard is empty, the total sum is 0.

/* P: given an array of strings that are either numbers or operations, compute
* the correct scoreboard, and then output the sum of all the integers.
* E: BAE, and we're guaranteed that the symbols will always behave well.
* D: stack, which I don't really know how to implement other than an array...
* Although we wrote a basic stack situation in the DSA book, all we did was
* implement a peek, push, pop setup. I think here it's more straightforward?
* A:
* for each string in the actions
*   if -
*     pop from the scoreboard
*   if +
*     last two scoreboard values are summed, sum pushed to the scoreboard
*   if *
*     last scoreboard value*2, pushed to the scoreboard
*   else, meaning it's a number
*     push to the scoreboard
*
* return summed scoreboard, use reduce
* */

function nexusSurge(actions) {
  let scoreboard = [];
  for (const action of actions) {
        const last = scoreboard.length - 1
    switch (action) {
      case '-':
        scoreboard.pop();
        break;
      case '+':
        scoreboard.push(scoreboard[last] + scoreboard[last - 1]);
        break;
      case '*':
        scoreboard.push(scoreboard[last] * 2);
        break;
      default:
        scoreboard.push(Number(action));
    }
  }
  return scoreboard.reduce((total, v) => total + v, 0); // remember to pass the
  // initial value of the total (here, zero) after a comma after the callback.
}
/* 18 minutes, but I didn't have a case for the empty scoreboard. I wrote that
case and tweaked my solution.
*/

console.log(nexusSurge(["3", "4", "+"]) === 14);
console.log(nexusSurge(["3", "-"]) === 0);
console.log(nexusSurge(["5", "-", "-2"]) === -2);
console.log(nexusSurge(["1", "-", "-3", "*"]) === -9);
console.log(nexusSurge(["5", "-2", "+", "-", "7", "*"]) === 24);
console.log(nexusSurge(["-3", "-", "4", "8", "+", "*"]) === 48);
console.log(nexusSurge(["1", "-2", "3", "-", "+", "-"]) === -1);
console.log(nexusSurge(["-10", "*", "-", "5", "+", "7"]) === -3);
console.log(nexusSurge(["6", "-", "-8", "*", "2", "+"]) === -36);
console.log(nexusSurge(["1", "-", "2", "*", "+", "-10", "-", "*"]) === 24);
// All test cases should log true.