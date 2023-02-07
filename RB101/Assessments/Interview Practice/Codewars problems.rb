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
    if i < max_index && n < array[i+1]
      next
    elsif n == max
      next
    elsif i == (array.size - 1)
      return true
    elsif i > max_index && n > array[i+1]
      next
    else
      return false
    end
  end
end

# p "-------sprial tests"
# p spiral([1,2,3,2,1]) == true
# p spiral([1,2,4,6,4,2,1]) == true
# p spiral([0,3,5,4,3,2,1]) == true
# p spiral([0,3,5,5,4,3,2,1]) == false
# p spiral([1,2,4,6,4,2,4]) == false
# verbalize expectation of a test before running the test

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

p "song decoder"
p song_decoder("AWUBBWUBCASDF") #== "A B CASDF"

p song_decoder("AWUBWUBWUBBWUBWUBWUBCWUBWUBWUB") #== "A B C"

p song_decoder("WUBAWUBBWUBCWUB") #== "A B C"
p song_decoder("WUBHOWWUBUBIQUITINWUB") #== 'HOW UBIQUITIN'

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