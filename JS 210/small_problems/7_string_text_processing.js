
isUppercase('t');               // false
isUppercase('T');               // true
isUppercase('Four Score');      // false
isUppercase('FOUR SCORE');      // true
isUppercase('4SCORE!');         // true
isUppercase('');                // true

function isUppercase(str) {
  return str === str.toUpperCase();
}

/*
Mine is more readable, but at least I learned RegExp.p.test() from their solution.
Returns true if there is a match; false otherwise.


function isUppercase(string) {
  return !/[a-z]/.test(string);
}
 */

removeVowels(['abcdefghijklmnopqrstuvwxyz']);         // ["bcdfghjklmnpqrstvwxyz"]
removeVowels(['green', 'YELLOW', 'black', 'white']);  // ["grn", "YLLW", "blck", "wht"]
removeVowels(['ABC', 'AEIOU', 'XYZ']);                // ["BC", "", "XYZ"]

function removeVowels(arr) {
  return (arr.map(word => word.replace(/[aeiou]/gi, '')));
}

letterCaseCount('abCdef 123');  // { lowercase: 5, uppercase: 1, neither: 4 }
letterCaseCount('AbCd +Ef');    // { lowercase: 3, uppercase: 3, neither: 2 }
letterCaseCount('123');         // { lowercase: 0, uppercase: 0, neither: 3 }
letterCaseCount('');            // { lowercase: 0, uppercase: 0, neither: 0 }

function letterCaseCount(string) {
  let result = { lowercase: 0, uppercase: 0, neither:0 }
  string.split('').forEach(character => {
    if (/[a-z]/.test(character)) {
      result.lowercase += 1;
    } else if (/[A-Z]/.test(character)) {
      result.uppercase += 1;
    } else {
      result.neither += 1;
    }
  });
  return result;
}

/* their solution is crazy
The main learning is that String.p.match returns an array containing each match (in this
case, each matching character). Another nice component of their solution is that
there's an array of all the matches readily available within that function,
or poised for refactoring.

function letterCaseCount(string) {
  const lowerArray = string.match(/[a-z]/g) || [];
  // returns an array of each character that matches the regex!! or an empty
  // array if no matches.
  const upperArray = string.match(/[A-Z]/g) || [];
  const neitherArray = string.match(/[^a-z]/gi) || [];

  return {
    lowercase: lowerArray.length,
    uppercase: upperArray.length,
    neither: neitherArray.length,
  };
}
 */


function wordCap1(string) {
  return string.split(' ')
    .map(word => {
    let array = word.split('');
    array[0] = word[0].toUpperCase();
    return array.join('');
  }).join(' ');
}
// my solution is more clunky with storing the array, and joining it. Theirs
// is preferable, using slice to return parts of the word. I will do that next time.

function wordCap(string) {
  return string.split(' ')
    .map(word => word.slice(0,1).toUpperCase() + word.slice(1))
    .join(' ');
}

wordCap('four score and seven');       // "Four Score And Seven"
wordCap('the javaScript language');    // "The Javascript Language"
wordCap('this is a "quoted" word');    // 'This Is A "quoted" Word'

function swapCase(string) {
  return string.split('').map(char => {
    if (/[a-z]/.test(char)) {
      return char.toUpperCase();
    } else if (/[A-Z]/.test(char)) {
      return char.toLowerCase();
    } else {
      return char;
    }
  }).join('');
}

swapCase('CamelCase');              // "cAMELcASE"
swapCase('Tonight on XYZ-TV');      // "tONIGHT ON xyz-tv"


function staggeredCase(string) {
  return (string.split('')
    .map((char, idx) => {
      if (idx % 2 === 0) return char.toUpperCase();
      return char.toLowerCase();
    })
    .join(''));
}

staggeredCase('I Love Launch School!');        // "I LoVe lAuNcH ScHoOl!"
staggeredCase('ALL_CAPS');                     // "AlL_CaPs"
staggeredCase('ignore 77 the 4444 numbers');   // "IgNoRe 77 ThE 4444 nUmBeRs"

function staggeredCase2(string) {
  let counter = 0;
  return (string.split('')
    .map(char => {
      if (/[^a-zA-Z]/.test(char)) {
        return char;
      } else if (counter % 2 === 0) {
        counter += 1;
        return char.toUpperCase();
      } else {
        counter += 1;
        return char.toLowerCase();
      }
    })
    .join(''));
}

staggeredCase2('I Love Launch School!');        // "I lOvE lAuNcH sChOoL!"
staggeredCase2('ALL CAPS');                     // "AlL cApS"
staggeredCase2('ignore 77 the 444 numbers');    // "IgNoRe 77 ThE 444 nUmBeRs"

function wordLengths(string) {
  if (arguments.length === 0 || string === '') return [];
  return (string.split(' ').map(word => `${word} ${String(word.length)}`));
}

wordLengths('cow sheep chicken');
// ["cow 3", "sheep 5", "chicken 7"]

wordLengths('baseball hot dogs and apple pie');
// ["baseball 8", "hot 3", "dogs 4", "and 3", "apple 5", "pie 3"]

wordLengths("It ain't easy, is it?");
// ["It 2", "ain't 5", "easy, 5", "is 2", "it? 3"]

wordLengths('Supercalifragilisticexpialidocious');
// ["Supercalifragilisticexpialidocious 34"]

wordLengths('');      // []
wordLengths();        // []


function searchWord(target, text) {
  // return (text.match(new RegExp(target, 'gi')).length) // my solution less readable
  // const regex = new RegExp(target, 'gi');  // this solution matches partial words
  const regex = new RegExp(`\\b${target}\\b`, 'gi');
  // the '\b' denotes a word boundary, so adding them to the start and end of
  // the target makes this match only whole words.
  const matches = text.match(regex);

  console.log( matches ? matches.length : 0);
  return matches ? matches.length : 0;
}

const text = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?';

searchWord('sed', text);      // 3
searchWord('qui', text);      // should return 4, NOT 13
searchWord('ab', text);      //

function searchWord2(target, text) {
  const regex = new RegExp(`\\b${target}\\b`, 'gi');
  // return text.split(' ').map(word => {
  //     if (regex.test(word)) {
  //       return `**${String(word).toUpperCase()}**`;
  //     } else {
  //       return word;
  //     }
  //   }).join(' ');
  return text.replace(regex, `**${target.toUpperCase()}**`)
}
// Their solution much more direct! The use of String.p.replace, returns a new string
console.log(searchWord2('ab', text));





























