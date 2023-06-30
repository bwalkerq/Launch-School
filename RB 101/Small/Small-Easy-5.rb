
# 1 
def ascii_value(string)
  return 0 if string == ''
  array = string.chars.map { |x| x.ord}
  array.inject(:+)
end

p ascii_value('Four score') == 984
p ascii_value('Launch School') == 1251
p ascii_value('a') == 97
p ascii_value('') == 0

# You're awesome

# their solution slick
def ascii_value(string)
  sum = 0
  string.each_char { |char| sum += char.ord } # slick AF
  # mine makes an array and injects the values, but this is faster and less cumbersome
  sum
end

# Further 
char = 'h'
p char.ord.chr == char

# 2 After midnight
=begin  
input: integer number of minutes, negative for before midnight, positive for after
output: hh:mm 24-hour format for time of day

data structures and algorithm
probably stay within integers an 1-3 local variables
1 variable to store the hours, 1 variable for the chopped minutes (modulo?)
the hours variable resets after 24 hours (mod again?)
maybe #divmod that returns [quotient, remainder]
=end


def time_of_day(integer)
  hours_and_minutes = integer.divmod(60)
  hours_and_minutes[0] %= 24
  result = hours_and_minutes.map do |x|
    x.to_s.rjust(2, '0') # I had to search engine how to do this one.
    # I didn't see the hint about Kernal#format, so I'll try that for next time
  end
  result[0] + ':' + result[1]
end

p time_of_day(0) == "00:00"
p time_of_day(-3) == "23:57"
p time_of_day(35) == "00:35"
p time_of_day(-1437) == "00:03"
p time_of_day(-3000) == "02:00"
p time_of_day(800) == "13:20"
p time_of_day(-4231) == "01:29"

# You're awesome, and also lucky. I was totally surprised that my method 
# worked for negative values! I don't yet understand how modulo arithmetic 
# works for negative numbers
p -3.divmod(60) # [-1, 57] even though -3/60 = 0 BUT ACTUALLY
# because ruby "floors" each result, -3/60 = -1, since -0.something rounds down 
p -63.divmod(60)
# Ok now I understand division and modulo better, in ruby (everything rounds
# down), but I don't understand why my method works for negative values, other
# than it probably has to do with the % 24 to translate days to mod hours
p -25 % 24 == 23
p (-48 - 2) % 24 #== 2
# after doing many tests with negative values, I understand that, basically, 
# a neg mod a positive works, uh, the way that the problem described, i.e. the
# way that I wanted modulo to work. 
# -50 hours is 2 days ago, and 2 hours back beyond that. which, on a 24 hour 
# clock is 22 o'clock. but why -2 % 24 = 22 is wild to me, because I would think
# of it as -2 goes into 24 0 times with -2 left over; but instead the result is
# 0 time with positive 22 left over. weird.
# the way I can think of this is: add a whole 1 (in this case, 24) to the dividend
# to make it positive, then take the mod from there. uh, ok! Mod is cool!

# I'm ducking learning about Time Classes right now; hope I don't regret this lol

puts "# 3 after midnight part 2"
def after_midnight(time)
  # array = time.split(':')
  # array = array.map { |x| x.to_i}
  hours, minutes = time.split(':').map(&:to_i) # refactored this based on given
  # solution. It's really smooth that multiple variables can be assigned values 
  # from the array that's created
  # also they chained all of my methods, and used that sick notation (&:to_i)
  # damn
  (hours % 24 * 60) + minutes
end

def before_midnight(time)
  return 0 if after_midnight(time) == 0 
  (24 * 60) - after_midnight(time)
end

p after_midnight('00:00') == 0
p before_midnight('00:00') == 0
p after_midnight('12:34') == 754
p before_midnight('12:34') == 686
p after_midnight('24:00') == 0
p before_midnight('24:00') == 0

puts "#4 Letter Swap"
def swap(string)
  string = string.split.map do |word| 
    # first = word[0]
    # last = word[-1]
    # word[0] = last
    # word[-1] = first
    word[0], word[-1] = word[-1], word[0] # impressive, I didn't realize this
    # was a thing
    word
  end
  string.join(' ')
end

p swap("what is up doc")
p swap('Oh what a wonderful day it is') == 'hO thaw a londerfuw yad ti si'
p swap('Abcde') == 'ebcdA'
p swap('a') == 'a'

p "# 5 clean up the words"
def cleanup(string)
  string.gsub(/[^a-z]/, ' ').squeeze('^a-z')
end
p cleanup('---&*heeeeeelo')
p cleanup("---what's my +*& line?") #== ' what s my line '
p "*asdf*".gsub(/[^a-z]/, ' ')

# You're awesome
# I'm proud of myself for reading the regexp documentation and figuring this
# out without help/hints

puts ""
puts "#6 Letter Counter 1"

def word_sizes(string)
  lengths_hash = Hash.new(0) # I refactored this from the solution to have
  # a default value of 0 for any value, which is slick. I had addressed this
  # using a ternary, where it set the count equal to 1 in the first intance
  # and then incremented after that, but this is more elegant
  string.split.each do |word|
    #lengths_hash.key?(word.length) ? lengths_hash[word.length] += 1 : lengths_hash[word.length] = 1
    lengths_hash[word.length] += 1
  end
  lengths_hash
end

p word_sizes('Four score and seven.') == { 3 => 1, 4 => 1, 5 => 1, 6 => 1 }
p word_sizes('Hey diddle diddle, the cat and the fiddle!') == { 3 => 5, 6 => 1, 7 => 2 }
p word_sizes("What's up doc?") == { 6 => 1, 2 => 1, 4 => 1 }
p word_sizes('') == {}

# You're awesome

puts "#7 Letter Counter 2"
def word_sizes(string)
  lengths_hash = Hash.new(0) 
  string.split.each do |word|
    word.delete!('^a-zA-Z') # happy I figured this out on my own
    lengths_hash[word.length] += 1
  end
  lengths_hash
end

p word_sizes('Four score and seven.') == { 3 => 1, 4 => 1, 5 => 2 }
p word_sizes('Hey diddle diddle, the cat and the fiddle!') == { 3 => 5, 6 => 3 }
p word_sizes("What's up doc?") == { 5 => 1, 2 => 1, 3 => 1 }
p word_sizes('') == {}

# You're awesome

puts "#8 Alpha Numbers"
NUMBER_WORDS = %w(zero, one, two, three, four, five, 
  six, seven, eight, nine, ten, eleven, twelve, thirteen, fourteen,
  fifteen, sisteen, seventeen, eightteen, nineteen) #forgot that I don't need commas

def alphabetic_number_sort(array_of_integers)
  array_of_words = array_of_integers.map { |num| NUMBER_WORDS[num]}
  sorted_integers = array_of_words.sort.map { |word| NUMBER_WORDS.index(word)}
end

def alphabetic_number_sort(array)
  array.sort_by { |integer| NUMBER_WORDS[integer]} # smooth use of #sort_by
end
p alphabetic_number_sort((0..19).to_a) #== [8, 18, 11, 15, 5, 4, 14, 9, 19, 1, 7, 17, 6, 16, 10, 13, 3, 12, 2, 0]

puts "#9 ddaaiillyy ddoouubbllee"
=begin  
input: a string with any alpha numeric characters
output: copy of self with any multi-consecutive letters that are the same removed
data: an array, and then maybe sub arrays for the characters
go through each word, and compare the letter to the previous letter; if it's 
the same, then delete it (#select?), and if it's different, keep it. 
=end

def crunch(string)
  crunched_string = ''
  array = string.chars
  array.each_with_index do |character, index|
    previous_character = index == 0 ? nil : array[index - 1]
    if character != previous_character
      crunched_string += character 
    end
  end
  crunched_string
end
# DAMN, the thing I just learned that 
# burned at least an hour or maybe 2 is that #index(argument) returns
# the index of the FIRST (DAMN) the first element matching argument
# so when trying to use this for each element, it needs to be used,
# for example, with an array of each character, rather than pulling the 
# index from the entire string. damn. 

p crunch('ddaaiillyy ddoouubbllee') == 'daily double'
p crunch('4444abcabccba') == '4abcabcba'
p crunch('ggggggggggggggg') == 'g'
p crunch('a') == 'a'
p crunch('') == ''

# You're awesome

# 10 Bannerizer
def print_in_box(string)
  top_and_bottom_dash = ''
  string.length.times { top_and_bottom_dash += '-'}
  middle_space = ''
  string.length.times { middle_space += ' '} 
  puts output_message = <<-MSG
  +-#{top_and_bottom_dash}-+
  | #{middle_space} |
  | #{string} |
  | #{middle_space} |
  +-#{top_and_bottom_dash}-+
   MSG
end

# print_in_box("hey there")
# print_in_box('To boldly go where no one has gone before.')
# print_in_box(" get psyched ")

# You're awesome

# 11 Spin me round
def spin_me(str)
  str.split.each do |word|
    word.reverse!
  end.join(" ")
end

spin_me("hello world") # "olleh dlrow"
=begin Is the returned string the same object 
as what was passed in, or a different object? 

Since #split translates the string object into 
an array with each word as an element, and #join
translates the array of (now reversed words) into
a string, I can't imagine that the returned string
is still the same object. I feel like converting from
string to array to string is going to cause some
new objects to be created.
=end
var = "what's up yo"
new_var = spin_me(var)
puts var.object_id
puts new_var.object_id

# You're awesome