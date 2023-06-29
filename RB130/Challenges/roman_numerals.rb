
class RomanNumeral
  ROMANS = %w(I V X L C D M V X)

  def initialize(num)
    @number = num
  end

  def character(digit, subset)
    case digit
    when 0 then ''
    when 1 then subset[0]
    when 2 then subset[0] * 2
    when 3 then subset[0] * 3
    when 4 then subset[0] + subset[1]
    when 5 then subset[1]
    when 6 then subset[1] + subset[0]
    when 7 then subset[1] + subset[0] * 2
    when 8 then subset[1] + subset[0] * 3
    when 9 then subset[0] + subset[2]
    end
  end

  def to_roman
    roman_return = ''
    digits_array = @number.digits
    digits_array.each_with_index do |digit, index|
      subset = ROMANS[(index * 2), 3]
      roman_return.prepend(character(digit, subset))
    end
    roman_return
  end
end

# updated PEDAC
# algo
# take the first entry of the digits array (representing the one's)
# filter it through the case statement using the first three letters of the
# roman numerals array [I,V,X]
# store that return value in a return variable
# go to the next digit (representing the 10s), and send through the case
# statement with the next three letters [XLC], prepend to the return variable
# then hundreds with [CDM]
# then thousands with just M, or with MVX to be complete

# 3429
# [9,2,4,3]
#
#
# "IX" "XX" "CD" "MMM"
# "MMMCDXXIX"
#
# I  1
# V  5
# X  10
# L  50
# C  100
# D  500
# M  1,000
#
#
# "I" + "VXLCDM"*100
#
# IVX
#
# [0-2]
# [2-4]
# [4-6]
#
# (ones + tens + huns+ thous).reverse

# original PEDAC without Jon
# problem - translate an integer to roman numeral
# numbers 3000 or smaller, so only need to deal with 1000's place
# break into base 10 components
# ex. 350 = 300 + 50 + 0
# if 0 then put ''
# translate each for the value
# for 1-8, better to split to 5 + _
# 1 2 3 are same as 6 7 8
# 4, 5 unique, and 9 unique

# helper method to break into base 10 components, with 1's first, 10's 2nd,
# up to 1000's
# helper method for each base 10 unit
# 1's