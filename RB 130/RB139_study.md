1, What are closures?
A Closure is a coding concept that allows us to save a chunk of code that can be passed around
and executed later.
It binds to its surrounding artifacts
It's a method without a name

2, What is binding?
The surrounding environment or context for a block
- local variables (must be initialized before the closure is created)
- method references
- constants
- whatever it needs to execute correctly; the closure will "drag around" its binding

3, How does binding affect the scope of closures?
 see question 12 as well

4, How do blocks work?
either with { |param| ...} or a do, end notation, a block parameter is optional

5, When do we use blocks? (List the two reasons)
- we use by assigning them to a Proc object and executing the Proc
- or by passing them to methods and yielding execution
- They aren't objects

6, Describe the two reasons we use blocks, use examples.
- to defer implementation details to the time of execution (make methods more flexible)
- Sandwich code, methods performing before and after actions (#time_it)

7, When can you pass a block to a method? Why?
1. methods take blocks implicitly by default, but ignore them unless yield keyword is used
2. using `&` in the method implementation requires a block, converts it to a
   simple proc, and passes it around as the parameter name

8, How do we make a block argument mandatory?
see above

9, How do methods access both implicit and explicit blocks passed in?
yield is used for implicit
the #call method is needed, called on the parameter name, for explicit

10, What is yield in Ruby and how does it work?
a keyword that yields execution to a block; if no block is given, raises localJump error

11, How do we check if a block is passed into a method?
#block_given? is a method that returns true if an implicit block is passed to
    the method
^^^this is sufficient. no need to discuss this below

    if an explicit block is required by the method definition, and one is not passed
        at the time of method implementation, then the method 
        parameter is assigned nil (surprising!)

12, Why is it important to know that methods and blocks can return closures?
def do_a_thing(&arg)
    ...
    arg
end
Methods can return closures, and the bindings of that closure get carried around,
which allows us to access things within the contained scope of a method.

def retained_array
    arr = []
    Proc.new do |el|
        arr << el
        arr
    end
end

arr = retained_array
p arr.call('one') #=> ["one"]
p arr.call('two') #=> ["one", "two"]
p arr.call('three') #=> ["one", "two", "three"]

13, What are the benefits of explicit blocks?
- ease of referencing with local variable name
  - we can pass the proc object to methods within the method definition
- we can return the proc object

14, Describe the arity differences of blocks, procs, methods and lambdas.
Block and procs have lenient arity; no complaints for too many or too few arguments
    if a block takes more than one argument, and fewer are given, nil is assigned
methods and lambdas have strict arity (raises argumenterrors)

16, What does & do when in a the method parameter?
con

def method(&var); end

17, What does & do when in a method invocation argument?

method(&var)

18, What is happening in the code below?

arr = [1, 2, 3, 4, 5]

p arr.map(&:to_s) # specifically `&:to_s`