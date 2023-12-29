#! /usr/bin/env ruby

require 'pg'
require 'bundler/setup'

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

class ExpenseData
  def initialize
    @connection = PG.connect(dbname: 'expenses')
  end

  def list_expenses
    result = @connection.exec('SELECT * FROM expenses ORDER BY created_on ASC')
    result.each do |tuple|
      columns = [tuple['id'].rjust(3),
                 tuple['created_on'].rjust(10),
                 tuple['amount'].rjust(12),
                 tuple['memo']]

      puts columns.join(' | ')
    end
  end

  def add_expense(amount, memo)
    date = Time.now # Date.today didn't work here
    sql = "INSERT INTO expenses (amount, memo, created_on) VALUES ($1, $2, $3)"
    @connection.exec_params(sql, [amount, memo, date])
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
    else
      display_help
    end
  end
end

CLI.new.run(ARGV)