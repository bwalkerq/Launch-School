def valid_number?(number_string)
  number_string.to_i.to_s == number_string
end

num = nil
denom = nil

loop do
  puts ">> Please enter the numerator:  "
  num = gets.chomp
  if valid_number?(num)
    break
  end
  puts ">> Enter an integer instead"
end
=begin
loop do
  puts ">> Please enter the denominator:    "
  denom = gets.chomp
  if denom == 0
    puts ">> Invalid input. A denominator of 0 is not allowed.    "
  elsif (valid_number?(denom) && denom!=0)
    break
  else
    puts ">> Enter an integer instead"
  end
end
=end
until denom != 0
  puts ">> Please enter the denominator:"
  denom = gets.chomp
end

puts denom
#puts "Sure thing. #{num} / #{denom} is #{num.to_i / denom.to_i}"