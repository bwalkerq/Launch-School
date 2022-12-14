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
  initialize_deck if dck.count < 4
  first_two_cards = dck.sample(2)
  dck.delete_at(dck.index(first_two_cards[0]))
  dck.delete_at(dck.index(first_two_cards[1]))
  first_two_cards
end

def busted?(hand)
  calculate_score(hand) > 21
end

def calculate_score(hand)
  score = 0
  loop do
    change_ace_to_one(hand, score)
    score = 0
    hand.each do |card|
      score += CARD_VALUES[card]
    end
    break if !hand.include?(:ace) || score <= 21
  end
  score
end

def change_ace_to_one(hand, score)
  if score > 21 && hand.include?(:ace)
    # replace the :ace with :ace_as_one
    ace_to_change = hand.find_index(:ace)
    hand[ace_to_change] = :ace_as_one
  end
end

def deal_a_card(dck, hand)
  initialize_deck if dck == []
  new_card = dck.sample
  dck.delete_at(dck.index(new_card))
  prompt "A #{new_card} was drawn"
  hand << new_card
end

def show_current_state(hand, dlr_hand)
  calculate_score(hand) # this is here to catch
  display_hand = hand.map { |card| card == :ace_as_one ? "ace" : card }
  prompt "Your hand is currently: #{display_hand.join(', ')}"
  prompt "Your SCORE is ** #{calculate_score(hand)} **"
  puts ""
  prompt "My hand is currently: #{dlr_hand.join(', ')}"
  prompt "My SCORE is ** #{calculate_score(dlr_hand)} **"
end

def determine_hit_or_stay(dck, hand)
  puts ""
  prompt "Would you like to Hit or Stay? (h or s)"
  loop do
    answer = gets.chomp.downcase
    if answer.start_with?('s')
      return answer
    elsif answer.start_with?('h')
      deal_a_card(dck, hand)
      return answer
      break
    else
      prompt "invalid; h for Hit or s for Stay"
    end
  end
end

def player_turn(dck, hand, dlr_hand)
  loop do
    system 'clear'
    show_current_state(hand, dlr_hand)
    break if busted?(hand)
    answer = determine_hit_or_stay(dck, hand)
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
  else
    puts "Error with the value you're passing into the declare_winner method"
  end
  prompt "Aha! The winner of this game is #{message}"
end

def adjust_score(winner, plyr_score, dlr_score)
  case winner
  when "player"
    plyr_score += 1
  when "dealer"
    dlr_score += 1
  end
  return plyr_score, dlr_score # very proud of this implementation!
end
# I understand that when I pass in player_score the variable into
# the parameter plyr_score in this method, that only the value of
# the variable is being passed into the method, and not the actual
# variable (pass by value, right? Since numbers are immutable)
# so if I can't pass in the actual variable to update it, then what?
# I know that I can reassign the variable to the return of the method
# so if I pass in the previous value of the score, increment it up,
# and then reassign the variable outside the method, that could work,
# but it would be

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
deck = initialize_deck

loop do
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
  dealer_turn(deck, player_hand, dealer_hand) unless busted?(player_hand)
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
