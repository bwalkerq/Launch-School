// let foo = "bar";
// console.log(foo);
// foo;

function evenOrOdd(number) {
  if (!Number.isInteger(number)) {
    console.log("This isn't a number.");
  } else if (number % 2 === 0) {
    console.log('even');
  } else {
    console.log('odd');
  }
}

// evenOrOdd(-2)
// evenOrOdd(-3)
// evenOrOdd(0)
// evenOrOdd('sdf')

function capLongStrings(string) {
  if (string.length > 10) {
    return string.toUpperCase() // totally strange that the method has to be called with the () after
  } else {
    return string
  }
}
// console.log(capLongStrings('asdfkjhasdflkjahsdf'))
// console.log(capLongStrings('lkjahsdf'))

function numberRange(n) {
  if (n < 0) {
    console.log(`${n} is less than 0`)
  } else if (n >= 0 && n <= 50) {
    console.log(`${n} is between 0 and 50`)
  } else if (n >= 0 && n <= 50) {
    console.log(`${n} is between 50 and 100`)
  } else {
    console.log(`${n} is greater than 100`)
  }
}

// numberRange(25);
// numberRange(75);
// numberRange(125);
// numberRange(-25);

console.log(false ?? null);
