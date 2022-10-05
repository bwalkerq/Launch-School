# reading doc 2
a = %w(a b c d e)
a.insert(3, 5,6,7)
p a

s = 'abc def ghi,jkl mno pqr,stu vwx yz'
# What will each of the 3 puts statements print?
puts s.split.inspect # strings in double quotes delimited by spaces (not commas)
# additionally, it prints an array (returns nil)
puts s.split(',').inspect # prints array of strings delimited by comma
puts s.split(',', 2).inspect # same as above but the last two big chunks are together
# I was right, but I misunderstood; the 2 doesn't represent the last two, it represents 
# how many total chunks there will be, total. The number represents how many times to 
# limit using the delimiter.

## Variable Scope
a = 7

def my_value(b)
  b += 10
end

my_value(a)
puts a
# got this wrong! a still is 7, because += is a reassignment operator, and doesn't mutate the variable
# changing b to a in the method def also doesn't change the value of the top-level a, because
# it's not available inside the method, nor is the variable a from inside visible outside

a = 7

def my_value(b)
  a = b
end

p my_value(a + 5)
puts a # a=7 because of aforementioned variable scope #nice

#4
a = "Xyzzy"

def my_value(b)
  b[2] = '-'
end

my_value(a)
puts a # a is unchanged #tryagain
# numbers are immutable, but strings are mutable.

#5
# the updated version #wrong again
# assignment to a variable (and object) never mutates the object that is referenced.
# the previous example b[2] is calling a method that mutates a string

#6 still 7
# fuck
# error because of SOMETHING I WROTE ABOVE - that top-level a wouldn't be accessible, so
# I should have known that an error would be thrown.
# I have gotten 1 of the last 6 correct

#7
# takeaway from this exercise is scope of method definitions (restricted scope, no 
# variables in or out) compared to, in this case, a method *invocation* has more open 
# scoping rules; the block can use and modify local variables from outside the block.

# note that I reviewed the last 7 exercises since I got most wrong yesterday.

#8
# I read the entire assignment document start to finish looking for info that would
# answer this, and still got it wrong. Fuck this.
# Ok, I went back to the part of the book and (surprise, surprise) all of the exercises
# are very clearly covered by the book. I just skimmed it because I found it similar to JS
# as I was reading. So, uh. I need to read better/take better notes.
# I also wasn't thinking explicitly about the JS scope rules as I did the above exercises
# and when I applied that framework, the exercises made much more sense.

#9
# got this right. a is a dummy variable in this case. It "shadows" the top level a

#10
a = 7
array = [1, 2, 3]

def my_value(ary)
  ary.each do |b|
    a += b
  end
end

my_value(array)
puts a

# I said 7, which is would still be if top level a was accessible, but it's not because 
# the .each is within a method def.
