
class Anagram
  attr_reader :detector, :case, :tally

  def initialize(string)
    @detector = string
    @tally = string.downcase.chars.tally
    @case = determine_case(string)
  end

  def determine_case(string) # turns out this is unnecessary, misread the prob
    if string == string.downcase
      'downcased'
    elsif string == string.capitalize
      'capitalized'
    elsif string == string.upcase
      'upcased'
    else
      'chaotic case'
    end
  end

  def match(array)
    array.reject! { |word| word.downcase == self.detector.downcase }
    array.select! { |word| determine_case(word) == self.case }
    array.select! { |word| word.downcase.chars.tally == self.tally }
    array
  end
end

# detector = Anagram.new('diaper')
# p detector.case
# p detector.match(%w(hello world zombies pants))

=begin
PROBLEM
given a word, as an Anagram object, run the #match method, which
takes an array of possible matches and returns an array with the subet of
matches


input: array of possible matches
output: subset array of matches

explicit rules:
implicit rules:
  contain the same count of all the letters
  if the detector and match must have same capitalization
  exact same words in the array do not count as a match
  return an empty array if no matches

Questions:

Mental Model:
match capitalization
  test case, store case, make possible matches first pass the match case

tally the letters, if the hashes are equal, match

a = 'listen'.chars.tally
p a
b = 'inlets'.chars.tally
p b
p a == b
THIS WORKS, damn!

EXAMPLES

DATA / ALGORITHM

CODE
=end