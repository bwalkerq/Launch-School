let rlSync = require('readline-sync');


const crunch = (string) => {
  let newString = '';

  for (let index = 0; index < string.length; index++) {
    if (string[index] !== string[(index + 1)]) {
      newString += string[index];
    }
  }

  console.log(newString);
  return newString;
}
// crunch('ddaaiillyy ddoouubbllee');    // "daily double"
// crunch('4444abcabccba');              // "4abcabcba"
// crunch('ggggggggggggggg');            // "g"
// crunch('a');                          // "a"
// crunch('');                           // ""

function logInBox(string) {
  let dashes = '-'.repeat(string.length);
  let spaces = ' '.repeat(string.length);
  let boxTemplate = `  +-${dashes}-+ 
  | ${spaces} |
  | ${string} |
  | ${spaces} |
  +-${dashes}-+
  `;
  console.log(boxTemplate);
}

// logInBox('To boldly go where no one has gone before.');
// logInBox('I love you, too!!!')

function stringy(length) {
  let output = '';
  for (let i = 0; i < length; i++) {
    if (i % 2 === 1) {
      output += '0';
    } else {
      output += '1';
    }
  }
  return output
}


// console.log(stringy(6) === "101010");
// console.log(stringy(9) === "101010101");
// console.log(stringy(4) === "1010");
// console.log(stringy(7) === "1010101");

function triange(rows) {
  let stars = '*';
  let spaces = ' '.repeat(rows - 1);

  for (let count = 0; count < rows; count++) {
    console.log(spaces + stars);
    stars += '*';
    spaces = spaces.slice(1);
  }
}

// triange(5);
// triange(10);

function madlibs() {
  let noun = rlSync.question('Enter a noun:')
  let verb = rlSync.question('Enter a verb:')
  let adjective = rlSync.question('Enter a adjective:')
  let adverb = rlSync.question('Enter a adverb:')

  console.log(`Do you ${verb} your ${adjective} ${noun} ${adverb}? That's hilarious!`)
}

// madlibs()

function twice(int) {
  let length = String(int).length;
  let leftSide = String(int).slice(0, length/2);
  let rightSide = String(int).slice(length/2, length);

  if (leftSide === rightSide) {
    return int;
  } else {
    return int * 2;
  }
}

// console.log(twice(37) === 74)
// console.log(twice(44) === 44)
// console.log(twice(334433) === 668866)
// console.log(twice(444) === 888)
// console.log(twice(107) === 214)
// console.log(twice(103103) === 103103)
// console.log(twice(3333) === 3333)
// console.log(twice(7676) === 7676)

function cleanUp(str) {
  const regex = /[^A-Za-z]+/g
  console.log(str.replaceAll(regex, ' '));
}

// cleanUp("---what's my +*& line?");    // " what s my line "

const century = (year) => {
  let centuryAsInteger = Math.ceil(year / 100);

  let mod100 = centuryAsInteger % 100
  if ( mod100 === 11 || mod100 === 12 || mod100 === 13) {
    return centuryAsInteger + 'th'
  }

  let modifier = '';
  switch (centuryAsInteger % 10) {
    case 1:
      modifier = 'st';
      break;
    case 2:
      modifier = 'nd';
      break;
    case 3:
      modifier = 'rd';
      break;
    default:
      modifier = 'th';
      break;
  }
  return centuryAsInteger + modifier;
}

// console.log(century(2000) === "20th")
// console.log(century(2001) === "21st")
// console.log(century(1965) === "20th")
// console.log(century(256) === "3rd")
// console.log(century(5) === "1st")
// console.log(century(10103) === "102nd")
// console.log(century(1052) === "11th")
// console.log(century(1127) === "12th")
// console.log(century(11201) === "113th")





























