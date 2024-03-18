let pets = {
  cat: 'Simon',
  dog: 'Dwarf',
  mice: null,
};

function objectHasProperty(object, propertyName) {
  // for (const objectKey in object) {
  //   if (objectKey === propertyName) {
  //     return true;
  //   }
  // }
  // return false;
  let keys = Object.keys(object); // stores the keys as strings in an array, similar to ruby (dare I say it)
  return keys.indexOf(propertyName) !== -1; // if the index exists,
}

// console.log(objectHasProperty(pets, 'dog') === true)
// console.log(objectHasProperty(pets, 'lizard') === false)
// console.log(objectHasProperty(pets, 'mice') === true)

let wins = {
  steve: 3,
  susie: 4,
};

function incrementProperty(object, propertyName) {
  if (object[propertyName]) { // this will return undefined if the property name DNE
    object[propertyName] += 1;
  } else {
    object[propertyName] = 1;
  }
  // console.log(object[propertyName]);
  return object[propertyName];
}

// incrementProperty(wins, 'susie');   // 5
// wins;                               // { steve: 3, susie: 5 }
// incrementProperty(wins, 'lucy');    // 1
// wins;                               // { steve: 3, susie: 5, lucy: 1 }


let hal = {
  model: 9000,
  enabled: true,
};

let sal = {};

function copyProperties(firstObject, secondObject) {
  for (const firstObjectKey in firstObject) {
    secondObject[firstObjectKey] = firstObject[firstObjectKey];
  }
  return (Object.keys(firstObject).length);
}

// copyProperties(hal, sal);  // 2
// sal;                       // { model: 9000, enabled: true }

function wordCount(string) {
  let words = string.split(' ');
  let wordObject = {};
  words.forEach(function(word) {
    incrementProperty(wordObject, word);
  });
  console.log(wordObject);
}

// wordCount('box car cat bag box');  // { box: 2, car: 1, cat: 1, bag: 1 }

// Working with the Math object

function radiansToDegrees(radian) {
  console.log(radian / Math.PI * 180);
}

// radiansToDegrees(3.14)

let a;
// console.log(Math.abs(a));

let b;
// console.log(Math.sqrt(b));

// console.log(Math.pow(16, 6))

a = 50.72;
b = 49.2;
let c = 49.86;

// console.log(Math.floor(a));
// console.log(Math.ceil(b));
// console.log(Math.round(c));

function randomInteger(min, max) {
  if (min === max) {
    return min;
  } else if (min > max) {
    [min, max] = [max, min];
  }

  let range = max - min;
  let rInt = Math.round(Math.random() * range + min);
  console.log(rInt);
  return rInt;
}
// my solution completely from my own thinking, close enough to their solution,
// though mine may have a one-off edge case bug. Theirs includes the expression
// `Math.floor(Math.random() * (max - min + 1) + min)`

// randomInteger(1,2)

// dates

let today = new Date();

function dateSuffix(integer) {
  if (integer === 11 || integer === 12 || integer === 13) {
    return 'th';
  } else if (integer % 10 === 1) {
    return 'st';
  } else if (integer % 10 === 2) {
    return 'nd';
  } else if (integer % 10 === 3) {
    return 'rd';
  } else {
    return 'th';
  }
}

function formattedMonth(date) {
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months[date.getMonth()];
}

function formattedDay(date){
  let daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return daysOfWeek[date.getDay()];
}

function formattedDate(date) {
  let day = formattedDay(date);
  let month = formattedMonth(date);
  return `The date is ${day}, ${month} ${date.getDate()}${dateSuffix(date.getDate())}.`
}

// console.log(formattedDate(today));

// console.log(today.getFullYear())

//total milliseconds since Jan. 1st 1970
// console.log(today.getTime());

let tomorrow = new Date(today.getTime());
tomorrow.setDate(today.getDate() + 1);
// console.log(formattedDate(tomorrow));

let nextWeek = new Date(today.getTime());

// console.log(nextWeek.toDateString())
// nextWeek.setDate(today.getDate() + 7)
// console.log(nextWeek.toDateString())
// console.log(nextWeek.toDateString() === today.toDateString())

function formatTime(date) {
  console.log(String(date.getHours()).padStart(2, 0) + ':' + String(date.getMinutes()).padStart(2, 0));
}

// formatTime(today)

// Date value passed: 2013-03-01T01:10:00
// console.log(formatTime(new Date(2013, 2, 1, 1, 7)));


// Assignment 12: Welcome Stranger

function greetings(array, object) {
  let name = array.join(' ')
  let titleOccupation = object['title'] + ' ' + object['occupation']
  console.log(`Hello, ${name}! Nice to have a ${titleOccupation} around.`)
}

// greetings(['John', 'Q', 'Doe'], { title: 'Master', occupation: 'Plumber' });

// console output
// Hello, John Q Doe! Nice to have a Master Plumber around.

function repeatedCharacters(str) {
  let letters = str.toLowerCase().split('');
  let repeats = {};

  for (let i = 0; i < letters.length; i++) {
    if (repeats[letters[i]]) {
      repeats[letters[i]] += 1;
    } else {
      repeats[letters[i]] = 1;
    }
  }
  for (const repeatsKey in repeats) {
    if (repeats[repeatsKey] < 2)
      delete repeats[repeatsKey];
  }
  console.log(repeats)
  return repeats;
}

repeatedCharacters('Programming');    // { r: 2, g: 2, m: 2 }
repeatedCharacters('Combination');    // { o: 2, i: 2, n: 2 }
repeatedCharacters('Pet');            // {}
repeatedCharacters('Paper');          // { p: 2 }
repeatedCharacters('Baseless');       // { s: 3, e: 2 }













