#1
loop do
  puts 'Just keep printing...'
  break
end

#2
loop do
  puts 'This is the outer loop.'

  loop do
    puts 'This is the inner loop.'
    break
  end
  break
end

puts 'This is outside all loops.'

#3
