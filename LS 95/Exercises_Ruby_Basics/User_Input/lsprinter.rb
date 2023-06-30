choice = nil
loop do
  puts ">> How many output lines do you want? Enter a number >= 3:"
  choice = gets.chomp.to_i
  break if choice >= 3
  puts "that's far too few lines"
end
choice.times {puts "LS is the best!"}