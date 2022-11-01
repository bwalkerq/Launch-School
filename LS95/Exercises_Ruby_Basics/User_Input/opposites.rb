def valid_number?(number_string)
  number_string.to_i.to_s == number_string && number_string.to_i != 0
end

choice1 = nil
choice2 = nil

loop do
  loop do
    puts ">> Please enter a positive or negative integer for your first integer:  "
    choice1 = gets.chomp
    if valid_number?(choice1)
      choice1 = choice1.to_i
      break
    end
    puts ">> Invalid input. Only non-zero integers are allowed.  " 
  end

  loop do
    puts ">> Please enter a positive or negative integer:  "
    choice2 = gets.chomp
    if valid_number?(choice2)
      choice2 = choice2.to_i
      break
    end
    puts ">> Invalid input. Only non-zero integers are allowed.  " 
  end  
  
  if (choice1.negative?() && choice2.positive?()) ||
     (choice2.negative?() && choice1.positive?())
    break
  end
  puts ">> Sorry. One integer must be positive, one must be negative.
  >> Please start over."
end

puts "Sure thing. #{choice1} + #{choice2} is #{choice1+choice2}"

# damn, I did a nested loop, but I THOUGHT about doing a method, but avoided 
# because I couldn't remember how, and felt my brain was already taxed
# their solution is much more elegant though

def valid_number?(number_string)
  number_string.to_i.to_s == number_string && number_string.to_i != 0
end

def read_number
  loop do
    puts '>> Please enter a positive or negative integer:'
    number = gets.chomp
    return number.to_i if valid_number?(number) # good reminder of return for me
    puts '>> Invalid input. Only non-zero integers are allowed.'
  end
end

first_number = nil
second_number = nil

loop do
  first_number = read_number
  second_number = read_number
  break if first_number * second_number < 0 #this is classy, I tried
  # thinking of an elegant solution to avoid the long conditional, but
  # my brain today! choir last night oy vey
  puts '>> Sorry. One integer must be positive, one must be negative.'
  puts '>> Please start over.'
end

sum = first_number + second_number
puts "#{first_number} + #{second_number} = #{sum}"
