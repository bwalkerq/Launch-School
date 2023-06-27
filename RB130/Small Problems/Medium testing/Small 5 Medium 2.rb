require 'minitest/autorun'
require "minitest/reporters"
Minitest::Reporters.use!

require_relative 'cash_register'
require_relative 'transaction'

class CashRegisterTest < Minitest::Test

  def setup
    @register = CashRegister.new(10)
    @sample_transaction = Transaction.new(6)
  end

  def test_accept_money
    @sample_transaction.amount_paid = 6
    previous_amount = @register.total_money
    @register.accept_money(@sample_transaction)
    current_amount = @register.total_money

    assert_equal(previous_amount + 6, current_amount)
  end

  def test_change
    @sample_transaction.amount_paid = 9
    paid = @sample_transaction.amount_paid
    cost = @sample_transaction.item_cost

    assert_equal(paid - cost, @register.change(@sample_transaction))
  end

  def test_give_receipt
    cost = @sample_transaction.item_cost
    @sample_transaction.amount_paid = 9
    expected_output = "You've paid $#{cost}.\n"
    assert_output(expected_output) { @register.give_receipt(@sample_transaction) }
  end
end