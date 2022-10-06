def valid_number?(number_string)
  number_string.to_i.to_s == number_string
end

choice = nil

loop do
  puts ">> How many output lines do you want? Enter a number >= 3 (Q to quit):"
  choice = gets.chomp
  if choice.downcase == "q"
    break
  elsif valid_number?(choice) == false
    puts "enter a number"
  elsif choice.to_i >= 3
    choice.to_i.times {puts "LS is the best!"}
  elsif choice.to_i < 3
    puts "that's far too few lines"
  end
end
