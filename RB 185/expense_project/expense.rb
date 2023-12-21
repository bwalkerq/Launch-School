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

def list_expenses
  connection = PG.connect(dbname: 'expenses')

  result = connection.exec('SELECT * FROM expenses ORDER BY created_on ASC')
  result.each do |tuple|
    columns = [tuple['id'].rjust(3),
               tuple['created_on'].rjust(10),
               tuple['amount'].rjust(12),
               tuple['memo']]

    puts columns.join(" | ")
  end
end

arguments = ARGV

case arguments[0]
when 'list'
  list_expenses
else
  display_help
end
