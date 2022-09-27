#1
puts "Benjamin " + "Walker"

#2
puts 6543/1000, 6543%1000/100
# could do any 4 digit number n with n%1000%.../x where x is desired digit

#3
movie_years = {
  New_Hope: 1977,
  Empire: 1980,
  Return: 1983
}
movie_years.each_value {|y| puts y}

#4
years = []
movie_years.each_value {|y| years << y}
puts years

#5
factorial = lambda {|n|
  p = n
  until n==1
    n -= 1
    p = p*n
  end
  return p
}
exercise_5 = [*5..8]
puts exercise_5
big_exercise_5 = exercise_5.map(&factorial)
puts big_exercise_5
#Wow I'm looking at the solution and my shit is so much better than this shit.

#6 (I can already tell that the gotcha in this exercise is to 
#remember how float numbers calculate to output a float)
puts "\n#6"
square = lambda {|n| n**2}
e_6 = [3.14,-7.89,0.121212]
puts e_6
puts delta_6 = e_6.map(&square)

puts "\n#7"
puts "on line 2 there is missing closed bracket, used a ')' instead of a '}', and this happened
in an irb session on the 16th line, on the main branch of the github repo"