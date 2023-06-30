a method that takes an array of integers, and returns a new array with every other element from the original array, starting with the first element. For instance:

given the array
iterate through, if the index is odd, select that element into the other array
if not storing the other array, it'll just return from the method


a method that determines the index of the 3rd occurrence of a given character in a string. For instance, if the given character is 'x' and the string is 'axbxcdxex', the method should return 6 (the index of the 3rd 'x'). If the given character does not occur at least 3 times, return nil.

Given a string
start a counter at 0 for the target character
iterate through each character in the string, and check IF it's equal to the target; if so, add one to the counter
set a condition when the counter =3, break and return the index location (there may be a built in method, like index_of or something)


a method that takes two arrays of numbers and returns the result of merging the arrays. The elements of the first array should become the elements at the even indexes of the returned array, while the elements of the second array should become the elements at the odd indexes. For instance:
merge([1, 2, 3], [4, 5, 6]) # => [1, 4, 2, 5, 3, 6]

Given two arrays
iterate through both arrays, one element from the first, then one from the next, and have that be the loop
probably use .shift on each, and shovel that to the new array, loop until all elements shifted out of the original arrays, maybe until array1 = nil? or something like that, then return the new array

