#1
sun = ['visible', 'hidden'].sample

if sun == 'visible'
  puts "bright!"
end

#2
unless sun == 'visible'
  puts 'the clouds are blocking my shit'
end

#3
puts "bright as fuck out here" if sun == 'visible'
puts "clouds blocking my shit" unless sun == 'visible'

#4
boolean = [true, false].sample
boolean ? response = "I'm true" : response = "I'm false"
puts response

#5 since everything in Ruby is truty except false and nil, this will run 
# the if result
number = 7

if number
  puts "My favorite number is #{number}."
else
  puts "I don't have a favorite number."
end

#6 
stoplight = ['green', 'yellow', 'red'].sample

case stoplight
  when 'green' 
    puts 'go!'
  when 'yellow'
    puts 'slow that shit down'
  when 'red'
    puts 'stop yourself before you bop yourself'
end

#7
if stoplight == 'green' 
  puts 'go!'
elsif stoplight == 'yellow'
  puts 'slow that shit down'
else
  puts 'stop yourself before you bop yourself'
end

#8

def go 
  status = ['awake', 'tired'].sample
  if status == 'awake'
    return 'be awesome' #remember that I don't need to use return here; it's redundant
  else
    return 'give your body rest'
  end
end
x = go
p x

# wow, nuts solution, I've never seen something like this
status = ['awake', 'tired'].sample
alert = if status == 'awake' # specifically this assignment of a contidional
  #to a variable (the spacing is whack)
          'Be productive!'
        else
          'Go to sleep!'
        end

puts alert
# overall, this makes sense, and it's nice to see that you can assign the 
# result of a conditional like this, but I like my solution better, but the 
# best solution is probably 

bing = 
if status == 'awake'
  'Be productive!'
else
  'Go to sleep!'
end

puts bing

#9 classic mistake of = should be ==
# I've already made this mistake on something above
# and assignment of a variable is evaluated as a true (cause everything truthy)
number = rand(10)

if number == 5
  puts '5 is a cool number!'
else
  puts 'Other numbers are cool too!'
end

#10 reformat to take up 5 lines only
stoplight = ['green', 'yellow', 'red'].sample

case stoplight
  when 'green' then puts 'Go!'
  when 'yellow' then puts 'Slow down!'
  else puts 'Stop!'
end
# Ruby's error messages are very helpful, I wouldn't have known to use the 
# reserved work 'then' along with 'when' on the same line