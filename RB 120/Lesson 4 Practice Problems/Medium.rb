# 3
class InvoiceEntry
  attr_reader :quantity, :product_name

  def initialize(product_name, number_purchased)
    @quantity = number_purchased
    @product_name = product_name
  end

  def update_quantity(updated_count)
    @quantity = updated_count if updated_count >= 0
  end
end
# Note that when fixing this code to deal with the local variable created in
# the update_quantity instance method, it's better in this case to code
# updating the instance variable @quantity directly, because adding a
# attr_accessor allows the quantity to be changed more directly, rather than
# using the method that was created for changing the quantity.

# 4
class Greeting
  def greet(string)
    puts string
  end
end

class Hello < Greeting
  def hi
    greet "Hello"
  end
end

class Goodbye < Greeting
  def bye
    greet "Goodbye"
  end
end


# 5
class KrispyKreme
  def initialize(filling_type, glazing)
    @filling_type = filling_type
    @glazing = glazing
  end

  def to_s
    filling = @filling_type ? @filling_type : "Plain"
    glaze = @glazing ? " with #{@glazing}" : ""
    filling + glaze
  end
end

donut1 = KrispyKreme.new(nil, nil)
donut2 = KrispyKreme.new("Vanilla", nil)
donut3 = KrispyKreme.new(nil, "sugar")
donut4 = KrispyKreme.new(nil, "chocolate sprinkles")
donut5 = KrispyKreme.new("Custard", "icing")

# puts donut1
# # => "Plain"
#
# puts donut2
# # => "Vanilla"
#
# puts donut3
# # => "Plain with sugar"
#
# puts donut4
# # => "Plain with chocolate sprinkles"
#
# puts donut5
# # => "Custard with icing"
# # I'm awesome


# 6
class Computer
  attr_accessor :template

  def create_template
    @template = "template 14231"
  end

  def show_template
    template # if there were prefix *self* here, it's redundant to call the
    # accessor template on the calling object, but this already does that.
    # Self only needed with class methods and when calling setter methods
  end
end

n = Computer.new
p n
n.create_template
p n
p n.show_template
p n

# 7 get rid of redundant word "light"