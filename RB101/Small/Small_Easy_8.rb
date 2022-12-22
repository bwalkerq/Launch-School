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
  initial_substrings = []
  string.length.times do |index|
    initial_substrings << string.slice(index, string.length)
  end
  initial_substrings.each {|substring| result_array += leading_substrings(substring)}
  result_array
end

p substrings('abcde') == [
  'a', 'ab', 'abc', 'abcd', 'abcde',
  'b', 'bc', 'bcd', 'bcde',
  'c', 'cd', 'cde',
  'd', 'de',
  'e'
]

def palindromes(string)
  substrings(string).select do |substring|
    substring == substring.reverse && substring.length > 1
  end
end

p palindromes('abcd') == []
p palindromes('madam') == ['madam', 'ada']
p palindromes('hello-madam-did-madam-goodbye') == [
  'll', '-madam-', '-madam-did-madam-', 'madam', 'madam-did-madam', 'ada',
  'adam-did-mada', 'dam-did-mad', 'am-did-ma', 'm-did-m', '-did-', 'did',
  '-madam-', 'madam', 'ada', 'oo'
]
p palindromes('knitting cassettes') == [
  'nittin', 'itti', 'tt', 'ss', 'settes', 'ette', 'tt'
]

def fizzbuzz(start_num, end_num)
  (start_num..end_num).each do |num|
    if num % 3 == 0 && num % 5 == 0
      puts "FizzBuzz"
    elsif num % 3 == 0
      puts "Fizz"
    elsif num % 5 == 0
      puts "Buzz"
    else
      puts num
    end
  end
end

fizzbuzz(1, 15) # -> 1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz

def repeater(string)
  new_string = []
  string.chars.each do |letter|
    new_string << letter << letter
  end
  new_string.join
end

p repeater('Hello') == "HHeelllloo"
p repeater("Good job!") == "GGoooodd  jjoobb!!"
p repeater('') == ''

def double_consonants (string)
  new_string = string.chars.map do |letter|
    if letter =~ /[a-zA-Z&&[^aeiou]]/
      letter + letter
    else
      letter
    end
  end
  new_string.join
end

p double_consonants('String') == "SSttrrinngg"
p double_consonants("Hello-World!") == "HHellllo-WWorrlldd!"
p double_consonants("July 4th") == "JJullyy 4tthh"
p double_consonants('') == ""

def reversed_number (integer)
  integer.to_s.reverse.to_i
end
# I spent a lot of time looking for a method that stripped leading zeros from a number; I realized (once
# there was no such method in the Integer class) that an integer is never printed with leading zeros anyway.
# so all I did was make sure that whatever number I had at the end was translated back to an integer.

p reversed_number(12345) == 54321
p reversed_number(12213) == 31221
p reversed_number(456) == 654
p reversed_number(12000) == 21 # No leading zeros in return value!
p reversed_number(12003) == 30021
p reversed_number(1) == 1

def center_of(string)
  case string.length.odd?
  when true
    string[string.length/2]
  when false
    string[(string.length/2)-1, 2] # big thing to remember is that the second argument is the LENGTH
    # and not the ending location. I think I've made this mistake before!
  end
end
puts "center_of tests"
p center_of('I love ruby') == 'e'
p center_of('Launch School') == ' '
p center_of('Launch') == 'un'
p center_of('Launchschool') == 'hs'
p center_of('x') == 'x'







































