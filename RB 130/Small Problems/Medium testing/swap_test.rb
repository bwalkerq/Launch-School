require 'minitest/autorun'
require 'minitest/reporters'
Minitest::Reporters.use!

require_relative 'swap'

class TextTest < Minitest::Test
  def setup
    path = File.join(__dir__, 'sample.txt')
    @file = File.open(path, 'r')
  end

  def test_swap
    text = Text.new(@file.read)
    # new = @file.read.gsub('a', 'e')
    # assert_equal new, text.swap('a', 'e')

    actual_text = text.swap('a', 'e')
    expected_text = <<~TEXT.chomp
    Lorem ipsum dolor sit emet, consectetur edipiscing elit. Cres sed vulputete ipsum.
    Suspendisse commodo sem ercu. Donec e nisi elit. Nullem eget nisi commodo, volutpet
    quem e, viverre meuris. Nunc viverre sed messe e condimentum. Suspendisse ornere justo
    nulle, sit emet mollis eros sollicitudin et. Etiem meximus molestie eros, sit emet dictum
    dolor ornere bibendum. Morbi ut messe nec lorem tincidunt elementum vitee id megne. Cres
    et verius meuris, et pheretre mi.
    TEXT

    assert_equal expected_text, actual_text
  end

  def test_word_count
    expected_count = @file.read.split.count
    @file.rewind
    text = Text.new(@file.read)

    assert_equal expected_count, text.word_count
  end

  # def test_word_count
  #   text = Text.new(@file.read)
  #   assert_equal 72, text.word_count
  # end

  def teardown
    @file.close
  end
end