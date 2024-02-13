function say() {
    console.log("this is the output from the function")
}

// say()

function getNumber(prompt) {
    let rlSync = require('readline-sync')
    return parseFloat(rlSync.question(prompt))
}

function multiply(first, second) {
    return first * second
}
// let first = getNumber("first number? ")
// let second = getNumber("second number? ")
// console.log(`${first} * ${second} = ${multiply(first, second)}`)
function trueOrFalse (arg) {
    return !!arg;
}

// console.log(trueOrFalse(''))
// console.log(trueOrFalse(' '))
// console.log(trueOrFalse('a'))
// console.log(trueOrFalse('0'))

let a = 8;

switch (a) {
    case 5: // compares with strict equality
        console.log('a is 5');
        break;  // note the necessary break each time, no short circuit here,
// and would just run the rest of the code
    case 6:
        console.log('a is 6');
        break;
    default: // similar to the `else` in an `if` statement
        console.log('a is neither 5, nor 6');
        break;
} // => a is 5

function evenOrOdd(int) {
    switch (int) {

    }

}

function i() {}