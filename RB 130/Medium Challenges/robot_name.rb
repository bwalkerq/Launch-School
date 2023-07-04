
class Robot
  attr_reader :name
  @@names = []

  def initialize
    @name = random_name
    @@names << @name
  end

  def random_name
    new_name = nil
    loop do
      new_name = (('A'..'Z').to_a.sample(2) + (1..9).to_a.sample(3)).join
      break unless @@names.include?(new_name)
    end
    new_name
  end

  def reset
    @@names.delete(name)
    self.name = random_name
  end

  private

  attr_writer :name
end

p Robot.new.name

# their solution
class Robot
  @@names = []

  def name # absolutely insane
    return @name if @name # takes advantage of instance variables returning nil
    # if they're referenced before being populated
    @name = generate_name while @@names.include?(@name) || @name.nil?
    # this is truly nuts, I never would have guessed that you could write
    # essentially a loop in one line like this
    @@names << @name # basically the same as me
    @name # the actual "getter" part of this method
  end

  def reset
    @@names.delete(@name) # well, I clearly misunderstood the problem; my
    # solution makes it so that no old names can be recycled, what they meant
    # was to have no current robots share a name
    @name = nil # mimicking an uninstantiated instance variable
  end

  private

  def generate_name
    name = ''
    2.times { name << rand(65..90).chr } # this is smooth, I like the
    # use of #chr here
    # I forgot that you can use #<< with strings!
    3.times { name << rand(0..9).to_s }
    name
  end
end