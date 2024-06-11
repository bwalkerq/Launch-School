// 'use strict'
// In strict mode, the global object is not accessible as the implicit execution context.

// a = 10;
// console.log(global.a === a)

// function func() {
//   let b = 1;
// }

// func();


// console.log(b)

function foo() {
  return this;
}

let context = foo();
// console.log(context);

let obj = {
  foo() {
    return this;
  },
};

context = obj.foo();

// console.log(context);

// A6.5
var a = 10; // if this were a `let` declaration, the add function would
// not have a global property to reference (since only `var` does that. We'd get NaN
let b = 10;
let c = {
  a: -10,
  b: -10,
};

function add() {
  return this.a + b;
}

c.add = add;  // note that writing the second `add` here like this stores the
// function as a property, I thought it needed `()` but that's for a function
// invocation.

// console.log(add()); // I knew this would output 20
// console.log(c.add());  // thought this would output -20. but it outputs 0.
/* because the `this.a` references the execution context of the object, but the
* `b` is referencing the local variable */


// In the code below, use call to invoke bar.add as a method but with foo as
// the execution context. What will this return?
 foo = {
  a: 1,
  b: 2,
};

let bar = {
  a: 'abc',
  b: 'def',
  add() {
    return this.a + this.b;
  },
};

// console.log(
//   bar.add.call(foo)
// );

let fruitsObj = {
  list: ['Apple', 'Banana', 'Grapefruit', 'Pineapple', 'Orange'],
  title: 'A Collection of Fruit',
};

function outputList() {
  console.log(this.title + ':');

  let args = [].slice.call(arguments);

  args.forEach(function(elem) {
    console.log(elem);
  });
}

// invoke outputList here
// outputList.apply(fruitsObj, fruitsObj.list)
/* Since the function takes an array, it's better to send the array stored as
* the property .list
* */


let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
    return this.firstName + ' ' + this.lastName + ' is a ' + this.occupation + '.';
  }
};

function logReturnVal(func, context) {
  let returnVal = func.call(context);
  console.log(returnVal);
}

// logReturnVal(turk.getDescription, turk);

let getTurkDescription = turk.getDescription.bind(turk);
// console.log(getTurkDescription())


//fixed with arrow function
let TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames() {
    this.titles.forEach(title => {
      console.log(this.seriesTitle + ' ' + title);
    });
  }
};

// TESgames.listGames();

/*Desired:
* The Elder Scrolls Arena
The Elder Scrolls Daggerfall
The Elder Scrolls Morrowind
The Elder Scrolls Oblivion
The Elder Scrolls Skyrim
* */

//same prob fixed with let self = this
TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames() {
    let self = this;
    this.titles.forEach(function(title) {
      console.log(self.seriesTitle + ' ' + title);
    });
  }
};

// TESgames.listGames();

// solved with `thisArg`
TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ' ' + title);
    }, this);
  }
};

// TESgames.listGames();

foo = {
  a: 0,
  incrementA() {
    let increment = () => {
      this.a += 1;
    }

    increment();
    // instead of arrow, could use call/apply to give explicit context
    // increment.apply(this);
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();
// console.log(foo.a)


foo = {
  a: 0,
  incrementA() {
    let increment = function () {
      this.a += 1;
    }.bind(this);

    increment();
    increment();
    increment();
  }
};
foo.incrementA();
// console.log(foo.a)

// I did pretty solid with those "What is this?(1)"

let myObject = {
  count: 1,
  myChildObject: {
    myMethod() {
      return this.count;
    },
  },
};
// console.log(myObject.myChildObject.myMethod.call(myObject));

// passing context as an argument
let computer = {
  price: 30000,
  shipping: 2000,
  total() {
    let tax = 3000;
    function specialDiscount(context) {
      if (context.price > 20000) {
        return 1000;
      } else {
        return 0;
      }
    }

    return this.price + this.shipping + tax - specialDiscount(this);
  }
};

// console.log(computer.total());

// arrow function
computer = {
  price: 30000,
  shipping: 2000,
  total() {
    let tax = 3000;
    specialDiscount = () => {
      if (this.price > 20000) {
        return 1000;
      } else {
        return 0;
      }
    }

    return this.price + this.shipping + tax - specialDiscount();
  }
};

// console.log(computer.total());

// binding the context to special discount
computer = {
  price: 30000,
  shipping: 2000,
  total() {
    let tax = 3000;
    let specialDiscount = function () {
      if (this.price > 20000) {
        return 1000;
      } else {
        return 0;
      }
    }.bind(this);

    return this.price + this.shipping + tax - specialDiscount();
  }
};

// console.log(computer.total());

// call/apply
computer = {
  price: 30000,
  shipping: 2000,
  total() {
    let tax = 3000;
    function specialDiscount() {
      if (this.price > 20000) {
        return 1000;
      } else {
        return 0;
      }
    }

    return this.price + this.shipping + tax - specialDiscount.apply(this);
  }
};

// console.log(computer.total());

// save context to local variable
computer = {
  price: 30000,
  shipping: 2000,
  total() {
    let tax = 3000;
    let self = this;
    function specialDiscount() {
      if (self.price > 20000) {
        return 1000;
      } else {
        return 0;
      }
    }

    return this.price + this.shipping + tax - specialDiscount();
  }
};

// console.log(computer.total());















