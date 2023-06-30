# frozen_string_literal: true

# This class takes string octal nums and can convert them to base 10 integers
class Octal
  attr_reader :number

  def initialize(str)
    @number = str
  end

  def to_decimal
    return 0 if invalid_octal?(number)

    number.chars.map.with_index do |string_digit, idx|
      string_digit.to_i * 8**(number.length - (idx + 1))
    end.sum
  end

  private

  # probably better to check for validity...
  def invalid_octal?(str)
    str.match(/[^0-7]/)
  end
end

# p 4 =~ /[0-7]/
# text = '8'
# text.match(/[^0-7]/) ? (puts "matched") : (puts "not")

=begin
PROBLEM - given a string octal number, convert to a decimal

input: string representing a base-8 number
output: integer, base 10

explicit rules: invalid octal returns 0

implicit rules: any string input that includes values that are not 0-7 returns 0
because invalid

Questions: do I need a character class for regex? /[0-7]/

Mental Model:
use regex to filter invalid octal and return 0
have to clean up leading zeros later, with regex
for numbers with no leading zeros...
for each string digit, multiply it by 8 to the power of
  string length - index
sum at the end

EXAMPLES

DATA / ALGORITHM

CODE
=end