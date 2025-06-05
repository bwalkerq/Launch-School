# Time and space complexity problems

```ts
function test(n) {
for (let i = 0; i < n; i++) {
console.log("Hello!");
}
}
```
time: O(n) space: O(1)? I figure there's nothing being stored since it's just a log, so it's static, so 1.
and it doesn't use any additional space outside of the input size

```ts
function test(n) {
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      console.log("Hello!");
    }
  }
}
```
time:double loop, so O(n^2)  
space: O(1)

```ts
function test(n) {
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push(i);
  }
  return result;
}
```
TC: O(n), same for SC

```ts
function test(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= i; j++) {
      sum += 1;
    }
  }
  return sum;
}
```
TC: n^2, SC: 1 since the sum is only ever being updated  
(All I've been right so far)
```ts
function test(n) {
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push(i);
    for (let j = 0; j < n; j++) {
      result[i] += j;
    }
  }
  return result;
}
```
TC: n^2, SC: n

```ts
function test(n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        console.log("Hello!");
      }
    }
  }
}
```
n^3, 1  

### 7
```ts
function test(n) {
  let result = [];
  for (let i = 0; i < n; i++) {
    result.push(new Array(n).fill(0));
  }
  return result;
}
```
n. space is a nested array that gets populated with increasingly larger arrays filled with 0. so that feels like n^2?  
n = 2 is `[[0],[0,0]]` an array with 2 sub arrays
n = 5 is an array with 5 subarrays, but the arrays are getting longer... but only longer by one element each time.  
so maybe that
I actually change my mind, and think n. It's just n+1 arrays total, so that feels like a complexity of n.  

Ok I was very wrong.  
For time complexity I forgot that fill has to essentially iterate through the array to fill each spot. so that is a step
of O(n). That with the loop is O(n^2).  
By the end of the loop, the result array holds n arrays, each containing n elements. Therefore, the total space used is proportional to n * n elements. Thus, the space complexity is O(N^2), as the space required grows quadratically with the input size n.  

### 8
```ts
function test(n) {
  for (let i = n; i >= 1; i /= 2) {
    console.log("Hello!");
  }
}
```
TC: I accidentally got a hint from AI, but this will be O(log2(n)). SC: O(1)  
remember that "logN" in TC world assumes log base 2 (in pure math we assume that log implies base 10)
### 9
```ts
function test(n) {
  let matrix = [];
  for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
      matrix[i][j] = i + j;
    }
  }
  return matrix;
}
```
Each n creates a matrix of size nXn. Specifically, n=5 will yield an array with 5 subarrays, each with 5 elements
Space will be n^2
time n^2
### 10
```ts
function test(n) {
  for (let i = 0; i < n; i++) {
    for (let j = 1; j < n; j *= 2) {
      console.log("Hello!");
    }
  }
}
```
the first loop has time n. the second loop has time n/2. constant factored out. So n^2.  
whoops, no. with n increasing by a factor of 2, the distance to n in the second loop is gobbled up in halves, so a time
complexity of logN. So this is actually NlogN. Space is 1.
### 11
```ts
function test(n) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < 100; j++) {
      console.log("Hello!");
    }
  }
}
```
interesting! This second loop will become a constant, beacuse as N gets large, the second loop will only run 100 times, 
and be considered negligent. This has a time of N.

### 12
```ts
function test(n, m) {
  for (let i = 0; i < n; i++) {
    console.log("Hello!");
  }
  for (let j = 0; j < m; j++) {
    console.log("World!");
  }
}
```
time O(N*M).  
This is wrong. It's actually not multiplication because they are not nested. (I was just thinking about this idea of 
operations and how they present in the code structure!) So the complexities are added, which makes much more sense.  
O(N) + O(M)

### 13
```ts
function test(n) {
  for (let i = 0; i < (2 * n); i++) {
    console.log("Hello!");
  }
}
```
Time runs 2N times, but we can simplify to N. 
### 14
```ts
function test(n) {
  let count = 0;
  for (let i = n; i > 1; i = Math.floor(i / 2)) {
    for (let j = 0; j < n; j++) {
      count++;
    }
  }
  return count;
}
```
Time is N*logN because they're nested and one is N and the other logN
Space is 1, only keeping track of the count.

















a