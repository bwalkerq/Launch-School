# frozen_string_literal: true

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

# 6 Reverse It (Part 2)
def reverse_words(string)
  string
end
