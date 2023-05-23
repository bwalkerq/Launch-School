class Machine
  def start
    flip_switch(:on)
  end

  def stop
    flip_switch(:off)
  end

  private

  attr_writer :switch

  def flip_switch(desired_state)
    self.switch = desired_state
  end
end

class FixedArray
  def initialize(size)
    @array = Array.new(size)
  end

  def [](index)
    raise IndexError if index > @array.size
    @array[index]
  end

  def []= (index, new)
    raise IndexError if index > @array.size
    @array[index]=new
  end

  def to_a
    @array.clone
  end

  def to_s
    @array.to_s
  end
end

# fixed_array = FixedArray.new(5)
# puts fixed_array[3] == nil
# puts fixed_array.to_a == [nil] * 5
#
# fixed_array[3] = 'a'
# puts fixed_array[3] == 'a'
# puts fixed_array.to_a == [nil, nil, nil, 'a', nil]
#
# fixed_array[1] = 'b'
# puts fixed_array[1] == 'b'
# puts fixed_array.to_a == [nil, 'b', nil, 'a', nil]
#
# fixed_array[1] = 'c'
# puts fixed_array[1] == 'c'
# puts fixed_array.to_a == [nil, 'c', nil, 'a', nil]
#
# fixed_array[4] = 'd'
# puts fixed_array[4] == 'd'
# puts fixed_array.to_a == [nil, 'c', nil, 'a', 'd']
# puts fixed_array.to_s == '[nil, "c", nil, "a", "d"]'
#
# puts fixed_array[-1] == 'd'
# puts fixed_array[-4] == 'c'


# begin
#   p fixed_array[6]
#   puts false
# rescue IndexError
#   puts true
# end
#
# begin
#   fixed_array[-7] = 3
#   puts false
# rescue IndexError
#   puts true
# end
#
# begin
#   fixed_array[7] = 3
#   puts false
# rescue IndexError
#   puts true
# end

class Student
  def initialize(name, year)
    @name = name
    @year = year
  end
end

class Graduate < Student
  def initialize(name, year, parking)
    super(name, year)
    @parking = parking
  end
end

class Undergraduate < Student
  def initialize(name, year)
    super
  end
end

# benji = Undergraduate.new("Benji", 2010)
# # p benji.parking
#
# benjamin = Graduate.new("Benjamin", 2012,"yes")
# p benjamin


# I'm choosing not to use fixed array from above because I'd rather keep
# track of age of elements by position, and fixed array doesn't have
# pop or unshift

class CircularQueue
  attr_accessor :array

  def initialize(size)
    @array = Array.new(size)
  end

  def queue_full?
    @array.none?(nil)
  end

  def queue_empty?
    @array.all?(nil)
  end

  def enqueue(new_element)
    if queue_full?
      dequeue(new_element)
    else
      nil_count = @array.count(nil)
      @array[-nil_count] = new_element
    end
  end

  def dequeue(element=nil)
    if queue_empty?
      return nil
    else
      @array << element
      @array.shift
    end
  end
end
# I feel proud that I figured out my solution without reading the hint, and that
# my solution is the preferred method. As soon as the problem said "connected
# end-to-end" in a circle, I thought of a line, and then an array. It's a joy
# to see how my mind interprets problems, sometimes!

# test_queue = CircularQueue.new(3,)
# p test_queue.array
# p test_queue.queue_empty?
# p test_queue.array[0]=1
# p test_queue.array.shift # pulls first out
# p test_queue.array
# p test_queue.array.count(nil)

# queue = CircularQueue.new(3)
# puts queue.dequeue == nil
#
# queue.enqueue(1)
# queue.enqueue(2)
# puts queue.dequeue == 1
#
# queue.enqueue(3)
# queue.enqueue(4)
# puts queue.dequeue == 2
#
# queue.enqueue(5)
# queue.enqueue(6)
# queue.enqueue(7)
# puts queue.dequeue == 5
# puts queue.dequeue == 6
# puts queue.dequeue == 7
# puts queue.dequeue == nil
#
# queue = CircularQueue.new(4)
# puts queue.dequeue == nil
#
# queue.enqueue(1)
# queue.enqueue(2)
# puts queue.dequeue == 1
#
#
# queue.enqueue(3)
# queue.enqueue(4)
# puts queue.dequeue == 2
#
# queue.enqueue(5)
# queue.enqueue(6)
# queue.enqueue(7)
# puts queue.dequeue == 4
# puts queue.dequeue == 5
# puts queue.dequeue == 6
# puts queue.dequeue == 7
# puts queue.dequeue == nil

class Minilang
  def initialize
    @register = 0
    @stack = []
  end
end
# dunno what .eval does, I read the documentation for the three versions of eval
# and none of it made sense, so I'm not about to go for eval plus send plus error
# exceptions, nah

# Minilang.new('PRINT').eval
# # 0
#
# Minilang.new('5 PUSH 3 MULT PRINT').eval
# # 15
#
# Minilang.new('5 PRINT PUSH 3 PRINT ADD PRINT').eval
# # 5
# # 3
# # 8
#
# Minilang.new('5 PUSH 10 PRINT POP PRINT').eval
# # 10
# # 5
#
# Minilang.new('5 PUSH POP POP PRINT').eval
# # Empty stack!
#
# Minilang.new('3 PUSH PUSH 7 DIV MULT PRINT ').eval
# # 6
#
# Minilang.new('4 PUSH PUSH 7 MOD MULT PRINT ').eval
# # 12
#
# Minilang.new('-3 PUSH 5 XSUB PRINT').eval
# # Invalid token: XSUB
#
# Minilang.new('-3 PUSH 5 SUB PRINT').eval
# # 8
#
# Minilang.new('6 PUSH').eval
# # (nothing printed; no PRINT commands)

class GuessingGame

  def initialize(low, high)
    @range = (low..high).to_a
    @secret = nil
    @guesses = nil
    @wins = false
  end

  def play
    @secret = @range.sample
    @guesses = Math.log2(@range.size).to_i + 1
    @wins = false
    loop do
      play_one_round
      break if @wins == true || @guesses == 0
    end
    if @wins == true
      puts "You won!"
    else
      puts "You lost, bro."
    end
  end

  def play_one_round
    response = nil
    puts "You have #{@guesses} guesses remaining."
    loop do
      puts "Enter a number between #{@range.first} and #{@range.last}:"
      response = gets.chomp.to_i
      break if @range.include?(response)
      puts "Invalid guess"
    end

    if response == @secret
      puts "That's the number!"
      @wins = true
    elsif response < @secret
      puts "Your guess is too low."
    else
      puts "Your guess is too high."
    end
    @guesses -= 1
  end
end

# g = GuessingGame.new(500,1000)
# p g
# g.play

class Card
  include Comparable
  attr_reader :rank, :suit

  def initialize(rank, suit)
    @rank = rank
    @suit = suit
  end

  def value
    case @rank
    when "Jack" then 11
    when "Queen" then 12
    when "King" then 13
    when "Ace" then 14
    else
      @rank
    end
  end

  def <=>(other)
    self.value <=> other.value
  end

  def to_s
    "#{@rank} of #{@suit}"
  end
end
# the big take away for me here is that #<=> is not a class method; it's an
# instance method. This is surprising! Because when #max returns the object
# of a group by using the elements own #<=> for comparison, I def expected --oops
# damn no I'm tripping. It's late and I'm fried from being with Olie all day,
# I had originally written <=> as a class method, but Cards the class never
# calls a method, it's always instances of Cards calling it. dang. that's a burn

# cards = [Card.new(2, 'Hearts'),
#          Card.new(10, 'Diamonds'),
#          Card.new('Ace', 'Clubs')]
# puts cards.map(&:rank_num)
# puts cards
# puts cards.min == Card.new(2, 'Hearts')
# puts cards.max == Card.new('Ace', 'Clubs')
#
# cards = [Card.new(5, 'Hearts')]
# puts cards.min == Card.new(5, 'Hearts')
# puts cards.max == Card.new(5, 'Hearts')
#
# cards = [Card.new(4, 'Hearts'),
#          Card.new(4, 'Diamonds'),
#          Card.new(10, 'Clubs')]
# puts cards.min.rank == 4
# puts cards.max == Card.new(10, 'Clubs')
#
# cards = [Card.new(7, 'Diamonds'),
#          Card.new('Jack', 'Diamonds'),
#          Card.new('Jack', 'Spades')]
# puts cards.min == Card.new(7, 'Diamonds')
# puts cards.max.rank == 'Jack'
#
# cards = [Card.new(8, 'Diamonds'),
#          Card.new(8, 'Clubs'),
#          Card.new(8, 'Spades')]
# puts cards.min.rank == 8
# puts cards.max.rank == 8


class Deck
  RANKS = ((2..10).to_a + %w(Jack Queen King Ace)).freeze
  SUITS = %w(Hearts Clubs Diamonds Spades).freeze

  def initialize
    @deck = new_deck
  end

  def new_deck
    deck = Array.new
    RANKS.each do |rank|
      SUITS.each do |suit|
        deck << Card.new(rank, suit)
      end
    end
    deck.shuffle!
  end

  def draw
    @deck = new_deck if @deck.empty?
    @deck.pop
  end
end

# deck = Deck.new
# drawn = []
# 52.times { drawn << deck.draw }
# p drawn.count { |card| card.rank == 5 } == 4
# p drawn.count { |card| card.suit == 'Hearts' } == 13
#
# drawn2 = []
# 52.times { drawn2 << deck.draw }
# p drawn != drawn2 # Almost always.

# Include Card and Deck classes from the last two exercises.

class PokerHand
  attr_accessor :hand
  def initialize(deck)
    @hand = []
    5.times {@hand << deck.draw}
  end

  def print
    @hand.each do|card|
      puts card
    end
  end

  def evaluate
    case
    when royal_flush?     then 'Royal flush'
    when straight_flush?  then 'Straight flush'
    when four_of_a_kind?  then 'Four of a kind'
    when full_house?      then 'Full house'
    when flush?           then 'Flush'
    when straight?        then 'Straight'
    when three_of_a_kind? then 'Three of a kind'
    when two_pair?        then 'Two pair'
    when pair?            then 'Pair'
    else                       'High card'
    end
  end

  # private

  def ranks_tally
    hand.collect(&:rank).tally
  end

  def sorted_values
    hand.collect(&:value).sort
  end

  def n_of_a_kind(n)
    ranks_tally.value?(n)
  end

  def royal_flush?
    straight_flush? && sorted_values.min == 10
  end

  def straight_flush?
    straight? && flush?
  end

  def four_of_a_kind?
    n_of_a_kind(4)
  end

  def full_house?
    three_of_a_kind? && pair?
  end

  def flush?
    hand.collect(&:suit).uniq.size == 1
  end

  def straight?
    min = sorted_values.min
    (min..(min+4)).to_a == sorted_values
  end

  def three_of_a_kind?
    n_of_a_kind(3)
  end

  def two_pair?
    ranks_tally.count {|_,v| v == 2} == 2
  end

  def pair?
    n_of_a_kind(2)
  end
end

hand = PokerHand.new(Deck.new)
hand.print
puts hand.evaluate

# Danger danger danger: monkey
# patching for testing purposes.
class Array
  alias_method :draw, :pop
end

# Test that we can identify each PokerHand type.
hand = PokerHand.new([
                       Card.new(10,      'Hearts'),
                       Card.new('Ace',   'Hearts'),
                       Card.new('Queen', 'Hearts'),
                       Card.new('King',  'Hearts'),
                       Card.new('Jack',  'Hearts')
                     ])
puts hand.evaluate == 'Royal flush'

hand = PokerHand.new([
                       Card.new(8,       'Clubs'),
                       Card.new(9,       'Clubs'),
                       Card.new('Queen', 'Clubs'),
                       Card.new(10,      'Clubs'),
                       Card.new('Jack',  'Clubs')
                     ])
puts hand.evaluate == 'Straight flush'

hand = PokerHand.new([
                       Card.new(3, 'Hearts'),
                       Card.new(3, 'Clubs'),
                       Card.new(5, 'Diamonds'),
                       Card.new(3, 'Spades'),
                       Card.new(3, 'Diamonds')
                     ])
puts hand.evaluate == 'Four of a kind'

hand = PokerHand.new([
                       Card.new(3, 'Hearts'),
                       Card.new(3, 'Clubs'),
                       Card.new(5, 'Diamonds'),
                       Card.new(3, 'Spades'),
                       Card.new(5, 'Hearts')
                     ])
puts hand.evaluate == 'Full house'

hand = PokerHand.new([
                       Card.new(10, 'Hearts'),
                       Card.new('Ace', 'Hearts'),
                       Card.new(2, 'Hearts'),
                       Card.new('King', 'Hearts'),
                       Card.new(3, 'Hearts')
                     ])
puts hand.evaluate == 'Flush'

hand = PokerHand.new([
                       Card.new(8,      'Clubs'),
                       Card.new(9,      'Diamonds'),
                       Card.new(10,     'Clubs'),
                       Card.new(7,      'Hearts'),
                       Card.new('Jack', 'Clubs')
                     ])
puts hand.evaluate == 'Straight'

hand = PokerHand.new([
                       Card.new('Queen', 'Clubs'),
                       Card.new('King',  'Diamonds'),
                       Card.new(10,      'Clubs'),
                       Card.new('Ace',   'Hearts'),
                       Card.new('Jack',  'Clubs')
                     ])
puts hand.evaluate == 'Straight'

hand = PokerHand.new([
                       Card.new(3, 'Hearts'),
                       Card.new(3, 'Clubs'),
                       Card.new(5, 'Diamonds'),
                       Card.new(3, 'Spades'),
                       Card.new(6, 'Diamonds')
                     ])
puts hand.evaluate == 'Three of a kind'

hand = PokerHand.new([
                       Card.new(9, 'Hearts'),
                       Card.new(9, 'Clubs'),
                       Card.new(5, 'Diamonds'),
                       Card.new(8, 'Spades'),
                       Card.new(5, 'Hearts')
                     ])
puts hand.evaluate == 'Two pair'

hand = PokerHand.new([
                       Card.new(2, 'Hearts'),
                       Card.new(9, 'Clubs'),
                       Card.new(5, 'Diamonds'),
                       Card.new(9, 'Spades'),
                       Card.new(3, 'Diamonds')
                     ])
puts hand.evaluate == 'Pair'

hand = PokerHand.new([
                       Card.new(2,      'Hearts'),
                       Card.new('King', 'Clubs'),
                       Card.new(5,      'Diamonds'),
                       Card.new(9,      'Spades'),
                       Card.new(3,      'Diamonds')
                     ])
puts hand.evaluate == 'High card'



























