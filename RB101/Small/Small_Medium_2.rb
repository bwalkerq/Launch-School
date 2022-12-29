
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
  keys = BLOCKS_HASH.keys.map{|x| x.to_s}
  values = BLOCKS_HASH.values
  letters = string.upcase.chars
  letters.each do |letter|
    case
    when keys.include?(letter)
      puts letter + "k"
      keys.delete(letter)
      blocks.delete(letter.to_sym)
    when values.include?(letter)
      puts letter
      values.delete(letter)
      blocks.delete(blocks.key(letter))
    else
      puts letter
      return false
    end
  end
  true
end

p block_word?('BATCH') #== true
p block_word?('BUTCH') #== false
p block_word?('jest') #== true
p block_word?('BQP') #== true



































































