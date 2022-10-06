#1
loop do
  puts 'Just keep printing...'
  break
end

#2
loop do
  puts 'This is the outer loop.'

  loop do
    puts 'This is the inner loop.'
    break
  end
  break
end

puts 'This is outside all loops.'

#3
times_done = 1

loop do 
  puts "Number of times_done = #{times_done}"
  break if times_done > 4
  times_done += 1
end
# this was a nice solution, I didn't have a way to do it without changing the type of loop

#4 did in irb

#5
say_hello = 1

while say_hello <6
  puts 'Hello!'
  say_hello +=1
end
# solution introduced another variable, count, to do the same thing that I did with 
# assigning numbers to say_hello

#6
numbers = [*0..99]
n = 1

while n <6
  p numbers.sample
  n +=1
end
# submitted

#7
count = 10

until count == 0
  puts 11 - count
  count -= 1
end
#also submitted

p "#8 use until loop to print each"
numbers = [7, 9, 13, 25, 18]
count = 0
until count == numbers.count
  p numbers[count]
  count += 1
end

#9
for i in 1..100
  puts i if i%2==1
  puts i if i.odd?
end

#10
friends = ['Sarah', 'John', 'Hannah', 'Dave']
for i in friends do
  puts "Hello, #{i}!"
end
# I had to remember (read) that after the reserved word in goes a collection of elements
# like an array, and then we iterate the do over the whole collection