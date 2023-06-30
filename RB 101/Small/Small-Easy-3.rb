NUMS_FOR_CHOICES = %W(1st 2nd 3rd 4th 5th last)

def choose_five_numbers
  five_choices = []
  last_number = 0
  6.times do |index|
    puts "Enter the #{NUMS_FOR_CHOICES[index]} number:"
    number_entered = gets.chomp.to_i
    five_choices << number_entered if index <= 4
    last_number = number_entered if index == 5
  end
  if five_choices.include?(last_number)
    puts "The number #{last_number} appears in #{five_choices}"
  else
    puts "The number #{last_number} does NOT appear in #{five_choices}"
  end
end

# choose_five_numbers
# remember that #include? has a ?; I got thrown off because #include turned 
# green but #include? stayed blue

# 2 
def arithmetic_integer
  puts "==> Enter the first number:"
  x = gets.chomp.to_i
  puts "==> Enter the second number:"
  y = gets.chomp.to_i

  puts "==> #{x} + #{y} = #{x + y}"
  puts "==> #{x} - #{y} = #{x - y}"
  puts "==> #{x} * #{y} = #{x * y}"
  puts "==> #{x} / #{y} = #{x / y}"
  puts "==> #{x} % #{y} = #{x % y}"
  puts "==> #{x} ** #{y} = #{x ** y}"
end
# arithmetic_integer

# 3 
def counting_number_of_characters
  puts "Please write word or multiple words:"
  input = gets.chomp
  number_of_characters = input.delete(' ').size
  puts "There are #{number_of_characters} characters in #{input}"
end
# at first I used Array#split#join to get rid of the spaces, but #delete is 
# much better

# 4 
def multiply(x,y)
  x * y
end

# 5
def square(n)
  multiply(n,n)
end
p square(5)

def nth_power(base,power)
  x = base
  result = 1
  power.times do |index|
    result = multiply(result,x)
  end
  result
end
p nth_power(2,5)
# somewhat annoying to code this, but good practice

# 6
def xor? (x,y)
  ( x && y == false ) || ( x == false && y ) 
end
p xor?(5.even?, 4.even?) == true
p xor?(5.odd?, 4.odd?) == true
p xor?(5.odd?, 4.even?) == false
p xor?(5.even?, 4.odd?) == false

# 7 
def oddities1 (array)
  array.select{|x| array.index(x).even?}
end

def oddities (array)
  odds = []
  array.length.times do |index|
  element = array.shift
  odds << element if (index - 1).odd?
  end
  odds
end

p oddities([2, 3, 4, 5, 6])     == [2, 4, 6]
p oddities([1, 2, 3, 4, 5, 6])  == [1, 3, 5]
p oddities(['abc', 'def'])      == ['abc']
p oddities([123])               == [123]
p oddities([])                  == []
p oddities([1, 2, 3, 4, 1])     == [1, 3, 1]

p "#8"
def palindrome?(string)
  string.reverse == string
end

p palindrome?('madam') == true
p palindrome?('Madam') == false          # (case matters)
p palindrome?("madam i'm adam") == false # (all characters matter)
p palindrome?('356653') == true

def palindrome_array?(array)
  # array.join.reverse == array.join
  array.to_s == array.reverse.to_s
end
p "palindrome_array?"
p palindrome_array?([2,3,4,3,2]) == true
p palindrome_array?([2,30,4,3,2]) == false
p palindrome_array?(['symbol', 1, 'lobmys']) #== true
p palindrome_array?(['symbol', 1, 'lobmys']) #== true
p [2,3,4].join
# p "2,3,4".join #join doesn't work for strings
# p ["symbol", 1, 'lobmys'].to_s #to_s for arrays returns some crazy / values
# I couldn't quite fully implement a method that took both a string and
# an array, when the array had strings as elemnts.

p "#9"
def real_palindrome?(string)
  palindrome?(string.downcase.delete "," "'" " ")
end

p real_palindrome?('Madam') == true           # (case does not matter)
p real_palindrome?('madam') == true
p real_palindrome?("Madam, I'm Adam") == true # (only alphanumerics matter)
p real_palindrome?('356653') == true
p real_palindrome?('356a653') == true
p real_palindrome?('123ab321') == false

puts '#10'
def palindromic_number?(num)
  palindrome?(num.to_s)
end

p palindromic_number?(34543) == true
p palindromic_number?(123210) == false
p palindromic_number?(22) == true
p palindromic_number?(5) == true
p palindromic_number?(0005000) == true
# something happens with OH I bet it's binary! oh
#  crap no, it can't be because 5 is too large
# ...hm.. but something happnes with numbers with starting zeros...
# I could stip the leading and trailing zeros BUT there is an edge case that
# sucks, such as 00550, which is NOT palindromic but will return true if 
# zero are stripped.