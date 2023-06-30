def short_long_short (string1, string2)
  if string1.length > string2.length
    long = string1
    short = string2
  else
    long = string2
    short = string1
  end
  short + long + short # their solution is much shorter, but mine is more clear
end

p short_long_short('abc', 'defgh') == "abcdefghabc"
p short_long_short('abcde', 'fgh') == "fghabcdefgh"
p short_long_short('', 'xyz') == "xyz"

# You're awesome

# 2 What century is that?

# examples 1 - 100 is the first century
# 101 - 200 is the 2nd century
# something like year/100 + 1 
# case statement to deal with st, nd, etc
# weird shit to deal with 11-13, so any number who's last two digits are 11-13, 
# then "th" but otherwise only 4 cases
def century(year)
  century_number = ((year - 1) / 100 + 1).to_s # weird year-1 to deal with 
  # 2000 in 20th century edge case
  # they dealt with the edge case with a separate if modulo statement
  return century_number + "th" if 
    ["11", "12", "13" ].include?(century_number[-2..-1])
  case century_number[-1]
  when "1"
    suffix = "st"
  when "2"
    suffix = "nd"
  when "3"
    suffix = "rd"
  else
    suffix = "th"
  end
  century_number+suffix
end
p "tests"
#p "1342145"[-2..-1]
#p (11..13)
p century(2000) == '20th'
p century(2001) == '21st'
p century(1965) == '20th'
p century(256) == '3rd'
p century(5) == '1st'
p century(10103) == '102nd'
p century(1052) == '11th'
p century(1127) == '12th'
p century(11201) == '113th'

# Interesting that they used two separate methods. Breaking up methods is def
# a growth area for me
# I really like their use of 'century % 10' to return last digit and
# 'century % 100' to return the last two digits. I did mine to a string, and
# used negative indices.

# 3 Leap Years 1
def leap_year_julian?(year)
  year % 4 == 0
end
def leap_year?(year) # updated my method to exclude the use of 3 'returns'
  return leap_year_julian?(year) if year < 1752
  if year % 400 == 0
    true
  elsif year % 100 == 0
    false
  else
    year % 4 == 0
  end
end
p "leaps"
p leap_year?(2016) == true
p leap_year?(2015) == false
p leap_year?(2100) == false
p leap_year?(2400) == true
p leap_year?(240000) == true
p leap_year?(240001) == false
p leap_year?(2000) == true
p leap_year?(1900) == false
p leap_year?(1752) == true
p leap_year?(1700) == false
p leap_year?(1) == false
p leap_year?(100) == false
p leap_year?(400) == true

# 4 Leap Years 2
p "julian tests"
p leap_year?(2016) == true
p leap_year?(2015) == false
p leap_year?(2100) == false
p leap_year?(2400) == true
p leap_year?(240000) == true
p leap_year?(240001) == false
p leap_year?(2000) == true
p leap_year?(1900) == false
p leap_year?(1752) == true
p leap_year?(1700) == true
p leap_year?(1) == false
p leap_year?(100) == true
p leap_year?(400) == true

# You're awesome

# 5 Multiples of 3 and 5
def multisum(num)
  multiples = (1..num).select { |x| x % 3 == 0 || x % 5 == 0}
  multiples.inject(:+)
  # some method to extract all the factors, lol, #inject(:+)
  # could loop through all numbers from 1 to target and store the mod == 0
end
p "multisum"
p multisum(3) == 3
p multisum(5) == 8
p multisum(10) == 33
p multisum(1000) == 234168

p "# 6 Running totals"
def running_total(array_of_integers)
  array_of_integers.map do |x| 
    sum = 0
    (0..array_of_integers.index(x)).each_with_index do |element, i|
      sum += array_of_integers[i]
    end
    sum
  end
end
# woof, i got it work, but this took forever (Olie is sick today, and I was
# distracted AF while trying to do this and help Katie negotiate her jobs)

def running_total_2(array_of_integers)
  array_of_integers.map do |x|
    sum_value = 0
    index = 0
    until index == array_of_integers.index(x) + 1 do 
      sum_value += array_of_integers[index]
      index += 1
    end
    sum_value
  end
end
# this was me just showing myself that I could do this another way
# 

p running_total_2([2, 5, 13]) == [2, 7, 20]
p running_total_2([14, 11, 7, 15, 20]) == [14, 25, 32, 47, 67]
p running_total_2([3]) == [3]
p running_total_2([]) == []

# DAMN their solution is ridiculously elegant
#  I knew to use #map here
def running_total(array)
  sum = 0
  array.map { |value| sum += value } # wow, I don't think I would have thought
  # of this; I don't think I understood that this could just iterate on the 
  # sum and push that to the new array. Dang.
end
# LOL I did the further exploration, the #each_with_index

# 7 
# "Convert a String to a Number!"

def string_of_nums_to_array(string)
  array = string.chars.map do |x|
    case x # This case statment is better handled by a Contant Hash
    when "0" then 0
    when "1" then 1
    when '2' then 2
    when '3' then 3
    when '4' then 4
    when '5' then 5
    when '6' then 6
    when '7' then 7
    when '8' then 8
    when '9' then 9
    end
  end
end

def string_to_integer(string)
  array = string_of_nums_to_array(string)
  number = 0
  multiplier = 1
  array.reverse_each do |array_entry|
    number += (array_entry * multiplier)
    multiplier *= 10
  end
  number  
end

p "string to integer"
p string_to_integer('4321') == 4321
p string_to_integer('570') == 570

# I refactored my answer into two methods before looking at the solution
# their solution:
DIGITS = {
  '0' => 0, '1' => 1, '2' => 2, '3' => 3, '4' => 4,
  '5' => 5, '6' => 6, '7' => 7, '8' => 8, '9' => 9,
}


# def string_to_integer(string)
#   digits = string.chars.map { |char| DIGITS[char] } # I used same three methods
#   # and did the same array, essentially, just with a less-elegant case statement
  
#   value = 0 # same
#   digits.each { |digit| value = 10 * value + digit } # this works, and is very
#   # unclear, since you have to intuit that, for example, the thousands digit gets
#   # multiplied by 10 4 separate times as the number is carried through the #each
#   # iteration. I like mine much better
#   value
# end

# I'm ignoring the hexadecimal bullshit as the further exploration; I hope I don't
# eat it in the assessment

# 8 Convert a String to a Signed Number!
def string_to_signed_integer(string)
  string.delete!("+")
  if string[0] == "-"
    string.delete!("-")
    string_to_integer(string) * -1
  else
    string_to_integer(string)
  end
end


# Further Exploration
def string_to_signed_integer(string)
  string.delete!("+")
  negative = false
  if string[0] == '-'
    result = string[1..-1]
    negative = true
  else
    result = string
  end
  multiply_by_one = negative ? -1 : 1
  multiply_by_one * string_to_integer(result)
end
# In our solution, we call string[1..-1] twice, and call string_to_integer
# three times. This is somewhat repetitive. Refactor our solution so it only
# makes these two calls once each.

# GFP I did it. Yeesh, that was way harder than my original solution.
# I feel like they wouldn't suggest that as an exercise unless there were a 
# simple way to do it, since they posed it as an antidote to redundancy...

p "test further exploration"
p string_to_signed_integer('4321') == 4321
p string_to_signed_integer('-570') == -570
p string_to_signed_integer('+100') == 100

# 9

STRING_DIGITS = DIGITS.invert

# seems I can use some math to divde and chop, or use #digits to get a reverse
# array? I don't get radix, and don't want to go there now...

def integer_to_string(integer)
  string_array = integer.digits.reverse
  string_array.map { |x| STRING_DIGITS[x]}.join
end

p integer_to_string(4321) == '4321'
p integer_to_string(0) == '0'
p integer_to_string(5000) == '5000'

# you're awesome

# their solution:
DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'] # clearer than 
# the recycled hash I used, but mine is still smooth

def integer_to_string(number)
  result = ''
  loop do
    number, remainder = number.divmod(10) # This is what i was talking about 
    # with divide and chop--maybe I had seen this convention somewhere
    result.prepend(DIGITS[remainder])
    break if number == 0
  end
  result
end

p integer_to_string(4321) == '4321'
p integer_to_string(0) == '0'
p integer_to_string(5000) == '5000'

# 10 
def signed_integer_to_string(integer)
  return '0' if integer == 0
  positive = integer > 0 ? true : false
  integer *= -1 if integer < 0
  prefix = positive ? "+" : "-"
  prefix + integer_to_string(integer)
end


# get fucking psyched

def signed_integer_to_string2(number)
  case number <=> 0
  when -1 
    prefix = "-"
    number *= -1
  when +1 then prefix = "+"
  else return '0'
  end
  prefix + integer_to_string(number)
end
p "final tests"
p signed_integer_to_string2(4321) == '+4321'
p signed_integer_to_string2(-123) == '-123'
p signed_integer_to_string2(0) == '0'