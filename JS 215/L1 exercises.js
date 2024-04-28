function myForEach(array, func) {
  for (let i = 0; i < array.length; i++) {
    func(array[i], i, array);
  }
}
// at first, I had only passed array[i] to `func`, and not the index or the array...

let min = Infinity;
let getMin = value => (min = value <= min ? value : min);
myForEach([4, 5, 12, 23, 3], getMin);
// console.log(min);                        // 3

function myFilter(array, func) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    if (func(array[i])) result.push(array[i]);
  }
  return result;
}

let isPythagoreanTriple = function (triple) {
  return Math.pow(triple.a, 2) + Math.pow(triple.b, 2) === Math.pow(triple.c, 2);
};

myFilter([{ a: 3, b: 4,  c: 5 },
  { a: 5, b: 12, c: 13 },
  { a: 1, b: 2,  c: 3 },], isPythagoreanTriple);

// returns [ { a: 3, b: 4, c: 5 }, { a: 5, b: 12, c: 13 } ]

function myMap(array, func) {
  let result = [];

  array.forEach(el => result.push(func(el)));

  console.log(result)
  return result;
}

let plusOne = n => n + 1;
// myMap([1, 2, 3, 4], plusOne);       // [ 2, 3, 4, 5 ]

function getBooksTitle(books) {
 myMap(books, getTitle)
}

let books = [
  {
    title: 'JavaScript and JQuery: Interactive Front-End Web Development',
    author: 'Jon Ducket',
    edition: '1st',
  },
  {
    title: 'Eloquent JavaScript: A Modern Introduction to Programming',
    author: 'Haverbeke',
    edition: '2nd',
  },
  {
    title: "Learning Web Design: A Beginner's Guide to HTML, CSS, JavaScript, and Web Graphics",
    author: 'Jennifer Niederst Robbins',
    edition: '4th',
  },
];

function getTitle(book) {
  return book['title'];
}

// getBooksTitle(books);
// console output
// [
//   "JavaScript and JQuery: Interactive Front-End Web Development",
//   "Eloquent JavaScript: A Modern Introduction to Programming",
//   "Learning Web Design: A Beginner's Guide to HTML, CSS, JavaScript, and Web Graphics"
// ]

function myReduce(array, func, initial) {
  for (let i = 0; i < array.length; i++) {
    if (initial === undefined) {
      initial = array[0];
      i += 1;
    }
    initial = func(initial, array[i]);
  }
  console.log(initial)
  return initial;
}

let smallest = (result, value) => (result <= value ? result : value);
let sum = (result, value) => result + value;

// myReduce([5, 12, 15, 1, 6], smallest);           // 1
// myReduce([5, 12, 15, 1, 6], sum, 10);            // 49

function longestWord(words) {
  myReduce(words, longest)
}

function longest(result, currentWord) {
  return currentWord.length >= result.length ? currentWord : result;
}

// longestWord(['abc', 'launch', 'targets', '']);      // "targets"

function myOwnEvery(array, func) {
  for (let i = 0; i < array.length; i++) {
    if (!func(array[i])) {
      return false;
    }
  }
  return true;
}

let isAString = value => typeof value === 'string';
// console.log(myOwnEvery(['a', 'a234', '1abc'], isAString));       // true
// console.log(myOwnEvery(['a', 2, 'a234', '1abc'], isAString));       // false

// console.log(typeof Object.entries(books))
// This seems to show that `entries` is like `Array.p.slice()`.
// but I'm confused by the documentation, because it seems like it's just string copy?

let rectangles = [[3, 4], [6, 6], [1, 8], [9, 9], [2, 2]];

// console.log(totalArea(rectangles));    // 141

function totalArea(array) {
  return array.reduce(((total, subarray) => {
    return total = total + subarray[0] * subarray[1];
  }), 0)
}

// console.log(totalSquareArea(rectangles));    // 121

function totalSquareArea(array) {
  return totalArea(array.filter(element => element[0] === element[1]))
}

let newReleases = [
  {
    'id': 70111470,
    'title': 'Die Hard',
    'boxart': 'http://cdn-0.nflximg.com/images/2891/DieHard.jpg',
    'uri': 'http://api.netflix.com/catalog/titles/movies/70111470',
    'rating': [4.0],
    'bookmark': [],
  },
  {
    'id': 654356453,
    'boxart': 'http://cdn-0.nflximg.com/images/2891/BadBoys.jpg',
    'uri': 'http://api.netflix.com/catalog/titles/movies/70111470',
    'rating': [5.0],
    'bookmark': [{ id:432534, time:65876586 }],
  },
  {
    'title': 'The Chamber',
    'boxart': 'http://cdn-0.nflximg.com/images/2891/TheChamber.jpg',
    'uri': 'http://api.netflix.com/catalog/titles/movies/70111470',
    'rating': [4.0],
    'bookmark': [],
  },
  {
    'id': 675465,
    'title': 'Fracture',
    'boxart': 'http://cdn-0.nflximg.com/images/2891/Fracture.jpg',
    'uri': 'http://api.netflix.com/catalog/titles/movies/70111470',
    'rating': [5.0],
    'bookmark': [{ id:432534, time:65876586 }],
  },
];

function processReleaseData(data) {
  // ...
  let completeReleases = data.filter(el => el.title && el.id);
  return completeReleases.map(element => {
    return {
      id: element.id,
      title: element.title,
    }
  });
}

// console.log(processReleaseData(newReleases))

// should return:
// [{ id: 70111470, title: 'Die Hard'}, { id: 675465, title: 'Fracture' }];

function octalToDecimal(numberString) {
  let array = numberString.split('');
  let result = array.reverse().reduce( (total, el, index) => {
    return total += Number(el) * 8 ** index;
  }, 0);

  console.log(result)
  return result;
}

// octalToDecimal('1');           // 1
// octalToDecimal('10');          // 8
// octalToDecimal('130');         // 88
// octalToDecimal('17');          // 15
// octalToDecimal('2047');        // 1063
// octalToDecimal('011');         // 9

function anagram(word, list) {
  return list.filter( el => compareWords(word, el))
}

function compareWords(first, second) {
  if (first.length !== second.length) return false;
  first = first.split('').sort()
  second = second.split('').sort()

  for (let i = 0; i < first.length; i++) {
    if (first[i] !== second[i]) return false;
  }
  return true;
}

console.log(compareWords('gti', 'igt'));
console.log(anagram('listen', ['enlists', 'google', 'inlets', 'banana']));  // [ "inlets" ]
console.log(anagram('listen', ['enlist', 'google', 'inlets', 'banana']));   // [ "enlist", "inlets" ]



























