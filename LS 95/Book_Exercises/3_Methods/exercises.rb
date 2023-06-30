#1
def greet(name = "Tybo")
  greeting = "why, hello there, #{name}"
  puts greeting
  greeting
end
greet

#2
=begin 
1. x = 2
2
2. puts x = 2
nil
3. p name = "Joe"
"joe" because p returns the evaluation
4. four = "four"
"four" (same as #1)
5. print something = "nothing" 
nil? yes
=end

##3
def multiply (x,y)
  x*y
end
puts multiply(3,4)

#4
def scream(words)
  words = words + "!!!"
  return
  puts words
end

scream("get psyched") 
#will not print because the explicit return exits the method

##5
def scream(words)
  words = words + "!!!"
  puts words
end

scream("get psyched") 
#the return is nil, since puts returns nil

##6
=begin
ArgumentError: wrong number of arguments (1 for 2)
  from (irb):1:in `calculate_product'
  from (irb):4
  from /Users/username/.rvm/rubies/ruby-2.5.3/bin/irb:12:in `<main>'
The user only put in one number to be multiplied into the method calculate_product
=end