#! /usr/bin/env ruby

require 'pg'
require 'bundler/setup'
require 'io/console'

class ExpenseData

  def initialize
    @connection = PG.connect(dbname: 'expenses')
    setup_schema
  end

  def list_expenses
    result = @connection.exec('SELECT * FROM expenses ORDER BY created_on ASC')
    display_count(result)
    display_expenses(result) if result.ntuples > 0
  end

  def add_expense(amount, memo)
    date = Time.now # Date.today didn't work here
    sql = "INSERT INTO expenses (amount, memo, created_on) VALUES ($1, $2, $3)"
    @connection.exec_params(sql, [amount, memo, date])
  end

  def search_expenses(query)
    sql = "SELECT * FROM expenses WHERE memo ILIKE $1"
    result = @connection.exec_params(sql, ["%#{query}%"])
    #     I had originally included "%#{query}%" in the sql statement, rather than
    # the second argument of the exec_params. I guess the sql statement just needs only
    # $1 and then whatever we're going to do to the argument before it's passed to the
    # exec method has to be done in the array that we're passing.
    display_count(result)
    display_expenses(result) if result.ntuples > 0
  end

  def delete_expense(id)
    sql = "SELECT * FROM expenses WHERE id = $1"
    result = @connection.exec_params(sql, [id]) # smooth to keep reference to
    # the soon-to-be deleted row here

    if result.ntuples == 1
      sql = "DELETE FROM expenses WHERE id=$1"
      @connection.exec_params(sql, [id])

      puts "The following expense has been deleted:"
      display_expenses(result)
    else
      puts "There is no expense with the id '#{id}'."
    end
  end

  def delete_all_expenses
    @connection.exec("DELETE FROM expenses")
    puts "All expenses have been deleted."
  end

  private

  def display_count(expenses)
    count = expenses.ntuples
    if count == 0
      puts "There are no expenses."
    elsif count == 1
      puts "There is 1 expense."
    else
      puts "There are #{count} expenses."
    end
  end

  def display_expenses(expenses)
    expenses.each do |tuple|
      columns = [tuple['id'].rjust(3),
      tuple['created_on'].rjust(10),
      tuple['amount'].rjust(12),
      tuple['memo']]

      puts columns.join(' | ')
    end
    puts '-' * 50

    amount_sum = expenses.field_values("amount").map(&:to_f).inject(:+) # got really close to this!

    puts "Total #{format('%.2f', amount_sum.to_s).rjust(25)}" # not a chance, but, cool
  end

  def setup_schema
    result = @connection.exec <<~SQL
      SELECT COUNT(*) FROM information_schema.tables
      WHERE table_schema = 'public' AND table_name = 'expenses';
    SQL

    if result[0]['count'] == '0'
      @connection.exec <<~SQL
        CREATE TABLE expenses (
          id serial PRIMARY KEY,
          amount numeric(6,2) NOT NULL CHECK (amount >= 0.01),
          memo text NOT NULL,
          created_on date NOT NULL
        );
      SQL
    end
  end
end

class CLI
  def initialize
    @application = ExpenseData.new
  end

  def run(arguments)
    command = arguments.shift
    case command
    when "add"
      amount = arguments[0]
      memo = arguments[1]
      abort "You must provide an amount and memo." unless amount && memo
      @application.add_expense(amount, memo)
    when "list"
      @application.list_expenses
    when "search"
      @application.search_expenses(arguments[0])
    when "delete"
      id = arguments[0]
      @application.delete_expense(id)
    when "clear"
      puts "This will remove all expenses. Are you sure? (y/n)"
      response = $stdin.getch
      @application.delete_all_expenses if response == "y"
    else
      display_help
    end
  end
end

def display_help
  puts <<~HELP

    An expense recording system
    
    Commands:
    
    add AMOUNT MEMO - record a new expense
    clear - delete all expenses
    list - list all expenses
    delete NUMBER - remove expense with id NUMBER
    search QUERY - list expenses with a matching memo field
  HELP
end

CLI.new.run(ARGV)
