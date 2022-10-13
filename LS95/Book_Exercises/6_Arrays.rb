##1
arr = [1,3,5,7,9]
n = 3
puts "yes the number does exist" if arr.include?(n)

##2
#What will the programs return? What is the value of arr after each
arr = ["b", "a"]
arr = arr.product(Array(1..3))
# [b1, b2, b3, a1, a2, a3]
#incorrect, it produces a 2-d array, [["b",1], ["b",2] ...]
   arr.first.delete(arr.first.last)
# just like composition of functions, we evaluate the innermost first.
# chaining these methods applies to the dimisions of the array; arr.first.last 
# refers to the first element (which is an array [b,1]) in the arr array, and
# the last element within that array, 1.
# arr.first.delete(1) deletes all instances of 1 in the first element of arr. There is 
# only one instance of 1, so it simply returns 1 (what was deleted) and the array is mutated.

arr = ["b", "a"]
   arr = arr.product([Array(1..3)])
# This creates [["b",[1, 2, 3]], ["a",[1,2,3]]]
   arr.first.delete(arr.first.last)
# this deletes all instances of [1,2,3] in the first element of arr
# arr = [["b"], ["a",[1,2,3]]]

##3
arr = [["test", "hello", "world"],["example", "mem"]]
arr.flatten!
puts arr.at(3)

##4
arr = [15, 7, 18, 5, 12, 8, 5, 1]

arr.index(5)
# Returns the index of the specified element, so this might return 3 (and not 6, because 
# it returns just the first instance
#arr.index[5]
# couldn't find this in ruby documentation. error?
# yes error
arr[5]
# the object at index 5, so 8

##5
string = "Welcome to America!"
a = string[6]
# e
b = string[11]
# A
c = string[19]
# c = nil
puts a

##6
# you can't call the value in that way, you have to call the index of the value 
# that you want to change, so in this case, you'd call [3] to change margaret
names = ['bob', 'joe', 'susan', 'margaret']
names[3] = 'jody'
p names

##7
# use names from above
names.each_with_index{|v,i| puts "My ##{i} favorite person is #{v}"}

##8
nums = [3,30,34,69]
nums_incremented = nums.map{|n| n+2}
p nums
p nums_incremented