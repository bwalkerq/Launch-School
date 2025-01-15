
async function asyncDownloadFile() {
  console.log('Downloading file...')
  const message = await new Promise((resolve) => {
    setTimeout(() => {
      resolve('Download complete!')
    }, 1000);
  });
  console.log(message);
}
// did not get this


// worked with Jon...
// load the data up to 3 times, fails only if all attempts fail

// async function asyncLoadData() {
//   return await loadData().catch(async () => {
//     console.log("first attempt failed")
//     return await loadData().catch(async () => {
//       console.log('second attempt failed')
//       return await loadData();
//     })
//   });
// }
//
// asyncLoadData().then(success => {
//   console.log('worked')
// }, error => {
//   console.log('failed', error)
// })

// async function success() {
//   return true;
// }
//
// async function fail() {
//   throw "oh no"
// }
//
// new Promise((resolve, reject) => {
//   resolve(true)
// })
//
// new Promise( (resolve, reject) => {
//   reject('oh no')
// })

async function asyncLoadData() {
  try {
    const message = await new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve("Data loaded");
        } else {
          reject("Network error");
        }
      }, 1000);
    });
    console.log(message);
  } catch (error) {
    console.error(error);
  }
}
// asyncLoadData()


// #3
async function fetchResource(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error)
  } finally {
    console.log("Resource fetch attempt made")
  }
}
/*
did not get this either.
 */

// Example usage:
// fetchResource("https://jsonplaceholder.typicode.com/todos/1");
// Logs fetched data, then "Resource fetch attempt made"
// fetchResource("invalidUrl");
// Logs "Failed to load resource", then "Resource fetch attempt made"

// async function fetchUserProfile(id) {
//   const url = 'https://jsonplaceholder.typicode.com/users/' + String(id);
//   const profile = fetchResource(url);
//   const posts = fetchResource(url + '/posts');
//   const todos = fetchResource(url + '/posts/todos');
// }
async function fetchUserProfile(id) {
  const url = 'https://jsonplaceholder.typicode.com/users/' + String(id);
  try {
    const profile = await fetch(url)
      .then(res => res.json());
    console.log('User profile: ', profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
  }

  try {
    const posts = await fetch(url + '/posts')
      .then(res => res.json());
    console.log('User Posts:', posts);
  } catch (error) {
    console.error('Error fetching user posts:', error);
  }

  try {
    const todos = await fetch(url + '/todos')
      .then(result => result.json());
    console.log('User todos', todos);
  } catch (error) {
    console.error('Error fetching user todos:', error);
  }
}

/*
mostly got this solution, but by using the helper function from the previous
exercise, which accomplishes the same thing.
I learned, by accident--leaving off `await` from the last `fetch` for the todos,

 */

// Example usage:
// fetchUserProfile(1);
// fetchUserProfile(2000);
// Logs user profile, posts, and todos. Catches and logs errors at each step if they occur.

// Mock API:
//   GET https://jsonplaceholder.typicode.com/users/1
//   GET https://jsonplaceholder.typicode.com/users/1/posts
//   GET https://jsonplaceholder.typicode.com/users/1/todos


// The thing from Ping that helped her understand promises

function xhrPromise(method, url) {
  return new Promise ((resolve, reject) => {
    console.log("Hello from inside the Promise");
    let request = new XMLHttpRequest();
    request.open(method, url);

    request.addEventListener('load', event => {
      if (request.status === 200) {
        resolve(request.responseText);
      } else {
        reject(`Error: ${request.status} ${request.statusText}`);
      }
    });

    request.send();
  });
}

xhrPromise('GET', 'https://api.github.com/repos/rails/rails')
  .then(console.log)
  .catch(console.error);

console.log("Meanwhile, in sync land...");
console.log("some sync code...");
console.log("even more sync code!");



































