#! /usr/bin/env ruby

require 'pg'
require 'bundler/setup'

connection = PG.connect(dbname: 'expenses')

result = connection.exec('SELECT * FROM expenses ORDER BY created_on ASC')
result.each do |tuple|
  columns = [tuple['id'].rjust(3),
             tuple['created_on'].rjust(10),
             tuple['amount'].rjust(12),
             tuple['memo']]

  puts columns.join(" | ")
end

