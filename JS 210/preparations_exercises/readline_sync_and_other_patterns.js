let rlSync = require('readline-sync');
let name = rlSync.question("What's your name?\n");
console.log(`Good morning, ${name}!`);

// to build a tallying object:

let object = {};

if (object[key]) { // if the key exists (returns undefined if not),
  object[key] += 1; // add one to the tally
} else {
  object[key] = 1; // start the tally at 1
}
