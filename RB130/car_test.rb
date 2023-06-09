require "minitest/reporters"
Minitest::Reporters.use!

require 'minitest/autorun'

require_relative 'car'

class CarTest < MiniTest::Test
  def test_wheels
    car = Car.new
    assert_equal(3, car.wheels)
  end
end