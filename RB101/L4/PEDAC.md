# PROBLEM:

# Given a string, write a method `palindrome_substrings` which returns
# all the substrings from a given string which are palindromes. Consider
# palindrome words case sensitive.

# Test cases:

# palindrome_substrings("supercalifragilisticexpialidocious") == ["ili"]
# palindrome_substrings("abcddcbA") == ["bcddcb", "cddc", "dd"]
# palindrome_substrings("palindrome") == []
# palindrome_substrings("") == []

questions:
  will inputs always be strings?
  what does it mean to treat palindrome words case sensitively? [I have a guess but would rather have it described][also, it's difficult to describe, lol]

input: string
output: array of (sub)strings (seen in test cases)
rules:
  explicit:
    all palindrome substrings returns
    case sensitive
  implicit: 
    palindrome substrings within palindromes included
      eg. noon ==> noon, oo
    input with no palindromes returns an empty array
    input "" returns empty array

# Algorithm:
#  - initialize a result variable to an empty array
#  - create an array named substring_arr that contains all of the
#    substrings of the input string that are at least 2 characters long.
This step looks hard as fuck 
#  - loop through the words in the substring_arr array.
#  - if the word is a palindrome, append it to the result array
#  - return the result array

# Better Algorithm:
# - create an empty array called `result` that will contain all required substrings
# - create a `starting_index` variable (value `0`) for the starting index of a substring
# - start a loop that iterates over `starting_index` from `0` to the length of the string minus 2
#   - create a `num_chars` variable (value `2`) for the length of a substring
#   - start an inner loop that iterates over `num_chars` from `2` to `string.length - starting_index`
#     - extract a substring of length `num_chars` from `string` starting at `starting_index`
#     - append the extracted substring to the `result` array
#     - increment the `num_chars` variable by `1`
#   - end the inner loop
#   - increment the `starting_index` variable by `1`
# - end the outer loop
# - return the `result` array
This is pretty solid

# Their solution:
```ruby
def substrings(str)
  result = []
  starting_index = 0;

  while (starting_index <= str.length - 2)
    num_chars = 2
    while (num_chars <= str.length - starting_index)
      substring = str.slice(starting_index, num_chars)
      result << substring
      num_chars += 1
    end
    starting_index += 1
  end
  result
end

def is_palindrome?(str)
  str == str.reverse
end

def palindrome_substrings(str)
  result = []
  substrings_arr = substrings(str)
  substrings_arr.each do |substring|
    result << substring if is_palindrome?(substring)
  end
  result
end

p palindrome_substrings("supercalifragilisticexpialidocious"); # ["ili"]
p palindrome_substrings("abcddcbA");   # ["bcddcb", "cddc", "dd"]
p palindrome_substrings("palindrome"); # []
p palindrome_substrings("");           # []
```
# wow 


--------- Example 2 ---------------------------

## P - Understanding the Problem
- establish the rules / define the boundaries of the problem
  - assess available info
  - Restate explicit requirement
  - identify implicit requires
- spend enough time here; don't rush the step

## E - Examples and test cases
  - confirm/refute assumptions
  - Help to answer questions about implicit requirements
  - Act as assertions which help to codify the rules and boundaries
[the video didn't offer anything new to my solution process]
## Data Structures
  - Help reason with data logically
  - Help interact with data at implementation level
  - Thinking in terms of data structures is part of problem solving process
  - Data structres closely linked to algorithm
[Suggested a nested array structure! very interesting]
[
  [2],
  [4, 6],
  [8, 10, 12],
  [14, 16,18, 20],
  ...
]
  [the video didn't offer anything new to my solution process, though it did offer a different idea (nested array)]

## A - Algorithms
  - A logical sequence of steps for accomplishing a task or objective [agree]
    - Cosely linked to data structures
    Serios of steps to structure data to produce the required output
  - Stay abstract/ high-level
    - Avoid implementation detail
    - Don't worry about efficiency for now

**Their Algorithm**
1. Create an empty "rows" array to contain all of the rows
2. Create a "row" array and add it to the overall "rows" array
3. Repeat setp 2 until all the necessary rows have been created
4. Sum the final row
5. return the sum

*Problem: Create a Row* [their partition of a method in the framework]
Rules:
- Row is an array
- Arrays contain integers
- Integers are consecutive even numbers
- Integers in each row form part of an overall larger sequence
- Rows are of different lengths
- input: the information needed to create the output
  - the starting integer and length of the row
- output: the row itself, e.g. '[14, 16,18, 20]'

## C - Implementing a solution in Code 
[something great about what they did: built several lines as testers that should output true once the method is built correctly. Wrote those test lines first before starting to code the methods at all. 
e.g. row number : 2 --> sum of integers in row: 10
p sum_even_number_row(2) == 10 # true]
[they also chain #last twice to get the last entry of the current last row as they build up each of the arrays within the larger array. smooth]

## Final Thoughts
- Not a completely linear process; Move back and forth between 
- Switch from implementation mode to abstract problem solving mode [this is a very unclear idea, but I can do this already, so who cares]
- Don't try to problem solve at the code level

Given a string, produce a new string with every other word removed

# Questions
1. Is the first or second word removed
2. what defines a word in this context
3. punctuation treatement?

--------------------------------------------------
## My Pre-Video Process: Sum Even Number Rows
 Imagine a sequence of consecutive even integers beginning with two. The integers are grouped in rows, with the first row containing one integer, the second row two integers, the third row three integers, and so on. Given an integer representing the number of a particular row, return an integer representing the sum of all the integers in that row.

Sequence: 2,4,6,8,10,12,14,16,18, ...

2
4, 6
8, 10, 12
14, 16, 18, 20

# Problem:
input: integer representing a row number, n
output: integer representing the sum of the integers in the nth row

Rules:
  Explicit: 
    first row starts with the number 2 only, the next row 4, 6, the next row populated with the 3 successive evens, and so on (see example above)
  Implicit
    I don't have to build the actual row, though I could, in order to sum
  
Questions:
1. Do I need to show the row or the summing or just the sum output
2. is the first row considered row 1 or row 0?

# examples and test cases:
1. 2 = row = n = 2, # of integers being summed = 2, total integers from start = 3
2. 3 = row = n = # of integers being summed = 3, total integers from the start 1 + 2 + 3 = 6
3. 4 = row = n = # of integers being summed, total integers from the start 1 + 2 + 3 + 4 = 10
4. 10 = row = n, total integers from the start: 1 + 2 + ... + 9 + 10 = 55 (summing the last 10 of the 55)(use negative index? from -1 to -n.)


# Algorithm and data structures: 
given row number n, create an array of the evens with number of entries = (1 + 2 + 3 + ... + n-1 + n), then return the sum the last n entries referencing index -1 to -n

evens_from_2_to_the_last_even_in_the_nth_row_array = []
def number_of_evens_to_populate(row_number)
loop adding consecutive integers 1 to n
return number_of_evens
end
def populate_array_with_evens(number_of_evens)
loop push consecutive even integers starting at 2 number_of_evens times
return array
end
def sum_the_last_n_evens(array, row_number)
loop backwards through array, summing the last n integers, from index -1 to -n
end

# code attempt
see PEDAC-example.rb [so lit!]