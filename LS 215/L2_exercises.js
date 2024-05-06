
let firstName = 'Viola';
let lastName = 'McCarthy';
let fullName = firstName + ' ' + lastName;
// console.log(fullName)

// console.log(firstName.concat(lastName));
// console.log(fullName.split(' '));

let language = 'JavaScript';
let idx = language.indexOf('S');
// console.log(idx);
let charCode = language.charCodeAt(idx);
// console.log(charCode);
// console.log(String.fromCharCode(charCode))
// console.log(language.lastIndexOf('a'));

let a = 'a';
let b = 'b';
// console.log(a > b);
b = 'B'
// console.log(a > b);

// console.log(language.slice(1,4));
// console.log(language.slice(2,4));
// console.log(language.substring(1,4));
// console.log(language.substring(2,4));

// console.log(language.slice(1,-1));
// console.log(language.slice(2,-1));
// console.log(language.substring(1,-1)); // same as (0,1) becase neg numbers
// considered 0, and
// substring always interprets the smaller number as the start, and the second
// as the length.
// console.log(language.substring(2,-1)); // same as (0,2)

let fact1 = 'JavaScript is fun';
let fact2 = 'Kids like it too';
let compoundSentence = fact1 + ' and ' + fact2.toLowerCase();
// console.log(compoundSentence)

let pi = 22/7;
// console.log(pi.toString().lastIndexOf('14'))

let boxNumber = (356).toString();
// console.log(boxNumber);

boxNumber = parseInt(boxNumber);
// console.log(typeof boxNumber);
boxNumber = String(boxNumber);
// console.log(typeof boxNumber);

const rlSync = require('readline-sync');
function screamer() {
  let name = rlSync.question("What's your name?\n");
  if (name.endsWith('!')) {
    console.log(`HEY ${name.slice(0, name.length - 1).toUpperCase()}. WHY ARE WE SCREAMING?`)
  } else {
    console.log(`Good morning, ${name}!`);
  }
}

screamer();
