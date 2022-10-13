var = ""
# I notice I am in the habit of using double quotes (maybe because of JS?)
# and that the solutions almost always use single quotes for strings...
# I just searched and learned that dq allow for string interpolation
# also the escape sequence is different between them
# example
puts 'a\nb' # just print a\nb 
puts "a\nb" # print a, then b at newline 

#2 lol, turns out what I looked up is the point of the next exercise
puts 'It\'s now 12 o\'clock.'
puts "It's now 12 o'clock."
# specifically, sq doesn't allow for escape at all, with the only exception being
# other single quotes
# but apparently, use double quotes for most things

# However! %Q for dq and %q for sq
puts %Q(this isn't time to "mess" around)
puts %q(this isn't time to "mess" around) # wow same result as %Q
# error: puts 'this isn't time to "mess" around'
# error: puts "this isn't time to "mess" around"

#3
name = 'Roger'
p name.downcase == 'RoGer'.downcase
p name.downcase == 'DAVE'.downcase
#OR
p name.casecmp?('RoGer')
p name.casecmp?('DAVE')

#4
name = 'Elizabeth'

puts "Hello, #{name}!"

#5
first_name = 'John'
last_name = 'Doe'
full_name = first_name +" "+ last_name
p full_name

#6
state = 'tExAs'
state.capitalize!
p state

#7
greeting = 'Hello!'
#greeting = 'Goodbye'
# more interesting that reassignment is String#gsub! which allows for replacement of 
# specific characters within the string
greeting.gsub!('Hello!', 'Goodbye!')
puts greeting

#8
alphabet = 'abcdefghijklmnopqrstuvwxyz'
puts alphabet.split('')

#9
words = 'car human elephant airplane'
words.split(' ').each do |x|
  puts x + 's'
end

#10
colors = 'blue pink yellow orange'
# print true if includes yellow
p colors.include?('yellow')
p colors.include?('purple')