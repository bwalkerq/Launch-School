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


p longest('asd') == 'as'
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