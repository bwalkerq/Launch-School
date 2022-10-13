def meal
  return 'Breakfast'
end

puts meal
# should print 'Breakfast' and return nil

#2 will return "Evening"
def meal
  'Evening'
end

puts meal

#3 prints Breakfast
def meal
  return 'Breakfast'
  'Dinner'
end

puts meal

#4 should put Dinner Breakfast
def meal
  puts 'Dinner'
  return 'Breakfast'
end

puts meal

#5 prints Dinner nil because internal puts Dinner and the return 
# of the method is nil, so p (nil)
def meal
  'Dinner'
  puts 'Dinner'
end

p meal

#6 Breakfast (only)
def meal
  return 'Breakfast'
  'Dinner'
  puts 'Dinner'
end

puts meal

#7 sheep
def count_sheep
  5.times do |sheep|
    puts sheep
  end
end

puts count_sheep 
# should be an error because sheep isn't defined, and there's no argument passed
# into the count_sheep method 
# wow, ok, it prints 0-5, unexpected.
# I think because if |sheep| isn't identified, the .times method uses the index
# as the input
# wow, also, the return of #times is the initial integer (in this case 5)
# so the 0-4 is from #times combined with #puts, and the 5 is from the return
# of the method, so the puts count_sheep call also prints the return value

#8 this should print 0-4,10 #nice
def count_sheep
  5.times do |sheep|
    puts sheep
  end
  10
end

puts count_sheep

#9 this should print 0,1,5 because when sheep =2, it returns, which returns
# initial integer, 5 #no
def count_sheep
  5.times do |sheep|
    puts sheep
    if sheep >= 2
      return
    end
  end
end

p count_sheep
# should have known that 2 will be printed, because the puts occurs before 
# the return
# since return didn't provide a value, the return value is nil

#10 Tricky number
# well, number is a variable intialized within the block, so it wouldn't
# be available outside, but that's not the issue, since we're just looking
# at the return
# the if statement runs true off the bat, so number is assigned 1, which
# returns 1, and since that is the last line that is evaluated, I think the 
# return is 1
def tricky_number
  if true
    number = 1
  else
    2
  end
end

puts tricky_number

