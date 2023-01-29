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

def switch_pass(num_of_lights)
  lights_hash = {}
  (1..num_of_lights).each do | n |
    lights_hash[n] = false
  end
  num_of_lights.times do | index |
    lights_hash.each do | position, state |
      lights_hash[position] = !state if position % (index + 1) == 0
    end
  end
  lights_on = lights_hash.select { | _position, state | state }
  lights_on.keys
end

# 28 min
# about 10 minutes spent on line 131 only, debugging my erroneous has value reassignment
# I seemed to think that `v` represented the actual value in the key value pair, so I tried reassigning without
# actually using an `=` in any way (this sounds insane now, classic), but just by simply operating on the `v`
# So I'm taking away that reassignment of a value in a hash must be done with Hash[k] = `new value` (which I knew? oy)
# I also had to remember that with #times the |n| starts with 0 rather than 1 (because it's an index, not the `time`)
# The good news is that everything else didn't need any modification! that's 11/12 lines of code with no errors!

# 6 min writing on my own

# their solution involves 3 helper methods plus the main method.
# - initialize the lights
# - toggle the nth light
# - capture the on lights for the return
# I guess my method could be extracted that way, but it's already fairly short, and I don't see how extracting these
# helper methods will make it easier to debug. I guess it would make it easier to read for other engineers.
# I also learned:
# "Using an underscore at the beginning of a parameter name is a common convention to show that a parameter isn't used."
# and then I went through at the end and gave descriptive names (index, position, state) where I had previously had
# placeholder variables (n, k, v).

# Also! I figured out why this problem actually works, after years and years, and even Jeff's master's thesis
# or whatever it was! LOL. it's just about parity of factors. Which is totally beautiful. It took me about 30 seconds
# of writing out the factors of 1..10, and I figured it out.

10.times do |n|
  p switch_pass(n+1)
end

# diamonds
=begin
input: odd integer that represents how many total rows the diamond will be
also represents the number of stars in the middle (longest) row

output: a diamond put to the console with stars in rows 1,3,5,...n,..5,3,1)

successive rows have odd numbers of stars 1 up to n, then back down to 1

could do range from 1 to n, #upto, print on successive rows if x is odd
then from n-2 downto 1, print the same
=end

def make_stars(integer, n)
  output = "*" * n
  puts output.center(integer)
end

def diamond(integer)
  1.upto(integer) { | n | make_stars(integer, n) if n.odd? }
  (integer - 2).downto(1) { | k | make_stars(integer, k) if k.odd? }
end

diamond(5)
diamond(9)

# 16 min
# 10 min reading others' answers and refactoring mine from 17 lines to 8 lines


# minilang register method

=begin
input: LOTS! a string passed in as an argument

    n Place a value n in the "register". Do not modify the stack.
    PUSH Push the register value on to the stack. Leave the value in the register.
    ADD Pops a value from the stack and adds it to the register value, storing the result in the register.
    SUB Pops a value from the stack and subtracts it from the register value, storing the result in the register.
    MULT Pops a value from the stack and multiplies it by the register value, storing the result in the register.
    DIV Pops a value from the stack and divides it into the register value, storing the integer result in the register.
    MOD Pops a value from the stack and divides it into the register value, storing the integer remainder of the division in the register.
    POP Remove the topmost item from the stack and place in register
output:
    PRINT Print the register value


psuedo code
take the string argument, split to an array or hash
a series of if statements evaluate the collection, for each included command, do the work
might need to remove the hash element from the original...so that each is evaluated

if array, each
if number skip
if n reassign register
if push take next entry and << stack
case statement for the operations
if pop take next entry

an array holds the stack
a variable holds the register


=end

def minilang(string_command)
  register = 0
  stack = []
  command_array = string_command.split.map { | x | x =~ /[0-9]/ ? x.to_i : x }
  command_array.each do |entry|
    case
    when entry.is_a?(Integer)
      register = entry
    when entry == "PUSH"
      stack << register
    when entry == "ADD"
      register = register + stack.pop
    when entry == "SUB"
      register = register - stack.pop
    when entry == "MULT"
      register = register * stack.pop
    when entry == "DIV"
      register = register / stack.pop
    when entry == "MOD"
      register = register % stack.pop
    when entry == "POP"
      register = stack.pop.to_i
    when entry == "PRINT"
      puts register
    end
  end
end

# literally over 100 minutes.
# understood the problem incorrectly,
# What the fuck did I learn?
# without looking at the solution, I already learned that #to_i on ANY string returns an integer;
# if the string isn't [0-9] it just returns 0.
# order matters for operations; the words into the operations I reversed the order a bunch and didn't catch till the end
# I didn't understand the fucking problem; I thought that push took the next entry, I did all this fucking work
# to try to take the next entry after push
# FML

# Holy fuck I can't believe their solution
def minilang2(program)
  stack = []
  register = 0
  program.split.each do |token|
    case token
    when 'ADD'   then register += stack.pop
    when 'DIV'   then register /= stack.pop
    when 'MULT'  then register *= stack.pop
    when 'MOD'   then register %= stack.pop
    when 'SUB'   then register -= stack.pop
    when 'PUSH'  then stack.push(register)
    when 'POP'   then register = stack.pop
    when 'PRINT' then puts register
    else              register = token.to_i # I spent so much time working around this; it's an afterthought for them
    end
  end
end
# The reason I spent all that time with regex and dealing with the numbers first: I wasn't taking full
# advantage of the assumptions. Namely, that it won't contain unknown tokens, so I didn't have to validate values
# from the program
# Also, I should have noted that their use of the word "token" could lend me insight to how to structure the program
# They also used incrementing operations, which would have gotten rid of my reverse order problem


minilang('PRINT')
# 0

minilang('5 PUSH 3 MULT PRINT')
# 15

minilang('5 PRINT PUSH 3 PRINT ADD PRINT')
# 5
# 3
# 8

minilang('5 PUSH POP PRINT')
# 5

minilang('3 PUSH 4 PUSH 5 PUSH PRINT ADD PRINT POP PRINT ADD PRINT')
# 5
# 10
# 4
# 7

minilang('3 PUSH PUSH 7 DIV MULT PRINT')
# 6

minilang('4 PUSH PUSH 7 MOD MULT PRINT ')
# 12

minilang('-3 PUSH 5 SUB PRINT')
# 8

minilang('6 PUSH')
# (nothing printed; no PRINT commands)

DIGIT_HASH = { zero: 0, one: 1, two: 2, three: 3,
               four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9} # next time do this with #zip of two arrays

def word_to_digit(string)
  array = string.split.map! do |word|
    DIGIT_HASH.keys.include?(word.to_sym) ? DIGIT_HASH[word.to_sym] : word
  end
  array.join(' ')
  # string.gsub!(DIGITS.keys, DIGITS[key])
end

p word_to_digit('Please call me at five five five one two three four. Thanks.') #== 'Please call me at 5 5 5 1 2 3 4. Thanks.'


# 15 minutes for the partial solution, which I knew I would have from the very beginning, with that fucking period after four
# 8 more minutes to understand their solution with regex
# Believe it or not, this was the right choice for me to look at their solution, because i never would have figured out
# \b as a character to constrain to complete words and not substrings, and I probably would have spent forever one that
# I'm actually really annoyed that they have problems where you essentially NEED regex and then it's not in the curriculum
# until later
# Today was worthless

# Start of a new day.

def word_to_digit2(string)
  DIGIT_HASH.keys.each do |symbol|
    string.gsub!(/\b#{symbol.to_s}\b/, DIGIT_HASH[symbol].to_s)
  end
  string
end
p word_to_digit2('Please call me at five five five one two three four. Thanks.') #== 'Please call me at 5 5 5 1 2 3 4. Thanks.'
# fully complete solution, with #gsub!
# Some people's solutions created a hash super smoothly
words = %w(zero, one, two, three, four, five, six, seven, eight, nine)
digits = [0,1,2,3,4,5,6,7,8,9]
hash = words.zip(digits).to_h
p hash
# damn son
# however, some didn't even make a hash, and avoided it by using #each_with_index, which is smooth since the hash just
# contains index values in this case


def sum(n)
  return 1 if n == 1
  n + sum(n - 1)
end

p sum(4)

def fibonacci_old(n)
  return 1 if n <= 2
  fibonacci_old(n - 1) + fibonacci_old(n - 2)
end

# 10 min
# needed a return for two initial terms instead of one initial term --> actually it turns out we don't need
# two terms, just a condition on the term that n <=2 it returns 1
# I wrote out a T-chart for the below examples, showing their function arithmetic (e.g. f(12) = f(11) - f(10))
# The FE was about 'tail recursion' which I think I understand to just store values in the tail method from
# previous calculations so that the processor doesn't give up as quickly.



# now make explicit (procedural) this recursive formula. haaaa

# array that get populated with the numbers that will be summed, then #inject(&+)
# 5 times start with 1, 1, add them, << the sum, go on, increment up the index?

def fibonacci(nth)
  return 1 if nth <=2
  # stack = [1,1]
  # (nth-2).times do |index|
  #   stack << (stack[index] + stack[index + 1])
  # end
  # stack[-1]
  previous = 1
  twice_previous = 1
  current = 0
  (nth-2).times do |index|
    current = previous + twice_previous
    twice_previous = previous
    previous = current
  end
  current
end

# 17 minutes - about 4 minutes spent on deciphering that I had put >= instead of <=
# went around and around on how to do this, and for a while I thought I had to sum everything, but it turns out
# I was already calculating the nth term, so I just had to call the last term. So I should rewrite this since I'm already
# calculating the term that I'm returning
# WOW that took probably 15 min, I didn't think it would be that hard. Just a lot of reassignment, so actually I
# think that the array which I utilized is better than this variable stuff that I did

p fibonacci(1) == 1
p fibonacci(2) == 1
p fibonacci(3) == 2
p fibonacci(4) == 3
p fibonacci(5) == 5
p fibonacci(12) == 144
p fibonacci(20) == 6765
p fibonacci(20) == 6765
p fibonacci(100) == 354224848179261915075
#p fibonacci(100_001) # => 4202692702.....8285979669707537501

# Looking at their solution, it's the combo of the two that I wrote;
# it combines the fact that you're only ever keeping track of a handful of values (two instead of my three)
# and you're storing them in an array, I guess for easy of access/reassignment

def fib_again(nth)
  first, last = [1, 1]
  (nth-2).times do # they did 3.upto(nth) which is equivalent and a bit more clear, since it's implied that you've already
    # done steps 1 and 2 with the initial assignment
    first, last = [last, first + last]
  end
  last
end

p fib_again(12)

def fibonacci_last(nth)
  num = fib_again(nth)
  # num.to_s[-1].to_i
  num % 10
end

p fibonacci_last(15)        # -> 0  (the 15th Fibonacci number is 610)
p fibonacci_last(20)        # -> 5 (the 20th Fibonacci number is 6765)
p fibonacci_last(100)       # -> 5 (the 100th Fibonacci number is 354224848179261915075)
p fibonacci_last(100_001)   # -> 1 (this is a 20899 digit number)
p fibonacci_last(1_000_007) # -> 3 (this is a 208989 digit number)
p fibonacci_last(123456789) # -> 4

# 2:30 - fast because I relied on the previous solution, but what a weird problem to be included here.
# I think perhaps it's interested in doing something that I'm not, because the last example is taking forever.
# I think maybe this problem is about more than calling the last character from a string representation of the number
# I could do some mod thing that returns the 1's digit. That didn't make it any faster...
# Yeah, so there's some nice math here, where the only info needed to calculate the last digit is the intermediary
# last digits, so they wrote a method to chop the last digits as they go
#








































