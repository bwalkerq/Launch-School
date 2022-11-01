PASSWORD = "FillUp!"
USER = "Meggie"

loop do
  puts ">> Please enter user name:  "
  user_attempt = gets.chomp
  puts ">> Please enter your password:  "
  pass_attempt = gets.chomp
  break if user_attempt == USER and pass_attempt == PASSWORD
  puts ">> Authorization failed!  "
end

puts "Get psyched"