
class DNA
  def initialize(strand)
    @strand = strand
  end

  def hamming_distance(other)
    distance = 0
    min_length = [@strand.length, other.length].min - 1
    0.upto(min_length) do |index|
      distance += 1 if @strand[index] != other[index]
    end
    distance
  end
end
