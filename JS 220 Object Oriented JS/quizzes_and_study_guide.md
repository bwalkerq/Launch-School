# Quiz 2
### #4
- 2/2 correct answers chosen
- one additional incorrect answer chosen, that "objects create a local scope"
  - this is incorrect because `{}` do not define a new scope in the case of an object literal
  in the same way that functions or `if` blocks do.
  - I am confused because I thought that variables defined in an object are scoped to that object...
    - it turns out that we can't define variables within an object unless they are function scoped,
    as a property function of the object.

# Quiz 3
100%
# Quiz 4
### #3
A closure CAN be created without a higher order function (though, this feels more like a technicality than a gap in knowledge)
A function can return an object with a method, "Even though the returned object contains a method, it is not technically 
a higher order function."
### #7
- IIFE's *MAY* be called by name, though only recursively (cool, is that really that useful?)
- JS syntax does NOT demand that IIFE's are wrapped in parentheses (This I should actually really know). If the function 
expression doesn't occur at the beginning of a line, like in a normal function expression:
```
let foo = function() {
  console.log('bar');
}();
```
# Quiz 5

# Study Guide

- Objects
  - Organizing code into appropriate objects
  - Object factories
- Determining/setting function execution context (this)
  - Implicit function execution context
  - Explicit function execution context
  - Dealing with context loss
  - Lexical scope
- Scope and Closures
  - Higher-order functions
  - Creating and using private data
  - Garbage collection
  - IIFEs
    - function expression that is immediately invoked
      - creating closures
      - need to make a function 
  - Partial Function Application
- Object creation patterns
  - class syntax
  - Constructor functions
    - // when we use the new keyword on a constructor function:

  ```
  function Dog(name) {
    this.name = name;
  }
  
  let myDog = new Dog('Disco');
  ```
  
  1. Instantiate a new object
     2. Set the new object's prototype to the `Dog` function prototype
     3. Within `Dog`, sets `this` to refer to the new object.
     4. Execute the `Dog` function
     5. Return the new object *unless* the function explicitly returns 
     another object. If the function would return a primitive, it 
     instead returns the new object.
  - Pseudo-Classical pattern
  - Prototype objects
  - Behavior delegation
- Modules
  - only need to know commonJS modules
    - why are modules important
    - 

## questions that I found helpful
in the scenario wherein a function's prototype is set to the same exact prototype as
the function's from which it's supposed to inherit creates a pretty wild outcome: both
the original "class" and the subclass now share a prototype, so any change to the subclass 
affects the "parent" class as well, which is clearly suboptimal.
That helped me make more sense of why we set the prototype to a object created from the prototype of the parent class
