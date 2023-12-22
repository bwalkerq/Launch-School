#! /usr/bin/env ruby

require 'pg'
require 'bundler/setup'

CONNECTION = PG.connect(dbname: 'expenses')

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

def list_expenses

  result = CONNECTION.exec('SELECT * FROM expenses ORDER BY created_on ASC')
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
  sql = "INSERT INTO expenses (amount, memo, created_on)
        VALUES ($1, $2, $3)"
  CONNECTION.exec_params(sql, [amount, memo, date])
end

command = ARGV.first
if command == "list"
  list_expenses
elsif command == "add"
  amount = ARGV[1]
  memo = ARGV[2]
  abort "You must provide an amount and memo." unless amount && memo
  add_expense(amount, memo)
else
  display_help
end
