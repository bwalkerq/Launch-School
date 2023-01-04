
def longest_sentence(string)
  longest = ""
  string.split(/[?.!]/).each do |sentence|
    longest = sentence if sentence.split.count > longest.split.count
  end
  longest.gsub!("\n", " ")
  "The longest sentence is #{longest.split.count} words. It is: #{longest}."
end

# 17 min
# I had the intuition to use [] for a regex character class, so that was smart of me
# I had no idea that #split allows for multiple characters on which to split a string, awesome
# I learned that #strip does a better job than just trailing or leading whitespace, but also the other
# non-text characters like /n

getty = "Four score and seven years ago our fathers brought forth
on this continent a new nation, conceived in liberty, and
dedicated to the proposition that all men are created
equal.

Now we are engaged in a great civil war, testing whether
that nation, or any nation so conceived and so dedicated,
can long endure. We are met on a great battlefield of that
war. We have come to dedicate a portion of that field, as
a final resting place for those who here gave their lives
that that nation might live. It is altogether fitting and
proper that we should do this.

But, in a larger sense, we can not dedicate, we can not
consecrate, we can not hallow this ground. The brave
men, living and dead, who struggled here, have
consecrated it, far above our poor power to add or
detract. The world will little note, nor long remember
what we say here, but it can never forget what they
did here. It is for us the living, rather, to be dedicated
here to the unfinished work which they who fought
here have thus far so nobly advanced. It is rather for
us to be here dedicated to the great task remaining
before us -- that from these honored dead we take
increased devotion to that cause for which they gave
the last full measure of devotion -- that we here highly
resolve that these dead shall not have died in vain
-- that this nation, under God, shall have a new birth
of freedom -- and that government of the people, by
the people, for the people, shall not perish from the
earth."

p longest_sentence(getty)

BLOCKS_HASH = { B: "O", X: "K", D: "Q", C: "P", N: "A",
                G: "T", R: "E", F: "S", J: "W", H: "U",
                V: "I", L: "Y", Z: "M" }

# How to organize the blocks?
# Hash, or perhaps nested array
# like [ [B, O], ..] and then remove the block from the array, and if the string ever goes looking for
# a block that got removed, it returns false
# Could also set up hash key:value and then take the keys, values, put into two arrays and as the string
# searches for each block, removes it from the hash, returns false if block missing from hash when needed


def block_word?(string)
  blocks = BLOCKS_HASH.clone
  letters = string.upcase.chars
  letters.each do |letter|
    case
    when blocks.keys.include?(letter.to_sym)
      blocks.delete(letter.to_sym)
    when blocks.values.include?(letter)
      blocks.delete(blocks.key(letter))
    else
      return false
    end
  end
  true
end

BLOCKS = %w(BO XK DQ CP NA GT RE FS JW HU VI LY ZM).freeze

def block_word?(string)
  up_string = string.upcase
  BLOCKS.none? { |block| up_string.count(block) >= 2 }
end

# I had absolutely no clue that #count could be used in this way; the argument
# passed to #count can be a range of characters, rather than an explicit string,
# so "BO" will count every B and every O and return the sum, rather than counting
# every instance of "BO"
# Which makes this problem wayyyyy easier.

p block_word?('BATCH') #== true
p block_word?('BUTCH') #== false
p block_word?('jest') #== true
p block_word?('BQP') #== true

def letter_percentages(string)
  hash = {lowercase: 0, uppercase: 0, neither: 0}
  string.chars.each do |character|
    if character =~ /[a-z]/
      hash[:lowercase] += 1
    elsif character =~ /[A-Z]/
      hash[:uppercase] += 1
    else
      hash[:neither] += 1
    end
  end
  hash.each do |k,v|
    hash[k] = (v.to_f / string.size * 100).round(1)
  end
  hash
end

p letter_percentages('abCdef 123') == { lowercase: 50.0, uppercase: 10.0, neither: 40.0 }
p letter_percentages('AbCd +Ef') == { lowercase: 37.5, uppercase: 37.5, neither: 25.0 }
p letter_percentages('123') == { lowercase: 0.0, uppercase: 0.0, neither: 100.0 }
p letter_percentages "abcdefGHI"

# 31 minutes
# distracted as fuck throughout solving this problem, working in a coffee shop next
# to Katie doesn't work, because then I get interrupted.
# The use of regex was fucked here
# I tried to use
# string.count(/[a-z]/) but the regex wasn't implicitly a string, so it didn't
# count anything
# I had to make a cumbersome if statement, and then I ran in circles while I
# forgot that percentages are numbers less than 0, so I didn't understand why the integer
# returned was always zero

# FUCK apparently I can indeed use count with regex, but I need to pass a block to it for each
# character
#

# balanced?
# input: string with any number of parentheses
# output: true if the parentheses are balanced, else false
# Need some way to pair off parentheses. I don't have an immediately easy way to do that
# iterate each char and find a (, then search through from that point until one ) is found
# remove them as they're found? otherwise double counted?
# could strip all other characters since they're not necessary
# if encounter ")" first, return false
# if encounter "(" then must encounter ")" else return false (remove both instances)
# [I don't have an "encounter" method?]
# something about match
# Fuck I can count
# count
#
def balanced?(string)
  count = 0
  string.each_char do |char|
    count += 1 if char == '('
    count -= 1 if char == ')'
    break if count < 0
  end
  count.zero?
end

# 14 minutes, several minutes spent just realizing that this is a parity problem that
# can be addressed with counting pairs, essentially. Feeling stoked that I figured that out.
# I made a long comment on Maria Milosh's solution, wich is very different than mine, and uses
# the idea of a "stack" like how we did before

p balanced?('What (is) this?') == true
p balanced?('What is) this?') == false
p balanced?('What (is this?') == false
p balanced?('((What) (is this))?') == true
p balanced?('((What)) (is this))?') == false
p balanced?('Hey!') == true
p balanced?(')Hey!(') == false
p balanced?('What ((is))) up(') == false

# triangle
# I don't quite know how to do a sampling or whatever where it takes one of the elements
# and compares it to the other two, like what's necessary for the invalid case
# 

def triangle(x, y, z)
  return :invalid if x >= (y + z) || y >= (x + z) || z >= (x + y)
  return :equilateral if x == y && x == z
  return :isosceles if x == y || x == z || y == z

  :scalene
end

# 11 minutes
# NOT elegant, but it totally works
# Their solution for the invalid case is more elegant, but not entirely more clear
#

p triangle(3, 3, 3) == :equilateral
p triangle(3, 3, 1.5) == :isosceles
p triangle(3, 4, 5) == :scalene
p triangle(0, 3, 3) == :invalid
p triangle(3, 1, 1) == :invalid



























































