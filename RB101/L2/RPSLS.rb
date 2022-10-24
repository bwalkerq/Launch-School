VALID_CHOICES = %w(rock paper scissors lizard spock)

def prompt(message)
  puts "==> #{message}"
end

def get_user_choice
  loop do
    prompt("Choose one: #{VALID_CHOICES.join(', ')}")
    choice = gets.chomp.strip

    if VALID_CHOICES.include?(choice)
      return choice
    else
      prompt("That choice is whack. Try again.")
    end
  end
end

def win?(first_choice, second_choice)
  first_choice_wins_against = {
    rock: ['scissors', 'lizard'],
    paper: ['rock', 'spock'],
    scissors: ['paper', 'lizard'],
    lizard: ['spock', 'paper'],
    spock: ['rock', 'scissors']
  }
  first_choice_wins_against[first_choice.to_sym].include?(second_choice.to_s)
end
# much more beautiful method to determine a win than I originally created

def display_results(player, computer)
  if win?(player, computer)
    prompt("You won!")
  elsif win?(computer, player)
    prompt('Computer won!')
  else
    prompt("It's a tie!")
  end
end

loop do # main execution loop
  choice = get_user_choice
  
  computer_choice = VALID_CHOICES.sample

  prompt("You chose: #{choice}; the computer chose: #{computer_choice}.")

  display_results(choice, computer_choice)

  prompt("Do you want to play again?")
  answer = gets.chomp
  break unless answer.downcase.start_with?('y')
end

prompt("Thanks for playing")
