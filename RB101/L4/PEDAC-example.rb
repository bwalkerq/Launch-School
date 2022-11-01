# I created this before watching the videos for the PEDAC example
# it worked, with very minimal debugging; actually, all test cases worked 
# without any bugs
# I am very proud
# You're awesome. (Also, PEDAC process is slow but smooth, and smooth is fast)

evens_array = []

def number_of_evens_to_populate(row_number)
  number_of_evens = 0
  counter = 1
  row_number.times do
    number_of_evens += counter
    counter += 1 
  end
  number_of_evens
end

def populate_array_with_evens(number_of_evens, array)
  even_number = 2
  number_of_evens.times do
    array << even_number
    even_number += 2
  end
  array
end

def sum_the_last_n_evens(array, row_number)
  sum = 0
  index = -1
  row_number.times do
    sum += array[index]
    index += -1
  end
  sum
end
# test
n = 5

p populate_array_with_evens(number_of_evens_to_populate(n),evens_array)
p sum_the_last_n_evens(evens_array,n)