
class Robot
  attr_reader :name
  @@previous_names = []

  def initialize
    @name = random_name
    @@previous_names << @name
  end

  def random_name
    new_name = nil
    loop do
      new_name = (('A'..'Z').to_a.sample(2) + (1..9).to_a.sample(3)).join
      break unless @@previous_names.include?(new_name)
    end
    new_name
  end

  def reset
    self.name = random_name
  end

  private

  attr_writer :name
end

p Robot.new.name