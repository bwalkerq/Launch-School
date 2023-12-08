trebuchet = File.expand_path("../trebuchet.txt", __FILE__)

p File.open(trebuchet).readlines

=begin
PEDAC
Problem -
take the first and last number from each line, make a two digit number, and
  sum all of those numnbers

Examples
"five11nqgttpfj\n" --> 11
"tnxxs729k\n" --> 79
"1sevensixsptxkmncrkfxone\n" --> 11 (because 1 is the only numnber, it
is both first and last)
I understand that each line will have at least one integer character

Algo
from each line, match on any integers and select them out into an array
then grab the first and last

use String#scan

=end

p "asdf7asdf8asdf98".scan(/\d/)

integers = File.open(trebuchet).readlines.map {|string| string.scan /\d/}
p integers
twos = integers.map do |array|
  a = array.first
  b = array.last
  a + b
end
p twos
p twos.map(&:to_i).sum

#Part 2

