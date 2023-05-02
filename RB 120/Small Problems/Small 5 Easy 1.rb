class Banner
  def initialize(message)
    @message = message
  end

  def to_s
    [horizontal_rule, empty_line, message_line, empty_line, horizontal_rule].join("\n")
  end

  private

  def horizontal_rule
    "+-" + "-"*@message.length + "-+"
  end

  def empty_line
  "| " + " "*@message.length + " |"
  end

  def message_line
    "| #{@message} |"
  end
end

# banner = Banner.new('To boldly go where no one has gone before.')
# puts banner
# blanky = Banner.new('')
# puts blanky

# class Pet
#   attr_reader :name
#
#   def initialize(name)
#     @name = name.to_s
#   end
#
#   def to_s
#     "My name is #{@name}."
#   end
# end
#
# name = 42
# fluffy = Pet.new(name)
# name += 1
# puts fluffy.name
# puts fluffy
# puts fluffy.name
# puts name

# class Book
#   attr_reader :author, :title
#   def initialize(author, title)
#     @author = author
#     @title = title
#   end
#
#   def to_s
#     %("#{title}", by #{author})
#   end
# end
#
# book = Book.new("Neil Stephenson", "Snow Crash")
# puts %(The author of "#{book.title}" is #{book.author}.)
# puts %(book = #{book}.)

# class Book
#   attr_accessor :author, :title
#
#   def to_s
#     %("#{title}", by #{author})
#   end
# end
#
# book = Book.new
# book.author = "Neil Stephenson"
# book.title = "Snow Crash"
# puts %(The author of "#{book.title}" is #{book.author}.)
# puts %(book = #{book}.)

# class Person
#   def initialize(first_name, last_name)
#     @first_name = first_name.capitalize
#     @last_name = last_name.capitalize
#   end
#
#   def first_name=(val)
#     @first_name = val.capitalize
#   end
#
#   def last_name=(val)
#     @last_name = val.capitalize
#   end
#
#   def to_s
#     "#{@first_name} #{@last_name}"
#   end
# end
#
# person = Person.new('john', 'doe')
# puts person
#
# person.first_name = 'jane'
# person.last_name = 'smith'
# puts person

# class Car
#   attr_accessor :mileage
#
#   def initialize
#     @mileage = 0
#   end
#
#   def increment_mileage(miles)
#     self.mileage += miles
#   end
#
#   def print_mileage
#     puts mileage
#   end
# end

# car = Car.new
# car.mileage = 5000
# car.increment_mileage(678)
# car.print_mileage  # should print 5678

class Rectangle
  def initialize(height, width)
    @height = height
    @width = width
  end

  def area
    @height * @width
  end
end

class Square < Rectangle
  def initialize(height)
    super(height, height)
  end
end

# square = Square.new(5)
# puts "area of square = #{square.area}"

# class Pet
#   attr_reader :name, :age,:color
#
#   def initialize(name, age, color=nil)
#     @name = name
#     @age = age
#     @color = color
#   end
# end
#
# class Cat < Pet
#   # attr_reader :color
#   # def initialize (name, age, color)
#   #   super(name, age)
#   #   @color = color
#   # end
#
#   def to_s
#     "My cat #{name} is #{age} years old and has #{color} fur."
#   end
# end
#
# pudding = Cat.new('Pudding', 7, 'black and white')
# butterscotch = Cat.new('Butterscotch', 10, 'tan and white')
# puts pudding, butterscotch
# franky = Cat.new("b", 26)
# puts franky

class Vehicle
  attr_reader :make, :model

  def initialize(make, model)
    @make = make
    @model = model
  end

  def to_s
    "#{make} #{model}"
  end
end

class Car < Vehicle
  def wheels
    4
  end
end

class Motorcycle < Vehicle

  def wheels
    2
  end

end

class Truck < Vehicle
  attr_reader :payload

  def initialize(make, model, payload)
    super(make, model)
    @payload = payload
  end

  def wheels
    6
  end
end


















