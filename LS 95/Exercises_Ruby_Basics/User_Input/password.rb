PASSWORD = "FillUp!"
#attempt = nil
# it turns out that initializing this attempt variable is unnecessary since
# we're comparing it to an already established password constant

loop do
  puts ">> Please enter your password:  "
  attempt = gets.chomp
  break if attempt == PASSWORD
  puts ">> Invalid, yo, try again"
end
puts "Welcome home."