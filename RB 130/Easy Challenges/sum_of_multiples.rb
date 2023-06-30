
class SumOfMultiples
  def initialize(*args)
    @set = args.empty? ? [3, 5] : args
  end

  def to(target)
    multiples = []
    (0...target).each do |int|
      @set.each do |set_elem|
        multiples << int if int % set_elem == 0
      end
    end
    multiples.uniq.sum
  end

  def self.to(integer)
    new.to(integer)
  end
end
