To do:
- prewrite for hoisting
- prewrite for 
# 211 Study Guide
- ### assignments and comparison
  - `let variable = 1;`
  - use strict comparison
  - without using `var` or `let`, the variable becomes a property of the global object (treated as a global
  variable)
- ### variable scope, especially how variables interact with function definitions and blocks
  - variables declared in the outer scope are accessible from within functions, and blocks
  - (JS functions are similar to Ruby blocks/procs)
  - `var` is function scoped always, `let` and `const` are each block scoped.
- ### function scope (we interpret this as how we can )
  - function declaration creates a function scope. So a function declared within another function
  is only accessible from within that function.
- ## hoisting
  - asdf
  - function declarations get hoisted (entirely; writes the whole function to memory), whereas function expressions get 
  hoisted according to their let/var keyword. The major side effect is that function declarations may be invoked prior
  to the declaration.
    - with `let` and `const`, they basically behave as though they are not hoisted
  - `var` behaves in this less-sane way, where the variable is accessible, but with a set value of undefined until
  the initial assignment happens in the code.
  - "Temporal dead zone": the lines of code between where the variable gets hoisted to where it is declared.
  - Remember to rewrite examples into their hoisted form rather than just think through them.
- ### primitive values, types and type conversions/coercions
  - strings, numbers, undefined, null, boolean
  - all numbers are floats, and include -0 and 0, both infinities
  - typeOf ___. (by the way, this is an operator, which is a thing that has a specific function that can't be changed or
  overwritten, hardcoded into the language. In Ruby we had a bunch of things that appeared to be operators but were actually
  methods.)
  - try to avoid implicit coercion!
  - If I want numbers, use `Number()`, if I want a string, use `String()`, etc.
  - JS basically always wants to make it work, just like people in bad relationships.
- ### object properties and mutation
  - you can mutate an object by add, reassigning, or deleting a property
  - arrays are objects with abstracted-away keys (the indices)
  - a variable always holds a pointer to the same object, even when we mutate the object.
- ### understand the differences between loose and strict equality
  - don't ever use loose equality b/c implicitly coercion runs rampant
  - with strings and numbers, it checks that the values of those data are equal
  - with objects, `===` checks that the objects being compared are the same object in memory, as opposed to being two 
  objects with the same data (e.g. `[1,2,3] === [1,2,3]` returns false);
  - if we wanted to check that two arrays, for example, contain the same values, write a function!
- ### how passing an argument into a function may or may not permanently change the value that a variable contains or points to
  - if the variable points to a primitive, we can't change it; an object, we can.
  - behaves like Ruby; elements/properties of objects can be changed, which mutates the object, but the object is the 
  same object in memory.
- ### working with Strings, Arrays, and Objects. 
  - In particular, you should be thoroughly familiar with the basic Array iteration methods
  (forEach, map, filter, and find) and how to use Object methods to access the keys and values in 
  an Object as an Array.
    - `forEach` returns undefined
    - `map` and `filter` each return new objects that satisfy the callback functions
    - `find` finds the first element that satisfies the callback function and returns it.
  - pass a function, behaves as expected
- ### understand that arrays are objects, and be able to determine whether you have an Array
  - use class method `Array.isArray()` to determine if an object is an array 
  - the indices of an array are string representations of non-negative integer Numbers. 
  - Does bracket notation behave differently with arrays vs objects? 
    - [nope! They behave the same way] However, Objects have "dot notation"
- ### variables as pointers
  - variables assigned to primitives 'hold' a primitive value. 
  - variables assigned to objects 'hold a pointer' to the mutable object.
- ### console.log vs return
  - outputs; returns a value to do work with
  - return of console.log is undefined
  - must explicitly use a return keyword to return something
- ### truthiness: false and true vs. falsy and truthy
  - There are 5 values other than `false` that are falsy:
    1. empty string `''`
    2. `0` (also `-0` and `0n`)
    3. `NaN` (remember that comparing _anything_ to `NaN` results in `false`, even `Nan`)(to check if something is `NaN` we use `Number.isNaN()`).
    4. `undefined`
    5. `null`
  - note that everything else is truthy
- ### function definition and function invocation
  - The 3 ways to define are in the next major bullet
  - Invocation is `nameOfFunction()`
  - An interesting note is that in JS we can not only define and invoke, but we can also reference
  a function (without invoking it) when we pass it to another function like map(toUpperCase)
- ### function declarations, function expressions, and arrow functions
  - `function name(a,b) { //stuff }`
  - (These next two expressions don't get hoisted)
  - Function Expression: `let name = function(a,b) {};`
  - Arrow Function:
    - `let name = (a,b) => {};`
    - if one argument and one expression, don't need parentheses for the argument, and don't need return keyword: 
      - let name = a => build_different(a);
- ### implicit return value of function invocations
  - the return keyword must be used, else returns undefined
- ### closures
  - A closure is "the combination of a function and the lexical environment within which that 
  function was [defined]." It's the function plus any variables from its lexical scope that it need
  access to in order to work. So, if a function needs a variable that is not declared or initialized
  in that function, then that variable is a part of the closure. The function and it's scope become a
  single entity called a closure.
  - my own words: a closure is an entity that encloses a function and it's scope, and is created when the
  function is defined (either in a function declaration, or a function expression). A closure allows
  a function to access variables from its lexical scope where the function was defined that it needs
  in order to work. This is useful because a function may be invoked (successfully, without an error)
  referencing one or more variables that were in scope at the function's definition, even if those variables
  are not in the lexical scope at the point where the function is invoked. A closure is efficient, in
  that it only encloses access to variables that are needed for invoking the function, but it does
  not enclose variables that are in scope at the definition point, but aren't needed for invocation.
  - "It's important to remember that closure definitions are purely lexical. Closures are based on 
  your program's structure, not by what happens when you execute it. Even if you never call a 
  particular function, that function forms a closure with its surrounding scope."
- ### partial function application
  - partial function application is the practice of writing a function that depends on two (or more) arguments
  in such a way where it can be executed with fewer arguments passed than the function requires.
  - This is accomplished by encapsulating at least one of the required arguments within function, 
  essentially by nesting functions within functions, so that when the outer function is called, it
  is calling an inner function where at least one of the arguments is built into the function call.
  - This means that the outer function is a more specific (and therefore, efficient) version of a
  more general function because it needs fewer arguments passed in order to be called.
- ### side effects & first-class functions
  - 
- ### naming conventions (legal vs idiomatic)
  - only invalid are:
    - 42ndStreet (Begins with number) 
    - fizz-buzz	 (Hyphen not allowed) 
    - fizz.buzz	 (Looks like property reference)
- ### pure functions and side effects
  - pure functions have no side effects; given the same arguments, will always return the same values
  - consistency in return values means that there is no randomness 
  - side effects are:
    - mutation of objects outside the scope of the function
    - reassignment of non-local variables 
    - reading from or writing to a file/external source
      - This is laundry list of many, including logged to the console 
    - raises an exception
    - it calls another function that has side effects

- ### strict mode vs. sloppy mode
  - enable by writing`'use strict'` at the first line of a program
  - does a great number of things, including something with `this` that I will encounter in OOP, but for now, it notably:
    - disables implicit global variables (or, specifically, properties of the global object, which behave similarly to 
    global variables, in that they can be accessed everywhere) being created by undeclared variables.
- ### JavaScript syntactic sugar
 - look at notes, this is long bit of stuff



























