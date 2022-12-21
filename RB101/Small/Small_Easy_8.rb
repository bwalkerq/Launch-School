def sum_of_sums(array)
  sum = 0
  array.each_with_index do |number, index|
    sum += number * (array.size - index)
  end
  sum
end

# I know this isn't the most clear way to do this, but I see these repetitive sums as multiplication
# so the first number is multiplied as many times as there are other numbers to be added to, so
# the length of the array, n. Each other number is added n-1 times, subtracting one for each next place
# so using index seemed to make sense to me to keep track of the successively fewer additions

p sum_of_sums([3, 5, 2]) #== (3) + (3 + 5) + (3 + 5 + 2) # -> (21)
p sum_of_sums([1, 5, 7, 3]) == (1) + (1 + 5) + (1 + 5 + 7) + (1 + 5 + 7 + 3) # -> (36)
p sum_of_sums([4]) == 4
p sum_of_sums([1, 2, 3, 4, 5]) == 35



# Enter a noun: dog
# Enter a verb: walk
# Enter an adjective: blue
# Enter an adverb: quickly
#
# Do you walk your blue dog quickly? That's hilarious!
noun = "lady"
verb = "pet"
adjective = "purple"
adverb = "friskily"

output = "Where do you #{verb} your #{adjective} #{noun} #{adverb}?"
p output

def leading_substrings(string)
  array_of_substrings = []
  string.length.times do |index|
    array_of_substrings << string.slice(0, index + 1)
  end
  array_of_substrings
end

p leading_substrings('abc') == ['a', 'ab', 'abc']
p leading_substrings('a') == ['a']
p leading_substrings('xyzzy') == ['x', 'xy', 'xyz', 'xyzz', 'xyzzy']

def substrings(string)
  result_array = []
  initial_subs = []
  string.length.times do |index|
    initial_subs << string.slice(index-1, -1)
  end
  p initial_subs
  result_array = initial_subs.each {|substring| leading_substrings(substring)}
  result_array
end

p substrings('abcde')
# == [
#   'a', 'ab', 'abc', 'abcd', 'abcde',
#   'b', 'bc', 'bcd', 'bcde',
#   'c', 'cd', 'cde',
#   'd', 'de',
#   'e'
# ]