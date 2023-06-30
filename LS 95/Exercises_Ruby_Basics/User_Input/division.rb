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

loop do
  puts ">> Please enter the denominator:    "
  denom = gets.chomp
  if (valid_number?(denom) && denom!="0")
    break
  elsif denom == "0"
    puts ">> Invalid input. A denominator of 0 is not allowed.    "
  else
    puts ">> Enter an integer instead"
  end
end

# I'm trying not to be so so frustrated, this exercise took at least an hour
# it came down to me not understanding that the user inputting 0 is actually taken
# as "0" (a string) so when I set up conditionals to catch !=0 they actually ran
# true when the user input 0 because "0" is indeed NOT equal to 0. FUCK
# I also tried writing lots of different loops


puts "Sure thing. #{num} / #{denom} is #{num.to_i / denom.to_i}"