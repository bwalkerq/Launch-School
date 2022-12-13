CARD_VALUES = { jack: 10, queen: 10, king: 10, ace: 11, ace_as_one: 1 }
(2..10).each { |x| CARD_VALUES[x] = x }

player_score = 0
dealer_score = 0

def prompt(msg)
  puts "==> #{msg}"
end

def initialize_deck
  deck = []
  4.times do
    (2..10).each { |x| deck << x }
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
  puts ""
  prompt "My hand is currently: #{dlr_hand.join(', ')}"
  prompt "My SCORE is ** #{calculate_score(dlr_hand)} **"
end

def player_turn(dck, hand, dlr_hand)
  loop do
    system 'clear'
    show_current_state(hand, dlr_hand)
    break if busted?(hand)
    puts ""
    prompt "Would you like to Hit or Stay? (h or s)"
    answer = nil
    loop do
      answer = gets.chomp.downcase
      if answer.start_with?('s')
        break
      elsif answer.start_with?('h')
        deal_a_card(dck, hand)
        break
      else
        prompt "invalid; h for Hit or s for Stay"
      end
    end
    break if answer.start_with?('s')
  end
  show_current_state(hand, dlr_hand)
end

def dealer_turn(dck, hand, dlr_hand)
  until (calculate_score(dlr_hand) >= 17) ||
        ((calculate_score(hand) <=> calculate_score(dlr_hand)) == -1)
    prompt "I'll take another card"
    deal_a_card(dck, dlr_hand)
    show_current_state(hand, dlr_hand)
    prompt "==============================="
  end
end

def determine_winner(hand, dlr_hand)
  if calculate_score(hand) >= calculate_score(dlr_hand)
    "player"
  else
    "dealer"
  end
end

def declare_winner(winner)
  case winner
  when "player"
    message = "you, the mighty player"
  when "dealer"
    message = "me, the famous Don Chu"
  end
  prompt "Aha! The winner of this game is #{message}"
end

# def adjust_score(plyr_hand, dlr_hand, plyr_score, dlr_score)
#   case determine_winner(plyr_hand, dlr_hand)
#   when "player"
#     plyr_score += 1
#   when "dealer"
#     dlr_score += 1
#   end
# end

def play_again_prompt(plyr_score, dlr_score)
  prompt "Number of times you have won: #{plyr_score}"
  prompt "Number of times I, the great Don Chu Luffloosen, have won: #{dlr_score}."
  prompt "Would you like to try your luck again? (Y to play again)"
  answer = gets.chomp.downcase
  answer.start_with?('y')
end

# Gameplay
prompt "Welcome to the 21 game!"
prompt "I'll be your friendly dealer, Don Chu Luffloosen."

loop do
  deck = initialize_deck
  player_hand = initial_deal(deck)
  dealer_hand = initial_deal(deck)
  player_turn(deck, player_hand, dealer_hand)
  # 4. If player bust, dealer wins.
  if busted?(player_hand)
    prompt "Sorry, you busted! I have won!"
    dealer_score += 1
  end
  # 5. Dealer turn: hit or stay
  # - repeat until total >= 17
  dealer_turn(deck, player_hand, dealer_hand) if !busted?(player_hand)
  # 6. If dealer bust, player wins.
  if busted?(dealer_hand)
    prompt "Drat, I have indeed busted. Well done."
    player_score += 1
  end
  # 7. Compare cards and declare winner.
  if !busted?(dealer_hand) && !busted?(player_hand)
    declare_winner(determine_winner(player_hand, dealer_hand))
    # adjust_score(player_hand, dealer_hand, player_score, dealer_score)
    case determine_winner(player_hand, dealer_hand)
    when "player"
      player_score += 1
    when "dealer"
      dealer_score += 1
    end
  end
  break unless play_again_prompt(player_score, dealer_score)
  prompt "Very well, let's have another round!"
end
prompt "I have enjoyed this immensely. Farewell!"
prompt "==============================="
