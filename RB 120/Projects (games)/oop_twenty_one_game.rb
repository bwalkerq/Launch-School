module Displayable
  def display_invalid_input
    puts "    (Your input was not valid, please try again.)"
  end

  def clear
    system "clear"
  end
end

class Participant
  include Displayable
  attr_accessor :hand, :name

  def initialize
    @hand = []
  end

  def display_hand
    puts "---- #{name}'s Hand ----"
    hand.each do |card|
      puts "=> #{card}"
    end
    puts "=> Total: #{total}"
    puts ""
  end

  def prompt_hit?
    response = nil

    loop do
      puts "\nWould you like to hit or stay? (1 for hit / 2 for stay)"
      response = gets.chomp.to_i
      break if !response.to_s.empty? && [1, 2].include?(response)
      display_invalid_input
    end

    response == 1
  end

  def busted?
    total > 21
  end

  def total
    total = @hand.collect(&:value).sum

     # correct for aces
     @hand.select(&:ace?).count.times do
       break if total <= 21
       total -= 10
     end
     # this is so much better than what I came up with, trying to change the
     # name and value of the card. trying access and change a specific card was
     # much harder than I expected, I didn't do it successfully, and then punted
     # to this solution for correcting aces
    total
  end
end

class Player < Participant
  def initialize
    super
    prompt_name
  end

  def prompt_name
    clear
    response = nil
    loop do
      puts "\nKindly enter your name? (10 or fewer characters)"
      response = gets.chomp.capitalize.strip
      break unless response.empty? || response.length > 10
      display_invalid_input
    end
    @name = response
  end
end

class Dealer < Participant
  DEALER_NAMES = %w(Jane Lizzie Darcy Bingley Wickham)
  def initialize
    super
    @name = DEALER_NAMES.sample
  end

  def flop
    first_card = "=> #{hand.first}"
    puts "---- #{name}'s Hand ----"
    puts first_card
    puts "=>" + "???".center(first_card.length)
  end
end

class Card
  attr_reader :suit
  attr_accessor :value, :face

  SUITS = %w(Hearts Clubs Spades Diamonds)
  FACES = %w(2 3 4 5 6 7 8 9 10 Jack Queen King Ace)
  CARD_VALUES = FACES.to_h do |elem|
    if elem == "Ace"
      [elem, 11]
    elsif elem.to_i != 0
      [elem, elem.to_i]
    else
      [elem, 10]
    end
  end

  def initialize(face, suit)
    @face = face
    @suit = suit
    @value = CARD_VALUES[face]
  end

  def to_s
    "The #{face} of #{suit}"
  end

  def ace?
    @face == "Ace"
  end
end

class Deck
  attr_accessor :cards

  def initialize
    @cards = []
    Card::SUITS.each do |suit|
      Card::FACES.each do |face|
        @cards << Card.new(face, suit)
      end
    end
    scramble!
  end

  def scramble!
    cards.shuffle!
  end

  def deal
    @cards.pop
  end
end

class TwentyOne #Orchestration Engine
  include Displayable
  attr_accessor :deck, :player, :dealer

  def initialize
    @deck = Deck.new
    @player = Player.new
    @dealer = Dealer.new
  end

  def game
    loop do
      clear
      deal_initial_cards
      display_flop
      player_turn
      dealer_turn if !player.busted?
      show_result
      break unless prompt_play_again?
    end
  end

  def reset_hands
    player.hand = []
    dealer.hand = []
  end

  def deal_initial_cards
    reset_hands
    2.times do
      player.hand << deck.deal
      dealer.hand << deck.deal
    end
  end

  def joiner(array, delimiter = ", ", end_word = "and")
    case array.length
    when 1
      array[0]
    when 2
      "#{array.first} #{end_word} #{array.last}"
    else
      array[0, (array.length - 1)]
      .join(delimiter) + delimiter + end_word + " #{array[-1]}"
    end
  end

  def display_flop
    player.display_hand
    dealer.flop
  end

  def show_cards
    player.display_hand
    dealer.display_hand
  end

  def deal_one_card(participant)
    participant.hand << deck.deal
  end

  def player_turn
    loop do
      break if player.busted?
      if player.prompt_hit?
        deal_one_card(player)
      else
        break
      end
      show_cards
    end
  end

  def dealer_turn
    total = dealer.total
    until total >= 17 || total > player.total || dealer.busted? do
      deal_one_card(dealer)
      show_cards
    end
  end

  def show_result
    if player.busted?
      puts "Alas, you have busted. The dealer wins!"
    elsif dealer.busted?
      puts "The dealer busted, and you are victorious!"
    elsif winner == "tie"
      puts "You and the dealer have tied, no one wins."
    else
      puts "The #{winner} has won!"
    end
  end

  def winner
    case player.total <=> dealer.total
    when 1 then player
    when -1 then dealer
    else
      "tie"
    end
  end

  def prompt_play_again?
    response = nil

    loop do
      puts "\n\nWould you like to play again? (1 for Yes / 2 for No)"
      response = gets.chomp.to_i
      break if !response.to_s.empty? && [1, 2].include?(response)
      display_invalid_input
    end

    response == 1
  end
end

TwentyOne.new.game
# deck = Deck.new
# p hand = deck.cards.pop(30)
