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

# from https://docs.google.com/document/u/1/d/1usQUJQFr6PGVo3ZWgMi3nVtDRdeUuOUNRtZPtSKkYuE/mobilebasic#h.x956pbnpkojz


# Live coding with Devin 1/31
# // Task
# // Given a list and a number, create a new list that contains each number of list at most N times, without reordering.
# // For example if the input number is 2, and the input list is [1,2,3,1,2,1,2,3], you take [1,2,3,1,2], drop the next [1,2] since this would lead to 1 and 2 being in the result 3 times, and then take 3, which leads to [1,2,3,1,2,3].
# // With list [20,37,20,21] and number 1, the result would be [20,37,21].

=begin
PROBLEM

input: an array of integers, and an integer
output: a new array of integers

explicit rules: go through the array and remove any values that occur more than n times
implicit rules: all positive array values and  pos values of n

Questions:

Mental Model:
N represents a counter limit, iterate through the list, after a number is counted n times, all other occurances are removed

EXAMPLES ok

DATA / ALGORITHM
arrays

# set up the empty output_array
# initialize u_array to hold the unique values
iterate through unique values array with Each
  # set a counter to zero
  iterate through original array,
    If num matches the unique value AND counter is less than two, shovelling to the output array the occurance of the first two numbers, increment counter,
    after counter reaches 2, break
  else next value
return the output array

CODE
=end

def delete_nth(array, n)
  output_array = []
  u_hash = {}
  array.uniq.each do |u|
    u_hash[u] = 0
  end
  array.each do |num|
    counter = 0
    u_hash.each do |k,v|
      if v < n && k == num
        output_array << num
        u_hash[k] += 1
      elsif v == n && k == num
        break
      else
        next
      end
    end
  end
  output_array
end
# this was sick because I satisfied the test cases, but I knew that I was not
# meeting the requirements, so I revamped my algorithm

# p (delete_nth([20,37,20,21], 1))  #== [20,37,21]
# p (delete_nth([1,7, 2, 1,3,3,7,2,2,2,2], 3))  #== [1, 1, 3, 3, 7, 2, 2, 2]
# p delete_nth([2,4,4,4,5,4,5,4,6,4,6,3,4,3,4], 2) #== [2,4,4,5,5,6,6,3,3]

######################live coding with Will 2/2
=begin
9.Typoglycemia Generator
Requirement
return a string where:
1) the first and last characters remain in original place for each word
2) characters between the first and last characters must be sorted alphabetically
3) punctuation should remain at the same place as it started, for example: shan't -> sahn't
Assumptions
1) words are seperated by single spaces
2) only spaces separate words, special characters do not, for example: tik-tak -> tai-ktk
3) special characters do not take the position of the non special characters, for example: -dcba -> -dbca
4) for this kata puctuation is limited to 4 characters: hyphen(-), apostrophe('), comma(,) and period(.)
5) ignore capitalisation
for reference: http://en.wikipedia.org/wiki/Typoglycemia
  =end
  =begin
  PROBLEM
  input: a string with at least one word
  output: a string with the word(s) changed according to a bunch of rules

  explicit rules:
  words are sep by spaces, not punctuation
  first and last letter of each word stay the same
  other letters inside the word sorted by alpha
  punctuation stays the same location
  special characters do not take the place of first or last letter

  implicit rules: ok

  Questions? ok

  mental model:
  split into an Array
  each with index
  hash for punctuation and indeces?

  EXAMPLES ok

  DATA / ALGORITHM
  # arrays - one for the whole String, one for each word

helper method to handle letters: take string, keep first and last, sort the
middle letters

  # for each punctuation in the word, store the index as key, char as value
  init first to array[0]
  init last to array [-1]

  iterate with EWI
  for each word in the array that reps the string of words
    #map!, for each character in each word
      if the index is equal to any key values, (character is a punctuation), store the value for that hash key
      if the character is middle chars, replace with the next consecutive char from the sorted character array
      if the middle-subarray is empty, shovel in the last character
      end
      join the returned Array
      join the whole array
  CODE
=end

def punctuation_hash(str)
  hash = {}
  str.chars.each_with_index do |c,i|
    if c =~ /[^\w]/
      hash[i] = c
    end
  end
  hash
end
# p punctuation_hash("-hey-that's")

def letters(str)
  letters = str.chars.delete_if { |c| c =~ /[^\w]/ }
  first = letters.shift
  last = letters.pop
  letters.sort!
  letters.unshift(first).append(last)
  letters
end

# letters("ajjkjkjkdlflq")

def scramble_singular(str)
  hash = punctuation_hash(str)
  letters = letters(str)
  output_array = []
  str.chars.each_with_index do |character, i|
    if hash.key?(i)
      output_array << hash[i]
    else
      output_array << letters.shift
    end
  end
  output_array.join
end

# p scramble_singular("-hey-that's")

def scramble_words(string)
  if string.chars.include?(' ')
    words = string.split
    words.map! do |word|
      scramble_singular(word)
    end
    return words.join(' ')
  else
    scramble_singular(string)
  end
end

# p "scramble_words"
# p scramble_words('professionals') == 'paefilnoorsss'
# p scramble_words('i') == 'i'
# p scramble_words('') == ''
# p scramble_words('me') == 'me'
# p scramble_words('you') == 'you'
# p scramble_words('card-carrying') == 'caac-dinrrryg'
# p scramble_words("shan't") == "sahn't"
# p scramble_words('-dcba') == '-dbca'
# p scramble_words('dcba.') == 'dbca.'
# p scramble_words('greetings, what are the needs, love?')

=begin

Alphabet symmetry

Consider the word "abode". We can see that the letter a is in position 1
and b is in position 2. In the alphabet, a and b are also in positions 1 and 2.
Notice also that d and e in abode occupy the positions they would occupy in
the alphabet, which are positions 4 and 5.


Given an array of words, return an array of the number of letters that occupy
 their positions in the alphabet for each word. For example,


solve(["abode","ABc","xyzD"]) = [4, 3, 1]

See test cases for more examples.


Input will consist of alphabet characters, both uppercase and lowercase. No
spaces.


Good luck!


If you like this Kata, please try:


Last digit symmetry


Alternate capitalization


=end
def solve(array)

end
p "solve tests"
p solve(["abode","ABc","xyzD"]) == [4,3,1]

p solve(["abide","ABc","xyz"]) == [4,3,0]

p solve(["IAMDEFANDJKL","thedefgh","xyzDEFghijabc"])== [6,5,7]

p solve(["encode","abc","xyzD","ABmD"]) == [1, 3, 1, 3]



=begin
Coding with Caleb 2023/1/31
You've just discovered a square (NxN) field and you notice a warning sign. The sign states that there's a treasure chest in the 2D grid-like field in front of you.

Write a function mineLocation/MineLocation that accepts a 2D array, and returns the location of the mine. The mine is represented as the integer 1 in the 2D array. Areas in the 2D array that are not the mine will be represented as 0s.

The location returned should be an array (Tuple<int, int> in C#) where the first element is the row index, and the second element is the column index of the bomb location (both should be 0 based). All 2D arrays passed into your function will be square (NxN), and there will only be one mine in the array.

PROBLEM

input: a 2d array that represents a feild with a treasure chest
output: [a,b] where a is the row index and b is the column index of TC

explicit rules: one TC
all square array input
return the location row x column

implicit rules: ok

Questions: ok

Mental Model:
each w index seems useful
iterate to find the subarray that includes the chest
iterate through that subarray to find the element index location of the chest
store each value in the location array, return the location array

EXAMPLES

DATA / ALGORITHM
arrays

init location_array
iterate through original array and check which subarray includes a 1
store the index value of that subarray in the location Array
  iterate through the sub array to find the index value of the element 1
  store that value in the location array, return the location Array


for each subarray in array:
  check if the subarray includes 1, if so, store that index value in the location_array
  within that Array
    find the index of the element 1, store that
  return the location_array


CODE
=end

def mineLocation(array)
  location_array = []
  array.each_with_index do |sub, index|
    if sub.include?(1)
      location_array << index
      location_array << sub.index(1)
      return location_array
    end
  end
end

# 18 min
# keep up the talk then type; makes it better communication
# try the algorithm style of starting each explanation of an iteration with the phrase "for each ___ in ____" and then indent to describe what happens on each iteration.


# p mineLocation( [ [1, 0, 0], [0, 0, 0], [0, 0, 0] ] ) == [0, 0]
# p mineLocation( [ [0, 0, 0], [0, 1, 0], [0, 0, 0] ] ) == [1, 1]
# p mineLocation( [ [0, 0, 0], [0, 0, 0], [0, 1, 0] ] ) == [2, 1]
# p mineLocation([ [1, 0], [0, 0] ]) == [0, 0]
# p mineLocation([ [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 1, 0], [0, 0, 0, 0] ]) == [2, 2]

# From Chris Shieh 1/31/2023
# if I finish this, can I write a version that checks for down then up
# have one method that check for both conditions, returns true if either up
# then down, or down then up is true a spiral array is an array that goes up
# in value and down, write a method that tests an array to see if it is a spiral

# An array of integers is a SPIRAL if the integers increase to a single max
# value, and then decreases down from there. Write a method that returns
# true if an array is a spiral, else return false.

=begin
PROBLEM
input: array of integers
output: boolean

explicit rules: if each consecutive number, up the max, is increasing, and
then each number after the max decreases, output true, otherwise output false

implicit rules: numbers can have gaps between them of different sizes
nums are non-negative

Questions?

MM: each with a return statement for returning false
double boolean, on left of max, less than max and greater than previous,
inverse other side of max


EXAMPLES

DATA / ALGORITHM
# init max variable, store the max of the array
# check if max occurs twice, if so, return false
# init max index variable and store index value
for each value in the array,
  if index is less than max index and value is greater than previous element
    next
  elsif index is greater than max index and value is less than previous
    next
  else
    return false
end
true


CODE
=end
def spiral(array)
  max = array.max
  return false if array.count(max) > 1
  max_index = array.index(max)
  array.each_with_index do |n, i|
    next if i < max_index && n < array[i+1]
    next if n == max
    return true if i == (array.size - 1)
    next if i > max_index && n > array[i+1]
    return false
  end
end

p "-------sprial tests"
p spiral([1,2,4,3,2,1]) == true
p spiral([1,2,4,6,4,2,1]) == true
p spiral([0,3,5,4,3,2,1]) == true
p spiral([0,3,5,5,4,3,2,1]) == false
p spiral([1,2,4,6,4,2,4]) == false
p spiral([1,5,4,6,4,2,4]) == false
# verbalize expectation of a test before running the test

#Feedback for Rosa 3/10
# super thorough PEDAC, loading the problem into your brain.
# Started writing the algorithm around 5.5 minutes
# masterful testing, IRB first, and testing at each possible/

=begin
12. Detect Pangram
(https://www.codewars.com/kata/545cedaa9943f7fe7b000048/train/ruby)
6 kyu
A pangram is a sentence that contains every single letter of the alphabet at least once. For example, the sentence "The
quick brown fox jumps over the lazy dog" is a pangram, because it uses the letters A-Z at least once (case is irrelevant).
  Given a string, detect whether or not it is a pangram. Return True if it is, False if not. Ignore numbers and punctuation.
=end
def panagram?(string)
  ('a'..'z').to_a.each do |letter|
    if string.downcase.include?(letter)
      next
    else
      return false
    end
  end
  true
end

# p "panagram? tests"
# p panagram?("The quick brown fox jumps over the lazy dog.") == true
# p panagram?("This is not a pangram.") == false

=begin
13. kebabs
6 kyu
Modify the kebabize function so that it converts a camel case string into a
kebab case.
  kebabize('camelsHaveThreeHumps') // camels-have-three-humps
kebabize('camelsHave3Humps') // camels-have-humps
Notes:
  the returned string should only contain lowercase letters

PROBLEM

input: camelcase string
output:kebab case string

explicit rules: returned strings have only lowercase letters
implicit rules: rather than spaces separating

Questions:

Mental Model:
for each letter, if it's upcase, insert a dash before
downcase the whole string

EXAMPLES

DATA / ALGORITHM
arrays
init new string
for each character in the string
  if the char is upcase
    insert a dash before that character,
    then add the charcter
  else
    add the character
  end
return the downcased string

CODE
=end

def kebabize(string)
  kebab = ""
  string = string.chars.delete_if{ |l| l =~ /[^a-zA-Z]/}.join
  string.chars.each_with_index do |letter, i|
    if letter == letter.upcase
      kebab << "-"
      kebab << letter
    elsif letter == letter.downcase
      kebab << letter
    else
      next
    end
  end
  kebab.downcase!
end
# p "kebabs, boys"
# p kebabize('myCamelCasedString') == 'my-camel-cased-string'
# p kebabize('myCamelHas3Humps') == 'my-camel-has-humps'

=begin
Input

The input consists of a single non-empty string, consisting only of uppercase English letters, the string's length doesn't exceed 200 characters


Output

Return the words of the initial song that Polycarpus used to make a dubsteb remix. Separate the words with a space.


  Examples

song_decoder("WUBWEWUBAREWUBWUBTHEWUBCHAMPIONSWUBMYWUBFRIENDWUB")  =>  WE ARE THE CHAMPIONS MY FRIEND
PROBLEM

input: string with lots of "WUB"s
output: the words that are sneeked in between the WUBs

explicit rules: potential wubs before first word, after last word
always at least one wub between words
implicit rules: infinite wubs possible

Questions: ok

Mental Model:
delete WUB until nonWUB exists, put in a space
maybe an until loop
check if next three letters is WUB, if not, shovel letter, repeat

EXAMPLES

DATA / ALGORITHM
helper method for "check next three letters?"
input string
are the first three letters WUB?
return boolean

until index checks the last letter, start index at 0, check 3,
if true, add three to index
if false,
  string holder = ""
  until check 3 true,
    shovel letter to string holder
    increment index 1
  shovel string to words

if the last three is WUB, skip to join
if the last
join words with ' ' at the end
=end

def wub?(string, index)
  string[index,3] == "WUB"
end

def song_decoder_a(string)
  index = 0
  words = []
  until index > (string.size - 1)
    if wub?(string, index)
      index += 3
    else
      string_holder = ""
      until wub?(string, index) || (index > string.size - 1)
        string_holder << string[index]
        index += 1
      end
      words << string_holder
    end
  end
  words.join(' ')
end

=begin
start with index set to the third to last index value (positive)
for (i=word.len-3, i--, i>=0)
  check for wub?
    if so, replace it with a space
    and decrement index by 2 extra
for (i=word.len-1, i--, i>=0)
  check for "  "
    if so, replace it with a space
=end
def song_decoder(string)
  string.gsub(/(WUB)+/, ' ').strip
end


def song_decoderb(string)
  string.gsub!("WUB", " ")
  while string.length != string.gsub("  ", " ").length
    string.gsub!("  ", " ")
  end
  string.strip
end


# implement with a separate while loop
# index = (string.length - 2)
# while index >= 0
#   if string[index, 2] == "  " #double space
#     string[index, 2] = " " #single space
#   elsif string[index, 2] == "\t\t"
#     string[index, 2] = "\t"
#   end
#   index -= 1 #invariant
# end

# p "song decoder"
# p song_decoder("AWUBBWUBCASDF") #== "A B CASDF"
#
# p song_decoder("AWUBWUBWUBBWUBWUBWUBCWUBWUBWUB") #== "A B C"
#
# p song_decoder("WUBAWUBBWUBCWUB") #== "A B C"
# p song_decoder("WUBHOWWUBUBIQUITINWUB") #== 'HOW UBIQUITIN'

# 48 min damn
# I put == instead of >= or > for the two until loop conditions
# I don't really like using until loops, but I couldn't see another way

=begin
6 kyu

Given: an array containing hashes of names
Return: a string formatted as a list of names separated by commas except for
the last two names, which should be separated by an ampersand.

=begin
PROBLEM

input: array of hashes with :name as key and value as different names
output: string with a list as you might read

explicit rules: for multiple names, the & always goes before the last name,
and commas between the other names
single names no punctuation
implicit rules: the hash key is always :name

Questions:

Mental Model:
pull the name values into an array
if one, return the name
if two, return name & name
if three +, return name plus comma and space, with & after second to last name

EXAMPLES - ok

DATA / ALGORITHM
arrays
keys
if three+
  if index == -1
    << name
  elsif index == -2
    << name + " & "
  else
    string holds name + ", "
return string
CODE
=end

def list(array)
  return "" if array.empty?
  names = []
  array.each do |hash|
    names << hash[:name]
  end

  case names.size
  when 1
    return names[0]
  when 2
    return "#{names[0]} & #{names[1]}"
  else
    string = ""
    names.each_with_index do |name, i|
      if i <= (names.size - 3)
        string += name
        string += ", "
      end
    end
    string <<  "#{names[-2]} & #{names[-1]}"
  end
  string
end

# p list([ {name: 'Bart'}, {name: 'Lisa'}, {name: 'Maggie'}, {name: "Olie"}])
# #== 'Bart, Lisa & Maggie'
#
# p list([ {name: 'Bart'}, {name: 'Lisa'} ])
# # returns 'Bart & Lisa'
#
# p list([ {name: 'Bart'} ])
# # returns 'Bart'
#
# p list([])
# returns ''
# 25 min, surprisingly hard
# I feel very confident that there's a better way to do what I did
# putting the last two conditions first, then the comma thing, build from front
# it works, though.

=begin
15. Take a Ten Minute Walk
(https://www.codewars.com/kata/54da539698b8a2ad76000228/train/ruby)

6 kyu

You live in the city of Cartesia where all roads are laid out in a perfect grid. You arrived ten minutes too early to an appointment, so you decided to take the opportunity to go for a short walk. The city provides its citizens with a Walk Generating App on their phones -- everytime you press the button it sends you an array of one-letter strings representing directions to walk (eg. ['n', 's', 'w', 'e']). You always walk only a single block in a direction and you know it takes you one minute to traverse one city block, so create a function that will return true if the walk the app gives you will take you exactly ten minutes (you don't want to be early or late!) and will, of course, return you to your starting point. Return false otherwise.


Note: you will always receive a valid array containing a random assortment of direction letters ('n', 's', 'e', or 'w' only). It will never give you an empty array (that's not a walk, that's standing still!).

=end

# p is_valid_walk(['n','s','n','s','n','s','n','s','n','s']) == true
#
# p is_valid_walk(['w','e','w','e','w','e','w','e','w','e','w','e']) == false
#
# p is_valid_walk(['w']) == false
#
# p is_valid_walk(['n','n','n','s','n','s','n','s','n','s']) == false

=begin
In this simple Kata your task is to create a function that turns a string into a Mexican Wave. You will be passed a string and you must return that string in an array where an uppercase letter is a person standing up.
Rules
1. The input string will always be lower case but may be empty.
2. If the character in the string is whitespace then pass over it as if it was an empty seat.
PROBLEM

input: string
output: an array of strings

explicit rules:
string input is all lowercase or empty
each individual letter must be capitalized in each occurance of the string within the Array, start at the left and move right
implicit rules: array size = string length

Questions: ok

Mental Model:
upcase version of the String
check character, if space, skip, otherwise replace

EXAMPLES

DATA / ALGORITHM
strings, arrays

initialize an output array
# array for the characters of the string
# for each_with_index character in the array,
#   if the character is a space,
#     skip it
  else (if the character is a letter)
    (upcase the letter within the original string)
    LV = clone the string
    LV = string with the indexed character replaced by the upcased letter
    append the entire modified string as an entry into the output array
  end
end

CODE
=end
def wave(string)
  # output = []
  string.chars.map.with_index do |letter, index|
    if letter == " "
      next
    else
      string[0...index] + string[index].upcase + string[(index + 1)..-1]
      # wave_word = string.clone
      # wave_word[index] = letter.upcase
      # output << wave_word
    end
  end.compact
  # output
end

# 22 min

# p wave("hello") == ["Hello", "hEllo", "heLlo", "helLo", "hellO"]
# p wave("codewars") == ["Codewars", "cOdewars", "coDewars", "codEwars", "codeWars", "codewArs", "codewaRs", "codewarS"]
# p wave("") == []
# p wave("two words") == ["Two words", "tWo words", "twO words", "two Words", "two wOrds", "two woRds", "two worDs", "two wordS"]
# p wave(" gap ") == [" Gap ", " gAp ", " gaP "]

def letter_count(string)
  hash = string.chars.tally
  new_hash = {}
  hash.each do |k, v|
    new_hash[k.to_sym] = v
  end
  new_hash
end

# p letter_count('codewars') == {:a=>1, :c=>1, :d=>1, :e=>1, :o=>1, :r=>1, :s=>1, :w=>1}
# p letter_count('activity') == {:a=>1, :c=>1, :i=>2, :t=>2, :v=>1, :y=>1}
# p letter_count('arithmetics') == {:a=>1, :c=>1, :e=>1, :h=>1, :i=>2, :m=>1, :r=>1, :s=>1, :t=>2}

=begin
Legend:
  -Uppercase letters stands for mothers, lowercase stand for their children, i.e. "A" mother's children are "aaaa".
-Function input: String contains only letters, uppercase letters are unique.
Task:
Place all people in alphabetical order where Mothers are followed by their children, i.e. "aAbaBb" => "AaaBbb".

PROBLEM

input: string (mixed up)
output: string in alpha order

explicit rules: mother follwed by children AaaaDdddGgggggggg in return String
only one parent (unique upcase)

implicit rules: ok

Questions: ok

Mental Model:
sort would give upcase first then lowercase
figure out a way to have the first of a letter upcased


EXAMPLES

DATA / ALGORITHM
array

init an array of the unique letters
down case the String and sort it
#each iterate through the unique letters, and for each character,
  use #sub to upcase the first occurance of each unique letter
return modified string
CODE
=end

def find_children(string)
  uniqs = string.downcase.chars.uniq
  new_string = string.downcase.chars.sort.join
  uniqs.each do |letter|
    new_string.sub!(letter, letter.upcase)
  end
  new_string
end
# 12 min

# p find_children("abBA") == "AaBb"
# p find_children("AaaaaZazzz") == "AaaaaaZzzz"
# p find_children("CbcBcbaA") == "AaBbbCcc"
# p find_children("xXfuUuuF") == "FfUuuuXx"
# p find_children("") == ""

=begin
Write a method that takes a string as an argument and groups the number of times each character appears in the string as a hash sorted by the highest number of occurrences.

The characters should be sorted alphabetically e.g:

get_char_count("cba") => {1=>["a", "b", "c"]}
You should ignore spaces, special characters and count uppercase letters as lowercase ones.
PROBLEM

input: string
output: hash,

explicit rules: keys are # of occurances, values are corresponding letters in alpha order
ignore upcase, special, space
implicit rules: numbers included

Questions: ok

Mental Model:
sort the string first
use #tally to get the (inverse) hash
for each value in the hash, populate the array of values in the return hash


EXAMPLES

DATA / ALGORITHM
hash from tally, new hash, and Array of values?

old algo
# downcase and Sort the string
# use #tally to get the (inverse) hash
# get the values array, uniq and sort and reverse it
store all the letters that occur the same # of times
For each value in the values Array (highest numbers first)
  if the character is a word character and if the value from the tally_hash is equal to the value of the values Array
    store that key from the tally_hash as the value of the new hash

NEW algo
downcase and Sort the string

(store all the letters that occur the same # of times)
For each char in the String
  if the char is a letter, store the count of the letter as the key, and append the letter to the value array for that key

CODE
=end

def get_char_count(string)
  array = string.downcase.chars.sort
  count_hash = Hash.new([])
  array.uniq.each do |char|
    if char =~ /[a-zA-Z0-9]/
      count_hash[array.count(char)] += [char]
    end
  end
  count_hash
end

# 44 min.
# f***ed around with #tally for a while, because it has a similar structure.
# after 27 min bailed on tally, and just went directly for building the hash
# from the ground up.
# Using Hash.new with an default value of [] really helped. Took a LONG time
# to remember that I needed to use += ["string"] to add a value to an array.
# oy vey.

# p "GCC"
# p get_char_count("Mississippi") == {4=>["i", "s"], 2=>["p"], 1=>["m"]}
# p get_char_count("Hello. Hello? HELLO!!") == {6=>["l"], 3=>["e", "h", "o"]}
# p get_char_count("aaa...bb...c!") == {3=>["a"], 2=>["b"], 1=>["c"]}
# p get_char_count("aaabbbccc") == {3=>["a", "b", "c"]}
# p get_char_count("abc123") == {1=>["1", "2", "3", "a", "b", "c"]}

=begin
For a given nonempty string s find a minimum substring t and the maximum
number k, such that the entire string s is equal to t repeated k times. The
input string consists of lowercase latin letters. Your function should
return a tuple (in Python) (t, k) or an array (in Ruby and JavaScript) [t, k]

PROBLEM

input: string of lowercase letters
output: 2-element array [t,k]

explicit rules: t is the smallest string that is repeated k times in the
string in order to reproduce the entire string
lowercase only

implicit rules:

Questions:

Mental Model:
only sublengths that are factors of the length need be checked
hidden math here; don't need to count occurances, it will always occur
length/sublength times WOW

init sublength to 1
gsub the substring of sublength, replace with '', if the string is empty,
return the [sub, the length/sublength]


grab a substring, (using each_cons?)
start at end and slice a substring, check if the substring is included elsewhere
if so, start subbing out the substring, adding to a counter, the string has
to be completely empty at the end, return the array with substring and counter


EXAMPLES

DATA / ALGORITHM
strings and arrays

sublength = 1
gsub the substring of sublength, replace with '', if the string is empty,
return the [sub, the length/sublength]
if not empty, increment sublength


CODE
=end
def f(string)
  sublength = 1
  while sublength < string.length
    subbed = string.gsub(string[0, sublength], '')
    return [string[0, sublength], string.length/sublength] if subbed.empty?
    sublength += 1
  end
  [string, 1]
end

# p f("ababab") #== ["ab", 3]
# p f("abcde") #== ["abcde", 1]
# p f("")

=begin
Write a function that takes in a string of one or more words, and returns the same string, but with all five or more letter words reversed (Just like the name of this Kata).
Strings passed in will consist of only letters and spaces.
Spaces will be included only when more than one word is present.
Examples: spinWords( "Hey fellow warriors" ) => returns "Hey wollef sroirraw"

PROBLEM

input: string
output: mutated same string

explicit rules: words with 5+ characters are reversed in the mutated string
only letters and spaces
implicit rules: ok

Questions: mutate? doesn't matter
should capital letters be preserved or should the first letter of a sentance always be capped?

Mental Model:
split the string into an Array
map the array, if a string is 5+, reverse it
join the array

EXAMPLES

DATA / ALGORITHM
arrays

# split the string into an array of words
map the array to a new array, for each word in the Array
  if the length of the word is 5+
    reverse the word
  else
    word

join the array witha space

CODE
=end
def spinWords(string)
  array = string.split
  array.map! do |word|
    if word.length >= 5
      word.reverse
    else
      word
    end
  end
  array.join(' ')
end

# p spinWords("Hey fellow warriors") == "Hey wollef sroirraw"
# p spinWords("This is a test") == "This is a test"
# p spinWords("This is another test") == "This is rehtona test"

=begin
Your local bank has decided to upgrade its ATM machines by incorporating motion sensor technology. The machines now interpret a series of consecutive dance moves in place of a PIN number.

Create a function that converts a customer's PIN number to its dance equivalent. There is one dance move per digit in the PIN number. An array of dance moves is given in the code.

Examples
dance_convert("0000") ➞ ["Shimmy", "Shake", "Pirouette", "Slide"]

dance_convert("3856") ➞ [ "Slide", "Arabesque", "Pop", "Arabesque" ]

dance_convert("9999") ➞ [ "Arabesque", "Shimmy", "Shake", "Pirouette" ]

dance_convert("32a1") ➞ "Invalid input."

Notes
Each dance move will be selected from an array by index based on the current digit's value plus that digit's index value. If this value is greater than the last index value of the dance array, it should cycle to the beginning of the array.
Valid input will always be a string of four digits. Output will be an array of strings.
If the input is not four valid integers, return the string, "Invalid input."

PROBLEM

input: a string of 4 digits
output: an array of four dance moves

explicit rules: dance move index is equal to the value of the digit plus its index in the string array
overflow with mod based 10
implicit rules: can have repeated dance moves (since the dance moves is a constant)

Questions: ok

Mental Model:
get the digitis as integers
do some arithmetic with the value and the index
shovel the corresponding dance move into the return array

EXAMPLES ok

DATA / ALGORITHM

return "invalid" if not valid (==)
# init new_pin
# digit array from the string, transform to integers
for each integer with its index in the digit array
  # corr_index = add the integer value with its index value
  new_pin << the correspong dance move mod 10 of corr_index
new_pin

CODE
=end

def dance_convert(string)
  return "Invalid input." if string.chars.map{ |x| x.to_i}.join != string
  # use #all? with a block, pass it check for integer
  pin = string.chars.map {|x| x.to_i}
  new_pin = []
  pin.each_with_index do |digit, index|
    corr_index = digit + index
    new_pin << MOVES[corr_index % 10]
  end
  new_pin
end

MOVES = ["Shimmy", "Shake", "Pirouette", "Slide", "Box Step", "Headspin", "Dosado", "Pop", "Lock", "Arabesque"]

# p dance_convert("0000") == ["Shimmy", "Shake", "Pirouette", "Slide"]
# p dance_convert("3856") == [ "Slide", "Arabesque", "Pop", "Arabesque" ]
# p dance_convert("9999") == [ "Arabesque", "Shimmy", "Shake", "Pirouette" ]
# p dance_convert("32a1") == "Invalid input."

=begin
// //
// 14. Longest Common Prefix

// Write a function to find the longest common prefix string amongst an array of strings.

  // If there is no common prefix, return an empty string "".

  // //

/*
problem takewsw an array of strings as an argument, and returns a single string. the return value is the longest shared leading substring that is common to every string in the input array.
if there is no shared leading substring, return an empty string.

data structure
inpuit array output string. iteration
algo ===>
1) declare a result variable init to the [];
2) declare a first variable and init to the value of first element of input array
--------- iterate over the first variable
-------------declare a sub variable and initiliZe to the value of a slice of the substring. starting from 0 index, incrementing the ending index by one each iteration.
--------------------check if every word in the input array starts with this sub , if so it will go into the result variable
3) sort the result variable in descending order.
4)  return the first element from the result variablle
*/
function f (arr) {
  let result = [];
  let first = arr[0];
  for (let i = 0; i <= first.length; i++) {
    let prefix = first.slice(0, i);
  if (arr.every(word => word.startsWith(prefix))) {
    result.push(prefix);
  }
  }
  result.sort((a, b)=> b.length - a.length);
  return result[0]
  }
  console.log(f(["flower","flow","flight"]))//"fl"
console.log(f(["flower","flow","light"]))//""
  console.log(f(["flower","flow","fight"]))//"f"
console.log(f(["dog","racecar","car"]))// ""
=end

=begin
# my algo
# if all the values don't sum >= target, #   return 0

# init mins array
# for each value with index in the array
#   slice the array from index to the end, and from this sliced array
#   sum = first element
  increment sum with the next value
    check the sum,
      if the sum >= target
        put the index in the mins array
        move to next iteration
      if the sum isn't bigger,
                       keep going (add next value)
return mins.min

algo for helper method:
given an array and the target, return the min length starting from the
beginning that sums to target
init sum
for each with index value in the array
  inrement sum
  if sum >= target
    return (index + 1)
=end

def min_length_sum(array, target)
  sum = 0
  array.each_with_index do |value, index|
    sum += value
    return (index + 1) if sum >= target
  end
  nil
end

def minSubLength(array, target)
  return 0 if array.sum < target

  mins_array = []
  array.each_with_index do |value, index|
    work = array[index..-1]
    minimum = min_length_sum(work, target)
    mins_array += [minimum] if minimum != nil
  end
  mins_array.min
end
#
# [2, 3, 1, 2, 4, 3].each_cons(n) do |value|
#   p value
# end
# p "minSubLength"
# p minSubLength([4, 3, 1, 2, 2, 1], 7) == 2
# p minSubLength([1, 10, 5, 2, 7], 9) == 1
# p minSubLength([1, 11, 100, 1, 0, 200, 3, 2, 1, 250], 280) == 4
# p minSubLength([1, 2, 4], 8) == 0

=begin
Common Mistakes
- Not enough time spent parsing the problem
- Fuzzy algorithm
- Lack of flexibility
- Lack of syntax fluency
=end

=begin (that one guy's solution )
# Algorithm:
define `minSubLength` method with two paramter `array` and `target`
return `0` if `array`` sum is less than `target`
  initialize `subarrays` array to contain valid subarrays
  create all subarrays
    return subarray to `subarrays` if subarray sum is greater than or equal to `target`
  sort subarrays by size of sub array # step isn't needed if returning min
  return size of min subarray
  end

# Code:

def minSubLength(array, target)
  return 0 if array.sum < target
  subarrays = []
  (0...array.length).each do |index|
    (1..(array.length - index)).each do |length|
      subarrays << array[index, length] unless array[index, length].sum < target
    end
  end

  subarrays.min_by {|arr| arr.size}.size

end
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