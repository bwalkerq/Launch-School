class Move
  attr_reader :value

  VALUES = %w(rock paper scissors lizard spock)
  WINNING_MOVES = { 'rock' => %w(scissors lizard), 'paper' => %w(rock spock),
                    'scissors' => %w(paper lizard), 'lizard' =>
                      %w(spock paper), 'spock' => %w(rock scissors) }

  def initialize(value)
    @value = value
  end

  def >(other_move)
    WINNING_MOVES[@value].include?(other_move.value)
  end

  def to_s
    @value
  end
end

class Player
  attr_accessor :move, :name, :score

  def initialize
    set_name
    @score = 0
  end
end

class Human < Player
  def set_name
    n = nil
    loop do
      puts "What's your name?"
      n = gets.chomp.capitalize
      break unless n.strip.empty?
      puts "write your name, gotta be something"
    end
    self.name = n
  end

  def choose
    choice = nil
    loop do
      puts "\nSelect your move: rock, paper, scissors, lizard, or spock"
      choice = gets.chomp
      break if  Move::VALUES.include? choice
      puts "you can't choose that one."
    end
    self.move = Move.new(choice)
  end
end

class Computer < Player
  def set_name
    self.name = %w(R2D2 Hal Chappie Sonny C-3PO).sample
  end

  def choose
    self.move = Move.new(Move::VALUES.sample)
  end
end

# Game orchestration Engine
class RPSGame
  attr_accessor :human, :computer, :first_to_x_games, :match_winner

  def initialize
    @human = Human.new
    @computer = Computer.new
    @first_to_x_games = 0
  end

  def display_welcome_message
    puts "Welcome to the OOP RPS game, #{human.name}."
  end

  def set_games_per_match
    loop do
      puts "How many games does either player need to reach in order to win?"
      self.first_to_x_games = gets.chomp.to_i
      break if first_to_x_games > 0
      puts "choose a number of games 1 or greater"
    end
  end

  def display_goodbye_message
    puts "Thanks, it was nice playing with you."
  end

  def display_moves
    puts "#{human.name} chose #{human.move}"
    puts "#{computer.name} chose #{computer.move}"
  end

  def display_winner
    if human.move > computer.move
      puts "#{human.name} won this game."
    elsif computer.move > human.move
      puts "#{computer.name} won this game."
    else
      puts "It's a tie."
    end
  end

  def increment_score
    if human.move > computer.move
      human.score += 1
    elsif computer.move > human.move
      computer.score += 1
    end
  end

  def display_score
    puts "\nYou are playing a match to #{first_to_x_games} games."
    puts "The match score is currently:"
    puts "  #{human.name}: #{human.score} games won"
    puts "  #{computer.name}: #{computer.score} games won"
  end

  def match_winner?
    if computer.score == first_to_x_games
      self.match_winner = computer
      return true
    elsif human.score == first_to_x_games
      self.match_winner = human
      return true
    end
    false
  end

  def reset_score
    human.score = 0
    computer.score = 0
  end

  def display_match_winner
    puts "#{match_winner.name} won the match!"
  end

  def play_again?
    answer = nil
    loop do
      puts "Play again? (y/n)"
      answer = gets.chomp
      break if %w(y n).include? answer.downcase
      puts "enter y or n"
    end

    return true if answer == 'y'
    false
  end

  def main_game_play
    loop do
      human.choose
      computer.choose
      display_moves
      display_winner
      increment_score
      display_score
      break if match_winner?
    end
    display_match_winner
  end

  def play
    display_welcome_message
    loop do
      set_games_per_match
      main_game_play
      reset_score
      break unless play_again?
    end
    display_goodbye_message
  end
end

RPSGame.new.play
