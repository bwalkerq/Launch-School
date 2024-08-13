'use strict'
function delayLog() {
  for (let i = 1; i <= 10; i++) {
    setTimeout(makeLogger(i), 1000 * i);
  }
}

function makeLogger(num) {
  return function() {
    console.log(num)
  };
}

// delayLog();


// setTimeout(() => { // 1
//   console.log('Once'); // 5
// }, 1000);
//
// setTimeout(() => { // 2
//   console.log('upon'); // 7
// }, 3000);
//
// setTimeout(() => { // 3
//   console.log('a'); // 6
// }, 2000);
//
// setTimeout(() => { // 4
//   console.log('time'); // 8
// }, 4000);


// setTimeout(() => {
//   setTimeout(() => {
//     console.log('q');
//   }, 15);
//
//   console.log('d');
//
//   setTimeout(() => {
//     console.log('n');
//   }, 5);
//
//   console.log('z');
// }, 10);
//
// setTimeout(() => {
//   console.log('s');
// }, 20);
//
// setTimeout(() => {
//   console.log('f');
// });
//
// console.log('g');
// what sequence?
/*
f (no delay)  // actually! It turns out g occurs first, since the zero timeout
// means that the function f is eligible in the next 'event cycle'
g
d
z
n
s
q
 */

function afterNSeconds(callback, seconds) {
  setTimeout(callback, seconds * 1000);
}

// afterNSeconds(() => {
//   console.log('this');
// }, 2);

let id;

function startCounting() {
  let count = 1;
  id = setInterval(() => {
    console.log(count);
    count +=1;
  }, 1000);
}

// startCounting();

function stopCounting() {
  clearTimeout(id);
}

// stopCounting();


// document.addEventListener("pointermove", event => {
//   let x = document.querySelector('.x')
//   x.style.left = String(event.clientX) + 'px';
//   x.style.top = String(event.clientY) + 'px';
// })

// document.addEventListener("keydown", event => {
//   let h = document.querySelector('.x .horizontal')
//   let v = document.querySelector('.x .vertical')
//   switch (event.key) {
//     case 'r':
//       h.style.background = 'red';
//       v.style.background = 'red';
//       return;
//     case 'g':
//       h.style.background = 'green'
//       v.style.background = 'green'
//       return;
//     case 'b':
//       h.style.background = 'blue';
//       v.style.background = 'blue';
//       return;
//   }
// })

// their solution is much better. less redundant.

// document.addEventListener("keydown", event => {
//   let key = event.key
//   let color;
//
//   switch (key) {
//     case 'r':
//       color = 'red';
//       break;
//     case 'g':
//       color = 'green';
//       break;
//     case 'b':
//       color = 'blue';
//   }
//
//   if (color) {
//     let x = document.querySelector('.x');
//     [...x.children].forEach(el => el.style.background = color);
//   }
// })

// twitter counter
//my solution
// document.addEventListener('DOMContentLoaded', () => {
//   const textArea = document.body.querySelector("textarea");
//   const counter = document.body.querySelector('.counter');
//   const button = document.body.querySelector('button');
//
//   textArea.addEventListener("input", event => {
//     let remaining = 140 - textArea.value.length;
//
//     if (remaining < 0) {
//       textArea.classList.add('invalid');
//       button.disabled = true;
//     } else {
//       textArea.className = 'counter';
//       button.disabled = false;
//     }
//
//     counter.textContent = `${remaining} characters remaining`;
//   });
// })

/* Learned:
use 'input' as the event type, because keypress doesn't count the backspace key,
among other issues, and keydown doesn't count pasting, among other issues.

rather than textarea.textlength, which apparently doesn't exist on some elements
using textArea.value.length solved the issue

also, their solution sets up the composer first, because the other three elements
are children of it.


 */

// revised solution
// document.addEventListener('DOMContentLoaded', () => {
//   const composer = document.querySelector('.composer')
//   const textArea = composer.querySelector("textarea");
//   const counter = composer.querySelector('.counter');
//   const button = composer.querySelector('button');
//
//   function updateCounter() {
//     let remaining = 140 - textArea.value.length;
//     let message = `${remaining} characters remaining`;
//     let invalid = remaining < 0;
//
//     textArea.classList.toggle('invalid', invalid); // turns on if true, off if false
//     button.disabled = invalid;
//
//     counter.textContent = message;
//   }
//
//   textArea.addEventListener("input", updateCounter);
//
//   updateCounter();
// })


// A17
function basicCallback(cb, num) {
  setTimeout(() => {
    cb(num);
  }, 2000);
}

// Example usage:
// basicCallback((number) => {
//   console.log(number * 2);
// }, 5);
// After 2 seconds, logs: 10

// Create a function downloadFile that simulates downloading a file by logging
// "Downloading file...". After a delay of 1.5 seconds, it should call the
// callback with the argument "Download complete!".

function downloadFile() {
  console.log('Downloading...');
  setTimeout(() => {
    console.log('Download complete!');
  }, 1500)
}

// downloadFile();

function processData(arr, cb) {
  setTimeout( () => {
    console.log(arr.map(cb));
  }, 1000)
}

// Example usage:
// processData([1, 2, 3], (number) => number * 2);
// After 1 second, logs: [2, 4, 6]

function waterfallOverCallbacks(arr, num) {
  console.log(arr.reduce((accum, el) => el(accum), num));
}

// Example usage:
const double = (x) => x * 2;
// waterfallOverCallbacks([double, double, double], 1);
// Logs: 8

function startCounter(cb) {
  let count = 0
  let intervalID = setInterval(() => {
    count++;
    if (cb(count)) clearInterval(intervalID);
  }, 1000)
}

// Example usage:
// startCounter((count) => {
//   console.log(count);
//   return count === 5;
// });
// Logs 1, 2, 3, 4, 5, then stops

function downloadFilePromise() {
  return new Promise((resolve) => {
    console.log('Downloading file...')
    setTimeout(() => {
      resolve('Download complete!')
    }, 1000);
  })
}

// downloadFilePromise();

function processDataPromise(arr, cb) {
  return new Promise(resolve => {
    setTimeout(() => {
    resolve(arr.map(cb));
    }, 1000)
  })
}
// Example usage:
// processDataPromise([1, 2, 3], (number) => number * 2).then((processedNumbers) => {
//   console.log(processedNumbers);
  // After 1 second, logs: [2, 4, 6]
// });

// let flakyService = new Promise((resolve, reject) => {
//   let win = Math.floor(Math.random() * 2);
//   if (win) {
//     resolve("Operation Complete");
//   } else {
//     reject('Operation Whack')
//   }
// })

// flakyService.then(console.log).catch(console.error);
/* I was right that I'd create the flakyservice promise and store it, and then
call a chain of then and catch together. I learned that console.log responds
to the message passed in this direct way (very cool, not surprising), AND that
console.error logs the return value of the `reject` result. Which is cool.
 */

// flakyService.then(console.log).finally(() => console.log('cleanup'))

function operation() {
  return new Promise(resolve => {
    console.log('starting');
    setTimeout(() => {
      resolve('operation complete');
    }, 500);
  });
}

// operation().then(console.log).finally(() => {
//   console.log('everybody, everywhere')
// })

let chainer = new Promise(resolve => {
  resolve(3);
})

// chainer.then(success => success * 2).then(success => success + 5).then(console.log)

// flakyService.then(console.log).catch(() => console.error('An error occurred.'));


function fetchUserData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject({ error: "User not found" }), 500);
  });
}

// fetchUserData()
//   .catch(error => {console.error(error.error)})
//   .finally(() => console.log('Fetching complete'));

// function retryOperation(operationFunc) {
//   let attempts = 0;
//
//   function attempt() {
//     return operationFunc().catch((err) => {
//       if (attempts < 2) {
//         attempts++;
//         console.log(`Retry attempt #${attempts}`);
//         return attempt();
//       } else {
//         throw err;
//       }
//     });
//   }
//
//   return attempt().catch(() => console.error("Operation failed"));
// }

// Example usage:
// retryOperation(
//   () =>
//     new Promise((resolve, reject) =>
//       Math.random() > 0.33
//         ? resolve("Success!")
//         : reject(new Error("Fail!"))
//     )
// );


function mockAsyncOp() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve("Operation succeeded");
      } else {
        reject("Operation failed");
      }
    }, 1000);
  });
}

// mockAsyncOp()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => console.log('operation attempted'))

function loadData() {
  return new Promise((resolve, reject) => {
    if (Math.random() < .5) {
      resolve('data loaded');
    } else {
      reject('network error');
    }
  }).catch(() => {
    console.error('An error occurred. Attempting to recover');
    return Promise.resolve('Using cached data');
  });
}

loadData().then(console.log)
/*
When I solved this, I didn't build the catch into the function, but rather,
implemented the catch when I called the loadData function. However, I see that
it makes sense to include it in the function definition. Is this standard
procedure?


 */






