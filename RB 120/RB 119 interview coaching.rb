# # Write a function that connects each previous word to the next word by the shared letters. Return the resulting string (removing duplicate characters in the overlap) and the minimum number of shared letters across all pairs of strings.

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
# value, and then decreases down from there. Write a method that returns
# true if an array is a spiral, else return false.

p spiral([1,2,4,3,2,1]) == true
p spiral([1,2,4,6,4,2,1]) == true
p spiral([0,3,5,4,3,2,1]) == true
p spiral([0,3,5,5,4,3,2,1]) == false
p spiral([1,2,4,6,4,2,4]) == false
p spiral([1,5,4,6,4,2,1]) == false

# feedback for Esther Kim
#


# Feedback that i often give:
# Think of the interview as a presentation of your process; you want to make
# it transparent what you're thinking and why, and also package it in a way
# that is easy for them to understand and follow. Speak then type, avoid
# doing at the same time.


