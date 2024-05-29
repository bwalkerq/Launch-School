
input/test-writing questions to ask the interviewer
### all input:
- what type(s) accepted
- input validation? How should we handle bad input? error message?
- what do null, undefined, empty arrays, empty objects?
- no input at all?

### return
- return value?
- mutation?
- anything logged

### arrays and objects:
- what should be done with repeat/duplicate values?
- can it work with sparse arrays? (either empty values, or with a property)
- for nested 2D+ situations, will the elements always be of a certain type?
  will each element of the array be a subarray, or will there be values mixed in

### number input:
- what is the range of inputs? max and min?
- can +/- infinity be an input?
- negative numbers? zero?
- floats?
- NaN? NaN with duplicates because it doesn't equal itself?

### string input:
- which characters constitute a "word" or a "token"?
    - uppercase and lowercase?
    - hyphenated words?
    - is 'y' a vowel
    - a 'dash' made of two hyphens?
    - are there any "starts with" requirements (remember ^ anchor for regex)
    - are there any "ends with" requirements (remember $ anchor)
- What characters will separate tokens (or words)?
    - exactly one space, or more than one space? up to how many spaces?
      For example: 'a', 'dog', 'DOG', 'doG', ' dog', 'dog ', 'dog cat', 'dogCat', 'dog_cat', '@', 'dog4', '4dog', '42', 'dog\n'.

## Feedback compiled across study sessions:
Philip:
- Become familiar with `Array.p.every()` and `.some()` (same as ruby #all? and #any?)
  - returns boolean true if all (or, in the case of `.some`, at least one) the elements of an array return true for the `callbackFn` 
- Build fluency with JS. as of 5/22 my PEDAC and process are both solid.
- Look for problem-solving patterns
  - consider that the vowel problem is a problem about distillation:
    we only care about the vowels, not any other characters, the order, or the number of occurances of each vowel
    it would be helpful to distill down each element to the part that we care about only, in this case the unique vowels that occurance
    then match them to the beginning.
- Getting distinct values from an array with duplicates
  - I wrote my own, which is fine, re-creatable
  - I found this, which is very smooth: 
    - `arrWithDupes.filter((v,i,a) => a.indexOf(v) === i)`
- Remember that when a function may return null (e.g. a `filter` call with no elements matching 
) that I may need to use `||` or the fancier `??` (nullish coalescing operator) when assigning the result.
  - e.g. `let included = first.match(/[aeiouy]/gi) || [];`

AJ:
- note that in order to filter out the empty elements from sparse arrays, have to write 
a sort of guard clause

Super awesome
```js
let array = [1,1,2,3,4,2,3,4,5,6,5,6,5,6]
let countsObj = array.reduce((obj, cv) => {
  obj[cv] = obj[cv] || 0;
  obj[cv] += 1;
  return obj;
  }, {}); // note this starting object

console.log(countsObj)
```

Object.fromEntries(Object.entries(resultObj).sort((a, b) => b[1] - a[1]));

resultArr.push(array.splice(array.indexOf(Math.min(...arr)), 1)[0])