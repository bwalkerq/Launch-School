# 1 order by decending numeric value
arr = ['10', '11', '9', '7', '8']
p arr.map { |x| x.to_i}.sort.reverse.map { |x| x.to_s }
# OR
p arr.sort_by { |x| -x.to_i} # much better!

# 2 
books = [
  {title: 'One Hundred Years of Solitude', author: 'Gabriel Garcia Marquez', published: '1967'},
  {title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', published: '1925'},
  {title: 'War and Peace', author: 'Leo Tolstoy', published: '1869'},
  {title: 'Ulysses', author: 'James Joyce', published: '1922'}
]
p books.sort_by{ |hash| hash[:published]}

# 3 Access 'g' game
arr1 = ['a', 'b', ['c', ['d', 'e', 'f', 'g']]]
p arr1.last.last.last
p arr1[2][1][3]

arr2 = [{first: ['a', 'b', 'c'], second: ['d', 'e', 'f']}, {third: ['g', 'h', 'i']}]
p arr2[1][:third][0]

arr3 = [['abc'], ['def'], {third: ['ghi']}]
p arr3[2][:third][0][0]

hsh1 = {'a' => ['d', 'e'], 'b' => ['f', 'g'], 'c' => ['h', 'i']}
p hsh1['b'][1]

hsh2 = {first: {'d' => 3}, second: {'e' => 2, 'f' => 1}, third: {'g' => 0}}
p hsh2[:third].key(0)

# 4 change 3 to 4 game
arr1 = [1, [2, 3], 4]
arr1[1][1] = 4
p arr1

arr2 = [{a: 1}, {b: 2, c: [7, 6, 5], d: 4}, 3]
arr2[2] = 4
p arr2 

hsh1 = {first: [1, 2, [3]]}
hsh1[:first][2][0] = 4
p hsh1

hsh2 = {['a'] => {a: ['1', :two, 3], b: 4}, 'b' => 5}
hsh2[['a']][:a][2] = 4
p hsh2

# 5 figure out the age of male members only
munsters = {
  "Herman" => { "age" => 32, "gender" => "male" },
  "Lily" => { "age" => 30, "gender" => "female" },
  "Grandpa" => { "age" => 402, "gender" => "male" },
  "Eddie" => { "age" => 10, "gender" => "male" },
  "Marilyn" => { "age" => 23, "gender" => "female"}
}
total_age = 0
munsters.each_value do |v|
    if v["gender"] == "male"
    total_age += v["age"]
  end
end
p total_age

# 6 
munsters.each do |name, details|
  puts name + " is a #{details["age"]}-year-old #{details["gender"]}."
end

# 7
a = 2
b = [5, 8]
arr = [a, b]

arr[0] += 2
arr[1][0] -= a
# => a = 4, b = 1 - nope
p a, b
p arr
# the value 2 in arr[0] is independent of the variable a. a continues to point to 2, while arr[0] gets
# incremented to 4. In effect we are assigning a new object at that index of the array so that instead
# of arr[0] containing the variable 'a' it now contains 4. We never reference a, so a remains unchanged.
# arr[1][0] gets incremented down from 5 to 3, since a still points to 2, but the array object [5,8] is modified
# so both the variable b and the array arr get modified.
# there was a very similar example from the previous assignment that made it into my notes, but the difference is that
# the variable a pointed to a one-element array, like [2] instead of just 2

# 8 use each to output all the vowels_group from the strings
hsh = {first: ['the', 'quick'], second: ['brown', 'fox'], third: ['jumped'], fourth: ['over', 'the', 'lazy', 'dog']}
p "old try"
vowels_group = []
hsh.each_value do |array|
  array.each do |string|
    string.each_char { |c| vowels_group << c if %w(a e i o u).include?(c) }
  end
end
p vowels_group

# 9 Given this data structure, return a new array of the same structure 
# but with the sub arrays being ordered (alphabetically or numerically
# as appropriate) in descending order.

arr = [['b', 'c', 'a'], [2, 1, 3], ['blue', 'black', 'green']]

arr.map! do |array|
  array.sort.reverse!
end
p arr

# 10
arr = [{a: 1}, {b: 2, c: 3}, {d: 4, e: 5, f: 6}]

arr.map do |hash|
  hash.each do |key, value|
    hash[key] = value + 1
  end
end

# 11 keep only multiples of 3
arr = [[2], [3, 5, 7, 12], [9], [11, 13, 15]]
threes = arr.map do |array|
  array.select do |x|
    x % 3 == 0
  end
end
p threes

# 12 return hash without #to_h
arr = [[:a, 1], ['b', 'two'], ['sea', {c: 3}], [{a: 1, b: 2, c: 3, d: 4}, 'D']]
# expected return value: {:a=>1, "b"=>"two", "sea"=>{:c=>3}, {:a=>1, :b=>2, :c=>3, :d=>4}=>"D"}

def to_a_hash(array)
  new_hash = {}
  array.each do |sub_array|
    new_hash[sub_array[0]] = sub_array[1]
  end
  new_hash
end

modified_array = to_a_hash(arr)
p modified_array

# 13 sort by odd values only (ignore evens)
arr = [[1, 6, 9], [6, 1, 7], [1, 8, 3], [1, 5, 9]]
new_array = arr.sort_by do |array|
  array.select {|x| x.odd?}
end
p new_array

# 14 return an array with uppercase sizes of the veggies and capitalized colors of the fruits
hsh = {
  'grape' => {type: 'fruit', colors: ['red', 'green'], size: 'small'},
  'carrot' => {type: 'vegetable', colors: ['orange'], size: 'medium'},
  'apple' => {type: 'fruit', colors: ['red', 'green'], size: 'medium'},
  'apricot' => {type: 'fruit', colors: ['orange'], size: 'medium'},
  'marrow' => {type: 'vegetable', colors: ['green'], size: 'large'},
}
# map returns an array when called on a hash

array = hsh.map do |k, v|
  case v[:type]
  when 'fruit'
    v[:colors].map { |x| x.capitalize}
  when 'vegetable'
    v[:size].upcase
  end
end
p array

# You're awesome

# 15 return an array containing only hashes where all integers are even
# #all? #even?
arr = [{a: [1, 2, 3]}, {b: [2, 4, 6], c: [3, 6], d: [4]}, {e: [8], f: [6, 10]}]

target = arr.select do |hash|
  hash.all? do |k,v|
    v.all? {|element| element.even?}
  end
end
p target

# You're awesome

# 16 make a UUID
def make_UUID
  hex_digits = ('a'..'f').to_a + ('0'..'9').to_a
  result = hex_digits.sample(8) << '-'
  3.times { result << hex_digits.sample(4) << '-'}
  result << hex_digits.sample(12)
  p result.flatten.join
end
make_UUID

# oy, and you're still awesome
# I learned that range objects are often used when transformed into an array with #to_a; I couldn't get them to work otherwise
# I haven't tried range.New or whatever yet
# I learned that I can merge two arrays simply with the operator +. (wow!)
# I had to flatten the array at the end, which is maybe less cool; I chose not to put time into figureing out how to #<< the elements into the same
# level of the array

# their solution (WOW, sections)
def generate_UUID
  characters = []
  (0..9).each { |digit| characters << digit.to_s }
  ('a'..'f').each { |digit| characters << digit }
  # my creation of the characters was more graceful

  uuid = ""
  sections = [8, 4, 4, 4, 12]
  sections.each_with_index do |section, index|
    section.times { uuid += characters.sample }
    uuid += '-' unless index >= sections.size - 1 #VERY nice touch here, with the index used to prevent a trailing '-'
  end

  uuid
end
# gotta say, not incredibly better than mine, but definitely smoother
