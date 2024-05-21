
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
    - a 'dash' made of two hyphens?
    - are there any "starts with" requirements (remember ^ anchor for regex)
    - are there any "ends with" requirements (remember $ anchor)
- What characters will separate tokens (or words)?
    - exactly one space, or more than one space? up to how many spaces?
      For example: 'a', 'dog', 'DOG', 'doG', ' dog', 'dog ', 'dog cat', 'dogCat', 'dog_cat', '@', 'dog4', '4dog', '42', 'dog\n'.
