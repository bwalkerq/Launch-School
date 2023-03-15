
# class Cat
#   def self.generic_greeting
#     puts "Hello, I'm a cat"
#   end
# end

# kitty = Cat.new
# Cat.generic_greeting
# p kitty.class.generic_greeting

# class Cat
#   attr_accessor :name
#
#   def initialize(name)
#     @name = name
#   end
#
#   def rename(new)
#     self.name = new
#   end
# end

# kitty = Cat.new('Sophie')
# p kitty.name
# kitty.rename('Chloe')
# p kitty.name

class Cat
  attr_reader :name
  @@cats = 0
  COLOR = "purple"

  def initialize(name)
    @name = name
    @@cats += 1
  end

  def to_s
    "I'm #{name}!"
  end

  def self.generic_greeting
    puts "Hello, I'm sleek cat."
  end

  def personal_greeting
    puts "Wassabi, my guy, I'm #{name} the cat and I'm #{COLOR}."
  end

  def self.total
    puts @@cats
  end
end

# kitty = Cat.new('Sophie')
# puts kitty

# Cat.generic_greeting
# kitty.personal_greeting
#
# kitty2 = Cat.new("toad")
#
# Cat.total

# class Person
#   attr_writer :secret
#
#   def share_secret
#     puts secret
#   end
#
#   private
#
#   attr_reader :secret
# end
#
# person1 = Person.new
# person1.secret = 'Shh.. this is a secret!'
# person1.share_secret

class Person
  attr_writer :secret

  def compare_secret(other_secret)
    secret == other_secret.secret
  end

  protected

  attr_reader :secret
end

person1 = Person.new
person1.secret = 'Shh.. this is a secret!'

person2 = Person.new
person2.secret = 'Shh.. this is a different secret!'

puts person1.compare_secret(person2)