class Scrabble
  DICT = { %w[A E I O U L N R S T] => 1,
           %w[D G] => 2,
           %w[B C M P] => 3,
           %w[F H V W Y] => 4,
           ['K'] => 5,
           %w[J X] => 8,
           %w[Q Z] => 10 }.freeze

  def initialize(string)
    @word = string
  end

  def score_letter(letter)
    DICT.each_pair { |k,v| return v if k.include?(letter.upcase) }
  end

  def score
    return 0 if @word.nil? || @word.strip.empty?
    @word.chars.map { |letter| score_letter(letter) }.sum
  end

  def self.score(string)
    new(string).score
  end
end
