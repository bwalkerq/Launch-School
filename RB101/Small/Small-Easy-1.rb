# frozen_string_literal: false

def repeat(string, num)
  num.times { puts string }
end

repeat('yo', 2)

# 2
def odd?(num)
  num % 2 == 1 # I originally wrote an if statement; this is more elegant
  # because it returns false automatically with the == operator
end
puts odd?(2)    # => false
puts odd?(5)    # => true
puts odd?(-17)  # => true
puts odd?(-8)   # => false
puts odd?(0)    # => false
puts odd?(7)    # => true

# 3
def digit_list(num)
  array = num.to_s.split('')
  array.map { |x| x.to_i } # WOW note that rubocop tells me to pass &:to_i here
  # I swear that I didn't method hunt here; I remembered
  # these methods from previous exercises
  # However, I originally got a solution that left the elements as strings,
  # rather than numbers. I had to use #map (rather than #each) in order to
  # actually return an array with the elements as numbers
end

p digit_list(234_567_777)

def digit_list_given_solution(number)
  number.to_s.chars.map(&:to_i) # note that this solution uses #chars
  # instead of my #split and the lovely &:to_i intead of my explicit block
  # ruby sugar
end

p digit_list_given_solution(234_567_777)

# 4 How Many?

vehicles = [
  'car', 'car', 'truck', 'car', 'SUV', 'truck',
  'motorcycle', 'motorcycle', 'car', 'truck'
]

def count_occurrences(array)
  # find each unique element (there's a method for this, #uniq)
  # put that in it's own array?
  # use each unique element as a target to count occurances in original array
  # print the targets and their values
  array_targets = array.uniq
  count = 0
  index_of_unique_vehicle = 0
  loop do
    array.each { |element| count += 1 if element == array_targets[index_of_unique_vehicle] }
    puts "#{array_targets[index_of_unique_vehicle]} => #{count}"
    index_of_unique_vehicle += 1
    count = 0
    break if index_of_unique_vehicle == array_targets.length
  end
end

# I know that this is a shit-show, but I really didn't want to method hunt

count_occurrences(vehicles)

# given solution (holy ballz)

def count_occurrences2(array)
  occurrences = {} # creates an empty hash

  array.uniq.each do |element| # iterates over the unique entries of the list
    occurrences[element] = array.count(element) # adds the key and value pair
    # that represents the unique element and the number of times it occurs
  end

  occurrences.each do |element, count| # now that the hash is full, iterates and
    # prints each key value pair with string interpolation. Dang
    puts "#{element} => #{count}"
  end
end
# I thought of doing a key value pair and shied away from it because I hadn't
# done hashes in a minute
# the thing to remember in this case, where I am right now is:
# initiate a hash:
# occurances = {}
# add to a hash:
# occurances[key] = value

# 5 Reverse it (Part 1)
def reverse_sentence(string)
  string.split(' ').reverse.join(' ') # I didn't method hunt; I started this 
  # yesterday and left it and in an assignment I came across #join
  # I had known about #split and #reverse already
end

puts reverse_sentence('Hello World') == 'World Hello'
puts reverse_sentence('Reverse these words') == 'words these Reverse'
puts reverse_sentence('') == ''
puts reverse_sentence('    ') == '' # Any number of spaces results in ''

puts "# 6 Reverse It (Part 2)"
def reverse_words(string)
  array = string.split
  array.each do |word|
    word.reverse! if word.length >= 5
  end
  array.join(' ')
end

puts reverse_words('Professional')          # => lanoisseforP
p reverse_words('Walk around the block') # => Walk dnuora the kcolb
puts reverse_words('Launch School')         # => hcnuaL loohcS

# you're awesome

# 7
def stringy(count, start_at=1)
  output = ""

  count += 1 if start_at == 0 # adds extra digit, to be deleted later for the shift

  until count == 0 do
    output << "1" # remember to push a string, rather than a number
    count -= 1
    break if count == 0
    output << "0"
    count -= 1
  end

  output.slice!(0) if start_at == 0 # deletes extra digit to return proper length
  
  output
end
puts stringy(6,0)
puts stringy(9,0)
puts stringy(4) == '1010'
puts stringy(7) == '1010101'

# You're awesome for figuring out debugger in vs code!
# Their solution
def stringy(size, start_at=1)
  numbers = [] # initiated an empty array, to #join at the end
  
  size += 1 if start_at == 0

  size.times do |index| 
    number = index.even? ? 1 : 0 # very slick use of a ternary
    numbers << number # pushing to the array
  end
  
  numbers.shift if start_at == 0 
  
  numbers.join # joining the array, which returns a string, interesting
end
puts stringy(6,0)
puts stringy(9,0) 
puts stringy(4) == '1010'
puts stringy(7) == '1010101'

# you're awesome for figuring out the bonus on both my solution and theirs
# I wanted a one-if-statement solution, but in both cases I only figured out 
# how to add and extra element (before the do block) and then remove the first
# element after the block
# my first idea of #reverse only worked for odd numbered lengths

puts "# 8 Array Average"
def average(array_of_integers)
  array_of_integers.sum / array_of_integers.size.to_f
end

puts average([1, 6])  # integer division: (1 + 6) / 2 -> 3
puts average([1, 5, 87, 45, 8, 8]) 
puts average([9, 47, 23, 95, 16, 52])

# You're awesome

# 9 
def sum(positive_integer)
  positive_integer.digits.sum
end

puts sum(23) == 5
puts sum(496) == 19
puts sum(123_456_789) == 45

# You're awesome

# their solution:
def sum(number)
  number.to_s.chars.map(&:to_i).reduce(:+)
end
# beautiful for the transforming from integer to string back to integer
# turns number to string
# breaks the string an array of  individual 
# characters (each digit as a string element)
# maps the array, transforming each element into an integer
# #reduce is used to combine each element of an array using a binary operation
# in this case, #+ so that the sum is returned.
# beautiful, but I like mine better. I did method hunt a bit, but only because
# I had encountered a method that referenced each digit before, so I knew it
# already existed. #sum I guessed that it existed, and then checked documentation!

puts "# 10"
def calculate_bonus(salary,boolean)
  return 0 if boolean == false
  salary / 2
end

puts calculate_bonus(2800, true) == 1400
puts calculate_bonus(1000, false) == 0
puts calculate_bonus(50000, true) == 25000

# You're awesome.