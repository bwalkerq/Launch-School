# 1
# the return value is 'hi' since the last line of code run is just the string 'hi'
[1, 2, 3].select do |num|
  num > 5
  'hi'
end
# incorrect. The return is the collection that satisfies the truthiness of the 
# block's return, so "hi" returns true each time, so each value is selected
# and the return value of the method is the collection
=begin 
**important realization**
distinguishing between the return value of the block (considered each time
the block runs, for each element in the case of select), vs the return value
of the method, which is what's returned after the method completes.
This was unclear to me yesterday. cool.
=end

# 2
['ant', 'bat', 'caterpillar'].count do |str|
  str.length < 4
end
=begin 
Array#count treats the block's return value as true or false, and counts the true 
occurances. 
=end

# You're awesome

#3
# #reject returns the values for which the block returns false or nil
# The return value of this method is all three elements (self); 
# the return of #puts is nil, so
# the block's return value is falsey each time, so all elements are rejected
# "into" the return value's new collection

# You're awesome

# 4
['ant', 'bear', 'cat'].each_with_object({}) do |value, hash|
  hash[value[0]] = value
end
=begin 
  The return value of each_with_object in this case will be
  {a => ant, b => bear, c => cat}

  You're awesome
=end

#5
hash = { a: 'ant', b: 'bear' }
hash.shift
# Before reading docs: I believe shift removes first element of an Array/Hash?
# non-destructive
# so #shift returns just the b : bear, but hash still points to original object
#  after docs: returns a 2-element Array containing the removed key and value
# and wow, it IS destrcutive, so returns [:a, "ant"]
# and now hash = {b: 'bear'}
# note that shift IS destructive for Array as well, so is unshift, pop, push

a = [1,2,3,4,5,6]
a.unshift(10)
p a

# I spent time making the "Surprisingly Destructive Array Add/Remove 
# Punnet Square" and posted it to Slack, lol

# 6
p ['ant', 'bear', 'caterpillar'].pop.size
# the return value is the length of "caterpillar", since pop removes and returns
# the last element, so 11
# you're awesome

# 7
[1, 2, 3].any? do |num|
  puts num
  num.odd?
end
=begin 
  The BLOCK's return value is true, false, true, respectively -- I believe that
  #any? with a block passes each element as an argument to the block
  so, the return value of #any?, the method, is true since for at least one
  element the block returns true, and the output is...self? No, there is no 
  output. But #any? returns true or false.
  Mostly correct. I overlooked the puts num call in the block, so that's what
  the question meant by output, BUT I also learned that #any? is a short-circuit
  method that stops running the block as soon as the block returns one true value
  (this makes sense, and is a good call to save speed) (this would probably be used
  in password creation scripts to make sure there's a special character or 
  whatever) so in this case, only 1 is printed, because the method returns true
  after the block returns true for 1.odd?.
=end
# You're awesome.

# 8
arr = [1, 2, 3, 4, 5]
arr.take(2)
=begin 
  before reading docs: I bet #take returns but doesn't remove the 
  item at index 2.
  post-doc (lol): returns a new array containing first n elements of self
  non-destructive
  returns [1,2]
=end

# 9
{ a: 'ant', b: 'bear' }.map do |key, value|
  if value.size > 3
    value
  end
end
=begin 
  the return value of #map is ... probably the original hash, unmodified
    this is a little weird but map is used for transformation, but neither
    key nor value are referenced
  wow, incorrect. So, map returns an Array in this case, of the return values
    from the block. [nil, bear] since ant.size is only 3, and bear is the value
    that gets added since bear is 4 characters. weird. I thought for sure that
    mapping a hash would return a hash.
  WTF, #map doesn't even exist for Hash. That's some interesting shit.

  #map always returns an array
  wow, the solution doesn't even explain how #map is used on a hash
  AHA, it's because map is an inherited method from Enumerable ! yeesh
=end

# 10
[1, 2, 3].map do |num|
  if num > 1
    puts num
  else
    num
  end
end
=begin 
  The return value is [1, nil, nil]
  1 gets mapped to itself because the only call is num, but 2 and 3 have 
  puts num called for them, which returns nil, and map returns an array of the
  return values from the block.

  You're awesome

=end

# This exercise set was useful for considering the return values of the block
# vs the return values of the method