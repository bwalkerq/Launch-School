module Displayable

  private

  def display_welcome_message
    puts "Well howdee do! Welcome to TicTacToe."
  end

  def display_invalid_input
    puts "    (Your input was not valid, please try again.)"
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
    else
      puts "there is an error in this method"
    end
  end

  def clear
    system 'clear'
  end

  def display_play_again_message
    puts "Let's play again!"
    puts ""
  end
end
