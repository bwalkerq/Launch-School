function randomGreeting() {
  const words = ['Hello', 'Howdy', 'Hi', 'Hey there', 'What\'s up',
    'Greetings', 'Salutations', 'Good to see you'];

  const idx = Math.floor(Math.random() * words.length);

  return words[idx];
}

function greet(...args) {
  const names = Array.prototype.slice.call(args);

  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const greeting = randomGreeting();

    console.log(`${greeting}, ${name}!`);
  }
}

// greet('Hannah', 'Jose', 'Beatrix', 'Julie', 'Ian');

function includesFalse(list) {
  for (let i = 0; i < list.length; i++) {
    let element = list[i];

    if (element === false) {
      return true;
    }
  }

  return false;
}
// returns:
// console.log(includesFalse([8, null, 'abc', true, 'launch', 11, false]));       // true
// console.log(includesFalse(['programming', undefined, 37, 64, true, 'false'])); // false
// console.log(includesFalse([9422, 'lambda', true, 0, '54', null]));             // true

const rlsync = require('readline-sync');
function placeABet(guess) {
  function generateRandomInt() {
    return Math.floor(Math.random() * 25) + 1;
  }

  const winningNumber = generateRandomInt();

  if (guess < 1 || guess > 25) {
    return 'Invalid guess. Valid guesses are between 1 and 25.';
  }

  if (guess === winningNumber) {
    return "Congratulations, you win!";
  } else {
    return "Wrong-o! You lose.";
  }
}

// const userGuess = parseInt(rlsync.prompt('Input a guess between 1-25'), 10);
// rlsync.alert(placeABet(userGuess));

function wantToVisit(museum, city) {
  return museum.includes('Computer')
      || museum.includes('Science')
      || (museum.includes('Modern')
          && museum.includes('Art')
          && (museum.includes('Andy Warhol')
            || city === 'Amsterdam'));
}

// Tests (should all print 'true')

// console.log(wantToVisit('Computer Games Museum', 'Berlin') === true);
// console.log(wantToVisit('National Museum of Nature and Science', 'Tokyo') === true);
// console.log(wantToVisit('Museum of Modern Art', 'New York') === false);
// console.log(wantToVisit('El Paso Museum of Archaeology', 'El Paso') === false);
// console.log(wantToVisit('NEMO Science Museum', 'Amsterdam') === true);
// console.log(wantToVisit('National Museum of Modern Art', 'Paris') === false);
// console.log(wantToVisit('Andy Warhol Museum of Modern Art', 'Medzilaborce') === true);
// console.log(wantToVisit('Moco: Modern Contemporary Art', 'Amsterdam') === true);
// console.log(wantToVisit('Van Gogh Museum', 'Amsterdam') === false);
// console.log(wantToVisit('Andy Warhol Museum', 'Melbourne') === false);

const transactionLog = [];

function processInput(input) {
  const numericalData = parseFloat(input);

  if (Number.isNaN(numericalData)) {
    throw (new Error('Data could not be converted to numerical amount.'));
  }

  return numericalData;
}

function logTransaction() {
  let data = rlsync.question('Please enter the transaction amount: ');

  try {
    data = processInput(data);
    transactionLog.push(data);

    console.log('Thank you. Data accepted.');
  } catch (error) {
    console.log(error.message);
  }
}

function transactionTotal() {
  let total = 0;

  for (let i = 0; i < transactionLog.length; i++) {
    total += transactionLog[i];
  }

  return total;
}

// logTransaction();
// logTransaction();
// logTransaction();
//
// console.log(transactionTotal());

// const species = ['wolf', 'human', 'wasp', 'squirrel', 'weasel', 'dinosaur'];
// const isMidnight = true;
// const isFullmoon = true;
//
// function isTransformable(species) {
//   return species[0] === 'w';
// }
//
// function transform(species) {
//   return `were${species}`;
// }
//
// for (let index = 0; index < species.length; index++) {
//   const thisSpecies = species[index];
//   let newSpecies;
//
//   if (isMidnight && isFullmoon && isTransformable(thisSpecies)) {
//     newSpecies = transform(thisSpecies);
//   }
//
//   if (newSpecies) {
//     console.log(`Beware of the ${newSpecies}!`);
//   }
// }

// so far I've been able to spot every issue, but also, webstorm does a damn
// good job of it; it's spotted every error that wasn't the logical || && type
// errors.

// Roles (salary still to be determined)

const ceo = {
  tasks: ['company strategy', 'resource allocation', 'performance monitoring'],
  salary: 0,
};

const developer = {
  tasks: ['turn product vision into code'],
  salary: 0,
};

const scrumMaster = {
  tasks: ['organize scrum process', 'manage scrum teams'],
  salary: 0,
};

// Team -- we're hiring!

const team = {};

team.ceo = 'Kim';
team.scrumMaster = 'Alice';
team.developer = undefined;

const company = {
  name: 'Space Design',
  team,
  projectedRevenue: 500000,
};

// console.log(`----{ ${company.name} }----`);
// console.log(`CEO: ${company.team.ceo}`);
// console.log(`Scrum master: ${company.team.scrumMaster}`);
// console.log(`Projected revenue: $${company.projectedRevenue}`);

// ----{ Space Design }----
// CEO: undefined
// Scrum master: undefined
// Projected revenue: $500000

// The shopping cart is a list of items, where each item
// is an object { name: <string>, amount: <number> }.
let shoppingCart = [];

// Currently available products with prices.
const prices = {
  'notebook': 9.99,
  'pencil': 1.70,
  'coffee': 3.00,
  'smoothie': 2.10,
};

function price({name}) {
  return prices[name];
}

// Adding an item to the shopping cart.
// The amount is optional and defaults to 1.
// If the item is already in the cart, its amount is updated.
function updateCart(name, amount = 1) {
  let alreadyInCart = false;

  for (let i = 0; i < shoppingCart.length; i += 1) {
    let item = shoppingCart[i];

    if (item.name === name) {
      item.amount = amount;
      alreadyInCart = true;
      break;
    }
  }

  if (!alreadyInCart) {
    shoppingCart.push({ name, amount });
  }
}

// Calculating the price for the whole shopping cart.
function total() {
  let total = 0;

  for (let i = 0; i < shoppingCart.length; i += 1) {
    let item = shoppingCart[i];

    total += (item.amount * price(item));
  }

  return total.toFixed(2);
}

function pay() {
  // omitted

  console.log(`You have been charged $${total()}.`);
}

function checkout() {
  pay();
  shoppingCart = [];
}

// Example purchase.

updateCart('notebook');
updateCart('pencil', 2);
updateCart('coffee', 1);

// Oh wait, I don't need pencils
updateCart('pencil', 0);

checkout();

/* I found the bug (that the guard clause for defaulting the value of 'amount'
to 1 was reading an amount of zero as falsy) but their solution was better;
I wrote mine to handle the undefined value for an argument that isn't passed,
when the real move is to just default the value of the argument in the function
declaration. Much more direct.
 */

const totalPages = 364;
let currentPage = 1;
let energy = 100;

function read() {

  while (energy > 0 && currentPage < totalPages) {
    currentPage += 1;
    energy -= (5 + currentPage * 0.1);
  }

  console.log(`Made it to page ${String(currentPage)}.`);

  // Drink a cup of coffee.
  energy = 100;

  // Continue reading.
  if (currentPage < totalPages) {
    read();  // this causes an infinite loop
  } else {
    console.log('Done!');
  }
}

read();
/* by calling the function from within itself, the function resets itself to page
1 each time it gets to the recursive call.

the solution is to move the page = 1 line to the top of the program.
 */

/* overall, these problems built my confidence because I was able to identify
each issue. I wonder if I should have done these earlier? Actually dang, this
feeling is familiar; I think I felt this way about debugging problems in one
class of the backend, too. oy vey. I'll try to keep in mind for a future class.
 */











