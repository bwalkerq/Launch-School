def print_me
  puts "I'm printing within a method!"
end
print_me

#2
def print_me
  "I'm priting the return value!" # didn't even need the return command
end
puts print_me

#3
def h
  "hello "
end

def w
  "world"
end

#puts (h + w)
#puts "#{h + w}"

#4
def greet
  (h + w)
end
#puts greet

#5
def car(x,y)
  "#{x} #{y}"
end
puts car('Toyota', 'Corolla')

#6 day or night?
daylight = [true, false].sample
def time_of_day(boolean)
  if boolean
    puts "it's daytime"
  else
    puts "nighty night"
  end
end
time_of_day(daylight)

#7 naming animals
def dog(name)
  return name
end

def cat(name)
  return name
end

puts "The dog's name is #{dog('Spot')}."
puts "The cat's name is #{cat("Ginger")}."

#8 Name not found
def assign_name(name='Bob')
  name
end
puts assign_name('Kevin') == 'Kevin'
puts assign_name == 'Bob'

puts "#9 Multiply the sum"
def add(x,y)
  x+y
end
def multiply(x,y)
  x*y
end
puts add(2, 2) == 4
puts add(5, 4) == 9
puts multiply(add(2, 2), add(5, 4)) == 36

puts "#10 random sentence"
names = ['Dave', 'Sally', 'George', 'Jessica']
activities = ['walking', 'running', 'cycling']

def name(x)
  x.sample
end

def activity(x)
  x.sample
end

def sentence(x,y)
  x + " went #{y} today!"
end
puts sentence(name(names), activity(activities))