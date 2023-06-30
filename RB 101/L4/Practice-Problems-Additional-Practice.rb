# 1
flintstones = ["Fred", "Barney", "Wilma", "Betty", "Pebbles", "BamBam"]

flintstones_hash = Hash.new

flintstones.each_with_index do |value, index|
  flintstones_hash[value] = index
end
p flintstones_hash

# You're awesome

# 2
ages = { "Herman" => 32, "Lily" => 30, "Grandpa" => 5843,
   "Eddie" => 10, "Marilyn" => 22, "Spot" => 237 }

p ages.values.sum
p ages.values.inject(:+) # nice

# 3
p ages.delete_if { |_, value| value >= 100 }

# You're awesome

# 4
p ages.values.min

# 5
flintstones = %w(Fred Barney Wilma Betty BamBam Pebbles)
p flintstones.index { |x| x.start_with?('Be') }
p flintstones.index { |name| name[0, 2] == 'Be' } # their solution is nice to
# fetch a part of the string

# 6
p flintstones.map! { |name| name[0,3]}

# You're awesome

# 7
statement = "The Flintstones Rock"
frequency_of_letters = Hash.new
statement_array = statement.chars
statement_array.each do |letter| 
  if frequency_of_letters.key?(letter)
    frequency_of_letters[letter] += 1
  elsif frequency_of_letters[letter] = 1
  end
end
p frequency_of_letters.sort.to_h # I would like to organize these, I know there's a 
# method for this.

# their solution:
result = {}
letters = ('A'..'Z').to_a + ('a'..'z').to_a
# I really like that they built the alpha array first
# and then compared the string to the full array
letters.each do |letter|
  letter_frequency = statement.count(letter)
  result[letter] = letter_frequency if letter_frequency > 0
  # wow this is lovely, if letter frequency > 0
  # also String#frequency is dope
end

# You're awesome

# 8
numbers = [1, 2, 3, 4, 5 ,6, 7, 8]
numbers.each do |number|
  p number
  numbers.shift(1)
end
# this would output 1,2,3,4, and return []
# wow so wrong
# took me quite a while and eventually I made sense of this with the debugger
# Array#each iterates through each index, rather than keeping
# track of the unique elements and iterating on each element, so 
# iterating on each index means that when we shift out the element at index 0
# then the element previously at index 1 is now aat 0, but #each moves on to index 1
# and the element that was previously at 1 is never iterated upon. nuts
# takeaway never iterate on an array while you're taking elements out of it
# if you want to iterate on each element.

p numbers

numbers = [1, 2, 3, 4, 5,6,7,8]
numbers.each do |number|
  p number
  numbers.pop(1)
end
p numbers

# 9 
def titleize (string)
  array = string.split.each { |word| word.capitalize!}
  array.join(" ")
end
words = "the flintstones rock"
p titleize(words)

# You're awesome

# 10
munsters = {
  "Herman" => { "age" => 32, "gender" => "male" },
  "Lily" => { "age" => 30, "gender" => "female" },
  "Grandpa" => { "age" => 402, "gender" => "male" },
  "Eddie" => { "age" => 10, "gender" => "male" },
  "Marilyn" => { "age" => 23, "gender" => "female"}
}
munsters.map do |key, value|
  case value["age"]
  when (0..17)
    value["age_group"] = "kid"
  when (18..64)
    value["age_group"] = "adult"
  when (65..)
    value["age_group"] = "senior"
  end
end
p munsters
=begin 
  WOW this took a long time for me to get right, but in my defense, we haven't been
  using hashes hardly at all, and certainly not hashes with multiple values 
  assigned to keys
    munsters.each_pair do |key, value|
      puts value["age"]
    end
  This I used to figure out how to call the values
  Then practice with indexed assignment. No problem
=end

# You're awesome!