# Find the longest substring in alphabetical order.
# Example: the longest alphabetical substring in "asdfaaaabbbbcttavvfffffdf" is "aaaabbbbctt".
# The input will only consist of lowercase characters and will be at least one letter long.
# If there are multiple solutions, return the one that appears first.

=begin
1. Problem: return a substring from a

    Explicit: longest substring that is alphabetical

    Implicit: ok to return a new string

2. Input: string
   Output: a (new) substring

3. Examples/Rules:
p longest('abcdeapbcdef') ==  'abcde'
starts with a = a
ab = ab
...
abcde = abcde



4. Data Structures:


5. Steps:


6. Helper Methods: (as needed)

=end
# Find the longest substring in alphabetical order.
# Example: the longest alphabetical substring in "asdfaaaabbbbcttavvfffffdf" is "aaaabbbbctt".
# The input will only consist of lowercase characters and will be at least one letter long.
# If there are multiple solutions, return the one that appears first.

# input: string
# output: the longest substring in alpha order
#
# Mental model:
# traverse substrings (start at left, check one to the right) and check if next letter is alppha order, if so move on to the third, etc.
# if not, move starting character one to the right
# longest substring starts at 0
# if substring is at least 2, check length against longest, store to longest alpha_substring
# have a longest length stored, to check other lengths against
# return the longest substring

# data: might need nested iterations
# could extract all substrings, then compare
# compare with simple less than, if the index acount gets to the length, break

# def longest(string)
#   longest_substring = ""
#   0.upto(string.size) do |n|
#     index = n
#     until index == (string.size - 1)
#     if string[index] < string[(index+1)]
#       index += 1
#       longest_substring = string[n, index+1] if string[n, index].size > longest_substring.size
#     else
#       break
#     end
#     end
#   end
#     longest_substring
# end

# bail because I've spent an hour and can't get this to work
# new approach
# start with first letter into current substring variable, check if next is more than, if so add that letter
# to the variable, check next letter...
# once next letter not alpha, break out of loop, check length against longest length and replace if longer

# def longest(string)
#   current_substring = ""
#   longest_substring = ""
#   characters = string.chars
#   characters.each_with_index do |start_letter, n| # start at each letter
#     characters[n,string.size - n].each_with_index do |letter, x| # then go through each letter to the right of the starting letter
#       if letter < characters[(x + 1)]
#         current_substring << letter
#       else
#         longest_substring = current_substring if current_substring.size > longest_substring.size
#         break
#       end
#     end
#   end
#   longest_substring
# end

def longest(string)
  current_substring = ""
  characters = string.chars
  longest_substring = characters[0]
  characters.each_with_index do |start_letter, n| # start at each letter
    position = n
    current_substring = start_letter
    until position == (string.size - 1)
      break if characters[position] > characters[position + 1]
      position += 1
      current_substring << characters[position]
    end
    longest_substring = current_substring if current_substring.size > longest_substring.size
  end
  longest_substring
end

# HOLY SHIT
# probably took 2.5 hours for this one problem. what a nightmare!
# I wrote three different methods to finally get this
# All three attempts involved nested iterations, I'm not even sure why the first two failed
# the last attempt seemed a bit easier with the conditional statement, seemed simpler

p longest('asbc') == 'as'
p longest('nab') == 'ab'
p longest('abcdeapbcdef') ==  'abcde'
p longest('asdfaaaabbbbcttavvfffffdf') == 'aaaabbbbctt'
p longest('asdfbyfgiklag') == 'fgikl'
p longest('z') == 'z'
p longest('zyba') == 'z'



# 2 -------------------------------------------------------------------------


# You will be given a number and you will need to return it as a string in expanded form. For example:
#
# expanded_form(12); # Should return '10 + 2'
# expanded_form(42); # Should return '40 + 2'
# expanded_form(70304); # Should return '70000 + 300 + 4'
#
# Note: All numbers will be whole numbers greater than 0.

=begin

PEDAC Template
==============

(Understand the) Problem
------------------------

-  Inputs: positive whole numebr
-  Output: string representing the various orders of magnitude sums

---

**Problem Domain:**

---

**Explicit Requirements:**

---


**Implicit Requirements:**

---

**Clarifying Questions:**

1.
2.
3.

---

**Mental Model:**
either a looped chopping off of each order of magnitude into an array (skip zeros)
or skip the array and just do the string
either divmod or something similar
could also do digits and just start multiplying by ten

---

Examples
--------------
7054 - 7,0,5,4 then for the size - 1 add that many zeros (3) to first entry, skip the zero
but that would have been 2 zeros,
then add one zero to 5 and none to 4, and make into a string




---

Data Structure(s)
--------------
probably just the string that I keep concatenating
or an array to hold the digits/places and then concat

---

Algorithm
---------



Code
----

=end

def expanded_form(integer)
  iterations = integer.digits.size
  iterations.times do |n|
    integer.divmod(10*(n+1))
  end
end

p 134.digits.size
p "divmod"
p 134.divmod(100)
p 134 % 1000
p 134.floor(-2)

p "examples"
p expanded_form(12) == '10 + 2'
p expanded_form(42) == '40 + 2'
p expanded_form(70304) == '70000 + 300 + 4'

=begin

PEDAC Template
==============

(Understand the) Problem
------------------------

-  Inputs:
-  Output:

---

**Problem Domain:**

---

**Explicit Requirements:**

---


**Implicit Requirements:**

---

**Clarifying Questions:**

1.
2.
3.

---

**Mental Model:**

---

Examples 
--------------

**Examples:**



---

Data Structure
--------------


---

Algorithm
---------



Code
----

=end

##simpler PEDAC
=begin
PROBLEM

input:
output:

explicit rules:
implicit rules:

EXAMPLES

DATA / ALGORITHM

CODE
=end

=begin
problem from 2023/1/25

# Given a string s, reverse the string according to the following rules:

# - All the characters that are not English letters remain in the same position. All the English letters (lowercase or uppercase) should be reversed.
# - Return s after reversing it.

PROBLEM

input: a string
output: a string

explicit rules:
the returned string has alpha characters reversed, and the symbols remain in the same location
implicit rules: none that I could see; the exmaples behaved as expected

EXAMPLES

DATA / ALGORITHM
array(s) not hash

Start with an array for entire string from #chars
#select out only the alpha characters, if the character is an element of a regex expression, or just an array of all
the letters
so the substring

CODE
=end
# Given a string s, reverse the string according to the following rules:

# - All the characters that are not English letters remain in the same position.
# - All the English letters (lowercase or uppercase) should be reversed.
# - Return s after reversing it.

p reverse_only_letters("ab-cd") == "dc-ba"
p reverse_only_letters("Test1ng-Leet=code-Q!") == "Qedo1ct-eeLg=ntse-T!"
p reverse_only_letters("--__123") == "--__123"
p reverse_only_letters('hellO') == 'Olleh'
