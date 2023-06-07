# frozen_string_literal: true

# This class represents a to-do item and its associated
# data: name and description. There's also a "done"
# flag to show whether this to-do item is done.

class Todo
  DONE_MARKER = 'X'
  UNDONE_MARKER = ' '

  attr_accessor :title, :description, :done

  def initialize(title, description='')
    @title = title
    @description = description
    @done = false
  end

  def done!
    self.done = true
  end

  def done?
    done
  end

  def undone!
    self.done = false
  end

  def to_s
    "[#{done? ? DONE_MARKER : UNDONE_MARKER}] #{title}"
  end

  def ==(other)
    title == other.title &&
      description == other.description &&
      done == other.done
  end
end


# This class represents a collection of To-do objects.
# You can perform typical collection-oriented actions
# on a TodoList object, including iteration and selection.

class TodoList
  attr_accessor :title

  def initialize(title)
    @title = title
    @todos = []
  end

  def add(todo_obj)
    raise TypeError, 'can only add Todo Objects' if todo_obj.class != Todo

    todos << todo_obj
  end
  alias << add

  def to_s
    puts "---- Today's Todos ----"
    todos.each { |elem| puts elem }
  end

  def size
    todos.length
  end

  def first
    todos.first
  end

  def last
    todos.last
  end

  def to_a
    todos.clone
  end

  def done?
    todos.all? { |todo| todo.done == true }
  end

  def item_at(index)
    todos.fetch index
  end

  def mark_done_at(index)
    todos.fetch(index).done! # chose not to use #item_at b/c would
    # be two method calls instead of 1
  end

  def mark_undone_at(index)
    todos.fetch(index).undone!
  end

  def done!
    todos.each(&:done!)
  end

  def shift
    todos.shift
  end

  def pop
    todos.pop
  end

  def each
    0.upto(todos.length - 1) do |idx|
      yield(todos[idx])
    end
    self
  end

  def select
    new_list = TodoList.new('Selected tasks')
    todos.each do |elem|
      new_list << elem if yield(elem)
    end
    new_list
  end

  def find_by_title(string)
    todos.select { |elem| elem.title == string }.first
  end

  def all_done
    todos.select(&:done?)
  end

  def all_not_done
    todos.select { |todo| todo.done? == false }
  end

  def mark_done(string)
    find_by_title(string).done!
  end

  def mark_all_done
    todos.each(&:done!)
  end

  def mark_all_undone
    todos.each(&:undone!)
  end

  private

  attr_accessor :todos

end

todo1 = Todo.new('Buy milk')
todo2 = Todo.new('Clean room')
todo3 = Todo.new('Go to gym')
list = TodoList.new("Today's Todos")
list.add(todo1)                 # adds todo1 to end of list, returns list
list.add(todo2)                 # adds todo2 to end of list, returns list
list.add(todo3)                 # adds todo3 to end of list, returns list
# todo1.done!
# todo2.done!
list.mark_done('Buy milk')
list.to_s
list.mark_all_done
list.to_s
list.mark_all_undone
list.to_s



# <<
# same behavior as add

# ---- Interrogating the list -----

# size
# p list.size                       # returns 3

# first
# p list.first                      # returns todo1, which is the first item in the list

# last
# p list.last                       # returns todo3, which is the last item in the list

# to_a
# p list.to_a                      # returns an array of all items in the list
# It's possible that this is just supposed to return an array of the titles?


# done?
# p list.done?                     # returns true if all todos in the list are done, otherwise false

# ---- Retrieving an item in the list ----

# item_at
# p list.item_at                    # raises ArgumentError
# p list.item_at(1)                 # returns 2nd item in list (zero based index)
# p list.item_at(100)               # raises IndexError

# ---- Marking items in the list -----

# mark_done_at
# list.mark_done_at               # raises ArgumentError
# list.mark_done_at(1)            # marks the 2nd item as done
# list.mark_done_at(100)          # raises IndexError

# mark_undone_at
# list.mark_undone_at             # raises ArgumentError
# list.mark_undone_at(1)          # marks the 2nd item as not done,
# list.mark_undone_at(100)        # raises IndexError

# done!
# list.done!                      # marks all items as done

# ---- Deleting from the list -----

# shift
# list.shift                      # removes and returns the first item in list

# pop
# list.pop                        # removes and returns the last item in list

# remove_at
# list.remove_at                  # raises ArgumentError
# list.remove_at(1)               # removes and returns the 2nd item
# list.remove_at(100)             # raises IndexError

# ---- Outputting the list -----

# to_s
# list.to_s                      # returns string representation of the list

# ---- Today's Todos ----
# [ ] Buy milk
# [ ] Clean room
# [ ] Go to gym

# or, if any todos are done

# ---- Today's Todos ----
# [ ] Buy milk
# [X] Clean room
# [ ] Go to gym





