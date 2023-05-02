# class Person
#   attr_accessor :first_name
#   attr_writer :last_name
#   def first_equals_last?
#     first_name == last_name
#   end
#
#   private
#
#   attr_reader :last_name
# end
#
# person1 = Person.new
# person1.first_name = 'Dave'
# person1.last_name = 'Smith'
# person1.last_name
# puts person1.first_equals_last?

#
# class Person
#   attr_writer :age
#
#   def older_than?(other)
#     age > other.age
#   end
#
#   protected
#
#   attr_reader :age
# end
#
# person1 = Person.new
# person1.age = 17
#
# person2 = Person.new
# person2.age = 26
#
# puts person1.older_than?(person2)


# class Person
#   attr_reader :name
#
#   def name=(value)
#     @name = value.capitalize
#   end
# end
#
# person1 = Person.new
# person1.name = 'eLiZaBeTh'
# puts person1.name


# class Person
#   attr_writer :name
#
#   def name
#     puts "Mr. #{@name}"
#   end
# end
#
# person1 = Person.new
# person1.name = 'James'
# puts person1.name



# class Person
#   # attr_reader :name
#
#   def initialize(name)
#     @name = name
#   end
#
#   def name
#     @name.clone
#   end
# end
#
# person1 = Person.new('James')
# person1.name.reverse!
# puts person1.name

# class Person
#   def age=(val)
#     @age = val*2
#   end
#   def age
#     @age*2
#   end
# end
#
# person1 = Person.new
# person1.age = 20
# puts person1.age



class Person
  # attr_accessor :name
  def name=(val)
    @first_name, @last_name = val.split.first, val.split.last
  end

  def name
    @first_name +" "+ @last_name
  end
end

person1 = Person.new
person1.name = 'John Doe'
puts person1.name



name = "Abs G Klionsky"
f_name, two = name.split(' ')
p f_name, two



















