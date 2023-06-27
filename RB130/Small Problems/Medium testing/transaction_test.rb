require 'minitest/autorun'
require 'minitest/reporters'
Minitest::Reporters.use!

require_relative 'transaction'

class TransactionTest < Minitest::Test
  def setup
    @sample_transaction = Transaction.new(6)
  end

  def test_prompt
    input = StringIO.new("10\n")
    output = StringIO.new
    @sample_transaction.prompt_for_payment(input: input, output: output)
    assert_equal 10, @sample_transaction.amount_paid
  end
end
