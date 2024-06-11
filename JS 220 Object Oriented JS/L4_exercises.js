
// let numbers = [1, 2, 3, 4];
// function makeCheckEven() {
//   return function (number) {
//       return number % 2 === 0;
//   }
// }

// let checkEven = makeCheckEven();

// console.log(numbers.filter(checkEven)); // [2, 4]

function execute(func, operand) {
  return (func(operand))
}

// console.log(execute(function(number) {
//   return number * 2;
// }, 10)); // 20
//
// console.log(execute(function(string) {
//   return string.toUpperCase();
// }, 'hey there buddy')); // "HEY THERE BUDDY"


function makeListTransformer(func) {
  // ... implement this function
  return function (array) {
    return array.map(func);
  }
}

let timesTwo = makeListTransformer(function(number) {
  return number * 2;
});

// console.log(timesTwo([1, 2, 3, 4])); // [2, 4, 6, 8]


function makeCounterLogger(startingNum) {
  return function (endingNum) {
    if (endingNum > startingNum) {
      for (let i = startingNum; i <= endingNum; i++) {
        console.log(i);
      }
    } else {
      for (let i = startingNum; i >= endingNum; i--) {
        console.log(i);
      }
    }
  }
}

// let countLog = makeCounterLogger(5);
// countLog(8); // 5,6,7,8
//
// countLog(2); // 5,4,3,2

function makeList() {
  let listArray = [];
  return function (arg) {
    if (arg === undefined) {
      if (listArray.length === 0) return 'The list is empty';
      listArray.forEach(value => console.log(value));
    } else if (listArray.includes(arg)) {
      let idx = listArray.indexOf(arg);
      return listArray.splice(idx, 1)[0] + ' removed!';
    } else {
      listArray.push(arg);
      return arg + ' added!';
    }
  }
}

// let list = makeList();
// list();
// list('make breakfast');
// list('read book');
// list();
// list('make breakfast');
// list();

function makeMultipleLister(num) {
  return function () {
    for (let counter = num; counter < 100; counter += num) {
      console.log(counter);
    }
  }
}

let lister = makeMultipleLister(13);
// lister();

let total = 0;
function addToTotal(num) {
  return total += num;
}

function subtractFromTotal(num) {
  return total -+ num;
}

// console.log(addToTotal(1));
// console.log(subtractFromTotal(10));

function startup() {
  let status = 'ready';
  return function() {
    console.log('The system is ready.');
  };
}

let ready = startup();
let systemStatus = // ?
  /* Is there a way to set the value of `systemStatus` to the value of the inner
   variable `status` without changing `startup` in any way? If so, how?
  * I answered no, and was correct.
  This is the technique for defining private variables. cool
  */


  function makeList() {
    let items = [];

    return {
      list() {
        if (items.length === 0) {
          console.log('The list is empty.');
        } else {
          items.forEach(item => {
            console.log(item);
          });
        }
      },

      add(newItem) {
        items.push(newItem);
        console.log(newItem + ' added!');
      },

      remove(item) {
        let index = items.indexOf(item);
        items.splice(index, 1);
        console.log(item + ' removed!');
      },
    };
  }
/* I figured out how to accomplish this with a closure, thanks to heavy scaffolding
* in the previous question. Still cool though!
* This was the first time the webstorm failed me; for some reason it didn't see
* `add` as a function. This works in node, however, and my solution essentially
* matched that given one
* */

// let list = makeList();
// list.add('peas');
// list.list();
// list.add('corn');
// list.list();
// list.remove('peas');
// list.list();

// Assignment 7
function makeBank() {
  let accountNumber = 101;
  let accounts= [];

  function makeAccount(number) {
    let balance = 0;
    let transactions = [];

    return {
      balance() {return balance},
      number() {return number},
      transactions() {return transactions},
      deposit(amount) {
        balance += amount;
        transactions.push({type:'deposit', amount: amount})
        return amount;
      },
      withdraw(amount) {
        if (amount > this.balance) {
          amount = this.balance;
        }
        transactions.push({type:'withdrawal', amount: amount})
        balance -= amount;
        return amount;
      }
    };
  }

  return {
    openAccount() {
      let newAccount = makeAccount(accountNumber);
      accountNumber += 1;
      accounts.push(newAccount);
      return newAccount;
    },
    transfer(source, destination, amount) {
      return destination.deposit(source.withdraw(amount));
    }
  };
}

// Garbage Collection problems
// let a = [1];
//
// function add(b) {
//   a = a.concat(b);
// }
//
// function run() {
//   let c = [2];
//   let d = add(c);
// }

// run();
/* The reference to the value `[1]` can be GC after line 519 runs, since `a` is
reassigned.
`[2]` can be GC after `run()` completes execution
`[1,2]` can be GC after the entire program has completed running, since it's global
 */
function greet(greeting, name) {
  greeting = greeting[0].toUpperCase() + greeting.slice(1);
  console.log(`${greeting}, ${name}!`);
}

// greet('howdy', 'Joe');
// Howdy, Joe!
// greet('good morning', 'Sue');
// Good morning, Sue!

function partial(primary, arg1) {
  return function(arg2) {
    return primary(arg1, arg2);
  };
}

let sayHello = partial(greet,'Hello');
// sayHello('Benji')
let sayHi = partial(greet,'Hi');
// sayHi('brosef')
// remember that when I pass a function as an argument, I pass only the *name*,
// `func`, of the function, NOT the function invocation `func()`


function subtract(a, b) {
  return a - b;
}

function makeSub(num) {
  return function (arg1) {
    return subtract(arg1, num);
  };
}

const sub5 = makeSub(5);

// console.log(sub5(10)); // 5
// console.log(sub5(20)); // 15

function subtract(a, b) {
  return a - b;
}

function makeSubN(n) {
  return function (arg1) {
    return subtract(arg1, n)
  }
}

const sub4 = makeSubN(4);
const sub7 = makeSubN(7);

// console.log(sub4(10)); // 6
// console.log(sub4(20)); // 16
// console.log(sub7(10)); // 3
// console.log(sub7(20)); // 13


function makePartialFunc(func, b) {
  return function (a) {
    return func(a,b)
  }
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

let multiplyBy5 = makePartialFunc(multiply, 5);
let divideBy2 = makePartialFunc(divide, 2);

// console.log(multiplyBy5(100)); // 500
// console.log(divideBy2(100)); // 50

let subjects = {
  English: ['Bob', 'Tyrone', 'Lizzy'],
  Math: ['Fatima', 'Gary', 'Susan'],
  Biology: ['Jack', 'Sarah', 'Tanya'],
};

function rollCall(subject, students) {
  console.log(subject + ':');
  students.forEach(function(student) {
    console.log(student);
  });
}

function makeMathRollCall() {
  return function (arr) {
    return rollCall('Math', arr);
  };
}

let mathRollCall = makeMathRollCall();
// mathRollCall(subjects['Math']);
// => Math:
// => Fatima
// => Gary
// => Susan

// (function() {
//   console.log("Sometimes, syntax isn't intuitive!")
// })();

var sum = 0;
var numbers;

sum += 10;
sum += 31;

numbers = [1, 7, -3, 3];

sum += (function sum(arr) {
  return arr.reduce(function(sum, number) {
    sum += number;
    return sum;
  }, 0);
})(numbers);
// console.log(sum)

function countdown(count) {
  return (function (num) {
    for (let i = 0; i <= num; i++) {
      console.log(num - i);
    }
    console.log('Done!')
  })(count);
}
// countdown(7);













