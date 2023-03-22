module Mailable
  def print_address
    puts "#{name}"
    puts "#{address}"
    puts "#{city}, #{state} #{zipcode}"
  end
end

class Customer
  include Mailable

  attr_reader :name, :address, :city, :state, :zipcode
end

class Employee
  include Mailable

  attr_reader :name, :address, :city, :state, :zipcode
end

betty = Customer.new
bob = Employee.new
# betty.print_address
# bob.print_address



module Drivable
  def drive # I caught that self.drive is wrong; I figured that it would be a
    # class method for whatever it was included into, but it actually would
    # be a "class" method for the Drivable module--even less useful.
  end
end

class Car
  include Drivable
end

bobs_car = Car.new
bobs_car.drive


class House
  include Comparable

  attr_reader :price

  def initialize(price)
    @price = price
  end

  def <=>(other)
    price <=> other.price
  end

end

home1 = House.new(100_000)
home2 = House.new(150_000)
# puts "Home 1 is cheaper" if home1 < home2
# puts "Home 2 is more expensive" if home2 > home1


class Transform < String
  def uppercase
    self.upcase
  end

  def self.lowercase(input)
    input.downcase
  end
end
my_data = Transform.new('abc')
# puts my_data.uppercase
# puts Transform.lowercase('XYZ')


class Wallet
  include Comparable

  def initialize(amount)
    @amount = amount
  end

  def <=>(other_wallet)
    amount <=> other_wallet.amount
  end

  protected
  attr_reader :amount
end

bills_wallet = Wallet.new(500)
pennys_wallet = Wallet.new(465)
# if bills_wallet > pennys_wallet
#   puts 'Bill has more money than Penny'
# elsif bills_wallet < pennys_wallet
#   puts 'Penny has more money than Bill'
# else
#   puts 'Bill and Penny have the same amount of money.'
# end

class Pet
  attr_reader :animal, :name
  def initialize(animal, name)
    @animal = animal
    @name = name
  end
end

class Owner
  attr_accessor :pets
  attr_reader :name

  def initialize(name)
    @name = name
    @pets = []
  end

  def add_pet(pet)
    pets << pet
  end

  def number_of_pets
    pets.size
  end
end

class Shelter
  attr_accessor :adoptions
  def initialize
    @adoptions = Hash.new
    @adoptions.default = []
  end

  def adopt(owner, pet)
    if adoptions.key?(owner.name)
      owner.add_pet(pet)
    else
      owner.add_pet(pet)
      adoptions[owner.name] = owner.pets
    end
  end

  def print_adoptions
    adoptions.each_pair do|owner, pet_array|
      puts "#{owner} has adopted the following pets:"
      pet_array.each do |pet|
        puts "a #{pet.animal} named #{pet.name}"
      end
      puts
    end

  end
end

butterscotch = Pet.new('cat', 'Butterscotch')
pudding      = Pet.new('cat', 'Pudding')
darwin       = Pet.new('bearded dragon', 'Darwin')
kennedy      = Pet.new('dog', 'Kennedy')
sweetie      = Pet.new('parakeet', 'Sweetie Pie')
molly        = Pet.new('dog', 'Molly')
chester      = Pet.new('fish', 'Chester')

phanson = Owner.new('P Hanson')
bholmes = Owner.new('B Holmes')

shelter = Shelter.new
shelter.adopt(phanson, butterscotch)
shelter.adopt(phanson, pudding)
shelter.adopt(phanson, darwin)
shelter.adopt(bholmes, kennedy)
shelter.adopt(bholmes, sweetie)
shelter.adopt(bholmes, molly)
shelter.adopt(bholmes, chester)
# shelter.print_adoptions
# puts "#{phanson.name} has #{phanson.number_of_pets} adopted pets."
# puts "#{bholmes.name} has #{bholmes.number_of_pets} adopted pets."


module Walkable
  def walk
    puts "#{name} #{gait} forward"
  end
end

class Person
  include Walkable
  attr_reader :name

  def initialize(name)
    @name = name
  end

  private

  def gait
    "strolls"
  end
end

class Cat
  include Walkable
  attr_reader :name

  def initialize(name)
    @name = name
  end

  private

  def gait
    "saunters"
  end
end

class Cheetah
  include Walkable
  attr_reader :name

  def initialize(name)
    @name = name
  end

  private

  def gait
    "runs"
  end
end

# mike = Person.new("Mike")
# mike.walk
# # => "Mike strolls forward"
#
# kitty = Cat.new("Kitty")
# kitty.walk
# # => "Kitty saunters forward"
#
# flash = Cheetah.new("Flash")
# flash.walk
# # => "Flash runs forward"

class Noble
  attr_reader :name, :title
  def initialize(name, title)
    @name = name
    @title = title
  end

  def walk
    puts "#{title} #{name} struts forward"
  end

end

byron = Noble.new("Byron", "Lord")
byron.walk
# => "Lord Byron struts forward"
byron.name
# => "Byron"
byron.title
# => "Lord"



































