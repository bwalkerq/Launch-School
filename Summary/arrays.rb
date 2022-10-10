pets = ['cat', 'dog', 'fish', 'lizard']
my_pet = pets[2]
p "I have a pet #{my_pet}"

#2
pets = ['cat', 'dog', 'fish', 'lizard']
my_pets = pets[2,3]
p "My pets are a #{my_pets[0]} and a #{my_pets[1]}"
# remember that only double quotes allow for escaping (and therefore string
# interpolation)
#3
my_pets.pop
p my_pets

#4
my_pets << pets[1] # also mypets.push(pets[1])
p my_pets

#5
colors = ['red', 'yellow', 'purple', 'green']
colors.each do |x|
  p "I'm the color #{x}!"
end

#6
numbers = [*1..5]
doubled_numbers = numbers.map do |n| # note that .map iterates (like .each) and
  # returns an array.
  # .each returns the original array
  n*2
end
p doubled_numbers

#7
numbers = [5, 9, 21, 26, 39]
divisible_by_three = numbers.select {|x| x % 3 == 0}
p divisible_by_three

#8
favorites = [['Dave', 7], ['Miranda', 3], ['Jason', 11]]
p favorites.flatten

#somehow I got the numbering off

#10
array1 = [1, 5, 9]
array2 = [1, 9, 5]
p array1 == array2