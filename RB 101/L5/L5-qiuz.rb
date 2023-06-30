=begin
8/10 on the quiz

Summary:
- read the question carefully, attend to the different between a key and value (in a hash) vs an element (in an array)
- Enumerable#inject/reduce is pretty damn cool, lol, and one of the ways to call the method is with |memo, operand|, and that 
we can use the operand as a reference to keys in a hash to return values to be explicitly operated on in the block (e.g. added to
the memo explicitly with + rather than passing :+ into the intial call as a symbol)
- Attend to the return within a block when a one-line if statement is called (I think I have made this mistake several times in my
own code); when falsey, the return of the block will be nil. Make an else statement to return the desired value for the falsey case.

Learnings:
#3 - damn, the question was "find all the ways to call the value of the key ":three" and instead I answered 
the inverse(?) question "find all the ways to call the value ":three"
so I chose all three incorrect answers because they all called the value :three. oy vey.
Here's my learning, though: one of the instances of ":three" is simply an entry of a nested array, which is neither a key
nor a value; so if I had even noticed either the word key or value, I should have realized that calling only an element as an
answer shoice should have alerted me that I didn't understand the question.

#10 - I didn't realize that Enumerable#reduce/inject could be called on an entire value of a hash, especially when that
value is a nested array of has values. See the code from the quiz below
=end

#10 continued:
customer_orders = [
  {
    customer_id: 12,
    customer_name: 'Emma Lopez',
    orders: [
      { order_fulfilled: true, order_value: 135.99 },
      { order_fulfilled: true, order_value: 289.49 },
      { order_fulfilled: false, order_value: 58.00 }
    ]
  },
  {
    customer_id: 32,
    customer_name: 'Michael Richards',
    orders: [
      { order_fulfilled: true, order_value: 120.00 },
      { order_fulfilled: false, order_value: 85.65 }
    ]
  },
  # rest of data...
]

fulfilled_orders = customer_orders.map do |customer|
  {
    customer_id: customer[:customer_id],
    customer_name: customer[:customer_name]
  }
end

customer_orders.each_with_index do |data, index|
  order_value = data[:orders].reduce(0) do |total, order| # THIS LINE IS NUTS - Calling #reduce/inject on a value that is a 
    # nested hash, but "total, order" seemed wrong to me at first because I expected names that referenced the "key, value"
    # however! with #reduce the |x,y| don't reference the key, value, even when called on a hash; instead they reference a 
    # |memo, operand| where the memo is the variable that contains each of the values as they're reduced/injected; in this case
    # rather than give an operand, the reference to a key is given as the operand, and then the "total + order[:order_value" i.e.
    # "memo + (referenced value to be added explicitly)" is given, with the initial operand of 0 in the parentheses. WOW
    total + order[:order_value] if order[:order_fulfilled]
  end

  fulfilled_orders[index][:order_value] = order_value
end
=begin  
#10 continued - What I actually got wrong was overlooking that an each_with_index call will return nil with a falsey return of the 
if statement
  total + order[:order_value] if order[:order_fulfilled]
so that if, for an order with an unfulfilled order, adding nil to an integer will throw an error. Spicy.
To get around that, make an else statement that returns "total" to the block for unfulfilled orders.
=end

#other questions from the quiz that I checked my answers AFTER committing to an answer; if no comments, that means I was correct
a = 'hi'
english_greetings = ['hello', a, 'good morning']

greetings = {
  french: ['bonjour', 'salut', 'allo'],
  english: english_greetings,
  italian: ['buongiorno', 'buonasera', 'ciao']
}

greetings[:english][1] = 'hey'

greetings.each do |language, greeting_list|
  greeting_list.each { |greeting| greeting.upcase! }
end

puts a
puts english_greetings[1]
puts greetings[:english][1]

