// console.log((false && undefined)); // f
// console.log((false || undefined)); // und
// console.log(((false && undefined) || (false || undefined))); // und
// console.log(((false || undefined) || (false && undefined))); // f
// console.log(((false && undefined) && (false || undefined))); // f
// console.log(((false || undefined) && (false && undefined))); // und
// console.log(('a' || (false && undefined) || '')); // 'a'
// console.log(((false && undefined) || 'a' || '')); // 'a'
// console.log(('a' && (false || undefined) && '')); // und
// console.log(((false || undefined) && 'a' && '')); // und
// remember that the logical operators return the last evaluated operand, NOT nec a boolean

// let i = 0;
// while (i < 10) {
//   if (i % 3 === 0) {
//     console.log(i);
//     // this needs to increment; it will get stuck on i = 3. Rather, i = 0.
//   } else {
//     i += 1;
//   }
// }

function padLeftExercise(number) {
  const stringNumber = String(number);
  switch (stringNumber.length) {
    case 1:  return `  ${stringNumber}`;
    case 2:  return ` ${stringNumber}`;
    default: return stringNumber;
  }
}

for (let i = 1; i < 10; i += 1) {  // off by one error, doesn't reach 10
  let row = '';
  for (let j = 1; j <= 10; j += 1) {
    row += `${padLeftExercise(i * j)} `;
  }

  // console.log(row);
}


function getSelectedColumns(numbers, cols) {
  var result = [];

  for (var i = 0; i < numbers.length; i += 1) {
    for (var j = 0; j < cols.length; j += 1) {
      if (!result[j]) {
        result[j] = [];
      }

      result[j][i] = numbers[i][cols[j]];
    }
  }

  console.log(result)
  return result;
}

// given the following arrays of number arrays
const array1 = [[10, 2, 3], [40, 5, 6], [70, 8, 9]];
const array2 = [[1, 20, 3], [1, 20, 3], [1, 20, 3]];

// `array1` in row/column format
// [[1, 2, 3],
//  [4, 5, 6],
//  [7, 8, 9]]

// getSelectedColumns(array1, [0]);     // [[1]];            expected: [[1, 4, 7]]
// getSelectedColumns(array1, [0, 2]);  // [[1, 4], [3, 6]]; expected: [[1, 4, 7], [3, 6, 9]]
// getSelectedColumns(array2, [1, 2]);  // [[2, 2], [3, 3]]; expected: [[2, 2, 2], [3, 3, 3]]

/* got hella burned on this trying to find the mistake in the logic of making columns,
but the bullshit was just that for loops were written with insanity, and I just
let it fly. What bullshit. I hate problems that are written like no engineer would
and the problem is simply, well, it was written in a crazy way that no one ever
would, so there you have it. Just look at this:

  for (var i = 0, length = numbers.length; i < length; i += 1) {
    for (var j = 0, length = cols.length; j < length; j += 1) {

Right away, I was like, that's insane. of course, I didn't catch the length variable
is overwritten. Trust my instincts to just rewrite a thing so it doesn't suck.
 */


// var counter = 5;
// var rate = 3;
// console.log('The total value is ' + String(counter * rate));
//
// function counter(count) {
//   // ...
// }
// // equals
// function counter(count){}
// var rate;
//
// counter = 5;
// rate = 3;
//
// console.log()
// no problem
/*
the function counter will be hoisted above var declaration, but counter isn't
called with () so it will reference the variable. and the output will be 15.
 */

// function counter(count) {
//   // ...
// }
//
// console.log('The total value is ' + String(counter * rate));
//
// var counter = 5;
// var rate = 3;

// equals
// function counter(count) {
//   // ...
// }
// var rate;
//
// console.log('The total value is ' + String(counter * rate));
//
// counter = 5;
// rate = 3;

/*
since counter and rate aren't assigned until after the log call, it returns
undefined when called for the multiplication.
 */

// #3
// var counter = 5;
// var rate = 3;
//
// function counter(count) {
//   // ...
// }
//
// console.log('The total value is ' + String(counter * rate));

// equals when hoisted:
// function counter(count) {
//   // ...
// }
// counter = 5;
// var rate = 3;
//
// console.log('The total value is ' + String(counter * rate));
// logs 15
/*
the variable counter is reassigned to 5 with the second var statement
 */

// let counter = 5;
// let rate = 3;
//
// function counter(count) {
//   // ...
// }
//
// console.log('The total value is ' + String(counter * rate));

/* no hoisting rewrite for this, because the error (syntax error) occurs prior
to the hoisting! When a variable is declared with let or const, there can't be
multiple declarations of a variable. In this case, the function declaration will
throw a syntax error since 'counter' has already been declared. Syntax errors
usually occur during the creation phase, prior to hoisting.
 */

function debugIt() {
  const status = 'debugging';
  function logger() {
    console.log(status);
  }

  logger();
}

debugIt();
// this logs 'debugging' because the constant status has BLOCK scope, and is
// accessible to logger().
// the solution says this is due to LEXICAL scoping rules.
// This feels like the type of problem that I will get wrong if I'm not careful.
// Would saying "block" scope instead of "lexical" be sufficient?

function invoiceTotal(...amount) {
  let sum = 0;
  amount.forEach(amt => sum += amt);
  return sum;
}

// invoiceTotal(20, 30, 40, 50);          // works as expected
// invoiceTotal(20, 30, 40, 50, 40, 40);  // does not work; how can you make it work?

function productOfSums(array1, array2) {
  let result = total(array1) * total(array2);
  return result;
}

function total(numbers) {
  let sum = 0;

  for (let i = 0; i < numbers.length; i += 1) {
    sum += numbers[i];
  }

  return sum;
}

console.log('test', productOfSums([1,2], [3,4,5]));





























