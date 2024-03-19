let myObject = {
  a: 'name',
  'b': 'test',
  123: 'c',
  1: 'd',
};

myObject[1];
// myObject[a]; // this raises an error because the expression in the bracket must
// be a string value
myObject.a;

// what will be output
myObject = {
  prop1: '123',
  prop2: '234',
  'prop 3': '345',
};

const prop2 = '456';
myObject['prop2'] = '456';
myObject[prop2] = '678';

// console.log(myObject[prop2]); // 678
// console.log(myObject.prop2); // 456

myObj = {};
myObj[myFunc()] = 'hello, ';

function myFunc() {
  return 'funcProp';
}

// console.log(myObj); // hello
// myObj[myFunc()] = 'world!';
// console.log(myObj); // world

