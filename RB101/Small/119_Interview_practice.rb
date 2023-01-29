# Given an array of numbers, for each number find out how many numbers
# in the array are smaller than it. When counting numbers, only count
# unique values. That is, if a given number occurs multiple times in
# the array, it should only be counted once.

# Examples:
=begin
PROBLEM

input: an array of numbers
output: a different array of numbers

explicit rules: each element of the output array represents the number of numbers that are less than it
within the original array
count unique values only
implicit rules: output an array

EXAMPLES

DATA / ALGORITHM
gather subset of unique values in arr2
map through the original array, and within that block
reset counter to zero
#each through the array again, adding one to a counter for each value that is less than,
return the counter

CODE
=end

def smaller_numbers_than_current(arr)
  unique_values = arr.uniq
  arr.map do |num|
    counter = 0
    unique_values.each { |x| counter += 1 if x < num }
    counter
  end
end

p smaller_numbers_than_current([8,1,2,2,3]) == [3, 0, 1, 1, 2]
p smaller_numbers_than_current([1,4,6,8,13,2,4,5,4])  == [0, 2, 4, 5, 6, 1, 2, 3, 2]
p smaller_numbers_than_current([7,7,7,7]) == [0,0,0,0]
p smaller_numbers_than_current([6,5,4,8]) == [2, 1, 0, 3]
p smaller_numbers_than_current([1]) == [0]

# Write a method that takes one argument: an array of integers.
# The method should return the minimum sum of 5 consecutive
# numbers in the array. If the array contains fewer than 5
# elements, the method should return nil.

# Examples:


=begin
PROBLEM

input: array of integers
output: nil or integer sum

explicit rules: explicit rules: nil if array size less than 5, otherwise the min sum
of consecutive 5 integers
implicit rules: can't sort the array

EXAMPLES

DATA / ALGORITHM
iterate through the integers up until the 5th to last, and sum that
integer with the next consec 4, can use map for this to collect all the sums, then call
#min on the mapped array to return the desired output

map or perhaps each with index and shovel the value into a collection array
if index is 0 through -5, do the sum
  sum that index plus the elements at index + 1, four times, could increment index
  shovel the sum into collection array
if index is -4 through -1, break (or return nil? (which I hope won't mess up the #min call))
collection.min

CODE
=end
def minimum_sum(array)
  return nil if array.size < 5
  collection = []
  array.each_with_index do |num, i|
    if i < array.size - 4
    sum = num
    4.times do
      i += 1
      sum += array[i]
    end
    collection << sum
    else
      break
    end
  end
  collection.min
end
# 20 min, fuck all ya'll

p "min sum"
p minimum_sum([1, 2, 3, 4]) == nil
p minimum_sum([1, 2, 3, 4, 5, 6]) == 15
p minimum_sum([55, 2, 6, 5, 1, 2, 9, 3, 5, 100]) == 16
p minimum_sum([-1, -5, -3, 0, -1, 2, -4]) == -10

# Write a method named to_weird_case that accepts a string, and
# returns the same sequence of characters with every 2nd character
# in every third word converted to uppercase. Other characters
# should remain the same.

# Examples:

# The tests above should print "true".
=begin
PROBLEM
input: string
output: modified string (could be new object)

explicit rules: every 3rd word has each character that is a multiple of two upcased. other characters
remain the same
implicit rules: every second character means odd index characters
every third word means words at index i+1 % 3 == 0

EXAMPLES
behaves as expected

DATA / ALGORITHM
split into an array
initialize empty new array
iterate the array with map or each with index, that will probably be easier since
I'm referencing indices
if a word is a third word then
  split that word into chars, map!
    how to toggle between even and odd? ternary?
    if character index is odd
    (if word.index(character).odd?)
      upcase!
    else (even index)
      just the character
    end
  join mutated word
  shovel the mutated word to new array
else,
  shovel the word to the new array
join new array

CODE
=end

def to_weird_case(string)
  new_array = []
  words = string.split
  words.each_with_index do |word, index|
    if (index+1) % 3 == 0
      counter = 0
      charachter_array = word.chars.map! do |character|
        if counter.odd?
          counter += 1
          character.upcase!
        else
          counter += 1
          character
        end
      end
      new_array << charachter_array.join
    else
      new_array << word
    end
  end
  new_array.join(' ')
end

p "weird tests"
p to_weird_case('Lorem Ipsum is simply dummy text of the printing') ==
    'Lorem Ipsum iS simply dummy tExT of the pRiNtInG'
p to_weird_case(
    'It is a long established fact that a reader will be distracted') ==
    'It is a long established fAcT that a rEaDeR will be dIsTrAcTeD'
p to_weird_case('aaA bB c') == 'aaA bB c'
p to_weird_case(
    'Miss Mary Poppins word is supercalifragilisticexpialidocious') ==
    'Miss Mary POpPiNs word is sUpErCaLiFrAgIlIsTiCeXpIaLiDoCiOuS'

# Write a method that takes an array of integers and returns the
# two numbers that are closest together in value.
=begin
PROBLEM
input: array of numbers
output: array with two numbers

explicit rules: the return array has the two numbers from the array which have
the smallest mathematical difference
implicit rules: numbers are not nec consecutive
Not sure what to do if there are multiple pairs of numbers, probably just
return the first pair

EXAMPLES
ok

DATA / ALGORITHM
set current smallest difference to the difference between the first two numbers
set mins_array to first two elements
array.each_with_index (iterate through, checking each num with each of the others, so
 nested iteration)
  from the start_index to the final index, |i|
    for each pair, calculate the difference and compare it to current smallest difference
    current_diff = start_num - arr[i] absolute value
    if current diff < smallest diff
      replace the smallest diff
      replace mins_array with mins_array.replace([starting num, arr[i]])
    else
      next
    end
  end
  return mins_array
end

CODE
=end
# Examples:

def closest_numbers(arr)
  smallest_diff = (arr[0] - arr[1]).abs # I forgot abs value for the first difference
  mins_array = [arr[0], arr[1]]
  arr.each_with_index do |start_num, start_i|
    ((start_i+1)...arr.size).each do|i| # here I started at the actual index, so
      # I subtracted the number from itself -- the way around this is either debug this
      # or use pry? or work through the first example
      current_diff = (start_num - arr[i]).abs
      if current_diff < smallest_diff
        smallest_diff = current_diff
        mins_array.replace([start_num, arr[i]])
      else
        next
      end
    end
  end
  mins_array
end

p "fun"
p closest_numbers([5, 25, 15, 11, 20]) == [15, 11]
p closest_numbers([19, 25, 32, 4, 27, 16]) == [25, 27]
p closest_numbers([12, 7, 17]) == [12, 7]

# Write a method that takes a string as an argument and returns
# the character that occurs least often in the given string.
# If there are multiple characters with the equal lowest number
# of occurrences, then return the one that appears first in the
# string. When counting characters, consider the uppercase and
# lowercase version to be the same.

=begin
PROBLEM
input: string with only letters
output: a single string character

explicit rules: the character is returned whose count is highest
if multiple counts are equally highest, return first character with
highest count
implicit rules: ?

Questions?
should i count symbols?

EXAMPLES
other than typo, ok

DATA / ALGORITHM
hash would make sense
initialize hash {}
uniq = break into chars, could make uniq
for each character in uniq, count occurances, store as a hash with letter as k
and the count as value
  uniq.each do
    count = count characters in the string
    hash[letter] = count
  end
collect all values, call max on it to find the max number
  max = hash.values.max
call the hash key with the associated value (will call first since
populated in order)
  hash.key(max)
end


CODE
=end
def least_common_char(string)
  string.downcase!
  hash = {}
  uniqs = string.chars.uniq
  uniqs.each do |letter|
    count = string.count(letter)
    hash[letter] = count
  end
  minimum = hash.values.min
  hash.key(minimum)
end


# Examples:

p least_common_char("Hello World") #== "h"
p least_common_char("Peter Piper picked a peck of pickled peppers") #== "t"
p least_common_char("Mississippi") #== "m"
p least_common_char("Happy birthday!") #== ' '
p least_common_char("aaaaaAAAA") #== 'a'

# The tests above should print "true".
