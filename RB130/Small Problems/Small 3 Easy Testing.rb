require 'minitest/autorun'
require "minitest/reporters"
Minitest::Reporters.use!

class SmallEasyTest < MiniTest::Test
  def test_odd
    value = 3
    assert_equal(true, value.odd?)
  end

  def test_all_problems
    assert_equal('xyz', value.downcase)
    # assert_equal nil, value
    assert_nil(value)
    assert_empty(list)
    assert_includes list, 'xyz'
    assert_raises(NoExperienceError) {employee.hire}
    assert_instance_of(Numeric, value)
    assert_kind_of(Numeric, value)
    assert_same(list, list.process) # This was new and not intuited for me, at
    # first I used asser_equal, but same checks for same object
    refute_includes list, 'xyz'

  end































