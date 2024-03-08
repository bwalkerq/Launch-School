let myArray = [1, 2, 3, 4];
const myOtherArray = myArray.slice();  // or just writing the literal
// and filling it with a for loop

// myArray.pop();
// console.log(myOtherArray);
//
// myArray = [1, 2];
// console.log(myOtherArray);

function concat(...args) {
  let newArray = [];

  for (let argIndex = 0; argIndex < args.length; argIndex++) {
    let currentArg = args[argIndex]
    if (Array.isArray(currentArg)) {
      for (let i = 0; i < currentArg.length; i++) {
        newArray.push(currentArg[i]);
      }
    } else {
      newArray.push(currentArg);
    }
  }
  console.log(newArray);
  return newArray;
}

// concat([1, 2, 3], [4, 5, 6]);          // [1, 2, 3, 4, 5, 6]
// concat([1, 2], 3);                     // [1, 2, 3]
// concat([2, 3], ['two', 'three']);      // [2, 3, "two", "three"]
// concat([2, 3], 'four');                // [2, 3, "four"]
//
//
// const obj = { a: 2, b: 3 };
// const newArray = concat([2, 3], obj);
// newArray;                              // [2, 3, { a: 2, b: 3 }]
// obj.a = 'two';
// newArray;                              // [2, 3, { a: "two", b: 3 }]
//
// const arr1 = [1, 2, 3];
// const arr2 = [4, 5, obj];
// const arr3 = concat(arr1, arr2);
// console.log(arr3);                                  // [1, 2, 3, 4, 5, { a: "two", b: 3 }]
// obj.b = 'three';
// console.log(arr3);                                  // [1, 2, 3, 4, 5, { a: "two", b: "three" }]
//
// arr3[5].b = 3;                         // or, `arr3[5]['b'] = 3;`
// console.log(obj);                                   // { a: "two", b: 3 }

// concat([1, 2, 3], [4, 5, 6], [7, 8, 9]);    // [1, 2, 3, 4, 5, 6, 7, 8, 9]
// concat([1, 2], 'a', ['one', 'two']);        // [1, 2, "a", "one", "two"]
// concat([1, 2], ['three'], 4);               // [1, 2, "three", 4]

// pop
function pop(arr) {
  if (arr.length === 0) return undefined;

  let last = arr[arr.length - 1];
  arr.length = arr.length - 1;

  return last;
}

// const array1 = [1, 2, 3];
// pop(array1);                        // 3
// console.log(array1);                // [1, 2]
// pop([]);                           // undefined
// pop([1, 2, ['a', 'b', 'c']]);      // ["a", "b", "c"]

// push
function push(arr, ...args) {
  for (let argsIndex = 0; argsIndex < args.length; argsIndex++) {
    arr[arr.length] = args[argsIndex];
  }
  return arr.length
}

// const array2 = [1, 2, 3];
// push(array2, 4, 5, 6);              // 6
// console.log(array2);                // [1, 2, 3, 4, 5, 6]
// push([1, 2], ['a', 'b']);          // 3
// push([], 1);                       // 1
// push([]);                          // 0

function reverse(inputForReversal) {
  if (Array.isArray(inputForReversal)) {
    return reverseArray(inputForReversal);
  } else {
    return reverseString(inputForReversal);
  }
}

function reverseArray(inputForReversal) {
  let result = [];
  for (let index = inputForReversal.length - 1; index >= 0; index -= 1) {
    result.push(inputForReversal[index]);
  }
  return result;
}

function reverseString(inputForReversal) {
  let result = inputForReversal.split('');
  return reverseArray(result).join('');
}
// their solution much smarter to simply turn the string into an array, and send
// that array to the method that's already built reverseArray, and then join it
// again at the end.

// reverse('Hello');           // "olleH"
// reverse('a');               // "a"
// reverse([1, 2, 3, 4]);      // [4, 3, 2, 1]
// reverse([]);                // []
//
// const array = [1, 2, 3];
// reverse(array);             // [3, 2, 1]
// array;                      // [1, 2, 3]


































