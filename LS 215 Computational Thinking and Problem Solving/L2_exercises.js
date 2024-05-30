
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

function sentiment1(text) {

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

  let sentiment = 'Neutral';
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

// sentiment1(textExcerpt);

// console output

// There are 5 positive words in the text.
//   Positive sentiments: fortune, dream, respect, love, resolution
//
// There are 6 negative words in the text.
//   Negative sentiments: die, heartache, die, death, weary, death
//
// The sentiment of the text is Negative.

let positiveRegex = /\bfortunes?\b|\bdream(s|t|ed)?\b|love(s|d)?\b|respect(s|ed)?\b|\bpatien(ce|t)?\b|\bdevout(ly)?\b|\bnobler?\b|\bresolut(e|ion)?\b/gi;
let negativeRegex = /\bdie(s|d)?\b|\bheartached?\b|death|despise(s|d)?\b|\bscorn(s|ed)?\b|\bweary\b|\btroubles?\b|\boppress(es|ed|or('s)?)?\b/gi;

function sentiment(text) {
  let posIncluded = text.toLowerCase().match(positiveRegex)
  let negIncluded = text.toLowerCase().match(negativeRegex)
  let positiveCount = posIncluded.length - negIncluded.length;

  let sentiment = 'Neutral';
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
  `;
  console.log(result)
}

// sentiment(textExcerpt);

// console output

// There are 9 positive type words in the text.
//   Positive sentiments: nobler, fortune, devoutly, dream, dreams, respect, love, patient, resolution
//
// There are 10 negative type words in the text.
//   Negative sentiments: troubles, die, heartache, die, death, scorns, oppressor's, despised, weary, death
//
// The sentiment of the text is Negative.


let emailData = "From: foo@bar.com#/#\nSubject: Nunc in justo eros. Aliquam.#/#\nDate: 07-27-2016#/#\nTo: foo@bar.com#/#\nEtiam convallis commodo tortor, dapibus auctor dolor semper consequat. Sed lobortis eros nec ante porta, eu placerat sapien interdum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi consectetur et odio vitae volutpat. Curabitur imperdiet orci metus, et dignissim nisl lacinia non. Aenean volutpat diam in lorem iaculis, sit amet volutpat nibh dictum. Quisque vel vulputate nisi. Nam a vestibulum turpis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi interdum leo id velit aliquet, at vestibulum ipsum molestie. Cras eu lobortis libero. In rutrum non leo id ultricies. Aliquam in ex ut nibh placerat sollicitudin vitae id magna.##||##\n\nFrom: baz@foo.com#/#\nSubject: Aenean cursus velit non arcu.#/#\nDate: 08-11-2016#/#\nTo: baz@foo.com#/#\nCras ex leo, faucibus id mollis a, dignissim sit amet metus. Sed dui massa, mollis in tristique ut, auctor quis tortor. Donec egestas velit purus, eget laoreet urna venenatis id. Etiam eget ultrices tortor. Duis venenatis leo mi, non porta est molestie at. Nulla lacus nisl, dapibus convallis massa ut, dignissim euismod lacus. Ut vel magna lectus. Morbi sit amet vulputate arcu. Cras non ante arcu. Nam tempor iaculis ipsum eget tincidunt. Praesent imperdiet varius dui, vel egestas ipsum porta in. Sed suscipit massa in neque lobortis congue.##||##\n\nFrom: qux@bar.com#/#\nSubject: Sed hendrerit felis in ex.#/#\nDate: 06-25-2016#/#\nTo: qux@bar.com#/#\nNulla quis est vitae orci tincidunt convallis sit amet ut libero. Sed eu facilisis justo. Maecenas sed ultrices urna. Sed malesuada justo sed magna sodales, eget congue dolor convallis. Vestibulum vel consectetur nunc. Morbi at tincidunt turpis, eget imperdiet orci. Curabitur laoreet ipsum a quam facilisis, eu aliquet lectus viverra. Maecenas ullamcorper rutrum dui, ac aliquet mi pulvinar sit amet.##||##\n\nFrom: quux@foo.com#/#\nSubject: Curabitur tincidunt elit nec risus.#/#\nDate: 07-24-2016#/#\nTo: quux@foo.com#/#\nCurabitur interdum dictum consectetur. Nulla facilisi. Quisque sed tellus consectetur, vestibulum quam sed, lacinia mauris. Nunc risus dolor, feugiat nec erat at, elementum tempor urna. Vivamus facilisis elementum congue. Cras dui libero, vehicula eget porttitor sed, sagittis quis dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam lacinia nulla nisi, vel finibus ligula sodales quis. Maecenas vulputate, leo auctor venenatis pretium, lectus elit eleifend odio, nec molestie ligula ex eget tellus. Nullam a nibh ut enim efficitur elementum. Nunc non elit vitae tortor iaculis ornare in id risus. Integer finibus lobortis lorem, id rutrum elit congue id. In hac habitasse platea dictumst.##||##\n\nFrom: garply@foo.com#/#\nSubject: Integer nec nunc facilisis, ultricies.#/#\nDate: 07-03-2016#/#\nTo: garply@foo.com#/#\nFusce rhoncus purus nisi, vel blandit felis fermentum sed. Vestibulum ultricies rutrum dui nec vehicula. Proin quis semper nulla. Maecenas congue, leo nec feugiat dapibus, dui metus facilisis elit, non finibus leo nisl at est. Donec varius, turpis non pulvinar sodales, nulla nulla posuere ligula, nec eleifend quam metus ut tortor. Sed semper vestibulum mattis. Nullam et ornare eros. Aliquam sed pellentesque dui, ut consequat neque. Integer luctus turpis ultrices, congue erat mattis, vehicula tellus. Pellentesque tincidunt posuere nibh pretium tincidunt. In hac habitasse platea dictumst.";
/*
input: long string of email info
output: logged message that includes the number of emails, and the date range

p: there are a bunch of emails with consistent delimiters between messages, and
between parts of the message
log the number of messages (easy)
log the date range

d: array, potentially sub arrays

a:
split the long string by the first delimiter, each element represents the email message
split each message by the second delim, each subarray represents the 5 parts of each email

map the email array to just the dates
  email subarray, take the elment at index 2 (date) and split on ' ', then return
  the 1th element (the actual date).

sort the date array (may have to convert to date objects)

for the number of messages, we simply want the count of the first array
for the date range, we need all the dates, sort them, return the first and the last.

 */

function mailCount(emailData) {
  let emails = emailData.split('##||##');

  emails = emails.map(email => {
    return email.split('#/#')
  });

  let dates = emails.map(emailSubArray => {
    return emailSubArray[2].split(' ')[1];
  })
    .sort()
    .map(string => new Date(string));

  console.log(`Count of Email: ${emails.length}
    Date Range: ${dates[0]} - ${dates[dates.length - 1]}')
    `);
}

mailCount(emailData);

// console output
// Count of Email: 5
// Date Range: Sat Jun 25 2016 - Thu Aug 11 2016

let longText = 'Four score and seven years ago our fathers brought forth' +
  ' on this continent a new nation, conceived in liberty, and' +
  ' dedicated to the proposition that all men are created' +
  ' equal.' +
  ' Now we are engaged in a great civil war, testing whether' +
  ' that nation, or any nation so conceived and so dedicated,' +
  ' can long endure. We are met on a great battlefield of that' +
  ' war. We have come to dedicate a portion of that field, as' +
  ' a final resting place for those who here gave their lives' +
  ' that that nation might live. It is altogether fitting and' +
  ' proper that we should do this.' +
  ' But, in a larger sense, we can not dedicate, we can not' +
  ' consecrate, we can not hallow this ground. The brave' +
  ' men, living and dead, who struggled here, have' +
  ' consecrated it, far above our poor power to add or' +
  ' detract. The world will little note, nor long remember' +
  ' what we say here, but it can never forget what they' +
  ' did here. It is for us the living, rather, to be dedicated' +
  ' here to the unfinished work which they who fought' +
  ' here have thus far so nobly advanced. It is rather for' +
  ' us to be here dedicated to the great task remaining' +
  ' before us -- that from these honored dead we take' +
  ' increased devotion to that cause for which they gave' +
  ' the last full measure of devotion -- that we here highly' +
  ' resolve that these dead shall not have died in vain' +
  ' -- that this nation, under God, shall have a new birth' +
  ' of freedom -- and that government of the people, by' +
  ' the people, for the people, shall not perish from the' +
  ' earth.';

function longestSentence(text) {
  let sentences = text.split(/[.?!]+ /);
  let longest = sentences.sort((a,b) => b.length - a.length)[0];
  let longestLength = longest.split(' ').length;

  console.log('The longest sentence is:\n' + longest + '\n');
  console.log(`The longest sentence has ${longestLength} words.`)
}

longestSentence(longText);

// console output
// It is rather for us to be here dedicated to the great task remaining before us -- that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion -- that we here highly resolve that these dead shall not have died in vain -- that this nation, under God, shall have a new birth of freedom -- and that government of the people, by the people, for the people, shall not perish from the earth.
//
//   The longest sentence has 86 words.


  // Assuming the last sentence is removed:

  // longestSentence(longText);

// console output
// Four score and seven years ago our fathers brought forth on this continent a new nation, conceived in liberty, and dedicated to the proposition that all men are created equal.
//
//   The longest sentence has 30 words.

















