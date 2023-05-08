class Board
  attr_reader :squares

  WINNING_LINES = [[1, 2, 3], [4, 5, 6], [7, 8, 9]] + # rows
                  [[1, 4, 7], [2, 5, 8], [3, 6, 9]] + # columns
                  [[1, 5, 9], [3, 5, 7]] # diagonals

  def initialize
    @squares = Hash.new
    reset
  end

  def []=(key, marker)
    @squares[key].marker = marker
  end

  def unmarked_keys
    @squares.keys.select { |key| @squares[key].unmarked? }
  end

  def full?
    unmarked_keys.empty?
  end

  def someone_won?
    !!winning_marker
  end

  def winning_marker
      WINNING_LINES.each do |line|
        squares = @squares.values_at(*line)
        if x_number_of_identical_markers?(3, squares)
          return squares.first.marker
        end
      end
      nil
    end

  def x_number_of_identical_markers?(x, squares)
      markers = squares.select(&:marked?).collect(&:marker)
      return false if markers.size != x
      markers.min == markers.max # jon: this won't work for larger boards
  end

  def reset
    (1..9).each { |key| @squares[key] = Square.new }
  end

  # rubocop:disable Metrics/MethodLength
  def draw
    puts %(
      -------------------------
      "       |       |       "
      "   #{@squares[1]}   |   #{@squares[2]}   |   #{@squares[3]}   "
      "       |       |       "
      "-------+-------+-------"
      "       |       |       "
      "   #{@squares[4]}   |   #{@squares[5]}   |   #{@squares[6]}   "
      "       |       |       "
      "-------+-------+-------"
      "       |       |       "
      "   #{@squares[7]}   |   #{@squares[8]}   |   #{@squares[9]}   "
      "       |       |       "
      "-----------------------"
      )
  end
end
# rubocop:enable Metrics/MethodLength

class Square
  INITIAL_MARKER = " "

  attr_accessor :marker

  def initialize(marker=INITIAL_MARKER)
    @marker = marker
  end

  def to_s
    @marker
  end

  def unmarked?
    marker == INITIAL_MARKER
  end

  def marked?
    marker != INITIAL_MARKER
  end
end

class Player
  attr_reader :marker
  attr_accessor :score

  def initialize(marker)
    @marker = marker
    @score = 0
  end
end

class TTTGame
  HUMAN_MARKER = "X"
  COMPUTER_MARKER = "O"
  FIRST_TO_MOVE = HUMAN_MARKER

  attr_reader :board, :human, :computer

  def initialize
    @board = Board.new
    @human = Player.new(HUMAN_MARKER)
    @computer = Player.new(COMPUTER_MARKER)
    @current_marker = FIRST_TO_MOVE
    @score_needed_to_win = nil
  end

  def play
    clear
    display_welcome_message
    main_game
    display_goodbye_message
  end

  private

  def main_game
    loop do # match loop
      set_winning_score

      loop do
        display_board
        players_move
        increment_score
        display_result
        break if someone_won_match?
        reset
      end

      display_match_result
      break unless play_again?
      display_play_again_message
    end
  end

  def players_move
    loop do
      current_player_moves
      break if board.someone_won? || board.full?
      clear_screen_and_display_board if human_turn?
    end
  end

  def display_welcome_message
    puts "Well howdee do! Welcome to TicTacToe."
  end

  def set_winning_score
    input = nil
    loop do
      puts "How many games does either player need to win the match? (1-10)"
      input = gets.chomp.to_i
      break if (1..10).include? input
      puts "not a valid number of games"
    end
    @score_needed_to_win = input
  end

  def display_goodbye_message
    puts "Thanks for playing, c'mon back now, ya hear?"
  end

  def display_board
    puts ""
    puts ""
    puts "This is the start of a new game"
    puts "You're a #{human.marker}. Computer is a #{computer.marker}."
    puts ""
    board.draw
    puts ""
  end

  def clear_screen_and_display_board
    clear
    display_board
  end

  def joiner(array, delimiter = ", ", end_word = "or")
    return array[0] if array.length == 1
    array[0, (array.length - 1)]
      .join(delimiter) + delimiter + end_word + " #{array[-1]}"
  end

  def human_moves
    square = nil
    puts "choose a square (#{joiner(board.unmarked_keys)}): "
    loop do
      square = gets.chomp.to_i
      break if board.unmarked_keys.include?(square)
      puts "Sorry, invalid choice."
    end

    board[square] = human.marker
  end

  def computer_moves
    if find_empty_square_in_nearly_full_line(COMPUTER_MARKER)
      board[find_empty_square_in_nearly_full_line(COMPUTER_MARKER)] = computer.marker
    elsif find_empty_square_in_nearly_full_line(HUMAN_MARKER)
      board[find_empty_square_in_nearly_full_line(HUMAN_MARKER)] = computer.marker
    elsif board.squares[5].unmarked?
      board[5] = computer.marker
    else
      board[board.unmarked_keys.sample] = computer.marker
    end
  end

  def find_empty_square_in_nearly_full_line(player_marker) # returns the square to be filled for defensive move
    opportunty_lines = Board::WINNING_LINES.select do |line|
      squares = board.squares.values_at(*line)
      (!!board.x_number_of_identical_markers?(2, squares) && !!squares.map(&:marker).include?(player_marker))
    end
    return nil if opportunty_lines.empty?
    opportunty_lines.first.select { |position| board.squares[position].unmarked?}.first
  end

  def display_result
    clear_screen_and_display_board

    case board.winning_marker
    when human.marker
      puts "You won this game!"
    when computer.marker
      puts "The computer won this game!"
    else
      puts "The board is full, it's a tie. Snore..."
    end
    puts "The current match score is You: #{human.score} to Computer: #{computer.score}"
    puts "-----------------------------------------------------------------------------"
  end

  def match_winner
    if human.score == @score_needed_to_win
      return human
    elsif computer.score == @score_needed_to_win
      return computer
    end
    nil
  end

  def increment_score
    case board.winning_marker
    when human.marker
      human.score += 1
    when computer.marker
      computer.score += 1
    end
  end

  def someone_won_match?
    human.score == @score_needed_to_win || computer.score == @score_needed_to_win
  end

  def display_match_result
    puts "\n"
    puts "*********************************************".center(70)
    case match_winner
    when human
      puts "Congratulations, you have bested the computer in this match to #{@score_needed_to_win} games!"
    when computer
      puts "Alas, the computer has won this match to #{@score_needed_to_win} games.".center(70)
    end
    puts "*********************************************".center(70)
  end

  def play_again?
    answer = nil
    loop do
      puts "\n\nWould you like to play again? (y/n)"
      answer = gets.chomp.downcase
      break if %w(y n).include? answer
      puts "please enter y or n"
    end

    answer == "y"
  end

  def clear
    system 'clear'
  end

  def reset
    board.reset
    @current_marker = FIRST_TO_MOVE
    # clear
  end

  def display_play_again_message
    puts "Let's play again!"
    puts ""
  end

  def human_turn?
    @current_marker == HUMAN_MARKER
  end

  def current_player_moves
    if human_turn?
      human_moves
      @current_marker = COMPUTER_MARKER
    else
      computer_moves
      @current_marker = HUMAN_MARKER
    end
  end
end

game = TTTGame.new
game.play
