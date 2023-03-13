# module Speak
#   def say_something(sound)
#     puts sound
#   end
# end
#
# class MyClass
#   include Speak
# end
#
# my_obj = MyClass.new
# my_obj.say_something("yolo")

class GoodDog
  def initialize(name) # passing in an argument to the #initialize method via
    # the #new method
    @name = name # This is an instance variable that "lives on", to be
    # referenced until the object is destroyed.
  end

  def name                  # This was renamed from "get_name"
    @name
  end

  def name=(n)              # This was renamed from "set_name="
    @name = n
  end

  def speak
    "#{@name} says Arf!"
  end
end

class GoodDog
  attr_accessor :name # stands in for the getter and setter methods for @name

  def initialize(name)
    @name = name
  end

  def speak
    "#{@name} says arf!"
  end
end

class GoodDog
  attr_accessor :name, :height, :weight # this gets us the setter, getter,
  # and instance variables [nice]

  def initialize(n, h, w)
    @name = n
    @height = h
    @weight = w
  end

  def speak
    "#{name} says arf!"
  end

  def change_info(n, h, w) # so now we can change all the instance variables
    # after instantiation
    self.name = n # here we use #self.* to show that we're calling the setter
    # method rather than initializing a local variable within this change
    # info method.
    self.height = h
    self.weight = w
  end

  def info
    "#{name} weighs #{weight} and is #{height} tall."
  end
end

sparky = GoodDog.new('Sparky', '12 inches', '10 lbs')
# puts sparky.info      # => Sparky weighs 10 lbs and is 12 inches tall.

sparky.change_info('Spartacus', '24 inches', '45 lbs')
# puts sparky.info      # => Spartacus weighs 45 lbs and is 24 inches tall.

class MyCar
  attr_accessor :color
  attr_reader :year, :model

  def initialize(year, color, model)
    @year = year
    @color = color
    @model = model
    @speed = 0
  end

  def speed_up(number)
    @speed += number
    puts "You push the gas and accelerate #{number} mph."
  end

  def brake(number)
    if @speed < number
      @speed = 0
      puts "You push the brake and stop."
    else
      @speed -= number
      puts "You push the brake and decelerate #{number} mph."
    end
  end

  def speed
    puts "You are now going #{@speed} mph."
  end

  def shut_off
    @speed = 0
    puts "Let's park this bad boy!"
  end

  def spray_paint(color)
    self.color = color # I forgot to call #self here and instead just used
    # the instance variable itself.
    puts "sweet paint job, bro. Your ride is now a sporting #{color}"
  end

  def self.gas_mileage(miles, gallons)
    puts "Those inputs would get #{miles/gallons} miles to the gallon."
  end

  def to_s
    puts "your car is a #{year}, #{color}, #{model}"
  end
end

subey = MyCar.new(2017, "green", "Outback, booiii")
# subey.speed_up(100)
# subey.brake(60)
# subey.speed
# subey.shut_off
# subey.speed
# p subey.year
# p subey.color
# subey.spray_paint("white")
# p subey.color
# MyCar.gas_mileage(100,3)
puts subey

class Person
  attr_accessor :name
  def initialize(name)
    @name = name
  end
end

bob = Person.new("Steve")
bob.name = "Bob"
p bob.name