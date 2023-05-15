require 'yaml'

WIN_GOAL = { easy: 2, normal: 3 }

CONFIG = YAML.load_file('ttt.yml')

module Printables
  def display_frame(content)
    screen_clear
    puts content
  end

  def screen_clear
    system 'clear'
  end

  def play_animation(frames, loops: 1)
    loops.times do
      frames.each do |frame|
        display_frame(frame)
        sleep(0.15)
      end
    end
  end

  def render(components)
    rendered_frame = []
    components.first.size.times do |line|
      rendered_line = ''
      components.each do |component|
        rendered_line << component[line]
      end
      rendered_frame << rendered_line
    end
    rendered_frame
  end

  def multi_string_format(template, dynamic_content = nil)
    text = CONFIG[template].join("\n")
    if dynamic_content
      format(text, dynamic_content)
    else
      text
    end
  end

  def format_list(list)
    if list.size == 1
      list.first
    else
      list[0...-1].join(', ') + " or #{list.last}"
    end
  end
end

module Interactables
  include Printables

  def get_num_from_user(question, options: nil)
    loop do
      screen_clear
      choice = question_user(question).to_i
      return choice if options.include?(choice)
      reject_input
    end
  end

  def get_text_from_user(prompt, options: nil)
    loop do
      screen_clear
      answer = question_user(prompt).capitalize
      return answer if valid_response?(options, answer)
      reject_input
    end
  end

  def question_user(question)
    puts question
    gets.chomp
  end

  def reject_input
    rejection_message = CONFIG['invalid_input']
    display_frame(rejection_message)
    sleep(0.5)
  end

  def valid_response?(options, answer)
    if options
      options.include?(answer)
    else
      !(answer.delete(' ').empty? || answer.size > 10)
    end
  end
end

module Displayables
  include Printables

  def display_welcome_message
    column = CONFIG['empty_box']
    frames = CONFIG['intro_seq']

    frames = frames.map do |frame|
      render([column, frame, column])
    end
    play_animation(frames)
  end

  def render_menu_interface
    components = [human.to_s, render_menu_text, computer.to_s]
    components.map! { |component| component.split("\n") }
    render(components)
  end

  def render_menu_text
    match_settings = {
      mode: format_menu_element(@mode.to_s),
      first: format_menu_element(@starter)
    }
    multi_string_format('menu', match_settings)
  end

  def render_starter_options
    names = {
      human: format_menu_element(human.name),
      computer: format_menu_element(computer.name)
    }
    multi_string_format('select_starter', names)
  end

  def format_menu_element(name)
    name.capitalize.ljust(10)
  end

  def display_game_result
    game_result = CONFIG['game_result']
    if human.wins == WIN_GOAL[mode]
      play_animation(game_result['win'], loops: 6)
    else
      display_frame(game_result['lose'])
      sleep(1)
    end
  end

  def display_goodbye_message
    display_frame(CONFIG['outro'])
    sleep(1)
    screen_clear
  end
end

class Board
  WINNING_LINES = [[1, 2, 3], [4, 5, 6], [7, 8, 9]] +
    [[1, 4, 7], [2, 5, 8], [3, 6, 9]] +
    [[1, 5, 9], [3, 5, 7]]

  attr_reader :squares

  def initialize
    @squares = {}
    reset
  end

  def winning_lines
    WINNING_LINES
  end

  # rubocop: disable Metrics/AbcSize
  def to_s
    board = CONFIG["board"].join("\n")
    format(board,
           sq1: squares[1], sq2: squares[2], sq3: squares[3],
           sq4: squares[4], sq5: squares[5], sq6: squares[6],
           sq7: squares[7], sq8: squares[8], sq9: squares[9])
  end
  # rubocop: enable Metrics/AbcSize

  def []=(key, marker)
    @squares[key].marker = marker
  end

  def someone_won?
    !!winning_marker
  end

  def unmarked_keys
    @squares.keys.select { |key| @squares[key].unmarked? }
  end

  def full?
    unmarked_keys.empty?
  end

  def reset
    (1..9).each { |key| @squares[key] = Square.new }
  end

  # returns winning marker or nil
  def winning_marker
    WINNING_LINES.each do |line|
      squares = @squares.values_at(*line)
      if three_identical_markers?(squares)
        return squares.first.marker
      end
    end
    nil
  end

  private

  def three_identical_markers?(squares)
    markers = squares.select(&:marked?).collect(&:marker)
    return false if markers.size != 3
    markers.min == markers.max
  end
end

class Square
  INITIAL_MARKER = " "

  attr_accessor :marker

  def initialize(marker=INITIAL_MARKER)
    @marker = marker
  end

  def to_s
    if [' ', '⭕️'].include?(marker)
      marker.center(5)
    else
      marker.center(4)
    end
  end

  def marked?
    marker != INITIAL_MARKER
  end

  def unmarked?
    marker == INITIAL_MARKER
  end
end

class Player
  @@selected_markers = []
  @@selected_avatars = []

  attr_reader :marker, :name, :avatar
  attr_accessor :wins

  def initialize
    @wins = 0
  end

  def to_s
    name_card = CONFIG['name_card'].join("\n")
    format(name_card,
           name: name.center(12),
           face: centre_avatar,
           marker: marker.center(1),
           wins: wins)
  end

  private

  def store_marker_selection!
    @@selected_markers << marker
  end

  def store_avatar_selection!
    @@selected_avatars << avatar
  end

  def centre_avatar
    faces = CONFIG['faces']
    case avatar
    when faces[2] then avatar.center(13)
    when faces[3] then avatar.center(15)
    when faces[5] then avatar.center(14)
    else
      avatar.center(12)
    end
  end
end

class Human < Player
  include Interactables

  def initialize
    super
    set_name
    select_marker
    select_avatar
  end

  def select_marker
    choice = get_num_from_user(CONFIG['marker_options'], options: (1..8))
    @marker = CONFIG['markers'][choice]
    store_marker_selection!
  end

  def select_avatar
    choice = get_num_from_user(CONFIG['face_options'], options: (1..6))
    @avatar = CONFIG['faces'][choice]
    store_avatar_selection!
  end

  def set_name
    @name = get_text_from_user(CONFIG['enter_name'])
  end
end

class Computer < Player
  attr_accessor :board

  def initialize
    @name = select_name
    @marker = select_marker
    @avatar = select_avatar
    super()
  end

  def choose_move(mode)
    if mode == :easy
      board.unmarked_keys.sample
    else
      make_strategic_choice
    end
  end


  private

  def select_name
    CONFIG['cpu_names'].sample
  end

  def select_marker
    loop do
      choice = CONFIG['markers'].values.sample
      return choice if marker_available?(choice)
    end
  end

  def select_avatar
    loop do
      choice = CONFIG['faces'].values.sample
      return choice if avatar_available?(choice)
    end
  end

  def marker_available?(choice)
    !@@selected_markers.include?(choice)
  end

  def avatar_available?(choice)
    !@@selected_avatars.include?(choice)
  end

  def make_strategic_choice
    if !offensive_options.empty?
      offensive_options.sample
    elsif !defensive_options.empty?
      defensive_options.sample
    elsif board.squares[5].unmarked?
      5
    else
      board.unmarked_keys.sample
    end
  end

  def offensive_options
    board.unmarked_keys.select do |key|
      available_sets = board.winning_lines.select { |line| line.include?(key) }
      available_sets.any? do |line|
        potential_win?(line)
      end
    end
  end

  def defensive_options
    board.unmarked_keys.select do |key|
      find_available_sets(key).any? do |line|
        potential_loss?(line)
      end
    end
  end

  def find_available_sets(key)
    board.winning_lines.select { |line| line.include?(key) }
  end

  def potential_win?(line)
    squares = board.squares
    total = squares.values_at(*line).count do |square|
      square.marker == marker
    end
    total == 2
  end

  def potential_loss?(line)
    squares = board.squares
    total = squares.values_at(*line).count do |square|
      square.marked? && square.marker != marker
    end
    total == 2
  end
end

class TTTMatch
  include Interactables
  attr_reader :board, :human, :computer, :current_player, :mode

  def initialize(mode, players, starter)
    @board = Board.new
    @mode = mode
    @human = players[0]
    @computer = players[1]
    @current_player = starter
  end

  def play_match
    display_frame(render_interface)
    player_moves
    display_result
  end

  def find_winner
    if board.winning_marker == human.marker
      human
    elsif board.winning_marker == computer.marker
      computer
    end
  end

  private

  def render_interface
    components = [human.to_s, board.to_s, computer.to_s]
    components.map! { |component| component.split("\n") }
    render(components)
  end

  def player_moves
    loop do
      current_player_moves
      display_frame(render_interface)
      sleep(0.3)
      break if board.someone_won? || board.full?
    end
  end

  def current_player_moves
    if current_player == human
      human_moves!
      @current_player = computer
    else
      computer_moves!
      @current_player = human
    end
  end

  def human_moves!
    options = board.unmarked_keys
    prompt = render_interface
    prompt << "\nPlease Enter #{format_list(options)}:"
    square = get_num_from_user(prompt, options: options)
    board[square] = human.marker
  end

  def computer_moves!
    computer.board = board
    choice = computer.choose_move(mode)
    board[choice] = computer.marker
  end

  def display_result
    result = render_match_endframe
    display_frame(result)
    sleep(1)
  end

  def render_match_endframe
    winner = if board.someone_won?
               find_winner.name + " Won!"
             else
               "It's a tie"
             end

    multi_string_format('match_winner', winner: winner.center(16))
  end
end

class TTTGame
  include Displayables, Interactables

  def initialize
    @human = Human.new
    @computer = Computer.new
    @starter = "Random"
    @mode = :easy
  end

  def play
    # display_welcome_message
    setup_players
    main_menu
    display_goodbye_message
  end

  private

  attr_reader :board, :human, :computer, :current_player, :mode

  def setup_players

  end

  def main_menu
    loop do
      case get_num_from_user(render_menu_interface, options: (1..3))
      when 2 then change_game_mode!
      when 3 then change_starter!
      when 1
        main_game
        break unless play_again?
      end
    end
  end

  def change_game_mode!
    @mode = case get_num_from_user(multi_string_format('mode_options'),
                                   options: (1..2))
            when 1 then :easy
            when 2 then :normal
            end
  end

  def change_starter!
    @starter = case get_num_from_user(render_starter_options, options: (1..3))
               when 1 then human.name
               when 2 then computer.name
               when 3 then "Random"
               end
  end

  def main_game
    loop do
      match = TTTMatch.new(mode, [human, computer], starter)
      match.play_match
      record_score(match)
      break if game_winner?
    end
    display_game_result
    reset_wins
  end

  def record_score(match)
    winner = match.find_winner
    winner.wins += 1 if winner
  end

  def play_again?
    get_text_from_user(CONFIG['play_again'], options: %w(Y N)) == "Y"
  end

  def game_winner?
    human.wins == WIN_GOAL[mode] || computer.wins == WIN_GOAL[mode]
  end

  def reset_wins
    human.wins = 0
    computer.wins = 0
  end

  def starter
    if @starter == human.name
      human
    elsif @starter == computer.name
      computer
    else
      [computer, human].sample
    end
  end
end

game = TTTGame.new
game.play
