/*
P:
for a bunch of reports of varying levels
determine the number of safe reports
  safe means
    numbers are either all descending or all ascending
    and the increment size (differences) between adjacent numbers is 3, 2, or 1
    no repeating numbers (increment size would be 0)

E:
make sense to me

D:
arrays

A:
take all the text, put each report in its own array
for each subarray
  if ascending safe OR descending safe
    increment safe counter
return safe counter

ascending safe helper:
For each but the last entry in the array
  if the next minus the current is greater than 0 and less than 4 return true

descending safe helper:
same but current minus next
 */

