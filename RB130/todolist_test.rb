require 'simplecov'
SimpleCov.start
require 'minitest/autorun'
require "minitest/reporters"
Minitest::Reporters.use!

require_relative 'todo'

class TodoListTest < MiniTest::Test

  def setup
    @todo1 = Todo.new("Buy milk")
    @todo2 = Todo.new("Clean room")
    @todo3 = Todo.new("Go to gym")
    @todos = [@todo1, @todo2, @todo3]

    @list = TodoList.new("Today's Todos")
    @list.add(@todo1)
    @list.add(@todo2)
    @list.add(@todo3)
  end

  def test_to_a
    assert_equal(@todos, @list.to_a)
  end

  def test_size
    assert_equal(3, @list.size)
  end

  def test_first
    assert_equal(@todo1, @list.first)
  end

  def test_last
    assert_equal(@todo3, @list.last)
  end

  def test_shift
    todo = @list.shift
    assert_equal(@todo1, todo)
    assert_equal([@todo2, @todo3], @list.to_a)
  end

  def test_pop
    todo = @list.pop
    assert_equal(@todo3, todo)
    assert_equal([@todo1, @todo2], @list.to_a)
  end

  def test_done?
    assert_equal false, @list.done?
    @list.mark_all_done
    assert_equal(true, @list.done?)
  end

  def test_add_type_error
    assert_raises(TypeError) {@list << 3}
    assert_raises(TypeError) {@list << "hey"}
    assert_raises(TypeError) {@list << ["hey"]}
  end

  def test_shovel
    new_todo = Todo.new("Walk the dog")
    @list << new_todo
    @todos << new_todo

    assert_equal(@todos, @list.to_a) # this is a nice way to test the list function
  end

  def test_add
    new_todo = Todo.new("get psyched")
    @list << new_todo
    @todos << new_todo

    assert_equal(@todos, @list.to_a)
  end

  def test_item_at
    assert_equal @todo3, @list.item_at(2)
    assert_raises(IndexError) { @list.item_at(30) }
  end

  def test_mark_done_at
    assert_raises(IndexError) { @list.mark_done_at(30) }
    @list.mark_done_at(2)
    assert_equal false, @todo1.done?
    assert_equal false, @todo2.done?
    assert_equal true, @todo3.done?
  end

  def test_mark_undone_at
    assert_raises(IndexError) { @list.mark_done_at(30) }
    @todo1.done!
    @todo2.done!
    @todo3.done!
    # this was done more completely than my solution; they chose to mark all done
    # whereas I simply marked one done and undone.
    # I can definitely sense a flavor or style of this
    # Sara Heiberger would be good at this, lol

    @list.mark_undone_at(1)

    assert_equal(true, @todo1.done?)
    assert_equal(false, @todo2.done?)
    assert_equal(true, @todo3.done?)
  end

  def test_done_bang
    @list.done!
    assert_equal(true, @todo1.done?)
    assert_equal(true, @todo2.done?)
    assert_equal(true, @todo3.done?)
    assert_equal(true, @list.done?)
  end

  def test_remove_at
    assert_raises(IndexError) { @list.mark_done_at(30) }
    assert_equal(@todo2, @list.remove_at(1)) # this is not included as an
    # assertion, though I think it should be since we want to confirm that the
    # removed to-do is returned.
    assert_equal([@todo1, @todo3], @list.to_a)
  end

  def test_to_s
    output = <<~OUTPUT.chomp
      ---- Today's Todos ----
      [ ] Buy milk
      [ ] Clean room
      [ ] Go to gym
    OUTPUT

    assert_equal(output, @list.to_s)
  end

  def test_to_s_2
    @list.mark_done_at(1)
    done_output = <<~OUTPUT.chomp
      ---- Today's Todos ----
      [ ] Buy milk
      [X] Clean room
      [ ] Go to gym
    OUTPUT

    assert_equal(done_output, @list.to_s)
  end

  def test_to_s_3
    @list.mark_all_done
    output = <<~OUTPUT.chomp
      ---- Today's Todos ----
      [X] Buy milk
      [X] Clean room
      [X] Go to gym
    OUTPUT

    assert_equal(output, @list.to_s)
  end

  def test_each
    arr = []
    @list.each { |task| arr << task.done }
    assert_equal(3, arr.count(false))
  end

  def test_each_return
    assert_equal(@list, @list.each { |n| puts n })
    # could have put nil as the action in the block
  end

  def test_select_object_return
    # returning a new list object
    new = @list.select(&:done!)
    assert_equal(TodoList, new.class)
  end

  def test_select_function
    # selecting
    @list.mark_done_at(1)
    new_list = @list.select(&:done?)
    assert_equal(@list.item_at(1), new_list.first)
  end
end































