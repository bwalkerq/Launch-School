module Promptable

  private

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

  def prompt_play_again?
    answer = nil
    loop do
      puts "\n\nWould you like to play again? (y/n)"
      answer = gets.chomp.downcase
      break if %w(y n).include? answer
      display_invalid_input
    end

    answer == "y"
  end
end
