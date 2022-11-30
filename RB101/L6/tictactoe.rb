require 'pry'
=begin
1. Display the initial empty 3x3 board.
  Probably keep the values of the board in a 9-element array,
  in "read-order" 123 top, 456 middle, 789 bottom.
  Could display them in 3x3 (2-D) format
2. Ask the user to mark a square.
  Could list the places as numbers until they're marked with X or O
3. Computer marks a square.
4. Display the updated board state.
5. If winner, display winner.
  - winning combinations, how many?
    - 3 across, 3 down, 2 diagonals (wow, WAY fewer than I thought, ha)
6. If board is full, display tie.
7. If neither winner nor board is full, go to #2
8. Play again?
9. If yes, go to #1
10. Good bye!
=end
WINNING_LINES = [[1, 2, 3], [4, 5, 6], [7, 8, 9]] + # rows
                [[1, 4, 7], [2, 5, 8], [3, 6, 9]] + # columns
                [[1, 5, 9], [3, 5, 7]] # diagonals
INITIAL_MARKER = ' '
PLAYER_MARKER = 'X'
COMPUTER_MARKER = 'O'

wins = 0
comp_wins = 0

def prompt(msg)
  puts "=> #{msg}"
end

def joiner(array, delimiter=', ', last_word="or")
  case array.count
  when 1
    array[0].to_s
  when 2
    array.join(" #{last_word} ")
  else
    array[0..-2].join(delimiter) + "#{delimiter}#{last_word} " + array[-1].to_s
  end
end

# rubocop:disable Metrics/MethodLength, Layout/LineLength
def display_board(brd)
  system 'clear'
  puts prompt "You're the #{PLAYER_MARKER}'s. The Computer is the #{COMPUTER_MARKER}'s."
  puts %(
  -------------------
  "     |     |     "
  "  #{brd[1]}  |  #{brd[2]}  |  #{brd[3]}  "
  "     |     |     "
  "-----+-----+-----"
  "     |     |     "
  "  #{brd[4]}  |  #{brd[5]}  |  #{brd[6]}  "
  "     |     |     "
  "-----+-----+-----"
  "     |     |     "
  "  #{brd[7]}  |  #{brd[8]}  |  #{brd[9]}  "
  "     |     |     "
  -------------------

       )
end
# rubocop:enable Metrics/MethodLength, Layout/LineLength

def initialize_board
  new_board = {}
  (1..9).each { |num| new_board[num] = INITIAL_MARKER }
  new_board
end

def empty_squares(brd)
  brd.keys.select { |num| brd[num] == INITIAL_MARKER }
end

def player_places_piece!(brd)
  square = ''
  loop do
    prompt "Choose a square (#{joiner(empty_squares(brd))}):"
    square = gets.chomp.to_i
    break if empty_squares(brd).include?(square)
    prompt "Sorry, that's not a valid choice"
  end
  brd[square] = PLAYER_MARKER
end

def find_at_risk_square(brd) # defensive AI, had to use flatten after selection
  line_to_defend = WINNING_LINES.select do|line|
    player_spots_in_line = 0
    line.each do |position|
      player_spots_in_line += 1 if brd[position] == PLAYER_MARKER
    end
    player_spots_in_line == 2 # returns true to #select to pick out that array
  end
  line_to_defend.flatten.each do |position|
    return position if brd[position] == ' '
  end
end

def computer_places_piece!(brd)
  square = find_at_risk_square(brd)
  square = empty_squares(brd).sample if square == []
  # the method for finding at-risk square returns an empty array
  # if there are non found
  brd[square] = COMPUTER_MARKER
end

def board_full?(brd)
  empty_squares(brd).empty?
end

def someone_won?(brd)
  !!detect_winner(brd)
end

def detect_winner(brd)
  WINNING_LINES.each do |line|
    if brd[line[0]] == PLAYER_MARKER &&
       brd[line[1]] == PLAYER_MARKER &&
       brd[line[2]] == PLAYER_MARKER
      return 'Player'
    elsif brd[line[0]] == COMPUTER_MARKER &&
          brd[line[1]] == COMPUTER_MARKER &&
          brd[line[2]] == COMPUTER_MARKER
      return 'Computer'
    end
  end
  nil
end

# Gameplay!
loop do
  board = initialize_board
  loop do
    display_board(board)
    player_places_piece!(board)
    break if someone_won?(board) || board_full?(board)
    computer_places_piece!(board)
    break if someone_won?(board) || board_full?(board)
  end

  display_board(board)

  if detect_winner(board) == 'Player'
    wins += 1
    prompt "#{detect_winner(board)} won!"
  elsif detect_winner(board) == 'Computer'
    comp_wins += 1
    prompt "#{detect_winner(board)} won!"
  else
    prompt "It's a tie."
  end

  prompt "The score is: You = #{wins} and Computer = #{comp_wins}. Play again? (Y/n)"
  response = gets.chomp.downcase
  break unless response.start_with?('y')
end
prompt "Thanks for playing. Peace."
