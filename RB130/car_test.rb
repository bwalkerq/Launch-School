require "minitest/reporters"
Minitest::Reporters.use!

require 'minitest/autorun'

require_relative 'car'

class CarTest < MiniTest::Test
  def test_wheels
    car = Car.new
    assert_equal(4, car.wheels)
  end

  def test_doors
    car = Car.new
    assert_equal(2, car.doors)
  end
end