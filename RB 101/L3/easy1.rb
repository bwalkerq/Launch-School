numbers = [1, 2, 2, 3]
numbers.uniq

puts numbers # will put original because uniq not mutating

# 2
=begin Describe the difference between ! and ? in Ruby. 
And explain what would happen in the following scenarios:
! is the bang, used for mutation (at end) or negating (at front)
? is used in ternary, as well as for returning booleans with methods

what is != and where should you use it?
is not equal to operator, used to return boolean

put ! before something, like !user_name
turns the object into the negation of its boolean value 

put ! after something, like words.uniq!
often causes the method to become a mutating method

put ? before something
ternary? I don't know

put ? after something
returns boolean? I don't know if it always works like this

put !! before something, like !!user_name
turns the object into their boolean equivalent
=end

# 3
advice = "Few things in life are as important as house training your pet dinosaur."
advice = advice.split
advice [6] = 'urgent'
advice = advice.join(' ')
p advice
# damn
advice = "Few things in life are as important as house training your pet dinosaur."
advice.gsub!('important') # wow. Couldn't find what the g stands for

# 4
numbers = [1, 17, 1, 2, 3, 4, 5]
p numbers.delete_at(1) # deletes at this index, mutating without '!'
numbers.delete(1) # deletes all instances of this element, mutating without '!'
p numbers

# 5
p 42.between?(10,100)
p (10..100).cover?(42) # I've never seen this method.
# the word "cover" has useful imagery to remember this method name

# 6
famous_words = "seven years ago..."
famous_words = "Four score and " + famous_words
p famous_words

famous_words = "seven years ago..."
famous_words.prepend('Four score and ')
p famous_words

# also "Four score and " << famous_words

# 7
flintstones = ["Fred", "Wilma"]
flintstones << ["Barney", "Betty"]
flintstones << ["BamBam", "Pebbles"]
p flintstones.flatten!

# 8
flintstones = { "Fred" => 0, "Wilma" => 1, "Barney" => 2, "Betty" => 3, "BamBam" => 4, "Pebbles" => 5 }
just_barney = flintstones.keep_if{|x,y| x == 'Barney'}.flatten
p just_barney
# jesus F C
# we definitely have not encountered this method
# these exercises seem built to make us method hunt
p flintstones.assoc("Barney")
#=> ["Barney", 2]