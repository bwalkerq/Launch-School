class Triangle
  attr_reader :kind
  
  def initialize(side_1, side_2, side_3)
    @sides = [side_1, side_2, side_3]
    reject_impossible
    @kind = determine_kind
  end

  def determine_kind
    case @sides.uniq.size
    when 1 then 'equilateral'
    when 2 then 'isosceles'
    else 'scalene'
    end
  end

  def too_long_side?
    sum = @sides.sum
    @sides.each do|length|
      return true if length >= (sum - length)
    end
    false
  end

  def reject_impossible
    raise ArgumentError if @sides.any?(0)
    raise ArgumentError if too_long_side?
    raise ArgumentError if @sides.any?(&:negative?)
  end

end
