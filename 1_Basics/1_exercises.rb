puts "Benjamin " + "Walker"

puts 6543/1000, 6543%1000/100
# could do any 4 digit number n with n%1000%.../x where x is desired digit

movie_years = {
  New_Hope: 1977,
  Empire: 1980,
  Return: 1983
}
movie_years.each_value {|y| puts y}

years = []
movie_years.each_value {|y| years << y}
puts years

lambda factorial{|n|
  until n==0
    n*(n-1)
    n -= 1
  end
}
exercise_5 = [5...8].collect!(&factorial)
puts exercise_5