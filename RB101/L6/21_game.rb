CARD_VALUES = { jack: 10, queen: 10, king: 10, ace: 11, ace_as_one: 1 }
(2..10).each { |x| CARD_VALUES[x] = x }
p CARD_VALUES

def prompt(msg)
  puts "==> #{msg}"
end

def initialize_deck
  deck = []
  4.times do
    (1..10).each { |x| deck << x }
    deck += [:jack, :queen, :king, :ace]
  end
  deck
end

def initial_deal(dck)
  first_two_cards = dck.sample(2)
  dck.delete(first_two_cards[0])
  dck.delete(first_two_cards[1])
  first_two_cards
end

def busted?(hand)
  calculate_score(hand) > 21
end

def calculate_score(hand)
  score = 0
  loop do
    score = 0
    hand.each do |card|
      score += CARD_VALUES[card]
    end
    change_ace_to_one(hand, score)
    break if !hand.include?(:ace) || score < 21
  end
  score
end

def change_ace_to_one(hand, score)
  if score > 21 && hand.include?(:ace)
    # replace the :ace with :ace_as_one
    hand.map do |card|
      if card == :ace
        hand[hand.index(:ace)] = :ace_as_one
      else
        card
      end
    end
  end
end

def deal_a_card(dck, hand)
  new_card = dck.sample
  dck.delete_at(dck.index(new_card))
  prompt "A #{new_card} was drawn"
  hand << new_card
end

def show_current_state(hand, dlr_hand)
  calculate_score(hand) # this is here to catch
  prompt "Your hand is currently: #{hand.join(', ')}"
  prompt "Your SCORE is ** #{calculate_score(hand)} **"
  prompt "My hand is currently: #{dlr_hand.join(', ')}"
  prompt "My SCORE is ** #{calculate_score(dlr_hand)} **"
end

def player_turn(dck, hand, dlr_hand, dlr_score)
  loop do
    show_current_state(hand, dlr_hand)
    break if busted?(hand)
    prompt "Would you like to Hit or Stay?"
    answer = gets.chomp.downcase
    break if answer.start_with?('s')
    deal_a_card(dck, hand)
  end
  show_current_state(hand, dlr_hand)

end

def dealer_turn(dck, hand, dlr_hand, plyr_score)
  until calculate_score(dlr_hand) > 17
    deal_a_card(dck, dlr_hand)
    show_current_state(hand, dlr_hand)
  end

end

def declare_winner(hand,dlr_hand)
  # I should complete the tictactoe refactor first, then work on this
  # About to work on this, instructions say that one method should return the winner,
  # and another method should display the prompt about the winner
  # instructions say that each method should do only one thing
  # which prompted me to skim my methods and see that there are clearly many which do
  # more than just one thing, so I should probably refactor this a lot
  winner = nil
end

# Gameplay
prompt "Welcome to 21. Must be 21 to play... Wait, what?"
prompt "I'm a little new at this, but let's get started. I'll be your friendly dealer, Don Chu Luffloosen."
player_score = 0
dealer_score = 0

loop do
  deck = initialize_deck
  player_hand = initial_deal(deck)
  dealer_hand = initial_deal(deck)
  player_turn(deck, player_hand, dealer_hand, dealer_score)
  # 4. If player bust, dealer wins.
  if busted?(hand)
    prompt "Sorry, you busted! I have won!"
    dlr_score += 1
  end
  # 5. Dealer turn: hit or stay
  # - repeat until total >= 17
  dealer_turn(deck, player_hand, dealer_hand, player_score)
  # 6. If dealer bust, player wins.
  if busted?(dealer_hand)
    prompt "Drat, I have indeed busted. Well done."
    plyr_score += 1
    break
  end
  # 7. Compare cards and declare winner.
  declare_winner if (!busted?(dealer_hand) && !busted?(player_hand))
  prompt "Number of times you have won: #{player_score}"
  prompt "Number of times I, the great Don Chu, have won: #{dealer_score}."
end
