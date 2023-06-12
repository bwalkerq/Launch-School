def step (initial, terminal, step)
  value = initial
  until value > terminal
    yield value
    value += step
  end
  terminal
end

# step(1, 10, 3) { |value| puts "value = #{value}" }

def zip(arr1, arr2)
  result = []
  copy1 = arr1.clone
  copy2 = arr2.clone
  arr1.size.times do
    result << [copy1.shift, copy2.shift]
  end
  result
end
# better done with #each_with_index or, even better, with that plus #with_object

# array = [1, 2, 3]
# p zip(array, [4, 5, 6]) == [[1, 4], [2, 5], [3, 6]]
# p array

def map(arr)
  arr.each_with_object([]) do |elem, result|
    result << (yield elem)
  end
end

# p map([1, 3, 6]) { |value| value**2 } == [1, 9, 36]
# p map([]) { |value| true } == []
# p map(['a', 'b', 'c', 'd']) { |value| false } == [false, false, false, false]
# p map(['a', 'b', 'c', 'd']) { |value| value.upcase } == ['A', 'B', 'C', 'D']
# p map([1, 3, 4]) { |value| (1..value).to_a } == [[1], [1, 2, 3], [1, 2, 3, 4]]

def count(*arg)
  total = 0
  arg.each { |n| total += 1 if yield n }
  total
end

# p count(1, 3, 6) { |value| value.odd? } == 2
# p count(1, 3, 6) { |value| value.even? } == 1
# p count(1, 3, 6) { |value| value > 6 } == 0
# p count(1, 3, 6) { |value| true } == 3
# p count() { |value| true } == 0
# p count(1, 3, 6) { |value| value - 6 } == 3


# iterate through and drop elements that return true; once the block returns false, return all remaining elements as an array
# each with index, while

def drop_while(array)
  index = 0
  array.size.times do
    break unless yield array[index]
    index += 1
  end
  array[index..-1]
end

# p drop_while([1, 3, 5, 6]) { |value| value.odd? } == [6]
# p drop_while([1, 3, 5, 6]) { |value| value.even? } == [1, 3, 5, 6]
# p drop_while([1, 3, 5, 6]) { |value| true } == []
# p drop_while([1, 3, 5, 6]) { |value| false } == [1, 3, 5, 6]
# p drop_while([1, 3, 5, 6]) { |value| value < 5 } == [5, 6]
# p drop_while([]) { |value| true } == []

def each_with_index(arr)
  0.upto (arr.size - 1) do |i|
    yield(arr[i], i)
  end
  arr
end

# result = each_with_index([1, 3, 6]) do |value, index|
#   puts "#{index} -> #{value**index}"
# end
#
# puts result == [1, 3, 6]

def each_with_object(arr, obj)
  arr.each { |n| yield(n, obj) }
  obj
end

# result = each_with_object([1, 3, 5], []) do |value, list|
#   list << value**2
# end
# p result == [1, 9, 25]
#
# result = each_with_object([1, 3, 5], []) do |value, list|
#   list << (1..value).to_a
# end
# p result == [[1], [1, 2, 3], [1, 2, 3, 4, 5]]
#
# result = each_with_object([1, 3, 5], {}) do |value, hash|
#   hash[value] = value**2
# end
# p result == { 1 => 1, 3 => 9, 5 => 25 }
#
# result = each_with_object([], {}) do |value, hash|
#   hash[value] = value * 2
# end
# p result == {}

def max_by(arr) # I would rather use #map
  return nil if arr.empty?
  mapped = []
  arr.each { |x| mapped << yield(x) }
  arr[mapped.index(mapped.max)]
end

#this apparently also works, which is nuts
def max_by(arr)
  arr.inject { |m, e| yield(m) < yield(e) ? e : m }
end

# p max_by([1, 5, 3]) { |value| value + 2 } == 5
# p max_by([1, 5, 3]) { |value| 9 - value } == 1
# p max_by([1, 5, 3]) { |value| (96 - value).chr } == 1
# p max_by([[1, 2], [3, 4, 5], [6]]) { |value| value.size } == [3, 4, 5]
# p max_by([-7]) { |value| value * 3 } == -7
# p max_by([]) { |value| value + 5 } == nil

def each_cons(arr, group_size)
  0.upto(arr.size - group_size) do | i |
    yield(*arr[i, group_size])
  end
end

hash = {}
each_cons([1, 3, 6, 10], 1) do |value|
  hash[value] = true
end
p hash == { 1 => true, 3 => true, 6 => true, 10 => true }

hash = {}
each_cons([1, 3, 6, 10], 2) do |value1, value2|
  hash[value1] = value2
end
p hash == { 1 => 3, 3 => 6, 6 => 10 }

hash = {}
each_cons([1, 3, 6, 10], 3) do |value1, *values|
  hash[value1] = values
end
p hash == { 1 => [3, 6], 3 => [6, 10] }

hash = {}
each_cons([1, 3, 6, 10], 4) do |value1, *values|
  hash[value1] = values
end
p hash == { 1 => [3, 6, 10] }

hash = {}
each_cons([1, 3, 6, 10], 5) do |value1, *values|
  hash[value1] = values
end
p hash == {}













