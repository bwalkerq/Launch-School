let ladder = '';

  ['head', 'heal', 'teal', 'tell', 'tall', 'tail'].forEach(word => {
  if (ladder !== '') {
    ladder += '-';
  }

  ladder += word;
});

// console.log(ladder);  // expect: head-heal-teal-tell-tall-tail
//those semicolons got me


const RESERVED_KEYWORDS = ['break', 'case', 'catch', 'class', 'const', 'continue',
  'debugger', 'default', 'delete', 'do', 'else', 'enum', 'export', 'extends', 'finally',
  'for', 'function', 'if', 'implements', 'import', 'in', 'instanceof', 'interface',
  'let', 'new', 'package', 'private', 'protected', 'public', 'return', 'static',
  'super', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while',
  'with', 'yield'];

function isReserved(name) {
  let caught = false
  RESERVED_KEYWORDS.forEach(reserved => {
    if (name === reserved) {
      caught = true;
    }
  });

  return caught;
}

// console.log(isReserved('monkey')); // false
// console.log(isReserved('patch'));  // false
// console.log(isReserved('switch')); // should be: true
// console.log(isReserved('break')); // should be: true
/*
MAN this one totally got me, I had no idea. Now I know that #forEach does NOT
terminate its iteration with a return statement, and that the function always
returns `undefined` regardless. That is a really important aspect of the function!
I missed it, and figured this out with Paco's help.
 */


// Picks n random elements from an array,
// and returns a new array with those elements.
function random(array, n) {
  if (n === undefined) {
    n = 1;
  }

  const elements = array.slice();
  const randomElements = [];

  while (n > 0 && elements.length > 0) {
    const randomIndex = Math.floor(Math.random() * elements.length);
    const randomElement = elements[randomIndex];
    // both of the above need to be dynamic, not const

    randomElements.push(randomElement);
    elements.splice(randomIndex, 1);
    n--;
  }

  return randomElements;
}

// Ingredients

const ingredients = ['rice', 'green bell pepper', 'mushrooms', 'carrot', 'kebab',
  'spinach', 'soy bean sprouts', 'mashed potatoes', 'corn', 'cucumber', 'peas'];

const spices = ['peri peri', 'cinnamon', 'nutmeg', 'cardamom', 'ground ginger',
  'poppy seed', 'cumin'];

const extras = ['peanuts', 'sesame seeds', 'egg', 'wasabi', 'soy sauce'];

// Name

const adjective  = ['Delicious', 'Hot', 'Exotic', 'Creative', 'Festive', 'Dark'];
const firstNoun  = ['Power', 'After Work', 'Holiday', 'Disco', 'Late Night'];
const secondNoun = ['Mix', 'Delight', 'Bowl', 'Chunk', 'Surprise', 'Bliss'];

// Generate!

const dishName = random(adjective).concat(random(firstNoun), random(secondNoun));
const dish = random(ingredients, 3).concat(random(spices, 2), random(extras, 1));
/* using `+` fucks this up; don't use operators on arrays; in this case, it
does `+` with each of the elements, making it not an array

The craziest thing is that I thought line 53 would bust this, because a const
can't be mutated, but that's wrong; a const can't be reassigned. Whoops!
I figured that since elements would be added to it in the function, that would break,
but it's fine since the array is always the same object, just with elements added.
wow!
 */

// console.log(`How about: ${dishName.join(' ')}`);
// console.log(`You need: ${dish.join(', ')}`);























