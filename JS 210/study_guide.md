# 211 Study Guide
- ### assignments and comparison
  - let variable = 1 or 
  - use strict comparison
  - without using var or let, the variable becomes a property of the global object (treated as a global
  variable)
  - 
- ### variable scope, especially how variables interact with function definitions and blocks
  - variables declared in the outer scope are accessible from within functions, and blocks
  - (JS functions are similar to Ruby blocks/procs)
  - var is function scoped always, let and const are each block scoped.
- ### function scope (we interpret this as how we can )
  - function declaration creates a function scope. So a function declared within another function
  is only accessible from within that function.
- ### hoisting
  - function declarations get hoisted (entirely; writes the whole function to memory), whereas function expressions get 
  hoisted according to their let/var keyword. The major side effect is that function declarations may be invoked prior
  to the declaration.
  - with let and const, they basically behave as though they are not hoisted
  - var behaves in this less-sane way, where the variable is accessible, but with a set value of undefined until the initial
  assignment happens
  - temporal dead zone: the lines of code between where the variable gets hoisted to where it is declared.
- ### primitive values, types and type conversions/coercions
  - strings, numbers, undefined, null, boolean
  - all numbers are floats, and include -0 and 0, both infinties
  - typeOf ___. (by the way, this is an operator, which is a thing that has a specific function that can't be changed or
  overwritten, hardcoded into the language. In Ruby we had a bunch of things that appeared to be operators but were actually
  methods.)
  - try to avoid implicit coercion!
  - If I want nubmers, use `Number()`, if I want a string, use `String()`, etc.
  - JS basically always wants to make it work, just like people in bad relationships.
- ### object properties and mutation
  - you can mutate an object by add, reassigning, or deleting a property
  - arrays are objects with abstracted-away keys (the indices)
  - a variable always holds a pointer to the same object, even when we mutate the object.
- ### understand the differences between loose and strict equality
  - don't ever use loose equality b/c implicity coercion runs rampant
  - with strings and numbers, it checks that the values of those data are equal
  - with objects, `===` checks that the objects being compared are the same object in memory, as opposed to being two 
  objects with the same data (e.g. [1,2,3] === [1,2,3] returns false);
  - if we wanted to check that two arrays, for example, contain the same values, write a function!
- ### how passing an argument into a function may or may not permanently change the value that a variable contains or points to
  - if the variable points to a primitive, we can't change it; an object, we can.
  - behaves like Ruby
- ### working with Strings, Arrays, and Objects. 
  - In particular, you should be thoroughly familiar with the basic Array iteration methods
  (forEach, map, filter, and find) and how to use Object methods to access the keys and values in 
  an Object as an Array.
  - pass a function, behaves as expected
  - forEach returns undefined, these all behave as Ruby
- ### understand that arrays are objects, and be able to determine whether you have an Array
  - use class method `Array.isArray()` to determine if an object is an array 
  - the indices of an array are string representations of non-negative integer Numbers. 
  - Does bracket notation behave differently with arrays vs objects? 
    - [nope! They behave the same way] However, Objects have "dot notation"
- ### variables as pointers
  - variables assigned to primitives 'hold' a primitive value. variables assigned to objects 'hold a pointer' to the
        mutable object.
- ### console.log vs return
  - outputs; returns a value to do work with
  - return of console.log is undefined
  - must explicitly use a return keyword to return something
- ### truthiness: false and true vs. falsy and truthy
  - 
- ### function definition and function invocation
  - invocation is `nameOfFunction()`
  - An interesting note is that in JS we can not only define and invoke, but we can also reference
  a function (without invoking it) when we pass it to another function like map(toUpperCase)
- ### function declarations, function expressions, and arrow functions
  - function name(a,b) {
  //stuff
  }
  - (These two expressions don't get hoisted)
  - let name = function(a,b) {}
  - Arrow functions
    - let name = (a,b) => {}
    - if one argument and one expression, don't need parentheses for the argument, and don't need return keyword: 
      - let name = a => build_different(a);
- ### implicit return value of function invocations
- ### first-class functions
- ### partial function application
  - write a paragraph or two about closures, then do PFA
- ### side effects
- ### naming conventions (legal vs idiomatic)
- ### pure functions and side effects
  - pure functions have no side effects and, given the same arguments, will always return the same values
  - consistency in return values means that there is no random 
  - side effects are:
    - mutation of objects outside of the scope of the function
    - reassignment of non-local variables 
    - reading from or writing to a file/external source
      - This is laundry list of many, including logged to the console 
    - raises an exception
    - it calls another function that has side effects
- ### strict mode vs. sloppy mode
- ### JavaScript syntactic sugar


- ### implicit return value of function invocations
the return keyword must be used, else returns undefined

- ### closures

- ### partial function application
  - be clear about what is NOT PFA

- ### side effects & first-class functions

- ### naming conventions (legal vs idiomatic)
refresh this

- ### strict mode vs. sloppy mode
read this.

- ### JavaScript syntactic sugar
refresh this