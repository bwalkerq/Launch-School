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

def sequence(count, incrementer)
  result = []
  count.times do |index|
    result << incrementer * (index+1)
  end
  result
end

p "tests"
p sequence(5, 1) == [1, 2, 3, 4, 5]
p sequence(4, -7) == [-7, -14, -21, -28]
p sequence(3, 0) == [0, 0, 0]
p sequence(0, 1000000) == []


























