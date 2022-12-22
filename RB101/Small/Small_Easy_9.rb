def greetings(array, hash)
  "What's up #{array.join(" ")}! Glad you're here with all your #{hash[:title]} #{hash[:occupation]} knowledge."
end

p greetings(['John', 'Q', 'Doe'], { title: 'Master', occupation: 'Plumber' })
# => "Hello, John Q Doe! Nice to have a Master Plumber around."

def halves_equal?(integer)
  string = integer.to_s
  string[0, string.length/2] == string[string.length/2, string.length/2]
end

def twice(integer)
  if integer.to_s.length.even? && halves_equal?(integer)
    integer
  else
    integer * 2
  end
end

p twice(37) == 74
p twice(44) == 44
p twice(334433) == 668866
p twice(444) == 888
p twice(107) == 214
p twice(103103) == 103103
p twice(3333) == 3333
p twice(7676) == 7676
p twice(123_456_789_123_456_789) == 123_456_789_123_456_789
p twice(5) == 10

def negative(integer)
  return 0 if integer == 0
  integer < 0 ? integer : -integer
end

p negative(5) == -5
p negative(-3) == -3
p negative(0) == 0      # There's no such thing as -0 in ruby


def sequence(integer)
  case
  when integer >= 0
    (1..integer).to_a
  when integer < 0
    (integer..-1).to_a
  end
end

p sequence(5) == [1, 2, 3, 4, 5]
p sequence(3) == [1, 2, 3]
p sequence(1) == [1]
p sequence(-5)

def uppercase?(string)
  string == string.upcase
end

p uppercase?('t') == false
p uppercase?('T') == true
p uppercase?('Four Score') == false
p uppercase?('FOUR SCORE') == true
p uppercase?('4SCORE!') == true
p uppercase?('') == true

def word_lengths(string)
  array = string.split
  array.map do |word|
    word + " #{word.length}"
  end
end
p word_lengths("cow sheep chicken") == ["cow 3", "sheep 5", "chicken 7"]

p word_lengths("baseball hot dogs and apple pie") ==
  ["baseball 8", "hot 3", "dogs 4", "and 3", "apple 5", "pie 3"]

p word_lengths("It ain't easy, is it?") == ["It 2", "ain't 5", "easy, 5", "is 2", "it? 3"]

p word_lengths("Supercalifragilisticexpialidocious") ==
  ["Supercalifragilisticexpialidocious 34"]

p word_lengths("") == []

def swap_name(string)
  name = string.split
  name[1] + ", #{name[0]}"
end

p swap_name('Joe Roberts') == 'Roberts, Joe'

def sequence_2(count, incrementer)
  result = []
  count.times do |index|
    result << incrementer * (index+1)
  end
  result
end

p "tests"
p sequence_2(5, 1) == [1, 2, 3, 4, 5]
p sequence_2(4, -7) == [-7, -14, -21, -28]
p sequence_2(3, 0) == [0, 0, 0]
p sequence_2(0, 1000000) == []

def get_grade(x,y,z)
  average = (x + y + z) / 3
  case
  when average > 90
  "A"
  when average > 80
  "B"
  when average > 70
  "C"
  when average > 60
  "D"
  when average < 60
  "F"
  end
end

p "grades"
p get_grade(95, 90, 93) == "A"
p get_grade(50, 50, 95) == "D"

# def buy_fruit(array)
#   bag = []
#   array.each do |sub_array|
#     sub_array[1].times do
#       bag << sub_array[0]
#     end
#   end
#   bag
# end

def buy_fruit(array)
  array.map { |fruit, count| [fruit] * count }.flatten # wow!
end

p "fruit"
p buy_fruit([["apples", 3], ["orange", 1], ["bananas", 2]]) #==
  ["apples", "apples", "apples", "orange", "bananas","bananas"]

words =  ['demo', 'none', 'tied', 'evil', 'dome', 'mode', 'live',
          'fowl', 'veil', 'wolf', 'diet', 'vile', 'edit', 'tide',
          'flow', 'neon']

# iterate through each word
# break it into characters, then sort the characters (alphabetize) and compare
# equality to other #chars#sort words. those words get << into the same array group
# next word, check if it's included in previous arrays (I don't know how to keep track of these arrays)
# if so, move on, if not, same process, new array of matches

def anagrams(array)
  result_hash = {}
  array.each do |word|
    next if result_hash.values.flatten.include?(word)
    result_hash[word.to_sym] = []
    array.each do |word_2|
      result_hash[word.to_sym] << word_2 if word.chars.sort == word_2.chars.sort
    end
  end
  result_hash.values
end

p anagrams(words)
















