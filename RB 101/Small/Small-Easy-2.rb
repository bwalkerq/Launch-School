def teddys_age
  puts "Teddy is #{rand(20..200)} years old!"
end
teddys_age

# How big is the room?
def area
  puts "Enter the length of the room in meters:"
  length = gets.chomp.to_i
  puts "Enter the width of the room in meters:"
  width = gets.chomp.to_i
  puts "The area of the room is #{length*width} square meters
   (#{length*width*10.7639} square feet)."
end

# You're awesome

#3 Tip Calculator
def tip_calculator(bill=69, tip_percentage=20)
  puts "What is the bill?"
  bill = gets.chomp.to_i
  puts "What is the tip percentage?"
  tip_percentage = gets.chomp.to_f / 100
  tip = bill*tip_percentage
  puts "The tip is $#{'%.2f' % tip} \nThe total is $#{'%.2f' % (bill+tip)}"
end

# Very cool string format operator that I learned, with documentation to choke
# a cow, but awesome. the bite-size take-away is '%.2f' stores an operator 
# within % and then to format a string (or I guess, a float in this case also works)
# you simply operate on the object like '%.2f' % tip in line 25 above

# You're awesome

# 4 When will I retire?
def retire(age=35, target_retirement=50)
  difference = target_retirement - age
  current_year = Time.new.year
  puts "It's #{current_year}. You will retire in #{current_year + difference} \n
  You have only #{difference} years of work to go! This isn't depressing!"
end

# You're awesome

# 5
def prompt(message)
  puts "==> " + message
end

def fucking_funny_greeter
  prompt("Hey there, what's your name?")
  name = gets.chomp 
  if name.include?('!')
    prompt("HELLO #{name.upcase}. WHY ARE WE SCREAMING?")
  else
    prompt("Well, hello, #{name}")
  end
end

# You're awesome

# 6 
nums = Array.new(99) {|index| index + 1}
nums.each {|x| puts x if x.odd?}
# You're awesome

#solution attempt with Integer#upto
1.upto(99) {|i| p i if i.odd?} # I like this much better than mine; unless
# an array is going to be referenced later, this is smoother

# 7
2.upto(99) {|i| p i if i.even?}
# dope

# 8 Sum or Product of Consecutive Integers
def sum_or_product_from_1
  prompt("Please enter an integer greater than 0:")
  number = gets.chomp.to_i
  prompt("Enter 's' to compute the sum, 'p' to compute the product.")
  choice = gets.chomp.downcase
  case choice
  when "s"
    #1.upto(number) {|i| sum += i}
    sum = (1..number).inject(:+)
    puts "The sum of the integers between 1 and #{number} is #{sum}"
  when "p"
    #1.upto(number) {|i| product *= i}
    product = (1..number).inject(:*)
    puts "The product of the integers between 1 and #{number} is #{product}"
  end
end
#sum_or_product_from_1

# You're awesome. Used 'return' within the case statement at first rather 
# than puts. 
# refactored to use Enumerable#inject, fucking dope

# Their solution is nice because they extract the two operations as 
# individual methods, which makes sense and makes cleaner.

# 9 String Assignment
name = 'Bob'
save_name = name
name.upcase!
puts name, save_name
# This prints BOB BOB because upcase! mutates the original object that both 
# variables are pointing to
# You're awesome

# 10 Mutation
# this is different, where arrays 1 and 2 do not have the same elements
# (array1 has some capital names) because the arrays are separate objects
# when we upcase mutate the elements in 1, the corresponding elements in 2 are 
# not tied to the call of upcase
# fuck
array1 = %w(Moe Larry Curly Shemp Harpo Chico Groucho Zeppo)
array2 = []
array1.each { |value| array2 << value }
array1.each { |value| value.upcase! if value.start_with?('C', 'S') }
puts array2
# well, no. The pushing in line 118 doesn't just pass the values, but actually 
# passes the references to the original string objects. Man, that's fucking 
# annoying. Since the arrays hold the same objects, mutating an object will be 
# reflected in both arrays.
# I did go back and read parts of all three pass by reference/value articles
# but I didn't see any information that addressed this particular situation.