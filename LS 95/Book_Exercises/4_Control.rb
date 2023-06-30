##1 did in irb

##2
def big(string)
  string.upcase if string.length>10
end
puts big("forreeevvveeeerrrr")

##3
puts "pick a non-negative number"
#n = gets.chomp.to_i
n=1
if n <= 50
  puts "between 0 and 50"
elsif 50 < n && n <100
  puts "between 51 and 100"
else
  puts "bigger than 100"
end
##the solution has a more elegant solution; I forgot that the program 
#will exit the control flow on the first true statement, so we only need
#to use greater than and put increasingly larger values on the tree.

##4
#4.1 FALSE because string != number (also, shouldn't be choosing b/t two actions, fi for shame)
# Snippet 1
'4' == 4 ? puts("TRUE") : puts("FALSE")
#4.2 true so "did you get this right?"
# Snippet 2
x = 2
if ((x * 3) / 2) == (4 + 4 - x - 3)
  puts "Did you get it right?"
else
  puts "Did you?"
end
#4.3 11 is greater than 9 so Alright now!
# Snippet 3
y = 9
x = 10
if (x + 1) <= (y)
  puts "Alright."
elsif (x + 1) >= (y)
  puts "Alright now!"
elsif (y + 1) == x
  puts "ALRIGHT NOW!"
else
  puts "Alrighty!"
end

##5 both the method and the if statement need an end
def equal_to_four(x)
  if x == 4
    puts "yup"
  else
    puts "nope"
  end
end

equal_to_four(5)

##6 
=begin
error (integer compared to string)
** error ** Got this one wrong; you can compare strings 
  and integers with == (they are always not equal so false) but your can't compare 
  with greater than, etc.
false
true
false
true