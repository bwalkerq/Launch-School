#1
count = 1

loop do
  puts "#{count} is odd" if count.odd?
  puts "#{count} is even" if count.even?
  count += 1
  break if count == 6
end

#2
loop do
  number = rand(100)
  puts number
  #break if number <= 10 && number >= 0
  break if number.between?(0,10) # this is more elegant
end

#3
process_the_loop = [true, false].sample

if process_the_loop
  loop do
    p "the loop was processed" 
    break
  end
else 
  p "the loop wasn't processed"
end

#4 did in irb, i did an else statement, but that's not necessary, could just write 
# another puts after the if statement

#5
=begin
numbers = []

loop do
  puts 'Enter any number:'
  input = gets.chomp.to_i
  numbers << input
  break if numbers.count == 5
end
puts numbers
=end

#6
names = ['Sally', 'Joe', 'Lisa', 'Henry']
loop do
  #p names.first
  #names.shift
  p names.shift #more elegant
  #break if names.size == 0
  break if names.empty? #more elegant
end

#7 The method below counts from 0 to 4. Modify the block so that 
# it prints the current number and stops iterating when the current number equals 2.
5.times do |index|
  p index
  break if index ==2
end
# if index == 4 it will count all 5 numbers
# if index <7 it will break after one iteration

p "#8"
number = 0

until number == 10
  number += 1
  next if number.odd?
  puts number
end

p "#9"
number_a = 0
number_b = 0

loop do
  number_a += rand(2)
  number_b += rand(2)
  next unless (number_a == 5 || number_b == 5) #I originally used if instead
  # of unless, and also put less than, 
  # it waited until both were 5 or more?
  puts number_a
  puts number_b
  puts "5 was reached!"
  break
end

#10
def greeting
  puts 'Hello!'
end

number_of_greetings = 2
while number_of_greetings > 0
  greeting
  number_of_greetings -= 1
end