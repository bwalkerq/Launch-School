
=begin
PROBLEM

input:
output:

explicit rules:
implicit rules:

Questions:

Mental Model:

EXAMPLES

DATA / ALGORITHM

CODE
=end
=begin
Given a string of integers, return the number of odd-numbered substrings that can be formed.

For example, in the case of "1341", they are 1, 1, 3, 13, 41, 341, 1341, a total of 7 numbers.

solve("1341") = 7. See test cases for more examples.

PROBLEM

input: a string of integers
output: integer, the number of odd integer substrings

explicit rules: if a substring of any length is itself an odd number, include
 it in the return count
implicit rules:

Questions: ok

Mental Model:
iterate each cons for increasing length up to the string length
translate to integers
for each, add to count if odd

EXAMPLES: as expected

DATA / ALGORITHM

from 1 up to the string length, run each cons, check if result is odd, if so
add to an odd_counter, return the odd counter

CODE
=end
def solve(string)
  odd_counter = 0
  1.upto(string.size) do |n|
    string.chars.each_cons(n) do |sub_array|
      odd_counter += 1 if sub_array.join.to_i.odd?
    end
  end
  odd_counter
end

# p solve("134") == 3
# p solve("1341") == 7
# p solve("1357") == 10
# p solve("13471") == 12
# p solve("134721") == 13
# p solve("1347231") == 20
# p solve("13472315") == 28

=begin
Complete the function that takes an array of words.

You must concatenate the nth letter from each word to construct a new word
which should be returned as a string, where n is the position of the word in the list.

For example:

["yoda", "best", "has"]  -->  "yes"
  ^        ^        ^
  n=0     n=1     n=2
Note: Test cases contain valid input only - i.e. a string array or an empty
array; and each word will have enough letters.
PROBLEM

input: array of strings
output: the string that joins the nth letter from the nth indexed word

explicit rules: nth letter from nth word gets joined
implicit rules: the length of the word is the lenth of the array

Questions: none

Mental Model:


EXAMPLES

DATA / ALGORITHM

CODE
=end
def nth_char(array)

end
p nth_char(['yoda', 'best', 'has']) == 'yes'
p nth_char([]) == ''
p nth_char(['X-ray']) == 'X'
p nth_char(['No', 'No']) == 'No'
p nth_char(['Chad', 'Morocco', 'India', 'Algeria', 'Botswana', 'Bahamas', 'Ecuador', 'Micronesia']) ==  'Codewars'



=begin
Write a function that when given a URL as a string, parses out just the domain name and
returns it as a string. For example:

domain_name("http://github.com/carbonfive/raygun") == "github"
domain_name("http://www.zombie-bites.com") == "zombie-bites"
domain_name("https://www.cnet.com") == "cnet"
PROBLEM

input: string url
output: string containing only the domain name

explicit rules: return the domain name
implicit rules: domain name always follows either // or www.
contains everything up to the next dot

Questions:

Mental Model:
iterate through the characters, use indeces


EXAMPLES

DATA / ALGORITHM
There are four prefixes before the domain name
set up delete cases for each, split the remaining string by ".", return the
first element of that split

sub / https*:// /, ''
sub / www. /, ''
split(".")[0]

CODE
=end
def domain_name(string)
  # find what we do want first, grab it out
  string.match(/^(https*:\/\/)*(www\.)*(.+?)\./)[3]

  # delete the first stuff that we
  # don't want, then grab what we do
  #string.sub!(/^(https*:\/\/)*(www\.)*/, '')
  #string.split(".")[0]
end


# p "-------------------domain name"
# p domain_name("http://google.co.jp") == "google"
# p domain_name("www.xakep.ru") == "xakep"
# p domain_name("xakep.ru") == "xakep"
# p domain_name("https://www.xakep.www.thing.ru") == "xakep"
# p domain_name("http://www.zombie-bites.com") == "zombie-bites"
# p domain_name("https://youtube.com") == "youtube"
# p domain_name("http://google.com") == "google"
# p domain_name("http://github.com/carbonfive/raygun") == "github"
# p domain_name("https://www.cnet.com") == "cnet"

=begin
Find all pairs

You are given array of integers, your task will be to count all pairs in
that array and return their count.

Notes:

Array can be empty or contain only one value; in this case return 0
If there are more pairs of a certain number, count each pair only once.  E.g
.: for [0, 0, 0, 0] the return value is 2 (= 2 pairs of 0s)
Random tests: maximum array length is 1000, range of values in array is
between 0 and 1000
Examples
[1, 2, 5, 6, 5, 2]  -->  2
...because there are 2 pairs: 2 and 5

[1, 2, 2, 20, 6, 20, 2, 6, 2]  -->  4
...because there are 4 pairs: 2, 20, 6 and 2 (again)
PROBLEM

input: an array of integers
output: integer, the count of unique pairs

explicit rules: a number can be paired more than once if there are sufficient
 pairs
implicit rules:

Questions: ok

Mental Model:
for each unique value in the array,
sum +=

EXAMPLES ok

DATA / ALGORITHM

CODE
=end
def pairs(array)
  sum = 0
  array.uniq.each do |n|
    sum += array.count(n)/2
  end
  sum
end

# p pairs([1, 2, 5, 6, 5, 2]) == 2
# p pairs([1, 2, 2, 20, 6, 20, 2, 6, 2]) == 4
# p pairs([0, 0, 0, 0, 0, 0, 0]) == 3
# p pairs([1000, 1000]) == 1
# p pairs([]) == 0
# p pairs([54]) == 0

=begin
You live in the city of Cartesia where all roads are laid out in a perfect
grid. You arrived ten minutes too early to an appointment, so you decided
to take the opportunity to go for a short walk. The city provides its citizens
with a Walk Generating App on their phones -- every time you press the button
it sends you an array of one-letter strings representing directions to walk
(eg. ['n', 's', 'w', 'e']). You always walk only a single block in a direction
and you know it takes you one minute to traverse one city block, so create a
function that will return true if the walk the app gives you will take you
exactly ten minutes (you don't want to be early or late!) and will, of
course, return you to your starting point. Return false otherwise.

Note: you will always receive a valid array containing a random assortment
of direction letters ('n', 's', 'e', or 'w' only). It will never give you an
 empty array (that's not a walk, that's standing still!).
=end

=begin
PROBLEM given an array of strings NSEW, return boolean for valid 10 min walk

input: an array of string letters
output: boolean

explicit rules: take ten minutes; be 10 blocks; be 10 letters
return to starting point
implicit rules: number of E & W, N & S must be equal (for return to start)

Questions:

Mental Model:
count has to be 10
pair off the directions

EXAMPLES

DATA / ALGORITHM
if the count is not 10, return false
if E count and W count are equal AND S and N count equal, return true
false

CODE
=end
def is_valid_walk(array)
  return false if array.size != 10
  if array.count("e") == array.count('w') && array.count('n')== array.count('s')
    return true
  else
    false
  end
end
# p "walk"
# p is_valid_walk(['n','s','n','s','n','s','n','s','n','s']) == true
# p is_valid_walk(['w','e','w','e','w','e','w','e','w','e','w','e']) == false
# p is_valid_walk(['w']) == false
# p is_valid_walk(['n','n','n','s','n','s','n','s','n','s']) == false

=begin
Write Number in Expanded Form
You will be given a number and you will need to return it as a string in
Expanded Form. For example:

expanded_form(12); # Should return '10 + 2'
expanded_form(42); # Should return '40 + 2'
expanded_form(70304); # Should return '70000 + 300 + 4'
NOTE: All numbers will be whole numbers greater than 0.

PROBLEM
return an expanded sum form of a number by multiples of 10

input: integer, non zero
output: string of the sum

explicit rules: 0's are not included in the sum
implicit rules:

Questions:

Mental Model:
digits and reverse
each with index

EXAMPLES

DATA / ALGORITHM
# get an array of the digits, in order from smallest to largest
# init output_string
# for each value with index in the array
  prepend the result of: multiply it by 10*index
  skip if 0
  prepend a plus for all but the last element
  If index != integer.size - 1, prepend the plus
return the string

CODE
=end
def expanded_form(integer)
  digits = integer.digits
  output = ""
  digits.each_with_index do |num, index|
    next if num == 0
    output.prepend((num*10**index).to_s)
    output.prepend(" + ") if index != (digits.size - 1)
  end
  output
end
# p expanded_form(12) == '10 + 2'
# p expanded_form(42) == '40 + 2'
# p expanded_form(70304) == '70000 + 300 + 4'

=begin
Write a function, persistence, that takes in a positive parameter num and
returns its multiplicative persistence, which is the number of times you
must multiply the digits in num until you reach a single digit.

  For example:

persistence(39) # returns 3, because 3*9=27, 2*7=14, 1*4=4
# and 4 has only one digit

persistence(999) # returns 4, because 9*9*9=729, 7*2*9=126,
# 1*2*6=12, and finally 1*2=2

persistence(4) # returns 0, because 4 is already a one-digit number

PROBLEM - multiply digits repeatedly to arrive at 1-digit result, return count

input: integer > 0
output: integer rep count of multiplications

explicit rules: multiply the digits until the result is < 10
implicit rules:

Questions:

Mental Model:
split to digits, product the whole thing, repeat until result is <10

EXAMPLES

DATA / ALGORITHM
counter = 0
result = integer
get the digits, inject over them with *, stop when result < 10
while result > 10
  result = result.digits.inject
  counter +=1

counter

CODE
=end
def persistence(integer)
  result = integer
  counter = 0
  while result >= 10
    result = result.digits.inject(:*)
    counter += 1
  end
  counter
end

# p "persist"
# p persistence(39) == 3
# p persistence(4) == 0
# p persistence(25) == 2
# p persistence(999) == 4
# p persistence(9991123424)

# Input: s = "a1c1e1"
# Output: "abcdef"
# Explanation: The digits are replaced as follows:
# - s[1] -> shift('a',1) = 'b'
# - s[3] -> shift('c',1) = 'd'
# - s[5] -> shift('e',1) = 'f'
# Example 2:

# Input: s = "a1b2c3d4e"
# Output: "abbdcfdhe"
# Explanation: The digits are replaced as follows:
# - s[1] -> shift('a',1) = 'b'
# - s[3] -> shift('b',2) = 'd'
# - s[5] -> shift('c',3) = 'f'
# - s[7] -> shift('d',4) = 'h'
# You are given a 0-indexed string s that has lowercase English letters in its even indices and digits in its odd indices.

# There is a function shift(c, x), where c is a character and x is a digit, that returns the xth character after c.

# For example, shift('a', 5) = 'f' and shift('x', 0) = 'x'.
# For every odd index i, you want to replace the digit s[i] with shift(s[i-1], s[i]).

# Return s after replacing all digits. It is guaranteed that shift(s[i-1], s[i]) will never exceed 'z'.
=begin
PROBLEM when we come to a number, n, in the string, replace it with the letter that comes n letters after the immediately preceding letter

input: string with numbers and letters
output: string with letters only

explicit rules: letters stay, numbers replaced with a letter that is n letters after the previous letter
  we'll never go past z in the alphabet
implicit rules:

Questions: ok

Mental Model:
# constant for the alphabet
# array for the string
# map! with index
# for each character in the array
#   if (letter return the letter) char is included in ALPHA
  else, char to integer, n, return the corresponding letter that is n letters later
  index of the previous letter in ALPHA, add n, return alpha[new sum]
join array

EXAMPLES

DATA / ALGORITHM

CODE
=end

ALPHA = %w(a b c d e f g h i j k l m n o p q r s t u v w x y z)

def f(string)
  array = string.chars
  array.map!.with_index do |char, index|
    if ALPHA.include?(char)
      char
    else
      ALPHA[(char.to_i + ALPHA.index(array[(index-1)]))]
    end
  end
  array.join
end

# p (f("a1c1e1") == "abcdef")
# p (f("a1b2c3d4e") == "abbdcfdhe")

# Feedback from Devin: act more confident than I feel; completely confident
# that the code behaves as expected, and if it doesn't, that I can figure it out

=begin
Complete the function scramble(str1, str2) that returns true if a portion of
 str1 characters can be rearranged to match str2, otherwise returns false.
Notes:
  Only lower case letters will be used (a-z). No punctuation or digits will
be included.
  Performance needs to be considered
Input strings s1 and s2 are null terminated.

PROBLEM given two stringsreturn true if the letters of s2 are contained in s1,
else false

input: two strings of lowercase letters
output: boolean

explicit rules: if the letters of s2 are one to one included in s1, true

implicit rules: "arranged" means doubles have to be counted for

Questions: ok

Mental Model:
for each char in s2 delete from s1, if nil returned, false, else true NOPE
because #delete deletes all occurances

EXAMPLES ok

DATA / ALGORITHM
for each char in s2, compare count with s1, if <= to s1 count, true, else false

CODE
=end

def scramble(string_1, string_2)
  string_2.chars.uniq.each do |letter|
    return false if string_2.count(letter) > string_1.count(letter)
  end
  true
end

# p "scramblies"
# s1 = "abcdefghijklmnopqrstuvwxyz" * 100_000
# s2 = "zyxcba" * 90_000
# p scramble(s1, s2) == true
# p scramble('rkqodlw','world') == true
# p scramble('cedewaraaossoqqyt','codewars') == true
# p scramble('katas','steak') == false
# p scramble('scriptjava','javascript') == true
# p scramble('scriptingjava','javascript') == true

=begin
A string is considered to be in title case if each word in the string is either (a) capitalised (that is, only the first letter of the word is in upper case) or (b) considered to be an exception and put entirely into lower case unless it is the first word, which is always capitalised.

Write a function that will convert a string into title case, given an optional list of exceptions (minor words). The list of minor words will be given as a string with each word separated by a space. Your function should ignore the case of the minor words string -- it should behave in the same way even if the case of the minor word string is changed.

PROBLEM
given a string title and a string of execptions, return the string in title case

input: the string to be title cased, a string of exceptions separated by spaces
output: the title cased string

explicit rules: first word is always capitalized
exception words are lowercased (regardless of input of exceptions)
every other word is capitalized
implicit rules: if no exceptions, each word is captialized

Questions: ok

Mental Model:


EXAMPLES

DATA / ALGORITHM
# default the Exception parameter to an empty string
# downcase both strings
# array for both strings

# map with index the title array, for each word in the title string
  # if index is 0
  #   cap the word
  if the word is included in the Exception array
    word
  else,
    word capitalised

CODE
=end

def title_case(title, exceptions = "")
  title_array = title.downcase.split
  except_array = exceptions.downcase.split

  title_array.map.with_index do |word, index|
    if index == 0
      word.capitalize
    elsif except_array.include?(word)
      word
    else
      word.capitalize
    end
  end.join(' ')
end

# p title_case('a clash of KINGS', 'a an the Of') == 'A Clash of Kings'
# p title_case('THE WIND IN THE WILLOWS', 'The In') == 'The Wind in the Willows'
# p title_case('the quick brown fox') == 'The Quick Brown Fox'

=begin
The marketing team is spending way too much time typing in hashtags.
Let's help them with our own Hashtag Generator!

Here's the deal:

It must start with a hashtag (#).
All words must have their first letter capitalized.
If the final result is longer than 140 chars it must return false.
If the input or the result is an empty string it must return false.
Examples
" Hello there thanks for trying my Kata"  =>  "#HelloThereThanksForTryingMyKata"
"    Hello     World   "                  =>  "#HelloWorld"
""                                        =>  false

PROBLEM

input: string
output: hashtag string

explicit rules: if the string > 140 characters, false
every word capitalized
starts with "#"
implicit rules: ok

Questions: ok

Mental Model:
get the array of the words, cap each one, joine without a space, put # at the front

EXAMPLES

DATA / ALGORITHM
# given String
# if string > 139 return false
# return false if string == ""
# array of words, map! each capitalize
join
prepend #

CODE
=end

def generateHashtag(string)
  return false if string.split.join.size > 139
  return false if string.split.join == ""

  array = string.split.map { | word | word.capitalize}
  array.join.prepend("#")
end

# p "hashtag sexy ghost"
# p generateHashtag("") == false
# p generateHashtag(" " * 200) == false
# p generateHashtag("Do We have A Hashtag") == "#DoWeHaveAHashtag"
# p generateHashtag("Codewars") == "#Codewars"
# p generateHashtag("Codewars Is Nice") ==  "#CodewarsIsNice"
# p generateHashtag("Codewars is nice") == "#CodewarsIsNice"
# p generateHashtag("code" + " " * 140 + "wars") == "#CodeWars"
# p generateHashtag("Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Cat") == false
# p generateHashtag("a" * 139) == "#A" + "a" * 138
# p generateHashtag("a" * 140) == false

=begin
An anagram is the result of rearranging the letters of a word to produce a new word (see wikipedia).

Note: anagrams are case insensitive

Complete the function to return true if the two arguments given are anagrams of each other; return false otherwise.

Examples
"foefet" is an anagram of "toffee"

"Buckethead" is an anagram of "DeathCubeK"
=end

=begin
PROBLEM - return a boolean for whether or not two words are anagrams

  input: two strings
  output: boolean

  explicit rules: if the letters of the two match exactly, return true, else false
  case insensitive

  implicit rules: ok

  Questions: ok

  Mental Model:
  take both st

  EXAMPLES

  DATA / ALGORITHM
  downcase and sort the arrays of both strings
  compare with equality, return value

  CODE
=end

def is_anagram(s1, s2)
  s1 = s1.downcase.chars.sort
  s2 = s2.downcase.chars.sort
  s1 == s2
end

p is_anagram('Creative', 'Reactive') == true
p is_anagram("foefet", "toffee") == true
p is_anagram("Buckethead", "DeathCubeK") == true
p is_anagram("Twoo", "WooT") == true
p is_anagram("dumble", "bumble") == false
p is_anagram("ound", "round") == false
p is_anagram("apple", "pale") == false

=begin
Given a string of words, you need to find the highest scoring word.

Each letter of a word scores points according to its position in the alphabet: a = 1, b = 2, c = 3 etc.

You need to return the highest scoring word as a string.

If two words score the same, return the word that appears earliest in the original string.

All letters will be lowercase and all inputs will be valid.
=end

=begin
PROBLEM - return the first word with the highest score in a string, where score is the sum of the positions in the alphabet

input: string of words
output: a string word

explicit rules: each letter is worth its place value in the alphabet
  highest score is returned, tie returns the first such word
implicit rules: ok

Questions: ok

Mental Model:
hash with key value pairs as letters and their scores
iterate through each word, calculate sum with the hash
compare the scores with current best score, replace if better

EXAMPLES

DATA / ALGORITHM
get the alphabet array, create the hash with the scores by adding one to the index
keys are letters, scores are values

score Method (word)
score = 0
for each char in the word
incremenet the score for each value that matches the key

assign first word to current best
for each word in the string array
  replace if score of word > current best score

  best word

CODE
=end

ALPHA_HASH = {}
("a".."z").to_a.each_with_index do |letter, index|
  ALPHA_HASH[letter] = (index + 1)
end

# could also: ALPHA_HASH = ("a".."z").to_a.zip(1..26).to_h
# wow!

def score(word)
  score = 0
  word.chars.each do |letter|
    score += ALPHA_HASH[letter]
  end
  score
end

def high(string)
  current_best = string.split.first
  string.split.each do |word|
    current_best = word if score(word) > score(current_best)
  end
  current_best
end

# p high('man i need a taxi up to ubud') == 'taxi'
# p high('what time are we climbing up the volcano') == 'volcano'
# p high('take me to semynak') == 'semynak'
# p high('aaa b') == 'aaa'
# p high('aa b') == 'aa'
=begin
PROBLEM

input:
output:

explicit rules:
implicit rules:

Questions:

Mental Model:

EXAMPLES

DATA / ALGORITHM

CODE
=end


=begin
PROBLEM

input:
output:

explicit rules:
implicit rules:

Questions:

Mental Model:

EXAMPLES

DATA / ALGORITHM

CODE
=end

