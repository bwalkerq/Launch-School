
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
// console.log(isBalanced(3) === false);
// console.log(isBalanced([4]) === false);
// console.log(isBalanced(['34']) === false);

let textExcerpt = 'To be or not to be-that is the question:\n' +
  'Whether \'tis nobler in the mind to suffer\n' +
  'The slings and arrows of outrageous fortune,\n' +
  'Or to take arms against a sea of troubles,\n' +
  'And, by opposing, end them. To die, to sleep-\n' +
  'No more-and by a sleep to say we end\n' +
  'The heartache and the thousand natural shocks\n' +
  'That flesh is heir to-\'tis a consummation\n' +
  'Devoutly to be wished. To die, to sleep-\n' +
  'To sleep, perchance to dream. Aye, there\'s the rub,\n' +
  'For in that sleep of death what dreams may come,\n' +
  'When we have shuffled off this mortal coil,\n' +
  'Must give us pause. There\'s the respect\n' +
  'That makes calamity of so long life.\n' +
  'For who would bear the whips and scorns of time,\n' +
  'Th\' oppressor\'s wrong, the proud man\'s contumely, [F: poor]\n' +
  'The pangs of despised love, the law’s delay, [F: disprized]\n' +
  'The insolence of office, and the spurns\n' +
  'That patient merit of the unworthy takes,\n' +
  'When he himself might his quietus make\n' +
  'With a bare bodkin? Who would fardels bear, [F: these Fardels]\n' +
  'To grunt and sweat under a weary life,\n' +
  'But that the dread of something after death,\n' +
  'The undiscovered country from whose bourn\n' +
  'No traveler returns, puzzles the will\n' +
  'And makes us rather bear those ills we have\n' +
  'Than fly to others that we know not of?\n' +
  'Thus conscience does make cowards of us all,\n' +
  'And thus the native hue of resolution\n' +
  'Is sicklied o\'er with the pale cast of thought,\n' +
  'And enterprises of great pitch and moment, [F: pith]\n' +
  'With this regard their currents turn awry, [F: away]\n' +
  'And lose the name of action.-Soft you now,\n' +
  'The fair Ophelia.-Nymph, in thy orisons\n' +
  'Be all my sins remembered';

let positiveWords = ['fortune', 'dream', 'love', 'respect', 'patience', 'devout', 'noble', 'resolution'];
let negativeWords = ['die', 'heartache', 'death', 'despise', 'scorn', 'weary', 'trouble', 'oppress'];

function sentiment(text) {
  let sentiment = 'Neutral';

  let wordList = text.toLowerCase().match(/[a-z']+/g);
  // I looked at the solution for this. This is a nice way to capture all the
  // words into a processable array.
  // even if I had done full pedac for this prob, I wouldn't have come up with this

  let posIncluded = wordList.filter(word => {
    return positiveWords.includes(word);
  });
  let negIncluded = wordList.filter(word => {
    return negativeWords.includes(word);
  });

  let positiveCount = posIncluded.length - negIncluded.length;

  if (positiveCount > 0 ) {
    sentiment = 'Positive'
  } else if (positiveCount < 0) {
    sentiment = 'Negative'
  }

  let result = `There are ${posIncluded.length} positive words in the text.
  Positive sentiments: ${posIncluded.join(', ')}
  
There are ${negIncluded.length} negative words in the text.
  Negative sentiments: ${negIncluded.join(', ')}
  
The sentiment of the text is ${sentiment}.
  `
  console.log(result)
}

sentiment(textExcerpt);

// console output

// There are 5 positive words in the text.
//   Positive sentiments: fortune, dream, respect, love, resolution
//
// There are 6 negative words in the text.
//   Negative sentiments: die, heartache, die, death, weary, death
//
// The sentiment of the text is Negative.





























