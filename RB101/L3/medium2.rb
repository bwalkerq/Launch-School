# 1 
a = "forty two"
b = "forty two" # I think, unlike immutable numbers, that Ruby gives these
# two identical strings unique object IDs. so they will be different.
c = a # this causes c to point to the same string object as a
d = 34
e = 34
puts a.object_id # some number
puts b.object_id # some other number
puts c.object_id # same as a
puts d.object_id # some number for the immutable number 34
puts e.object_id # same as d

# You're awesome

# 2
# OMG I just did this above. All the same ob ID
a = 42
b = 42
c = a

puts a.object_id
puts b.object_id
puts c.object_id

# You're awesome

# 3
def tricky_method(a_string_param, an_array_param)
  a_string_param += "rutabaga" # I'm pretty sure this will not mutate the string
  an_array_param << "rutabaga" # mutates the array
end

my_string = "pumpkins"
my_array = ["pumpkins"]
tricky_method(my_string, my_array)

puts "My string looks like this now: #{my_string}" # same as before
puts "My array looks like this now: #{my_array}" # two-element array now

# you're awesome

# 4
def tricky_method_two(a_string_param, an_array_param)
  a_string_param << 'rutabaga' # mutating
  an_array_param = ['pumpkins', 'rutabaga'] # non-mutating, only reassigns
  # within the method
end

my_string = "pumpkins"
my_array = ["pumpkins"]
tricky_method_two(my_string, my_array)

puts "My string looks like this now: #{my_string}"
puts "My array looks like this now: #{my_array}"

# You're awesome

# 5
def tricky_method(a_string_param, an_array_param)
  a_string_param += "rutabaga"
  an_array_param << "rutabaga" # I don't know how to add an element without
  # mutating the array
  # if I reassigned to pumpkins and rutabega, it would work only in this instance.

end

my_string = "pumpkins"
my_array = ["pumpkins"]
my_array = tricky_method(my_string, my_array) # the return of this method is the last line
# evaluated, I could use it for reassignment of my array, but what about the string?

puts "My string looks like this now: #{my_string}"
puts "My array looks like this now: #{my_array}"

#only half done

# their solution:
def not_so_tricky_method(a_string_param, an_array_param)
  a_string_param += "rutabaga"
  an_array_param += ["rutabaga"] # I didn't know that += worked for arrays!
  # I looked for it and it didn't show up, that's annoying

  return a_string_param, an_array_param # I was on to something like this in
  # my notes above, but I didn't know that returning two values, with a comma
  # was possible. wow
  # honestly I'm glad I looked at the solution when I did, I never would 
  # have figured this out
end

my_string = "pumpkins"
my_array = ["pumpkins"]
my_string, my_array = not_so_tricky_method(my_string, my_array)
# wow I didn't know that you can do multiple assignments like this

puts "My string looks like this now: #{my_string}"
puts "My array looks like this now: #{my_array}"


# 6
def color_valid(color)
  %w(blue green).include?(color) ? true : false # I like mine better
end
p color_valid("red")
p color_valid("blue")

# You're awesome

# their solution
def color_valid(color)
  color == "blue" || color == "green" # this is shorter, but less clear
end
p color_valid("red")
p color_valid("blue")

