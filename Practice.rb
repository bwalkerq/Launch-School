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

=begin
PROBLEM: reverse words in a string that are longer than four characters

input: string with words separated by spaces
output: original string with words of length 4+ reverses

explicit rules:
implicit rules:

Questions:

Mental Model:
break up, for each 3 or less, skip, for each 4 or more, reverse, join

EXAMPLES

DATA / ALGORITHM

CODE
=end

def spinWords(string)
  string.split.map{ |word| word.length >4 ? word.reverse : word }.join(' ')
end

# p spinWords("Hey fellow warriors") == "Hey wollef sroirraw"
# p spinWords("This is a test") == "This is a test"
# p spinWords("This is another test") == "This is rehtona test"
# p spinWords('test') == 'test'


=begin
Create a method called "power" that takes two integers and returns the
value of the first argument raised to the power of the second. Return
nil if the second argument is negative.

  Note: The ** operator has been disabled.

  Examples:

PROBLEM - recreate the power operator

input: two integers
output: the power (result) of the first integer raised to the second

explicit rules:
implicit rules:

Questions:

Mental Model:
exponentiation is repeated multiplication
2^3 is 2*2*2
2^6 is 2*2*2*2*2*2

EXAMPLES

DATA / ALGORITHM
exponent times multiply the base by itself

CODE
=end
def power(base, exponent)
  return nil if exponent<0
  result = 1
  exponent.times {result *= base}
  result
end
  p power(2, 3) == 8
p power(10, 0) == 1
p power(-5, 3) == -125
p power(-4, 2) == 16
p power(10, 0) == 1
p power(2, 3) == 8
p power(3, 2) == 9
p power(-5, 3) == -125
p power(-4, 2) == 16
p power(8, -2) == nil

