const person = {
  firstName: 'Rick ',
  lastName: 'Sanchez',
  fullName: this.firstName + this.lastName,
};

// console.log(person.fullName);

/*This one got me
* I expected the execution context to be `person` because the method belonging
* to `person` was invoked.
*
* This is incorrect, since the method is being invoked
* in the global context. When the method is called and evaluates `this.firstName`,
* `this` is bound to the global object. so the return value is `undefined` since
* there is no global property named `firstName`
* */

const franchise1 = {
  name: 'How to Train Your Dragon',
  allMovies() {
    let self = this;
    return [1, 2, 3].map(function(number) {
      return `${self.name} ${number}`;
    });
  },
};

const franchise = {
  name: 'How to Train Your Dragon',
  allMovies() {
    return [1, 2, 3].map(function(number) {
      return `${this.name} ${number}`;
    }.bind(this)); /* I originally tried to bind the map call, but that's
    incorrect; `bind` is a method of `Function` so it must be invoked on a function.
    In this case, it must be invoked on the anonymous function within the map
    call, so just one parenthesis set in from what I tried first.*/
  },
};
// console.log(franchise.allMovies())

function myBind1(func, context) {
  return function () {
    func.apply(context);
  }
}
/* I came really close to this solution, first just writing line 44 as the whole
* body of the function, and then later trying to wrap it in an anonymous function,
* I guess I got the syntax wrong at first?? It makes sense conceptually now that
* myBind has to return an anonymous function that calls the `func` with `apply` with
* the set context saved in the closure.*/

let obj = {name: 'Benji'}
function say(arg1, arg2) {
  console.log(this.name, arg1, arg2)
}
let boundBenji = myBind1(say, obj);

// boundBenji();

function myBind(func, context, ...rest) {
  return function (args) {
    func.apply(context, rest);
  }
}
// say('test', 'this', 'that')
let betterBoundBenji = myBind(say, obj, 'the', 'great')
betterBoundBenji()
/* Well, I thought I did the solution, but I see now that I overlooked part
* of the implementation. Here's theirs:
* function myBind(func, ctx, ...partialArgs) {
  return function(...args) {
    const fullArgs = partialArgs.concat(args);

    return func.apply(ctx, fullArgs);
  };
}
* this allows arguments to still be passed with the new bound function,
* which my solution did not allow; mine only allowed arguments to be passed with
* the initial binding, but that's only 'half' of partial function application.
* */
function myBindUpdated(func, context, ...partialArgs) {
  return function (...args) {
    const fullArgs = partialArgs.concat(args);
    return func.apply(context, fullArgs);
  }
}
// I wrote this from memory/reason


function myFilter(array, func, context) {
  const result = [];

  array.forEach(value => {
    if (func.call(context, value)) {
      result.push(value);
    }
  });

  console.log(result)
  return result;
}

const filter = {
  allowedValues: [5, 6, 9],
};

myFilter([2, 1, 3, 4, 5, 6, 12], function(val) {
  return this.allowedValues.includes(val);
}, filter); // returns [5, 6]


// Make A Stack










