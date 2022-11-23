# 1	Cute angles
DEGREE = "\xC2\xB0"
def dms1(float)
  degrees = float.divmod(1)[0]
  minutes = float.divmod(1)[1] * 60
  seconds = float.divmod(1)[1] * 60 * 60 % 10
  degrees.to_s + DEGREE + format("%02d", minutes) + "\'" + format("%02d", seconds) + "\""
end
=begin  
My solution is close, but flubs some of the rounding on 2 of the 6 examples. Their approach, which I will attempt to replicate now, converts all the degrees to seconds
to start, and then uses #divmod to lop off everything
=end
def dms(float)
  temporary_degrees = float % 360
  seconds = temporary_degrees * 60 ** 2
  minutes, seconds = seconds.divmod(60)
  degrees, minutes = minutes.divmod(60)
  format(%(#{degrees}#{DEGREE}%02d'%02d"), minutes, seconds)
end
=begin  
- Wow, yeah, so their solution, which I did mimiced from memory, taught me a lot about Kernel#format. Firstly, that you call the method by simply typing format (just like
puts, I realize now) and then that you can string together multiple flag groups within a string to format, as we did at the end of line 17 and then pushed in multiple
variables (minutes and seconds) separated by commas. I'm hoping that I won't have to do tons of gymnastics with #format, because the documentation is simply overwhelming
and it doesn't seem like I can make use of it for find the types of examples I want. It turns out that "%02d" is what I needed in this case and in the time case, which 
I did in the problem set immediately prior to this one.
- Also %() are quotes, which make it easier than escaping characters like \"
=end

puts dms(30) == %(30°00'00")
puts dms(76.73) == %(76°43'48")
puts dms(254.6) == %(254°36'00")
puts dms(93.034773) == %(93°02'05")
puts dms(0) == %(0°00'00")
puts dms(360) == %(360°00'00") || dms(360) == %(0°00'00")

puts "# further"
puts dms(400) == %(40°00'00")
puts dms(-40) == %(320°00'00")
puts dms(-420) == %(300°00'00")

# 2	Delete vowels
def remove_vowels(array_of_strings)
  array_of_strings.map do |word|
    word.delete("aeiouAEIOU")
  end
end

puts remove_vowels(%w(abcdefghijklmnopqrstuvwxyz)) == %w(bcdfghjklmnpqrstvwxyz)
puts remove_vowels(%w(green YELLOW black white)) == %w(grn YLLW blck wht)
puts remove_vowels(%w(ABC AEIOU XYZ)) == ['BC', '', 'XYZ']

# 3	Fibonacci Number Location By Length
=begin  
input: desired length in digits of fib number
output: number of iterations until the first number with the desired length of digits is generated;
  if the 7th iteration generates the first two digit fib number, then input of 2 outputs 7

fib numbers 1, 1, 2, 3, 5, 8, 13, 21
index       1, 2, 3, 4, 5, 6,  7,  8

generate the fib number, check the number of digits, and return the index on the first 
number that matches the length of the target
The numbers are generated recursively

Algorithm
basic loop
[1,1] then << sum of the last two numbers, using their indeces? -1 and -2?
if num.length = target, return arr.index(num)
=end

def find_fibonacci_index_by_length(target_length)
  fibs = [0, 1, 1]
  new_num = 0
  until new_num.digits.length == target_length 
    new_num = (fibs[-1]+fibs[-2])
    fibs << new_num
  end
  fibs.index(new_num)
end

puts "## fibs"
puts find_fibonacci_index_by_length(2) == 7          # 1 1 2 3 5 8 13
puts find_fibonacci_index_by_length(3) == 12         # 1 1 2 3 5 8 13 21 34 55 89 144
puts find_fibonacci_index_by_length(10) == 45
puts find_fibonacci_index_by_length(100) == 476

# I did it, but it slowed down my computer a LOT, especially for the final case; I wasn't willing to keep waiting on that one
# their solution:
def find_fibonacci_index_by_length(number_digits)
  first = 1
  second = 1
  index = 2
  
  loop do
    index += 1
    fibonacci = first + second
    break if fibonacci.to_s.size >= number_digits
    
    first = second
    second = fibonacci
    # this is most interesting to me, because it overwrites the previous values, and doesn't store them to an array, like in mine,
    # which cuts down on the memory needed to handle the huge calculations. Smart.
  end
  
  index
end
# puts find_fibonacci_index_by_length(1000) == 4782
# puts find_fibonacci_index_by_length(10000) == 47847

# 4	Reversed Arrays (Part 1)
def reverse!(array)
  temp_array = array.dup
  index = -1
  temp_array.map do |element|
    array[index] = element
    index -= 1
  end
  array
end


list = [1,2,3,4]
p result = reverse!(list)
p result == [4, 3, 2, 1] # true
p list == [4, 3, 2, 1] # true
p list.object_id == result.object_id # true

list = %w(a b e d c)
p reverse!(list) == ["c", "d", "e", "b", "a"] # true
p list == ["c", "d", "e", "b", "a"] # true

list = ['abc']
p reverse!(list) == ["abc"] # true
p list == ["abc"] # true

p list = []
p reverse!(list) == [] # true
p list == [] # true

# 5	Reversed Arrays (Part 2)

# 6	Combining Arrays
# 7	Halvsies
# 8	Find the Duplicate
# 9	Does My List Include This?
# # 10	Right Triangles