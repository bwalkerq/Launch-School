# class Device
#   def initialize
#     @recordings = []
#   end
#
#   def record(recording)
#     @recordings << recording
#   end
#
#   def listen
#     record(yield) if block_given?
#   end
#
#   def play
#     puts @recordings.last
#   end
# end

# listener = Device.new
# listener.listen { "Hello World!" }
# listener.listen
# listener.listen { "what's up doc?" }
# listener.play # Outputs "Hello World!"

class TextAnalyzer
  def process
    Raise IOError if __dir__.nil?
    path = File.join(__dir__, 'sample_file.txt')
    file = File.open(path, 'r')
    yield(file.read)
    file.close
  end
end
# The lesson here is relative paths vs absolute paths

# analyzer = TextAnalyzer.new
# analyzer.process do |text|
#   par = text.split("\n\n").size
#   puts "#{par} paragraphs"
# end
# analyzer.process { |text| puts "#{text.split("\n").size} lines" }
# analyzer.process { |text| puts "#{text.split(" ").size} words" }

items = ['apples', 'corn', 'cabbage', 'wheat']

def gather(items)
  puts "Let's start gathering food."
  puts yield(items)
  puts "Nice selection of food we have gathered!"
end

# gather(items) { |array| array[0, 2] }

birdies = %w(raven finch hawk eagle)

def bird_groups(arr)
  yield arr
end

# p bird_groups(birdies) { |_, _, *raptors| "Raptors: #{raptors.join(', ')}" }

# gather(items) do |*produce, last|
#   puts produce.join(', ')
#   puts last
# end
#
# gather(items) do |first, *middle, last|
#   puts first
#   puts middle.join(', ')
#   puts last
# end
#
# gather(items) do |first, *last|
#   puts first
#   puts last.join(', ')
# end
#
# gather(items) do | a, b, c, d|
#   puts [a,b,c].join(', ') + ", and #{d}"
# end

# Replace the two `method_name` placeholders with actual method calls
def convert_to_base_8(n)
  n.to_s(8).to_i
end

# Replace `argument` with the correct argument below
# `method` is `Object#method`, not a placeholder
base8_proc = method(:convert_to_base_8).to_proc

# We'll need a Proc object to make this code work
# Replace `a_proc` with the correct object
# p [8, 10, 12, 14, 16, 33].map(&base8_proc)
# ok, so this is a learning experience rather than an exercise; I learned that
# creating a proc with #method(method_as_symbol).to_proc can then be passed to
# a method (like #map) with '&'. This is essentially making a custom proc

# def bubble_sort!(arr)
#   arr.size.times do
#     arr.each_with_index do |n, i|
#       break if i == arr.size - 1
#
#       other = arr[i + 1]
#       next unless n > other
#
#       temp = n
#       arr[i] = other
#       arr[i + 1] = temp
#     end
#   end
# end

def bubble_sort!(array)
  loop do
    swapped = false
    1.upto(array.size - 1) do |index|
      if block_given?
        next if yield(array[index - 1]) <= yield(array[index])
      else
        next if array[index - 1] <= array[index]
      end
      array[index - 1], array[index] = array[index], array[index - 1]
      swapped = true
    end

    break unless swapped
  end
end

# array = [5, 3]
# bubble_sort!(array)
# p array == [3, 5]
#
# array = [5, 3, 7]
# bubble_sort!(array) { |first, second| first >= second }
# p array == [7, 5, 3]
#
# array = [6, 2, 7, 1, 4]
# bubble_sort!(array)
# p array == [1, 2, 4, 6, 7]
#
# array = [6, 12, 27, 22, 14]
# bubble_sort!(array) { |first, second| (first % 7) <= (second % 7) }
# p array == [14, 22, 12, 6, 27]
#
# array = %w(sue Pete alice Tyler rachel Kim bonnie)
# bubble_sort!(array)
# p array == %w(Kim Pete Tyler alice bonnie rachel sue)
#
# array = %w(sue Pete alice Tyler rachel Kim bonnie)
# bubble_sort!(array) { |first, second| first.downcase <= second.downcase }
# p array == %w(alice bonnie Kim Pete rachel sue Tyler)

array = %w(sue Pete alice Tyler rachel Kim bonnie)
bubble_sort!(array) { |value| value.downcase }
p array == %w(alice bonnie Kim Pete rachel sue Tyler)















