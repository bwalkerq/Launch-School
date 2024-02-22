let numerator = 10;
const DENOMINATOR = 2;

let answer = numerator / DENOMINATOR;
// console.log(answer);

let incrementer = 1;
let start = incrementer;

let end; // this is a reserved word, I don't think it will work
let difference;

incrementer += 1;
incrementer += 1;
incrementer += 1;

incrementer++;
incrementer++;

end = incrementer;
difference = end - start;

// console.log(end);
// console.log(difference);

let arithmeticAnswer = (11 + 31) * 3
// console.log(arithmeticAnswer);

let x = '13';
let y = 9;

// console.log(+x + y);
// console.log(Number(x) + y);
// console.log(parseInt(x) + y);
//
// console.log(x * y);

let npa = 212;
let nxx = 555;
let num = 1212;

// console.log(String(npa) + String(nxx) + String(num));

let bool = true;
let arr = [1, 2, 3];

// console.log(bool.toString());
// console.log(arr.toString());
// console.log(npa.toString());
// console.log(nxx.toString());
// console.log(num.toString());

// # Practice Problems: Operators and Conditionals

let apples = 3;
let bananas = 5;
bananas = 1;
apples = 3;

areEqual = apples === bananas;
// console.log(areEqual)

eitherOr = apples || bananas;
// console.log(eitherOr)
eitherOr = bananas || apples;
// console.log(eitherOr)

if (apples === bananas) {
  // console.log("apples and bananas are equal");
} else if (apples == bananas) {
  // console.log("apples and bananas are equal and of different types.");
} else {
  // console.log("they're not strictly equal.");
}

let lastName = 'Walker';
let familyMessage = lastName === 'Walker' ? "You're part of the fam!" : "Nah";

// console.log(familyMessage)

function average(arr) {
  return sum(arr) / arr.length;
}

function sum(arr) {
  let total = 0
  for (let index = 0; index < arr.length; index++) {
    total += arr[index]
  }
  return total;
}


console.log(average([30,4,5,5,1]));





