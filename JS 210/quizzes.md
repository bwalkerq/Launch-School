## Quiz 1 JS210 - Fundamentals of JavaScript for Programmers

### 2
Semantics of "value" in the statement: "If the return statement does not include a value, the function implicitly returns undefined."

I chose not true for this because a function can be returned and it's not a value, it's a function. Apparently, a function is a value

Separately, defining functions as either declarations vs expression have different hoisting rules, so it does matter in terms of how JS processes the code.
### 5
This is false: "Lexical scoping determines the value of a variable by looking back through the call stack as demonstrated in the code block below."

Damn, brutal. They gave me some code in this answer choice among 4 others and told me what would be output, but it was actually a lie.

The take away is that the call stack doesn't really have to do with scope
### 9
on line 8, I thought that `console.log(foo)` would return an error 
because `foo` isn't a value there (it's a function), and it's not
called with the `()` like `foo()`. Turns out what is logged is 
`[Function: foo]`  
```
console.log(foo());

function foo() {
console.log('Waiting for bar!');
}

function foo() {
console.log(foo);
function bar() {
console.log('bar again');
}

bar();

function bar() {
console.log('bar again and again');
}
}
```
### 10 
Apparently a function declaration must start with the word "function" and nothing else (not `return`, not `(`, nothing)

Also, function declarations should not end with a `;`, I don't think I had picked that up.
### 11 pandering
jesus, sure, fine. `(function () {}` could be the first line of a program and it would *not* create a new variable, but seriously guys, WTH, when is that ever going to be the first line. 

The take away of the question is that function expressions are stored in variables, as are function declarations. Great.  

## Quiz 4  - Arrays
### 2
Bracket notation is an *operator*, not a method.

They love gotcha questions.
### 3
A legit mistake: 

The question asked which methods return a new array, and while I knew that #splice transforms the object in place, I overlooked that
it 











