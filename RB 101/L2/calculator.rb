def prompt(message)
  Kernel.puts("=> #{message}")
end

def valid_number?(num)
  num.to_s.to_i == num
end

def operation_to_message(op)
  operation_word =  case op
                    when '1'
                      'Adding'
                    when '2'
                      'Subtracting'
                    when '3'
                      'Mulitiplying'
                    when '4'
                      'Dividing'
                    end
  # there could be code here
  operation_word # this forces the return to be the word that we want
end
operator = ''
name = ''

prompt("Welcome to this dope-ass calculator, lolz. What's your name?")

loop do
  name = gets.chomp

  if name.empty?
    prompt("I said...What's your name?")
  else
    break
  end
end

prompt("Hi, #{name}!")

loop do # main loop
  n1 = ''
  n2 = ''

  loop do
    prompt("Type in the first number to calculate")
    n1 = gets().chomp().to_i

    if valid_number?(n1)
      break
    else
      prompt('bruh that shit is whack; input a valid number')
    end
  end

  loop do
    prompt("Type in the first number to calculate")
    n2 = gets().chomp().to_i

    if valid_number?(n2)
      break
    else
      prompt('bruh that shit is whack; input a valid number')
    end
  end

  operator_prompt = <<-MSG
  "What operation would you like to perform?
  1) add 
  2) subtract 
  3) mulitiply 
  4) divide"
  MSG
  prompt(operator_prompt)

  operator = ''

  loop do
    operator = gets.chomp

    if %w(1 2 3 4).include?(operator)
      break
    else
      prompt("Must choose 1, 2, 3, or 4")
    end
  end

  prompt("#{operation_to_message(operator)} the two numbers...")

  result =  case operator
            when '1'
              n1 + n2
            when '2'
              n1 - n2
            when '3'
              n1 * n2
            when '4'
              n1.to_f / n2.to_f
            end

  prompt("The result is #{result}")

  prompt('Do you want to do another? (Y to calculate again)')
  answer = gets.chomp.downcase
  break unless answer.start_with?('y')
end
prompt('Thanks for using the dope-ass calculator!')
