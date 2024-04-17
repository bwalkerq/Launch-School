function closureExample() {
  let age = 2;
  return function() {
    console.log(`Olie is ${age} years old. Wow!)`);
    age += 1;
  }
}

let kronos = closureExample();
// closure created for the returned function (stored in kronos) that includes a
// pointer to the variable age, which is initialized when closureExample is
// executed. The pointer to this variable allows the function stored in kronos to
// keep track of the current value of `age` as the function is executed, and the
// age increases.
kronos(); // Olie is 2
kronos(); // Olie is 3


// extra credit
let otherTimeGod = closureExample()
// here, another nearly identical function is stored in this other variable, but
// this time, it has a pointer to a different variable, of the same name (age)
// and initial value (2) that gets incremented each time otherTimeGod is executed.
otherTimeGod(); // Olie is 2
kronos(); // Olie is 4
otherTimeGod() // Olie is 3


function birthAKid(name) {
  let age = 0;
  return function() {
    console.log(`${name} is ${age} years old. Wow!)`);
    age += 1;
  }
}

let olieBirthday = birthAKid('Olie');
olieBirthday();
let ednaBirthday = birthAKid('Edna');
ednaBirthday();
ednaBirthday();
ednaBirthday();

function wishHappyBirthday(nameOfPerson, theirAge) {
  console.log(`Happy Birthday, ${nameOfPerson}! You are ${theirAge} years old!`)
}

function birthdayWisher(name) {
  return function (age) {
    return wishHappyBirthday(name, age);
  };
}

let olieBirthdayWisher = birthdayWisher('Olie');
let ednaBirthdayWisher = birthdayWisher('Edna');

olieBirthdayWisher(3);
ednaBirthdayWisher(30)
