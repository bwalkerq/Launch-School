n = 10
puts "Are you even old enough to order? Quantos anos tienes?"
age = gets.chomp.to_i
puts "Well, in that case,"
4.times do
  puts "in #{n} years you'll be #{age + n} years old." 
  n += 10
end