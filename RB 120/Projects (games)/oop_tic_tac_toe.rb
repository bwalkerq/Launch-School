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

  def all_winning_line_squares
    WINNING_LINES.map { |line| @squares.values_at(*line) }
  end

  def winning_marker
    all_winning_line_squares.each do |squares|
      if x_number_of_identical_markers?(3, squares)
        return squares.first.marker
      end
    end
    nil
  end

  def x_number_of_identical_markers?(x, squares)
    markers = squares.select(&:marked?).collect(&:marker)
    markers.length == x && markers.uniq.length == 1
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
  attr_accessor :score, :name

  def initialize(marker, name=nil)
    @marker = marker
    @score = 0
    @name = name
  end
end

class TTTGame
  HUMAN_MARKER = "X"
  COMPUTER_MARKER = "O"
  FIRST_TO_MOVE = HUMAN_MARKER
  COMPUTER_NAMES = %w(Jane Lizzie Darcy Bingley Wickham)

  attr_reader :board, :human, :computer

  def initialize
    @board = Board.new
    @human = Player.new(HUMAN_MARKER)
    @computer = Player.new(COMPUTER_MARKER, COMPUTER_NAMES.sample)
    @current_marker = nil
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
    prompt_name

    loop do # match loop
      game_setup
      # reset

      single_game

      display_match_result
      break unless play_again?
      display_play_again_message
    end
  end

  def display_welcome_message
    puts "Well howdee do! Welcome to TicTacToe."
  end

  def game_setup
    prompt_winning_score!
    reset!
  end

  def single_game
    loop do
      display_board
      players_move
      increment_score!
      display_game_result_and_score
      break if someone_won_match?
      reset!
    end
  end

  def prompt_who_goes_first
    response = nil
    loop do
      puts "\nWho should go first? Type 1 for you, or 2 for #{computer.name}."
      response = gets.chomp.to_i
      break if [1, 2].include?(response)
      display_invalid_input
    end
    current_marker_assignment!(response)
  end

  def current_marker_assignment!(response)
    case response
    when 1 then @current_marker = HUMAN_MARKER
    when 2 then @current_marker = COMPUTER_MARKER
    else puts "There is an error with this method" # rubocop complained
    end
  end

  def display_invalid_input
    puts "    (Your input was not valid, please try again.)"
  end

  def players_move
    loop do
      current_player_moves!
      break if board.someone_won? || board.full?
      clear_screen_and_display_board if human_turn?
    end
  end

  def prompt_name
    response = nil
    loop do
      puts "\nKindly enter your name? (10 or fewer characters)"
      response = gets.chomp.capitalize.strip
      break unless response.empty? || response.length > 10
      display_invalid_input
    end
    human.name = response
    puts "\nWelcome, #{human.name}!"
    puts "Today, you're playing against the computer, #{computer.name}."
  end

  def prompt_winning_score!
    input = nil
    loop do
      puts "\nHow many games does either player need to win the match? (1-10)"
      input = gets.chomp.to_i
      break if (1..10).include? input
      display_invalid_input
    end
    @score_needed_to_win = input
  end

  def display_goodbye_message
    puts "Thanks for playing #{human.name}, c'mon back now, ya hear?"
  end

  def display_board
    puts ""
    puts ""
    puts "This is the start of a new game"
    puts "#{human.name}, you're the '#{human.marker}', and #{computer.name}
          is the '#{computer.marker}'."
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

  def human_moves!
    square = nil
    puts "choose a square (#{joiner(board.unmarked_keys)}): "
    loop do
      square = gets.chomp.to_i
      break if board.unmarked_keys.include?(square)
      display_invalid_input
    end

    board[square] = human.marker
  end

  def computer_moves!
    win_opportunity = empty_square_of_three(COMPUTER_MARKER)
    block_human_win = empty_square_of_three(HUMAN_MARKER)
    computer_move_conditional(block_human_win, win_opportunity)
  end

  def computer_move_conditional(block_human_win, win_opportunity)
    if win_opportunity
      win_opportunity.marker = computer.marker
    elsif block_human_win
      block_human_win.marker = computer.marker
    elsif board.squares[5].unmarked?
      board[5] = computer.marker
    else
      board[board.unmarked_keys.sample] = computer.marker
    end
  end

  def empty_square_of_three(player_marker)
    opportunity_lines = board.all_winning_line_squares.select do |squares|
      mostly_full = board.x_number_of_identical_markers?(2, squares)
      player_in_row = squares.map(&:marker).include?(player_marker)
      mostly_full && player_in_row
    end
    return nil if opportunity_lines.empty?
    opportunity_lines.first.select(&:unmarked?).first
  end

  def display_game_result_and_score
    clear_screen_and_display_board
    display_winner_or_tie
    puts "\nThe current match score is #{human.name}: #{human.score}" \
           " to #{computer.name}: #{computer.score}".center(77)
    puts "-" * 77
  end

  def display_winner_or_tie
    case board.winning_marker
    when human.marker
      puts "You won this game, #{human.name}!"
    when computer.marker
      puts "Well, shucks, #{computer.name} won this game!"
    else
      puts "The board is full, it's a tie. Snore..."
    end
  end

  def match_winner
    return human if human.score == @score_needed_to_win
    return computer if computer.score == @score_needed_to_win
    nil
  end

  def increment_score!
    case board.winning_marker
    when human.marker
      human.score += 1
    when computer.marker
      computer.score += 1
    end
  end

  def someone_won_match?
    human.score == @score_needed_to_win ||
      computer.score == @score_needed_to_win
  end

  def display_match_result
    puts "\n"
    puts "*********************************************".center(70)
    display_match_winner
    puts "*********************************************".center(70)
  end

  def display_match_winner
    case match_winner
    when human
      puts "Congratulations, #{human.name}!"
      puts "You have bested #{computer.name} in this match to" \
           " #{@score_needed_to_win} games!"
    when computer
      puts "Alas, #{computer.name} has won this" \
           " match to #{@score_needed_to_win} games.".center(70)
    else puts "there is an error in this method"
    end
  end

  def play_again?
    answer = nil
    loop do
      puts "\n\nWould you like to play again? (y/n)"
      answer = gets.chomp.downcase
      break if %w(y n).include? answer
      display_invalid_input
    end

    answer == "y"
  end

  def clear
    system 'clear'
  end

  def reset!
    board.reset
    @current_marker = prompt_who_goes_first
    # clear
  end

  def display_play_again_message
    puts "Let's play again!"
    puts ""
  end

  def human_turn?
    @current_marker == HUMAN_MARKER
  end

  def current_player_moves!
    if human_turn?
      human_moves!
      @current_marker = COMPUTER_MARKER
    else
      computer_moves!
      @current_marker = HUMAN_MARKER
    end
  end
end

game = TTTGame.new
game.play
