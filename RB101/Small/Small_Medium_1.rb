# def rotate_array(array)
#   modified_array = array.clone
#   a = modified_array.shift
#   modified_array << a
#   modified_array
# end

# 4 min

def rotate_array(array)
  array[1..-1] + [array[0]]
end

def rotate_string(string)
  rotate_array(string.chars).join
end

def rotate_integer(integer)
  rotate_array(integer.to_s.chars).join.to_i
end

p rotate_array([7, 3, 5, 2, 9, 1]) == [3, 5, 2, 9, 1, 7]
p rotate_array(['a', 'b', 'c']) == ['b', 'c', 'a']
p rotate_array(['a']) == ['a']

x = [1, 2, 3, 4]
p rotate_array(x) == [2, 3, 4, 1]   # => true
p x == [1, 2, 3, 4]                 # => true

p rotate_string "what's going on"
p rotate_integer 12345

def rotate_rightmost_digits(integer, n)
  string = integer.to_s
  rotated = string[-n, n]
  new = rotate_string(rotated)
  string[-n, n] = new
  string.to_i
end

# 13 min

# Holy hell, I think the documentation has an error, or I'm looking at the wrong documentation
# (different version?) I just checked and it doesn't work on 3.1.2 or 2.6.7. The doc's clearly say
# that #slice for a string: "Counts backward from the end of `self` if `start` is negative" for
# the two arguments (start, length)
# but what it *actually* does is starts from the negative index and counts FORWARDS for the length
# that made this problem very difficult to figure out.

def also_rotate_rightmost(integer, n)
  digits = integer.to_s.chars
  digits[-n..-1] = rotate_array(digits[-n..-1])
  digits.join.to_i
end
p "new test rightmost"
p also_rotate_rightmost(735291, 1) == 735291
p also_rotate_rightmost(735291, 2) == 735219
p also_rotate_rightmost(735291, 3) == 735912
p also_rotate_rightmost(735291, 4) == 732915
p also_rotate_rightmost(735291, 5) == 752913
p also_rotate_rightmost(735291, 6) == 352917


def max_rotation(integer)
  # num = integer # I learned this was totally unnecessary
  # integer.to_s.length.times do |index|
  #   num = also_rotate_rightmost(num, integer.to_s.length - index)
  # end
  digits_length = integer.to_s.size
  digits_length.downto(2) do |n|
    integer = also_rotate_rightmost(integer, n)
  end
  integer
end
# 15 min to complete the problem
# + 20 min of reflecting and writing (!)


# I think I learned from this exercise that
# a parameter is essentially a local variable; I had originally transferred the value
# of the argument passed into the method to a local variable (`num`, in the first line of the method)
# but now I see that the parameter itself functions as a local variable --- I had a
# misunderstanding related to this (which is related to PBR vs PBV (ooo, potential mnemonic
# opportunity related to my fave hipster beer!)) in the 21-game application for the
# adjust_score method; those score variables being passed into the method were referencing
# immutable objects (numbers), so I had to update the value referenced by those variables and then
# reassign the variables outside of the method by returning *both* of the updated values at the
# end of the method.
# Similarly, in this problem I am reassigning the variable/parameter `integer` multiple times within the method, and
# then returning that value (which I could, if I wanted, reassign to, say, an original variable outside the method, like the
# 21-game)


p 1234.to_s.size
# I learned that Integer#length is not a thing! gotta change to string first.

p max_rotation(735291) == 321579
p max_rotation(3) == 3
p max_rotation(35) == 53
p max_rotation(105) == 15 # the leading zero gets dropped
p max_rotation(8_703_529_146) == 7_321_609_845

# 1000 lights

# input: n, representing the length of the array (the number of switches), which is also the number
# of passes
# output: an array that represents the lights that are on at the end of n passes.

# data structures: an array could hold the numbers, a hash could hold the numbers as keys and the values
# could be true (on) and false (off)
# [I don't know a way to toggle booleans...actually! maybe just the ! operator]

# algorithm
# create a hash with n entries, the numbers 1 - n as keys, and all values as false
# iterate through the numbers 1 - n for each pass, where the keys that are multiples of n
# (i.e. 0 mod n) get their values switched (or negated)
# [I could also do values of 1 and -1 and just multiply by -1 each time...]
# after all the passes, iterate through (#select?) the keys/values and any value that is true
# store that key in an array.
# return the array

#8 min

def switch_pass(passes)
  lights_hash = {}
  (1..passes).each do | n |
    lights_hash[n] = -1
  end
  passes.times do | n |
    lights_hash.each do | k, v |
      v*(-1) if k % (n + 1) == 0
    end
  end
  lights_on = lights_hash.select do | k, v |
    v == 1
  end
  lights_on.keys
end

p switch_pass(10)
# 10.times do |n|
#   p switch_pass(n+1)
# end




















