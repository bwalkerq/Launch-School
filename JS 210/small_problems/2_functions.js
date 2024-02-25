var myVar = 'This is global';

function someFunction() {
  var myVar = 'This is local';
}

someFunction();
console.log(myVar); // global because the var declaration on line 4 is scoped to the
// function

var logValue = 'foo';

function logValue() {
  console.log('Hello, world!');
}

console.log(typeof logValue);