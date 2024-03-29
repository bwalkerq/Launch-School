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
Feedback that I often give:
- Think of the interview as a presentation of your process; you want to make
it transparent what you're thinking and why, and also package it in a way
that is easy for them to understand and follow. While thinking, talk through
your solution process. Once you've settled on something, state it clearly,
and then type it out. Bite-sized ideas are great. Say a sentence or two about
 each line of algorithm or code that you type, before you type. Then type in
silence to give you and the interviewer a moment of silence to process.
- When testing as you code, Always communicate what you *expect* the code to do
*before* running the code. This demonstrates that you are in control of the
code
- Test as often as possible for each unique bit of code; err on the side of
testing too much
- The algorithm and the code always have to align; sometimes you have to go
back and revise your algo (blueprint and building construction, a la Spencer)

=end

# #PROBLEMS
# Write a function that connects each previous word to the next word by the shared letters. Return the resulting string (removing duplicate characters in the overlap) and the minimum number of shared letters across all pairs of strings.

p join(["oven", "envier", "erase", "serious"])  == ["ovenvieraserious", 2]
p join(["move", "over", "very"]) == ["movery", 3]
p join(["to", "ops", "psy", "syllable"])  == ["topsyllable", 1]


# PROBLEM - return the first word with the highest score in a string, where score is the sum of the positions in the alphabet

p high('man i need a taxi up to ubud') == 'taxi'
p high('what time are we climbing up the volcano') == 'volcano'
p high('take me to semynak') == 'semynak'
p high('aaa b') == 'aaa'
p high('aa b') == 'aa'


# An array of integers is a SPIRAL if the integers increase to a single max
# value, and then decrease down from there. Write a method that returns
# true if an array is a spiral, else return false.

p spiral([1, 2, 4, 3, 2, 1]) == true
p spiral([1, 2, 4, 6, 4, 2, 1]) == true
p spiral([0, 3, 5, 4, 3, 2, 1]) == true
p spiral([0, 3, 5, 5, 4, 3, 2, 1]) == false
p spiral([1, 2, 4, 6, 4, 2, 4]) == false
p spiral([1, 5, 4, 6, 4, 2, 1]) == false

=begin
coaching Kana on 8/8/23

lovely slow communication right out of the gate
good to ask about the value vs the sum!
You asked about 1234,4321...and you can just look at the examples!
NICE, you caught that you can look at the examples
**read the examples early on to make sense of the probelms implicit rules, and to answer edge case questions**
[at about 5.5 minutes, you read all of the exmaples]

During the process of "how to know if the value is the max value..."
[what methods do you know for a max]

first mention of increasing side and decreasing side at 14.5 min!

19 min you figured out that it's not just the value of the integers, but also
the ORDER of the values; you used the phrase "ascending order" and "decending order"

at 22.5 min very strong and clear statement to start off the algorithm writing!
It's clear that you've loaded the problem well
23.3 first mention of sorting! wow!

It's clear that you're smart! Great thinking process, it was really fun to watch/hear you make progress on this problem!
In my opinion, you have everything working for you; you just need more practice to gain fluency and speed.
=end


=begin
Problem from Mai Khu

Task :
Given a List [] of n integers , find the minimum number to be inserted in a list, so that the sum of all elements of the list should equal the closest prime number.

Notes
List size is at least 2 .

List's numbers will only have positives (n > 0) .

Repetition of numbers in the list could occur .

The newer list's sum should equal the closest prime number .

Input >> Output Examples
1- minimumNumber ({3,1,2}) ==> return (1)
Explanation:
Since , the sum of the list's elements equal to (6) , the minimum number to be inserted to transform the sum to prime number is (1) , which will make *the sum of the List** equal the closest prime number (7)* .
2-  minimumNumber ({2,12,8,4,6}) ==> return (5)
Explanation:
Since , the sum of the list's elements equal to (32) , the minimum number to be inserted to transform the sum to prime number is (5) , which will make *the sum of the List** equal the closest prime number (37)* .
3- minimumNumber ({50,39,49,6,17,28}) ==> return (2)
Explanation:
Since , the sum of the list's elements equal to (189) , the minimum number to be inserted to transform the sum to prime number is (2) , which will make *the sum of the List** equal the closest prime number (191)* .
=end

p minimum_number([3,1,2]) == 1
p minimum_number([5,2]) == 0
p minimum_number([1,1,1]) == 0
p minimum_number([2,12,8,4,6]) == 5
p minimum_number([50,39,49,6,17,28]) == 2



=begin
Write a function

triple_double(num1, num2)
which takes numbers num1 and num2 and returns 1 if there is a straight triple of a number at any place in num1 and also a straight double of the same number in num2.

If this isn't the case, return 0

Examples
triple_double(451999277, 41177722899) == 1
# num1 has straight triple 999s and  num2 has straight double 99s

triple_double(1222345, 12345) == 0
# num1 has straight triple 2s but num2 has only a single 2
=end

p triple_double(66677789, 12345667) == 1
p triple_double(66666666789, 12345667) == 1
p triple_double(666789, 12345677) == 0
p triple_double("asfaaas", "aakjdfgsdfg") == 1
