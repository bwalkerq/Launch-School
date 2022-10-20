VALID_CHOICES = %w(rock paper scissors lizard spock)

def prompt(message)
  puts "==> #{message}"
end

=begin # very logical but too long and not elegant
def win?(first, second)
  (first == 'rock' && second == 'scissors') ||
  (first == 'rock' && second == 'lizard') ||
  (first == 'paper' && second == 'rock') ||
  (first == 'paper' && second == 'spock') ||
  (first == 'scissors' && second == 'paper') ||
  (first == 'scissors' && second == 'lizard') ||
  (first == 'lizard' && second == 'spock') ||
  (first == 'lizard' && second == 'paper') ||
  (first == 'spock' && second == 'rock') ||
  (first == 'spock' && second == 'scissors')
end
=end

def win?(first, second)
  choice_wins_against = {
    rock: ['scissors', 'lizard'],
    paper: ['rock', 'spock'],
    scissors: ['paper', 'lizard'],
    lizard: ['spock', 'paper'],
    spock: ['rock', 'scissors']
  }
  choice_wins_against[first.to_sym].include?(second.to_s) # I am very
  # proud that I figured out these methods to return true on the first try
end
# much more beautiful method to determine a win

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
  choice = ''

  loop do
    prompt("Choose one: #{VALID_CHOICES.join(', ')}")
    choice = gets.chomp

    if VALID_CHOICES.include?(choice)
      break
    else
      prompt("That choice is whack. Try again.")
    end
  end

  computer_choice = VALID_CHOICES.sample

  prompt("You chose: #{choice}; the computer chose: #{computer_choice}.")

  display_results(choice, computer_choice)

  prompt("Do you want to play again?")
  answer = gets.chomp
  break unless answer.downcase.start_with?('y')
end

prompt("Thanks for playing")
