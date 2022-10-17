# lol, years of HA2 and HPC coming back to me

=begin
I need the loan amount = P = loan_amount
the APR(divide by 12) = j = monthly_interest_rate
the loan duraction in months = n = loan_duration_in_months

=end
def valid_number(num)
  num.to_i.to_s == num
end

def valid_float(num)
  num.to_f.to_s == num
end

def prompt(message)
  Kernel.puts("==> #{message}")
end

loan_amount = nil
annual_percentage_rate = nil
loan_duration_in_years = nil

welcome_prompt = <<-MSG
Welcome to the car loan calculator! 
    You'll answer some basic questions and figure out your monthly payment. 
    Let's get started.
    How much, in dollars, are you borrowing? (Enter a number)
MSG

loop do # main loop
  loop do
    prompt(welcome_prompt)
    loan_amount = gets.chomp
    break if valid_number(loan_amount)
    prompt("enter a valid integer to represent the number of dollars.")
  end

  loop do
    prompt("What Annual Percentage Rate did you negotiate?
       (End a number without '%'")
    annual_percentage_rate = gets.chomp
    break if valid_float(annual_percentage_rate)
    prompt("Enter a valid decimal number (e.g. 1.23) that represents your APR.")
  end

  loop do
    prompt("How many years is your loan duration? (Enter a number)")
    loan_duration_in_years = gets.chomp
    break if valid_number(loan_duration_in_years)
    prompt("enter a valid integer to represent the number of years.")
  end

  monthly_interest_rate = annual_percentage_rate.to_f / 12 / 100 # I forgot that
  # this rate needs to be /100 because it's a percent
  loan_duration_in_months = loan_duration_in_years.to_i * 12
  monthy_payment = loan_amount.to_i * (monthly_interest_rate / (
    1 - (1 + monthly_interest_rate)**(-loan_duration_in_months)))

  prompt("Sounds good! Your monthly payment will
         be $#{format('%.2f', monthy_payment)}.") # I learned this format method
         # from the solution, and it's handy!
  prompt("Would you like to calculate a monthly
         payment again? (Y to calculate)")
  again = gets.chomp.downcase
  break unless again.start_with?('y')
end

prompt("ok, peace!")
