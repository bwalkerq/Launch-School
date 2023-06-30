if false
  greeting = "hello world"
end

p greeting # I expect an error, since false short-circuited the control flow, and 
# greeting was never initialized
# instead, there was nil. hm.
=begin 
solution: 
Typically, when you reference an uninitialized variable, Ruby will raise 
an exception, stating that it’s undefined. However, when you initialize a 
local variable within an if block, even if that if block doesn’t get 
executed, the local variable is initialized to nil.
=end

# 2
greetings = { a: 'hi' }
informal_greeting = greetings[:a]
informal_greeting << ' there'

puts informal_greeting  #  => "hi there"
puts greetings # this puts :a 'hi'

# damn these are indeed hard
# line 18 points the informal variable to the object
# line 19 mutates the object that the informal points to, i.e. the hash value
# the output is :a => 'hi there'

# 3
p "A)"
def mess_with_vars(one, two, three)
  p one.object_id
  one = two
  p one.object_id
  two = three
  three = one
end

one = "one"
two = "two"
three = "three"

mess_with_vars(one, two, three)
p one.object_id

puts "one is: #{one}" 
puts "two is: #{two}" 
puts "three is: #{three}" 
# just one two three; although the variables are used to initialize the values
# being passed into the method (pass by value), the reassignment is only occuring
# in the inner scope of the method and doesn't affect the outer scope assignment

p "B)"
def mess_with_vars(one, two, three)
  one = "two"
  two = "three"
  three = "one"
end

one = "one"
two = "two"
three = "three"

mess_with_vars(one, two, three)

puts "one is: #{one}" 
puts "two is: #{two}"
puts "three is: #{three}"
# for the same reason as A), these inner scope reassignments do not affect
# the outer scope variables' values

p "C)"
def mess_with_vars(one, two, three)
  one.gsub!("one","two") # mutating
  two.gsub!("two","three")
  three.gsub!("three","one")
end

one = "one"
two = "two"
three = "three"

mess_with_vars(one, two, three)

puts "one is: #{one}"
puts "two is: #{two}"
puts "three is: #{three}"
# these values will be the updated two three one, because gsub! is mutating
# and so the objects that the method points two from the parameters are 
# mutated, and therefore the original variables that point to those objects 
# have new values

# I got poned on that

# 4 
def is_an_ip_number?(string)
  string.to_i.between?(0,255)
end

# You're awesome (small)

def dot_separated_ip_address?(input_string)
  dot_separated_words = input_string.split(".")
  return "You need exactly four components for an IP address" if
    dot_separated_words.size != 4
    # I could also just return false here, but I think this is more clear
  while dot_separated_words.size > 0 do
    word = dot_separated_words.pop
    is_an_ip_number?(word) ? true : break
  end
  dot_separated_words.size == 0 ? true : false # note that this only returns
  # false, but doesn't return the reason (that one of the numerical components
# is out of range)
end

p dot_separated_ip_address?("1.5.40.30.50")
p dot_separated_ip_address?("1.5.40")
p dot_separated_ip_address?("1.5.40.250")
p dot_separated_ip_address?("1.5.400.60")

# you're awesome.

# their solution:
def dot_separated_ip_address?(input_string)
  dot_separated_words = input_string.split(".")
  return false unless dot_separated_words.size == 4 

  while dot_separated_words.size > 0 do
    word = dot_separated_words.pop
    return false unless is_an_ip_number?(word) # this is much more elegant
    # than my ternary (which actually required another ternary)
    # I think the take away here is that I can return false at any stage in 
    # the method
  end

  true
end