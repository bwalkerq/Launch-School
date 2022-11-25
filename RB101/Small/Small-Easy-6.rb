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

# Their solution
def reverse!(array)
  left_index = 0
  right_index = -1

  while left_index < array.size / 2 # by reading this line only, I already understand that they're swapping the places of the first and last, then the 2nd and 2nd to last
    # to me, that just seems unnecessarily complicated, rather than just pushing them all in starting from the front
    # actually, as I wrote "pushing them all in from the front" I realized that I could have used prepend in the same way that I did with indices
    array[left_index], array[right_index] = array[right_index], array[left_index] # ok, this is admittedly not that complicated
    left_index += 1
    right_index -= 1
  end

  array
end

# 5	Reversed Arrays (Part 2) (non-mutating)
def reverse(array)
  reversed_array = []
  array.each do |element|
    reversed_array.prepend(element)
  end
  reversed_array
end

p "5"
p reverse([1,2,3,4]) == [4,3,2,1]          # => true
p reverse(%w(a b e d c)) == %w(c d e b a)  # => true
p reverse(['abc']) == ['abc']              # => true
p reverse([]) == []                        # => true

p list = [1, 3, 2]                      # => [1, 3, 2]
p new_list = reverse(list)              # => [2, 3, 1]
p list.object_id != new_list.object_id  # => true
p list == [1, 3, 2]                     # => true
p new_list == [2, 3, 1]                 # => true

# 6	Combining Arrays
def merge(array1, array2)
  (array1 + array2).uniq
end
p "merge"
p merge([1, 3, 5], [3, 6, 9]) == [1, 3, 5, 6, 9]

# 7	Halvsies
def halvsies(array)
  a = []
  b = []
  output = [a,b]
  array.each_with_index do |element, index|
    if array.size.odd?
      if index <= array.size/2
        a << element 
      else
        b << element
      end
    else
      if index <= array.size/2-1
        a << element 
      else
        b << element
      end
    end
  end
  output
end

p "halv"
p halvsies([1, 2, 3, 4]) == [[1, 2], [3, 4]]
p halvsies([1, 5, 2, 4, 3]) == [[1, 5, 2], [4, 3]]
p halvsies([5]) == [[5], []]
p halvsies([]) == [[], []]

# Their solution, wow:
def halvsies(array)
  middle = (array.size / 2.0).ceil # the #ceil method is new to me, the idea is not new. The term "middle" here is misleading, as it represents
  # the term after the middle, not the true middle
  first_half = array.slice(0, middle) # I notice that the 0th term is included, the "middle" term is not. Great use of slice, much better than my conditional statements
  # I notice that slice is used deftly with arrays; I had previously thought it was a string-only 
  second_half = array.slice(middle, array.size - middle)
  [first_half, second_half]
end
# smooth.

# 8	Find the Duplicate
def find_dup(array)
  temp_array = []
  array.each do |x|
    temp_array.include?(x) ? return x : temp_array << x
  end
end

p "duplicate"
p find_dup([1, 5, 3, 1]) == 1
p find_dup([18,  9, 36, 96, 31, 19, 54, 75, 42, 15,
          38, 25, 97, 92, 46, 69, 91, 59, 53, 27,
          14, 61, 90, 81,  8, 63, 95, 99, 30, 65,
          78, 76, 48, 16, 93, 77, 52, 49, 37, 29,
          89, 10, 84,  1, 47, 68, 12, 33, 86, 60,
          41, 44, 83, 35, 94, 73, 98,  3, 64, 82,
          55, 79, 80, 21, 39, 72, 13, 50,  6, 70,
          85, 87, 51, 17, 66, 20, 28, 26,  2, 22,
          40, 23, 71, 62, 73, 32, 43, 24,  4, 56,
          7,  34, 57, 74, 45, 11, 88, 67,  5, 58]) == 73

# 9	Does My List Include This?
# # 10	Right Triangles