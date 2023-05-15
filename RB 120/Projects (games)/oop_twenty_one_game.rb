class Participant
  attr_accessor :hand

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
      puts "Would you like to hit or stay? (1 for hit / 2 for stay)"
      response = gets.chomp.to_i
      break if !response.to_s.empty? && [1, 2].include?(response)
      display_invalid_input
    end
    response == 1
  end

  def display_invalid_input
    puts "    (Your input was not valid, please try again.)"
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

end

class Dealer < Participant

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
  attr_accessor :deck, :player, :dealer

  def initialize
    @deck = Deck.new
    @player = Player.new
    @dealer = Dealer.new
  end

  def start
    deal_cards
    show_cards
    player_turn
    dealer_turn if !player.busted?
    show_result
  end

  def deal_cards
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

  def show_cards
    puts "Your hand is #{joiner(player.hand.map(&:face))}, for a score of #{player.total}."
    puts "The dealer's hand is #{joiner(dealer.hand.map(&:face))}, for a total of #{dealer.total}"
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
end

TwentyOne.new.start
# deck = Deck.new
# p hand = deck.cards.pop(30)
