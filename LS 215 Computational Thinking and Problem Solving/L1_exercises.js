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

// console.log(compareWords('gti', 'igt'));
// console.log(anagram('listen', ['enlists', 'google', 'inlets', 'banana']));  // [ "inlets" ]
// console.log(anagram('listen', ['enlist', 'google', 'inlets', 'banana']));   // [ "enlist", "inlets" ]

let bands = [
  { name: 'sunset rubdown', country: 'UK', active: false },
  { name: 'women', country: 'Germany', active: false },
  { name: 'a silver mt. zion', country: 'Spain', active: true },
];

function processBands(data) {
  let result = [];

  data.forEach(hash => {
    let newHash = {};
    newHash.name = cleanUpName(hash.name);
    newHash.country = 'Canada';
    newHash.active = hash.active;
    result.push(newHash);
  });
  return result;
}

function cleanUpName(name) {
  name = name.split(' ').map(word => capitalizeWord(word)).join(' ');
  return name.replace(/\./g, '')
}

function capitalizeWord(word) {
  word = word.split('');
  word.splice(0, 1, word[0].toUpperCase());
  return word.join('')
}

// console.log(
//   processBands(bands));

// should return:
// [
//   { name: 'Sunset Rubdown', country: 'Canada', active: false },
//   { name: 'Women', country: 'Canada', active: false },
//   { name: 'A Silver Mt Zion', country: 'Canada', active: true },
// ]

let studentScores = {
  student1: {
    id: 123456789,
    scores: {
      exams: [90, 95, 100, 80],
      exercises: [20, 15, 10, 19, 15],
    },
  },
  student2: {
    id: 123456799,
    scores: {
      exams: [50, 70, 90, 100],
      exercises: [0, 15, 20, 15, 15],
    },
  },
  student3: {
    id: 123457789,
    scores: {
      exams: [88, 87, 88, 89],
      exercises: [10, 20, 10, 19, 18],
    },
  },
  student4: {
    id: 112233445,
    scores: {
      exams: [100, 100, 100, 100],
      exercises: [10, 15, 10, 10, 15],
    },
  },
  student5: {
    id: 112233446,
    scores: {
      exams: [50, 80, 60, 90],
      exercises: [10, 0, 10, 10, 0],
    },
  },
};

function generateClassRecordSummary(scores) {
  let result = {studentGrades: [], exams: [],};
  Object.keys(scores).forEach(student => {
    result.studentGrades.push(studentGrade(scores[student]));
  })

  result.exams = examReport(scores)

  console.log(result)
  return result;
}

function calcExerciseScore(arr) {
  return arr.reduce( (total, el) => total += el);
}

function calcTestAverage(arr) {
  return (arr.reduce((total, el) => total += el) / arr.length);
}

function calculateGradePercent(testAve, exerciseGrade) {
  return Math.round(calcTestAverage(testAve) * .65 +
    calcExerciseScore(exerciseGrade) * .35);
}

function letterGrade(pointsOf100) {
  if (pointsOf100 > 93) {
    return 'A';
  } else if (pointsOf100 > 85) {
    return 'B';
  } else if (pointsOf100 > 77) {
    return 'C';
  } else if (pointsOf100 > 69) {
    return 'D';
  } else if (pointsOf100 > 60) {
    return 'E';
  } else {
    return 'F';
  }
}

function studentGrade(studentHash) {
  let grade = calculateGradePercent(studentHash.scores.exams,
    studentHash.scores.exercises);
  let letter = letterGrade(grade);
  return `${grade} (${letter})`;
}

function examReport(studentHash) {
  let examScores = examScoresByTest(studentHash)

  return examScores.map(test => {
    return {
      average: Number(calcTestAverage(test).toFixed(1)),
      minimum: test[0],
      maximum: test.slice(-1)[0],
    };
  });
}

function examScoresByTest(studentHash) {
  let scoresByStudent = Object.keys(studentHash).map(student => {
    return studentHash[student].scores.exams;
  });

  let scoresByTest = []

  for (let i = 0; i < scoresByStudent[0].length; i++) {
    scoresByStudent.forEach( arr => {
      scoresByTest[i] = scoresByTest[i] || [];
      scoresByTest[i].push(arr[i]);
    });
  }
  return scoresByTest.map(test => test.sort((a, b) => a - b))
}

// console.log(examScoresByTest(studentScores))
// console.log(examRange(studentScores.student1))
// console.log(studentGrade(studentScores.student2))
// console.log(letterGrade(96))
// console.log(calcTestAverage([50, 80, 60, 90]))
// console.log(calcTestAverage([90, 80, 90]))
// console.log(calcExerciseScore([20,30]))

// generateClassRecordSummary(studentScores);

// returns:
// {
//   studentGrades: [ '87 (B)', '73 (D)', '84 (C)', '86 (B)', '56 (F)' ],
//   exams: [
//   { average: 75.6, minimum: 50, maximum: 100 },
//   { average: 86.4, minimum: 70, maximum: 100 },
//   { average: 87.6, minimum: 60, maximum: 100 },
//   { average: 91.8, minimum: 80, maximum: 100 },
//   ],
// }

let scoresByStudent = Object.keys(studentScores).map(student => {
  return studentScores[student].scores.exams;
});

function transpose(array) {
  return array[0].map((col, columnIdx) => {
    return array.map(row => row[columnIdx]);
  });
}

// console.log(scoresByStudent)
// console.log(transpose(scoresByStudent))






