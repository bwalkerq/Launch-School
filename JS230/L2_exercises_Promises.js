// function downloadFilePromise() {
//   return new Promise((resolve) => {
//     console.log('Downloading file...')
//     setTimeout(() => {
//       resolve('Download complete!')
//     }, 1000);
//   })
// }
//
// // downloadFilePromise();
//
// function processDataPromise(arr, cb) {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(arr.map(cb));
//     }, 1000)
//   })
// }
// // Example usage:
// // processDataPromise([1, 2, 3], (number) => number * 2).then((processedNumbers) => {
// //   console.log(processedNumbers);
// // After 1 second, logs: [2, 4, 6]
// // });
//
// // let flakyService = new Promise((resolve, reject) => {
// //   let win = Math.floor(Math.random() * 2);
// //   if (win) {
// //     resolve("Operation Complete");
// //   } else {
// //     reject('Operation Whack')
// //   }
// // })
//
// // flakyService.then(console.log).catch(console.error);
// /* I was right that I'd create the flakyservice promise and store it, and then
// call a chain of then and catch together. I learned that console.log responds
// to the message passed in this direct way (very cool, not surprising), AND that
// console.error logs the return value of the `reject` result. Which is cool.
//  */
//
// // flakyService.then(console.log).finally(() => console.log('cleanup'))
//
// function operation() {
//   return new Promise(resolve => {
//     console.log('starting');
//     setTimeout(() => {
//       resolve('operation complete');
//     }, 500);
//   });
// }
//
// // operation().then(console.log).finally(() => {
// //   console.log('everybody, everywhere')
// // })
//
// let chainer = new Promise(resolve => {
//   resolve(3);
// })
//
// // chainer.then(success => success * 2).then(success => success + 5).then(console.log)
//
// // flakyService.then(console.log).catch(() => console.error('An error occurred.'));
//
//
// function fetchUserData() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => reject({ error: "User not found" }), 500);
//   });
// }
//
// // fetchUserData()
// //   .catch(error => {console.error(error.error)})
// //   .finally(() => console.log('Fetching complete'));
//
//
// /* Talked with Phillip about this problem on 9/17, tried to make sense of it
// and mostly do understand the given solution, but mostly don't understand
// his own solution and why it doesn't work.
//
//  */
// // function retryOperation(operationFunc) {
// //   let attempts = 0;
// //
// //   function attempt() {
// //     return operationFunc().catch((err) => {
// //       if (attempts < 2) {
// //         attempts++;
// //         console.log(`Retry attempt #${attempts}`);
// //         return attempt();
// //       } else {
// //         throw err;
// //       }
// //     });
// //   }
// //
// //   return attempt().catch(() => console.error("Operation failed"));
// // }
//
// // Example usage:
// // retryOperation(
// //   () =>
// //     new Promise((resolve, reject) =>
// //       Math.random() > 0.33
// //         ? resolve("Success!")
// //         : reject(new Error("Fail!"))
// //     )
// // );
//
//
// function mockAsyncOp() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (Math.random() > 0.5) {
//         resolve("Operation succeeded");
//       } else {
//         reject("Operation failed");
//       }
//     }, 1000);
//   });
// }
//
// // mockAsyncOp()
// //   .then(console.log)
// //   .catch(console.error)
// //   .finally(() => console.log('operation attempted'))
//
// // function loadData() {
// //   return new Promise((resolve, reject) => {
// //     if (Math.random() < .5) {
// //       resolve('data loaded');
// //     } else {
// //       reject('network error');
// //     }
// //   }).catch(() => {
// //     console.error('An error occurred. Attempting to recover');
// //     return Promise.resolve('Using cached data');
// //   });
// // }
//
// // loadData().then(console.log)
// /*
// When I solved this, I didn't build the catch into the function, but rather,
// implemented the catch when I called the loadData function. However, I see that
// it makes sense to include it in the function definition. Is this standard
// procedure?
//  */
//
// function flakyService() {
//   return new Promise((resolve, reject) => {
//     if (Math.random() > 0.5) {
//       resolve("Operation successful");
//     } else {
//       reject("Operation failed here");
//     }
//   });
// }
//
// function loadData() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (Math.random() > 0.9) {
//         resolve("Data loaded");
//       } else {
//         reject("Network error");
//       }
//     }, 1000);
//   });
// }
//
//
// // let promises = [flakyService(), flakyService(), loadData()];
//
// // Promise.all(promises).then(console.log).catch(() => console.error('one more more failed'))
//
// // Jon's preferred syntax, within a then call (subscribe?)
// // Promise.all(promises).then(successful => {
// //   console.log(successful)
// // }, error => {
// //   console.log(error)
// // })
//
//
//
// const firstResource = new Promise((resolve) =>
//   setTimeout(() => resolve("First resource loaded"), 500)
// );
// const secondResource = new Promise((resolve) =>
//   setTimeout(() => resolve("Second resource loaded"), 1000)
// );
//
// // Promise.race([firstResource, secondResource]).then(console.log)
//
// // const services = [flakyService(), flakyService(), flakyService()];
//
// // Promise.allSettled(services).then(results => {
// //   results.forEach(result => console.log(result.status))
// // })
//
// // Promise.any(services)
// //   .then(value => console.log(value))
// //   .catch(error => console.error(error))
//
// function loadResource(url) {
//   return fetch(url)
//     .then(response => response.json())
//     .catch(() => 'Failed to Fetch');
// }
//
// // loadResource("https://jsonplaceholder.typicode.com/todos/1").then(console.log);
// // Success response
//
// // loadResource("badUrl.xyz").then(console.log);
// // Failed to fetch
//
//
// /*
// Implement a helper function loadMultipleResources that takes an array of URLs
//  and fetches them using the fetch API. Use Promise.allSettled() to return an
//  array of fetched responses, regardless of whether some URLs may lead to failure.
//  */
// function loadMultipleResources(arr) {
//   let fetched = arr.map(loadResource)
//   return Promise.allSettled(fetched)
// }
//
// // question for Jon, why is this thing returning what it is returning-- my
// // solution matches the given, but not outputting the expected values
// // loadMultipleResources([
// //   "https://jsonplaceholder.typicode.com/todos/1",
// //   "invalidUrl",
// // ]).then((results) => {
// //   results.forEach((result) => {
// //     if (result.status === "fulfilled") {
// //       console.log("Fetched data:", result.value);
// //     } else {
// //       console.error(result.reason);
// //     }
// //   });
// // });
// // Fetched data: {userId: 1, id: 1, title: 'delectus aut autem', completed: false }
// // Fetched data: Failed to fetch


// 2024.9.23 with Shawn
// Practice Problems: Promise Basics

// #1
function downloadFile(callback) {
  console.log("Downloading file...");
  setTimeout(() => {
    callback("Download complete!");
  }, 1500);
}

function downloadFilePromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('Download complete!'), 1000)
  })
}

// downloadFilePromise().then((result) => {
//   console.log(result)
// });


function processData(numbers, callback) {
  setTimeout(() => {
    const processed = numbers.map(callback);
    console.log(processed);
  }, 1000);
}

function processDataPromise(data, cb) {
  return new Promise(resolve => {
    setTimeout(() => resolve(data.map(cb)), 1000)
  });
}

// Example usage:
// processDataPromise([1, 2, 3], (number) => number * 2).then((processedNumbers) => {
//   console.log(processedNumbers);
//   // After 1 second, logs: [2, 4, 6]
// });

function flakyService() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resolve('Success!')
      } else {
        reject('flake!')
      }
    }, 1)
  })
}

// let counter = 0;
// while (counter < 10) {
//   flakyService()
//     .then(result => {
//     console.log(result)
//   }).catch(reason => {
//     console.log(reason)
//   }).finally(() => {
//     console.log('this runs every time')
//   })
//   counter++;
// }

// new Promise(resolve => resolve(3))
//   .then(result => result * 2)
//   .then(result => {
//     console.log(result + 5)
//   })


function retryOperation(operationFunc, retriesRemaining = 3) {
  // if fulfilled, log; if rejected, try again up to 3 times total
  operationFunc()
    .then(message => console.log(message))
    .catch(error => {
      console.error(error.message);
      if (retriesRemaining === 1) {
        console.log('Operation Failed!')
      } else {
        retryOperation(operationFunc, retriesRemaining - 1);
      }
    })
}

// Example usage:
// retryOperation(
//   () =>
//     new Promise((resolve, reject) =>
//       Math.random() < 0.33
//         ? resolve("Success!")
//         : reject(new Error("Fail!"))
//     ),
// );

function loadData() {
  return new Promise((resolve, reject) => {
    if (Math.random() < .3) {
      resolve('good job, data loaded');
    } else {
      reject('Network Error, bitch')
    }
  })
}

// loadData()
//   .then(value => console.log(value))
//   .catch(reason => {
//     console.error(reason);
//     return 'Using cached data';
//   })
//   .then(value => console.log(value))

async function tryIt() {
  return Promise.resolve('yep');
}

// console.log(tryIt());



// Async/Await with Shawn 2024.9.24

async function fetchResource(url) {
  try {
    let response = await fetch(url
      // , {
      // headers: {
      //   "Content-Type": "application/json",
      // },
    // }
      // sometimes specifying the content-type will be necessary, but some api's
      // expect to return a json response.
    );
    let data = await response.json();
    // remember that .json() (and pretty much all the api instance methods in
    // fetch used to inspect/access the body of the response) RETURNS A PROMISE
    console.log(data);
  } catch (error) {
    console.log(`Failed to load ${url}`)  // Catching the error and logging it
    // allowed us to actually see what the issue was (fetch is not defined as a
    // function in node), so this is a crucial debugging step.
  } finally {
    console.log('resource fetch attempt made')
  }
}

// Example usage:
fetchResource("https://jsonplaceholder.typicode.com/todos/1");
// Logs fetched data, then "Resource fetch attempt made"
fetchResource("invalidUrl");
// Logs "Failed to load resource", then "Resource fetch attempt made"

















