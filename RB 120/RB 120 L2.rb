class Person
  attr_accessor :first_name, :last_name

  def initialize(name)
    parse_full_name(name)
  end

  def name=(name)
    parse_full_name(name)
  end

  def name
    (@first_name + ' ' + @last_name).strip
  end

  def parse_full_name(name)
    self.first_name, self.last_name = name.split(' ')
    self.last_name = '' if self.last_name == nil
  end

  def to_s
    name # I was surprised that this actually called #name on the bob object
    # because there's no parameters and there's no #self
  end
end

# bob = Person.new('Robert Smith')
# rob = Person.new('Robert Smith')
# p bob.name == rob.name # I knew that this needed the #name call because the
# # objects have different ID's, and can't be the same object.
#
# bob = Person.new("Robert Smith")
# puts "The person's name is: #{bob}" # before we built a #to_s method, I knew that it would be an
# # object ID, not the name

class Dog
  def speak
    'bark!'
  end

  def swim
    'swimming!'
  end

  def run
    'running!'
  end

  def jump
    'jumping!'
  end

  def fetch
  end
end

class Bulldog < Dog
  def swim
    "Can't swim"
  end
end

class Cat < Dog

end




































