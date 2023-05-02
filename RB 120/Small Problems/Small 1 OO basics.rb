
puts "Hello".class
puts 5.class
puts [1, 2, 3].class

module Walkable
  def walk
    puts "let's go for a walk!"
  end
end

class Cat
  include Walkable
  attr_accessor :name

  def initialize(name)
    @name = name
  end

  def greet
    puts "Why hello, I'm #{name}!"
  end
end

kitty = Cat.new("Sophie")
kitty.greet
kitty.name = "Luna"
kitty.greet
kitty.walk