# frozen_string_literal: true # not sure why this is necessary

def longest_sentence(string)
  longest = ''
  string.split(/[?.!]/).each do |sentence|
    longest = sentence if sentence.split.count > longest.split.count
  end
  longest.gsub!("\n", ' ')
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

BLOCKS_HASH = { B: 'O', X: 'K', D: 'Q', C: 'P', N: 'A',
                G: 'T', R: 'E', F: 'S', J: 'W', H: 'U',
                V: 'I', L: 'Y', Z: 'M' }

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
    when blocks.keys.include?(letter.to_sym) then blocks.delete(letter.to_sym)
    when blocks.values.include?(letter) then blocks.delete(blocks.key(letter))
    else return false
    end
  end
  true
end

BLOCKS = %w[BO XK DQ CP NA GT RE FS JW HU VI LY ZM].freeze

def block_word2?(string)
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
  hash = { lowercase: 0, uppercase: 0, neither: 0 }
  string.chars.each do |character|
    case character
    when /[a-z]/ then hash[:lowercase] += 1
    when /[A-Z]/ then hash[:uppercase] += 1
    else hash[:neither] += 1
    end
  end
  hash.each do |k, v|
    hash[k] = (v.to_f / string.size * 100).round(1)
  end
  hash
end

p letter_percentages('abCdef 123') == { lowercase: 50.0, uppercase: 10.0, neither: 40.0 }
p letter_percentages('AbCd +Ef') == { lowercase: 37.5, uppercase: 37.5, neither: 25.0 }
p letter_percentages('123') == { lowercase: 0.0, uppercase: 0.0, neither: 100.0 }
p letter_percentages 'abcdefGHI'

# 31 minutes
# distracted as heck throughout solving this problem, working in a coffee shop next
# to Katie doesn't work, because then I get interrupted.
# The use of regex was jacked up here
# I tried to use
# string.count(/[a-z]/) but the regex wasn't implicitly a string, so it didn't
# count anything
# I had to make a cumbersome if statement, and then I ran in circles while I
# forgot that percentages are numbers less than 0, so I didn't understand why the integer
# returned was always zero

# Well, apparently I can indeed use count with regex, but I need to pass a block to it for each
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
    break if count.negative?
  end
  count.zero?
end

# 14 minutes, several minutes spent just realizing that this is a parity problem that
# can be addressed with counting pairs, essentially. Feeling stoked that I figured that out.
# I made a long comment on Maria Milosh's solution, which is very different than mine, and uses
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

def tri_angle(x, y, z)
  angles = [x, y, z]
  return :invalid if angles.inject(:+) != 180 || angles.include?(0)
  case
  when angles.include?(90) then return :right
  when angles.any? {|angle| angle > 90} then return :obtuse
  end
  :acute
end

p "angles"
p tri_angle(60, 70, 50) == :acute
p tri_angle(30, 90, 60) == :right
p tri_angle(120, 50, 10) == :obtuse
p tri_angle(0, 90, 90) == :invalid
p tri_angle(50, 50, 50) == :invalid

# 9.5 minutes
# cake

# Friday the 13ths holy hell
# the number of friday the 13th depends on the start day of the year, so there are 7 options
# if the year is a leap year (divisible by 4) there are 7 other options, so 14 total
p 365 % 7 == 1
# so each year increments the start day by one day; 2023 started on a Sunday, 2024 will start
# on a Monday. A leap year jumps two start days ahead, so 2025 (the year preceeding a leap year)
# will start on a Wednesday. then Th, Fri, Sat, then Monday...
# There has got to be a better way to do this.
# Yes, my way of doing this was very mathy; there is a more comp-sci way of approaching this
# with the DATE Class, along with methods like #friday? (I'm glad I looked at the hint)

# algorithm:
# given a year, go through the months and check if each 13th is friday. If so, increment
# a counter, return the counter at the end

require 'date'
def friday_13th(year)
  fridays = 0
  (1..12).each do |month|
    fridays += 1 if Date.new(year, month, 13).friday?
  end
  fridays
end

p "fridays"
p friday_13th(2015) == 3
p friday_13th(1986) == 1
p friday_13th(2019) == 2
# (2000..2100).each do |year|
#   p friday_13th(year)
# end

# 21 minutes - I'm surprised I figured this out so quickly, even with the hint.
# But my idea worked great, and I am pretty stoked that I figured out how to work with
# the date class, especially since it requires a "require 'date'" statement, and then each
# new date has to be initialized, and I had to learn a new format. Pretty cool!

# featured number, x, must be:
# - x % 7 == 0
# - x.odd? == true
# - no repeated digits in the number (this is what limits the total number of featured)
# algorithm
# takes input, starts to increment until all the reqs are met, returns that number
# perhaps first, if the number is too large, returns error message

def featured(num)
  error_message = "seat's taken"
  loop do
    num += 1
    return error_message if num >= 10_000_000_000 # can't have unique digits if num is 11 digits
    next unless num % 7 == 0 and num.odd?
    return num if num.to_s.chars == num.to_s.chars.uniq
  end
end

# 10.5 minutes, spent a long time trying to brute force the last featured number, until I
# realized that it doesn't matter that much, just so that I had an upper bound that was
# somewhat close.
# Looking at Daniel Chae's solution, I see that there's a #find method that he uses for a
# range:
# def featured(n)
#   (n+1..9_876_543_201).find { |x| x.odd? && x % 7 == 0 && x.digits.size == x.digits.uniq.size } || "No featured number > n"
# end
# note that I dislike his one-liner obsession.
# but that #find method is sweet

p "featured"
p featured(12) == 21
p featured(20) == 21
p featured(21) == 35
p featured(997) == 1029
p featured(1029) == 1043
p featured(999_999) == 1_023_547
#p featured(999_999_987) == 1_023_456_987
#p featured(9999999999) # -> There is no possible number that fulfills those requirements

# can use spaceship operators
# input: array
# output: same array, sorted from least to greatest
# each element compared with its right neighbor, if element is greater than neighbor, swap
# places
# could do the thing n times, but that might do unnecessary iterations
# I could keep count of swaps with a counter; if the counter is zero at the end of a pass,
# then break from the loops

def bubble_sort_draft!(array)
  n = array.size
  (n-1).times do
  index = 0
    until index > (array.size - 1) do
      case array[index] <=> array[index + 1]
      when 1
        temp = array[index]
        array[index] = array[index + 1]
        array[index + 1] = temp
      end
      index += 1
    end
  end
  array
end

def bubble_sort!(array)
  loop do
    swapped = false
    0.upto(array.size - 2) do|n|
      next if array[n] <= array[n+1]
      array[n], array[n + 1] = array[n + 1], array[n]
      swapped = true
    end
    break unless swapped
  end
  array
end

array = [5, 3]
p bubble_sort!(array)
p array == [3, 5]

array = [6, 2, 7, 1, 4]
bubble_sort!(array)
p array == [1, 2, 4, 6, 7]

array = %w(Sue Pete Alice Tyler Rachel Kim Bonnie)
bubble_sort!(array)
p array == %w(Alice Bonnie Kim Pete Rachel Sue Tyler)

# 38 minutes, not my best go; I spent at least half the time using Array#map! and trying
# to debug it. later i just used an until loop to accomplish the same thing without the hot
# mess of referencing the array while I'm mutating it. oy vey.
# Damn their solution uses a much more elegant way (a "ruby idiom", apparently) of swapping
# two variables:
# a, b = b, a
# also theirs is much nicer with two loops, and one that terminates after there are no swaps;
# they do a better version of my counter idea, which is storing the value of swapped as
# a boolean, so if swapped is ever false after inspecting all the elements, then it can break
# out of the loop
# after looking at their solution, I rewrote it without copying it or trying to memorize
# it first; gives me the chance to internalize what they did, and I get a feel for the solution
# path

# mathy!
def sum_square_difference(n)
  (1..n).inject(:+) ** 2 - (1..n).map{ |x| x ** 2 }.inject(:+)
end

p sum_square_difference(3) == 22
# -> (1 + 2 + 3)**2 - (1**2 + 2**2 + 3**2)
p sum_square_difference(10) == 2640
p sum_square_difference(1) == 0
p sum_square_difference(100) == 25164150

# 4 min
# I learned that I can't use #map! on a range (1..n) but I CAN use #map. Good to know.
















































