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
# Quiz 6