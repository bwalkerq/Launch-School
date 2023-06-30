ages = { "Herman" => 32, "Lily" => 30, "Grandpa" => 402, "Eddie" => 10 }
p ages.fetch('Spot', "no spot")
p ages.keep_if{ |x,y| x == 'Spot'}
p ages.key?('Spot')
p ages.include?('Spot')

# 2
munsters_description = "The Munsters are creepy in a good way."
p munsters_description.swapcase
p munsters_description.capitalize
p munsters_description.downcase
p munsters_description.upcase

# 3
ages = { "Herman" => 32, "Lily" => 30, "Grandpa" => 5843, "Eddie" => 10 }
additional_ages = { "Marilyn" => 22, "Spot" => 237 }
p ages.merge!(additional_ages)

# 4
advice = "Few things in life are as important as house training your pet dinosaur."
p advice.include?('Dino') # also #match works

# 5
flintstones = ["Fred", "Barney", "Wilma", "Betty", "BamBam", "Pebbles"]
# arduous
flintstones = %w(Fred, Barney, Wilma, Betty, BamBam, Pebbles)
# smooth

# 6
p flintstones << "Dino"

flintstones = %w(Fred, Barney, Wilma, Betty, BamBam, Pebbles)
p flintstones.push('Dino', 'Hoppy')

# 8
# 7 
advice = "Few things in life are as important as house training your pet dinosaur."
#advice.slice!(0..38)
p advice.index(' house')
advice.slice!(0,advice.index('house')) # wow this is sick
p advice

# 9 Write a one-liner to count the number of lower-case 't' characters in the following string:
statement = "The Flintstones Rock!"
n = 0
statement.each_char{ |x| n += 1 if x == 't'}
p n
p statement.count('t') # I guessed this, but for some reason didn't try it. oy!

# 10 
title = "Flintstone Family Members"
p title.length
p (40 - title.length) / 2
p "       " << title
# ok, this would have worked
p title.center(40) # this is method hunting again
# whatever
