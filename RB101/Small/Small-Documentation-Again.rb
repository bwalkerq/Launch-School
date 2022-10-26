=begin 
::path - class method (called on a class)
Returns the string representation of the path
#path - instance method (called on objects)
Returns the pathname used to create file as a string. Does not
normalize the name.
The pathname may not point to the file corresponding to file.
For instance, the pathname becomes void when the file has been
moved or deleted.
I'm not sure I understand #path, but ok!
=end

# 2 Optional Arguments Redux
require 'date'

puts Date.civil                 # default date -4712-01-01
puts Date.civil(2016)           # 2016-01-01
puts Date.civil(2016, 5)        # 2016-05-01
puts Date.civil(2016, 5, 13)    # 2016-05-13


# 3
def my_method(a, b = 2, c = 3, d)
  p [a, b, c, d]
end

my_method(4, 5, 6) # will print 4 5 6 null
# incorrect, prints 4 5 3 6
# wow, I don't get WHY, but I know, from the documentation, that
# 4 is assigned to a, 5 to d, and then since 6 hasn't been assigned, it gets
# assigned to the left-most of the variables with default values. Weird.

# 4 Mandatory Blocks
a = [1, 4, 8, 11, 15, 19]
p a.bsearch{|a| a > 8 }

# 5
a = %w(a b c d e)
#puts a.fetch(7) # an error (not nil), since there is no element higher than index 4
puts a.fetch(7, 'beats me') # beats me, since it's the default value
puts a.fetch(7) { |index| index**2 } # 14 ooops no, 49 rather, since 
# the index 7 is not in range, the block is called

# 6
5.step(to: 10, by: 3) { |value| puts value }
# my guess before reading doc is that this will print 5, 8 on different lines
# couldn't find the documentation for #step itself under array, but it's used 
# with array[index]???
# I was right.
# I *did* check the integer documentation, but I didn't look in Float, Numeric,
# or Math; whoops. This one is located in Numeric

# 7 Parent Class
s = 'abc'
########puts s.public_methods(false).inspect
#puts s.public_instance_method(String).inspect
#puts public_method(s).inspect
# Note that a class (String, in this case), can override the members of its 
# superclass (Object in this case). Takeaway: look at doc for class before 
# superclass.

# 8 Included Modules
a = [5, 9, 3, 11]
puts a.min(2) # this was my guess, I was right
# the takeaway here is that #min was not in the array documentation, and I 
# had to go to the "included modules: enumerables" to find #min
# The feature of including the enumerable modules is Ruby's "mix-in modules" 
# characteristic. 
# takeaway: search both the Parent Class AND the Included Modules in order to find
# the necessary documentation.

# 9 Down the Rabbit Hole
#require 'yaml'
#MESSAGES = YAML.load_file('calculator_messages.yml')
# find the documentation for YAML.load_file
# I remember that this is from rubocop, so this documentation would probably not
# be in the Core, but rather, in the rubocop documentation. [nope]
# it turns out that, no, YAML is not located in rubocop but rather in the 1.8.6
# documentation (at least, maybe elsewhere?)
# damn, yeah, it's located in the most recent 3.1.2, under psych
# I definitely saw a note from the rubydocs search that psych is yaml, or some
# sort like that
