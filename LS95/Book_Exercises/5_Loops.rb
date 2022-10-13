##1 the each method will return the array 2 - 6, but x will not be mutated
# ** incorrect - the return is always the array on which the each method is called; so
# I am correct that the array is not mutated; remember that each returns original array
x = [1, 2, 3, 4, 5]
x.each do |a|
  a + 1
end

##2
=begin
while x != "STOP"
  p "all you need to say is STOP"
  x = gets.chomp
end
=end

##3 write a method that counts to zero using recursion (a method 
#that calls itself within the method)
def countdown(n)
  if n >-1 
    puts n
    puts countdown(n-1)
  end
end
countdown(14)

#The solution is more complete than mine; I overlooked negative starting places. meh.