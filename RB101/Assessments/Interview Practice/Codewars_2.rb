
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
which should be returned as a string, where n is the position of the word in
 the list.

For example:

["yoda", "best", "has"]  -->  "yes"
  ^        ^        ^
  n=0     n=1     n=2
Note: Test cases contain valid input only - i.e. a string array or an empty
array; and each word will have enough letters.

PROBLEM - get all the nth characters to make a word

input: array of strings
output: the string made by joining the nth letter from the nth indexed word

explicit rules: nth letter from nth word gets joined
implicit rules: the length of the word is the lenth of the array

Questions: none

Mental Model:
crawl through with index, take the slice of length 1 and shovel

EXAMPLES

DATA / ALGORITHM
init string ""

for each word with index, n, in the given array
  string shovel in slice the word starting at index of length 1

string

CODE
=end
def nth_char(array)
  string = ""
  array.each_with_index do | word, index |
    string << word[index,1]
  end
  string
end

# p nth_char(['yoda', 'best', 'has']) == 'yes'
# p nth_char([]) == ''
# p nth_char(['X-ray']) == 'X'
# p nth_char(['No', 'No']) == 'No'
# p nth_char(['Chad', 'Morocco', 'India', 'Algeria', 'Botswana', 'Bahamas', 'Ecuador', 'Micronesia']) ==  'Codewars'



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

# p is_anagram('Creative', 'Reactive') == true
# p is_anagram("foefet", "toffee") == true
# p is_anagram("Buckethead", "DeathCubeK") == true
# p is_anagram("Twoo", "WooT") == true
# p is_anagram("dumble", "bumble") == false
# p is_anagram("ound", "round") == false
# p is_anagram("apple", "pale") == false

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
You are given an array (which will have a length of at least 3, but could be
 very large) containing integers. The array is either entirely comprised of
odd integers or entirely comprised of even integers except for a single
integer N. Write a method that takes the array as an argument and returns
this "outlier" N.

Examples
[2, 4, 0, 100, 4, 11, 2602, 36]
Should return: 11 (the only odd number)

[160, 3, 1719, 19, 11, 13, -21]
Should return: 160 (the only even number)

PROBLEM return the lone odd or even integer in a group of mostly odds or evens

input: array of integers
output: the lone ran(inte)ger

explicit rules: all but one number is even/odd, with a single odd/even
implicit rules: ok

Questions: ok

Mental Model:
need to deal with two cases
count the evens, if 1, then return, if not return the one value that is odd

EXAMPLES

DATA / ALGORITHM
given an array
case: count the number of nums that are 0 mod 2
  if 1, select the one that is 0 mod 2
  else, select the num that is 1 mod 2

CODE
=end
def lone_ranger(array)
  case array.count { |n| n % 2 == 0}
  when 1
    array.select { |n| n % 2 == 0}[0]
  else
    array.select { |n| n % 2 == 1}[0]
  end
end
# p "lone ranger"
# p lone_ranger([2, 4, 0, 100, 4, 11, 2602, 36]) == 11
# p lone_ranger([160, 3, 1719, 19, 11, 13, -21]) == 160


# # Write a function that connects each previous word to the next word by the shared letters. Return the resulting string (removing duplicate characters in the overlap) and the minimum number of shared letters across all pairs of strings.

=begin
PROBLEM given some strings, remove the adjacent letters in common, and squish them together
also return the min number of shared letters between any two adj words

input: an array of string words
output: 2-element array, [the funny-joined string, min num of shared letters]

explicit rules: any letters that are shared in common between adj words get written once in the joined string (instead of twice)
min num of shared letters gets returned
implicit rules: different word pairs can share different numbers of letters in common

Questions: ok

Mental Model:
some time of last compared to first
slicing from the back of the first, from the front of the second word, length incrementing,
when the substrings match, concat from the incremented length to the end of the next word onto frank


EXAMPLES

DATA / ALGORITHM
# init frank to first word of the Array
# lengths array = []

# for each with index word in the array
  # skip the first word
  # length = 1
  # for 1 up to legnth of the current word
    # if the frank[-length, length] == word[0, length]
      # concat the end of the word to frank
      # shovel the current length into the lengths_array
    end
  end
  [frank, and the min of the lengths array]

CODE
=end

def join(array)
  frank = array[0]
  lengths_array = []

  array.each_with_index do |word, index|
    next if index == 0
    1.upto(word.length) do |length|
      if frank[-length, length] == word[0, length]
        frank << word[(length)..]
        lengths_array << length
      end
    end
  end
  [frank, lengths_array.min]
end
# puts "--------------------join frank"
# p join(["oven", "envier", "erase", "serious"])  == ["ovenvieraserious", 2]
# p join(["move", "over", "very"]) == ["movery", 3]
# p join(["to", "ops", "psy", "syllable"])  == ["topsyllable", 1]

=begin
Pete likes to bake some cakes. He has some recipes and ingredients. Unfortunately he is not good in maths. Can you help him to find out, how many cakes he could bake considering his recipes?

Write a function cakes(), which takes the recipe (object) and the available ingredients (also an object) and returns the maximum number of cakes Pete can bake (integer). For simplicity there are no units for the amounts (e.g. 1 lb of flour or 200 g of sugar are simply 1 or 200). Ingredients that are not present in the objects, can be considered as 0.

Examples:

// must return 2
cakes({flour: 500, sugar: 200, eggs: 1}, {flour: 1200, sugar: 1200, eggs: 5, milk: 200});
// must return 0
cakes({apples: 3, flour: 300, sugar: 150, milk: 100, oil: 100}, {sugar: 500, flour: 2000, milk: 2000});

PROBLEM
Given a recipe and available ingredients, return the max number of cakes that can be made

input: hash of recipe, hash of available ingredients
output: integer

explicit rules:
if a cake can be made, it needs to be counted
  max number of cakes that can be made is returned
  if an ingedient isn't listed, there's 0
implicit rules:

Questions: ok

Mental Model:
if any ingredient is needed but not avail, return 0
for each ingredient needed, divide the avail by needed, store that value, and return the min of those values

EXAMPLES

DATA / ALGORITHM
# for each key in the recipe, if the key doesn't exist in available hash, return 0

# init mins Array
for each key in the recipe,
  corresponding key value avail/ value needed, store in an array

  return the min

CODE
=end

def cakes(recipe, avail)
  recipe.each_key do |ingred|
    case avail.key?(ingred)
    when true then next
    when false then return 0
    end
  end

  mins = []
  recipe.each do |ingred, value|
    mins << avail[ingred] / value
  end
  mins.min
end

# p cakes({"flour"=>500, "sugar"=>200, "eggs"=>1},{"flour"=>1200, "sugar"=>1200, "eggs"=>5, "milk"=>200}) == 2
# p cakes({"cream"=>200, "flour"=>300, "sugar"=>150, "milk"=>100, "oil"=>100},{"sugar"=>1700, "flour"=>20000, "milk"=>20000, "oil"=>30000, "cream"=>5000}) == 11
# p cakes({"apples"=>3, "flour"=>300, "sugar"=>150, "milk"=>100, "oil"=>100},{"sugar"=>500, "flour"=>2000, "milk"=>2000}) == 0
# p cakes({"apples"=>3, "flour"=>300, "sugar"=>150, "milk"=>100, "oil"=>100},{"sugar"=>500, "flour"=>2000, "milk"=>2000, "apples"=>15, "oil"=>20}) == 0
# p cakes({"eggs"=>4, "flour"=>400},{}) == 0
# p cakes({"cream"=>1, "flour"=>3, "sugar"=>1, "milk"=>1, "oil"=>1, "eggs"=>1},{"sugar"=>1, "eggs"=>1, "flour"=>3, "cream"=>1, "oil"=>1, "milk"=>1}) == 1

=begin
Your task is to sort a given string. Each word in the string will contain a single number. This number is the position the word should have in the result.

Note: Numbers can be from 1 to 9. So 1 will be the first word (not 0).

If the input string is empty, return an empty string. The words in the input String will only contain valid consecutive numbers.
Examples

"is2 Thi1s T4est 3a"  -->  "Thi1s is2 3a T4est"
"4of Fo1r pe6ople g3ood th5e the2"  -->  "Fo1r the2 g3ood 4of th5e pe6ople"
""  -->  ""

PROBLEM
given a mixed up string, put the string in order by the number that each word has embedded inside of it.

input: mixed up string
output: ordered string

explicit rules: empty string --> empty String
always consecutive numbers
output string is ordered by number

implicit rules: numbers are 1 through length
number can be anywhere inside of the word

Questions: ok

Mental Model:
array of the string split
from 1 to string length
  if the word includes the number
    shovel the word to the ordered Array
join the array with a space

EXAMPLES

DATA / ALGORITHM
array of the string split
from 1 to string length
  if the word includes the number
    shovel the word to the ordered Array
join the array with a space

CODE
=end

def order(string)
  array = string.split
  ordered = []
  1.upto(array.length) do |n|
    array.each do |word|
      if word.include?(n.to_s)
        ordered << word
      end
    end
  end
  ordered.join(' ')
end

# p order("is2 Thi1s T4est 3a") == "Thi1s is2 3a T4est"
# p order("4of Fo1r pe6ople g3ood th5e the2") == "Fo1r the2 g3ood 4of th5e pe6ople"
# p order("") == ""

=begin
You are going to be given an array of integers. Your job is to take that array and find an index N where the sum of the integers to the left of N is equal to the sum of the integers to the right of N. If there is no index that would make this happen, return -1.

For example:

Let's say you are given the array {1,2,3,4,3,2,1}:
Your function will return the index 3, because at the 3rd position of the array, the sum of left side of the index ({1,2,3}) and the sum of the right side of the index ({3,2,1}) both equal 6.

=begin
PROBLEM - return the index where numbers on left sum to n's on right

input: array of integers
output: integer rep the index of the balance point

explicit rules: sums be equal on either side
return the index of the balance point

implicit rules: the num at the balance point isn't counted in either sum

Questions: ok

Mental Model:
sum could have different nums comprising the sum
 each with index compare the R and L sums, when equal return the index,
 if never equal, return -1

EXAMPLES

DATA / ALGORITHM
for each with index n in the Array
  array

CODE
=end

def find_even_index(array)
  array.each_with_index do |n, index|
    if array[0...index].sum == array[(index+1)..].sum
      return index
    end
  end
  -1
end
#very exciting 8-min or so buzzer beater, the second of two problems within a
# 25 min timespan. Very psyched.

# p find_even_index([1,2,3,4,3,2,1]) == 3
# p find_even_index([1,100,50,-51,1,1]) == 1
# p find_even_index([1,2,3,4,5,6]) == -1
# p find_even_index([20,10,30,10,10,15,35]) == 3
# p find_even_index([20,10,-80,10,10,15,35]) == 0
# p find_even_index([10,-80,10,10,15,35,20]) == 6

=begin
Problem to do with Devin? or Cruz?
Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.

  Each number in candidates may only be used once in the combination.

  Note: The solution set must not contain duplicate combinations.

Input: candidates = [10,1,2,7,6,1,5], target = 8
Output:
  [
    [1,1,6],
    [1,2,5],
    [1,7],
    [2,6]
  ]
Example 2:

  Input: candidates = [2,5,2,1,2], target = 5
Output:
  [
    [1,2,2],
    [5]
  ]
=end

=begin
Write a function that, given a string of text (possibly with punctuation and
 line-breaks), returns an array of the top-3 most occurring words, in
descending order of the number of occurrences.

Assumptions:
A word is a string of letters (A to Z) optionally containing one or more
apostrophes (') in ASCII. (No need to handle fancy punctuation.)
Matches should be case-insensitive, and the words in the result should be
lowercased.
Ties may be broken arbitrarily.
If a text contains fewer than three unique words, then either the top-2 or
top-1 words should be returned, or an empty array if a text contains no words.

Examples:
top_3_words("In a village of La Mancha, the name of which I have no desire to call to
mind, there lived not long since one of those gentlemen that keep a lance
in the lance-rack, an old buckler, a lean hack, and a greyhound for
coursing. An olla of rather more beef than mutton, a salad on most
nights, scraps on Saturdays, lentils on Fridays, and a pigeon or so extra
on Sundays, made away with three-quarters of his income.")
# => ["a", "of", "on"]

top_3_words("e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e")
# => ["e", "ddd", "aa"]

top_3_words("  //wont won't won't")
# => ["won't", "wont"]
Bonus points (not really, but just for fun):
Avoid creating an array whose memory footprint is roughly as big as the input text.
Avoid sorting the entire array of unique words.
PROBLEM
given a string of a bunch of words, return an array of the three most freq
used words

input: string of words
output: array in dec order of top 3

explicit rules: anything of letters is a word, may include "'"
ties broken aribitrarily
descending order for the return

implicit rules: ignore other punctuation

Questions: ok

Mental Model:
for each of the uniq words in the string
create a hash with word key, count value
find largest 3 values
return those words

EXAMPLES

DATA / ALGORITHM
# downcase the string
# delete anything that's not a letter or an '
# init occurance_hash
# for each uniq word in the string
#   key word with value occurance
get the array of the values, sort and reverse
populate the return array with the keys that match the top three [0, 1, 2]
indeces from the keys array+

CODE
=end
def top_3_words(string)
  occurance_hash = string.downcase.scan(/([a-z]['a-z]*)/).flatten.tally
  array = occurance_hash.to_a.sort_by { |subarray| -subarray[1]}
  array.map{ |sub| sub[0] }[0,3] # if there's fewer than 3 items, you get
  # what is there (so that's nice.)
end

# p "name: joe something else something
# thing name: bill name: ".scan(/name\: ([a-z]+)/)
# p "top_3"
# p top_3_words("a a a  b  c c  d d d d  e e e e e") == ["e", "d", "a"]
# p top_3_words("' a a a  b  c c  d d d d  e e e e e") == ["e", "d", "a"]
# p top_3_words("e e e e DDD ddd DdD: ddd ddd aa aA Aa, bb cc cC e e e") ==
#  ["e", "ddd", "aa"]
# p top_3_words("  //wont won't won't") == ["won't", "wont"]
# p top_3_words("  , e   .. ") == ["e"]
# p top_3_words("  ...  ") == []
# p top_3_words("  '  ") == []
# p top_3_words("  '''  ") == []
# p top_3_words("""In a village of La Mancha, the name of which I have no desire to call to
# mind, there lived not long since one of those gentlemen that keep a lance
# in the lance-rack, an old buckler, a lean hack, and a greyhound for
# coursing. An olla of rather more beef than mutton, a salad on most
# nights, scraps on Saturdays, lentils on Fridays, and a pigeon or so extra
# on Sundays, made away with three-quarters of his income.""") == ["a", "of", "on"]

=begin
6 kyu
Complete the solution so that it splits the string into pairs of two
characters. If the string contains an odd number of characters then it
should replace the missing second character of the final pair with an
underscore ('_').

PROBLEM given a string chop of pairs of characters as elements of an array
put a _ at the end if necessary

input: string, no spaces
output: array of two-char strings

explicit rules:
if odd number of charachters, the last char is _

implicit rules: no spaces

Questions:

Mental Model:
use #first 2 repeatedly, mutate the string
grab even numbered indices, for length 2 slices

EXAMPLES

DATA / ALGORITHM
if string length is odd, << a _

while index < length - 1
  if index is even
    shovel a 2-lnegth slice to the array
  if index odd
    next
end
array

CODE
=end
def solution(string)
  string << "_" if string.length.odd?
  array = []

  0.upto(string.length-1) do |n|
    n.even? ? array << string[n,2] : next
  end
  array
end

# p solution('abc') == ['ab', 'c_']
# p solution('abcdef') == ['ab', 'cd', 'ef']
# p solution("abcdef") == ["ab", "cd", "ef"]
# p solution("abcdefg") == ["ab", "cd", "ef", "g_"]
# p solution("") == []

=begin
Complete the method that takes a hash/object/directory/association list of users, and find the nexus: the user whose rank is the closest is equal to his honor. Return the rank of this user. For each user, the key is the rank and the value is the honor.

If nobody has an exact rank/honor match, return the rank of the user who
comes closest. If there are several users who come closest, return the one
with the lowest rank (numeric value). The hash will not necessarily contain
consecutive rank numbers; return the best match from the ranks provided.

Example
         rank    honor
users = {  1  =>  93,
          10  =>  55,
          15  =>  30,
          20  =>  19,    <--- nexus
          23  =>  11,
          30  =>   2 }
=end
def nexus(hash)
  hash.sort.sort_by { | k, v | (k-v).abs }[0][0]
end

# p nexus({10 => 9, 1 => 3, 3 => 3, 5 => 1}) #== 3
# p nexus({11 => 10, 2 => 6, 3 => 4, 5 => 1}) #== 3
# p nexus({1 => 10, 2 => 3, 3 => 4, 5 => 1}) #== 2
#whoops hack and slash but I'm glad I did it.
# I learned that #sort is used for hashes, returns a 2-d array, and that
# sortby can be used on hashes as well. Also min by returns the min sub array
# according to the block passed to minby

=begin
#Find the missing letter

Write a method that takes an array of consecutive (increasing) letters as
input and that returns the missing letter in the array.

  You will always get an valid array. And it will be always exactly one
letter be missing. The length of the array will always be at least 2.
    The array will always contain letters in only one case.

  Example:

  ['a','b','c','d','f'] -> 'e' ['O','Q','R','S'] -> 'P'

["a","b","c","d","f"] -> "e"
["O","Q","R","S"] -> "P"
(Use the English alphabet with 26 letters!)

PROBLEM - find the missing letter

input: a valid array of increasing string letters, one missing
output: the missing letter as a string

explicit rules: one missing, find and return it

implicit rules:

Questions:

Mental Model:
array of all the letters
for each letter in the given array
  if the next letter's index is one more than it, next
  else return the next letter that should be there

EXAMPLES

DATA / ALGORITHM
LETTERS range obj to_a

for each letter in the given array
  if the next letter's index in LETTERS is one more than that letter's index,
next
  else return the next letter that should be there
CODE
=end
def missing_letter(array)
  letters = ('A'..'Z').to_a + ('a'..'z').to_a
  array.each_with_index do |char, index|
    next if letters.index(array[index+1]) == letters.index(char)+1
    return letters[letters.index(char)+1]
  end
end

def find_missing_letter(arr) #damn!
  ((arr.first..arr.last).to_a - arr).first
end
# p find_missing_letter(["a","b","c","d","f"]) #== "e"
# p missing_letter(["O","Q","R","S"]) #== "P"


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
