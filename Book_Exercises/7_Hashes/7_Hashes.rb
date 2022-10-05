family = {  uncles: ["bob", "joe", "steve"],
  sisters: ["jane", "jill", "beth"],
  brothers: ["frank","rob","david"],
  aunts: ["mary","sally","susan"]
}
nuclear = family.select {|k,v| k == :sisters || k == :brothers}
nuclear = nuclear.values.flatten # at first I forgot flatten and had a 2D array
p nuclear

# #2
# I can already say that merge! will mutate the hash, and merge will not.
hunger_games = { first: "peeta", second: "katniss", third: "old guy"}
thirst_games = { third: "finnick", four: "Haymitch"}

p thirst_games.merge(hunger_games) # "old guy" overwrites "finnick" because 
# the caller overwrites the original
p thirst_games

p hunger_games.merge!(thirst_games) # destructive
p hunger_games #new hunger games hash

# #3
hunger_games.keys.each{|k| p k} # better way to do this is .each_key
hunger_games.values.each{|k| p k} # same here, .each_value
hunger_games.to_a.each{|x| puts x}
# another way to do this with string interpolation is
hunger_games.each{|k,v| puts "now this #{k}, #{v}"}

# #4
# access the name of the person?
person = {name: 'Bob', occupation: 'web developer', hobbies: 'painting'}
p person[:name]

# #5
p hunger_games.value?("peeta")

# #6
x = "hi there"
my_hash = {x: "some value"}
puts my_hash[:x]
# this hash turns x into a symbol, which I think is non-changing
my_hash2 = {x => "some other value"}
# I think this one overwrites the "hi there" from before
# ah shit, in one case x as a variable has a different value than x as a key, 
# probably with the symbol?
puts my_hash2 [x]
puts x
# ok! the first hash creates and uses the *symbol* x as the key 
# the second hash uses the *stored value of x* as the key, so
puts my_hash2["hi there"] #will produce the same as calling [x]

# #7
# NoMethodError: undefined method `keys' for Array
# this means B, because Arrays don't have keys and values, only listed objects