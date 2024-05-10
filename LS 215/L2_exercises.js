
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

// screamer();

function reverse(string) {
  return string.split('').reverse().join('');
}

reverse('hello');                  // returns "olleh"
reverse('The quick brown fox');    // returns "xof nworb kciuq ehT"

function acronym(string) {
  return string.split(/[\W]/).map(word => word[0]).join('').toUpperCase()
}

// console.log(acronym('Portable Network Graphics'));                  // "PNG"
// console.log(acronym('First In, First Out'));                        // "FIFO"
// console.log(acronym('PHP: HyperText Preprocessor'));                // "PHP"
// console.log(acronym('Complementary metal-oxide semiconductor'));    // "CMOS"
// console.log(acronym('Hyper-text Markup Language'));                 // "HTML"


function myisValidEmail(email) {
  let arr = email.split('@');
  if (arr.length !== 2) return false;
  return validLocal(arr[0]) && validDomain(arr[1]);
}

function validLocal(localPart) {
  return !!localPart.match(/^[a-zA-Z0-9]+$/);
}

function validDomain(domain) {
  let domainParts = domain.split('.');
  if (domainParts.length < 2) return false;
  for (let i = 0; i < domainParts.length; i++) {
    if (!domainParts[i].match(/^[a-zA-Z]+$/)) {
      return false;
    }
  }
  return true;
}

// my functions were easier to read, but their function, which I studied and then

function isValidEmail(email) {
  return !!email.match(
    /^[a-z0-9]+@([a-z]+\.)+([a-z]+)$/i
  )
}
// console.log(isValidEmail('Foo@baz.com.ph'));          // returns true
// console.log(isValidEmail('Foo@mx.baz.com.ph'));       // returns true
// console.log(isValidEmail('foo@baz.com'));             // returns true
// console.log(isValidEmail('foo@baz.ph'));              // returns true
// console.log(isValidEmail('HELLO123@baz'));            // returns false
// console.log(isValidEmail('foo.bar@baz.to'));          // returns false
// console.log(isValidEmail('foo@baz.'));                // returns false
// console.log(isValidEmail('foo_bat@baz'));             // returns false
// console.log(isValidEmail('foo@bar.a12'));             // returns false
// console.log(isValidEmail('foo_bar@baz.com'));         // returns false
// console.log(isValidEmail('foo@bar.....com'));         // returns false

/*
input: string
output: boolean

if the string has balanced parenthesis (grammatically correct), return true, else false

e:
isBalanced('What (is) this?');        // true
isBalanced('What is) this?');         // false close, no open (odd)
isBalanced('What (is this?');         // false inverse of above
isBalanced('((What) (is this))?');    // true
isBalanced('((What)) (is this))?');   // false extra close at the end
isBalanced('Hey!');                   // true none, that's fine
isBalanced(')Hey!(');                 // false even number but close then open, wrong order
isBalanced('What ((is))) up(');       // false last pair in string is close then open

d:
filter only parentheses, then run a check where the outer ... no
instead, have a tally
  ( means plus 1
  ) means minus one
  if we tally each, at the end we must have 0

a:
guard input: non-string
length of a string min or max?
any forbidden characters?
do I have to throw an error, or just log an error?

  initialize counter
  iterate through each character
  if ( or ) tally accordingly
    if tally ever goes negative (close before open) return false

  after iteration, if tally 0 return true, else false
 */

function isBalanced(string) {
  if (typeof string !== 'string') {
    return false;
  }

  let counter = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i] === '(') {
      counter += 1;
    } else if (string[i] === ')') {
      counter -= 1;
      if (counter < 0) return false;
    }
  }

  return !!!counter;
}

// console.log(isBalanced('What (is) this?') === true);
// console.log(isBalanced('What is) this?') === false);
// console.log(isBalanced('What (is this?') === false);
// console.log(isBalanced('((What) (is this))?') === true);
// console.log(isBalanced('((What)) (is this))?') === false);
// console.log(isBalanced('Hey!') === true);
// console.log(isBalanced(')Hey!(') === false);
// console.log(isBalanced('What ((is))) up(') === false);
console.log(isBalanced(3) === false);
console.log(isBalanced([4]) === false);
console.log(isBalanced(['34']) === false);

































