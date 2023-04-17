class Move
  VALUES = %w(rock paper scissors lizard spock)

  def initialize(value)
    @value = value
  end

  def scissors?
    @value == 'scissors'
  end

  def rock?
    @value == 'rock'
  end

  def paper?
    @value == 'paper'
  end

  def lizard?
    @value == 'lizard'
  end

  def spock?
    @value == 'spock'
  end

  def rock_win?(other_move)
    (rock? && other_move.scissors?) ||
      (rock? && other_move.lizard?)
  end

  def paper_win?(other_move)
    (paper? && other_move.rock?) ||
      (paper? && other_move.spock?)
  end

  def scissors_win?(other_move)
    (scissors? && other_move.paper?) ||
      (scissors? && other_move.lizard?)
  end

  def lizard_win?(other_move)
    (lizard? && other_move.spock?) ||
      (lizard? && other_move.paper?)
  end

  def spock_win?(other_move)
    (spock? && other_move.rock?) ||
      (spock? && other_move.scissors?)
  end

  def >(other_move) # I had to create each of the #x_win? helpers to reduce ABC
    rock_win?(other_move) ||
      paper_win?(other_move) ||
      scissors_win?(other_move) ||
      lizard_win?(other_move) ||
      spock_win?(other_move)
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
      break unless n.empty?
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
  attr_accessor :human, :computer, :first_to_x_games

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

  def human_win?
    human.move > computer.move
  end

  def computer_win?
    computer.move > human.move
  end

  def display_winner
    if human_win?
      puts "#{human.name} won this game."
      human.score += 1
    elsif computer_win?
      puts "#{computer.name} won this game."
      computer.score += 1
    else
      puts "It's a tie."
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
      puts "#{computer.name} won the match!"
      human.score, computer.score = 0, 0
      return true
    elsif human.score == first_to_x_games
      puts "#{human.name} won the match!"
      human.score, computer.score = 0, 0
      return true
    end
    false
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
    human.choose
    computer.choose
    display_moves
    display_winner
    display_score
  end

  def play
    display_welcome_message
    loop do
      set_games_per_match
      loop do
        main_game_play
        break if match_winner?
      end
      break unless play_again?
    end
    display_goodbye_message
  end
end

RPSGame.new.play
