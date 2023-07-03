class Diamond
  LETTERS = ('A'..'Z').to_a

  def self.make_diamond(letter)
    return "A\n" if letter == 'A'

    width = 1 + 2 * LETTERS.index(letter)
    range = ('B'...letter).to_a + ('B'..letter).to_a.reverse

    output = first_and_last_row(width)
    range.each { |x| output += any_middle_row(x, width) }
    output += first_and_last_row(width)
    output
  end

  class << self
    private

    def first_and_last_row(width)
      "#{'A'.center(width)}\n"
    end

    def any_middle_row(letter, width)
      idx = LETTERS.index(letter)
      "#{(letter + ' ' * (1 + 2 * (idx - 1)) + letter).center(width)}\n"
    end
  end
end

# puts Diamond.make_diamond('G')

# LETTERS = ('A'..'Z').to_a
# p LETTERS
# width = 1 + (2 * (LETTERS.index('C')))
# p "#{'A'.center(width)}\n"
# space_between = 1 + 2 * (LETTERS.index('B') - 1)
# p ("B#{' ' * space_between}B").center(width)
# 'B'.upto('F') {|l| puts l}
# letter = 'F'
# ('B'..letter).each{|l| puts l}
# (letter...'A').each { |x| p l }

=begin
PROBLEM

input: letter
output: diamond

explicit rules:
implicit rules:
A is centered

Mental Model:
the width will be
A: 1
B: 3
C: 5
...
A centered, then, ever other letter up to target, then down to A
each next level including the center is centered with space between letters
the space between is 1 + 2 * (idx -1)

EXAMPLES

DATA / ALGORITHM
determine width
1 + 2 * idx of input

A centered
B up to not including Target do
  letter + middle space + letter, centered
Target down to B do
  same
A centered

CODE
=end