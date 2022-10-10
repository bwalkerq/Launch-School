def find_first_nonzero_among(numbers)
  numbers.each do |n|
    return n if n.nonzero?
  end
end

# Examples
# these values must be assigned to an array first
# could also just put brackets around the values to pass an array
num =[0, 0, 1, 0, 2, 0]
p find_first_nonzero_among(num)
# can't feed a single number when array expected, since .each can't be done 
# on an integer
# find_first_nonzero_among(1)

#2
def predict_weather
  sunshine = ['true', 'false'].sample #damn they got me, this is only a string object
# so either make the above boolean values (easier) or
# write =='true' etc. into the if
if sunshine
    puts "Today's weather will be sunny!"
  else
    puts "Today's weather will be cloudy!"
  end
end
predict_weather

#3
def multiply_by_five(n)
  n * 5
end

puts "Hello! Which number would you like to multiply by 5?"
#number = gets.chomp

#puts "The result is #{multiply_by_five(number)}!"
# I am very familiar with this nightmare of a bug; gets always stores the user
# input as a STRING, so number has to be converted to an integer in order to 
# successfully be multiplied

#4
pets = { cat: 'fluffy', dog: ['sparky', 'fido'], fish: 'oscar' }

pets[:dog] << 'bowser'

puts pets #=> {:cat=>"fluffy", :dog=>"bowser", :fish=>"oscar"}

#5
numbers = [5, 2, 9, 6, 3, 1, 8]

even_numbers = numbers.select do |n|
  #n if n.even?
  n.even? # elegant
end

p even_numbers # expected output: [2, 6, 8]

#6 
# In its original form, the code evaluates the if Einstein line last, so the 
# return of the whole method is nil, since the if statement runs false
# fix: use return throughout
# other fix: could refactor to make one big if statement
def get_quote(person)
  if person == 'Yoda'
    return 'Do. Or do not. There is no try.'
  end

  if person == 'Confucius'
    return 'I hear and I forget. I see and I remember. I do and I understand.'
  end

  if person == 'Einstein'
    return 'Do not worry about your difficulties in Mathematics. I can assure you mine are still greater.'
  end
end

puts 'Confucius says:'
puts '"' + get_quote('Confucius') + '"'

#7
# Financially, you started the year with a clean slate.

balance = 0

# Here's what you earned and spent during the first three months.

january = {
  income: [ 1200, 75 ],
  expenses: [ 650, 140, 33.2, 100, 26.9, 78 ]
}

february = {
  income: [ 1200 ],
  expenses: [ 650, 140, 320, 46.7, 122.5 ]
}

march = {
  income: [ 1200, 10, 75 ],
  expenses: [ 650, 140, 350, 12, 59.9, 2.5 ]
}

July = {
  income: [ 1000, 10.1, 100.5 ],
  expenses: [ 150.8, 140.5 ]
}
# Let's see how much you've got now...

def calculate_balance(month)
  plus  = month[:income].sum
  minus = month[:expenses].sum

  p plus
  p minus
  plus - minus
  
end
p calculate_balance(July)


#[january, february, march].each do |month|
#  balance = calculate_balance(month)
#end
# this shit at the end is the problem
# make an array like this? I guess? [turns out, yes this is fine]
# can't initialze a new variable within an array method call and access
# it outside the method [oops, balance was initialized at the top!]
# the error, which I figured out by putting a p plus and p minus in the 
# method definition, is that balance is reassigned a value after each month,
# rather than carrying over the amount from the previous month
# fix: balance = balance + calculate...
[january, february, march].each do |month|
  balance = balance + calculate_balance(month) # more elegant with balance +=
end

puts balance

#8
colors = ['red', 'yellow', 'purple', 'green', 'dark blue', 'turquoise', 'silver']
things = ['pen', 'mouse pad', 'coffee mug', 'sofa', 'surf board', 'training mat', 'notebook']
p colors.count # I used these to make sure there were the same number of objects
p things.count 

colors.shuffle!
things.shuffle!

i = 0
loop do
  break if i > colors.length-1 # I also had to subtract one because the loop 
  # incremented past the end of the list
  
  if i == 0
    puts 'I have a ' + colors[i] + ' ' + things[i] + '.'
  else
    puts 'And a ' + colors[i] + ' ' + things[i] + '.'
  end
  
  i += 1
end

#9
def digit_product(str_num)
  digits = str_num.chars.map { |n| n.to_i }
  product = 1 # fixed here, was set = 0

  digits.each do |digit|
    product *= digit
  end

  product
end


p digit_product('12345')
# expected return value: 120
# actual return value: 0

#10
# Each player starts with the same basic stats.

player = { strength: 10, dexterity: 10, charisma: 10, stamina: 10 }

# Then the player picks a character class and gets an upgrade accordingly.

character_classes = {
  warrior: { strength:  20 },
  thief:   { dexterity: 20 },
  scout:   { stamina:   20 },
  mage:    { charisma:  20 }
}
puts 'Please type your class (warrior, thief, scout, mage):'
puts 'scout'
#input = gets.chomp.downcase
input = 'scout'
player.merge!(character_classes[input.to_sym])
# my guess is that the input doesn't reference the key, since it's only 
# a string [I was right, had to stackoverflow #to_sym because I guessed wrong
# at the method, but I guessed correclty that there WAS such a method]
puts 'Your character stats:'
puts player
