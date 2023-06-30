#1
a = [*1..10]
a.each {|x| print x}

#2
p "done"
a.each {|x| p x if x>5}

#3
odds = a.select {|x| x%2 ==1}
p odds

#4
a<<11
a.unshift(0)
p a

#5
a.pop
a<<3
p a

#6
a.uniq!
p a

#7
# The difference between an Array and a Hash: Arrays store a list of objects, while 
# Hashes store key-value pairs (also ordered since Ruby 1.9)(?) for referencing by key

#8
h = {:old => "shit"}
p h[:old]
j = {new: "dope shit"}
p j[:new]

#9
h2 = {a:1, b:2, c:3, d:4}
p h2[:b]
h2[:e] =5
p h2
h2.select!{|x,y| y>3.5} # this can also be done with .delete_if method (I tried just .delete)
p h2

#10 Can hash values be arrays? Can you have an array of hashes? (give examples)
hash_with_array_values = {:a => [1,2,3], :b => ["no","yes","maybe"]}
p hash_with_array_values[:b]
p hash_with_array_values.to_a #This actually is not an array of hashes; it's 
# key value elements that have been converted to array form
# better example: # array of hashes
arr = [{name: 'bob'}, {name: 'joe'}, {name: 'susan'}]

#11
contact_data = [["joe@email.com", "123 Main st.", "555-123-4567"],
            ["sally@email.com", "404 Not Found Dr.", "123-234-3454"]]

contacts = {"Joe Smith" => {}, "Sally Johnson" => {}}

# Expected output:
#  {
#    "Joe Smith"=>{:email=>"joe@email.com", :address=>"123 Main st.", :phone=>"555-123-4567"},
#    "Sally Johnson"=>{:email=>"sally@email.com", :address=>"404 Not Found Dr.",  :phone=>"123-234-3454"}
#  }

# contacts = {"Joe Smith" => contact_data[0], "Sally Johnson" => contact_data[1]}
# p contacts
# damn, I got close but didn't add the nested hash keys, I just associated all 
# the values with the correct person
contacts["Joe Smith"][:email] = contact_data[0][0]
contacts["Joe Smith"][:address] = contact_data[0][1]
contacts["Joe Smith"][:phone] = contact_data[0][2]
contacts["Sally Johnson"][:email] = contact_data[1][0]
contacts["Sally Johnson"][:address] = contact_data[1][1]
contacts["Sally Johnson"][:phone] = contact_data[1][2]
p contacts

#12
p contacts["Joe Smith"][:email]
p contacts["Sally Johnson"][:phone]

#13
arr = ['snow', 'winter', 'ice', 'slippery', 'salted roads', 'white trees']
p arr.delete_if{|x| x.start_with?('s')}
p arr.delete_if{|x| x.start_with?('s') || x.start_with?('w')}
# better to do this with x.start_with?('s', 'w')

#14
a = ['white snow', 'winter wonderland', 'melting ice',
  'slippery sidewalk', 'salted roads', 'white trees']
b =  a.map{|x| x.split}
p b.flatten!

#15
hash1 = {shoes: "nike", "hat" => "adidas", :hoodie => true}
hash2 = {"hat" => "adidas", :shoes => "nike", hoodie: true}

if hash1 == hash2
  puts "These hashes are the same!"
else
  puts "These hashes are not the same!"
end
=begin I thought that they would not be the same because the order differed; 
I remember that order is preserved in hashes since a certain update, but apparently, since
a hash is used for accessing values from keys, the order doesn't matter in terms of the
equality of hashes. so these are equivalent hashes
=end

#16 challenge
contact_data = ["joe@email.com", "123 Main st.", "555-123-4567"]
contacts = {"Joe Smith" => {}}
title = [:email, :address, :phone]
#contacts["Joe Smith"][title.each {|x| x = contact_data.shift}]
contacts.each do |name, hash|
  title.each do |field|
    hash[field] = contact_data.shift
  end
end
p contacts["Joe Smith"]

#bonus
contact_data = [["joe@email.com", "123 Main st.", "555-123-4567"],
            ["sally@email.com", "404 Not Found Dr.", "123-234-3454"]]

contacts = {"Joe Smith" => {}, "Sally Johnson" => {}}

contacts.each do |name, hash|
  title.each do |field|
    hash[field] = contact_data.first.shift
  end
  contact_data.shift
end
p contacts
p contact_data
# this is my solution, which works, but also destroys the original contact data array. I 
# am proud that I figured out a way to step into the next element of the contact data array.
# their solution: [update! theirs also destroys original contact data array! but leaves the 
# shell of the 2d array... weird.]
contact_data = [["joe@email.com", "123 Main st.", "555-123-4567"],
            ["sally@email.com", "404 Not Found Dr.", "123-234-3454"]]
contacts = {"Joe Smith" => {}, "Sally Johnson" => {}}
fields = [:email, :address, :phone]

contacts.each_with_index do |(name, hash), idx|
  fields.each do |field|
    hash[field] = contact_data[idx].shift
  end
end
p contacts
p contact_data