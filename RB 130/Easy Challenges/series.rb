class Series
  def initialize(string)
    @string = string
  end

  def slices(slice_size)
    raise ArgumentError if slice_size > @string.length
    # arr = []
    # @string.chars.map(&:to_i).each_cons(slice_size) {|slice| arr << slice }
    # arr
    @string.chars.map(&:to_i).each_cons(slice_size).to_a
    # the #to_a can take an enumerator object, which helped me get around the
    # arr variable and shoveling. nice.
  end
end
