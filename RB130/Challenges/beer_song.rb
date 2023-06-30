
class BeerSong
  def self.verse(num)
    if num > 2
      "#{num} bottles of beer on the wall, #{num} bottles of beer.\n" \
      "Take one down and pass it around, #{num - 1} bottles of beer on the wall.\n"
    elsif num == 2
      "2 bottles of beer on the wall, 2 bottles of beer.\n" \
      "Take one down and pass it around, 1 bottle of beer on the wall.\n"
    elsif num == 1
      "1 bottle of beer on the wall, 1 bottle of beer.\n" \
      "Take it down and pass it around, no more bottles of beer on the wall.\n"
    elsif num == 0
      "No more bottles of beer on the wall, no more bottles of beer.\n" \
      "Go to the store and buy some more, 99 bottles of beer on the wall.\n"
    else
      "Negative bottle of beer on the wall, negative...bottles...\n" \
      "Wait a...sec...there must have been acid in one of these bottles..."
    end

  end

  def self.verses(starting_at, target)
    output = ""
    starting_at.downto(target) do |int|
      output += verse(int)
      output += "\n" unless int == target
    end
    output
  end

  def self.lyrics
    verses(99, 0)
  end
end
