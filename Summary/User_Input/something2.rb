loop do
  puts "want to print something fun? (y/n)"
  a = gets.chomp.downcase
  if a == "y"
    puts "yumm"
    break
  elsif a == "n"
    break
  else
    puts ">> Invalid input! Please enter y or n"
  end
end

# thier solution much more elegant
choice = nil # smart choice to define variable outside the scope of the loop
loop do
  puts '>> Do you want me to print something? (y/n)'
  choice = gets.chomp.downcase
  break if %w(y n).include?(choice) # this is particularly elegant
  # creates an array with the entries y and n
  # checks for either y or n using include method (wow)
  puts '>> Invalid input! Please enter y or n'
end
puts 'something' if choice == 'y'
# interesting to me to write the puts 'something' line outside of the loop, 
# but that makes perfect sense once I realize that the goal is access the user's 
# choice outside of the loop later
