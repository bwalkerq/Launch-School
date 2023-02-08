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

def rotate_array(arr)
  new = arr.clone
  new.append(new.shift)
end

p rotate_array([7, 3, 5, 2, 9, 1]) #== [3, 5, 2, 9, 1, 7]
p rotate_array(['a', 'b', 'c']) == ['b', 'c', 'a']
p rotate_array(['a']) == ['a']

x = [1, 2, 3, 4]
p rotate_array(x) == [2, 3, 4, 1]   # => true
p x == [1, 2, 3, 4]                 # => true

# 3 min

def rotate_rightmost_digits(integer, n)
array = integer.digits.reverse
return rotate_array(array).join.to_i if n == array.size
front = array[0..(array.size - n - 1)] # initialize front array to the first values
back = array[-n..] # initialize back array with the back numbers
back = rotate_array(back) #
array = front + back
array.join.to_i
end

p rotate_rightmost_digits(735291, 3) == 735912
p rotate_rightmost_digits(735291, 1) == 735291
p rotate_rightmost_digits(735291, 2) == 735219
p rotate_rightmost_digits(735291, 4) == 732915
p rotate_rightmost_digits(735291, 5) == 752913
p rotate_rightmost_digits(735291, 6) == 352917

# Notes from Caleb
# rather than say p or puts, say output
# test at each reasonable opportunity (probably more is better)
# think of the interview as a walkthrough
#   related to this idea, when talking through the algorithm, speak/explain a piece of it, bitesize, and then
#   take a moment to type it; don't type and talk out each work as you type
# use the right side console to test anything that I'm not sure about
# rather than saying array equals this, use the language of assignment rather than the name of the operator
# Within PEDAC
#   use mental model section in P for restating the problem, and for considering different methods or roads
#   for the algorithm, drop ideas for methods
# whereas with the algorithm, make that only plain english, and keep code more or less out of it.
# Look up methods called #permutate or #permutations and #each_cons

=begin
PROBLEM

input: integer
output: fully rotated integer

explicit rules: the entire integer is rotated, and then all digits but left-most digit is rotated, then all but
the left-most-two digits, and so on.

implicit rules: drop leading zeros

Questions:


Mental Model:
get an array of the digits
iterate through, rotating from each each digit to the end


EXAMPLES

DATA / ALGORITHM

CODE
=end
max_rotation(735291) == 321579
max_rotation(3) == 3
max_rotation(35) == 53
max_rotation(105) == 15 # the leading zero gets dropped
max_rotation(8_703_529_146) == 7_321_609_845




def delete_nth(array, n)
  output_array = []
  u_array = array.uniq
  u_array.each do |unique_value|
    counter = 0
    array.each do |num|
      if counter < 2 && unique_value == num
        output_array << num
        counter += 1
      elsif counter == 2
        break
      else
        next
      end
    end
  end
  output_array
end

p (delete_nth([20,37,20,21], 1)) # == [20,37,21]
p (delete_nth([1,1,3,3,7,2,2,2,2], 3)) # == [1, 1, 3, 3, 7, 2, 2, 2]
































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